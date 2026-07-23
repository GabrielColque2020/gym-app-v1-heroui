"use client";

import type { GenderFormValue, StudentFormValues } from "@/features/students/services/student-form";
import { GENDER_OPTIONS, NO_GENDER } from "@/features/students/services/student-form";

import type { DateValue } from "@internationalized/date";
import { parseDate } from "@internationalized/date";
import { useState } from "react";

import {
	Button,
	Calendar,
	Checkbox,
	DateField,
	DatePicker,
	Description,
	FieldError,
	Input,
	Label,
	ListBox,
	Select,
	TextField,
} from "@heroui/react";
import { Eye, EyeOff } from "lucide-react";

function getBirthDateValue( value: string ): DateValue | null {
	const trimmedValue = value.trim();

	if (trimmedValue.length === 0) return null;

	try {
		return parseDate( trimmedValue );
	} catch {
		return null;
	}
}

type StudentDrawerProfileSectionProps = {
	isDniInvalid: boolean;
	isEditMode: boolean;
	isEmailInvalid: boolean;
	isNameInvalid: boolean;
	isPasswordInvalid: boolean;
	updateValue: <Key extends keyof StudentFormValues>( key: Key, value: StudentFormValues[ Key ] ) => void;
	values: StudentFormValues;
};

export function StudentDrawerProfileSection( {
												 isDniInvalid,
												 isEditMode,
												 isEmailInvalid,
												 isNameInvalid,
												 isPasswordInvalid,
												 updateValue,
												 values,
											 }: StudentDrawerProfileSectionProps) {
	const [ isPasswordVisible, setIsPasswordVisible ] = useState(false);
	const birthDateValue = getBirthDateValue( values.birthDate );

	return (
		<section className={ "space-y-4" }>
			<div>
				<h3 className={ "text-sm font-semibold text-foreground" }>Perfil de Estudiante</h3>
				<p className={ "text-sm text-muted" }>Datos de acceso e identificacion.</p>
			</div>

			<TextField
				fullWidth
				isInvalid={ isNameInvalid }
				isRequired
				name={ "name" }
				value={ values.name }
				onChange={ ( value ) => updateValue( "name", value ) }
			>
				<Label>Nombre</Label>
				<Input autoComplete={ "off" } className={ "border border-border" } placeholder={ "Ej: Nombre Completo" }/>
				{ isNameInvalid ? <FieldError>Debe tener al menos 2 caracteres.</FieldError> : null }
			</TextField>

			<div className={ "grid gap-4 sm:grid-cols-2" }>
				<TextField
					fullWidth
					isInvalid={ isEmailInvalid }
					isRequired
					name={ "email" }
					value={ values.email }
					onChange={ ( value ) => updateValue( "email", value ) }
				>
					<Label>Email</Label>
					<Input autoComplete={ "off" } className={ "border border-border" } placeholder={ "estudiante@email.com" }
					       type={ "email" }/>
					{ isEmailInvalid ? <FieldError>Ingresa un email valido.</FieldError> : null }
				</TextField>

				<TextField
					fullWidth
					isInvalid={ isDniInvalid }
					isRequired
					name={ "dni" }
					value={ values.dni }
					onChange={ ( value ) => updateValue( "dni", value ) }
				>
					<Label>DNI</Label>
					<Input autoComplete={ "off" } className={ "border border-border" } inputMode={ "numeric" }
					       placeholder={ "22222222" }/>
					{ isDniInvalid ? <FieldError>Debe ser numerico.</FieldError> : null }
				</TextField>
			</div>

			<TextField
				fullWidth
				isInvalid={ isPasswordInvalid }
				isRequired={ !isEditMode }
				name={ "password" }
				value={ values.password }
				onChange={ ( value ) => updateValue( "password", value ) }
			>
				<Label>Contraseña</Label>
				<div className={ "relative" }>
					<Input
						autoComplete={ "new-password" }
						className={ "border border-border pr-11" }
						placeholder={ isEditMode ? "Dejar vacía para mantener la actual" : "Contraseña inicial" }
						type={ isPasswordVisible ? "text" : "password" }
					/>
					<Button
						aria-label={ isPasswordVisible ? "Ocultar contraseña" : "Mostrar contraseña" }
						className={ "absolute inset-y-1 right-1 z-10 size-8 min-w-8 text-muted" }
						isIconOnly
						size={ "sm" }
						type={ "button" }
						variant={ "ghost" }
						onPress={ () => setIsPasswordVisible((current) => !current) }
					>
						{ isPasswordVisible ? <EyeOff className={ "size-4" }/> : <Eye className={ "size-4" }/> }
					</Button>
				</div>
				{ isPasswordInvalid ? <FieldError>La contraseña debe tener al menos 6 caracteres.</FieldError> : null }
			</TextField>

			<div className={ "grid gap-4 sm:grid-cols-2" }>
				<Select
					autoComplete={ "off" }
					className={ "w-full" }
					fullWidth
					name={ "gender" }
					placeholder={ "Seleccione genero" }
					value={ values.gender }
					onChange={ ( value ) => updateValue( "gender", ( value ?? NO_GENDER ) as GenderFormValue ) }
				>
					<Label>Genero</Label>
					<Select.Trigger className={ "border border-border" }>
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
					autoComplete={ "off" }
					className={ "w-full" }
					granularity={ "day" }
					name={ "birthDate" }
					shouldForceLeadingZeros
					value={ birthDateValue }
					onChange={ ( value ) => updateValue( "birthDate", value ? value.toString() : "" ) }
				>
					<Label>Fecha de nacimiento</Label>
					<DateField.Group fullWidth className={ "border border-border" }>
						<DateField.Input>
							{ (segment) => (
								<DateField.Segment
									className={
										segment.type === "day" || segment.type === "month"
											? "min-w-[2ch] text-center"
											: segment.type === "year"
												? "min-w-[4ch] text-center"
												: undefined
									}
									segment={ segment }
								/>
							) }
						</DateField.Input>
						<DateField.Suffix>
							<DatePicker.Trigger type={ "button" }>
								<DatePicker.TriggerIndicator/>
							</DatePicker.Trigger>
						</DateField.Suffix>
					</DateField.Group>
					<DatePicker.Popover className={ "min-w-68 overflow-visible" }>
						<Calendar aria-label={ "Fecha de nacimiento" } className={ "w-68" }>
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
						<Label>Estudiante activo</Label>
					</Checkbox.Content>
				</Checkbox>
				<Description className={ "text-sm" }>
					Los estudiantes inactivos se conservan para el historial.
				</Description>
			</div>
		</section>
	);
}
