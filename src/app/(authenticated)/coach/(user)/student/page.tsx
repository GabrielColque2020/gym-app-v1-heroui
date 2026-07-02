import type { Metadata } from "next";

import CoachStudentsPageContent from "@/features/role/coach/students/views/CoachStudentsPageContent";

export const metadata: Metadata = {
	title: "Lista de estudiantes",
	description: "Lista de estudiantes",
};

export default function CoachStudentPage() {
	return (
		<CoachStudentsPageContent/>
	);
}
