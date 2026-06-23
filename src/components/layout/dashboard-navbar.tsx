"use client";

import { Moon } from "@gravity-ui/icons";
import { useTheme } from "@heroui/react";
import { Navbar, Sidebar } from "@heroui-pro/react";

import { IconButton } from "../ui/icon-button";

export function DashboardNavbar() {
	const { theme, resolvedTheme, setTheme } = useTheme( "light" );
	const isDarkTheme = ( resolvedTheme ?? theme ) === "dark";

	return (
		<Navbar maxWidth={ "full" } position={ "static" } className={ "bg-transparent border-b border-border" }>
			<Navbar.Header>
				<Sidebar.Trigger/>
				<Navbar.Spacer/>
				<div className={ "flex items-center gap-2" }>
					<IconButton
						label={ "Cambiar tema" }
						size={ "sm" }
						variant={ "tertiary" }
						onPress={ () => setTheme( isDarkTheme ? "light" : "dark" ) }
					>
						<Moon className={ "size-4" }/>
					</IconButton>
				</div>
			</Navbar.Header>
		</Navbar>
	);
}
