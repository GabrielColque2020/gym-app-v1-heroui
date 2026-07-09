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

export default function MobileExerciseCard( { exercise, children, onVariantChangeAction }: ExerciseCardProps ) {
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
		<Card className={ "border border-border py-2 shadow-sm" }>
			<Card.Header className={ "px-3 pt-3" }>
				<Card.Title className={ "w-full text-xl font-bold text-foreground" }>
					<div className={ "space-y-2" }>
						<div className={ "flex items-start justify-between gap-3" }>
							<div className={ "min-w-0 space-y-1" }>
								<h2 className={ "min-w-0 text-2xl font-black tracking-tight text-foreground" }>{ displayedExerciseName }</h2>
							</div>
							<ExerciseChangeSheet
								exercise={ exercise }
								hasVariants={ hasVariants }
								selectedVariant={ selectedVariant }
								variantOptions={ variantOptions }
								onVariantChangeAction={ onVariantChangeAction }
							/>
						</div>
						<div className={ "flex flex-wrap items-center gap-2" }>
							<ExerciseCardStatusChips
								baseName={ exercise.baseName }
								completedSets={ completedSetsSummary.completedSets }
								hasCompletedSets={ hasCompletedSets }
								isCompact
								isVariantSelected={ Boolean( selectedVariant ) }
								label={ exercise.equipment }
								totalSets={ completedSetsSummary.totalSets }
							/>
						</div>
						<div className={ "space-y-1" }>
							<p className={ "text-xs font-medium text-foreground" }>Ultima sesión</p>
							<ExerciseCardSessionHistory history={ hasSessionHistory ? displayedSessionHistory : null } isCompact/>
						</div>
					</div>
				</Card.Title>
			</Card.Header>
			<Card.Content className={ "px-3 pb-3" }>
				<div className={ "space-y-3 border-t border-border pt-4" }>{ children }</div>
			</Card.Content>
		</Card>
	);
}
