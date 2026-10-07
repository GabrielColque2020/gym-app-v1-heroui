import { Prisma } from "@/generated/prisma/client";
import prisma from "@/lib/prisma";

// Lo que hace falta leer de unas semanas para poder copiarlas enteras: dias,
// ejercicios en orden y las variantes de cada ejercicio.
export const routineWeeksCopyInclude = {
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
} satisfies Prisma.TrainingRoutineWeekInclude;

export type RoutineWeekCopySource = Prisma.TrainingRoutineWeekGetPayload<{
	include: typeof routineWeeksCopyInclude;
}>;

// Lo que se usa de una transaccion. El cliente de la app esta extendido, asi que
// su transaccion no es el `TransactionClient` comun de Prisma.
type RoutineWeeksCopyClient = Pick<typeof prisma, "routine" | "routineDay" | "trainingRoutineWeek">;

// De quien pasan a ser las semanas copiadas: el mes de un estudiante o una plantilla.
type RoutineWeeksCopyParent = { trainingRoutineMonthId: string } | { routineTemplateId: string };

export function countRoutineWeeksContent( weeks: RoutineWeekCopySource[] ) {
	const dayCount = weeks.reduce( ( count, week ) => count + week.routineDays.length, 0 );
	const exerciseCount = weeks.reduce(
		( count, week ) => count + week.routineDays.reduce( ( dayTotal, day ) => dayTotal + day.routines.length, 0 ),
		0,
	);

	return { dayCount, exerciseCount, weekCount: weeks.length };
}

// Copia semanas completas debajo de otro mes o de una plantilla. Los dias nacen
// sin terminar: lo que se copia es lo que armo el entrenador, no lo que hizo el
// estudiante.
export async function createRoutineWeeksCopy(
	tx: RoutineWeeksCopyClient,
	sourceWeeks: RoutineWeekCopySource[],
	parent: RoutineWeeksCopyParent,
) {
	for (const sourceWeek of sourceWeeks) {
		const week = await tx.trainingRoutineWeek.create( {
			data: {
				...parent,
				name: sourceWeek.name,
				week: sourceWeek.week,
			},
			select: {
				id: true,
			},
		} );

		for (const sourceDay of sourceWeek.routineDays) {
			const day = await tx.routineDay.create( {
				data: {
					dayNumber: sourceDay.dayNumber,
					isFinalized: false,
					trainingRoutineWeekId: week.id,
				},
				select: {
					id: true,
				},
			} );
			const copies = sourceDay.routines.map( ( routine ) => ( {
				data: {
					exerciseId: routine.exerciseId,
					observation: routine.observation,
					order: routine.order,
					reps: routine.reps,
					restSeconds: routine.restSeconds,
					routineDayId: day.id,
					sets: routine.sets,
				},
				variants: routine.variants,
			} ) );
			// Los ejercicios sin variantes van juntos en un `createMany`. Los que tienen
			// variantes se crean de a uno, porque `createMany` no admite relaciones anidadas.
			const plainRoutines = copies.filter( ( copy ) => copy.variants.length === 0 ).map( ( copy ) => copy.data );

			if (plainRoutines.length > 0) {
				await tx.routine.createMany( { data: plainRoutines } );
			}

			for (const copy of copies) {
				if (copy.variants.length === 0) continue;

				await tx.routine.create( {
					data: {
						...copy.data,
						variants: {
							create: copy.variants.map( ( variant ) => ( { variantExerciseId: variant.variantExerciseId } ) ),
						},
					},
				} );
			}
		}
	}
}
