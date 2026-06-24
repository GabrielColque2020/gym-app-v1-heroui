"use client";

import type { DraftRoutineDayExercise } from "@/features/admin/routine/services/routine-day-editor";
import type { DataGridColumn } from "@heroui-pro/react";

import { useMemo, useState } from "react";
import {
	Button,
	Card,
	Dropdown,
	Header,
	Input,
	Label,
	TextArea,
	TextField,
} from "@heroui/react";
import { DataGrid } from "@heroui-pro/react";
import { CircleLink, EllipsisVertical, TrashBin } from "@gravity-ui/icons";

import { ExerciseVariantsSheet } from "@/features/admin/exercises/components/shared/ExerciseVariantsSheet";
import { BODY_PART_OPTIONS } from "@/features/admin/exercises/services/exercise-form";

type RoutineDayExerciseEditorProps = {
	onDelete: ( clientId: string ) => void;
	onUpdateField: ( clientId: string, field: "observation" | "order" | "reps" | "sets", value: number | string ) => void;
	routines: DraftRoutineDayExercise[];
};

type EditableExerciseFieldProps = {
	ariaLabel: string;
	className?: string;
	inputClassName?: string;
	isMultiline?: boolean;
	label?: string;
	name: string;
	onChange: ( value: string ) => void;
	value: string;
};

function formatBodyPartValue( bodyPart: string | null | undefined ) {
	if (!bodyPart) return "Sin grupo";

	return BODY_PART_OPTIONS.find( ( option ) => option.value === bodyPart )?.label ?? bodyPart;
}

function getExerciseName( routine: DraftRoutineDayExercise ) {
	return routine.exercise?.name ?? "Ejercicio sin nombre";
}

function EditableExerciseField( {
									ariaLabel,
									className,
									inputClassName,
									isMultiline = false,
									label,
									name,
									onChange,
									value,
								}: EditableExerciseFieldProps ) {
	return (
		<TextField
			aria-label={ ariaLabel }
			className={ className }
			name={ name }
			value={ value }
			onChange={ onChange }
		>
			{ label ? <Label className={ "text-xs text-muted" }>{ label }</Label> : null }
			{ isMultiline ? (
				<TextArea
					className={ inputClassName }
					rows={ 2 }
					variant={ "secondary" }
				/>
			) : (
				<Input
					className={ inputClassName }
					variant={ "secondary" }
				/>
			) }
		</TextField>
	);
}

type RoutineExerciseActionsProps = {
	exercise: DraftRoutineDayExercise[ "exercise" ];
	exerciseName: string;
	routineId: string | null;
	onDelete: () => void;
};

function RoutineExerciseActions( { exercise, exerciseName, routineId, onDelete }: RoutineExerciseActionsProps ) {
	const [ isVariantsOpen, setIsVariantsOpen ] = useState( false );

	return (
		<>
			<Dropdown>
				<Button
					isIconOnly
					aria-label={ `Opciones de ${ exerciseName }` }
					className={ "size-8 shrink-0 text-foreground" }
					variant={ "ghost" }
				>
					<EllipsisVertical className={ "size-4" }/>
				</Button>
				<Dropdown.Popover placement={ "bottom end" }>
					<Dropdown.Menu onAction={ ( key ) => {
						if (key === "variants" && exercise && routineId) {
							setIsVariantsOpen( true );
						}

						if (key === "delete") onDelete();
					} }>
						<Header>Opciones</Header>
						<Dropdown.Item id={ "variants" } textValue={ "Variantes" } isDisabled={ !exercise || !routineId }>
							<CircleLink className={ "size-4 shrink-0 text-accent" }/>
							<Label className={ "text-accent" }>Variantes</Label>
						</Dropdown.Item>
						<Dropdown.Item id={ "delete" } textValue={ "Eliminar" } variant={ "danger" }>
							<TrashBin className={ "size-4 shrink-0 text-danger" }/>
							<Label>Eliminar</Label>
						</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown.Popover>
			</Dropdown>
			{ exercise ? (
				<ExerciseVariantsSheet
					hideTrigger
					exercise={ exercise }
					routineId={ routineId }
					isOpen={ isVariantsOpen }
					onOpenChange={ setIsVariantsOpen }
				/>
			) : null }
		</>
	);
}

function OrderField( {
						 routine,
						 onUpdateField,
					 }: {
	onUpdateField: RoutineDayExerciseEditorProps[ "onUpdateField" ];
	routine: DraftRoutineDayExercise;
} ) {
	return (
		<TextField
			aria-label={ `Orden de ${ getExerciseName( routine ) }` }
			name={ `order-${ routine.clientId }` }
			value={ String( routine.order ) }
			onChange={ ( value ) => onUpdateField( routine.clientId, "order", Number( value ) || 0 ) }
		>
			<Input className={ "w-20 text-center" } inputMode={ "numeric" } variant={ "secondary" }/>
		</TextField>
	);
}

export function RoutineDayExercisesDesktop( {
												onDelete,
												onUpdateField,
												routines,
											}: RoutineDayExerciseEditorProps ) {
	const columns = useMemo<DataGridColumn<DraftRoutineDayExercise>[]>(
		() => [
			{
				accessorKey: "order",
				align: "center",
				allowsSorting: true,
				cell: ( routine ) => <OrderField onUpdateField={ onUpdateField } routine={ routine }/>,
				header: "Orden",
				id: "order",
				minWidth: 110,
			},
			{
				allowsSorting: true,
				cell: ( routine ) => (
					<div className={ "flex min-w-0 flex-col" }>
						<span className={ "truncate font-medium text-foreground" }>{ getExerciseName( routine ) }</span>
						<span className={ "truncate text-xs text-muted" }>
							{ formatBodyPartValue( routine.exercise?.bodyPart ) }
						</span>
					</div>
				),
				header: "Ejercicio",
				id: "exercise",
				isRowHeader: true,
				minWidth: 260,
				sortFn: ( a, b ) => getExerciseName( a ).localeCompare( getExerciseName( b ) ),
			},
			{
				cell: ( routine ) => (
					<EditableExerciseField
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
				cell: ( routine ) => (
					<EditableExerciseField
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
				cell: ( routine ) => (
					<EditableExerciseField
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
				cell: ( routine ) => (
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
		],
		[ onDelete, onUpdateField ],
	);

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

function RoutineExerciseMobileCard( {
										routine,
										onDelete,
										onUpdateField,
									}: {
	onDelete: RoutineDayExerciseEditorProps[ "onDelete" ];
	onUpdateField: RoutineDayExerciseEditorProps[ "onUpdateField" ];
	routine: DraftRoutineDayExercise;
} ) {
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

				<EditableExerciseField
					ariaLabel={ `Orden de ${ exerciseName }` }
					label={ "Orden" }
					name={ `mobile-order-${ routine.clientId }` }
					onChange={ ( value ) => onUpdateField( routine.clientId, "order", Number( value ) || 0 ) }
					value={ String( routine.order ) }
				/>

				<div className={ "grid grid-cols-2 gap-3" }>
					<EditableExerciseField
						ariaLabel={ `Series de ${ exerciseName }` }
						label={ "Series" }
						name={ `mobile-series-${ routine.clientId }` }
						onChange={ ( value ) => onUpdateField( routine.clientId, "sets", value ) }
						value={ routine.sets }
					/>
					<EditableExerciseField
						ariaLabel={ `Repeticiones de ${ exerciseName }` }
						label={ "Repeticiones" }
						name={ `mobile-reps-${ routine.clientId }` }
						onChange={ ( value ) => onUpdateField( routine.clientId, "reps", value ) }
						value={ routine.reps }
					/>
				</div>

				<EditableExerciseField
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

export function RoutineDayExercisesMobile( {
											   onDelete,
											   onUpdateField,
											   routines,
										   }: RoutineDayExerciseEditorProps ) {
	return (
		<div className={ "grid gap-3 md:hidden" }>
			{ routines.map( ( routine ) => (
				<RoutineExerciseMobileCard
					key={ routine.clientId }
					onDelete={ onDelete }
					onUpdateField={ onUpdateField }
					routine={ routine }
				/>
			) ) }
		</div>
	);
}
