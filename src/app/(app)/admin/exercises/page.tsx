import type { Metadata } from "next";
import AdminExercisesPageContent from "@/features/admin/exercises/views/AdminExercisesPageContent";

export const metadata: Metadata = {
	title: "Lista de Ejercicios",
	description: "Lista de ejercicios disponibles",
};

export default function AdminExercises() {
	return (
		<div className={ "flex max-w-550 flex-col gap-4 px-5 pb-10 pt-4" }>
			<AdminExercisesPageContent/>
		</div>
	)
}