import type { Metadata } from "next";

import CoachHistoryRoutinesStudentsPageContent from "@/features/role/coach/history-routines-students/views/coach-history-routines-students-page-content";

export const metadata: Metadata = {
	title: "Historial de rutinas por estudiante",
	description: "Estudiantes activos para consultar historial mensual",
};

export default function CoachHistoryRoutinesStudentsPage() {
	return <CoachHistoryRoutinesStudentsPageContent/>;
}
