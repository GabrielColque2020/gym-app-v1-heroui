import type { Metadata } from "next";

import CoachHistoryRoutinesPageContent from "@/features/role/coach/history-routines/views/CoachHistoryRoutinesPageContent";

type Props = {
	searchParams: Promise<{
		studentId?: string;
	}>;
};

export const metadata: Metadata = {
	title: "Historial de rutinas",
	description: "Historial de rutinas mensual del estudiante",
};

export default async function CoachHistoryRoutinesPage( { searchParams }: Props ) {
	const resolvedSearchParams = await searchParams;
	const studentId = resolvedSearchParams.studentId?.trim() || null;

	return <CoachHistoryRoutinesPageContent studentId={ studentId }/>;
}
