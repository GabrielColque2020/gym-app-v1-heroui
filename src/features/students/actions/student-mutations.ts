"use server";

import bcryptjs from "bcryptjs";

import { requireCoachSession } from "@/features/auth/coach-session";
import prisma from "@/lib/prisma";
import {
	NO_GENDER,
	emptyToNull,
	isGenderValue,
	isValidEmail,
	parseBirthDate,
	parseNonNegativeNumber,
	parsePositiveInteger,
	type CreateStudentInput,
	type UpdateStudentInput,
} from "@/features/students/services/student-form";

function validateStudentInput( input: CreateStudentInput, mode: "create" | "edit" ) {
	const name = input.name.trim();
	const email = input.email.trim().toLowerCase();
	const password = input.password.trim();

	if (name.length < 2) {
		throw new Error( "El nombre del estudiante debe tener al menos 2 caracteres." );
	}

	if (!isValidEmail( email )) {
		throw new Error( "Ingresa un email valido." );
	}

	if (mode === "create" && password.length < 1) {
		throw new Error( "La contrasenia es obligatoria al crear un estudiante." );
	}

	const dni = parsePositiveInteger( input.dni, "El DNI" );
	const height = parseNonNegativeNumber( input.height, "La altura" );
	const weight = parseNonNegativeNumber( input.weight, "El peso" );
	const birthDate = parseBirthDate( input.birthDate );
	const gender = input.gender === NO_GENDER ? null : input.gender;

	if (gender !== null && !isGenderValue( gender )) {
		throw new Error( "Selecciona un genero valido." );
	}

	return {
		descriptionData: {
			birthDate,
			height,
			objective: emptyToNull( input.objective ),
			observations: emptyToNull( input.observations ),
			weight,
		},
		password,
		userData: {
			active: input.active,
			dni,
			email,
			gender,
			name,
			role: "STUDENT" as const,
		},
	};
}

export async function createStudentAction( input: CreateStudentInput ) {
	try {
		const session = await requireCoachSession( "gestionar estudiantes" );
		const { descriptionData, password, userData } = validateStudentInput( input, "create" );

		return await prisma.user.create( {
			data: {
				...userData,
				coachId: session.sub,
				DescriptionStudent: {
					create: descriptionData,
				},
				password: bcryptjs.hashSync( password ),
			},
			select: {
				DescriptionStudent: {
					select: {
						birthDate: true,
						height: true,
						id: true,
						objective: true,
						observations: true,
						weight: true,
					},
				},
				active: true,
				createdAt: true,
				dni: true,
				email: true,
				gender: true,
				id: true,
				name: true,
				updatedAt: true,
			},
		} );
	} catch (error) {
		const message = error instanceof Error ? error.message : "Error desconocido al crear el estudiante.";

		throw new Error( `No se pudo crear el estudiante. ${ message }` );
	}
}

export async function updateStudentAction( input: UpdateStudentInput ) {
	try {
		const session = await requireCoachSession( "gestionar estudiantes" );
		const { descriptionData, password, userData } = validateStudentInput( input, "edit" );
		const passwordData = password.length > 0 ? { password: bcryptjs.hashSync( password ) } : {};

		return await prisma.user.update( {
			data: {
				...userData,
				...passwordData,
				DescriptionStudent: {
					upsert: {
						create: descriptionData,
						update: descriptionData,
					},
				},
			},
			select: {
				DescriptionStudent: {
					select: {
						birthDate: true,
						height: true,
						id: true,
						objective: true,
						observations: true,
						weight: true,
					},
				},
				active: true,
				createdAt: true,
				dni: true,
				email: true,
				gender: true,
				id: true,
				name: true,
				updatedAt: true,
			},
			where: {
				coachId: session.sub,
				id: input.id,
				role: "STUDENT",
			},
		} );
	} catch (error) {
		const message = error instanceof Error ? error.message : "Error desconocido al actualizar el estudiante.";

		throw new Error( `No se pudo actualizar el estudiante. ${ message }` );
	}
}

export async function deactivateStudentAction( id: string ) {
	try {
		const session = await requireCoachSession( "gestionar estudiantes" );
		return await prisma.user.update( {
			data: {
				active: false,
			},
			select: {
				DescriptionStudent: {
					select: {
						birthDate: true,
						height: true,
						id: true,
						objective: true,
						observations: true,
						weight: true,
					},
				},
				active: true,
				createdAt: true,
				dni: true,
				email: true,
				gender: true,
				id: true,
				name: true,
				updatedAt: true,
			},
			where: {
				coachId: session.sub,
				id,
				role: "STUDENT",
			},
		} );
	} catch (error) {
		const message = error instanceof Error ? error.message : "Error desconocido al desactivar el estudiante.";

		throw new Error( `No se pudo desactivar el estudiante. ${ message }` );
	}
}

export async function restoreStudentAction( id: string ) {
	try {
		const session = await requireCoachSession( "gestionar estudiantes" );
		return await prisma.user.update( {
			data: {
				active: true,
			},
			select: {
				DescriptionStudent: {
					select: {
						birthDate: true,
						height: true,
						id: true,
						objective: true,
						observations: true,
						weight: true,
					},
				},
				active: true,
				createdAt: true,
				dni: true,
				email: true,
				gender: true,
				id: true,
				name: true,
				updatedAt: true,
			},
			where: {
				coachId: session.sub,
				id,
				role: "STUDENT",
			},
		} );
	} catch (error) {
		const message = error instanceof Error ? error.message : "Error desconocido al restaurar el estudiante.";

		throw new Error( `No se pudo restaurar el estudiante. ${ message }` );
	}
}
