import type { Metadata } from "next";
import AdminExercisesPageContent from "@/features/role/admin/exercises/views/AdminExercisesPageContent";

export const metadata: Metadata = {
	title: "Lista de Ejercicios",
	description: "Lista de ejercicios disponibles",
};

export default function AdminExercises() {
	return (
		<AdminExercisesPageContent/>
	)
}
