import type { Metadata } from "next";

import CoachTrainingRoutinesPageContent from "@/features/role/coach/training-routine/views/coach-training-routines-page-content";

export const metadata: Metadata = {
	title: "Rutina de Entrenamiento",
	description: "Detalles de la rutina de entrenamiento",
};

type Props = {
	searchParams: Promise<{
		month?: string;
		studentId?: string;
		year?: string;
	}>,
};

function parseMonth( value: string | undefined, fallback: number ) {
	const parsedValue = Number( value );

	return Number.isInteger( parsedValue ) && parsedValue >= 1 && parsedValue <= 12
		? parsedValue
		: fallback;
}

function parseYear( value: string | undefined, fallback: number ) {
	const parsedValue = Number( value );

	return Number.isInteger( parsedValue ) && parsedValue >= 2000 && parsedValue <= 2100
		? parsedValue
		: fallback;
}

export default async function CoachTrainingRoutinePage( { searchParams }: Props ) {
	const resolvedSearchParams = await searchParams;
	const currentDate = new Date();
	const month = parseMonth( resolvedSearchParams.month, currentDate.getMonth() + 1 );
	const year = parseYear( resolvedSearchParams.year, currentDate.getFullYear() );
	const studentId = resolvedSearchParams.studentId?.trim() || null;

	return (
		<CoachTrainingRoutinesPageContent month={ month } studentId={ studentId } year={ year }/>
	);
}
