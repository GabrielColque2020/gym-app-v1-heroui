import type { Metadata } from "next";

import AdminHistoryRoutinesStudentsPageContent from "@/features/admin/historyRoutinesStudents/views/AdminHistoryRoutinesStudentsPageContent";

export const metadata: Metadata = {
	title: "Historial de rutinas por estudiante",
	description: "Estudiantes activos para consultar historial mensual",
};

export default function AdminHistoryRoutinesStudentsPage() {
	return <AdminHistoryRoutinesStudentsPageContent/>;
}
