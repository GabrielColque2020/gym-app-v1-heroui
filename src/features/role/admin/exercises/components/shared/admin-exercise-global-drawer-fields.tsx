"use client";

import { Checkbox, Description, Drawer, FieldError, Input, Label, ListBox, Select, TextArea, TextField } from "@heroui/react";

import { AsyncMedia } from "@/components/common";
import type { AdminExerciseGlobalFormValues } from "@/features/role/admin/exercises/services/admin-exercise-global-form";
import {
	ADMIN_EXERCISE_GLOBAL_CATEGORY_OPTIONS,
	ADMIN_EXERCISE_GLOBAL_EQUIPMENT_OPTIONS,
	ADMIN_EXERCISE_GLOBAL_MUSCLE_GROUP_OPTIONS,
	ADMIN_EXERCISE_GLOBAL_TARGET_OPTIONS,
} from "@/features/role/admin/exercises/services/admin-exercise-global-form";

type AdminExerciseGlobalDrawerFieldsProps = {
	isCategoryInvalid: boolean;
	isEquipmentInvalid: boolean;
	isMuscleGroupInvalid: boolean;
	isNameInvalid: boolean;
	isTargetInvalid: boolean;
	updateValue: <Key extends keyof AdminExerciseGlobalFormValues>( key: Key, value: AdminExerciseGlobalFormValues[ Key ] ) => void;
	values: AdminExerciseGlobalFormValues;
};

function getTargetOptions( currentValue: string ) {
	const normalizedCurrentValue = currentValue.trim();
	const hasCurrentValue = normalizedCurrentValue.length > 0;
	const currentValueIsKnown = ADMIN_EXERCISE_GLOBAL_TARGET_OPTIONS.some( ( option ) => option.value === normalizedCurrentValue );

	if (!hasCurrentValue || currentValueIsKnown) {
		return ADMIN_EXERCISE_GLOBAL_TARGET_OPTIONS;
	}

	return [
		{ label: normalizedCurrentValue, value: normalizedCurrentValue },
		...ADMIN_EXERCISE_GLOBAL_TARGET_OPTIONS,
	];
}

function getMuscleGroupOptions( currentValue: string ) {
	const normalizedCurrentValue = currentValue.trim();
	const hasCurrentValue = normalizedCurrentValue.length > 0;
	const currentValueIsKnown = ADMIN_EXERCISE_GLOBAL_MUSCLE_GROUP_OPTIONS.some( ( option ) => option.value === normalizedCurrentValue );

	if (!hasCurrentValue || currentValueIsKnown) {
		return ADMIN_EXERCISE_GLOBAL_MUSCLE_GROUP_OPTIONS;
	}

	return [
		{ label: normalizedCurrentValue, value: normalizedCurrentValue },
		...ADMIN_EXERCISE_GLOBAL_MUSCLE_GROUP_OPTIONS,
	];
}

function getEquipmentOptions( currentValue: string ) {
	const normalizedCurrentValue = currentValue.trim();
	const hasCurrentValue = normalizedCurrentValue.length > 0;
	const currentValueIsKnown = ADMIN_EXERCISE_GLOBAL_EQUIPMENT_OPTIONS.some( ( option ) => option.value === normalizedCurrentValue );

	if (!hasCurrentValue || currentValueIsKnown) {
		return ADMIN_EXERCISE_GLOBAL_EQUIPMENT_OPTIONS;
	}

	return [
		{ label: normalizedCurrentValue, value: normalizedCurrentValue },
		...ADMIN_EXERCISE_GLOBAL_EQUIPMENT_OPTIONS,
	];
}

export function AdminExerciseGlobalDrawerFields( {
	isCategoryInvalid,
	isEquipmentInvalid,
	isMuscleGroupInvalid,
	isNameInvalid,
	isTargetInvalid,
	updateValue,
	values,
}: AdminExerciseGlobalDrawerFieldsProps ) {
	return (
		<Drawer.Body className={ "min-h-0 flex-1 space-y-6 overflow-y-auto py-3" }>
			<div className={ "grid gap-4 md:grid-cols-1" }>
				<TextField
					isRequired
					fullWidth
					isInvalid={ isNameInvalid }
					name={ "name" }
					value={ values.name }
					onChange={ ( value ) => updateValue( "name", value ) }
				>
					<Label>Nombre</Label>
					<Input className={ "border border-border" } placeholder={ "Ej: 3/4 sit-up" }/>
					{ isNameInvalid ? <FieldError>Debe tener al menos 2 caracteres.</FieldError> : null }
				</TextField>
			</div>

			<div className={ "grid gap-2" }>
				<Label>Categoria</Label>
				<Select
					fullWidth
					isInvalid={ isCategoryInvalid }
					name={ "category" }
					value={ values.category }
					onChange={ ( value ) => updateValue( "category", value ) }
				>
					<Select.Trigger className={ "border border-border" }>
						<Select.Value/>
						<Select.Indicator/>
					</Select.Trigger>
					<Select.Popover>
						<ListBox>
							{ ADMIN_EXERCISE_GLOBAL_CATEGORY_OPTIONS.map( ( option ) => (
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
					<Label>Grupo muscular objetivo</Label>
					<Select
						fullWidth
						isInvalid={ isTargetInvalid }
						name={ "target" }
						value={ values.target }
						onChange={ ( value ) => updateValue( "target", value ) }
					>
						<Select.Trigger className={ "border border-border" }>
							<Select.Value/>
							<Select.Indicator/>
						</Select.Trigger>
						<Select.Popover>
							<ListBox>
								{ getTargetOptions( values.target ).map( ( option ) => (
									<ListBox.Item key={ option.value } id={ option.value } textValue={ option.label }>
										{ option.label }
										<ListBox.ItemIndicator/>
									</ListBox.Item>
								) ) }
							</ListBox>
						</Select.Popover>
					</Select>
					{ isTargetInvalid ? <FieldError>Debe tener al menos 2 caracteres.</FieldError> : null }
				</div>
				<div className={ "grid gap-2" }>
					<Label>Musculo principal</Label>
					<Select
						fullWidth
						isInvalid={ isMuscleGroupInvalid }
						name={ "muscleGroup" }
						value={ values.muscleGroup }
						onChange={ ( value ) => updateValue( "muscleGroup", value ) }
					>
						<Select.Trigger className={ "border border-border" }>
							<Select.Value/>
							<Select.Indicator/>
						</Select.Trigger>
						<Select.Popover>
							<ListBox>
								{ getMuscleGroupOptions( values.muscleGroup ).map( ( option ) => (
									<ListBox.Item key={ option.value } id={ option.value } textValue={ option.label }>
										{ option.label }
										<ListBox.ItemIndicator/>
									</ListBox.Item>
								) ) }
							</ListBox>
						</Select.Popover>
					</Select>
					{ isMuscleGroupInvalid ? <FieldError>Debe tener al menos 2 caracteres.</FieldError> : null }
				</div>
			</div>

			<div className={ "grid gap-2" }>
				<Label>Tipo de equipamiento</Label>
				<Select
					fullWidth
					isInvalid={ isEquipmentInvalid }
					name={ "equipment" }
					value={ values.equipment }
					onChange={ ( value ) => updateValue( "equipment", value ) }
				>
					<Select.Trigger className={ "border border-border" }>
						<Select.Value/>
						<Select.Indicator/>
					</Select.Trigger>
					<Select.Popover>
						<ListBox>
							{ getEquipmentOptions( values.equipment ).map( ( option ) => (
								<ListBox.Item key={ option.value } id={ option.value } textValue={ option.label }>
									{ option.label }
									<ListBox.ItemIndicator/>
								</ListBox.Item>
							) ) }
						</ListBox>
					</Select.Popover>
				</Select>
				{ isEquipmentInvalid ? <FieldError>Debe tener al menos 2 caracteres.</FieldError> : null }
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
					placeholder={ "Indicaciones tecnicas o notas de uso." }
				/>
			</TextField>

			<div className={ "grid gap-4 md:grid-cols-2" } aria-label={ "Vista previa de medios" }>
				<div className={ "space-y-2" }>
					<Label>Vista previa de imagen</Label>
					<AsyncMedia
						alt={ `Vista previa de ${ values.name || "ejercicio" }` }
						className={ "h-56 rounded-2xl border border-border" }
						emptyLabel={ "No hay imagen cargada para este ejercicio." }
						spinnerLabel={ `Cargando imagen de ${ values.name || "ejercicio" }` }
						src={ values.imageUrl }
					/>
				</div>

				<div className={ "space-y-2" }>
					<Label>Vista previa de video / GIF</Label>
					<AsyncMedia
						alt={ `Vista previa de video de ${ values.name || "ejercicio" }` }
						className={ "h-56 rounded-2xl border border-border" }
						emptyLabel={ "No hay video o GIF cargado para este ejercicio." }
						spinnerLabel={ `Cargando video de ${ values.name || "ejercicio" }` }
						src={ values.videoUrl }
					/>
				</div>
			</div>

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
						Si se desactiva, el ejercicio queda oculto para nuevas rutinas pero se conserva en el catalogo.
					</Description>
				</Checkbox.Content>
			</Checkbox>
		</Drawer.Body>
	);
}
