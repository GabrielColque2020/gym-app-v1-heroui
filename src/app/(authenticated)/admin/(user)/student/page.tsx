import type { Metadata } from "next";

import AdminStudentsPageContent from "@/features/role/admin/students/views/AdminStudentsPageContent";

export const metadata: Metadata = {
	title: "Lista de estudiantes",
	description: "Lista de estudiantes",
};

export default function AdminStudentPage() {
	return (
		<AdminStudentsPageContent/>
	);
}
