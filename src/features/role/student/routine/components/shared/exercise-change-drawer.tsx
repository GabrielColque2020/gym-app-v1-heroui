"use client";

import { FeatureDrawerLayout } from "@/features/shared/components/feature-drawer-layout";
import { useResponsiveDrawerPlacement } from "@/features/shared/hooks/use-responsive-drawer-placement";
import ExerciseChangeDrawerContent from "@/features/role/student/routine/components/shared/exercise-change-drawer-content";
import { ExerciseChangeDrawerTrigger } from "@/features/role/student/routine/components/shared/exercise-change-drawer-trigger";
import { useExerciseChangeDrawerState } from "@/features/role/student/routine/components/shared/use-exercise-change-drawer-state";
import type { Exercise, ExerciseVariantOption } from "@/features/routine/types/routine-exercise.types";

type ExerciseChangeDrawerProps = {
	exercise: Exercise;
	hasVariants: boolean;
	selectedVariant: ExerciseVariantOption | null;
	variantOptions: ExerciseVariantOption[];
	onVariantChangeAction: ( exerciseId: string, variantExerciseId: string | null ) => void;
};

export default function ExerciseChangeDrawer( {
												  exercise,
												  hasVariants,
												  selectedVariant,
												  variantOptions,
												  onVariantChangeAction,
											  }: ExerciseChangeDrawerProps ) {
	const {
		handleOpenVariantDrawer,
		handleResetVariant,
		handleSelectVariant,
		isOpen,
		setIsOpen,
	} = useExerciseChangeDrawerState( {
		exerciseId: exercise.id,
		hasVariants,
		onVariantChangeAction,
	} );
	const placement = useResponsiveDrawerPlacement();

	if (!hasVariants) return null;

	return (
		<>
			<ExerciseChangeDrawerTrigger hasVariants={ hasVariants } onOpen={ handleOpenVariantDrawer }/>
			<FeatureDrawerLayout isOpen={ isOpen } placement={ placement } onOpenChangeAction={ setIsOpen }>
				<ExerciseChangeDrawerContent
					exercise={ exercise }
					hasVariants={ hasVariants }
					selectedVariant={ selectedVariant }
					variantOptions={ variantOptions }
					onResetVariant={ handleResetVariant }
					onSelectVariant={ handleSelectVariant }
				/>
			</FeatureDrawerLayout>
		</>
	);
}

