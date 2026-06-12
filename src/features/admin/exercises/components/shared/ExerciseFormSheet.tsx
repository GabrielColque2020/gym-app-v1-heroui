"use client";

import React from "react";
import type { ExerciseListItem } from "@/features/admin/exercises/actions/get-exercises";
import type { BodyPartValue, ExerciseFormValues } from "@/features/admin/exercises/services/exercise-form";

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
	Select, Spinner,
	toast,
	TextArea,
	TextField,
} from "@heroui/react";
import { CircleCheck, Pencil, Plus } from "@gravity-ui/icons";
import { useEffect, useRef, useState } from "react";

import { useCreateExercise, useUpdateExercise } from "@/features/admin/exercises/hooks/useExercises";
import { BODY_PART_OPTIONS } from "@/features/admin/exercises/services/exercise-form";

type ExerciseFormSheetProps =
	| {
	exercise?: never;
	hideTrigger?: boolean;
	isOpen?: boolean;
	mode: "create";
	onOpenChange?: ( isOpen: boolean ) => void;
	placement?: "bottom" | "right";
	triggerClassName?: string;
	triggerVariant?: "button" | "icon";
}
	| {
	exercise: ExerciseListItem;
	hideTrigger?: boolean;
	isOpen?: boolean;
	mode: "edit";
	onOpenChange?: ( isOpen: boolean ) => void;
	placement?: "bottom" | "right";
	triggerClassName?: string;
	triggerVariant?: "button" | "icon";
};

const DEFAULT_VALUES: ExerciseFormValues = {
	active: true,
	bodyPart: "CHEST",
	name: "",
	tips: "",
};

function getInitialValues( exercise?: ExerciseListItem ): ExerciseFormValues {
	if (!exercise) return DEFAULT_VALUES;

	return {
		active: exercise.active,
		bodyPart: exercise.bodyPart as BodyPartValue,
		name: exercise.name,
		tips: exercise.tips ?? ""
	};
}

export function ExerciseFormSheet( props: ExerciseFormSheetProps ) {
	const [ internalIsOpen, setInternalIsOpen ] = useState( false );
	const [ values, setValues ] = useState<ExerciseFormValues>( () => getInitialValues( props.exercise ) );
	const createExercise = useCreateExercise();
	const updateExercise = useUpdateExercise();
	const wasOpenRef = useRef( false );

	const isEditMode = props.mode === "edit";
	const activeMutation = isEditMode ? updateExercise : createExercise;
	const isNameInvalid = values.name.trim().length > 0 && values.name.trim().length < 2;
	const isSubmitDisabled = values.name.trim().length < 2 || activeMutation.isPending;
	const title = isEditMode ? "Editar ejercicio" : "Nuevo ejercicio";
	const description = isEditMode
		? "Actualiza los datos del ejercicio y su estado dentro del catalogo."
		: "Carga un ejercicio disponible para rutinas y seguimiento de alumnos.";
	const submitLabel = isEditMode ? "Guardar cambios" : "Crear ejercicio";
	const showEditTriggerLabel = props.triggerVariant === "button";
	const isOpen = props.isOpen ?? internalIsOpen;
	const setIsOpen = props.onOpenChange ?? setInternalIsOpen;
	const placement = props.placement ?? "right";

	useEffect( () => {
		if (!isOpen) {
			wasOpenRef.current = false;

			return;
		}

		if (wasOpenRef.current) return;

		setValues( getInitialValues( props.exercise ) );
		createExercise.reset();
		updateExercise.reset();
		wasOpenRef.current = true;
	}, [ createExercise, isOpen, props.exercise, updateExercise ] );

	function openSheet() {
		setValues( getInitialValues( props.exercise ) );
		createExercise.reset();
		updateExercise.reset();
		setIsOpen( true );
	}

	function updateValue<Key extends keyof ExerciseFormValues>( key: Key, value: ExerciseFormValues[ Key ] ) {
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
				await updateExercise.mutateAsync( {
					...values,
					id: props.exercise.id,
				} );
				toast.success( "Ejercicio actualizado", {
					description: "Los cambios se guardaron correctamente.",
				} );
			} else {
				await createExercise.mutateAsync( values );
				setValues( DEFAULT_VALUES );
				toast.success( "Ejercicio creado", {
					description: "Se agrego al catalogo.",
				} );
			}

			setIsOpen( false );
		} catch {
			toast.danger( isEditMode ? "Error al actualizar" : "Error al crear", {
				description: isEditMode
					? "No se pudieron guardar los cambios."
					: "No se pudo crear el ejercicio.",
			} );
		}
	}

	return (
		<>
			{ props.hideTrigger ? null : (
				isEditMode ? (
					<Button
						isIconOnly={ !showEditTriggerLabel }
						aria-label={ `Editar ${ props.exercise.name }` }
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
						Nuevo ejercicio
					</Button>
				)
			) }
			<Sheet isDetached isOpen={ isOpen } placement={ placement } onOpenChange={ setIsOpen }>
				<Sheet.Backdrop variant={ "opaque" }>
					<Sheet.Content className={ placement === "right" ? "w-105" : "mx-auto max-w-105" }>
						<Sheet.Dialog className={ placement === "right" ? "h-full" : undefined }>
							{ placement === "bottom" ? <Sheet.Handle/> : null }
							<Sheet.CloseTrigger/>
							<Sheet.Header className={ "border-default-100 relative border-b pb-4" }>
								<div className={ "flex gap-3 " }>
									<div
										className={ "flex size-10 shrink-0 items-center justify-center rounded-xl border border-accent-soft bg-accent-soft/60 text-accent" }>
										{ isEditMode ? <Pencil className={ "size-5" }/> : <Plus className={ "size-5" }/> }
									</div>
									<div>
										<Sheet.Heading>{ title }</Sheet.Heading>
										<Description className={ "mt-1 text-sm" }>{ description }</Description>
									</div>
								</div>
							</Sheet.Header>

							<form className={ "flex min-h-0 flex-1 flex-col" } onSubmit={ handleSubmit }>
								<Sheet.Body className={ "min-h-0 flex-1 space-y-4 overflow-y-auto px-6 py-5" }>
									{ activeMutation.isError && (
										<Alert className={ "border border-danger/20" } status={ "danger" }>
											<Alert.Content>
												<Alert.Title>Error al guardar</Alert.Title>
												<Alert.Description>{ activeMutation.error.message }</Alert.Description>
											</Alert.Content>
										</Alert>
									) }

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
										{ isNameInvalid ?
											<FieldError>Debe tener al menos 2 caracteres.</FieldError> : null }
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
													<ListBox.Item key={ option.value } id={ option.value }
													              textValue={ option.label }>
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
										<TextArea className={ "min-h-28" }
										          placeholder={ "Indicaciones tecnicas, errores comunes o recomendaciones." }/>
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
												Los ejercicios inactivos quedan ocultos para nuevas rutinas, pero se
												conservan en el historial.
											</Description>
										</Checkbox.Content>
									</Checkbox>
								</Sheet.Body>

								<Sheet.Footer
									className={ "border-default-100 bg-background flex shrink-0 justify-end gap-2 border-t px-6 py-4" }>
									<Sheet.Close>
										<Button isDisabled={ activeMutation.isPending } variant={ "secondary" }>
											Cancelar
										</Button>
									</Sheet.Close>
									<Button isDisabled={ isSubmitDisabled } isPending={ activeMutation.isPending }
									        type={ "submit" }>
										{ ( { isPending } ) => (
											<>

												{ isPending ? <Spinner color={ "current" } size={ "sm" }/> :
													<CircleCheck className={ "size-4" }/> }
												{ isPending ? ( isEditMode ? "Actualizando..." : "Guardando..." ) : submitLabel }
											</>
										) }
									</Button>
								</Sheet.Footer>
							</form>
						</Sheet.Dialog>
					</Sheet.Content>
				</Sheet.Backdrop>
			</Sheet>
		</>
	);
}
