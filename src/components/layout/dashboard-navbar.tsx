"use client";

import { Bell } from "@gravity-ui/icons";
import { Navbar, Sidebar } from "@heroui-pro/react";

import { IconButton } from "../ui/icon-button";


export function DashboardNavbar() {
	return (
		<Navbar maxWidth={ "full" } position={ "static" } className={ "bg-transparent border-b border-border" }>
			<Navbar.Header>
				<Sidebar.Trigger/>
				<Navbar.Spacer/>
				<div className={ "flex items-center gap-2" }>
					<IconButton label={ "Notifications" } size={ "sm" } variant={ "tertiary" }>
						<Bell className={ "size-4" }/>
					</IconButton>
				</div>
			</Navbar.Header>
		</Navbar>
	);
}
