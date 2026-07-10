"use client";

import { toast } from "@heroui/react";
import { useCallback, useEffect, useRef, useState } from "react";

import { useDeleteMealPlan } from "@/features/meal-plans/hooks/use-meal-plan-mutations";
import type { MealPlanDeleteDrawerProps } from "@/features/role/coach/meal-plans/components/shared/meal-plan-delete-drawer.types";

export function useMealPlanDeleteDrawerState( {
	isOpen: externalIsOpen,
	mealPlan,
	onOpenChangeAction,
	triggerVariant,
	studentId,
}: Pick<MealPlanDeleteDrawerProps, "isOpen" | "mealPlan" | "onOpenChangeAction" | "studentId" | "triggerVariant"> ) {
	const [ internalIsOpen, setInternalIsOpen ] = useState( false );
	const deleteMealPlan = useDeleteMealPlan();
	const wasOpenRef = useRef( false );

	const isOpen = externalIsOpen ?? internalIsOpen;
	const setIsOpen = onOpenChangeAction ?? setInternalIsOpen;
	const showTriggerLabel = triggerVariant === "button";

	const resetState = useCallback( () => {
		deleteMealPlan.reset();
	}, [ deleteMealPlan ] );

	useEffect( () => {
		if (!isOpen) {
			wasOpenRef.current = false;
			return;
		}

		if (wasOpenRef.current) return;

		resetState();
		wasOpenRef.current = true;
	}, [ isOpen, resetState ] );

	function openDrawer() {
		resetState();
		setIsOpen( true );
	}

	function handleOpenChange( nextIsOpen: boolean ) {
		if (!nextIsOpen) {
			resetState();
			wasOpenRef.current = false;
		}

		setIsOpen( nextIsOpen );
	}

	async function handleDelete() {
		try {
			await deleteMealPlan.mutateAsync( {
				id: mealPlan.id,
				studentId,
			} );
			toast.success( "Plan alimenticio eliminado", {
				description: "El plan se elimino correctamente.",
			} );
			setIsOpen( false );
		} catch {
			toast.danger( "Error al eliminar plan", {
				description: "No se pudo eliminar el plan alimenticio.",
			} );
		}
	}

	return {
		deleteMealPlan,
		handleDelete,
		handleOpenChange,
		isOpen,
		openDrawer,
		setIsOpen,
		showTriggerLabel,
	};
}
