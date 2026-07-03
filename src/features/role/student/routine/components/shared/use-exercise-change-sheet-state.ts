"use client";

import { useCallback, useState } from "react";

import type { ExerciseVariantOption } from "@/features/routine/types/routine-types";

type UseExerciseChangeSheetStateOptions = {
	exerciseId: string;
	hasVariants: boolean;
	onVariantChange: ( exerciseId: string, variantExerciseId: string | null ) => void;
};

export function useExerciseChangeSheetState( {
	exerciseId,
	hasVariants,
	onVariantChange,
}: UseExerciseChangeSheetStateOptions ) {
	const [ isOpen, setIsOpen ] = useState( false );

	const handleOpenVariantSheet = useCallback( () => {
		if (!hasVariants) return;
		setIsOpen( true );
	}, [ hasVariants ] );

	const handleSelectVariant = useCallback( ( variant: ExerciseVariantOption ) => {
		onVariantChange( exerciseId, variant.id );
		setIsOpen( false );
	}, [ exerciseId, onVariantChange ] );

	const handleResetVariant = useCallback( () => {
		onVariantChange( exerciseId, null );
		setIsOpen( false );
	}, [ exerciseId, onVariantChange ] );

	return {
		handleOpenVariantSheet,
		handleResetVariant,
		handleSelectVariant,
		isOpen,
		setIsOpen,
	};
}
