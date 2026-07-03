"use client";

import { Card } from "@heroui/react";

import { RoutineDayExerciseField } from "@/features/role/coach/routine/components/shared/routine-day-exercise-field";
import { RoutineExerciseActions } from "@/features/role/coach/routine/components/shared/routine-exercise-actions";
import { formatBodyPartValue, getExerciseName } from "@/features/role/coach/routine/components/shared/routine-day-exercise-editor.utils";
import type { DraftRoutineDayExercise } from "@/features/routine/services/routine-day-editor";

type RoutineDayExerciseMobileCardProps = {
	onDelete: ( clientId: string ) => void;
	onUpdateField: ( clientId: string, field: "observation" | "order" | "reps" | "sets", value: number | string ) => void;
	routine: DraftRoutineDayExercise;
};

export function RoutineDayExerciseMobileCard( {
	onDelete,
	onUpdateField,
	routine,
}: RoutineDayExerciseMobileCardProps ) {
	const exerciseName = getExerciseName( routine );

	return (
		<Card className={ "overflow-hidden rounded-2xl border border-border/70 shadow-sm" } variant={ "default" }>
			<Card.Content className={ "grid gap-4 py-4" }>
				<div className={ "grid grid-cols-[1fr_auto] items-start gap-3" }>
					<div className={ "min-w-0" }>
						<h3 className={ "truncate text-base font-semibold leading-6 text-foreground" }>{ exerciseName }</h3>
						<p className={ "truncate text-sm text-muted" }>{ formatBodyPartValue( routine.exercise?.bodyPart ) }</p>
					</div>
					<RoutineExerciseActions
						exercise={ routine.exercise }
						exerciseName={ exerciseName }
						routineId={ routine.id }
						onDelete={ () => onDelete( routine.clientId ) }
					/>
				</div>

				<RoutineDayExerciseField
					ariaLabel={ `Orden de ${ exerciseName }` }
					label={ "Orden" }
					name={ `mobile-order-${ routine.clientId }` }
					onChange={ ( value ) => onUpdateField( routine.clientId, "order", Number( value ) || 0 ) }
					value={ String( routine.order ) }
				/>

				<div className={ "grid grid-cols-2 gap-3" }>
					<RoutineDayExerciseField
						ariaLabel={ `Series de ${ exerciseName }` }
						label={ "Series" }
						name={ `mobile-series-${ routine.clientId }` }
						onChange={ ( value ) => onUpdateField( routine.clientId, "sets", value ) }
						value={ routine.sets }
					/>
					<RoutineDayExerciseField
						ariaLabel={ `Repeticiones de ${ exerciseName }` }
						label={ "Repeticiones" }
						name={ `mobile-reps-${ routine.clientId }` }
						onChange={ ( value ) => onUpdateField( routine.clientId, "reps", value ) }
						value={ routine.reps }
					/>
				</div>

				<RoutineDayExerciseField
					ariaLabel={ `Notas de ${ exerciseName }` }
					inputClassName={ "min-h-20" }
					isMultiline
					label={ "Notas" }
					name={ `mobile-notes-${ routine.clientId }` }
					onChange={ ( value ) => onUpdateField( routine.clientId, "observation", value ) }
					value={ routine.observation }
				/>
			</Card.Content>
		</Card>
	);
}
