import type { Metadata } from "next";

import AdminHistoryRoutinesPageContent from "@/features/admin/historyRoutines/views/AdminHistoryRoutinesPageContent";

type Props = {
	searchParams: Promise<{
		studentId?: string;
	}>;
};

export const metadata: Metadata = {
	title: "Historial de rutinas",
	description: "Historial de rutinas mensual del estudiante",
};

export default async function AdminHistoryRoutinesPage( { searchParams }: Props ) {
	const resolvedSearchParams = await searchParams;
	const studentId = resolvedSearchParams.studentId?.trim() || null;

	return <AdminHistoryRoutinesPageContent studentId={ studentId }/>;
}
