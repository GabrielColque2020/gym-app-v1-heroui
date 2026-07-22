"use client";

import type { Key } from "react";
import { Checkbox, Description, Drawer, FieldError, Input, Label, ListBox, Select, TextArea, TextField } from "@heroui/react";

import { AsyncMedia } from "@/components/common";
import { BODY_PART_OPTIONS, formatBodyPart } from "@/features/exercises/services/exercise-formatters";
import type { CoachExerciseFormValues } from "@/features/role/coach/exercises/services/coach-exercise-form";
import {
	COACH_EXERCISE_EQUIPMENT_OPTIONS,
	COACH_EXERCISE_MUSCLE_GROUP_OPTIONS,
	COACH_EXERCISE_TARGET_OPTIONS,
} from "@/features/role/coach/exercises/services/coach-exercise-form";

type ExerciseDrawerFieldsProps = {
	isCategoryInvalid: boolean;
	isNameInvalid: boolean;
	mediaImageUrl?: string | null;
	mediaVideoUrl?: string | null;
	showMediaPreview?: boolean;
	updateValue: <Key extends keyof CoachExerciseFormValues>( key: Key, value: CoachExerciseFormValues[ Key ] ) => void;
	values: CoachExerciseFormValues;
};

function getOptionsWithCurrentValue( currentValue: string, options: readonly { label: string; value: string }[] ) {
	const normalizedCurrentValue = currentValue.trim();
	const currentValueIsKnown = options.some( ( option ) => option.value === normalizedCurrentValue );

	if (!normalizedCurrentValue || currentValueIsKnown) {
		return options;
	}

	return [
		{ label: normalizedCurrentValue, value: normalizedCurrentValue },
		...options,
	];
}

function normalizeSelectValue( value: Key | null ) {
	return value === null ? "" : String( value );
}

export function ExerciseDrawerFields( {
	isCategoryInvalid,
	isNameInvalid,
	mediaImageUrl,
	mediaVideoUrl,
	showMediaPreview = false,
	updateValue,
	values,
}: ExerciseDrawerFieldsProps ) {
	return (
		<Drawer.Body className={ "min-h-0 flex-1 space-y-6 overflow-y-auto py-3" }>
			<div className={ "grid gap-2" }>
				<TextField
					isRequired
					fullWidth
					isInvalid={ isNameInvalid }
					name={ "name" }
					value={ values.name }
					onChange={ ( value ) => updateValue( "name", value ) }
				>
					<Label>Nombre</Label>
					<Input className={ "border border-border" } placeholder={ "Ej: Press banca" }/>
					{ isNameInvalid ? <FieldError>Debe tener al menos 2 caracteres.</FieldError> : null }
				</TextField>
			</div>

			<div className={ "grid gap-2" }>
				<Label>Categoria</Label>
				<Select
					fullWidth
					isInvalid={ isCategoryInvalid }
					name={ "bodyPart" }
					value={ values.bodyPart }
					onChange={ ( value ) => {
						const nextBodyPart = normalizeSelectValue( value ) as CoachExerciseFormValues["bodyPart"];

						updateValue( "bodyPart", nextBodyPart );
						updateValue( "category", formatBodyPart( nextBodyPart ) );
					} }
				>
					<Select.Trigger className={ "border border-border" }>
						<Select.Value/>
						<Select.Indicator/>
					</Select.Trigger>
					<Select.Popover>
						<ListBox>
							{ BODY_PART_OPTIONS.map( ( option ) => (
								<ListBox.Item key={ option.value } id={ option.value } textValue={ option.label }>
									{ option.label }
									<ListBox.ItemIndicator/>
								</ListBox.Item>
							) ) }
						</ListBox>
					</Select.Popover>
				</Select>
				{ isCategoryInvalid ? <FieldError>Debe tener al menos 2 caracteres.</FieldError> : null }
			</div>

			<div className={ "grid gap-4 md:grid-cols-2" }>
				<div className={ "grid gap-2" }>
					<Label>Tipo de equipamiento</Label>
					<Select
						fullWidth
						name={ "equipment" }
						value={ values.equipment }
						onChange={ ( value ) => updateValue( "equipment", normalizeSelectValue( value ) ) }
					>
						<Select.Trigger className={ "border border-border" }>
							<Select.Value/>
							<Select.Indicator/>
						</Select.Trigger>
						<Select.Popover>
							<ListBox>
								{ getOptionsWithCurrentValue( values.equipment, COACH_EXERCISE_EQUIPMENT_OPTIONS ).map( ( option ) => (
									<ListBox.Item key={ option.value } id={ option.value } textValue={ option.label }>
										{ option.label }
										<ListBox.ItemIndicator/>
									</ListBox.Item>
								) ) }
							</ListBox>
						</Select.Popover>
					</Select>
				</div>

				<div className={ "grid gap-2" }>
					<Label>Musculo principal</Label>
					<Select
						fullWidth
						name={ "muscleGroup" }
						value={ values.muscleGroup }
						onChange={ ( value ) => updateValue( "muscleGroup", normalizeSelectValue( value ) ) }
					>
						<Select.Trigger className={ "border border-border" }>
							<Select.Value/>
							<Select.Indicator/>
						</Select.Trigger>
						<Select.Popover>
							<ListBox>
								{ getOptionsWithCurrentValue( values.muscleGroup, COACH_EXERCISE_MUSCLE_GROUP_OPTIONS ).map( ( option ) => (
									<ListBox.Item key={ option.value } id={ option.value } textValue={ option.label }>
										{ option.label }
										<ListBox.ItemIndicator/>
									</ListBox.Item>
								) ) }
							</ListBox>
						</Select.Popover>
					</Select>
				</div>
			</div>

			<div className={ "grid gap-2" }>
				<Label>Grupo muscular objetivo</Label>
				<Select
					fullWidth
					name={ "target" }
					value={ values.target }
					onChange={ ( value ) => updateValue( "target", normalizeSelectValue( value ) ) }
				>
					<Select.Trigger className={ "border border-border" }>
						<Select.Value/>
						<Select.Indicator/>
					</Select.Trigger>
					<Select.Popover>
						<ListBox>
							{ getOptionsWithCurrentValue( values.target, COACH_EXERCISE_TARGET_OPTIONS ).map( ( option ) => (
								<ListBox.Item key={ option.value } id={ option.value } textValue={ option.label }>
									{ option.label }
									<ListBox.ItemIndicator/>
								</ListBox.Item>
							) ) }
						</ListBox>
					</Select.Popover>
				</Select>
			</div>

			<TextField
				fullWidth
				name={ "instructions" }
				value={ values.instructions }
				onChange={ ( value ) => updateValue( "instructions", value ) }
			>
				<Label>Instrucciones</Label>
				<TextArea
					className={ "min-h-32 border border-border" }
					placeholder={ "Indicaciones tecnicas, errores comunes o recomendaciones." }
				/>
			</TextField>

			{ showMediaPreview ? (
				<div className={ "grid gap-4 md:grid-cols-2" } aria-label={ "Vista previa de medios" }>
					<div className={ "space-y-2" }>
						<Label>Vista previa de imagen</Label>
						<AsyncMedia
							alt={ `Vista previa de ${ values.name || "ejercicio" }` }
							className={ "h-56 rounded-2xl border border-border" }
							emptyLabel={ "No hay imagen disponible para este ejercicio global." }
							spinnerLabel={ `Cargando imagen de ${ values.name || "ejercicio" }` }
							src={ mediaImageUrl }
						/>
					</div>

					<div className={ "space-y-2" }>
						<Label>Vista previa de video / GIF</Label>
						<AsyncMedia
							alt={ `Vista previa de video de ${ values.name || "ejercicio" }` }
							className={ "h-56 rounded-2xl border border-border" }
							emptyLabel={ "No hay video o GIF disponible para este ejercicio global." }
							spinnerLabel={ `Cargando video de ${ values.name || "ejercicio" }` }
							src={ mediaVideoUrl }
						/>
					</div>
				</div>
			) : null }

			<Checkbox
				isSelected={ values.active }
				onChange={ ( isSelected ) => updateValue( "active", isSelected ) }
			>
				<Checkbox.Control>
					<Checkbox.Indicator/>
				</Checkbox.Control>
				<Checkbox.Content>
					<Label>Ejercicio activo</Label>
					<Description className={ "text-sm" }>
						Los ejercicios inactivos quedan ocultos para nuevas rutinas, pero se conservan en el historial.
					</Description>
				</Checkbox.Content>
			</Checkbox>
		</Drawer.Body>
	);
}
