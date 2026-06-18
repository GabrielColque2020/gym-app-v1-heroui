import type { Metadata } from "next";
import TrainingRoutinesPageContent from "@/features/student/training/views/TrainingRoutinesPageContent";

export const metadata: Metadata = {
	title: "Rutina de Entrenamiento",
	description: "Detalles de la rutina de entrenamiento",
};

interface Props {
	searchParams: Promise<{
		year?: string;
		month?: string;
	}>,
}

export default function StudentTrainingRoutinePage() {
	return (
		<TrainingRoutinesPageContent/>
	)
}