import { redirect } from "next/navigation";

import { getAuthenticatedSession } from "@/features/auth/session";

export default async function HomePage() {
	const session = await getAuthenticatedSession();

	if (session?.role === "ADMIN") {
		redirect( "/admin/dashboard" );
	}

	if (session?.role === "COACH") {
		redirect( "/coach/dashboard" );
	}

	if (session?.role === "STUDENT") {
		redirect( "/student/dashboard" );
	}

	redirect( "/login" );
}
