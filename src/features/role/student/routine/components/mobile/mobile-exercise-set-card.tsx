import { Card, Checkbox, Input, Label } from "@heroui/react";

import type { ExerciseSet } from "@/features/routine/types/routine-exercise.types";

type MobileExerciseSetCardProps = {
	exerciseId: string;
	onSetUpdate: (
		exerciseId: string,
		setId: string,
		updates: Partial<{ weight: number | null; reps: number | null; notes: string | null }>,
	) => void;
	set: ExerciseSet;
};

export function MobileExerciseSetCard( {
										   exerciseId,
										   onSetUpdate,
										   set,
									   }: MobileExerciseSetCardProps ) {
	return (
		<Card className={ "border border-accent-soft-hover" }>
			<Card.Header>
				<Card.Title>
					<div className={ "mb-4 flex w-full items-center justify-between" }>
						<span className={ "text-xl font-bold text-foreground" }>Serie { set.setNumber }</span>
						<Checkbox isReadOnly isSelected={ set.completed }>
							<Checkbox.Control className={ "size-5 rounded-full border border-border shadow-md before:rounded-full" }>
								<Checkbox.Indicator/>
							</Checkbox.Control>
						</Checkbox>
					</div>
				</Card.Title>
				<Card.Content>
					<div className={ "mb-2 grid grid-cols-2 gap-10" }>
						<div className={ "flex flex-col space-y-2" }>
							<Label className={ "ml-2 text-sm text-muted" }>Reps</Label>
							<Input
								fullWidth
								placeholder={ "Reps" }
								className={ "border border-border" }
								type={ "number" }
								value={ set.currentReps?.toString() || "" }
								onChange={ ( e ) => {
									const nextValue = e.target.value.trim() === "" ? null : Number.parseInt( e.target.value, 10 );
									onSetUpdate( exerciseId, set.id, { reps: Number.isNaN( nextValue ) ? null : nextValue } );
								} }
							/>
							{ set.previousReps === null && set.previousWeight === null ? (
								<span className={ "text-muted" }>Sin registro anterior</span>
							) : (
								<span className={ "px-1 text-sm text-muted" }>{ `${ set.previousReps ?? 0 } reps Anterior` }</span>
							) }
						</div>
						<div className={ "flex flex-col space-y-2" }>
							<Label className={ "ml-2 text-sm text-muted" }>Peso</Label>
							<Input
								fullWidth
								placeholder={ "Peso (Kg)" }
								type={ "number" }
								className={ "border border-border" }
								value={ set.currentWeight?.toString() || "" }
								onChange={ ( e ) => {
									const nextValue = e.target.value.trim() === "" ? null : Number.parseInt( e.target.value, 10 );
									onSetUpdate( exerciseId, set.id, { weight: Number.isNaN( nextValue ) ? null : nextValue } );
								} }
							/>
							{ set.previousReps === null && set.previousWeight === null ? (
								<span className={ "text-muted" }>Sin registro anterior</span>
							) : (
								<span className={ "px-1 text-sm text-muted" }>{ `${ set.previousWeight ?? 0 } Kg Anterior` }</span>
							) }
						</div>
					</div>
					<div className={ "flex flex-col space-y-2" }>
						<Label className={ "ml-2 text-sm text-muted" }>Notas</Label>
						<Input
							fullWidth
							placeholder={ "Opcional" }
							className={ "border border-border" }
							value={ set.notes ?? "" }
							onChange={ ( e ) => onSetUpdate( exerciseId, set.id, { notes: e.target.value } ) }
						/>
					</div>
				</Card.Content>
			</Card.Header>
		</Card>
	);
}
