"use server";

import bcrypt from "bcryptjs";

import { requireAdminSession } from "@/features/auth/admin-session";
import type { AdminUserListItem } from "@/features/role/admin/users/actions/get-admin-users";
import { adminUserSelect } from "@/features/role/admin/users/services/admin-user-select";
import {
	type AssignCoachInput,
	validateCreateCoachInput,
	validateUpdateAdminUserInput,
	type CreateCoachInput,
	type ToggleUserStatusInput,
	type UpdateAdminUserInput,
} from "@/features/role/admin/users/services/admin-user-form";
import prisma from "@/lib/prisma";

export async function createCoachAction( input: CreateCoachInput ) {
	try {
		await requireAdminSession( "crear coaches" );
		const { email, name, password, userData } = validateCreateCoachInput( input );

		return await prisma.user.create( {
			data: {
				active: userData.active,
				dni: userData.dni,
				email,
				name,
				password: bcrypt.hashSync( password ),
				role: "COACH",
			},
			select: adminUserSelect,
		} ) as unknown as AdminUserListItem;
	} catch (error) {
		const message = error instanceof Error ? error.message : "Error desconocido al crear el coach.";

		throw new Error( `No se pudo crear el coach. ${ message }` );
	}
}

export async function toggleUserStatusAction( input: ToggleUserStatusInput ) {
	try {
		const session = await requireAdminSession( "actualizar usuarios" );

		if (session.sub === input.id) {
			throw new Error( "No podes cambiar el estado de tu propia cuenta desde esta pantalla." );
		}

		const currentUser = await prisma.user.findUnique( {
			select: {
				id: true,
				role: true,
			},
			where: {
				id: input.id,
			},
		} );

		if (!currentUser) {
			throw new Error( "El usuario no existe." );
		}

		if (currentUser.role === "ADMIN") {
			throw new Error( "No se puede desactivar una cuenta admin desde este MVP." );
		}

		return await prisma.user.update( {
			data: {
				active: input.active,
			},
			select: adminUserSelect,
			where: {
				id: input.id,
			},
		} ) as unknown as AdminUserListItem;
	} catch (error) {
		const message = error instanceof Error ? error.message : "Error desconocido al actualizar el usuario.";

		throw new Error( `No se pudo actualizar el usuario. ${ message }` );
	}
}

export async function updateAdminUserAction( input: UpdateAdminUserInput ) {
	try {
		await requireAdminSession( "editar usuarios" );
		const { id, password, userData } = validateUpdateAdminUserInput( input );
		const passwordData = password.length > 0 ? { password: bcrypt.hashSync( password ) } : {};

		return await prisma.user.update( {
			data: {
				...userData,
				...passwordData,
			},
			select: adminUserSelect,
			where: {
				id,
			},
		} ) as unknown as AdminUserListItem;
	} catch (error) {
		const message = error instanceof Error ? error.message : "Error desconocido al editar el usuario.";

		throw new Error( `No se pudo editar el usuario. ${ message }` );
	}
}

export async function assignCoachToStudentAction( input: AssignCoachInput ) {
	try {
		await requireAdminSession( "asignar coach a estudiantes" );

		const currentUser = await prisma.user.findUnique( {
			select: {
				id: true,
				role: true,
			},
			where: {
				id: input.studentId,
			},
		} );

		if (!currentUser) {
			throw new Error( "El estudiante no existe." );
		}

		if (currentUser.role !== "STUDENT") {
			throw new Error( "La asignacion de coach solo aplica a estudiantes." );
		}

		if (input.coachId) {
			const coach = await prisma.user.findUnique( {
				select: {
					id: true,
					role: true,
				},
				where: {
					id: input.coachId,
				},
			} );

			if (!coach || coach.role !== "COACH") {
				throw new Error( "El coach seleccionado no es valido." );
			}
		}

		return await prisma.user.update( {
			data: {
				coachId: input.coachId,
			},
			select: adminUserSelect,
			where: {
				id: input.studentId,
			},
		} ) as unknown as AdminUserListItem;
	} catch (error) {
		const message = error instanceof Error ? error.message : "Error desconocido al asignar coach.";

		throw new Error( `No se pudo asignar el coach. ${ message }` );
	}
}
