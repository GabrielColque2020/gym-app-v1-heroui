"use client";

import type { ReactNode } from "react";

import { Sidebar } from "@heroui-pro/react";
import { usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";

import type { Role } from "@/generated/prisma/client";
import { DashboardNavbar } from "./dashboard-navbar";
import { DashboardSidebar } from "./dashboard-sidebar";

export interface AppShellProps {
	children: ReactNode;
	userName: string;
	userRole: Role;
	/**
	 * Prefix used for navigation and active-state matching.
	 * Empty in the standalone template; `/templates/dashboard` when embedded in the frontend preview.
	 */
	basePath?: string;
}

export function AppShell( { basePath = "", children, userName, userRole }: AppShellProps ) {
	const router = useRouter();
	const pathname = usePathname();

	// Primitive dep (basePath) + stable `router` ref → stable callback.
	const navigate = useCallback( ( href: string ) => router.push( basePath + href ), [ router, basePath ] );

	return (
		<Sidebar.Provider
			variant={ "floating" }
			collapsible={ "icon" }
			navigate={ navigate }
		>
			<DashboardSidebar pathname={ pathname } basePath={ basePath } userName={ userName } userRole={ userRole }/>
			<Sidebar.Main>
				<DashboardNavbar/>
				{ children }
			</Sidebar.Main>
		</Sidebar.Provider>
	);
}
