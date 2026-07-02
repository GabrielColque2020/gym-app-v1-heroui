"use client";

import React from "react";
import type { StudentListItem } from "@/features/students/actions/get-students";
import type { GenderFormValue, StudentFormValues } from "@/features/students/services/student-form";

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
	toast,
} from "@heroui/react";
import { CircleCheck, Pencil, Plus } from "@gravity-ui/icons";
import { useCallback, useEffect, useRef, useState } from "react";

import {
	useCreateStudent,
	useUpdateStudent,
} from "@/features/students/hooks/use-students";
import {
	GENDER_OPTIONS,
	NO_GENDER,
	formatDateInputValue,
	isValidEmail,
} from "@/features/students/services/student-form";
import { FeatureSheetLayout } from "@/features/shared/components/feature-sheet-layout";

type StudentFormSheetProps =
	| {
		hideTrigger?: boolean;
		isOpen?: boolean;
		mode: "create";
		onOpenChange?: ( isOpen: boolean ) => void;
		placement?: "bottom" | "right";
		student?: never;
		triggerClassName?: string;
		triggerVariant?: "button" | "icon";
	}
	| {
		hideTrigger?: boolean;
		isOpen?: boolean;
		mode: "edit";
		onOpenChange?: ( isOpen: boolean ) => void;
		placement?: "bottom" | "right";
		student: StudentListItem;
		triggerClassName?: string;
		triggerVariant?: "button" | "icon";
	};

const DEFAULT_VALUES: StudentFormValues = {
	active: true,
	birthDate: "",
	dni: "",
	email: "",
	gender: NO_GENDER,
	height: "0",
	name: "",
	objective: "",
	observations: "",
	password: "",
	weight: "0",
};

function getDefaultValues(): StudentFormValues {
	return { ...DEFAULT_VALUES };
}

function getInitialValues( student?: StudentListItem ): StudentFormValues {
	if (!student) return getDefaultValues();

	return {
		active: student.active,
		birthDate: formatDateInputValue( student.DescriptionStudent?.birthDate ),
		dni: String( student.dni ),
		email: student.email,
		gender: student.gender ?? NO_GENDER,
		height: String( student.DescriptionStudent?.height ?? 0 ),
		name: student.name,
		objective: student.DescriptionStudent?.objective ?? "",
		observations: student.DescriptionStudent?.observations ?? "",
		password: "",
		weight: String( student.DescriptionStudent?.weight ?? 0 ),
	};
}

function isNonNegativeNumberInput( value: string ) {
	if (value.trim().length === 0) return true;

	const normalizedValue = value.trim().replace( ",", "." );

	return Number.isFinite( Number( normalizedValue ) ) && Number( normalizedValue ) >= 0;
}

export function StudentSheet( props: StudentFormSheetProps ) {
	const [ internalIsOpen, setInternalIsOpen ] = useState( false );
	const [ values, setValues ] = useState<StudentFormValues>( () => getInitialValues( props.student ) );
	const createStudent = useCreateStudent();
	const updateStudent = useUpdateStudent();
	const wasOpenRef = useRef( false );

	const isEditMode = props.mode === "edit";
	const activeMutation = isEditMode ? updateStudent : createStudent;
	const isNameInvalid = values.name.trim().length > 0 && values.name.trim().length < 2;
	const isEmailInvalid = values.email.trim().length > 0 && !isValidEmail( values.email );
	const isDniInvalid = values.dni.trim().length > 0 && !/^\d+$/.test( values.dni.trim() );
	const isPasswordInvalid = !isEditMode && values.password.trim().length === 0;
	const isHeightInvalid = !isNonNegativeNumberInput( values.height );
	const isWeightInvalid = !isNonNegativeNumberInput( values.weight );
	const isSubmitDisabled = values.name.trim().length < 2
		|| !isValidEmail( values.email )
		|| !/^\d+$/.test( values.dni.trim() )
		|| Number( values.dni ) <= 0
		|| isPasswordInvalid
		|| isHeightInvalid
		|| isWeightInvalid
		|| activeMutation.isPending;
	const title = isEditMode ? "Editar estudiante" : "Nuevo estudiante";
	const description = isEditMode
		? "Actualiza el perfil, estado y objetivos del estudiante."
		: "Carga un estudiante disponible para seguimiento del coach.";
	const submitLabel = isEditMode ? "Guardar cambios" : "Crear estudiante";
	const showEditTriggerLabel = props.triggerVariant === "button";
	const isOpen = props.isOpen ?? internalIsOpen;
	const setIsOpen = props.onOpenChange ?? setInternalIsOpen;
	const placement = props.placement ?? "right";

	const resetFormState = useCallback( () => {
		setValues( getInitialValues( props.student ) );
		createStudent.reset();
		updateStudent.reset();
	}, [ createStudent, props.student, updateStudent ] );

	useEffect( () => {
		if (!isOpen) {
			wasOpenRef.current = false;

			return;
		}

		if (wasOpenRef.current) return;

		resetFormState();
		wasOpenRef.current = true;
	}, [ isOpen, resetFormState ] );

	function openSheet() {
		resetFormState();
		setIsOpen( true );
	}

	function handleOpenChange( nextIsOpen: boolean ) {
		if (!nextIsOpen) {
			resetFormState();
			wasOpenRef.current = false;
		}

		setIsOpen( nextIsOpen );
	}

	function updateValue<Key extends keyof StudentFormValues>( key: Key, value: StudentFormValues[ Key ] ) {
		setValues( ( currentValues ) => ( {
			...currentValues,
			[ key ]: value,
		} ) );
	}

	async function handleSubmit( event: React.SubmitEvent<HTMLFormElement> ) {
		event.preventDefault();

		if (isSubmitDisabled) return;

		try {
			if (isEditMode) {
				await updateStudent.mutateAsync( {
					...values,
					id: props.student.id,
				} );
				toast.success( "Estudiante actualizado", {
					description: "Los cambios se guardaron correctamente.",
				} );
			} else {
				await createStudent.mutateAsync( values );
				setValues( getDefaultValues() );
				toast.success( "Estudiante creado", {
					description: "Se agrego al listado.",
				} );
			}

			setIsOpen( false );
		} catch {
			toast.danger( isEditMode ? "Error al actualizar" : "Error al crear", {
				description: isEditMode
					? "No se pudieron guardar los cambios."
					: "No se pudo crear el estudiante.",
			} );
		}
	}

	return (
		<>
			{ props.hideTrigger ? null : (
				isEditMode ? (
					<Button
						isIconOnly={ !showEditTriggerLabel }
						aria-label={ `Editar ${ props.student.name }` }
						className={ props.triggerClassName }
						size={ "sm" }
						variant={ "ghost" }
						onPress={ openSheet }
					>
						<Pencil className={ "size-4 text-warning" }/>
						{ showEditTriggerLabel ? "Editar" : null }
					</Button>
				) : (
					<Button className={ props.triggerClassName } onPress={ openSheet }>
						<Plus className={ "size-4" }/>
						Nuevo estudiante
					</Button>
				)
			) }
			<FeatureSheetLayout isOpen={ isOpen } placement={ placement } onOpenChange={ handleOpenChange }>
				<Sheet.Header className={ "border-default-100 relative border-b pb-4" }>
					<div className={ "flex gap-3 " }>
						<div className={ "flex size-10 shrink-0 items-center justify-center rounded-xl border border-accent-soft bg-accent-soft/60 text-accent" }>
							{ isEditMode ? <Pencil className={ "size-5" }/> : <Plus className={ "size-5" }/> }
						</div>
						<div>
							<Sheet.Heading>{ title }</Sheet.Heading>
							<Description className={ "mt-1 text-sm" }>{ description }</Description>
						</div>
					</div>
				</Sheet.Header>

				<form className={ "flex min-h-0 flex-1 flex-col" } onSubmit={ handleSubmit }>
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
