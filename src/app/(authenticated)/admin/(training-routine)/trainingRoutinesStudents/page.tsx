import type { Metadata } from "next";

import AdminTrainingRoutinesStudentsPageContent from "@/features/admin/trainingRoutinesStudents/views/AdminTrainingRoutinesStudentsPageContent";

export const metadata: Metadata = {
	title: "Rutinas por estudiante",
	description: "Rutinas por estudiante",
};

export default function AdminTrainingRoutinesStudentsPage() {
	return (
		<div className={ "flex max-w-550 flex-col gap-4 px-5 pb-10 pt-4" }>
			<AdminTrainingRoutinesStudentsPageContent/>
		</div>
	);
}
