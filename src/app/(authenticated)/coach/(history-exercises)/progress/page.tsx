import type { Metadata } from "next";

import CoachExerciseProgressPageContent from "@/features/role/coach/exercise-progress/views/coach-exercise-progress-page-content";

export const metadata: Metadata = {
	title: "Progreso del estudiante",
	description: "Cómo le fue al estudiante en cada ejercicio a lo largo del tiempo",
};

type Props = {
	searchParams: Promise<{ exerciseId?: string; studentId?: string }>;
};

export default async function CoachExerciseProgressPage( { searchParams }: Props ) {
	const { exerciseId, studentId } = await searchParams;

	return (
		<CoachExerciseProgressPageContent
			exerciseId={ exerciseId?.trim() || null }
			studentId={ studentId?.trim() || null }
		/>
	);
}
