import type { Metadata } from "next";

import AdminStudentsPageContent from "@/features/admin/user/student/views/AdminStudentsPageContent";

export const metadata: Metadata = {
	title: "Lista de estudiantes",
	description: "Lista de estudiantes",
};

export default function AdminStudentPage() {
	return (
		<AdminStudentsPageContent/>
	);
}
