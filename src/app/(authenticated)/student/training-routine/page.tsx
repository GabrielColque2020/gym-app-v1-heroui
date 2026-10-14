import type { Metadata } from "next";

import TrainingRoutinesPageContent from "@/features/role/student/training-routine/views/training-routines-page-content";
import { getAppCurrentMonth, getAppCurrentYear } from "@/lib/app-date";

export const metadata: Metadata = {
	title: "Rutina de Entrenamiento",
	description: "Detalles de la rutina de entrenamiento",
};

interface Props {
	searchParams: Promise<{
		year?: string;
		month?: string;
	}>;
}

// El mes de hoy en Argentina: el servidor corre en UTC.
const getCurrentMonth = getAppCurrentMonth;
const getCurrentYear = getAppCurrentYear;

export default async function StudentTrainingRoutinePage( { searchParams }: Props ) {
	const resolvedSearchParams = await searchParams;
	const parsedMonth = Number( resolvedSearchParams.month );
	const parsedYear = Number( resolvedSearchParams.year );
	const initialMonth = Number.isInteger( parsedMonth ) && parsedMonth >= 1 && parsedMonth <= 12
		? parsedMonth
		: getCurrentMonth();
	const initialYear = Number.isInteger( parsedYear ) && parsedYear >= 2000 && parsedYear <= 2100
		? parsedYear
		: getCurrentYear();

	return (
		<TrainingRoutinesPageContent
			initialMonth={ initialMonth }
			initialYear={ initialYear }
		/>
	);
}
