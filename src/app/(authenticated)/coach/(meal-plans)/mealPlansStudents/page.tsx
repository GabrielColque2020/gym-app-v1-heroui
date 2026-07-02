import type { Metadata } from "next";

import CoachMealPlansStudentsPageContent from "@/features/role/coach/meal-plans-students/views/CoachMealPlansStudentsPageContent";

export const metadata: Metadata = {
	title: "Planes alimenticios por estudiante",
	description: "Estudiantes con planes alimenticios",
};

export default function CoachMealPlansStudentsPage() {
	return <CoachMealPlansStudentsPageContent/>;
}
