import type { BodyPartValue, ExerciseFormValues } from "@/features/exercises/services/exercise-form";

import {
	Checkbox,
	Description,
	FieldError,
	Input,
	Label,
	ListBox,
	Select,
	TextArea,
	TextField,
} from "@heroui/react";
import { Sheet } from "@heroui-pro/react";

import { BODY_PART_OPTIONS } from "@/features/exercises/services/exercise-form";

type ExerciseSheetFieldsProps = {
	isNameInvalid: boolean;
	updateValue: <Key extends keyof ExerciseFormValues>( key: Key, value: ExerciseFormValues[ Key ] ) => void;
	values: ExerciseFormValues;
};

export function ExerciseSheetFields( {
	isNameInvalid,
	updateValue,
	values,
}: ExerciseSheetFieldsProps ) {
	return (
		<Sheet.Body className={ "min-h-0 flex-1 space-y-4 overflow-y-auto px-6 py-5" }>
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
		</Sheet.Body>
	);
}
