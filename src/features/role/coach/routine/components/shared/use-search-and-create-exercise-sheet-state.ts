"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { toast } from "@heroui/react";

import type { ExerciseListItem } from "@/features/exercises/types/exercise-list-item";

type UseSearchAndCreateExerciseSheetStateParams = {
	addedExerciseIds: Set<string>;
	suggestedOrder: number;
	onAddExerciseAction: ( exercise: ExerciseListItem, order: number ) => void;
	selectedExerciseId: string | null;
	currentPage: number;
	syncCreatedExerciseAction: ( exercise: ExerciseListItem ) => void;
};

export function useSearchAndCreateExerciseSheetState( {
	addedExerciseIds,
	suggestedOrder,
	onAddExerciseAction,
	selectedExerciseId,
	currentPage,
	syncCreatedExerciseAction,
}: UseSearchAndCreateExerciseSheetStateParams ) {
	const [ isPickerOpen, setIsPickerOpen ] = useState( false );
	const [ isCreateSheetOpen, setIsCreateSheetOpen ] = useState( false );
	const [ orderValue, setOrderValue ] = useState( String( suggestedOrder ) );
	const addButtonRefs = useRef( new Map<string, HTMLButtonElement>() );

	useEffect( () => {
		setOrderValue( String( suggestedOrder ) );
	}, [ suggestedOrder ] );

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
		setIsCreateSheetOpen( false );
		setIsPickerOpen( true );
	}, [ suggestedOrder, syncCreatedExerciseAction ] );

	const handleOpenCreateSheet = useCallback( () => {
		setIsPickerOpen( false );
		setIsCreateSheetOpen( true );
	}, [] );

	const handleAddClick = useCallback( ( exercise: ExerciseListItem ) => {
		const parsedOrder = Number( orderValue );

		if (!Number.isInteger( parsedOrder ) || parsedOrder < 1) {
			toast.danger( "Orden invalido", {
				description: "Ingresa un orden entero mayor o igual a 1.",
			} );
			return;
		}

		if (addedExerciseIds.has( exercise.id )) {
			toast.danger( "Ejercicio duplicado", {
				description: "Ese ejercicio ya esta cargado en el borrador del dia.",
			} );
			return;
		}

		onAddExerciseAction( exercise, parsedOrder );
		setIsPickerOpen( false );
	}, [ addedExerciseIds, orderValue, onAddExerciseAction ] );

	return {
		handleAddClick,
		handleCreatedExercise,
		handleOpenCreateSheet,
		isCreateSheetOpen,
		isPickerOpen,
		orderValue,
		registerAddButtonRef,
		setIsCreateSheetOpen,
		setIsPickerOpen,
		setOrderValue,
	};
}
