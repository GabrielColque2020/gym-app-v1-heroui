import type { Metadata } from "next";

import AdminMealPlansStudentsPageContent from "@/features/admin/mealPlansStudents/views/AdminMealPlansStudentsPageContent";

export const metadata: Metadata = {
	title: "Planes alimenticios por estudiante",
	description: "Estudiantes con planes alimenticios",
};

export default function AdminMealPlansStudentsPage() {
	return <AdminMealPlansStudentsPageContent/>;
}
