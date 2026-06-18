import type { Metadata } from "next";

import AdminTrainingRoutinesStudentsPageContent from "@/features/admin/trainingRoutinesStudents/views/AdminTrainingRoutinesStudentsPageContent";

export const metadata: Metadata = {
	title: "Rutinas por estudiante",
	description: "Rutinas por estudiante",
};

export default function AdminTrainingRoutinesStudentsPage() {
	return (
		<AdminTrainingRoutinesStudentsPageContent/>
	);
}
