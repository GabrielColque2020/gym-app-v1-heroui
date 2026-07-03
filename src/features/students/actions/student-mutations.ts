"use server";

import bcryptjs from "bcryptjs";

import { requireCoachSession } from "@/features/auth/coach-session";
import prisma from "@/lib/prisma";
import {
	type CreateStudentInput,
	type UpdateStudentInput,
} from "@/features/students/services/student-form";
import {
	buildStudentStatusUpdateData,
	validateStudentInput,
} from "@/features/students/actions/student-mutations.utils";
import { studentListSelect } from "@/features/students/services/student-select";

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
			select: studentListSelect,
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
			select: studentListSelect,
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
			data: buildStudentStatusUpdateData( false ),
			select: studentListSelect,
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
			data: buildStudentStatusUpdateData( true ),
			select: studentListSelect,
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
