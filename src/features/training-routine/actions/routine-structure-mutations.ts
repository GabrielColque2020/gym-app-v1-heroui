"use server";

import { requireCoachSession } from "@/features/auth/coach-session";
import prisma from "@/lib/prisma";
import {
	validateRoutineStructureScopeInput,
	validateRoutineStructureInput,
	type RoutineStructureInput,
	type RoutineStructureScopeInput,
} from "@/features/training-routine/services/routine-structure";
import { syncRoutineWeeksStructure } from "@/features/training-routine/services/routine-structure-sync";

async function assertStudentExists( studentId: string, coachId: string ) {
	const student = await prisma.user.findFirst( {
		select: {
			id: true,
		},
		where: {
			active: true,
			coachId,
			id: studentId,
			role: "STUDENT",
		},
	} );

	if (!student) {
		throw new Error( "No se encontró un estudiante activo para modificar rutinas." );
	}
}

async function upsertRoutineStructure( input: RoutineStructureInput ) {
	validateRoutineStructureInput( input );
	const session = await requireCoachSession( "modificar rutinas" );

	await assertStudentExists( input.studentId, session.sub );

	const normalizedObjective = input.objective.trim() || null;

	await prisma.$transaction( async ( tx ) => {
		const routineMonth = await tx.trainingRoutineMonth.upsert( {
			create: {
				month: input.month,
				objective: normalizedObjective,
				studentId: input.studentId,
				year: input.year,
			},
			select: {
				id: true,
			},
			update: {
				objective: normalizedObjective,
			},
			where: {
				studentId_month_year: {
					month: input.month,
					studentId: input.studentId,
					year: input.year,
				},
			},
		} );

		await syncRoutineWeeksStructure( tx, { trainingRoutineMonthId: routineMonth.id }, input.weeks );
	} );
}

export async function createTrainingRoutineStructureAction( input: RoutineStructureInput ) {
	try {
		await upsertRoutineStructure( input );

		return {
			ok: true,
		};
	} catch (error) {
		const message = error instanceof Error ? error.message : "Error desconocido al crear la rutina.";

		throw new Error( `No se pudo crear la rutina. ${ message }` );
	}
}

export async function updateTrainingRoutineStructureAction( input: RoutineStructureInput ) {
	try {
		await upsertRoutineStructure( input );

		return {
			ok: true,
		};
	} catch (error) {
		const message = error instanceof Error ? error.message : "Error desconocido al editar la estructura.";

		throw new Error( `No se pudo editar la estructura. ${ message }` );
	}
}

export async function deleteTrainingRoutineStructureAction( input: RoutineStructureScopeInput ) {
	try {
		validateRoutineStructureScopeInput( input );
		const session = await requireCoachSession( "eliminar rutinas" );
		await assertStudentExists( input.studentId, session.sub );

		await prisma.trainingRoutineMonth.deleteMany( {
			where: {
				month: input.month,
				studentId: input.studentId,
				year: input.year,
			},
		} );

		return {
			ok: true,
		};
	} catch (error) {
		const message = error instanceof Error ? error.message : "Error desconocido al eliminar la rutina.";

		throw new Error( `No se pudo eliminar la rutina. ${ message }` );
	}
}
