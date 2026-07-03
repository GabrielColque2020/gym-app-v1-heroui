"use client";

import type React from "react";

import { toast } from "@heroui/react";
import { useCallback, useEffect, useRef, useState } from "react";

import { useCreateMealPlan, useUpdateMealPlan } from "@/features/meal-plans/hooks/use-meal-plan-mutations";
import type { MealPlanFormValues, MealTimeValue } from "@/features/meal-plans/services/meal-plans-form";
import type { MealPlanSheetProps } from "@/features/role/coach/meal-plans/components/shared/meal-plan-sheet.types";
import { useResponsiveSheetPlacement } from "@/features/shared/hooks/use-responsive-sheet-placement";

const DEFAULT_VALUES: MealPlanFormValues = {
	description: "",
	title: "BREAKFAST",
};

function getDefaultValues(): MealPlanFormValues {
	return { ...DEFAULT_VALUES };
}

function getInitialValues( mealPlan?: Extract<MealPlanSheetProps, { mode: "edit" }>["mealPlan"] ): MealPlanFormValues {
	if (!mealPlan) return getDefaultValues();

	return {
		description: mealPlan.description,
		title: mealPlan.title as MealTimeValue,
	};
}

export function useMealPlanSheetState( props: MealPlanSheetProps ) {
	const [ internalIsOpen, setInternalIsOpen ] = useState( false );
	const [ values, setValues ] = useState<MealPlanFormValues>( () => getInitialValues( props.mealPlan ) );
	const createMealPlan = useCreateMealPlan();
	const updateMealPlan = useUpdateMealPlan();
	const wasOpenRef = useRef( false );
	const responsivePlacement = useResponsiveSheetPlacement();

	const isEditMode = props.mode === "edit";
	const activeMutation = isEditMode ? updateMealPlan : createMealPlan;
	const isDescriptionInvalid = values.description.trim().length > 0 && values.description.trim().length < 2;
	const isSubmitDisabled = values.description.trim().length < 2 || activeMutation.isPending;
	const title = isEditMode ? "Editar plan alimenticio" : "Nuevo plan alimenticio";
	const description = isEditMode
		? "Actualiza el tipo de comida y la descripcion del plan."
		: "Carga un nuevo plan alimenticio para el estudiante.";
	const submitLabel = isEditMode ? "Guardar cambios" : "Crear plan";
	const showEditTriggerLabel = props.triggerVariant === "button";
	const isOpen = props.isOpen ?? internalIsOpen;
	const setIsOpen = props.onOpenChange ?? setInternalIsOpen;
	const placement = props.placement ?? responsivePlacement;

	const resetFormState = useCallback( () => {
		setValues( getInitialValues( props.mealPlan ) );
		createMealPlan.reset();
		updateMealPlan.reset();
	}, [ createMealPlan, props.mealPlan, updateMealPlan ] );

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

	function updateValue<Key extends keyof MealPlanFormValues>( key: Key, value: MealPlanFormValues[ Key ] ) {
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
				await updateMealPlan.mutateAsync( {
					...values,
					id: props.mealPlan.id,
					studentId: props.studentId,
				} );
				toast.success( "Plan alimenticio actualizado", {
					description: "Los cambios se guardaron correctamente.",
				} );
			} else {
				await createMealPlan.mutateAsync( {
					...values,
					studentId: props.studentId,
				} );
				setValues( getDefaultValues() );
				toast.success( "Plan alimenticio creado", {
					description: "Se agrego al listado del estudiante.",
				} );
			}

			setIsOpen( false );
		} catch {
			toast.danger( isEditMode ? "Error al actualizar" : "Error al crear", {
				description: isEditMode
					? "No se pudieron guardar los cambios."
					: "No se pudo crear el plan alimenticio.",
			} );
		}
	}

	return {
		activeMutation,
		description,
		handleOpenChange,
		handleSubmit,
		isDescriptionInvalid,
		isEditMode,
		isOpen,
		isSubmitDisabled,
		openSheet,
		placement,
		showEditTriggerLabel,
		submitLabel,
		title,
		updateValue,
		values,
	};
}
