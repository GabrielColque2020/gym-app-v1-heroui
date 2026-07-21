"use server";

import { requireCoachSession } from "@/features/auth/coach-session";
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
		const session = await requireCoachSession( "guardar el dia de rutina" );
		const {
			coachId,
			exercises,
			routineDayId,
			studentId,
		} = normalizeRoutineDayMutationInput( input );
		const resolvedCoachId = coachId || session.sub;

		if (!routineDayId) {
			throw new Error( "Seleccioná un dia valido antes de guardar cambios." );
		}

		validateNormalizedRoutineDayExercises( exercises );

		const routineDay = await getRoutineDayDetailBase( {
			coachId: resolvedCoachId,
			routineDayId,
			studentId,
		} );

		const resolvedExercises = await assertRoutineCatalogExercisesAvailable( resolvedCoachId, exercises );
		await persistRoutineDayExercises( routineDay, resolvedExercises );

		return await getRoutineDayAction( {
			coachId: resolvedCoachId,
			routineDayId: routineDay.id,
			studentId,
		} );
	} catch (error) {
		const message = error instanceof Error ? error.message : "Error desconocido al guardar la rutina del dia.";

		throw new Error( `No se pudo guardar el dia de rutina. ${ message }` );
	}
}
