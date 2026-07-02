"use server";

import { getMealPlansByStudentAction as getMealPlansByStudentBase } from "@/features/meal-plans/actions/get-meal-plans-by-student";

type GetMealPlansByStudentInput = {
	studentId: string;
};

export async function getMealPlansByStudentAction( { studentId }: GetMealPlansByStudentInput ) {
	return getMealPlansByStudentBase( { studentId } );
}
