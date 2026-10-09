"use client";

import { useMemo, type Key } from "react";
import {
	Checkbox,
	Description,
	Drawer,
	FieldError,
	Input,
	Label,
	ListBox,
	Select,
	TextArea,
	TextField
} from "@heroui/react";

import { ExerciseMediaField } from "@/features/exercise-media/components/exercise-media-field";
import type {
	AdminExerciseGlobalFormValues
} from "@/features/role/admin/exercises/services/admin-exercise-global-form";
import { useAdminExerciseGlobals } from "@/features/role/admin/exercises/hooks/use-admin-exercise-globals";

type AdminExerciseGlobalDrawerFieldsProps = {
	isCategoryInvalid: boolean;
	isEquipmentInvalid: boolean;
	isMuscleGroupInvalid: boolean;
	isNameInvalid: boolean;
	isSaving: boolean;
	isTargetInvalid: boolean;
	onUploadingChangeAction: ( isUploading: boolean ) => void;
	updateValue: <Key extends keyof AdminExerciseGlobalFormValues>( key: Key, value: AdminExerciseGlobalFormValues[ Key ] ) => void;
	values: AdminExerciseGlobalFormValues;
};

function normalizeSelectValue( value: Key | null ) {
	return value === null ? "" : String( value );
}

const OPTION_FIELDS = [ "category", "equipment", "muscleGroup", "target" ] as const;

type OptionField = typeof OPTION_FIELDS[ number ];

// Las opciones de cada lista salen de lo que ya usa el catalogo, no de una lista
// fija: asi el formulario ofrece exactamente las categorias, musculos y equipos
// que existen, escritos igual, y no se crean duplicados por una mayuscula.
function useAdminExerciseOptions( values: AdminExerciseGlobalFormValues ) {
	const { data: exercises = [] } = useAdminExerciseGlobals();
	const catalogOptions = useMemo( () => {
		const sets: Record<OptionField, Set<string>> = {
			category: new Set(),
			equipment: new Set(),
			muscleGroup: new Set(),
			target: new Set(),
		};

		for (const exercise of exercises) {
			for (const field of OPTION_FIELDS) {
				const value = exercise[ field ]?.trim();

				if (value) sets[ field ].add( value );
			}
		}

		return sets;
	}, [ exercises ] );

	function getOptions( field: OptionField ) {
		const current = values[ field ].trim();
		const options = new Set( catalogOptions[ field ] );

		// El valor del ejercicio siempre esta, aunque el catalogo todavia no haya cargado.
		if (current) options.add( current );

		return Array.from( options ).sort( ( left, right ) => left.localeCompare( right, "es" ) );
	}

	return {
		category: getOptions( "category" ),
		equipment: getOptions( "equipment" ),
		muscleGroup: getOptions( "muscleGroup" ),
		target: getOptions( "target" ),
	};
}

export function AdminExerciseGlobalDrawerFields( {
	isCategoryInvalid,
	isEquipmentInvalid,
	isMuscleGroupInvalid,
	isNameInvalid,
	isSaving,
	isTargetInvalid,
	onUploadingChangeAction,
	updateValue,
	values,
}: AdminExerciseGlobalDrawerFieldsProps ) {
	const options = useAdminExerciseOptions( values );

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
				<Label>Categoría</Label>
				<Select
					fullWidth
					isInvalid={ isCategoryInvalid }
					name={ "category" }
					value={ values.category }
					onChange={ ( value ) => updateValue( "category", normalizeSelectValue( value ) ) }
				>
					<Select.Trigger className={ "border border-border" }>
						<Select.Value/>
						<Select.Indicator/>
					</Select.Trigger>
					<Select.Popover>
						<ListBox>
							{ options.category.map( ( option ) => (
								<ListBox.Item key={ option } id={ option } textValue={ option }>
									{ option }
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
					<Label>Músculo objetivo</Label>
					<Select
						fullWidth
						isInvalid={ isTargetInvalid }
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
								{ options.target.map( ( option ) => (
									<ListBox.Item key={ option } id={ option } textValue={ option }>
										{ option }
										<ListBox.ItemIndicator/>
									</ListBox.Item>
								) ) }
							</ListBox>
						</Select.Popover>
					</Select>
					{ isTargetInvalid ? <FieldError>Debe tener al menos 2 caracteres.</FieldError> : null }
				</div>
				<div className={ "grid gap-2" }>
					<Label>Músculo principal</Label>
					<Select
						fullWidth
						isInvalid={ isMuscleGroupInvalid }
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
								{ options.muscleGroup.map( ( option ) => (
									<ListBox.Item key={ option } id={ option } textValue={ option }>
										{ option }
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
					onChange={ ( value ) => updateValue( "equipment", normalizeSelectValue( value ) ) }
				>
					<Select.Trigger className={ "border border-border" }>
						<Select.Value/>
						<Select.Indicator/>
					</Select.Trigger>
					<Select.Popover>
						<ListBox>
							{ options.equipment.map( ( option ) => (
								<ListBox.Item key={ option } id={ option } textValue={ option }>
									{ option }
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
					placeholder={ "Indicaciones técnicas o notas de uso." }
				/>
			</TextField>

			{ /* La imagen y el video del catalogo: los ven todos los entrenadores que
			     no hayan subido los suyos para este ejercicio. */ }
			<div className={ "grid gap-4 md:grid-cols-2" }>
				<ExerciseMediaField
					exerciseName={ values.name }
					isDisabled={ isSaving }
					slot={ "image" }
					value={ values.imageUrl }
					onChangeAction={ ( url ) => updateValue( "imageUrl", url ) }
					onUploadingChangeAction={ onUploadingChangeAction }
				/>
				<ExerciseMediaField
					exerciseName={ values.name }
					isDisabled={ isSaving }
					slot={ "video" }
					value={ values.videoUrl }
					onChangeAction={ ( url ) => updateValue( "videoUrl", url ) }
					onUploadingChangeAction={ onUploadingChangeAction }
				/>
			</div>

			<div>
				<Checkbox
					className={ "flex-1 flex-row" }
					isSelected={ values.active }
					onChange={ (isSelected) => updateValue("active", isSelected) }
				>
					<Checkbox.Control>
						<Checkbox.Indicator/>
					</Checkbox.Control>
					<Checkbox.Content>
						<Label>Ejercicio activo</Label>
					</Checkbox.Content>
				</Checkbox>
				<Description className={ "text-sm" }>
					Si se desactiva, el ejercicio queda oculto para nuevas rutinas pero se conserva en el catálogo.
				</Description>
			</div>
		</Drawer.Body>
	);
}
