"use client";

import { Sheet } from "@heroui-pro/react";
import type { Exercise, ExerciseVariantOption } from "@/features/routine/types/routine-types";
import { ExerciseChangeSheetEmptyState } from "@/features/role/student/routine/components/shared/exercise-change-sheet-empty-state";
import { ExerciseChangeSheetFooter } from "@/features/role/student/routine/components/shared/exercise-change-sheet-footer";
import { ExerciseChangeSheetHeader } from "@/features/role/student/routine/components/shared/exercise-change-sheet-header";
import { ExerciseChangeSheetSelectedVariant } from "@/features/role/student/routine/components/shared/exercise-change-sheet-selected-variant";
import { ExerciseChangeSheetVariantOption } from "@/features/role/student/routine/components/shared/exercise-change-sheet-variant-option";

type ExerciseChangeSheetContentProps = {
	exercise: Exercise;
	hasVariants: boolean;
	placement: "bottom" | "right";
	selectedVariant: ExerciseVariantOption | null;
	variantOptions: ExerciseVariantOption[];
	onResetVariant: () => void;
	onSelectVariant: ( variant: ExerciseVariantOption ) => void;
};

export default function ExerciseChangeSheetContent( {
	exercise,
	hasVariants,
	placement,
	selectedVariant,
	variantOptions,
	onResetVariant,
	onSelectVariant,
}: ExerciseChangeSheetContentProps ) {
	return (
		<>
			<ExerciseChangeSheetHeader/>
			<Sheet.Body className={ placement === "right" ? "flex flex-col gap-4 py-5" : "" }>
				{ selectedVariant ? (
					<ExerciseChangeSheetSelectedVariant exerciseBaseName={ exercise.baseName } onResetVariant={ onResetVariant }/>
				) : null }
				{ !hasVariants ? (
					<ExerciseChangeSheetEmptyState/>
				) : (
					<div className={ "space-y-2" }>
						{ variantOptions.map( ( variant ) => {
							const isCurrentVariant = variant.id === exercise.variantExerciseId;

							return (
								<ExerciseChangeSheetVariantOption
									key={ variant.id }
									isCurrentVariant={ isCurrentVariant }
									variant={ variant }
									onSelect={ onSelectVariant }
								/>
							);
						} ) }
					</div>
				) }
			</Sheet.Body>
			<ExerciseChangeSheetFooter placement={ placement }/>
		</>
	);
}
