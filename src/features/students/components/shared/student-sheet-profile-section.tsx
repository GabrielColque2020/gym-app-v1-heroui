import type { GenderFormValue, StudentFormValues } from "@/features/students/services/student-form";
import { GENDER_OPTIONS, NO_GENDER } from "@/features/students/services/student-form";

import type { DateValue } from "@internationalized/date";
import { parseDate } from "@internationalized/date";

import { Calendar, Checkbox, DateField, DatePicker, Description, FieldError, Input, Label, ListBox, Select, TextField, } from "@heroui/react";

function getBirthDateValue( value: string ): DateValue | null {
	const trimmedValue = value.trim();

	if (trimmedValue.length === 0) return null;

	try {
		return parseDate( trimmedValue );
	} catch {
		return null;
	}
}

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
	const birthDateValue = getBirthDateValue( values.birthDate );

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
				<Input autoComplete={ "off" } placeholder={ "Ej: Gabriel Colque" }/>
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
					<Input autoComplete={ "off" } placeholder={ "estudiante@email.com" } type={ "email" }/>
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
					<Input autoComplete={ "off" } inputMode={ "numeric" } placeholder={ "22222222" }/>
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
					autoComplete={ "new-password" }
					placeholder={ isEditMode ? "Dejar vacia para mantener la actual" : "Contrasenia inicial" }
					type={ "password" }
				/>
				{ isPasswordInvalid ? <FieldError>La contrasenia es obligatoria.</FieldError> : null }
			</TextField>

			<div className={ "grid gap-4 sm:grid-cols-2" }>
				<Select
					className={ "w-full" }
					fullWidth
					autoComplete={ "off" }
					name={ "gender" }
					placeholder={ "Seleccione genero" }
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

				<DatePicker
					className={ "w-full" }
					autoComplete={ "off" }
					name={ "birthDate" }
					value={ birthDateValue }
					onChange={ ( value ) => updateValue( "birthDate", value ? value.toString() : "" ) }
				>
					<Label>Fecha de nacimiento</Label>
					<DateField.Group fullWidth>
						<DateField.Input>
							{ ( segment ) => <DateField.Segment segment={ segment }/> }
						</DateField.Input>
						<DateField.Suffix>
							<DatePicker.Trigger type={ "button" }>
								<DatePicker.TriggerIndicator/>
							</DatePicker.Trigger>
						</DateField.Suffix>
					</DateField.Group>
					<DatePicker.Popover>
						<Calendar aria-label={ "Fecha de nacimiento" }>
							<Calendar.Header>
								<Calendar.YearPickerTrigger>
									<Calendar.YearPickerTriggerHeading/>
									<Calendar.YearPickerTriggerIndicator/>
								</Calendar.YearPickerTrigger>
								<Calendar.NavButton slot={ "previous" }/>
								<Calendar.NavButton slot={ "next" }/>
							</Calendar.Header>
							<Calendar.Grid>
								<Calendar.GridHeader>
									{ ( day ) => <Calendar.HeaderCell>{ day }</Calendar.HeaderCell> }
								</Calendar.GridHeader>
								<Calendar.GridBody>
									{ ( date ) => <Calendar.Cell date={ date }/> }
								</Calendar.GridBody>
							</Calendar.Grid>
							<Calendar.YearPickerGrid>
								<Calendar.YearPickerGridBody>
									{ ( { year } ) => <Calendar.YearPickerCell year={ year }/> }
								</Calendar.YearPickerGridBody>
							</Calendar.YearPickerGrid>
						</Calendar>
					</DatePicker.Popover>
				</DatePicker>
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
