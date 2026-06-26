"use server";

import prisma from "@/lib/prisma";
import { TEMP_COACH_ID } from "@/features/shared/temp-coach";
import {
	validateRoutineStructureScopeInput,
	validateRoutineStructureInput,
	type RoutineStructureInput,
	type RoutineStructureScopeInput,
} from "@/features/trainingRoutine/services/routine-structure";

async function assertStudentExists( studentId: string ) {
	const student = await prisma.user.findFirst( {
		select: {
			id: true,
		},
		where: {
			active: true,
			coachId: TEMP_COACH_ID,
			id: studentId,
			role: "STUDENT",
		},
	} );

	if (!student) {
		throw new Error( "No se encontro un estudiante activo para modificar rutinas." );
	}
}

async function upsertRoutineStructure( input: RoutineStructureInput ) {
	validateRoutineStructureInput( input );

	await assertStudentExists( input.studentId );

	const selectedWeeks = input.weeks.map( ( week ) => week.week );
	const existingRoutines = await prisma.trainingRoutine.findMany( {
		select: {
			id: true,
			week: true,
		},
		where: {
			month: input.month,
			studentId: input.studentId,
			week: {
				in: selectedWeeks,
			},
			year: input.year,
		},
	} );
	const existingRoutineByWeek = new Map( existingRoutines.map( ( routine ) => [ routine.week, routine ] ) );

	await prisma.$transaction( [
		prisma.trainingRoutine.deleteMany( {
			where: {
				month: input.month,
				studentId: input.studentId,
				week: {
					notIn: selectedWeeks,
				},
				year: input.year,
			},
		} ),
		...input.weeks.map( ( weekInput ) => {
			const existingRoutine = existingRoutineByWeek.get( weekInput.week );

			if (existingRoutine) {
				return prisma.trainingRoutine.update( {
					data: {
						name: `Semana ${ weekInput.week }`,
					},
					where: {
						id: existingRoutine.id,
					},
				} );
			}

			return prisma.trainingRoutine.create( {
				data: {
					month: input.month,
					name: `Semana ${ weekInput.week }`,
					objective: null,
					studentId: input.studentId,
					week: weekInput.week,
					year: input.year,
				},
			} );
		} ),
	] );

	const routines = await prisma.trainingRoutine.findMany( {
		select: {
			id: true,
			week: true,
		},
		where: {
			month: input.month,
			studentId: input.studentId,
			week: {
				in: selectedWeeks,
			},
			year: input.year,
		},
	} );
	const routineIdByWeek = new Map( routines.map( ( routine ) => [ routine.week, routine.id ] ) );
	const existingDays = await prisma.routineDay.findMany( {
		select: {
			dayNumber: true,
			trainingRoutineId: true,
		},
		where: {
			trainingRoutineId: {
				in: routines.map( ( routine ) => routine.id ),
			},
		},
	} );
	const existingDayKeys = new Set(
		existingDays.map( ( day ) => `${ day.trainingRoutineId }:${ day.dayNumber }` )
	);
	const dayOperations = input.weeks.flatMap( ( weekInput ) => {
		const routineId = routineIdByWeek.get( weekInput.week );

		if (!routineId) return [];

		return [
			prisma.routineDay.deleteMany( {
				where: {
					dayNumber: {
						notIn: weekInput.days,
					},
					trainingRoutineId: routineId,
				},
			} ),
			...weekInput.days.map( ( dayNumber ) =>
				existingDayKeys.has( `${ routineId }:${ dayNumber }` ) ? null : prisma.routineDay.create( {
					data: {
						dayNumber,
						trainingRoutineId: routineId,
					},
				} )
			).filter( ( operation ) => operation !== null ),
		];
	} );

	await prisma.$transaction( dayOperations );
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
		await assertStudentExists( input.studentId );

		await prisma.trainingRoutine.deleteMany( {
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
