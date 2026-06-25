"use client";

import { Chip, Surface, Typography } from "@heroui/react";

import type { AdminHistoryRoutine } from "@/features/admin/historyRoutines/actions/get-history-routines-by-student";

type HistoryRoutineExerciseCardProps = {
	exercise: AdminHistoryRoutine["exercises"][ number ];
};

export function HistoryRoutineExerciseCard( { exercise }: HistoryRoutineExerciseCardProps ) {
	return (
		<Surface className={ "rounded-xl border border-default-hover bg-surface p-2.5" }>
			<div className={ "flex flex-col gap-2" }>
				<div className={ "flex items-start justify-between gap-3" }>
					<div className={ "min-w-0" }>
						<Typography className={ "truncate text-xs font-semibold text-foreground" }>
							{ exercise.name }
						</Typography>
						<Typography className={ "mt-1 text-[11px] text-muted" }>
							{ exercise.variantName ? `Variante: ${ exercise.variantName }` : exercise.baseName }
						</Typography>
					</div>
					<Chip color={ "accent" } size={ "sm" } variant={ "soft" }>
						{ `${ exercise.setsCompleted } series` }
					</Chip>
				</div>

				<div className={ "grid gap-1" }>
					{ exercise.sets.map( ( set ) => (
						<div
							key={ set.id }
							className={ "flex items-center justify-between gap-4 rounded-lg border border-border/60 bg-background px-2.5 py-1 text-xs" }
						>
							<span className={ "text-muted" }>{ `Serie ${ String( set.setNumber ).padStart( 2, "0" ) }` }</span>
							<span className={ "font-medium text-foreground" }>
								{ `${ set.repsCompleted ?? 0 } reps · ${ set.weightUsed ?? 0 } kg` }
							</span>
						</div>
					) ) }
				</div>
			</div>
		</Surface>
	);
}
