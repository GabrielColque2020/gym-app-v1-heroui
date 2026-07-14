"use server";

import { requireCoachSession } from "@/features/auth/coach-session";
import prisma from "@/lib/prisma";
import {
	validateRoutineStructureScopeInput,
	validateRoutineStructureInput,
	type RoutineStructureInput,
	type RoutineStructureScopeInput,
} from "@/features/training-routine/services/routine-structure";

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
		throw new Error( "No se encontro un estudiante activo para modificar rutinas." );
	}
}

async function upsertRoutineStructure( input: RoutineStructureInput ) {
	validateRoutineStructureInput( input );
	const session = await requireCoachSession( "modificar rutinas" );

	await assertStudentExists( input.studentId, session.sub );

	const selectedWeeks = input.weeks.map( ( week ) => week.week );
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
				weeks: {
					select: {
						id: true,
						week: true,
					},
				},
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

		const existingRoutineByWeek = new Map( routineMonth.weeks.map( ( routineWeek ) => [ routineWeek.week, routineWeek ] ) );

		await tx.trainingRoutineWeek.deleteMany( {
			where: {
				trainingRoutineMonthId: routineMonth.id,
				week: {
					notIn: selectedWeeks,
				},
			},
		} );

		for (const weekInput of input.weeks) {
			const existingRoutine = existingRoutineByWeek.get( weekInput.week );

			if (existingRoutine) {
				await tx.trainingRoutineWeek.update( {
					data: {
						name: `Semana ${ weekInput.week }`,
					},
					where: {
						id: existingRoutine.id,
					},
				} );
				continue;
			}

			await tx.trainingRoutineWeek.create( {
				data: {
					name: `Semana ${ weekInput.week }`,
					trainingRoutineMonthId: routineMonth.id,
					week: weekInput.week,
				},
			} );
		}

		const routineWeeks = await tx.trainingRoutineWeek.findMany( {
			select: {
				id: true,
				week: true,
			},
			where: {
				trainingRoutineMonthId: routineMonth.id,
				week: {
					in: selectedWeeks,
				},
			},
		} );

		const routineWeekIdByWeek = new Map( routineWeeks.map( ( routineWeek ) => [ routineWeek.week, routineWeek.id ] ) );
		const existingDays = await tx.routineDay.findMany( {
			select: {
				dayNumber: true,
				trainingRoutineWeekId: true,
			},
			where: {
				trainingRoutineWeekId: {
					in: routineWeeks.map( ( routineWeek ) => routineWeek.id ),
				},
			},
		} );
		const existingDayKeys = new Set(
			existingDays.map( ( day ) => `${ day.trainingRoutineWeekId }:${ day.dayNumber }` ),
		);

		for (const weekInput of input.weeks) {
			const routineWeekId = routineWeekIdByWeek.get( weekInput.week );

			if (!routineWeekId) continue;

			await tx.routineDay.deleteMany( {
				where: {
					dayNumber: {
						notIn: weekInput.days,
					},
					trainingRoutineWeekId: routineWeekId,
				},
			} );

			for (const dayNumber of weekInput.days) {
				if (existingDayKeys.has( `${ routineWeekId }:${ dayNumber }` )) {
					continue;
				}

				await tx.routineDay.create( {
					data: {
						dayNumber,
						trainingRoutineWeekId: routineWeekId,
					},
				} );
			}
		}
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
