import type { Metadata } from "next";

import AdminExercisesPageContent from "@/features/role/admin/exercises/views/admin-exercises-page-content";

export const metadata: Metadata = {
	description: "Gestion del catalogo global de ejercicios.",
	title: "Ejercicios Globales",
};

export default function AdminExercisesPage() {
	return <AdminExercisesPageContent/>;
}

