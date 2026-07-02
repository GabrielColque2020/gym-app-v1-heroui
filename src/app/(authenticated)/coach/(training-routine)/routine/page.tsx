import type { Metadata } from "next";

import EditRoutineDayPageContent from "@/features/role/coach/routine/views/EditRoutineDayPageContent";

export const metadata: Metadata = {
	title: "Editar Rutina",
	description: "Editor del dia de entrenamiento",
};

type Props = {
	searchParams: Promise<{
		month?: string;
		routineDayId?: string;
		studentId?: string;
		year?: string;
	}>,
};

function parseMonth( value: string | undefined ) {
	const parsedValue = Number( value );

	return Number.isInteger( parsedValue ) && parsedValue >= 1 && parsedValue <= 12
		? parsedValue
		: null;
}

function parseYear( value: string | undefined ) {
	const parsedValue = Number( value );

	return Number.isInteger( parsedValue ) && parsedValue >= 2000 && parsedValue <= 2100
		? parsedValue
		: null;
}

export default async function CoachEditRoutinePage( { searchParams }: Props ) {
	const resolvedSearchParams = await searchParams;
	const month = parseMonth( resolvedSearchParams.month );
	const routineDayId = resolvedSearchParams.routineDayId?.trim() || null;
	const studentId = resolvedSearchParams.studentId?.trim() || null;
	const year = parseYear( resolvedSearchParams.year );

	return (
		<EditRoutineDayPageContent
			month={ month }
			routineDayId={ routineDayId }
			studentId={ studentId }
			year={ year }
		/>
	);
}
