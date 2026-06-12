import type { Metadata } from "next";

import AdminStudentsPageContent from "@/features/admin/user/student/views/AdminStudentsPageContent";

export const metadata: Metadata = {
	title: "Lista de estudiantes",
	description: "Lista de estudiantes",
};

export default function AdminStudentPage() {
	return (
		<div className={ "flex max-w-550 flex-col gap-4 px-5 pb-10 pt-4" }>
			<AdminStudentsPageContent/>
		</div>
	);
}
