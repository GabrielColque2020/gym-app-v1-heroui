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
import type {
	TrainingRoutineMonth,
	TrainingRoutineWeek,
} from "@/features/training-routine/services/training-routines-by-student";

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

async function getSourceRoutineMonth( studentId: string, month: number, year: number ): Promise<TrainingRoutineMonth | null> {
	return prisma.trainingRoutineMonth.findFirst( {
		include: {
			weeks: {
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
			},
		},
		where: {
			month,
			studentId,
			year,
		},
	} ) as unknown as TrainingRoutineMonth | null;
}

function getSourceRoutineWeeks( routineMonth: TrainingRoutineMonth | null, weeks?: number[] ): TrainingRoutineWeek[] {
	if (!routineMonth) return [];

	return weeks
		? routineMonth.weeks.filter( ( routineWeek ) => weeks.includes( routineWeek.week ) )
		: routineMonth.weeks;
}

export async function getTrainingRoutineCopySourceAction( input: TrainingRoutineCopySourceInput ) {
	try {
		validateCopySourceInput( input );
		const session = await requireCoachSession( "consultar la rutina origen" );
		await assertStudentExists( input.studentId, session.sub );

		const routineMonth = await getSourceRoutineMonth( input.studentId, input.month, input.year );
		const routineWeeks = getSourceRoutineWeeks( routineMonth );
		const dayCount = routineWeeks.reduce( ( count, routineWeek ) => count + routineWeek.routineDays.length, 0 );
		const exerciseCount = routineWeeks.reduce(
			( count, routineWeek ) => count + routineWeek.routineDays.reduce(
				( dayTotal, day ) => dayTotal + day.routines.length,
				0,
			),
			0,
		);

			return {
				dayCount,
				exerciseCount,
				hasRoutine: routineWeeks.length > 0,
				routineWeeks: routineWeeks.map( ( routineWeek ) => ( {
					dayCount: routineWeek.routineDays.length,
					exerciseCount: routineWeek.routineDays.reduce( ( count, day ) => count + day.routines.length, 0 ),
					id: routineWeek.id,
					week: routineWeek.week,
				} ) ),
				weekCount: routineWeeks.length,
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

		const sourceRoutineMonth = await getSourceRoutineMonth( input.studentId, input.sourceMonth, input.sourceYear );
		const sourceRoutines = getSourceRoutineWeeks( sourceRoutineMonth );

		if (sourceRoutines.length === 0) {
			throw new Error( "El mes origen no tiene rutina para copiar." );
		}

		await prisma.$transaction( async ( tx ) => {
			await tx.trainingRoutineMonth.deleteMany( {
				where: {
					month: input.destinationMonth,
					studentId: input.studentId,
					year: input.destinationYear,
				},
			} );

			const destinationRoutineMonth = await tx.trainingRoutineMonth.create( {
				data: {
					month: input.destinationMonth,
					objective: sourceRoutineMonth?.objective ?? null,
					studentId: input.studentId,
					year: input.destinationYear,
				},
				select: {
					id: true,
				},
			} );

			for (const sourceRoutine of sourceRoutines) {
				const destinationRoutine = await tx.trainingRoutineWeek.create( {
					data: {
						name: sourceRoutine.name,
						trainingRoutineMonthId: destinationRoutineMonth.id,
						week: sourceRoutine.week,
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
							trainingRoutineWeekId: destinationRoutine.id,
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
		const sourceRoutineMonth = await getSourceRoutineMonth( input.studentId, input.sourceMonth, input.sourceYear );
		const sourceRoutines = getSourceRoutineWeeks( sourceRoutineMonth, sourceWeeks );
		const sourceRoutineByWeek = new Map( sourceRoutines.map( ( routine ) => [ routine.week, routine ] ) );

		for (const mapping of input.weekMappings) {
			if (!sourceRoutineByWeek.has( mapping.sourceWeek )) {
				throw new Error( `La semana ${ mapping.sourceWeek } no existe en el origen.` );
			}
		}

		const destinationWeeks = input.weekMappings.map( ( mapping ) => mapping.destinationWeek );

		await prisma.$transaction( async ( tx ) => {
			const destinationRoutineMonth = await tx.trainingRoutineMonth.upsert( {
				create: {
					month: input.destinationMonth,
					objective: sourceRoutineMonth?.objective ?? null,
					studentId: input.studentId,
					year: input.destinationYear,
				},
				update: {},
				where: {
					studentId_month_year: {
						month: input.destinationMonth,
						studentId: input.studentId,
						year: input.destinationYear,
					},
				},
			} );

			await tx.trainingRoutineWeek.deleteMany( {
				where: {
					trainingRoutineMonthId: destinationRoutineMonth.id,
					week: {
						in: destinationWeeks,
					},
				},
			} );

			for (const mapping of input.weekMappings) {
				const sourceRoutine = sourceRoutineByWeek.get( mapping.sourceWeek );

				if (!sourceRoutine) continue;

				const destinationRoutine = await tx.trainingRoutineWeek.create( {
					data: {
						name: `Semana ${ mapping.destinationWeek }`,
						trainingRoutineMonthId: destinationRoutineMonth.id,
						week: mapping.destinationWeek,
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
							trainingRoutineWeekId: destinationRoutine.id,
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
