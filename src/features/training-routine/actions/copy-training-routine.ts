"use server";

import { runAction } from "@/lib/run-action";
import { requireCoachSession } from "@/features/auth/coach-session";
import prisma from "@/lib/prisma";
import {
	type CopyTrainingRoutineMonthInput,
	type CopyTrainingRoutineWeeksInput,
	getCopySourceStudentId,
	type LatestTrainingRoutineMonthInput,
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
			coachId,
			id: studentId,
			role: "STUDENT",
		},
	} );

	// Tambien un estudiante inactivo: el entrenador le puede dejar la rutina lista.
	if (!student) {
		throw new Error( "No se encontró el estudiante para copiarle la rutina." );
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
								include: {
									variants: {
										select: {
											variantExerciseId: true,
										},
									},
								},
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

type CopySourceRoutine = TrainingRoutineWeek[ "routineDays" ][ number ][ "routines" ][ number ] & {
	variants?: Array<{ variantExerciseId: string }>;
};

// Los ejercicios sin variantes van juntos en un `createMany`. Los que tienen
// variantes se crean de a uno, porque `createMany` no admite relaciones anidadas.
function splitRoutinesForCopy( routines: CopySourceRoutine[], routineDayId: string ) {
	const copies = routines.map( ( routine ) => ( {
		data: {
			exerciseId: routine.exerciseId,
			observation: routine.observation,
			order: routine.order,
			reps: routine.reps,
			restSeconds: routine.restSeconds,
			routineDayId,
			sets: routine.sets,
		},
		variants: routine.variants ?? [],
	} ) );

	return {
		plainRoutines: copies.filter( ( copy ) => copy.variants.length === 0 ).map( ( copy ) => copy.data ),
		routinesWithVariants: copies.filter( ( copy ) => copy.variants.length > 0 ).map( ( copy ) => ( {
			...copy.data,
			variants: {
				create: copy.variants.map( ( variant ) => ( { variantExerciseId: variant.variantExerciseId } ) ),
			},
		} ) ),
	};
}

function getSourceRoutineWeeks( routineMonth: TrainingRoutineMonth | null, weeks?: number[] ): TrainingRoutineWeek[] {
	if (!routineMonth) return [];

	return weeks
		? routineMonth.weeks.filter( ( routineWeek ) => weeks.includes( routineWeek.week ) )
		: routineMonth.weeks;
}

export async function getTrainingRoutineCopySourceAction( input: TrainingRoutineCopySourceInput ) {
	return runAction( "No se pudo consultar la rutina origen.", async () => {
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
	} );
}

// El ultimo mes con rutina anterior al indicado. Es el origen que casi siempre
// se quiere copiar, y no siempre es el mes calendario anterior.
export async function getLatestTrainingRoutineMonthAction( input: LatestTrainingRoutineMonthInput ) {
	return runAction( "No se pudo consultar la última rutina.", async () => {
		validateCopySourceInput( input );
		const session = await requireCoachSession( "consultar la última rutina" );
		await assertStudentExists( input.studentId, session.sub );

		return await prisma.trainingRoutineMonth.findFirst( {
			orderBy: [ { year: "desc" }, { month: "desc" } ],
			select: {
				month: true,
				year: true,
			},
			where: {
				OR: [
					{ year: { lt: input.year } },
					{ month: input.inclusive ? { lte: input.month } : { lt: input.month }, year: input.year },
				],
				studentId: input.studentId,
				weeks: { some: {} },
			},
		} );
	} );
}

export async function copyTrainingRoutineMonthAction( input: CopyTrainingRoutineMonthInput ) {
	return runAction( "No se pudo copiar la rutina.", async () => {
		validateCopyMonthInput( input );
		const session = await requireCoachSession( "copiar la rutina" );
		const sourceStudentId = getCopySourceStudentId( input );
		await assertStudentExists( input.studentId, session.sub );
		// El origen tambien tiene que ser un estudiante de este coach.
		if (sourceStudentId !== input.studentId) await assertStudentExists( sourceStudentId, session.sub );

		const sourceRoutineMonth = await getSourceRoutineMonth( sourceStudentId, input.sourceMonth, input.sourceYear );
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

					const { plainRoutines, routinesWithVariants } = splitRoutinesForCopy( sourceDay.routines, destinationDay.id );

					if (plainRoutines.length > 0) {
						await tx.routine.createMany( { data: plainRoutines } );
					}

					for (const routine of routinesWithVariants) {
						await tx.routine.create( { data: routine } );
					}
				}
			}
		} );

		return {
			ok: true,
		};
	} );
}

export async function copyTrainingRoutineWeeksAction( input: CopyTrainingRoutineWeeksInput ) {
	return runAction( "No se pudieron copiar las semanas.", async () => {
		validateCopyWeeksInput( input );
		const session = await requireCoachSession( "copiar semanas" );
		const sourceStudentId = getCopySourceStudentId( input );
		await assertStudentExists( input.studentId, session.sub );
		if (sourceStudentId !== input.studentId) await assertStudentExists( sourceStudentId, session.sub );

		const sourceWeeks = input.weekMappings.map( ( mapping ) => mapping.sourceWeek );
		const sourceRoutineMonth = await getSourceRoutineMonth( sourceStudentId, input.sourceMonth, input.sourceYear );
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

					const { plainRoutines, routinesWithVariants } = splitRoutinesForCopy( sourceDay.routines, destinationDay.id );

					if (plainRoutines.length > 0) {
						await tx.routine.createMany( { data: plainRoutines } );
					}

					for (const routine of routinesWithVariants) {
						await tx.routine.create( { data: routine } );
					}
				}
			}
		} );

		return {
			ok: true,
		};
	} );
}
