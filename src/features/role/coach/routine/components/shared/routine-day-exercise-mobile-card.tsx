import { Accordion, Card } from "@heroui/react";
import { SlidersHorizontal } from "lucide-react";

import { AsyncMedia } from "@/components/common";
import { RoutineDayExerciseField } from "@/features/role/coach/routine/components/shared/routine-day-exercise-field";
import { RoutineDayExerciseMoveButtons } from "@/features/role/coach/routine/components/shared/routine-day-exercise-move-buttons";
import { RoutineExerciseActions } from "@/features/role/coach/routine/components/shared/routine-exercise-actions";
import { formatBodyPartValue, getExerciseName } from "@/features/role/coach/routine/components/shared/routine-day-exercise-editor.utils";
import type { DraftRoutineDayExercise } from "@/features/routine/services/routine-day-editor";

type RoutineDayExerciseMobileCardProps = {
	isFirst: boolean;
	isLast: boolean;
	onDeleteAction: ( clientId: string ) => void;
	onUpdateField: ( clientId: string, field: "observation" | "order" | "reps" | "sets", value: number | string ) => void;
	routine: DraftRoutineDayExercise;
};

export function RoutineDayExerciseMobileCard( {
												  isFirst,
												  isLast,
												  onDeleteAction,
												  onUpdateField,
												  routine,
											  }: RoutineDayExerciseMobileCardProps ) {
	const exerciseName = getExerciseName( routine );

	return (
		<Card className={ "border border-border shadow-sm py-2" } variant={ "default" }>
			<Card.Header className={ "grid gap-3 px-3 pt-3" }>
				<div className={ "grid grid-cols-[1fr_auto] items-start gap-3" }>
					<div className={ "flex min-w-0 items-center gap-3" }>
						<AsyncMedia
							alt={ `Imagen de ${ exerciseName }` }
							className={ "h-14 w-14 shrink-0 rounded-xl border border-border object-cover" }
							emptyLabel={ "Sin imagen" }
							spinnerLabel={ `Cargando imagen de ${ exerciseName }` }
							src={ routine.exercise?.imageUrl }
						/>
						<div className={ "min-w-0" }>
							<h3 className={ "line-clamp-2 text-base font-semibold leading-6 text-foreground" }>{ exerciseName }</h3>
							<p className={ "truncate text-sm text-muted" }>{ formatBodyPartValue( routine.exercise?.bodyPart ) }</p>
						</div>
					</div>
					<div className={ "flex items-center" }>
						<RoutineDayExerciseMoveButtons
							clientId={ routine.clientId }
							exerciseName={ exerciseName }
							isFirst={ isFirst }
							isLast={ isLast }
						/>
						<RoutineExerciseActions
							exercise={ routine.exercise }
							clientId={ routine.clientId }
							exerciseName={ exerciseName }
							routineId={ routine.id }
							onDeleteAction={ () => onDeleteAction( routine.clientId ) }
						/>
					</div>
				</div>
			</Card.Header>
			<Card.Content className={ "grid gap-3 px-3 pb-3" }>
				{ /* Series y repeticiones van a la vista: son lo unico obligatorio para guardar. */ }
				<div className={ "grid grid-cols-2 gap-3" }>
					<RoutineDayExerciseField
						ariaLabel={ `Series de ${ exerciseName }` }
						inputMode={ "numeric" }
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
				<Accordion hideSeparator className={ "w-full" }>
					<Accordion.Item>
						<Accordion.Trigger className={ "group flex w-full items-center justify-between rounded-xl border border-border bg-surface-secondary px-3 py-2 text-left" }>
							<div className={ "flex min-w-0 items-center gap-2" }>
								<SlidersHorizontal className={ "size-4 shrink-0 text-accent" }/>
								<span className={ "text-sm font-semibold text-foreground" }>
									Orden { routine.order } · { routine.observation.trim() ? "Con notas" : "Sin notas" }
								</span>
							</div>
							<Accordion.Indicator/>
						</Accordion.Trigger>
						<Accordion.Panel>
							<Accordion.Body className={ "grid gap-4 px-0 pb-1 pt-4" }>
								<RoutineDayExerciseField
									ariaLabel={ `Orden de ${ exerciseName }` }
									label={ "Orden" }
									name={ `mobile-order-${ routine.clientId }` }
									onChange={ ( value ) => onUpdateField( routine.clientId, "order", Number( value ) || 0 ) }
									value={ String( routine.order ) }
								/>

								<RoutineDayExerciseField
									ariaLabel={ `Notas de ${ exerciseName }` }
									inputClassName={ "min-h-20" }
									isMultiline
									label={ "Notas" }
									name={ `mobile-notes-${ routine.clientId }` }
									onChange={ ( value ) => onUpdateField( routine.clientId, "observation", value ) }
									value={ routine.observation }
								/>
							</Accordion.Body>
						</Accordion.Panel>
					</Accordion.Item>
				</Accordion>
			</Card.Content>
		</Card>
	);
}
