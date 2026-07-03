import type { GenderFormValue, StudentFormValues } from "@/features/students/services/student-form";

import {
	Checkbox,
	Description,
	FieldError,
	Input,
	Label,
	ListBox,
	Select,
	TextField,
} from "@heroui/react";

import {
	GENDER_OPTIONS,
	NO_GENDER,
} from "@/features/students/services/student-form";

type StudentSheetProfileSectionProps = {
	isDniInvalid: boolean;
	isEditMode: boolean;
	isEmailInvalid: boolean;
	isNameInvalid: boolean;
	isPasswordInvalid: boolean;
	updateValue: <Key extends keyof StudentFormValues>( key: Key, value: StudentFormValues[ Key ] ) => void;
	values: StudentFormValues;
};

export function StudentSheetProfileSection( {
	isDniInvalid,
	isEditMode,
	isEmailInvalid,
	isNameInvalid,
	isPasswordInvalid,
	updateValue,
	values,
}: StudentSheetProfileSectionProps ) {
	return (
		<section className={ "space-y-4" }>
			<div>
				<h3 className={ "text-sm font-semibold text-foreground" }>Perfil de Estudiante</h3>
				<p className={ "text-sm text-muted" }>Datos de acceso e identificacion.</p>
			</div>

			<TextField
				isRequired
				fullWidth
				isInvalid={ isNameInvalid }
				name={ "name" }
				value={ values.name }
				onChange={ ( value ) => updateValue( "name", value ) }
			>
				<Label>Nombre</Label>
				<Input placeholder={ "Ej: Gabriel Colque" }/>
				{ isNameInvalid ? <FieldError>Debe tener al menos 2 caracteres.</FieldError> : null }
			</TextField>

			<div className={ "grid gap-4 sm:grid-cols-2" }>
				<TextField
					isRequired
					fullWidth
					isInvalid={ isEmailInvalid }
					name={ "email" }
					value={ values.email }
					onChange={ ( value ) => updateValue( "email", value ) }
				>
					<Label>Email</Label>
					<Input placeholder={ "estudiante@email.com" } type={ "email" }/>
					{ isEmailInvalid ? <FieldError>Ingresa un email valido.</FieldError> : null }
				</TextField>

				<TextField
					isRequired
					fullWidth
					isInvalid={ isDniInvalid }
					name={ "dni" }
					value={ values.dni }
					onChange={ ( value ) => updateValue( "dni", value ) }
				>
					<Label>DNI</Label>
					<Input inputMode={ "numeric" } placeholder={ "22222222" }/>
					{ isDniInvalid ? <FieldError>Debe ser numerico.</FieldError> : null }
				</TextField>
			</div>

			<TextField
				isRequired={ !isEditMode }
				fullWidth
				isInvalid={ isPasswordInvalid }
				name={ "password" }
				value={ values.password }
				onChange={ ( value ) => updateValue( "password", value ) }
			>
				<Label>Contrasenia</Label>
				<Input
					placeholder={ isEditMode ? "Dejar vacia para mantener la actual" : "Contrasenia inicial" }
					type={ "password" }
				/>
				{ isPasswordInvalid ? <FieldError>La contrasenia es obligatoria.</FieldError> : null }
			</TextField>

			<div className={ "grid gap-4 sm:grid-cols-2" }>
				<Select
					name={ "gender" }
					placeholder={ "Selecciona genero" }
					value={ values.gender }
					onChange={ ( value ) => updateValue( "gender", ( value ?? NO_GENDER ) as GenderFormValue ) }
				>
					<Label>Genero</Label>
					<Select.Trigger>
						<Select.Value/>
						<Select.Indicator/>
					</Select.Trigger>
					<Select.Popover>
						<ListBox>
							<ListBox.Item id={ NO_GENDER } textValue={ "Sin especificar" }>
								Sin especificar
								<ListBox.ItemIndicator/>
							</ListBox.Item>
							{ GENDER_OPTIONS.map( ( option ) => (
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
					name={ "birthDate" }
					value={ values.birthDate }
					onChange={ ( value ) => updateValue( "birthDate", value ) }
				>
					<Label>Fecha de nacimiento</Label>
					<Input type={ "date" }/>
				</TextField>
			</div>

			<Checkbox isSelected={ values.active } onChange={ ( isSelected ) => updateValue( "active", isSelected ) }>
				<Checkbox.Control>
					<Checkbox.Indicator/>
				</Checkbox.Control>
				<Checkbox.Content>
					<Label>Estudiante activo</Label>
					<Description className={ "text-sm" }>
						Los estudiantes inactivos se conservan para el historial.
					</Description>
				</Checkbox.Content>
			</Checkbox>
		</section>
	);
}
