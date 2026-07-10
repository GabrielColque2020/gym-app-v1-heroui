import type { BodyPartValue, ExerciseFormValues } from "@/features/exercises/services/exercise-form";
import { BODY_PART_OPTIONS } from "@/features/exercises/services/exercise-form";

import { Checkbox, Description, Drawer, FieldError, Input, Label, ListBox, Select, TextArea, TextField, } from "@heroui/react";

type ExerciseDrawerFieldsProps = {
	isNameInvalid: boolean;
	updateValue: <Key extends keyof ExerciseFormValues>( key: Key, value: ExerciseFormValues[ Key ] ) => void;
	values: ExerciseFormValues;
};

export function ExerciseDrawerFields( {
										  isNameInvalid,
										  updateValue,
										  values,
									  }: ExerciseDrawerFieldsProps ) {
	return (
		<Drawer.Body className={ "min-h-0 flex-1 space-y-6 overflow-y-auto py-3" }>
			<TextField
				isRequired
				fullWidth
				isInvalid={ isNameInvalid }
				name={ "name" }
				value={ values.name }
				onChange={ ( value ) => updateValue( "name", value ) }
			>
				<Label>Nombre</Label>
				<Input placeholder={ "Ej: Press banca" }/>
				{ isNameInvalid ? <FieldError>Debe tener al menos 2 caracteres.</FieldError> : null }
			</TextField>

			<Select
				name={ "bodyPart" }
				placeholder={ "Selecciona una parte del cuerpo" }
				value={ values.bodyPart }
				onChange={ ( value ) => {
					if (value) {
						updateValue( "bodyPart", value as BodyPartValue );
					}
				} }
			>
				<Label>Parte del cuerpo</Label>
				<Select.Trigger>
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

			<TextField
				fullWidth
				name={ "tips" }
				value={ values.tips }
				onChange={ ( value ) => updateValue( "tips", value ) }
			>
				<Label>Tips</Label>
				<TextArea className={ "min-h-28" } placeholder={ "Indicaciones tecnicas, errores comunes o recomendaciones." }/>
			</TextField>

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
