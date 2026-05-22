import type { Metadata } from "next";
import AdminTrainingRoutinesPageContent from "../../../../features/admin/taining/views/AdminTrainingRoutinesPageContent";

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
		<div className={ "flex max-w-550 flex-col gap-4 px-5 pb-10 pt-4" }>
			<AdminTrainingRoutinesPageContent/>
		</div>
	)
}