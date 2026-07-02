import type { ReactNode } from "react";
import { redirect } from "next/navigation";

import { getAuthenticatedSession } from "@/features/auth/session";

export default async function CoachLayout( { children }: { children: ReactNode } ) {
	const session = await getAuthenticatedSession();

	if (!session || session.role !== "COACH") {
		redirect( "/dashboard" );
	}

	return children;
}
