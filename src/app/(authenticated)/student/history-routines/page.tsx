import type { Metadata } from "next";

import { getAuthenticatedSession } from "@/features/auth/session";
import StudentHistoryRoutinesPageContent from "@/features/role/student/history-routines/views/student-history-routines-page-content";

export const metadata: Metadata = {
	title: "Historial de rutina",
	description: "Historial de rutinas del estudiante autenticado",
};

export default async function StudentHistoryRoutinesPage() {
	const session = await getAuthenticatedSession();

	return <StudentHistoryRoutinesPageContent studentId={ session?.sub ?? null }/>;
}
