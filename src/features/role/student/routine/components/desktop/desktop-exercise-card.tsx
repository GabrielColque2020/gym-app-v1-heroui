import React, { useState } from "react";
import { Card, Typography } from "@heroui/react";

import ExerciseChangeDrawer from "@/features/role/student/routine/components/shared/exercise-change-drawer";
import { ExerciseCoachNote } from "@/features/role/student/routine/components/shared/exercise-coach-note";
import { ExerciseExecutionTrigger } from "@/features/role/student/routine/components/shared/exercise-execution-trigger";
import { ExerciseCardSessionHistory } from "@/features/role/student/routine/components/shared/exercise-card-session-history";
import { ExerciseProgressLink } from "@/features/role/student/routine/components/shared/exercise-progress-link";
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
		isVariantOverridden,
		originalVariant,
		selectedVariant,
		variantOptions,
	} = useExerciseCardState( exercise );
	const displayedImageUrl = selectedVariant?.imageUrl ?? exercise.imageUrl;
	const [ isExecutionOpen, setIsExecutionOpen ] = useState( false );

	return (
		<Card className={ "border border-border py-2 shadow-sm" }>
			<Card.Content className={ "p-3" }>
				<div className={ "space-y-4" }>
					<div className={ "flex items-start gap-4" }>
						<ExerciseExecutionTrigger
							className={ "h-36 w-36" }
							exerciseName={ displayedExerciseName }
							imageUrl={ displayedImageUrl }
							onPressAction={ () => setIsExecutionOpen( true ) }
						/>

						<div className={ "flex min-w-0 flex-1 items-start justify-between gap-4" }>
							<div className={ "min-w-0 flex-1 space-y-3" }>
								<Typography type={ "h3" } className={ "text-2xl font-black leading-tight" }>
									{ displayedExerciseName }
								</Typography>

								<div className={ "flex flex-wrap items-center gap-2" }>
									<ExerciseCardStatusChips
										baseName={ exercise.baseName }
										completedSets={ completedSetsSummary.completedSets }
										hasCompletedSets={ hasCompletedSets }
										isVariantSelected={ Boolean( selectedVariant ) }
										label={ exercise.equipment }
										restSeconds={ exercise.restSeconds }
										totalSets={ completedSetsSummary.totalSets }
									/>
								</div>

								<ExerciseCoachNote note={ exercise.coachNote }/>

								<div className={ "flex flex-col gap-2 rounded-2xl bg-surface/50 px-3 py-3 sm:flex-row sm:items-start" }>
									{ /* El enlace va bajo el titulo y no al final: al lado de las series
									     les sacaba lugar y las partia en varios renglones. */ }
									<div className={ "flex shrink-0 items-center justify-between gap-2 sm:flex-col sm:items-start sm:justify-start sm:gap-1" }>
										<p className={ "text-sm font-semibold tracking-wide text-foreground" }>
											Sesión anterior
										</p>
										{ hasSessionHistory ? (
											<ExerciseProgressLink exerciseId={ selectedVariant?.id ?? exercise.id } exerciseName={ displayedExerciseName }/>
										) : null }
									</div>
									<ExerciseCardSessionHistory
										history={ hasSessionHistory ? displayedSessionHistory : null }
										isHighlighted={ isVariantOverridden }
									/>
								</div>
							</div>

							<ExerciseChangeDrawer
								exercise={ exercise }
								hasVariants={ hasVariants }
								isExecutionOpen={ isExecutionOpen }
								isVariantOverridden={ isVariantOverridden }
								originalVariant={ originalVariant }
								selectedVariant={ selectedVariant }
								variantOptions={ variantOptions }
								onExecutionOpenChangeAction={ setIsExecutionOpen }
								onVariantChangeAction={ onVariantChangeAction }
							/>
						</div>
					</div>

					<div className={ "space-y-3 border-t border-border pt-5" }>{ children }</div>
				</div>
			</Card.Content>
		</Card>
	);
}
