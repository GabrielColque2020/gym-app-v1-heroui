"use client";

import { useCallback, useState } from "react";

import type { ExerciseVariantOption } from "@/features/routine/types/routine-exercise.types";

type UseExerciseChangeDrawerStateOptions = {
	// Las series del dia que ya tienen algo cargado en este ejercicio.
	completedSets: number;
	currentVariantExerciseId: string | null;
	exerciseBaseName: string;
	exerciseId: string;
	hasVariants: boolean;
	onVariantChangeAction: ( exerciseId: string, variantExerciseId: string | null ) => void;
};

// El cambio que espera confirmacion: a que ejercicio y como se llama.
type PendingChange = {
	name: string;
	variantExerciseId: string | null;
};

export function useExerciseChangeDrawerState( {
	completedSets,
	currentVariantExerciseId,
	exerciseBaseName,
	exerciseId,
	hasVariants,
	onVariantChangeAction,
}: UseExerciseChangeDrawerStateOptions ) {
	const [ isOpen, setIsOpen ] = useState( false );
	const [ pendingChange, setPendingChange ] = useState<PendingChange | null>( null );

	const handleOpenVariantDrawer = useCallback( () => {
		if (!hasVariants) return;
		setIsOpen( true );
	}, [ hasVariants ] );

	const requestChange = useCallback( ( change: PendingChange ) => {
		setIsOpen( false );

		if (change.variantExerciseId === currentVariantExerciseId) return;

		// Con series cargadas, el cambio las pasa al otro ejercicio: se confirma.
		if (completedSets > 0) {
			setPendingChange( change );
			return;
		}

		onVariantChangeAction( exerciseId, change.variantExerciseId );
	}, [ completedSets, currentVariantExerciseId, exerciseId, onVariantChangeAction ] );

	const handleSelectVariant = useCallback( ( variant: ExerciseVariantOption ) => {
		requestChange( { name: variant.name, variantExerciseId: variant.id } );
	}, [ requestChange ] );

	// Volver al ejercicio que puso el entrenador, sin variante.
	const handleResetVariant = useCallback( () => {
		requestChange( { name: exerciseBaseName, variantExerciseId: null } );
	}, [ exerciseBaseName, requestChange ] );

	const handleConfirmPendingChange = useCallback( () => {
		if (!pendingChange) return;

		onVariantChangeAction( exerciseId, pendingChange.variantExerciseId );
		setPendingChange( null );
	}, [ exerciseId, onVariantChangeAction, pendingChange ] );

	const handleCancelPendingChange = useCallback( () => {
		setPendingChange( null );
	}, [] );

	return {
		handleCancelPendingChange,
		handleConfirmPendingChange,
		handleOpenVariantDrawer,
		handleResetVariant,
		handleSelectVariant,
		isOpen,
		pendingChange,
		setIsOpen,
	};
}
