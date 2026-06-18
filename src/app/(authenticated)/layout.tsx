import type { ReactNode } from "react";

import { AppShell } from "@/components/layout/app-shell";

export default function AppGroupLayout( { children }: { children: ReactNode } ) {
	return <AppShell>
		<div className={ "flex max-w-550 flex-col gap-4 px-5 pb-10 pt-4" }>
			{ children }
		</div>
	</AppShell>;
}
