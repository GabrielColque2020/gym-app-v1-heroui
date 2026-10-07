import type { Metadata } from "next";

import { getAuthenticatedSession } from "@/features/auth/session";
import StudentMealPlansPageContent from "@/features/role/student/meal-plans/views/student-meal-plans-page-content";

export const metadata: Metadata = {
	title: "Plan alimenticio",
	description: "Plan alimenticio del estudiante",
};

export default async function StudentMealPlansPage() {
	const session = await getAuthenticatedSession();

	return <StudentMealPlansPageContent studentId={ session?.sub ?? null }/>;
}
