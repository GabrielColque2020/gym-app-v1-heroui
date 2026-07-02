import type { Metadata } from "next";
import CoachExercisesPageContent from "@/features/role/coach/exercises/views/CoachExercisesPageContent";

export const metadata: Metadata = {
	title: "Lista de Ejercicios",
	description: "Lista de ejercicios disponibles",
};

export default function CoachExercises() {
	return (
		<CoachExercisesPageContent/>
	)
}
