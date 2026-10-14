import type { Metadata } from "next";

import CoachStudentsPageContent from "@/features/role/coach/students/views/coach-students-page-content";

export const metadata: Metadata = {
	title: "Lista de estudiantes",
	description: "Lista de estudiantes",
};

type CoachStudentPageProps = {
	searchParams: Promise<{ nuevo?: string }>;
};

export default async function CoachStudentPage( { searchParams }: CoachStudentPageProps ) {
	const { nuevo } = await searchParams;

	// Desde Inicio, sin estudiantes, se llega con "?nuevo=1" para cargar el primero.
	return (
		<CoachStudentsPageContent initialCreate={ nuevo === "1" }/>
	);
}
