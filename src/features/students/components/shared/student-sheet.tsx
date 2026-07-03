"use client";

import React from "react";
import type { GenderFormValue } from "@/features/students/services/student-form";

import { Sheet } from "@heroui-pro/react";
import {
	Alert,
	Button,
	Checkbox,
	Description,
	FieldError,
	Input,
	Label,
	ListBox,
	Select,
	Spinner,
	TextArea,
	TextField,
} from "@heroui/react";
import { CircleCheck } from "@gravity-ui/icons";
import {
	GENDER_OPTIONS,
	NO_GENDER,
} from "@/features/students/services/student-form";
import { StudentSheetHeader } from "@/features/students/components/shared/student-sheet-header";
import { StudentSheetTrigger } from "@/features/students/components/shared/student-sheet-trigger";
import type { StudentFormSheetProps } from "@/features/students/components/shared/student-sheet.types";
import { useStudentSheetState } from "@/features/students/components/shared/use-student-sheet-state";
import { FeatureSheetLayout } from "@/features/shared/components/feature-sheet-layout";

export function StudentSheet( props: StudentFormSheetProps ) {
	const {
		activeMutation,
		description,
		handleOpenChange,
		handleSubmit,
		isDniInvalid,
		isEditMode,
		isEmailInvalid,
		isHeightInvalid,
		isNameInvalid,
		isOpen,
		isPasswordInvalid,
		isSubmitDisabled,
		isWeightInvalid,
		openSheet,
		placement,
		showEditTriggerLabel,
		submitLabel,
		title,
		updateValue,
		values,
	} = useStudentSheetState( props );

	async function handleFormSubmit( event: React.SubmitEvent<HTMLFormElement> ) {
		event.preventDefault();
		await handleSubmit();
	}

	return (
		<>
			<StudentSheetTrigger
				isEditMode={ isEditMode }
				props={ props }
				showEditTriggerLabel={ showEditTriggerLabel }
				onPress={ openSheet }
			/>
			<FeatureSheetLayout isOpen={ isOpen } placement={ placement } onOpenChange={ handleOpenChange }>
				<StudentSheetHeader
					description={ description }
					isEditMode={ isEditMode }
					title={ title }
				/>

				<form className={ "flex min-h-0 flex-1 flex-col" } onSubmit={ handleFormSubmit }>
					<Sheet.Body className={ "min-h-0 flex-1 space-y-6 overflow-y-auto px-6 py-5" }>
						{ activeMutation.isError && (
							<Alert className={ "border border-danger/20" } status={ "danger" }>
								<Alert.Content>
									<Alert.Title>Error al guardar</Alert.Title>
									<Alert.Description>{ activeMutation.error.message }</Alert.Description>
								</Alert.Content>
							</Alert>
						) }

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

								<TextField fullWidth name={ "birthDate" } value={ values.birthDate } onChange={ ( value ) => updateValue( "birthDate", value ) }>
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

						<section className={ "space-y-4 border-t border-border pt-5" }>
							<div>
								<h3 className={ "text-sm font-semibold text-foreground" }>Detalles y Objetivos</h3>
								<p className={ "text-sm text-muted" }>Medidas, objetivo y observaciones internas.</p>
							</div>

							<div className={ "grid gap-4 sm:grid-cols-2" }>
								<TextField
									fullWidth
									isInvalid={ isHeightInvalid }
									name={ "height" }
									value={ values.height }
									onChange={ ( value ) => updateValue( "height", value ) }
								>
									<Label>Altura</Label>
									<Input inputMode={ "decimal" } placeholder={ "175" }/>
									{ isHeightInvalid ? <FieldError>Debe ser mayor o igual a 0.</FieldError> : null }
								</TextField>

								<TextField
									fullWidth
									isInvalid={ isWeightInvalid }
									name={ "weight" }
									value={ values.weight }
									onChange={ ( value ) => updateValue( "weight", value ) }
								>
									<Label>Peso</Label>
									<Input inputMode={ "decimal" } placeholder={ "72" }/>
									{ isWeightInvalid ? <FieldError>Debe ser mayor o igual a 0.</FieldError> : null }
								</TextField>
							</div>

							<TextField fullWidth name={ "objective" } value={ values.objective } onChange={ ( value ) => updateValue( "objective", value ) }>
								<Label>Objetivo</Label>
								<Input placeholder={ "Ej: Ganar masa muscular" }/>
							</TextField>

							<TextField fullWidth name={ "observations" } value={ values.observations } onChange={ ( value ) => updateValue( "observations", value ) }>
								<Label>Observaciones</Label>
								<TextArea className={ "min-h-28" } placeholder={ "Notas de seguimiento o consideraciones." }/>
							</TextField>
						</section>
					</Sheet.Body>

					<Sheet.Footer className={ "border-default-100 bg-background flex shrink-0 justify-end gap-2 border-t px-6 py-4" }>
						<Sheet.Close>
							<Button isDisabled={ activeMutation.isPending } variant={ "secondary" }>
								Cancelar
							</Button>
						</Sheet.Close>
						<Button isDisabled={ isSubmitDisabled } isPending={ activeMutation.isPending } type={ "submit" }>
							{ ( { isPending } ) => (
								<>
									{ isPending ? <Spinner color={ "current" } size={ "sm" }/> : <CircleCheck className={ "size-4" }/> }
									{ isPending ? ( isEditMode ? "Actualizando..." : "Guardando..." ) : submitLabel }
								</>
							) }
						</Button>
					</Sheet.Footer>
				</form>
			</FeatureSheetLayout>
		</>
	);
}
