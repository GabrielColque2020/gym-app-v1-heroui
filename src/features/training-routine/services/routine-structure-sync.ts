import type { RoutineStructureWeekInput } from "@/features/training-routine/services/routine-structure";
import prisma from "@/lib/prisma";

// Lo que se usa de una transaccion. El cliente de la app esta extendido, asi que
// su transaccion no es el `TransactionClient` comun de Prisma.
type RoutineStructureClient = Pick<typeof prisma, "routineDay" | "trainingRoutineWeek">;

// De quien son las semanas: del mes de un estudiante o de una plantilla.
type RoutineStructureParent = { trainingRoutineMonthId: string } | { routineTemplateId: string };

// Deja las semanas y los dias de una rutina como se pidieron: crea los que
// faltan y borra los que sobran. Los que ya estaban no se tocan, asi que sus
// ejercicios se conservan.
export async function syncRoutineWeeksStructure(
	tx: RoutineStructureClient,
	parent: RoutineStructureParent,
	weeks: RoutineStructureWeekInput[],
) {
	const selectedWeeks = weeks.map( ( week ) => week.week );
	const existingWeeks = await tx.trainingRoutineWeek.findMany( {
		select: {
			id: true,
			week: true,
		},
		where: parent,
	} );
	const existingWeekNumbers = new Set( existingWeeks.map( ( routineWeek ) => routineWeek.week ) );

	await tx.trainingRoutineWeek.deleteMany( {
		where: {
			...parent,
			week: {
				notIn: selectedWeeks,
			},
		},
	} );

	for (const weekInput of weeks) {
		if (existingWeekNumbers.has( weekInput.week )) {
			await tx.trainingRoutineWeek.updateMany( {
				data: {
					name: `Semana ${ weekInput.week }`,
				},
				where: {
					...parent,
					week: weekInput.week,
				},
			} );
			continue;
		}

		await tx.trainingRoutineWeek.create( {
			data: {
				...parent,
				name: `Semana ${ weekInput.week }`,
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
			...parent,
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

	for (const weekInput of weeks) {
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
}
