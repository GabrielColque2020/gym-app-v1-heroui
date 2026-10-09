"use client";

import { Navbar, Sidebar } from "@heroui-pro/react";

import { UserMenu } from "@/components/layout/user-menu";
import type { Role } from "@/generated/prisma/client";

type DashboardNavbarProps = {
	userName: string;
	userRole: Role;
};

export function DashboardNavbar( { userName, userRole }: DashboardNavbarProps ) {
	return (
		<Navbar maxWidth={ "full" } position={ "static" } className={ "bg-transparent border-b border-border" }>
			<Navbar.Header>
				<Sidebar.Trigger/>
				<Navbar.Spacer/>
				<UserMenu userName={ userName } userRole={ userRole }/>
			</Navbar.Header>
		</Navbar>
	);
}
