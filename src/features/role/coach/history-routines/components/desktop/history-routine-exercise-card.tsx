"use client";

import { Card, Chip, Typography } from "@heroui/react";

import type { CoachHistoryRoutine } from "@/features/role/coach/history-routines/actions/get-history-routines-by-student";

type HistoryRoutineExerciseCardProps = {
	exercise: CoachHistoryRoutine["exercises"][number];
};

function formatSetValue( value: number | null ) {
	return value === null ? "-" : String( value );
}

export function HistoryRoutineExerciseCard( { exercise }: HistoryRoutineExerciseCardProps ) {
	return (
		<Card className={ "border border-default bg-surface" } variant={ "default" }>
			<Card.Content className={ "p-3" }>
				<div className={ "flex flex-col gap-3" }>
					<div className={ "flex items-start justify-between gap-3" }>
						<div className={ "min-w-0" }>
							<Typography className={ "truncate text-sm font-semibold text-foreground" }>
								{ exercise.name }
							</Typography>
							<Typography className={ "mt-1 text-xs text-muted" }>
								{ exercise.variantName ? `Variante: ${ exercise.variantName }` : `Base: ${ exercise.baseName }` }
							</Typography>
						</div>
						<Chip color={ "accent" } size={ "sm" } variant={ "soft" }>
							{ `${ exercise.setsCompleted } realizadas` }
						</Chip>
					</div>

					<div className={ "flex flex-wrap items-center gap-2" }>
						<Chip color={ "default" } size={ "sm" } variant={ "soft" }>
							{ `${ exercise.plannedSets } planificadas` }
						</Chip>
						<Chip color={ "accent" } size={ "sm" } variant={ "soft" }>
							{ `Objetivo ${ exercise.plannedReps } reps` }
						</Chip>
					</div>

					<div className={ "grid gap-2" }>
						{ exercise.sets.map( ( set ) => (
							<div
								key={ set.id }
								className={ "flex flex-col gap-2 rounded-lg border border-border bg-surface-secondary px-3 py-2" }
							>
								<div className={ "flex items-center justify-between gap-3" }>
									<Typography className={ "text-xs font-semibold text-foreground" }>
										{ `Serie ${ String( set.setNumber ).padStart( 2, "0" ) }` }
									</Typography>
									<Chip
										color={ set.completed ? "success" : set.planned ? "warning" : "default" }
										size={ "sm" }
										variant={ "soft" }
									>
										{ set.completed ? "Realizada" : set.planned ? "Pendiente" : "Extra" }
									</Chip>
								</div>

								<div className={ "grid gap-1 text-xs text-muted" }>
									<div className={ "flex flex-wrap gap-x-3 gap-y-1" }>
										<span>{ `Planificada: ${ set.plannedReps } reps` }</span>
										<span>{ set.planned ? "Dentro del plan" : "Fuera del plan" }</span>
									</div>
									<div className={ "flex flex-wrap gap-x-3 gap-y-1 text-foreground" }>
										<span>{ `Realizada: ${ formatSetValue( set.repsCompleted ) } reps` }</span>
										<span>{ `Peso: ${ formatSetValue( set.weightUsed ) } kg` }</span>
										{ set.notes ? <span>{ set.notes }</span> : null }
									</div>
								</div>
							</div>
						) ) }
					</div>
				</div>
			</Card.Content>
		</Card>
	);
}
