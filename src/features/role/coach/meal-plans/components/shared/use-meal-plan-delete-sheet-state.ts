"use client";

import { toast } from "@heroui/react";
import { useCallback, useEffect, useRef, useState } from "react";

import { useDeleteMealPlan } from "@/features/meal-plans/hooks/use-meal-plan-mutations";
import type { MealPlanDeleteSheetProps } from "@/features/role/coach/meal-plans/components/shared/meal-plan-delete-sheet.types";

export function useMealPlanDeleteSheetState( {
	isOpen: externalIsOpen,
	mealPlan,
	onOpenChange,
	triggerVariant,
	studentId,
}: Pick<MealPlanDeleteSheetProps, "isOpen" | "mealPlan" | "onOpenChange" | "studentId" | "triggerVariant"> ) {
	const [ internalIsOpen, setInternalIsOpen ] = useState( false );
	const deleteMealPlan = useDeleteMealPlan();
	const wasOpenRef = useRef( false );

	const isOpen = externalIsOpen ?? internalIsOpen;
	const setIsOpen = onOpenChange ?? setInternalIsOpen;
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

	function openSheet() {
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
		openSheet,
		setIsOpen,
		showTriggerLabel,
	};
}
