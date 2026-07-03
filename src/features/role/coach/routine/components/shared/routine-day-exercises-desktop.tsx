"use client";

import type { DraftRoutineDayExercise } from "@/features/routine/services/routine-day-editor";
import type { DataGridColumn } from "@heroui-pro/react";

import { DataGrid } from "@heroui-pro/react";

import { RoutineDayExerciseField } from "@/features/role/coach/routine/components/shared/routine-day-exercise-field";
import { RoutineDayExerciseOrderField } from "@/features/role/coach/routine/components/shared/routine-day-exercise-order-field";
import { RoutineExerciseActions } from "@/features/role/coach/routine/components/shared/routine-exercise-actions";
import { formatBodyPartValue, getExerciseName } from "@/features/role/coach/routine/components/shared/routine-day-exercise-editor.utils";

type RoutineDayExercisesDesktopProps = {
	onDelete: ( clientId: string ) => void;
	onUpdateField: ( clientId: string, field: "observation" | "order" | "reps" | "sets", value: number | string ) => void;
	routines: DraftRoutineDayExercise[];
};

export function RoutineDayExercisesDesktop( {
	onDelete,
	onUpdateField,
	routines,
}: RoutineDayExercisesDesktopProps ) {
	const columns = [
		{
			accessorKey: "order",
			align: "center",
			allowsSorting: true,
			cell: ( routine: DraftRoutineDayExercise ) => (
				<RoutineDayExerciseOrderField onUpdateField={ onUpdateField } routine={ routine }/>
			),
			header: "Orden",
			id: "order",
			minWidth: 110,
		},
		{
			allowsSorting: true,
			cell: ( routine: DraftRoutineDayExercise ) => (
				<div className={ "flex min-w-0 flex-col" }>
					<span className={ "truncate font-medium text-foreground" }>{ getExerciseName( routine ) }</span>
					<span className={ "truncate text-xs text-muted" }>{ formatBodyPartValue( routine.exercise?.bodyPart ) }</span>
				</div>
			),
			header: "Ejercicio",
			id: "exercise",
			isRowHeader: true,
			minWidth: 260,
			sortFn: ( a: DraftRoutineDayExercise, b: DraftRoutineDayExercise ) => getExerciseName( a ).localeCompare( getExerciseName( b ) ),
		},
		{
			cell: ( routine: DraftRoutineDayExercise ) => (
				<RoutineDayExerciseField
					ariaLabel={ `Series de ${ getExerciseName( routine ) }` }
					inputClassName={ "w-28" }
					name={ `series-${ routine.clientId }` }
					onChange={ ( value ) => onUpdateField( routine.clientId, "sets", value ) }
					value={ routine.sets }
				/>
			),
			header: "Series",
			id: "sets",
			minWidth: 140,
		},
		{
			cell: ( routine: DraftRoutineDayExercise ) => (
				<RoutineDayExerciseField
					ariaLabel={ `Repeticiones de ${ getExerciseName( routine ) }` }
					inputClassName={ "w-32" }
					name={ `reps-${ routine.clientId }` }
					onChange={ ( value ) => onUpdateField( routine.clientId, "reps", value ) }
					value={ routine.reps }
				/>
			),
			header: "Repeticiones",
			id: "reps",
			minWidth: 160,
		},
		{
			cell: ( routine: DraftRoutineDayExercise ) => (
				<RoutineDayExerciseField
					ariaLabel={ `Notas de ${ getExerciseName( routine ) }` }
					inputClassName={ "min-h-10 w-full min-w-56" }
					isMultiline
					name={ `notes-${ routine.clientId }` }
					onChange={ ( value ) => onUpdateField( routine.clientId, "observation", value ) }
					value={ routine.observation }
				/>
			),
			header: "Notas",
			id: "notes",
			minWidth: 260,
		},
		{
			cell: ( routine: DraftRoutineDayExercise ) => (
				<RoutineExerciseActions
					exercise={ routine.exercise }
					exerciseName={ getExerciseName( routine ) }
					routineId={ routine.id }
					onDelete={ () => onDelete( routine.clientId ) }
				/>
			),
			header: "Acciones",
			id: "actions",
			minWidth: 90,
		},
	] satisfies DataGridColumn<DraftRoutineDayExercise>[];

	return (
		<div className={ "hidden md:block" }>
			<DataGrid
				aria-label={ "Ejercicios del dia" }
				columns={ columns }
				contentClassName={ "min-w-[980px]" }
				data={ routines }
				getRowId={ ( routine ) => routine.clientId }
			/>
		</div>
	);
}
