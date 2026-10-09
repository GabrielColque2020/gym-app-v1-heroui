import type { ReactNode } from "react";
import { redirect } from "next/navigation";

import { AppShell } from "@/components/layout/app-shell";
import { SessionGuard } from "@/features/auth/components/session-guard";
import { getAuthenticatedSession } from "@/features/auth/session";

export default async function AppGroupLayout( { children }: { children: ReactNode } ) {
	const session = await getAuthenticatedSession();

	if (!session) {
		redirect( "/login" );
	}

	return (
		<AppShell userName={ session.name } userRole={ session.role }>
			<SessionGuard userId={ session.sub }/>
			<div className={ "flex max-w-550 flex-col gap-4 px-5 pb-10 pt-4" }>
				{ children }
			</div>
		</AppShell>
	);
}
