import { redirect } from "next/navigation";

import { DashboardPageContent } from "@/features/dashboard/views/DashboardPageContent";
import { getAuthenticatedSession } from "@/features/auth/session";
import StudentDashboardPageContent from "@/features/role/student/dashboard/views/StudentDashboardPageContent";

export default async function DashboardPage() {
	const session = await getAuthenticatedSession();

	if (session?.role === "COACH") {
		redirect( "/coach/dashboard" );
	}

	if (session?.role === "STUDENT") {
		return <StudentDashboardPageContent/>;
	}

	return <DashboardPageContent/>;
}
