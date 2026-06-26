import type { Metadata } from "next";

import AdminMealPlansStudentsPageContent from "@/features/role/admin/meal-plans-students/views/AdminMealPlansStudentsPageContent";

export const metadata: Metadata = {
	title: "Planes alimenticios por estudiante",
	description: "Estudiantes con planes alimenticios",
};

export default function AdminMealPlansStudentsPage() {
	return <AdminMealPlansStudentsPageContent/>;
}
