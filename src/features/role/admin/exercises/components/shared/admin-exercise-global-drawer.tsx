"use client";

import { type FormEvent, useCallback, useEffect, useRef, useState } from "react";

import { Alert, Button, Description, Drawer, Spinner, toast } from "@heroui/react";
import { CheckCircle2, PencilLine } from "lucide-react";

import { FeatureDrawerLayout } from "@/features/shared/components/feature-drawer-layout";
import { ExerciseDrawerTrigger } from "@/features/role/coach/exercises/components/shared/exercise-drawer-trigger";
import type { AdminExerciseGlobalListItem } from "@/features/role/admin/exercises/types/admin-exercise-global-list-item";
import {
	type AdminExerciseGlobalFormValues,
	createAdminExerciseGlobalDefaultValues,
	mapExerciseGlobalToFormValues,
} from "@/features/role/admin/exercises/services/admin-exercise-global-form";
import { useUpdateAdminExerciseGlobal } from "@/features/role/admin/exercises/hooks/use-admin-exercise-globals";

import { AdminExerciseGlobalDrawerFields } from "./admin-exercise-global-drawer-fields";
import { useResponsiveDrawerPlacement } from "@/features/shared/hooks/use-responsive-drawer-placement";

type AdminExerciseGlobalDrawerProps = {
	exercise: AdminExerciseGlobalListItem;
	hideTrigger?: boolean;
	isOpen?: boolean;
	onOpenChangeAction?: ( isOpen: boolean ) => void;
	triggerClassName?: string;
};

function getInitialValues( exercise?: AdminExerciseGlobalListItem ): AdminExerciseGlobalFormValues {
	if (!exercise) {
		return createAdminExerciseGlobalDefaultValues();
	}

	return mapExerciseGlobalToFormValues( exercise );
}

export function AdminExerciseGlobalDrawer( {
											   exercise,
											   hideTrigger = false,
											   isOpen: controlledIsOpen,
											   onOpenChangeAction,
											   triggerClassName,
										   }: AdminExerciseGlobalDrawerProps ) {
	const [ internalIsOpen, setInternalIsOpen ] = useState( false );
	const [ values, setValues ] = useState<AdminExerciseGlobalFormValues>( () => getInitialValues( exercise ) );
	const updateAdminExerciseGlobal = useUpdateAdminExerciseGlobal();
	const wasOpenRef = useRef( false );
	const placement = useResponsiveDrawerPlacement();

	const isOpen = controlledIsOpen ?? internalIsOpen;
	const setIsOpen = onOpenChangeAction ?? setInternalIsOpen;
	const isNameInvalid = values.name.trim().length > 0 && values.name.trim().length < 2;
	const isCategoryInvalid = values.category.trim().length > 0 && values.category.trim().length < 2;
	const isTargetInvalid = values.target.trim().length > 0 && values.target.trim().length < 2;
	const isMuscleGroupInvalid = values.muscleGroup.trim().length > 0 && values.muscleGroup.trim().length < 2;
	const isEquipmentInvalid = values.equipment.trim().length > 0 && values.equipment.trim().length < 2;
	const isSubmitDisabled =
		values.name.trim().length < 2 ||
		values.category.trim().length < 2 ||
		values.target.trim().length < 2 ||
		values.muscleGroup.trim().length < 2 ||
		values.equipment.trim().length < 2 ||
		updateAdminExerciseGlobal.isPending;

	const resetFormState = useCallback( () => {
		setValues( getInitialValues( exercise ) );
		updateAdminExerciseGlobal.reset();
	}, [ exercise, updateAdminExerciseGlobal ] );

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

	function updateValue<Key extends keyof AdminExerciseGlobalFormValues>( key: Key, value: AdminExerciseGlobalFormValues[ Key ] ) {
		setValues( ( currentValues ) => {
			const nextValues = {
				...currentValues,
				[ key ]: value,
			} as AdminExerciseGlobalFormValues;

			return nextValues;
		} );
	}

	async function handleSubmit( event: FormEvent<HTMLFormElement> ) {
		event.preventDefault();

		if (isSubmitDisabled) return;

		try {
			await updateAdminExerciseGlobal.mutateAsync( {
				active: values.active,
				category: values.category,
				equipment: values.equipment,
				id: exercise.id,
				imageUrl: values.imageUrl,
				instructions: values.instructions,
				muscleGroup: values.muscleGroup,
				name: values.name,
				target: values.target,
				videoUrl: values.videoUrl,
			} );

			toast.success( "Ejercicio global actualizado", {
				description: "Los cambios se guardaron correctamente.",
			} );
			setIsOpen( false );
		} catch {
			toast.danger( "Error al actualizar", {
				description: "No se pudieron guardar los cambios del catalogo global.",
			} );
		}
	}

	return (
		<>
			{ hideTrigger ? null : (
				<ExerciseDrawerTrigger
					ariaLabel={ `Editar ${ exercise.name }` }
					className={ triggerClassName }
					isEditMode={ true }
					showEditTriggerLabel={ false }
					onPress={ openDrawer }
				/>
			) }
			<FeatureDrawerLayout
				isOpen={ isOpen }
				placement={ placement }
				onOpenChangeAction={ handleOpenChange }
				rightContentClassName={ "w-[42rem]" }
			>
				<Drawer.Header className={ "border-default-100 relative border-b pb-4" }>
					<div className={ "flex gap-3 " }>
						<div className={ "flex size-10 shrink-0 items-center justify-center rounded-xl border border-accent-soft bg-accent-soft/60 text-accent" }>
							<PencilLine className={ "size-5" }/>
						</div>
						<div>
							<Drawer.Heading>Editar ejercicio global</Drawer.Heading>
							<Description className={ "mt-1 text-sm" }>
								Los cambios impactan a todos los coaches porque este ejercicio pertenece al catalogo global.
							</Description>
						</div>
					</div>
				</Drawer.Header>

				<form className={ "flex min-h-0 flex-1 flex-col" } onSubmit={ handleSubmit }>
					{ updateAdminExerciseGlobal.isError ? (
						<div className={ "px-6 pt-5" }>
							<Alert className={ "border border-danger/20" } status={ "danger" }>
								<Alert.Content>
									<Alert.Title>Error al guardar</Alert.Title>
									<Alert.Description>{ updateAdminExerciseGlobal.error.message }</Alert.Description>
								</Alert.Content>
							</Alert>
						</div>
					) : null }

					<AdminExerciseGlobalDrawerFields
						isCategoryInvalid={ isCategoryInvalid }
						isEquipmentInvalid={ isEquipmentInvalid }
						isMuscleGroupInvalid={ isMuscleGroupInvalid }
						isNameInvalid={ isNameInvalid }
						isTargetInvalid={ isTargetInvalid }
						updateValue={ updateValue }
						values={ values }
					/>

					<Drawer.Footer className={ "border-default-100 shrink-0 justify-end gap-2 border-t pt-4" }>
						<Button slot={ "close" } isDisabled={ updateAdminExerciseGlobal.isPending } variant={ "secondary" }>
							Cancelar
						</Button>
						<Button isDisabled={ isSubmitDisabled } isPending={ updateAdminExerciseGlobal.isPending } type={ "submit" }>
							{ ( { isPending } ) => (
								<>
									{ isPending ? <Spinner color={ "current" } size={ "sm" }/> : <CheckCircle2 className={ "size-4" }/> }
									{ isPending ? "Actualizando..." : "Guardar cambios" }
								</>
							) }
						</Button>
					</Drawer.Footer>
				</form>
			</FeatureDrawerLayout>
		</>
	);
}
