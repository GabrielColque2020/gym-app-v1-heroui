import React from "react";
import { Card, Typography } from "@heroui/react";

import { AsyncMedia } from "@/components/common";
import ExerciseChangeDrawer from "@/features/role/student/routine/components/shared/exercise-change-drawer";
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
		isVariantOverridden,
		originalVariant,
		selectedVariant,
		variantOptions,
	} = useExerciseCardState( exercise );
	const displayedImageUrl = selectedVariant?.imageUrl ?? exercise.imageUrl;

	return (
		<Card className={ "border border-border py-2 shadow-sm" }>
			<Card.Content className={ "p-3" }>
				<div className={ "space-y-4" }>
					<div className={ "flex items-start gap-4" }>
						<AsyncMedia
							alt={ `Imagen de ${ displayedExerciseName }` }
							className={ "h-36 w-36 shrink-0 rounded-2xl border border-border object-cover" }
							emptyLabel={ "Sin imagen" }
							spinnerLabel={ `Cargando imagen de ${ displayedExerciseName }` }
							src={ displayedImageUrl }
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
										totalSets={ completedSetsSummary.totalSets }
									/>
								</div>

								<div className={ "flex flex-col gap-2 rounded-2xl bg-surface/50 px-3 py-3 sm:flex-row sm:items-start" }>
									<p className={ "shrink-0 text-sm font-semibold tracking-wide text-foreground" }>
										Ultima sesion
									</p>
									<ExerciseCardSessionHistory
										history={ hasSessionHistory ? displayedSessionHistory : null }
										isHighlighted={ isVariantOverridden }
									/>
								</div>
							</div>

							<ExerciseChangeDrawer
								exercise={ exercise }
								hasVariants={ hasVariants }
								isVariantOverridden={ isVariantOverridden }
								originalVariant={ originalVariant }
								selectedVariant={ selectedVariant }
								variantOptions={ variantOptions }
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
