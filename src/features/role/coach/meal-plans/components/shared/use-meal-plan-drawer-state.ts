"use client";

import type React from "react";

import { toast } from "@heroui/react";
import { useCallback, useEffect, useRef, useState } from "react";

import { useCreateMealPlan, useUpdateMealPlan } from "@/features/meal-plans/hooks/use-meal-plan-mutations";
import { formatMealTime, MEAL_TIME_OPTIONS, type MealPlanFormValues, type MealTimeValue } from "@/features/meal-plans/services/meal-plans-form";
import type { MealPlanDrawerProps } from "@/features/role/coach/meal-plans/components/shared/meal-plan-drawer.types";
import { useResponsiveDrawerPlacement } from "@/features/shared/hooks/use-responsive-drawer-placement";

const NO_MEAL_TIMES: string[] = [];

// Una comida nueva arranca en la primera que al plan le falta: cargando el dia
// completo, el entrenador no tiene que cambiar "Desayuno" a mano cada vez.
function getDefaultValues( existingMealTimes: string[] ): MealPlanFormValues {
	const nextMealTime = MEAL_TIME_OPTIONS.find( ( option ) => !existingMealTimes.includes( option.value ) );

	return {
		description: "",
		observations: "",
		title: nextMealTime?.value ?? "BREAKFAST",
	};
}

function getInitialValues(
	mealPlan: Extract<MealPlanDrawerProps, { mode: "edit" }>["mealPlan"] | undefined,
	existingMealTimes: string[],
): MealPlanFormValues {
	if (!mealPlan) return getDefaultValues( existingMealTimes );

	return {
		description: mealPlan.description,
		observations: mealPlan.observations ?? "",
		title: mealPlan.title as MealTimeValue,
	};
}

export function useMealPlanDrawerState( props: MealPlanDrawerProps ) {
	const [ internalIsOpen, setInternalIsOpen ] = useState( false );
	const existingMealTimes = props.existingMealTimes ?? NO_MEAL_TIMES;
	const [ values, setValues ] = useState<MealPlanFormValues>( () => getInitialValues( props.mealPlan, existingMealTimes ) );
	const createMealPlan = useCreateMealPlan();
	const updateMealPlan = useUpdateMealPlan();
	const wasOpenRef = useRef( false );
	const responsivePlacement = useResponsiveDrawerPlacement();

	const isEditMode = props.mode === "edit";
	const activeMutation = isEditMode ? updateMealPlan : createMealPlan;
	const isDescriptionInvalid = values.description.trim().length > 0 && values.description.trim().length < 2;
	const isSubmitDisabled = values.description.trim().length < 2 || activeMutation.isPending;
	const title = isEditMode ? "Editar comida" : "Agregar comida";
	const description = isEditMode
		? "Cambiá qué comida es o lo que incluye."
		: "Sumá una comida al plan del estudiante.";
	const submitLabel = isEditMode ? "Guardar cambios" : "Agregar";
	const showEditTriggerLabel = props.triggerVariant === "button";
	const isOpen = props.isOpen ?? internalIsOpen;
	const setIsOpen = props.onOpenChangeAction ?? setInternalIsOpen;
	const placement = props.placement ?? responsivePlacement;
	// Repetir una comida no se bloquea (puede haber dos colaciones), pero se avisa:
	// lo comun es querer editar la que ya esta.
	const duplicateNotice = existingMealTimes.includes( values.title )
		? `El plan ya tiene ${ formatMealTime( values.title ) }. Podés agregar otra igual, o cerrar y editar la que ya está.`
		: null;

	const resetFormState = useCallback( () => {
		setValues( getInitialValues( props.mealPlan, existingMealTimes ) );
		createMealPlan.reset();
		updateMealPlan.reset();
	}, [ createMealPlan, existingMealTimes, props.mealPlan, updateMealPlan ] );

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
				toast.success( "Comida actualizada", {
					description: "El estudiante ya ve el cambio en su plan.",
				} );
			} else {
				await createMealPlan.mutateAsync( {
					...values,
					studentId: props.studentId,
				} );
				toast.success( "Comida agregada", {
					description: "Ya está en el plan del estudiante.",
				} );
			}

			setIsOpen( false );
		} catch {
			toast.danger( isEditMode ? "No se pudo guardar" : "No se pudo agregar", {
				description: isEditMode
					? "Los cambios de la comida no se guardaron. Probá de nuevo."
					: "La comida no se agregó. Probá de nuevo.",
			} );
		}
	}

	return {
		activeMutation,
		description,
		duplicateNotice,
		handleOpenChange,
		handleSubmit,
		isDescriptionInvalid,
		isEditMode,
		isOpen,
		isSubmitDisabled,
		openDrawer,
		placement,
		showEditTriggerLabel,
		submitLabel,
		title,
		updateValue,
		values,
	};
}
