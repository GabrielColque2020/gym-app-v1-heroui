"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";

import { Alert, Button, Description, Drawer, Spinner, toast } from "@heroui/react";
import { CheckCircle2, PencilLine, Plus } from "lucide-react";

import { FeatureDrawerLayout } from "@/features/shared/components/feature-drawer-layout";
import type { ExerciseListItem } from "@/features/exercises/types/exercise-list-item";
import type { CoachExerciseListItem } from "@/features/role/coach/exercises/types/coach-exercise-list-item";
import { formatBodyPart } from "@/features/exercises/services/exercise-formatters";
import { type CoachExerciseFormValues, createCoachExerciseDefaultValues, mapCategoryToBodyPart, } from "@/features/role/coach/exercises/services/coach-exercise-form";
import { useSaveCoachExercise } from "@/features/role/coach/exercises/hooks/use-coach-exercises";

import { ExerciseDrawerFields } from "./exercise-drawer-fields";
import { ExerciseDrawerTrigger } from "./exercise-drawer-trigger";

type ExerciseFormDrawerProps =
	| {
	exercise?: never;
	hideTrigger?: boolean;
	isOpen?: boolean;
	mode: "create";
	onSuccessAction?: ( exercise: ExerciseListItem ) => void;
	onOpenChangeAction?: ( isOpen: boolean ) => void;
	placement?: "bottom" | "right";
	triggerClassName?: string;
	triggerVariant?: "button" | "icon";
}
	| {
	exercise: CoachExerciseListItem;
	hideTrigger?: boolean;
	isOpen?: boolean;
	mode: "edit";
	onSuccessAction?: ( exercise: ExerciseListItem ) => void;
	onOpenChangeAction?: ( isOpen: boolean ) => void;
	placement?: "bottom" | "right";
	triggerClassName?: string;
	triggerVariant?: "button" | "icon";
};

function getInitialValues( exercise?: CoachExerciseListItem ): CoachExerciseFormValues {
	if (!exercise) {
		return createCoachExerciseDefaultValues();
	}

	return {
		active: exercise.active,
		bodyPart: exercise.bodyPart,
		category: exercise.category?.trim() || formatBodyPart( exercise.bodyPart ),
		equipment: exercise.equipment,
		imageUrl: exercise.imageUrl ?? "",
		instructions: exercise.instructions ?? "",
		muscleGroup: exercise.muscleGroup,
		name: exercise.name,
		target: exercise.target,
		videoUrl: exercise.videoUrl ?? "",
	};
}

function mapCoachExerciseToRoutineExercise( exercise: CoachExerciseListItem ): ExerciseListItem {
	return {
		active: exercise.active,
		bodyPart: exercise.bodyPart,
		createdAt: exercise.createdAt,
		id: exercise.id,
		imageUrl: exercise.imageUrl,
		name: exercise.name,
		tips: exercise.tips,
		videoUrl: exercise.videoUrl,
	};
}

export function ExerciseDrawer( props: ExerciseFormDrawerProps ) {
	const [ internalIsOpen, setInternalIsOpen ] = useState( false );
	const [ values, setValues ] = useState<CoachExerciseFormValues>( () => getInitialValues( props.exercise ) );
	const saveCoachExercise = useSaveCoachExercise();
	const wasOpenRef = useRef( false );

	const isEditMode = props.mode === "edit";
	const currentExercise = isEditMode ? props.exercise : null;
	const activeMutation = saveCoachExercise;
	const isNameInvalid = values.name.trim().length > 0 && values.name.trim().length < 2;
	const isCategoryInvalid = values.category.trim().length > 0 && values.category.trim().length < 2;
	const isSubmitDisabled = values.name.trim().length < 2 || values.category.trim().length < 2 || activeMutation.isPending;
	const submitLabel = isEditMode ? "Guardar cambios" : "Crear ejercicio";
	const showEditTriggerLabel = props.triggerVariant === "button";
	const isOpen = props.isOpen ?? internalIsOpen;
	const setIsOpen = props.onOpenChangeAction ?? setInternalIsOpen;
	const placement = props.placement ?? "right";
	const canShowGlobalMediaPreview =
		isEditMode
		&& (
			currentExercise?.sourceType === "global"
			|| currentExercise?.isOverride
			|| Boolean( currentExercise?.globalExerciseId )
		);

	const title = isEditMode
		? ( currentExercise?.sourceType === "global" ? "Editar global" : "Editar ejercicio" )
		: "Nuevo ejercicio";
	const description = isEditMode
		? currentExercise?.sourceType === "global"
			? "Se guardara una version privada para tu catalogo sin modificar el ejercicio global."
			: "Actualiza los datos del ejercicio dentro de tu catalogo propio."
		: "Carga un ejercicio propio o una version local de un ejercicio global.";

	const resetFormState = useCallback( () => {
		setValues( getInitialValues( currentExercise ?? undefined ) );
		saveCoachExercise.reset();
	}, [ currentExercise, saveCoachExercise ] );

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

	function updateValue<Key extends keyof CoachExerciseFormValues>( key: Key, value: CoachExerciseFormValues[ Key ] ) {
		setValues( ( currentValues ) => {
			const nextValues = {
				...currentValues,
				[ key ]: value,
			} as CoachExerciseFormValues;

			if (key === "category") {
				nextValues.bodyPart = mapCategoryToBodyPart( value as string );
			} else if (key === "bodyPart") {
				nextValues.category = formatBodyPart( value as CoachExerciseFormValues["bodyPart"] );
			}

			return nextValues;
		} );
	}

	async function handleSubmit( event: React.SubmitEvent<HTMLFormElement> ) {
		event.preventDefault();

		if (isSubmitDisabled) return;

		try {
			const savedExercise = await saveCoachExercise.mutateAsync( {
				active: values.active,
				bodyPart: values.bodyPart,
				category: values.category,
				coachExerciseId: isEditMode && currentExercise?.sourceType === "coach" ? currentExercise.coachExerciseId : null,
				equipment: values.equipment,
				globalExerciseId: isEditMode && currentExercise?.globalExerciseId ? currentExercise.globalExerciseId : null,
				imageUrl: values.imageUrl,
				instructions: values.instructions,
				muscleGroup: values.muscleGroup,
				name: values.name,
				sourceType: isEditMode && currentExercise ? currentExercise.sourceType : "coach",
				target: values.target,
				videoUrl: values.videoUrl,
				externalId: currentExercise?.externalId ?? null,
			} );

			props.onSuccessAction?.( mapCoachExerciseToRoutineExercise( savedExercise as CoachExerciseListItem ) );

			toast.success( isEditMode ? "Ejercicio actualizado" : "Ejercicio creado", {
				description: isEditMode
					? "Los cambios se guardaron correctamente en tu catalogo."
					: "Se agrego al catalogo personal.",
			} );
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
					ariaLabel={ isEditMode && currentExercise ? `Editar ${ currentExercise.name }` : "Nuevo ejercicio" }
					className={ props.triggerClassName }
					isEditMode={ isEditMode }
					showEditTriggerLabel={ showEditTriggerLabel }
					onPress={ openDrawer }
				/>
			) }
			<FeatureDrawerLayout isOpen={ isOpen } placement={ placement } onOpenChangeAction={ handleOpenChange } rightContentClassName={ "w-[42rem]" }>
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
						isCategoryInvalid={ isCategoryInvalid }
						isNameInvalid={ isNameInvalid }
						mediaImageUrl={ canShowGlobalMediaPreview ? values.imageUrl : null }
						mediaVideoUrl={ canShowGlobalMediaPreview ? values.videoUrl : null }
						showMediaPreview={ canShowGlobalMediaPreview }
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
