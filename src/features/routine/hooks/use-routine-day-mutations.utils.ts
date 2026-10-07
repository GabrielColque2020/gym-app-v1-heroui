import type { QueryClient } from "@tanstack/react-query";

import type { RoutineDayDetailBase } from "@/features/routine/actions/get-routine-day";
import type { SaveRoutineDayExercisesActionInput, SavedRoutineRow } from "@/features/routine/actions/routine-day-mutations";
import { routineDayQueryKey } from "@/features/routine/services/routine-day-query";
import { getRoutineDayDraft, routineDayDraftStore } from "@/features/routine/stores/use-routine-day-draft-store";

// Un ejercicio del catalogo global se guarda como una copia propia del coach, con
// otro id. El borrador sigue teniendo el id del global: si quedara asi, nunca
// seria igual a lo guardado y el dia se volveria a guardar solo una y otra vez.
// Aca se pasa cada fila del borrador al ejercicio con el que quedo guardada.
function alignDraftWithSavedExercises(
	savedRoutineDay: RoutineDayDetailBase,
	input: SaveRoutineDayExercisesActionInput,
) {
	const draft = getRoutineDayDraft( input.routineDayId );

	if (!draft) return;

	// Lo enviado y lo guardado se emparejan por orden, que no se repite en un dia.
	const savedByOrder = new Map( savedRoutineDay.routines.map( ( routine ) => [ routine.order, routine ] ) );
	const savedBySentExerciseId = new Map( input.exercises.flatMap( ( sent ) => {
		const saved = savedByOrder.get( sent.order );
		const isSameExercise = saved?.exerciseId === sent.exerciseId
			|| saved?.exercise?.globalExerciseId === sent.exerciseId;

		return saved && isSameExercise ? [ [ sent.exerciseId, saved ] as const ] : [];
	} ) );
	let hasChanges = false;
	const nextDraft = draft.map( ( routine ) => {
		const saved = savedBySentExerciseId.get( routine.exerciseId );

		if (!saved?.exerciseId || saved.exerciseId === routine.exerciseId) return routine;

		hasChanges = true;

		return { ...routine, exercise: saved.exercise, exerciseId: saved.exerciseId };
	} );

	if (hasChanges) routineDayDraftStore.getState().setDraft( input.routineDayId, nextDraft );
}

// Arma el dia guardado a partir del que la pantalla ya tiene, cuando el guardado
// solo cambio series, repeticiones, orden u observaciones. Devuelve `null` si lo
// que hay en pantalla no coincide con las filas guardadas: ahi hay que pedirlo.
export function applySavedRoutineRows(
	queryClient: QueryClient,
	input: SaveRoutineDayExercisesActionInput,
	savedRows: SavedRoutineRow[],
): RoutineDayDetailBase | null {
	const cachedRoutineDay = queryClient.getQueryData<RoutineDayDetailBase>(
		routineDayQueryKey( input.routineDayId, input.studentId ),
	);

	if (!cachedRoutineDay || cachedRoutineDay.routines.length !== savedRows.length) return null;

	const cachedById = new Map( cachedRoutineDay.routines.map( ( routine ) => [ routine.id, routine ] ) );
	const routines: RoutineDayDetailBase["routines"] = [];

	for (const savedRow of savedRows) {
		const cachedRoutine = cachedById.get( savedRow.id );

		if (!cachedRoutine) return null;

		routines.push( { ...cachedRoutine, ...savedRow } );
	}

	return {
		...cachedRoutineDay,
		routines: routines.sort( ( left, right ) => left.order - right.order ),
	};
}

export async function syncRoutineDayAfterSave(
	queryClient: QueryClient,
	savedRoutineDay: RoutineDayDetailBase,
	input: SaveRoutineDayExercisesActionInput,
) {
	alignDraftWithSavedExercises( savedRoutineDay, input );

	// La respuesta del guardado ya es el dia tal como quedo: se usa directamente,
	// sin volver a pedirlo. Con el guardado automatico eso era un pedido de mas
	// por cada cambio.
	//
	// El borrador no se descarta aca. Lo descarta `useRoutineDayDraft` cuando ve que
	// quedo igual a lo guardado; si el coach siguio escribiendo mientras viajaba
	// el pedido, no queda igual y esos cambios entran en el guardado siguiente.
	queryClient.setQueryData( routineDayQueryKey( input.routineDayId, input.studentId ), savedRoutineDay );
}
