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
		selectedVariant,
		variantOptions,
	} = useExerciseCardState( exercise );

	return (
		<Card className={ "border border-border py-2 shadow-sm" }>
			<Card.Content className={ "p-3" }>
				<div className={ "space-y-2" }>
					<div className={ "space-y-1" }>
						<div className={ "flex flex-col gap-2" }>
							<div className={ "flex min-w-0 items-start justify-between gap-3" }>
								<div className={ "flex min-w-0 items-center gap-3" }>
									<AsyncMedia
										alt={ `Imagen de ${ displayedExerciseName }` }
										className={ "h-12 w-12 shrink-0 rounded-xl border border-border" }
										emptyLabel={ "Sin imagen" }
										spinnerLabel={ `Cargando imagen de ${ displayedExerciseName }` }
										src={ exercise.imageUrl }
									/>
									<div className={ "min-w-0 space-y-1" }>
										<Typography type={ "h3" } className={ "font-black" }>
											{ displayedExerciseName }
										</Typography>
									</div>
								</div>
								<ExerciseChangeDrawer
									exercise={ exercise }
									hasVariants={ hasVariants }
									selectedVariant={ selectedVariant }
									variantOptions={ variantOptions }
									onVariantChangeAction={ onVariantChangeAction }
								/>
							</div>
							<div className={ "flex flex-nowrap items-center gap-2 overflow-x-auto" }>
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
					<div className={ "space-y-2 flex" }>
						<p className={ "shrink-0 text-sm font-medium tracking-wide text-foreground mr-1" }>Ultima sesión:</p>
						<ExerciseCardSessionHistory history={ hasSessionHistory ? displayedSessionHistory : null }/>
					</div>
					<div className={ "space-y-3 border-t border-border pt-5" }>{ children }</div>
				</div>
			</Card.Content>
		</Card>
	);
}
