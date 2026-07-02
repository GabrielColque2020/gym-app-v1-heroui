import type { Metadata } from "next";

import CoachTrainingRoutinesStudentsPageContent from "@/features/role/coach/training-routines-students/views/coach-training-routines-students-page-content";

export const metadata: Metadata = {
	title: "Rutinas por estudiante",
	description: "Rutinas por estudiante",
};

export default function CoachTrainingRoutinesStudentsPage() {
	return (
		<CoachTrainingRoutinesStudentsPageContent/>
	);
}
