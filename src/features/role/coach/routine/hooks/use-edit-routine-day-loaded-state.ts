"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import type { ExerciseListItem } from "@/features/exercises/types/exercise-list-item";
import type { RoutineDayDetailBase } from "@/features/routine/actions/get-routine-day";

import { toast } from "@heroui/react";

import { syncCoachTrainingRoutinesAfterSave } from "@/features/role/coach/routine/hooks/use-save-routine-day-exercises.utils";
import { useRoutineDayDraft } from "@/features/routine/hooks/use-routine-day-draft";
import { useSaveRoutineDayExercises } from "@/features/routine/hooks/use-routine-day-mutations";
import { mapDraftToSaveInput } from "@/features/routine/services/routine-day-editor";

// Espera despues del ultimo cambio antes de guardar solo: lo justo para no
// guardar a mitad de una palabra o de un numero de dos cifras.
const AUTOSAVE_DELAY_MS = 700;

// `pending`: hay cambios y se van a guardar solos. `blocked`: hay cambios pero
// falta algun dato para poder guardarlos. `unsaved`: hay cambios que quedaron de
// una visita anterior y no se guardan solos; el coach decide guardarlos o descartarlos.
export type RoutineDaySaveStatus = "blocked" | "error" | "pending" | "saved" | "saving" | "unsaved";

function isRequiredRoutineFieldComplete( value: string ) {
	return value.trim().length > 0;
}

type UseEditRoutineDayLoadedStateParams = {
	data: RoutineDayDetailBase;
	isRefreshing: boolean;
	onRefreshRoutineDayAction: () => Promise<RoutineDayDetailBase | null>;
	routineDayId: string;
	studentId: string | null;
};

export function useEditRoutineDayLoadedState( {
	data,
	isRefreshing,
	onRefreshRoutineDayAction,
	routineDayId,
	studentId,
}: UseEditRoutineDayLoadedStateParams ) {
	const [ isRefreshConfirmOpen, setIsRefreshConfirmOpen ] = useState( false );
	const saveRoutineDay = useSaveRoutineDayExercises( {
		onSuccessAction: syncCoachTrainingRoutinesAfterSave,
	} );
	const draft = useRoutineDayDraft( {
		isSaving: saveRoutineDay.isPending,
		routineDayId,
		sourceRoutines: data.routines,
	} );
	const {
		addExercise,
		addedExerciseIds,
		draftRoutines,
		getSuggestedOrder,
		hasHydrated,
		isDirty,
		resetDraft,
		validationError,
	} = draft;
	// El dia que el coach edito en esta visita. El guardado automatico solo actua
	// sobre cambios hechos ahora: un borrador que quedo de otra sesion puede ser
	// mas viejo que lo que hay en el servidor, y guardarlo solo lo pisaria.
	const [ editedDayId, setEditedDayId ] = useState<string | null>( null );
	const hasSessionEdits = editedDayId === routineDayId;
	const markEdited = () => setEditedDayId( routineDayId );
	const updateExerciseField: typeof draft.updateExerciseField = ( ...args ) => {
		markEdited();
		draft.updateExerciseField( ...args );
	};
	const deleteExercise: typeof draft.deleteExercise = ( ...args ) => {
		markEdited();
		draft.deleteExercise( ...args );
	};
	const moveExercise: typeof draft.moveExercise = ( ...args ) => {
		markEdited();
		draft.moveExercise( ...args );
	};
	const replaceWithCopies: typeof draft.replaceWithCopies = ( ...args ) => {
		markEdited();
		draft.replaceWithCopies( ...args );
	};
	const routine = data.trainingRoutine;
	const incompleteRequiredFieldsCount = draftRoutines.filter(
		( draftRoutine ) =>
			!isRequiredRoutineFieldComplete( draftRoutine.sets ) ||
			!isRequiredRoutineFieldComplete( draftRoutine.reps ),
	).length;
	const requiredFieldsMessage = incompleteRequiredFieldsCount > 0
		? `Completá series y repeticiones en ${ incompleteRequiredFieldsCount } ${ incompleteRequiredFieldsCount === 1 ? "ejercicio" : "ejercicios" } para que el día se guarde.`
		: null;
	// Un dia sin ejercicios tambien se guarda: es como queda al quitar el ultimo.
	const canSave = isDirty && !validationError && !requiredFieldsMessage;
	const isSaveDisabled = !canSave || saveRoutineDay.isPending;
	const draftSignature = useMemo( () => JSON.stringify( mapDraftToSaveInput( draftRoutines ) ), [ draftRoutines ] );
	// El contenido cuyo guardado automatico fallo: no se reintenta solo, para no
	// insistir cada segundo con un pedido que vuelve a fallar.
	const [ failedSignature, setFailedSignature ] = useState<string | null>( null );

	function handleAddExercise(
		exercise: ExerciseListItem,
		order: number,
		prescription?: { reps: string; sets: string },
	) {
		markEdited();

		const result = addExercise( exercise, order );

		if (result.error !== undefined) {
			toast.danger( "No se pudo agregar el ejercicio", {
				description: result.error,
			} );

			return;
		}

		// Las series y repeticiones elegidas en el drawer ya quedan cargadas.
		if (prescription?.sets) updateExerciseField( result.routine.clientId, "sets", prescription.sets );
		if (prescription?.reps) updateExerciseField( result.routine.clientId, "reps", prescription.reps );
	}

	const handleConfirmRefresh = useCallback( async () => {
		setIsRefreshConfirmOpen( false );

		try {
			const refreshedData = await onRefreshRoutineDayAction();

			if (refreshedData) {
				resetDraft();
			}

			toast.success( "Rutina actualizada", {
				description: "Se recargaron los ejercicios del día seleccionado.",
			} );
		} catch (refreshError) {
			toast.danger( "Error al actualizar", {
				description: refreshError instanceof Error ? refreshError.message : "No se pudo refrescar la rutina.",
			} );
		}
	}, [ onRefreshRoutineDayAction, resetDraft ] );

	const handleRefresh = useCallback( () => {
		if (isRefreshing) return;

		if (isDirty) {
			setIsRefreshConfirmOpen( true );
			return;
		}

		void handleConfirmRefresh();
	}, [ handleConfirmRefresh, isDirty, isRefreshing ] );

	// `silent` es el guardado automatico: no avisa cada vez que guarda, solo si falla.
	const saveDraft = useCallback( async ( { silent }: { silent: boolean } ) => {
		if (requiredFieldsMessage) {
			if (!silent) {
				toast.danger( "No se puede guardar", {
					description: requiredFieldsMessage,
				} );
			}

			return false;
		}

		if (validationError) {
			if (!silent) {
				toast.danger( "No se puede guardar", {
					description: validationError,
				} );
			}

			return false;
		}

		try {
			await saveRoutineDay.mutateAsync( {
				exercises: mapDraftToSaveInput( draftRoutines ),
				routineDayId,
				studentId,
			} );
			setFailedSignature( null );

			if (silent) return true;

			toast.success( "Rutina actualizada", {
				description: "Los ejercicios del día se guardaron correctamente.",
			} );

			return true;
		} catch {
			setFailedSignature( draftSignature );
			toast.danger( "Error al guardar", {
				description: "No se pudieron guardar los cambios del día.",
			} );

			return false;
		}
	}, [ draftRoutines, draftSignature, requiredFieldsMessage, routineDayId, saveRoutineDay, studentId, validationError ] );
	const handleSave = useCallback( () => saveDraft( { silent: false } ), [ saveDraft ] );

	const isSaving = saveRoutineDay.isPending;
	const hasFailed = failedSignature === draftSignature;
	const shouldAutoSave = hasHydrated && hasSessionEdits && canSave && !isSaving && !hasFailed;
	// Lo ultimo que se rendereo, para que los temporizadores y la salida de la
	// pantalla guarden el contenido actual y no el de cuando se programaron.
	const latestRef = useRef( { saveDraft, shouldAutoSave } );

	// Guardado automatico: un momento despues del ultimo cambio, si el dia esta completo.
	useEffect( () => {
		if (!shouldAutoSave) return;

		const timeoutId = window.setTimeout( () => {
			void latestRef.current.saveDraft( { silent: true } );
		}, AUTOSAVE_DELAY_MS );

		return () => window.clearTimeout( timeoutId );
	}, [ draftSignature, shouldAutoSave ] );

	// Al salir del dia (otra pestaña, otra pantalla) se guarda lo que quedo pendiente
	// sin esperar al temporizador.
	useEffect( () => () => {
		if (latestRef.current.shouldAutoSave) {
			void latestRef.current.saveDraft( { silent: true } );
		}
	}, [ routineDayId ] );

	// Va despues de los efectos de arriba: sus limpiezas tienen que ver todavia los
	// valores del render anterior.
	useEffect( () => {
		latestRef.current = { saveDraft, shouldAutoSave };
	} );

	const saveStatus: RoutineDaySaveStatus = isSaving
		? "saving"
		: hasFailed
			? "error"
			: !isDirty
				? "saved"
				: !canSave
					? "blocked"
					: hasSessionEdits ? "pending" : "unsaved";

	return {
		addedExerciseIds,
		draftRoutines,
		getSuggestedOrder,
		handleAddExercise,
		handleConfirmRefresh,
		handleRefresh,
		handleSave,
		hasHydrated,
		isDirty,
		isRefreshConfirmOpen,
		isSaveDisabled,
		isSaving,
		saveStatus,
		moveExercise,
		replaceWithCopies,
		resetRefreshConfirmOpen: () => setIsRefreshConfirmOpen( false ),
		requiredFieldsMessage,
		routineName: routine.name || `Semana ${ routine.week }`,
		validationError,
		updateExerciseField,
		deleteExercise,
	};
}
