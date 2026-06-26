import type { Metadata } from "next";

import AdminTrainingRoutinesStudentsPageContent from "@/features/role/admin/training-routines-students/views/AdminTrainingRoutinesStudentsPageContent";

export const metadata: Metadata = {
	title: "Rutinas por estudiante",
	description: "Rutinas por estudiante",
};

export default function AdminTrainingRoutinesStudentsPage() {
	return (
		<AdminTrainingRoutinesStudentsPageContent/>
	);
}
