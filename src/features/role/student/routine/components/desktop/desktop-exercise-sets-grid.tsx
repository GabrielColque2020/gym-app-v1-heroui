import { Checkbox, Chip, Input, Label } from "@heroui/react";
import { DataGrid, type DataGridColumn } from "@heroui-pro/react";

import type { Exercise, ExerciseSet } from "@/features/routine/types/routine-exercise.types";

type DesktopExerciseSetsGridProps = {
	exercise: Exercise;
	onSetUpdate: (
		exerciseId: string,
		setId: string,
		updates: Partial<{ weight: number | null; reps: number | null; notes: string | null }>,
	) => void;
};

function renderPreviousRecord( previousValue: number | null, suffix: string ) {
	if (previousValue === null) {
		return <span className={ "text-xs text-muted" }>Sin registro anterior</span>;
	}

	return <span className={ "text-xs text-muted" }>{ `${ previousValue } ${ suffix } anteriores` }</span>;
}

export function DesktopExerciseSetsGrid( {
											 exercise,
											 onSetUpdate,
										 }: DesktopExerciseSetsGridProps ) {
	const columns: DataGridColumn<ExerciseSet>[] = [
		{
			id: "completado",
			header: "",
			cell: ( item ) => (
				<div className={ "flex items-center justify-center " }>
					<Checkbox isReadOnly isSelected={ item.completed }>
						<Checkbox.Control className={ "size-5 rounded-full border border-border shadow-md before:rounded-full" }>
							<Checkbox.Indicator/>
						</Checkbox.Control>
					</Checkbox>
				</div>
			),
			align: "center",
			maxWidth: 50,
		},
		{
			id: "set",
			header: "SERIE",
			isRowHeader: true,
			cell: ( item ) => (
				<div className={ "flex flex-col items-center gap-1" }>
					<Chip className={ "h-8 rounded-full px-4 border border-border" } size={ "sm" } variant={ "secondary" }>
						<Chip.Label className={ "font-mono text-xs text-muted" }>
							{ String( item.setNumber ).padStart( 2, "0" ) }
						</Chip.Label>
					</Chip>
				</div>
			),
			align: "center",
			width: 80,
		},
		{
			id: "reps",
			header: "REPS",
			cell: ( item ) => (
				<div className={ "flex items-center justify-center" }>
					<div className={ "flex w-50 flex-col items-start gap-2" }>
						<Label className={ "text-xs font-medium text-muted" }>{ `Meta ${ item.targetReps } reps` }</Label>
						<Input
							fullWidth
							placeholder={ "Reps" }
							className={ "border border-border" }
							type={ "number" }
							value={ item.currentReps?.toString() || "" }
							onChange={ ( e ) => {
								const nextValue = e.target.value.trim() === "" ? null : Number.parseInt( e.target.value, 10 );
								onSetUpdate( exercise.id, item.id, { reps: Number.isNaN( nextValue ) ? null : nextValue } );
							} }
						/>
						{ renderPreviousRecord( item.previousReps, "reps" ) }
					</div>
				</div>
			),
			align: "center",
			width: 80,
		},
		{
			id: "peso",
			header: "PESO (KG)",
			cell: ( item ) => (
				<div className={ "flex items-center justify-center" }>
					<div className={ "flex w-50 flex-col items-start gap-2" }>
						<Label className={ "text-xs font-medium text-muted" }>Peso (kg)</Label>
						<Input
							fullWidth
							placeholder={ "Peso (kg)" }
							type={ "number" }
							className={ "border border-border" }
							value={ item.currentWeight?.toString() || "" }
							onChange={ ( e ) => {
								const nextValue = e.target.value.trim() === "" ? null : Number.parseInt( e.target.value, 10 );
								onSetUpdate( exercise.id, item.id, { weight: Number.isNaN( nextValue ) ? null : nextValue } );
							} }
						/>
						{ renderPreviousRecord( item.previousWeight, "kg" ) }
					</div>
				</div>
			),
			align: "center",
			minWidth: 100,
		},
		{
			id: "notas",
			header: "NOTAS",
			cell: ( item ) => (
				<div className={ "mb-5.5 flex items-start justify-center" }>
					<div className={ "flex w-60 flex-col items-start gap-2" }>
						<Label className={ "text-xs font-medium text-muted" }>Notas</Label>
						<Input
							fullWidth
							placeholder={ "Opcional" }
							className={ "border border-border" }
							value={ item.notes ?? "" }
							onChange={ ( e ) => onSetUpdate( exercise.id, item.id, { notes: e.target.value } ) }
						/>
					</div>
				</div>
			),
			align: "center",
			minWidth: 180,
		},
	];

	return (
		<DataGrid
			aria-label={ `${ exercise.name } sets` }
			columns={ columns }
			data={ exercise.sets }
			getRowId={ ( item ) => item.id }
		/>
	);
}

