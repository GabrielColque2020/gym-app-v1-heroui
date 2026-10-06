"use client";

import { FeatureDrawerLayout } from "@/features/shared/components/feature-drawer-layout";
import { useResponsiveDrawerPlacement } from "@/features/shared/hooks/use-responsive-drawer-placement";
import ExerciseChangeDrawerContent from "@/features/role/student/routine/components/shared/exercise-change-drawer-content";
import { ExerciseExecutionDrawerContent } from "@/features/role/student/routine/components/shared/exercise-execution-drawer-content";
import { ExerciseChangeDrawerTrigger } from "@/features/role/student/routine/components/shared/exercise-change-drawer-trigger";
import { useExerciseChangeDrawerState } from "@/features/role/student/routine/components/shared/use-exercise-change-drawer-state";
import type { Exercise, ExerciseVariantOption } from "@/features/routine/types/routine-exercise.types";

type ExerciseChangeDrawerProps = {
	exercise: Exercise;
	hasVariants: boolean;
	isVariantOverridden: boolean;
	originalVariant: ExerciseVariantOption | null;
	selectedVariant: ExerciseVariantOption | null;
	variantOptions: ExerciseVariantOption[];
	// La tarjeta tambien abre la ejecucion al tocar la imagen: el estado es suyo.
	isExecutionOpen: boolean;
	onExecutionOpenChangeAction: ( isOpen: boolean ) => void;
	onVariantChangeAction: ( exerciseId: string, variantExerciseId: string | null ) => void;
};

export default function ExerciseChangeDrawer( {
	exercise,
	hasVariants,
	isVariantOverridden,
	originalVariant,
	selectedVariant,
	variantOptions,
	isExecutionOpen,
	onExecutionOpenChangeAction,
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
		originalVariantExerciseId: exercise.originalVariantExerciseId,
		onVariantChangeAction,
	} );
	const placement = useResponsiveDrawerPlacement();
	const executionExercise = selectedVariant
		? {
			imageUrl: selectedVariant.imageUrl,
			instructions: selectedVariant.instructions,
			name: selectedVariant.name,
			videoUrl: selectedVariant.videoUrl,
		}
		: {
			imageUrl: exercise.imageUrl,
			instructions: exercise.instructions,
			name: exercise.name,
			videoUrl: exercise.videoUrl,
		};

	return (
		<>
			<ExerciseChangeDrawerTrigger
				hasVariants={ hasVariants }
				onOpen={ handleOpenVariantDrawer }
				onViewExecution={ () => onExecutionOpenChangeAction( true ) }
			/>
			<FeatureDrawerLayout isOpen={ isOpen } placement={ placement } onOpenChangeAction={ setIsOpen }>
				<ExerciseChangeDrawerContent
					exercise={ exercise }
					hasVariants={ hasVariants }
					isVariantOverridden={ isVariantOverridden }
					originalVariant={ originalVariant }
					variantOptions={ variantOptions }
					onResetVariant={ handleResetVariant }
					onSelectVariant={ handleSelectVariant }
				/>
			</FeatureDrawerLayout>
			<FeatureDrawerLayout
				bottomContentClassName={ "max-h-[88dvh]" }
				isOpen={ isExecutionOpen }
				placement={ placement }
				rightContentClassName={ "flex h-full max-h-dvh w-[42rem] flex-col" }
				onOpenChangeAction={ onExecutionOpenChangeAction }
			>
				<ExerciseExecutionDrawerContent
					imageUrl={ executionExercise.imageUrl }
					instructions={ executionExercise.instructions }
					name={ executionExercise.name }
					videoUrl={ executionExercise.videoUrl }
				/>
			</FeatureDrawerLayout>
		</>
	);
}
