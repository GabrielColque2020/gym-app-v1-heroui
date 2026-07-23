"use client";

import { useCallback, useState } from "react";

import type { ExerciseVariantOption } from "@/features/routine/types/routine-exercise.types";

type UseExerciseChangeDrawerStateOptions = {
	exerciseId: string;
	hasVariants: boolean;
	originalVariantExerciseId: string | null;
	onVariantChangeAction: ( exerciseId: string, variantExerciseId: string | null ) => void;
};

export function useExerciseChangeDrawerState( {
	exerciseId,
	hasVariants,
	originalVariantExerciseId,
	onVariantChangeAction,
}: UseExerciseChangeDrawerStateOptions ) {
	const [ isOpen, setIsOpen ] = useState( false );

	const handleOpenVariantDrawer = useCallback( () => {
		if (!hasVariants) return;
		setIsOpen( true );
	}, [ hasVariants ] );

	const handleSelectVariant = useCallback( ( variant: ExerciseVariantOption ) => {
		onVariantChangeAction( exerciseId, variant.id );
		setIsOpen( false );
	}, [ exerciseId, onVariantChangeAction ] );

	const handleResetVariant = useCallback( () => {
		onVariantChangeAction( exerciseId, originalVariantExerciseId );
		setIsOpen( false );
	}, [ exerciseId, onVariantChangeAction, originalVariantExerciseId ] );

	return {
		handleOpenVariantDrawer,
		handleResetVariant,
		handleSelectVariant,
		isOpen,
		setIsOpen,
	};
}

