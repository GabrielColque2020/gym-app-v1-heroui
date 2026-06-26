import type { MealPlansByStudent as AdminMealPlansByStudent } from "@/features/mealPlans/services/meal-plans-query";
import type { StudentMealPlansByStudent } from "@/features/role/student/meal-plans/services/meal-plans-query";

export type MealPlansByStudent = AdminMealPlansByStudent;
export type AdminMealPlan = MealPlansByStudent["mealPlans"][number];
export type StudentMealPlan = StudentMealPlansByStudent["mealPlans"][number];
