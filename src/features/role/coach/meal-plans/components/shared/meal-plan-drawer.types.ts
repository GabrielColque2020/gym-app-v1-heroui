import type { MealPlan } from "@/features/meal-plans/types/meal-plans-types";

export type MealPlanDrawerProps =
	| {
		// Comidas que el plan ya tiene, para proponer la que falta y avisar si se repite.
		existingMealTimes?: string[];
		hideTrigger?: boolean;
		isOpen?: boolean;
		mealPlan?: never;
		mode: "create";
		onOpenChangeAction?: ( isOpen: boolean ) => void;
		placement?: "bottom" | "right";
		studentId: string;
		triggerClassName?: string;
		triggerVariant?: "button" | "icon";
	}
	| {
		// Las otras comidas del plan, sin contar la que se esta editando.
		existingMealTimes?: string[];
		hideTrigger?: boolean;
		isOpen?: boolean;
		mealPlan: MealPlan;
		mode: "edit";
		onOpenChangeAction?: ( isOpen: boolean ) => void;
		placement?: "bottom" | "right";
		studentId: string;
		triggerClassName?: string;
		triggerVariant?: "button" | "icon";
	};
