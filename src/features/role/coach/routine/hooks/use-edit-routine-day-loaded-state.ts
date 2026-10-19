"use client";

import { getErrorMessage, isNetworkError, unwrapped } from "@/lib/action-result";
import { useAutosaveRetry } from "@/lib/use-autosave-retry";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import type { ExerciseListItem } from "@/features/exercises/types/exercise-list-item";
import type { RoutineDayDetailBase } from "@/features/routine/actions/get-routine-day";

import { toast } from "@heroui/react";

import { syncCoachTrainingRoutinesAfterSave } from "@/features/role/coach/routine/hooks/use-save-routine-day-exercises.utils";
import { useRoutineDayDraft } from "@/features/routine/hooks/use-routine-day-draft";
import { useSaveRoutineDayExercises } from "@/features/routine/hooks/use-routine-day-mutations";
import { getDraftCatalogExerciseIds, mapDraftToSaveInput } from "@/features/routine/services/routine-day-editor";
import { coachRoutineTemplateDetailQueryKey } from "@/features/role/coach/training-routine/hooks/use-routine-templates";
import { replaceRoutineExerciseAction } from "@/features/routine/actions/replace-routine-exercise";
import { addRoutineExerciseToDaysAction } from "@/features/routine/actions/add-routine-exercise-to-days";
import { appendExerciseToRoutineDayDrafts, replaceExerciseInRoutineDayDrafts } from "@/features/routine/stores/use-routine-day-draft-store";
import { routineDayQueryKey } from "@/features/routine/services/routine-day-query";
import { coachTrainingRoutinesQueryKey } from "@/features/training-routine/services/training-routines-keys";

// Espera despues del ultimo cambio antes de guardar solo: lo justo para no
// guardar a mitad de una palabra o de un numero de dos cifras.
const AUTOSAVE_DELAY_MS = 700;

// `pending`: hay cambios y se van a guardar solos. `blocked`: hay cambios pero
// falta algun dato para poder guardarlos. `unsaved`: hay cambios que quedaron de
// una visita anterior y no se guardan solos; el coach decide guardarlos o descartarlos.
export type RoutineDaySaveStatus = "blocked" | "error" | "offline" | "pending" | "saved" | "saving" | "unsaved";

type AddExercisePrescription = {
	// Otros dias de la rutina donde agregarlo tambien.
	otherDayIds?: string[];
	reps: string;
	restSeconds?: number | null;
	sets: string;
	variantExerciseIds?: string[];
};

function isRequiredRoutineFieldComplete( value: string ) {
	return value.trim().length > 0;
}

type UseEditRoutineDayLoadedStateParams = {
	data: RoutineDayDetailBase;
	isRefreshing: boolean;
	onRefreshRoutineDayAction: () => Promise<RoutineDayDetailBase | null>;
	routineDayId: string;
	studentId: string | null;
	templateId: string | null;
};

export function useEditRoutineDayLoadedState( {
	data,
	isRefreshing,
	onRefreshRoutineDayAction,
	routineDayId,
	studentId,
	templateId,
}: UseEditRoutineDayLoadedStateParams ) {
	const queryClient = useQueryClient();
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
	// Quitar es de un toque, asi que se puede deshacer. Si el dia ya se guardo sin
	// el ejercicio, sus variantes se borraron con la fila: se anotan antes para que
	// al deshacer vuelvan con el.
	const deleteExercise: typeof draft.deleteExercise = ( clientId ) => {
		const removed = draftRoutines.find( ( routine ) => routine.clientId === clientId );
		const savedVariantIds = data.routines
			.find( ( routine ) => routine.id === removed?.id )
			?.variants.map( ( variant ) => variant.variantExerciseId );

		markEdited();
		draft.deleteExercise( clientId );

		if (!removed) return;

		toast( `Quitaste ${ removed.exercise?.name ?? "el ejercicio" }`, {
			actionProps: {
				children: "Deshacer",
				onPress: () => {
					markEdited();
					draft.restoreExercise( {
						...removed,
						pendingVariantExerciseIds: savedVariantIds ?? removed.pendingVariantExerciseIds,
					} );
				},
			},
			// Mas largo que un aviso comun: es la unica forma de volver atras.
			timeout: 8000,
		} );
	};
	const setExercisePendingVariants: typeof draft.setExercisePendingVariants = ( ...args ) => {
		markEdited();
		draft.setExercisePendingVariants( ...args );
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
	// El contenido del que ya se aviso que no se pudo guardar: los reintentos
	// solos no vuelven a avisar lo mismo cada vez.
	const notifiedFailureRef = useRef<string | null>( null );

	// Despues de un cambio que toca otros dias de la rutina. Los otros dias se
	// sacan de la cache y no solo se invalidan: con `refetchOnMount: false` y la
	// copia guardada en el navegador, al abrirlos se mostraria lo de antes.
	async function refreshAfterRoutineWideChange( { includeCurrentDay }: { includeCurrentDay: boolean } ) {
		queryClient.removeQueries( {
			predicate: ( query ) => query.queryKey[ 0 ] === "routine-day" && query.queryKey[ 1 ] !== routineDayId,
		} );
		await Promise.all( [
			includeCurrentDay
				? queryClient.invalidateQueries( { queryKey: routineDayQueryKey( routineDayId, studentId, templateId ) } )
				: null,
			queryClient.invalidateQueries( {
				queryKey: routine.template
					? coachRoutineTemplateDetailQueryKey( routine.template.id )
					: coachTrainingRoutinesQueryKey( routine.student?.id ?? "", routine.month, routine.year ),
			} ),
		] );
	}

	// Agrega el ejercicio, ya cargado en este dia, al final de los otros dias
	// marcados. Este dia se guarda por su lado, como siempre.
	async function addExerciseToOtherDays( exercise: ExerciseListItem, prescription: AddExercisePrescription, otherDayIds: string[] ) {
		try {
			const result = await unwrapped( addRoutineExerciseToDaysAction )( {
				exerciseId: exercise.id,
				reps: prescription.reps,
				restSeconds: prescription.restSeconds ?? null,
				routineDayId,
				routineDayIds: otherDayIds,
				sets: prescription.sets,
				studentId,
				templateId,
				variantExerciseIds: prescription.variantExerciseIds,
			} );

			appendExerciseToRoutineDayDrafts( result.addedDayIds, { ...exercise, id: result.resolvedExerciseId }, {
				reps: prescription.reps,
				restSeconds: prescription.restSeconds ?? null,
				sets: prescription.sets,
			} );
			await refreshAfterRoutineWideChange( { includeCurrentDay: false } );

			const addedCount = result.addedDayIds.length;
			const { skippedDuplicateDays, skippedFinalizedDays } = result;

			toast.success( `Agregaste ${ exercise.name } en ${ addedCount + 1 } días`, {
				description: [
					`Este y ${ addedCount } ${ addedCount === 1 ? "día más" : "días más" }, al final de cada uno.`,
					skippedDuplicateDays > 0
						? `Sin agregar: ${ skippedDuplicateDays } ${ skippedDuplicateDays === 1 ? "día que ya lo tenía" : "días que ya lo tenían" }.`
						: null,
					skippedFinalizedDays > 0
						? `Sin agregar: ${ skippedFinalizedDays } ${ skippedFinalizedDays === 1 ? "día terminado" : "días terminados" } por el estudiante.`
						: null,
				].filter( Boolean ).join( " " ),
			} );
		} catch (error) {
			toast.danger( "No se pudo agregar en los otros días", {
				description: `${ getErrorMessage( error, "Hubo un error al guardarlo." ) } Quedó agregado solo en este día.`,
			} );
		}
	}

	function handleAddExercise(
		exercise: ExerciseListItem,
		order: number,
		prescription?: AddExercisePrescription,
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
		if (prescription?.restSeconds) updateExerciseField( result.routine.clientId, "restSeconds", prescription.restSeconds );
		// Las variantes elegidas al agregar esperan en el borrador y se guardan con el dia.
		if (prescription?.variantExerciseIds?.length) {
			setExercisePendingVariants( result.routine.clientId, prescription.variantExerciseIds );
		}
		if (prescription?.otherDayIds?.length) {
			void addExerciseToOtherDays( exercise, prescription, prescription.otherDayIds );
		}
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
				templateId,
			} );
			setFailedSignature( null );

			if (silent) return true;

			toast.success( "Rutina actualizada", {
				description: "Los ejercicios del día se guardaron correctamente.",
			} );

			return true;
		} catch (error) {
			setFailedSignature( draftSignature );

			// Sin señal el encabezado ya lo dice, y se reintenta solo.
			const isQuietFailure = silent && ( isNetworkError( error ) || notifiedFailureRef.current === draftSignature );

			if (!isQuietFailure) {
				notifiedFailureRef.current = draftSignature;
				toast.danger( "Error al guardar", {
					description: getErrorMessage( error, "No se pudieron guardar los cambios del día." ),
				} );
			}

			return false;
		}
	}, [ draftRoutines, draftSignature, requiredFieldsMessage, routineDayId, saveRoutineDay, studentId, templateId, validationError ] );
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

	const { isOnline } = useAutosaveRetry( {
		hasFailed,
		onRetry: () => {
			if (!saveRoutineDay.isPending) {
				void saveDraft( { silent: true } );
			}
		},
	} );

	// Sin conexion el pedido queda en pausa hasta que vuelva la señal.
	const saveStatus: RoutineDaySaveStatus = !isOnline && ( isSaving || ( isDirty && canSave ) )
		? "offline"
		: isSaving
		? "saving"
		: hasFailed
			? "error"
			: !isDirty
				? "saved"
				: !canSave
					? "blocked"
					: hasSessionEdits ? "pending" : "unsaved";

	// Cambia el ejercicio de una fila solo en este dia. Se guarda como cualquier
	// otro cambio del borrador.
	function replaceExerciseInDay( clientId: string, exercise: ExerciseListItem ) {
		markEdited();

		const result = draft.replaceExercise( clientId, exercise );

		if (result.error !== undefined) {
			toast.danger( "No se pudo cambiar el ejercicio", { description: result.error } );

			return false;
		}

		return true;
	}

	// Cambia el ejercicio de una fila en los dias de la rutina que el coach marco.
	async function replaceExerciseInRoutine( clientId: string, exercise: ExerciseListItem, routineDayIds: string[] ) {
		const current = draftRoutines.find( ( routine ) => routine.clientId === clientId );

		if (!current) return false;

		if (draftRoutines.some( ( routine ) => routine.clientId !== clientId && getDraftCatalogExerciseIds( routine ).includes( exercise.id ) )) {
			toast.danger( "No se pudo cambiar el ejercicio", { description: `${ exercise.name } ya está en este día.` } );

			return false;
		}

		// Lo editado ahora en este dia se guarda antes, para que el cambio en el
		// servidor parta de lo ultimo.
		if (saveStatus === "pending") await handleSave();

		try {
			const result = await unwrapped( replaceRoutineExerciseAction )( {
				fromExerciseId: current.exerciseId,
				routineDayId,
				routineDayIds,
				studentId,
				templateId,
				toExerciseId: exercise.id,
			} );
			const replacedExercise = { ...exercise, id: result.resolvedExerciseId };

			// Los borradores de esos dias (y el de este, aunque la fila todavia no
			// estuviera guardada) pasan al ejercicio nuevo.
			replaceExerciseInRoutineDayDrafts(
				[ ...new Set( [ ...result.replacedDayIds, routineDayId ] ) ],
				current.exerciseId,
				replacedExercise,
			);
			await refreshAfterRoutineWideChange( { includeCurrentDay: true } );

			const changedCount = Math.max( result.replacedDayIds.length, 1 );
			const { skippedDuplicateDays, skippedFinalizedDays } = result;

			toast.success( `Cambiaste ${ current.exercise?.name ?? "el ejercicio" } por ${ exercise.name }`, {
				description: [
					`En ${ changedCount } ${ changedCount === 1 ? "día" : "días" } de la rutina.`,
					skippedDuplicateDays > 0
						? `Sin cambiar: ${ skippedDuplicateDays } ${ skippedDuplicateDays === 1 ? "día que ya tenía" : "días que ya tenían" } ${ exercise.name }.`
						: null,
					skippedFinalizedDays > 0
						? `Sin cambiar: ${ skippedFinalizedDays } ${ skippedFinalizedDays === 1 ? "día terminado" : "días terminados" } por el estudiante.`
						: null,
				].filter( Boolean ).join( " " ),
			} );

			return true;
		} catch (error) {
			toast.danger( "No se pudo cambiar el ejercicio", {
				description: getErrorMessage( error, "No se pudo cambiar el ejercicio en la rutina." ),
			} );

			return false;
		}
	}

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
		setExercisePendingVariants,
		moveExercise,
		replaceExerciseInDay,
		replaceExerciseInRoutine,
		replaceWithCopies,
		resetRefreshConfirmOpen: () => setIsRefreshConfirmOpen( false ),
		requiredFieldsMessage,
		routineName: routine.name || `Semana ${ routine.week }`,
		validationError,
		updateExerciseField,
		deleteExercise,
	};
}
