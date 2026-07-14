import type { getMealPlansByStudentAction } from "@/features/meal-plans/actions/get-meal-plans-by-student";

export type MealPlansByStudent = Awaited<ReturnType<typeof getMealPlansByStudentAction>>;
export type MealPlan = MealPlansByStudent["mealPlans"][number];
