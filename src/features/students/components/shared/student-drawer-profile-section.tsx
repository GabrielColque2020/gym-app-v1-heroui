"use client";

import type { StudentFormValues } from "@/features/students/services/student-form";
import { BirthDatePicker } from "@/features/students/components/shared/birth-date-picker";
import { GenderSelect } from "@/features/students/components/shared/gender-select";

import { useState } from "react";

import {
	Button,
	Checkbox,
	Description,
	FieldError,
	Input,
	Label,
	TextField,
} from "@heroui/react";
import { Eye, EyeOff } from "lucide-react";

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

	return (
		<section className={ "space-y-4" }>
			<div>
				<h3 className={ "text-sm font-semibold text-foreground" }>Perfil de Estudiante</h3>
				<p className={ "text-sm text-muted" }>Datos de acceso e identificación.</p>
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
					{ isEmailInvalid ? <FieldError>Ingresa un email válido.</FieldError> : null }
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
					{ isDniInvalid ? <FieldError>Debe ser numérico.</FieldError> : null }
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
						placeholder={ isEditMode ? "Dejar vacía para conservar la actual" : "Contraseña inicial" }
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
				<GenderSelect
					value={ values.gender }
					onChange={ ( value ) => updateValue( "gender", value ) }
				/>

				<BirthDatePicker
					value={ values.birthDate }
					onChange={ ( value ) => updateValue( "birthDate", value ) }
				/>
			</div>

			{ /* Solo al crear. Al editar, desactivar tiene su propia seccion al final,
			     con confirmacion: una casilla lo hacia sin avisar, al guardar. */ }
			{ isEditMode ? null : (
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
			) }
		</section>
	);
}
