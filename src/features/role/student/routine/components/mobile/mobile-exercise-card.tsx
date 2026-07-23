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
		isVariantOverridden,
		originalVariant,
		selectedVariant,
		variantOptions,
	} = useExerciseCardState( exercise );
	const displayedImageUrl = selectedVariant?.imageUrl ?? exercise.imageUrl;

	return (
		<Card className={ "flex w-full flex-col border border-border py-2 shadow-sm" }>
			<Card.Header className={ "shrink-0 px-3 pt-3" }>
				<Card.Title className={ "w-full text-xl font-bold text-foreground" }>
					<div className={ "space-y-3" }>
						<div className={ "flex items-start justify-between gap-3" }>
							<AsyncMedia
								alt={ `Imagen de ${ displayedExerciseName }` }
								className={ "h-28 w-full rounded-2xl border border-border bg-transparent" }
								emptyLabel={ "Sin imagen" }
								mediaClassName={ "bg-transparent" }
								spinnerLabel={ `Cargando imagen de ${ displayedExerciseName }` }
								src={ displayedImageUrl }
							/>

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

						<div className={ "space-y-3" }>
							<h2 className={ "text-2xl font-black leading-tight tracking-tight text-foreground" }>
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

						<div className={ "space-y-2" }>
							<p className={ "text-xs font-semibold tracking-wide text-foreground" }>Ultima sesion</p>
							<ExerciseCardSessionHistory
								history={ hasSessionHistory ? displayedSessionHistory : null }
								isCompact
								isHighlighted={ isVariantOverridden }
							/>
						</div>
					</div>
				</Card.Title>
			</Card.Header>

			<Card.Content className={ "flex flex-col px-3 pb-3" }>
				<div className={ "flex flex-col space-y-3 border-t border-border pt-4" }>{ children }</div>
			</Card.Content>
		</Card>
	);
}
