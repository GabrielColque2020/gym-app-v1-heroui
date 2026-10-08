import type { Metadata } from "next";

import StudentExerciseProgressPageContent from "@/features/role/student/exercise-progress/views/student-exercise-progress-page-content";

export const metadata: Metadata = {
	title: "Progreso",
	description: "Cómo te fue en cada ejercicio a lo largo del tiempo",
};

type Props = {
	searchParams: Promise<{ exerciseId?: string }>;
};

export default async function StudentExerciseProgressPage( { searchParams }: Props ) {
	const { exerciseId } = await searchParams;

	return <StudentExerciseProgressPageContent exerciseId={ exerciseId?.trim() || null }/>;
}
