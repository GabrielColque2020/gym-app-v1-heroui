"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";

import type { BodyPartValue, ExerciseFormValues } from "@/features/exercises/services/exercise-form";
import type { Exercises } from "@/features/exercises/services/exercises-query";
import type { ExerciseListItem } from "@/features/exercises/types/exercise-list-item";

import { Alert, Button, Description, Drawer, Spinner, toast } from "@heroui/react";

import { useCreateExercise, useUpdateExercise } from "@/features/exercises/hooks/use-exercises";
import { FeatureDrawerLayout } from "@/features/shared/components/feature-drawer-layout";

import { ExerciseDrawerFields } from "./exercise-drawer-fields";
import { ExerciseDrawerTrigger } from "./exercise-drawer-trigger";
import { CheckCircle2, PencilLine, Plus } from "lucide-react";

type ExerciseFormDrawerProps =
	| {
	exercise?: never;
	hideTrigger?: boolean;
	isOpen?: boolean;
	mode: "create";
	onSuccess?: ( exercise: Exercises[ number ] ) => void;
	onOpenChangeAction?: ( isOpen: boolean ) => void;
	placement?: "bottom" | "right";
	triggerClassName?: string;
	triggerVariant?: "button" | "icon";
}
	| {
	exercise: ExerciseListItem;
	hideTrigger?: boolean;
	isOpen?: boolean;
	mode: "edit";
	onSuccess?: ( exercise: Exercises[ number ] ) => void;
	onOpenChangeAction?: ( isOpen: boolean ) => void;
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

function getDefaultValues(): ExerciseFormValues {
	return { ...DEFAULT_VALUES };
}

function getInitialValues( exercise?: ExerciseListItem ): ExerciseFormValues {
	if (!exercise) return getDefaultValues();

	return {
		active: exercise.active,
		bodyPart: exercise.bodyPart as BodyPartValue,
		name: exercise.name,
		tips: exercise.tips ?? "",
	};
}

export function ExerciseDrawer( props: ExerciseFormDrawerProps ) {
	const [ internalIsOpen, setInternalIsOpen ] = useState( false );
	const [ values, setValues ] = useState<ExerciseFormValues>( () => getInitialValues( props.exercise ) );
	const createExercise = useCreateExercise();
	const updateExercise = useUpdateExercise();
	const wasOpenRef = useRef( false );

	const isEditMode = props.mode === "edit";
	const activeMutation = isEditMode ? updateExercise : createExercise;
	const isNameInvalid = values.name.trim().length > 0 && values.name.trim().length < 2;
	const isSubmitDisabled = values.name.trim().length < 2 || activeMutation.isPending;
	const submitLabel = isEditMode ? "Guardar cambios" : "Crear ejercicio";
	const showEditTriggerLabel = props.triggerVariant === "button";
	const isOpen = props.isOpen ?? internalIsOpen;
	const setIsOpen = props.onOpenChangeAction ?? setInternalIsOpen;
	const placement = props.placement ?? "right";

	const title = isEditMode ? "Editar ejercicio" : "Nuevo ejercicio";
	const description = isEditMode
		? "Actualiza los datos del ejercicio y su estado dentro del catalogo."
		: "Carga un ejercicio disponible para rutinas y seguimiento de alumnos.";

	const resetFormState = useCallback( () => {
		setValues( getInitialValues( props.exercise ) );
		createExercise.reset();
		updateExercise.reset();
	}, [ createExercise, props.exercise, updateExercise ] );

	useEffect( () => {
		if (!isOpen) {
			wasOpenRef.current = false;

			return;
		}

		if (wasOpenRef.current) return;

		resetFormState();
		wasOpenRef.current = true;
	}, [ isOpen, resetFormState ] );

	function openDrawer() {
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
				const updatedExercise = await updateExercise.mutateAsync( {
					...values,
					id: props.exercise.id,
				} );
				toast.success( "Ejercicio actualizado", {
					description: "Los cambios se guardaron correctamente.",
				} );
				props.onSuccess?.( updatedExercise );
			} else {
				const createdExercise = await createExercise.mutateAsync( values );
				setValues( getDefaultValues() );
				toast.success( "Ejercicio creado", {
					description: "Se agrego al catalogo.",
				} );
				props.onSuccess?.( createdExercise );
			}

			setIsOpen( false );
		} catch {
			toast.danger( isEditMode ? "Error al actualizar" : "Error al crear", {
				description: isEditMode ? "No se pudieron guardar los cambios." : "No se pudo crear el ejercicio.",
			} );
		}
	}

	return (
		<>
			{ props.hideTrigger ? null : (
				<ExerciseDrawerTrigger
					ariaLabel={ isEditMode ? `Editar ${ props.exercise.name }` : "Nuevo ejercicio" }
					className={ props.triggerClassName }
					isEditMode={ isEditMode }
					showEditTriggerLabel={ showEditTriggerLabel }
					onPress={ openDrawer }
				/>
			) }
			<FeatureDrawerLayout isOpen={ isOpen } placement={ placement } onOpenChangeAction={ handleOpenChange }>
				<Drawer.Header className={ "border-default-100 relative border-b pb-4" }>
					<div className={ "flex gap-3 " }>
						<div className={ "flex size-10 shrink-0 items-center justify-center rounded-xl border border-accent-soft bg-accent-soft/60 text-accent" }>
							{ isEditMode ? <PencilLine className={ "size-5" }/> : <Plus className={ "size-5" }/> }
						</div>
						<div>
							<Drawer.Heading>{ title }</Drawer.Heading>
							<Description className={ "mt-1 text-sm" }>{ description }</Description>
						</div>
					</div>
				</Drawer.Header>

				<form className={ "flex min-h-0 flex-1 flex-col" } onSubmit={ handleSubmit }>
					{ activeMutation.isError ? (
						<div className={ "px-6 pt-5" }>
							<Alert className={ "border border-danger/20" } status={ "danger" }>
								<Alert.Content>
									<Alert.Title>Error al guardar</Alert.Title>
									<Alert.Description>{ activeMutation.error.message }</Alert.Description>
								</Alert.Content>
							</Alert>
						</div>
					) : null }

					<ExerciseDrawerFields
						isNameInvalid={ isNameInvalid }
						updateValue={ updateValue }
						values={ values }
					/>

					<Drawer.Footer className={ "border-default-100 shrink-0 justify-end gap-2 border-t pt-4" }>
						<Button slot={ "close" } isDisabled={ activeMutation.isPending } variant={ "secondary" }>
							Cancelar
						</Button>
						<Button isDisabled={ isSubmitDisabled } isPending={ activeMutation.isPending } type={ "submit" }>
							{ ( { isPending } ) => (
								<>
									{ isPending ? <Spinner color={ "current" } size={ "sm" }/> : <CheckCircle2 className={ "size-4" }/> }
									{ isPending ? ( isEditMode ? "Actualizando..." : "Guardando..." ) : submitLabel }
								</>
							) }
						</Button>
					</Drawer.Footer>
				</form>
			</FeatureDrawerLayout>
		</>
	);
}
