"use server";

import { runAction } from "@/lib/run-action";
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
	return runAction( "No se pudo crear el estudiante.", async () => {
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
	} );
}

export async function updateStudentAction( input: UpdateStudentInput ) {
	return runAction( "No se pudo actualizar el estudiante.", async () => {
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
	} );
}

export async function deactivateStudentAction( id: string ) {
	return runAction( "No se pudo desactivar el estudiante.", async () => {
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
	} );
}

export async function restoreStudentAction( id: string ) {
	return runAction( "No se pudo restaurar el estudiante.", async () => {
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
	} );
}
