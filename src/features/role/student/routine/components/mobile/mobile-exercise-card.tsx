import React, { useState } from "react";
import { Card } from "@heroui/react";

import ExerciseChangeDrawer from "@/features/role/student/routine/components/shared/exercise-change-drawer";
import { ExerciseCoachNote } from "@/features/role/student/routine/components/shared/exercise-coach-note";
import { ExerciseExecutionTrigger } from "@/features/role/student/routine/components/shared/exercise-execution-trigger";
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
	const [ isExecutionOpen, setIsExecutionOpen ] = useState( false );

	return (
		<Card className={ "flex w-full flex-col border border-border py-2 shadow-sm" }>
			<Card.Header className={ "shrink-0 px-3 pt-3" }>
				<Card.Title className={ "w-full text-xl font-bold text-foreground" }>
					<div className={ "space-y-3" }>
						{ /* Imagen chica al lado del nombre: con la imagen a todo el ancho, los
						     campos para cargar quedaban fuera de la primera pantalla. */ }
						<div className={ "flex items-start gap-3" }>
							<ExerciseExecutionTrigger
								className={ "h-20 w-20" }
								exerciseName={ displayedExerciseName }
								imageUrl={ displayedImageUrl }
								onPressAction={ () => setIsExecutionOpen( true ) }
							/>

							<div className={ "min-w-0 flex-1 space-y-2" }>
								<h2 className={ "text-lg font-black leading-tight tracking-tight text-foreground" }>
									{ displayedExerciseName }
								</h2>

								<div className={ "flex flex-wrap items-center gap-1.5" }>
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

						<ExerciseCoachNote note={ exercise.coachNote }/>

						<div className={ "space-y-1" }>
							<p className={ "text-xs font-semibold tracking-wide text-foreground" }>Sesión anterior</p>
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
