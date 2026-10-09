"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { toast } from "@heroui/react";

import type { ExerciseListItem } from "@/features/exercises/types/exercise-list-item";
import type { DraftVariantItem } from "@/features/role/coach/exercises/components/shared/exercise-variants-drawer.types";

export type ExercisePrescription = {
	reps: string;
	restSeconds: number | null;
	sets: string;
	// Variantes elegidas para el ejercicio que se esta agregando.
	variantExerciseIds: string[];
};

type UseSearchAndCreateExerciseDrawerStateParams = {
	addedExerciseIds: Set<string>;
	suggestedOrder: number;
	// Se llama despues de agregar un ejercicio, para limpiar la busqueda.
	onAddedAction: () => void;
	onAddExerciseAction: ( exercise: ExerciseListItem, order: number, prescription: ExercisePrescription ) => void;
	selectedExerciseId: string | null;
	currentPage: number;
	syncCreatedExerciseAction: ( exercise: ExerciseListItem ) => void;
};

export function useSearchAndCreateExerciseDrawerState( {
	addedExerciseIds,
	suggestedOrder,
	onAddedAction,
	onAddExerciseAction,
	selectedExerciseId,
	currentPage,
	syncCreatedExerciseAction,
}: UseSearchAndCreateExerciseDrawerStateParams ) {
	const [ isPickerOpen, setIsPickerOpen ] = useState( false );
	const [ isCreateDrawerOpen, setIsCreateDrawerOpen ] = useState( false );
	const [ orderValue, setOrderValue ] = useState( String( suggestedOrder ) );
	const [ addedCount, setAddedCount ] = useState( 0 );
	const [ setsValue, setSetsValue ] = useState( "" );
	const [ repsValue, setRepsValue ] = useState( "" );
	const [ restValue, setRestValue ] = useState<number | null>( null );
	// El ejercicio elegido en la lista, al que se le estan cargando series,
	// repeticiones y variantes antes de agregarlo. `null`: se esta en la lista.
	const [ configExercise, setConfigExercise ] = useState<ExerciseListItem | null>( null );
	const [ variantItems, setVariantItems ] = useState<DraftVariantItem[]>( [] );
	// El ultimo ejercicio agregado, para avisarlo al volver a la lista.
	const [ lastAddedName, setLastAddedName ] = useState<string | null>( null );
	const addButtonRefs = useRef( new Map<string, HTMLButtonElement>() );

	useEffect( () => {
		if (!selectedExerciseId || !isPickerOpen) return;

		const button = addButtonRefs.current.get( selectedExerciseId );
		button?.focus();
	}, [ currentPage, isPickerOpen, selectedExerciseId ] );

	const registerAddButtonRef = useCallback( ( exerciseId: string, element: HTMLButtonElement | null ) => {
		if (element) {
			addButtonRefs.current.set( exerciseId, element );
			return;
		}

		addButtonRefs.current.delete( exerciseId );
	}, [] );

	const handleCreatedExercise = useCallback( ( exercise: ExerciseListItem ) => {
		syncCreatedExerciseAction( exercise );
		setOrderValue( String( suggestedOrder ) );
		setIsCreateDrawerOpen( false );
		// El ejercicio recien creado se crea para agregarlo: se abre directo su
		// pantalla. En la lista quedaba perdido entre cientos, casi nunca en la
		// primera pagina, y habia que buscarlo de nuevo.
		setSetsValue( "" );
		setRepsValue( "" );
		setRestValue( null );
		setVariantItems( [] );
		setLastAddedName( null );
		setConfigExercise( exercise );
		setIsPickerOpen( true );
	}, [ suggestedOrder, syncCreatedExerciseAction ] );

	const handleOpenCreateDrawer = useCallback( () => {
		setIsPickerOpen( false );
		setIsCreateDrawerOpen( true );
	}, [] );

	// Vuelve a la lista con todo vacio: lo que se cargo para un ejercicio no debe
	// colarse, sin que se note, en el siguiente.
	const resetConfig = useCallback( () => {
		setConfigExercise( null );
		setSetsValue( "" );
		setRepsValue( "" );
		setRestValue( null );
		setVariantItems( [] );
	}, [] );

	// Elegir un ejercicio de la lista no lo agrega todavia: abre su pantalla.
	const handleSelectExercise = useCallback( ( exercise: ExerciseListItem ) => {
		if (addedExerciseIds.has( exercise.id )) {
			toast.danger( "Ejercicio duplicado", {
				description: "Ese ejercicio ya está cargado en el borrador del día.",
			} );
			return;
		}

		resetConfig();
		setLastAddedName( null );
		setConfigExercise( exercise );
	}, [ addedExerciseIds, resetConfig ] );

	const handleConfirmAdd = useCallback( () => {
		const exercise = configExercise;

		if (!exercise) return;

		const parsedOrder = Number( orderValue );

		if (!Number.isInteger( parsedOrder ) || parsedOrder < 1) {
			toast.danger( "Orden inválido", {
				description: "Ingresa un orden entero mayor o igual a 1.",
			} );
			return;
		}

		onAddExerciseAction( exercise, parsedOrder, {
			reps: repsValue.trim(),
			restSeconds: restValue,
			sets: setsValue.trim(),
			variantExerciseIds: variantItems.map( ( variant ) => variant.exercise.id ),
		} );
		// El drawer queda abierto para seguir sumando: un dia son varios ejercicios.
		setAddedCount( ( count ) => count + 1 );
		setOrderValue( String( Math.max( parsedOrder + 1, suggestedOrder ) ) );
		// Vuelve a la lista, con la busqueda vacia, para elegir el siguiente.
		resetConfig();
		setLastAddedName( exercise.name );
		onAddedAction();
	}, [ configExercise, orderValue, onAddedAction, onAddExerciseAction, repsValue, resetConfig, restValue, setsValue, suggestedOrder, variantItems ] );

	const handlePickerOpenChange = useCallback( ( isOpen: boolean ) => {
		if (isOpen) {
			setAddedCount( 0 );
			// Cada vez que se abre arranca en la lista y vacio.
			resetConfig();
			setLastAddedName( null );
		}

		setIsPickerOpen( isOpen );
	}, [ resetConfig ] );

	return {
		addedCount,
		configExercise,
		handleCancelConfig: resetConfig,
		handleConfirmAdd,
		handlePickerOpenChange,
		handleCreatedExercise,
		handleOpenCreateDrawer,
		handleSelectExercise,
		isCreateDrawerOpen,
		isPickerOpen,
		lastAddedName,
		orderValue,
		registerAddButtonRef,
		repsValue,
		restValue,
		setRestValue,
		setIsCreateDrawerOpen,
		setIsPickerOpen,
		setOrderValue,
		setRepsValue,
		setSetsValue,
		setsValue,
		setVariantItems,
		variantItems,
	};
}
