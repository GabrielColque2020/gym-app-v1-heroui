import { Accordion, Card, Chip } from "@heroui/react";
import { SlidersHorizontal } from "lucide-react";

import { AsyncMedia } from "@/components/common";
import { RoutineDayExerciseField } from "@/features/role/coach/routine/components/shared/routine-day-exercise-field";
import { RoutineExerciseActions } from "@/features/role/coach/routine/components/shared/routine-exercise-actions";
import { formatBodyPartValue, getExerciseName } from "@/features/role/coach/routine/components/shared/routine-day-exercise-editor.utils";
import type { DraftRoutineDayExercise } from "@/features/routine/services/routine-day-editor";

type RoutineDayExerciseMobileCardProps = {
	onDeleteAction: ( clientId: string ) => void;
	onUpdateField: ( clientId: string, field: "observation" | "order" | "reps" | "sets", value: number | string ) => void;
	routine: DraftRoutineDayExercise;
};

export function RoutineDayExerciseMobileCard( {
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
							<h3 className={ "truncate text-base font-semibold leading-6 text-foreground" }>{ exerciseName }</h3>
							<p className={ "truncate text-sm text-muted" }>{ formatBodyPartValue( routine.exercise?.bodyPart ) }</p>
						</div>
					</div>
					<RoutineExerciseActions
						exercise={ routine.exercise }
						exerciseName={ exerciseName }
						routineId={ routine.id }
						onDeleteAction={ () => onDeleteAction( routine.clientId ) }
					/>
				</div>
				<div className={ "flex flex-wrap gap-2" }>
					<Chip size={ "sm" } variant={ "soft" }>Orden { routine.order }</Chip>
					<Chip size={ "sm" } variant={ "soft" }>{ routine.sets } series</Chip>
					<Chip size={ "sm" } variant={ "soft" }>{ routine.reps } reps</Chip>
				</div>
			</Card.Header>
			<Card.Content className={ "px-3 pb-3" }>
				<Accordion hideSeparator className={ "w-full" }>
					<Accordion.Item>
						<Accordion.Trigger className={ "group flex w-full items-center justify-between rounded-xl border border-border bg-surface-secondary px-3 py-2 text-left" }>
							<div className={ "flex min-w-0 items-center gap-2" }>
								<SlidersHorizontal className={ "size-4 shrink-0 text-accent" }/>
								<span className={ "text-sm font-semibold text-foreground" }>Editar detalles</span>
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
							</Accordion.Body>
						</Accordion.Panel>
					</Accordion.Item>
				</Accordion>
			</Card.Content>
		</Card>
	);
}
