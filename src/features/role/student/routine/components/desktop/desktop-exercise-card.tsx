"use client";

import React from "react";
import { Card, Chip } from "@heroui/react";

import ExerciseChangeSheet from "@/features/role/student/routine/components/shared/exercise-change-sheet";
import { useExerciseCardState } from "@/features/role/student/routine/components/shared/use-exercise-card-state";
import type { Exercise } from "@/features/routine/types/routine-types";

interface ExerciseCardProps {
	exercise: Exercise;
	children: React.ReactNode;
	onVariantChange: ( exerciseId: string, variantExerciseId: string | null ) => void;
}

function formatSessionDateLabel( date: Date ) {
	return new Intl.DateTimeFormat( "es-AR", {
		day: "numeric",
		month: "long",
		year: "numeric",
	} ).format( date );
}

export default function DesktopExerciseCard( { exercise, children, onVariantChange }: ExerciseCardProps ) {
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
									{ selectedVariant ? (
										<Chip color={ "warning" } size={ "sm" } variant={ "soft" }>
											<Chip.Label>{ `Original: ${ exercise.baseName }` }</Chip.Label>
										</Chip>
									) : null }
								</div>
								<ExerciseChangeSheet
									exercise={ exercise }
									hasVariants={ hasVariants }
									selectedVariant={ selectedVariant }
									variantOptions={ variantOptions }
									onVariantChange={ onVariantChange }
								/>
							</div>
							<div className={ "flex flex-nowrap items-center gap-2 overflow-x-auto pb-1" }>
								<Chip className={ "shrink-0" } color={ "default" } size={ "md" } variant={ "soft" }>
									{ exercise.equipment }
								</Chip>
								<Chip
									className={ "shrink-0" }
									color={ hasCompletedSets ? "success" : "default" }
									size={ "md" }
									variant={ "soft" }
								>
									<Chip.Label>{ `Series completadas: ${ completedSetsSummary.completedSets }/${ completedSetsSummary.totalSets }` }</Chip.Label>
								</Chip>
								{ selectedVariant ? (
									<Chip className={ "shrink-0" } color={ "warning" } size={ "md" } variant={ "soft" }>
										<Chip.Label>Ejercicio cambiado</Chip.Label>
									</Chip>
								) : null }
							</div>
						</div>
					</div>
					<div className={ "space-y-2" }>
						<div className={ "flex items-center gap-3 whitespace-nowrap overflow-x-auto pb-1" }>
							<p className={ "shrink-0 text-sm font-medium tracking-wide text-foreground" }>Ultima sesion:</p>
							{ hasSessionHistory && displayedSessionHistory ? (
								<>
									<Chip className={ "shrink-0" } size={ "sm" } variant={ "soft" }>
										<Chip.Label>{ formatSessionDateLabel( displayedSessionHistory.date ) }</Chip.Label>
									</Chip>
									{ displayedSessionHistory.sets.map( ( set, index ) => (
										<Chip
											key={ `${ displayedSessionHistory.date.toISOString() }-${ set.setNumber }-${ index }` }
											className={ "shrink-0" }
											size={ "sm" }
											variant={ "soft" }
										>
											<Chip.Label>{ `${ String( set.setNumber ).padStart( 2, "0" ) } x ${ set.repsCompleted ?? 0 } reps · ${ set.weightUsed ?? 0 } kg` }</Chip.Label>
										</Chip>
									) ) }
								</>
							) : (
								<Chip className={ "shrink-0" } color={ "warning" } size={ "sm" } variant={ "soft" }>
									<Chip.Label>Sin registro anterior</Chip.Label>
								</Chip>
							) }
						</div>
					</div>
					<div className={ "space-y-3 border-t border-border pt-5" }>{ children }</div>
				</div>
			</Card.Content>
		</Card>
	);
}
