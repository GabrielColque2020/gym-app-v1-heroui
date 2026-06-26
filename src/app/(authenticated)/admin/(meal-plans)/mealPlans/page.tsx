import type { Metadata } from "next";

import AdminMealPlansPageContent from "@/features/role/admin/meal-plans/views/AdminMealPlansPageContent";

export const metadata: Metadata = {
	title: "Planes alimenticios",
	description: "Planes alimenticios del estudiante",
};

type Props = {
	searchParams: Promise<{
		studentId?: string;
	}>;
};

export default async function AdminMealPlansPage( { searchParams }: Props ) {
	const resolvedSearchParams = await searchParams;
	const studentId = resolvedSearchParams.studentId?.trim() || null;

	return <AdminMealPlansPageContent studentId={ studentId }/>;
}
