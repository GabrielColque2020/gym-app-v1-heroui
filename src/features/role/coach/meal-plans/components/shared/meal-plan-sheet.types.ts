import type { CoachMealPlan } from "@/features/meal-plans/types/meal-plans-types";

export type MealPlanSheetProps =
	| {
		hideTrigger?: boolean;
		isOpen?: boolean;
		mealPlan?: never;
		mode: "create";
		onOpenChange?: ( isOpen: boolean ) => void;
		placement?: "bottom" | "right";
		studentId: string;
		triggerClassName?: string;
		triggerVariant?: "button" | "icon";
	}
	| {
		hideTrigger?: boolean;
		isOpen?: boolean;
		mealPlan: CoachMealPlan;
		mode: "edit";
		onOpenChange?: ( isOpen: boolean ) => void;
		placement?: "bottom" | "right";
		studentId: string;
		triggerClassName?: string;
		triggerVariant?: "button" | "icon";
	};
