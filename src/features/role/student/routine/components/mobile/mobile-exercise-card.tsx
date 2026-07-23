import React from "react";
import { Card } from "@heroui/react";

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
		<Card className={ "flex h-full w-full flex-col border border-border py-2 shadow-sm" }>
			<Card.Header className={ "shrink-0 px-3 pt-3" }>
				<Card.Title className={ "w-full text-xl font-bold text-foreground" }>
					<div className={ "space-y-3" }>
						<div className={ "flex items-start justify-between gap-3" }>
							<div className={ "flex min-w-0 flex-1 items-start gap-3" }>
								<AsyncMedia
									alt={ `Imagen de ${ displayedExerciseName }` }
									className={ "h-20 w-20 shrink-0 rounded-2xl border border-border object-cover" }
									emptyLabel={ "Sin imagen" }
									spinnerLabel={ `Cargando imagen de ${ displayedExerciseName }` }
									src={ exercise.imageUrl }
								/>

								<div className={ "min-w-0 flex-1 space-y-3" }>
									<h2 className={ "min-w-0 text-2xl font-black leading-tight tracking-tight text-foreground" }>
										{ displayedExerciseName }
									</h2>

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

						<div className={ "rounded-2xl bg-surface/50 px-3 py-3" }>
							<p className={ "mb-2 text-xs font-semibold tracking-wide text-foreground" }>Ultima sesion</p>
							<ExerciseCardSessionHistory history={ hasSessionHistory ? displayedSessionHistory : null } isCompact/>
						</div>
					</div>
				</Card.Title>
			</Card.Header>

			<Card.Content className={ "flex min-h-0 flex-1 flex-col px-3 pb-3" }>
				<div className={ "flex min-h-0 flex-1 flex-col space-y-3 border-t border-border pt-4" }>{ children }</div>
			</Card.Content>
		</Card>
	);
}
