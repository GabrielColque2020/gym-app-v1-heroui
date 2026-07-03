import type { CoachMealPlan } from "@/features/meal-plans/types/meal-plans-types";

export type MealPlanDeleteSheetProps = {
	hideTrigger?: boolean;
	isOpen?: boolean;
	mealPlan: CoachMealPlan;
	onOpenChangeAction?: ( isOpen: boolean ) => void;
	studentId: string;
	triggerClassName?: string;
	triggerVariant?: "button" | "icon";
};
