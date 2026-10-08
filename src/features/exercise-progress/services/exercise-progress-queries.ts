import {
	buildExerciseProgressSessions,
	type ExerciseProgressDetail,
	type ExerciseProgressListItem,
} from "@/features/exercise-progress/services/exercise-progress";
import prisma from "@/lib/prisma";

// El ejercicio que realmente se hizo. Si ese dia el estudiante cambio el
// ejercicio por una variante, el registro cuenta para la variante: son
// movimientos distintos y mezclarlos falsearia el progreso.
function buildEffectiveExerciseWhere( exerciseId: string ) {
	return {
		OR: [
			{ variantExerciseId: exerciseId },
			{ exerciseId, variantExerciseId: null },
		],
	};
}

// Los ejercicios en los que el estudiante tiene algo cargado, del que hizo mas
// recientemente al mas viejo, con cuantas sesiones tiene cada uno.
export async function getProgressExercises( studentId: string ): Promise<ExerciseProgressListItem[]> {
	const rows = ( await prisma.exerciseProgress.findMany( {
		select: {
			date: true,
			dayNumber: true,
			exerciseId: true,
			month: true,
			variantExerciseId: true,
			week: true,
			year: true,
		},
		where: {
			studentId,
		},
	} ) ) as Array<{
		date: Date;
		dayNumber: number;
		exerciseId: string | null;
		month: number;
		variantExerciseId: string | null;
		week: number;
		year: number;
	}>;
	const byExercise = new Map<string, { lastTime: number; sessionKeys: Set<string> }>();

	for (const row of rows) {
		const exerciseId = row.variantExerciseId ?? row.exerciseId;

		if (!exerciseId) continue;

		const entry = byExercise.get( exerciseId ) ?? { lastTime: 0, sessionKeys: new Set<string>() };

		entry.sessionKeys.add( `${ row.year }-${ row.month }-${ row.week }-${ row.dayNumber }` );
		entry.lastTime = Math.max( entry.lastTime, row.date.getTime() );
		byExercise.set( exerciseId, entry );
	}

	if (byExercise.size === 0) return [];

	const exercises = ( await prisma.exerciseCoach.findMany( {
		select: {
			id: true,
			name: true,
		},
		where: {
			id: {
				in: [ ...byExercise.keys() ],
			},
		},
	} ) ) as Array<{ id: string; name: string }>;

	return exercises
		.map( ( exercise ) => {
			const entry = byExercise.get( exercise.id );

			return {
				exerciseId: exercise.id,
				lastDate: new Date( entry?.lastTime ?? 0 ).toISOString(),
				name: exercise.name,
				sessionCount: entry?.sessionKeys.size ?? 0,
			};
		} )
		.sort( ( left, right ) => right.lastDate.localeCompare( left.lastDate ) );
}

// Todas las sesiones de un estudiante en un ejercicio. Devuelve `null` si el
// ejercicio no existe.
export async function getExerciseProgress( studentId: string, exerciseId: string ): Promise<ExerciseProgressDetail | null> {
	const exercise = ( await prisma.exerciseCoach.findUnique( {
		select: {
			id: true,
			name: true,
		},
		where: {
			id: exerciseId,
		},
	} ) ) as { id: string; name: string } | null;

	if (!exercise) return null;

	const rows = await prisma.exerciseProgress.findMany( {
		select: {
			date: true,
			dayNumber: true,
			month: true,
			repsCompleted: true,
			repsNumber: true,
			week: true,
			weightUsed: true,
			year: true,
		},
		where: {
			studentId,
			...buildEffectiveExerciseWhere( exerciseId ),
		},
	} );

	return {
		exercise,
		sessions: buildExerciseProgressSessions( rows ),
	};
}
