"use server";

import { getRoutineDayAction } from "@/features/routine/actions/get-routine-day";
import {
	assertRoutineCatalogExercisesAvailable,
	normalizeRoutineDayMutationInput,
	persistRoutineDayExercises,
	validateNormalizedRoutineDayExercises,
} from "@/features/routine/actions/routine-day-mutations.utils";
import { getRoutineDayDetailBase } from "@/features/routine/services/routine-day-detail";
import type { SaveRoutineDayExerciseInput } from "@/features/routine/services/routine-day-editor";

export type SaveRoutineDayExercisesActionInput = {
	exercises: SaveRoutineDayExerciseInput[];
	routineDayId: string;
	studentId?: string | null;
	coachId?: string | null;
};

export async function saveRoutineDayExercisesAction( input: SaveRoutineDayExercisesActionInput ) {
	try {
		const {
			coachId,
			exercises,
			routineDayId,
			studentId,
		} = normalizeRoutineDayMutationInput( input );

		if (!routineDayId) {
			throw new Error( "Seleccioná un dia valido antes de guardar cambios." );
		}

		validateNormalizedRoutineDayExercises( exercises );

		const routineDay = await getRoutineDayDetailBase( {
			coachId,
			routineDayId,
			studentId,
		} );

		await assertRoutineCatalogExercisesAvailable( exercises );
		await persistRoutineDayExercises( routineDay, exercises );

		return await getRoutineDayAction( {
			coachId,
			routineDayId: routineDay.id,
			studentId,
		} );
	} catch (error) {
		const message = error instanceof Error ? error.message : "Error desconocido al guardar la rutina del dia.";

		throw new Error( `No se pudo guardar el dia de rutina. ${ message }` );
	}
}
