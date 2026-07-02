import type { Metadata } from "next";

import CoachTrainingRoutinesStudentsPageContent from "@/features/role/coach/training-routines-students/views/CoachTrainingRoutinesStudentsPageContent";

export const metadata: Metadata = {
	title: "Rutinas por estudiante",
	description: "Rutinas por estudiante",
};

export default function CoachTrainingRoutinesStudentsPage() {
	return (
		<CoachTrainingRoutinesStudentsPageContent/>
	);
}
