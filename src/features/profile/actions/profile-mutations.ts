"use server";

import bcryptjs from "bcryptjs";

import { getAuthenticatedSession } from "@/features/auth/session";
import { formatDateInputValue } from "@/features/students/services/student-form";
import {
	MIN_PASSWORD_LENGTH,
	validateProfileInput,
	type ChangeOwnPasswordInput,
	type ProfileFormValues,
	type UpdateOwnProfileInput,
} from "@/features/profile/services/profile-form";
import { Prisma } from "@/generated/prisma/client";
import type { ActionResult } from "@/lib/action-result";
import prisma from "@/lib/prisma";

// Devuelven el motivo en vez de tirar un error: ver `ActionResult`.
type ProfileActionResult<T = undefined> = ActionResult<T>;

// Solo entrenadores y estudiantes: el administrador no tiene "Mi perfil".
async function requireProfileSession() {
	const session = await getAuthenticatedSession();

	if (!session || session.role === "ADMIN") {
		return null;
	}

	return session;
}

function isUniqueConstraintError( error: unknown ) {
	return error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002";
}

export async function updateOwnProfileAction( input: UpdateOwnProfileInput ): Promise<ProfileActionResult<ProfileFormValues>> {
	const session = await requireProfileSession();

	if (!session) {
		return { ok: false, reason: "Tu sesión venció. Volvé a iniciar sesión." };
	}

	let validated: ReturnType<typeof validateProfileInput>;

	try {
		validated = validateProfileInput( input );
	} catch (error) {
		return { ok: false, reason: error instanceof Error ? error.message : "Revisá los datos." };
	}

	const { bodyData, userData } = validated;
	const isStudent = session.role === "STUDENT";

	try {
		const currentUser = await prisma.user.findUnique( {
			select: { dni: true, email: true, password: true },
			where: { id: session.sub },
		} );

		if (!currentUser) {
			return { ok: false, reason: "Tu cuenta ya no existe." };
		}

		// El email y el DNI son con lo que se entra: cambiarlos pide la contraseña,
		// para que nadie con el telefono desbloqueado se quede con la cuenta.
		const isLoginChanging = userData.email !== currentUser.email || userData.dni !== currentUser.dni;

		if (isLoginChanging) {
			const isPasswordValid = input.currentPassword.length > 0
				&& await bcryptjs.compare( input.currentPassword, currentUser.password );

			if (!isPasswordValid) {
				return { ok: false, reason: "La contraseña actual no es correcta." };
			}

			const takenBy = await prisma.user.findFirst( {
				select: { dni: true, email: true },
				where: {
					id: { not: session.sub },
					OR: [ { email: userData.email }, { dni: userData.dni } ],
				},
			} );

			if (takenBy?.email === userData.email) {
				return { ok: false, reason: "Ese email ya lo usa otra cuenta." };
			}

			if (takenBy?.dni === userData.dni) {
				return { ok: false, reason: "Ese DNI ya lo usa otra cuenta." };
			}
		}

		const updated = await prisma.user.update( {
			data: {
				...userData,
				// Las observaciones son notas del entrenador: el estudiante corrige
				// sus medidas y su objetivo, pero no toca eso.
				...( isStudent ? {
					DescriptionStudent: {
						upsert: {
							create: bodyData,
							update: bodyData,
						},
					},
				} : {} ),
			},
			select: {
				birthDate: true,
				dni: true,
				email: true,
				gender: true,
				name: true,
				DescriptionStudent: {
					select: { height: true, objective: true, weight: true },
				},
			},
			where: { id: session.sub },
		} );

		return {
			data: {
				birthDate: formatDateInputValue( updated.birthDate ),
				dni: String( updated.dni ),
				email: updated.email,
				gender: updated.gender ?? "NONE",
				height: String( updated.DescriptionStudent?.height ?? 0 ),
				name: updated.name,
				objective: updated.DescriptionStudent?.objective ?? "",
				weight: String( updated.DescriptionStudent?.weight ?? 0 ),
			},
			ok: true,
		};
	} catch (error) {
		// Dos cuentas pidiendo el mismo email al mismo tiempo: la base es la que
		// tiene la ultima palabra.
		if (isUniqueConstraintError( error )) {
			return { ok: false, reason: "Ese email o DNI ya lo usa otra cuenta." };
		}

		return { ok: false, reason: "No se pudieron guardar tus datos. Probá de nuevo." };
	}
}

export async function changeOwnPasswordAction( input: ChangeOwnPasswordInput ): Promise<ProfileActionResult> {
	const session = await requireProfileSession();

	if (!session) {
		return { ok: false, reason: "Tu sesión venció. Volvé a iniciar sesión." };
	}

	const newPassword = input.newPassword.trim();

	if (newPassword.length < MIN_PASSWORD_LENGTH) {
		return { ok: false, reason: `La contraseña nueva debe tener al menos ${ MIN_PASSWORD_LENGTH } caracteres.` };
	}

	try {
		const currentUser = await prisma.user.findUnique( {
			select: { password: true },
			where: { id: session.sub },
		} );

		if (!currentUser || !await bcryptjs.compare( input.currentPassword, currentUser.password )) {
			return { ok: false, reason: "La contraseña actual no es correcta." };
		}

		await prisma.user.update( {
			data: { password: bcryptjs.hashSync( newPassword ) },
			where: { id: session.sub },
		} );

		return { data: undefined, ok: true };
	} catch {
		return { ok: false, reason: "No se pudo cambiar la contraseña. Probá de nuevo." };
	}
}
