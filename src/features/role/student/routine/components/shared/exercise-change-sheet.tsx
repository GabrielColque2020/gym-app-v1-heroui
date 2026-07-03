"use client";

import { FeatureSheetLayout } from "@/features/shared/components/feature-sheet-layout";
import { useResponsiveSheetPlacement } from "@/features/shared/hooks/use-responsive-sheet-placement";
import ExerciseChangeSheetContent from "@/features/role/student/routine/components/shared/exercise-change-sheet-content";
import { ExerciseChangeSheetTrigger } from "@/features/role/student/routine/components/shared/exercise-change-sheet-trigger";
import { useExerciseChangeSheetState } from "@/features/role/student/routine/components/shared/use-exercise-change-sheet-state";
import type { Exercise, ExerciseVariantOption } from "@/features/routine/types/routine-types";

type ExerciseChangeSheetProps = {
	exercise: Exercise;
	hasVariants: boolean;
	selectedVariant: ExerciseVariantOption | null;
	variantOptions: ExerciseVariantOption[];
	onVariantChange: ( exerciseId: string, variantExerciseId: string | null ) => void;
};

export default function ExerciseChangeSheet( {
	exercise,
	hasVariants,
	selectedVariant,
	variantOptions,
	onVariantChange,
}: ExerciseChangeSheetProps ) {
	const {
		handleOpenVariantSheet,
		handleResetVariant,
		handleSelectVariant,
		isOpen,
		setIsOpen,
	} = useExerciseChangeSheetState( {
		exerciseId: exercise.id,
		hasVariants,
		onVariantChange,
	} );
	const placement = useResponsiveSheetPlacement();

	if (!hasVariants) return null;

	return (
		<>
			<ExerciseChangeSheetTrigger hasVariants={ hasVariants } onOpen={ handleOpenVariantSheet }/>
			<FeatureSheetLayout isOpen={ isOpen } placement={ placement } onOpenChange={ setIsOpen }>
				<ExerciseChangeSheetContent
					exercise={ exercise }
					hasVariants={ hasVariants }
					placement={ placement }
					selectedVariant={ selectedVariant }
					variantOptions={ variantOptions }
					onResetVariant={ handleResetVariant }
					onSelectVariant={ handleSelectVariant }
				/>
			</FeatureSheetLayout>
		</>
	);
}
