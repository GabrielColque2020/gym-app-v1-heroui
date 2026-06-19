import type { Metadata } from "next";
import RoutinePageContent from "@/features/student/routine/views/RoutinePageContent";

export const metadata: Metadata = {
	title: "Rutina de Ejercicio",
	description: "Detalles de la rutina de ejercicio",
};

export default function RoutinePage() {
	return (
		<RoutinePageContent/>
	)
}