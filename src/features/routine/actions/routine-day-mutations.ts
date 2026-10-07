"use server";

import { requireCoachSession } from "@/features/auth/coach-session";
import { getRoutineDayAction } from "@/features/routine/actions/get-routine-day";
import {
	assertRoutineCatalogExercisesAvailable,
	normalizeRoutineDayMutationInput,
	persistRoutineDayExercises,
	validateNormalizedRoutineDayExercises,
} from "@/features/routine/actions/routine-day-mutations.utils";
import { getRoutineDaySaveTarget, type RoutineDayDetail } from "@/features/routine/services/routine-day-detail";
import type { SaveRoutineDayExerciseInput } from "@/features/routine/services/routine-day-editor";

export type SaveRoutineDayExercisesActionInput = {
	exercises: SaveRoutineDayExerciseInput[];
	routineDayId: string;
	studentId?: string | null;
	coachId?: string | null;
};

// Como quedo cada fila despues de guardar, sin los datos del ejercicio.
export type SavedRoutineRow = {
	id: string;
	observation: string | null;
	order: number;
	reps: string;
	sets: string;
};

// Si se agregaron o quitaron ejercicios vuelve el dia entero, porque hay filas
// nuevas que la pantalla no conoce. Si solo cambiaron series, repeticiones, orden
// u observaciones (lo mas comun con el guardado automatico) vuelven solo esas
// filas y la pantalla las aplica sobre lo que ya tiene.
export type SaveRoutineDayExercisesResult =
	| { routineDay: RoutineDayDetail; routines: null }
	| { routineDay: null; routines: SavedRoutineRow[] };

export async function saveRoutineDayExercisesAction( input: SaveRoutineDayExercisesActionInput ): Promise<SaveRoutineDayExercisesResult> {
	try {
		const session = await requireCoachSession( "guardar el día de rutina" );
		const {
			coachId,
			exercises,
			routineDayId,
			studentId,
		} = normalizeRoutineDayMutationInput( input );
		const resolvedCoachId = coachId || session.sub;

		if (!routineDayId) {
			throw new Error( "Seleccioná un día válido antes de guardar cambios." );
		}

		validateNormalizedRoutineDayExercises( exercises );

		const routineDay = await getRoutineDaySaveTarget( {
			coachId: resolvedCoachId,
			routineDayId,
			studentId,
		} );

		const resolvedExercises = await assertRoutineCatalogExercisesAvailable(
			resolvedCoachId,
			exercises,
			routineDay.routines.flatMap( ( routine ) => routine.exerciseId ? [ routine.exerciseId ] : [] ),
		);
		const savedRoutines = await persistRoutineDayExercises( routineDay.id, resolvedExercises );

		if (savedRoutines) {
			return { routineDay: null, routines: savedRoutines };
		}

		return {
			routineDay: await getRoutineDayAction( {
				coachId: resolvedCoachId,
				routineDayId: routineDay.id,
				studentId,
			} ),
			routines: null,
		};
	} catch (error) {
		const message = error instanceof Error ? error.message : "Error desconocido al guardar la rutina del día.";

		throw new Error( `No se pudo guardar el día de rutina. ${ message }` );
	}
}
