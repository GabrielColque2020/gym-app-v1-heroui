import type { MealPlan } from "@/features/meal-plans/types/meal-plans-types";

export type MealPlanDeleteDrawerProps = {
	hideTrigger?: boolean;
	isOpen?: boolean;
	mealPlan: MealPlan;
	onOpenChangeAction?: ( isOpen: boolean ) => void;
	studentId: string;
	triggerClassName?: string;
	triggerVariant?: "button" | "icon";
};
