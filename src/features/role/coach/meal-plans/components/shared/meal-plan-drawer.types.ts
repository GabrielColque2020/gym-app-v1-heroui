import type { MealPlan } from "@/features/meal-plans/types/meal-plans-types";

export type MealPlanDrawerProps =
	| {
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
