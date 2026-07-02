"use server";

import { requireCoachSession } from "@/features/auth/coach-session";
import prisma from "@/lib/prisma";
import {
	type CopyTrainingRoutineMonthInput,
	type CopyTrainingRoutineWeeksInput,
	type TrainingRoutineCopySourceInput,
	validateCopyMonthInput,
	validateCopySourceInput,
	validateCopyWeeksInput,
} from "@/features/training-routine/services/training-routine-copy";
import type { TrainingRoutine } from "@/features/training-routine/services/training-routines-by-student";

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
		throw new Error( "No se encontro un estudiante activo para copiar rutinas." );
	}
}

async function getSourceRoutines( studentId: string, month: number, year: number, weeks?: number[] ): Promise<TrainingRoutine[]> {
	return prisma.trainingRoutine.findMany( {
		include: {
			routineDays: {
				include: {
					routines: {
						orderBy: {
							order: "asc",
						},
					},
				},
				orderBy: {
					dayNumber: "asc",
				},
			},
		},
		orderBy: {
			week: "asc",
		},
		where: {
			month,
			studentId,
			week: weeks ? { in: weeks } : undefined,
			year,
		},
	} ) as unknown as TrainingRoutine[];
}

export async function getTrainingRoutineCopySourceAction( input: TrainingRoutineCopySourceInput ) {
	try {
		validateCopySourceInput( input );
		const session = await requireCoachSession( "consultar la rutina origen" );
		await assertStudentExists( input.studentId, session.sub );

		const routines = await getSourceRoutines( input.studentId, input.month, input.year );
		const dayCount = routines.reduce( ( count, routine ) => count + routine.routineDays.length, 0 );
		const exerciseCount = routines.reduce(
			( count, routine ) => count + routine.routineDays.reduce(
				( dayTotal, day ) => dayTotal + day.routines.length,
				0,
			),
			0,
		);

		return {
			dayCount,
			exerciseCount,
			hasRoutine: routines.length > 0,
			routines: routines.map( ( routine ) => ( {
				dayCount: routine.routineDays.length,
				exerciseCount: routine.routineDays.reduce( ( count, day ) => count + day.routines.length, 0 ),
				id: routine.id,
				week: routine.week,
			} ) ),
			weekCount: routines.length,
		};
	} catch (error) {
		const message = error instanceof Error ? error.message : "Error desconocido al consultar la rutina origen.";

		throw new Error( `No se pudo consultar la rutina origen. ${ message }` );
	}
}

export async function copyTrainingRoutineMonthAction( input: CopyTrainingRoutineMonthInput ) {
	try {
		validateCopyMonthInput( input );
		const session = await requireCoachSession( "copiar la rutina" );
		await assertStudentExists( input.studentId, session.sub );

		const sourceRoutines = await getSourceRoutines( input.studentId, input.sourceMonth, input.sourceYear );

		if (sourceRoutines.length === 0) {
			throw new Error( "El mes origen no tiene rutina para copiar." );
		}

		await prisma.$transaction( async ( tx ) => {
			await tx.trainingRoutine.deleteMany( {
				where: {
					month: input.destinationMonth,
					studentId: input.studentId,
					year: input.destinationYear,
				},
			} );

			for (const sourceRoutine of sourceRoutines) {
				const destinationRoutine = await tx.trainingRoutine.create( {
					data: {
						month: input.destinationMonth,
						name: sourceRoutine.name,
						objective: sourceRoutine.objective,
						studentId: input.studentId,
						week: sourceRoutine.week,
						year: input.destinationYear,
					},
					select: {
						id: true,
					},
				} );

				for (const sourceDay of sourceRoutine.routineDays) {
					const destinationDay = await tx.routineDay.create( {
						data: {
							dayNumber: sourceDay.dayNumber,
							isFinalized: false,
							trainingRoutineId: destinationRoutine.id,
						},
						select: {
							id: true,
						},
					} );

					if (sourceDay.routines.length > 0) {
						await tx.routine.createMany( {
							data: sourceDay.routines.map( ( routine ) => ( {
								exerciseId: routine.exerciseId,
								observation: routine.observation,
								order: routine.order,
								reps: routine.reps,
								routineDayId: destinationDay.id,
								sets: routine.sets,
							} ) ),
						} );
					}
				}
			}
		} );

		return {
			ok: true,
		};
	} catch (error) {
		const message = error instanceof Error ? error.message : "Error desconocido al copiar la rutina.";

		throw new Error( `No se pudo copiar la rutina. ${ message }` );
	}
}

export async function copyTrainingRoutineWeeksAction( input: CopyTrainingRoutineWeeksInput ) {
	try {
		validateCopyWeeksInput( input );
		const session = await requireCoachSession( "copiar semanas" );
		await assertStudentExists( input.studentId, session.sub );

		const sourceWeeks = input.weekMappings.map( ( mapping ) => mapping.sourceWeek );
		const sourceRoutines = await getSourceRoutines(
			input.studentId,
			input.sourceMonth,
			input.sourceYear,
			sourceWeeks,
		);
		const sourceRoutineByWeek = new Map( sourceRoutines.map( ( routine ) => [ routine.week, routine ] ) );

		for (const mapping of input.weekMappings) {
			if (!sourceRoutineByWeek.has( mapping.sourceWeek )) {
				throw new Error( `La semana ${ mapping.sourceWeek } no existe en el origen.` );
			}
		}

		const destinationWeeks = input.weekMappings.map( ( mapping ) => mapping.destinationWeek );

		await prisma.$transaction( async ( tx ) => {
			await tx.trainingRoutine.deleteMany( {
				where: {
					month: input.destinationMonth,
					studentId: input.studentId,
					week: {
						in: destinationWeeks,
					},
					year: input.destinationYear,
				},
			} );

			for (const mapping of input.weekMappings) {
				const sourceRoutine = sourceRoutineByWeek.get( mapping.sourceWeek );

				if (!sourceRoutine) continue;

				const destinationRoutine = await tx.trainingRoutine.create( {
					data: {
						month: input.destinationMonth,
						name: `Semana ${ mapping.destinationWeek }`,
						objective: sourceRoutine.objective,
						studentId: input.studentId,
						week: mapping.destinationWeek,
						year: input.destinationYear,
					},
					select: {
						id: true,
					},
				} );

				for (const sourceDay of sourceRoutine.routineDays) {
					const destinationDay = await tx.routineDay.create( {
						data: {
							dayNumber: sourceDay.dayNumber,
							isFinalized: false,
							trainingRoutineId: destinationRoutine.id,
						},
						select: {
							id: true,
						},
					} );

					if (sourceDay.routines.length > 0) {
						await tx.routine.createMany( {
							data: sourceDay.routines.map( ( routine ) => ( {
								exerciseId: routine.exerciseId,
								observation: routine.observation,
								order: routine.order,
								reps: routine.reps,
								routineDayId: destinationDay.id,
								sets: routine.sets,
							} ) ),
						} );
					}
				}
			}
		} );

		return {
			ok: true,
		};
	} catch (error) {
		const message = error instanceof Error ? error.message : "Error desconocido al copiar semanas.";

		throw new Error( `No se pudieron copiar las semanas. ${ message }` );
	}
}
