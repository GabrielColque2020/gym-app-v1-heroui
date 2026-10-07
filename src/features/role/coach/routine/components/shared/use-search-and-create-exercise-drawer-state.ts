"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { toast } from "@heroui/react";

import type { ExerciseListItem } from "@/features/exercises/types/exercise-list-item";

export type ExercisePrescription = {
	reps: string;
	restSeconds: number | null;
	sets: string;
};

type UseSearchAndCreateExerciseDrawerStateParams = {
	addedExerciseIds: Set<string>;
	suggestedOrder: number;
	// Series y repeticiones del ultimo ejercicio del dia, para arrancar igual.
	lastPrescription: ExercisePrescription | null;
	onAddExerciseAction: ( exercise: ExerciseListItem, order: number, prescription: ExercisePrescription ) => void;
	selectedExerciseId: string | null;
	currentPage: number;
	syncCreatedExerciseAction: ( exercise: ExerciseListItem ) => void;
};

export function useSearchAndCreateExerciseDrawerState( {
	addedExerciseIds,
	suggestedOrder,
	lastPrescription,
	onAddExerciseAction,
	selectedExerciseId,
	currentPage,
	syncCreatedExerciseAction,
}: UseSearchAndCreateExerciseDrawerStateParams ) {
	const [ isPickerOpen, setIsPickerOpen ] = useState( false );
	const [ isCreateDrawerOpen, setIsCreateDrawerOpen ] = useState( false );
	const [ orderValue, setOrderValue ] = useState( String( suggestedOrder ) );
	const [ addedCount, setAddedCount ] = useState( 0 );
	const [ setsValue, setSetsValue ] = useState( lastPrescription?.sets ?? "" );
	const [ repsValue, setRepsValue ] = useState( lastPrescription?.reps ?? "" );
	const [ restValue, setRestValue ] = useState<number | null>( lastPrescription?.restSeconds ?? null );
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
		setIsPickerOpen( true );
	}, [ suggestedOrder, syncCreatedExerciseAction ] );

	const handleOpenCreateDrawer = useCallback( () => {
		setIsPickerOpen( false );
		setIsCreateDrawerOpen( true );
	}, [] );

	const handleAddClick = useCallback( ( exercise: ExerciseListItem ) => {
		const parsedOrder = Number( orderValue );

		if (!Number.isInteger( parsedOrder ) || parsedOrder < 1) {
			toast.danger( "Orden inválido", {
				description: "Ingresa un orden entero mayor o igual a 1.",
			} );
			return;
		}

		if (addedExerciseIds.has( exercise.id )) {
			toast.danger( "Ejercicio duplicado", {
				description: "Ese ejercicio ya está cargado en el borrador del día.",
			} );
			return;
		}

		onAddExerciseAction( exercise, parsedOrder, { reps: repsValue.trim(), restSeconds: restValue, sets: setsValue.trim() } );
		// El drawer queda abierto para seguir sumando: un dia son varios ejercicios.
		setAddedCount( ( count ) => count + 1 );
		setOrderValue( String( Math.max( parsedOrder + 1, suggestedOrder ) ) );
	}, [ addedExerciseIds, orderValue, onAddExerciseAction, repsValue, restValue, setsValue, suggestedOrder ] );

	const handlePickerOpenChange = useCallback( ( isOpen: boolean ) => {
		if (isOpen) {
			setAddedCount( 0 );

			// Si no se eligio nada todavia, arranca con lo del ultimo ejercicio cargado.
			if (!setsValue && !repsValue && lastPrescription) {
				setSetsValue( lastPrescription.sets );
				setRepsValue( lastPrescription.reps );
				setRestValue( lastPrescription.restSeconds );
			}
		}

		setIsPickerOpen( isOpen );
	}, [ lastPrescription, repsValue, setsValue ] );

	return {
		addedCount,
		handleAddClick,
		handlePickerOpenChange,
		handleCreatedExercise,
		handleOpenCreateDrawer,
		isCreateDrawerOpen,
		isPickerOpen,
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
	};
}
