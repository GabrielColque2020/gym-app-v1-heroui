import React from "react";
import { Card } from "@heroui/react";

import ExerciseChangeSheet from "@/features/role/student/routine/components/shared/exercise-change-sheet";
import { ExerciseCardSessionHistory } from "@/features/role/student/routine/components/shared/exercise-card-session-history";
import { ExerciseCardStatusChips } from "@/features/role/student/routine/components/shared/exercise-card-status-chips";
import { useExerciseCardState } from "@/features/role/student/routine/components/shared/use-exercise-card-state";
import type { Exercise } from "@/features/routine/types/routine-exercise.types";

interface ExerciseCardProps {
	exercise: Exercise;
	children: React.ReactNode;
	onVariantChangeAction: ( exerciseId: string, variantExerciseId: string | null ) => void;
}

export default function DesktopExerciseCard( { exercise, children, onVariantChangeAction }: ExerciseCardProps ) {
	const {
		completedSetsSummary,
		displayedExerciseName,
		displayedSessionHistory,
		hasCompletedSets,
		hasSessionHistory,
		hasVariants,
		selectedVariant,
		variantOptions,
	} = useExerciseCardState( exercise );

	return (
		<Card className={ "border border-border bg-surface shadow-sm" }>
			<Card.Content className={ "p-2" }>
				<div className={ "space-y-2" }>
					<div className={ "space-y-1" }>
						<div className={ "flex flex-col gap-2" }>
							<div className={ "flex min-w-0 items-start justify-between gap-3" }>
								<div className={ "min-w-0 space-y-1" }>
									<h2 className={ "min-w-0 text-3xl font-black tracking-tight text-foreground" }>{ displayedExerciseName }</h2>
								</div>
								<ExerciseChangeSheet
									exercise={ exercise }
									hasVariants={ hasVariants }
									selectedVariant={ selectedVariant }
									variantOptions={ variantOptions }
									onVariantChangeAction={ onVariantChangeAction }
								/>
							</div>
							<div className={ "flex flex-nowrap items-center gap-2 overflow-x-auto pb-1" }>
								<ExerciseCardStatusChips
									baseName={ exercise.baseName }
									completedSets={ completedSetsSummary.completedSets }
									hasCompletedSets={ hasCompletedSets }
									isVariantSelected={ Boolean( selectedVariant ) }
									label={ exercise.equipment }
									totalSets={ completedSetsSummary.totalSets }
								/>
							</div>
						</div>
					</div>
					<div className={ "space-y-2" }>
						<p className={ "shrink-0 text-sm font-medium tracking-wide text-foreground" }>Ultima sesion:</p>
						<ExerciseCardSessionHistory history={ hasSessionHistory ? displayedSessionHistory : null }/>
					</div>
					<div className={ "space-y-3 border-t border-border pt-5" }>{ children }</div>
				</div>
			</Card.Content>
		</Card>
	);
}
