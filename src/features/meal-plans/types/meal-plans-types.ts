import type { ActionData } from "@/lib/action-result";
import type { getMealPlansByStudentAction } from "@/features/meal-plans/actions/get-meal-plans-by-student";

export type MealPlansByStudent = ActionData<typeof getMealPlansByStudentAction>;
export type MealPlan = MealPlansByStudent["mealPlans"][number];
