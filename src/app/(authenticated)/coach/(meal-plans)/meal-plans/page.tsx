import type { Metadata } from "next";

import CoachMealPlansPageContent from "@/features/role/coach/meal-plans/views/coach-meal-plans-page-content";

export const metadata: Metadata = {
	title: "Planes alimenticios",
	description: "Planes alimenticios del estudiante",
};

type Props = {
	searchParams: Promise<{
		studentId?: string;
	}>;
};

export default async function CoachMealPlansPage( { searchParams }: Props ) {
	const resolvedSearchParams = await searchParams;
	const studentId = resolvedSearchParams.studentId?.trim() || null;

	return <CoachMealPlansPageContent studentId={ studentId }/>;
}
