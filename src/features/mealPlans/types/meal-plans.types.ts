import type { MealPlansByStudent as CoachMealPlansByStudent } from "@/features/mealPlans/services/meal-plans-query";
import type { StudentMealPlansByStudent } from "@/features/role/student/meal-plans/services/meal-plans-query";

export type MealPlansByStudent = CoachMealPlansByStudent;
export type CoachMealPlan = MealPlansByStudent["mealPlans"][number];
export type StudentMealPlan = StudentMealPlansByStudent["mealPlans"][number];
