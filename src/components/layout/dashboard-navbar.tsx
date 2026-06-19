"use client";

import { Bell, Moon, Sun } from "@gravity-ui/icons";
import { useTheme } from "@heroui/react";
import { Navbar, Sidebar } from "@heroui-pro/react";
import { useEffect, useState } from "react";

import { IconButton } from "../ui/icon-button";

export function DashboardNavbar() {
	const { theme, resolvedTheme, setTheme } = useTheme( "light" );
	const isDarkTheme = ( resolvedTheme ?? theme ) === "dark";
	const [ mounted, setMounted ] = useState( false );

	useEffect( () => {
		setMounted( true );
	}, [] );

	return (
		<Navbar maxWidth={ "full" } position={ "static" } className={ "bg-transparent border-b border-border" }>
			<Navbar.Header>
				<Sidebar.Trigger/>
				<Navbar.Spacer/>
				<div className={ "flex items-center gap-2" }>
					<IconButton
						label={ mounted ? ( isDarkTheme ? "Switch to light mode" : "Switch to dark mode" ) : "Theme toggle" }
						size={ "sm" }
						variant={ "tertiary" }
						onPress={ () => setTheme( isDarkTheme ? "light" : "dark" ) }
					>
						{ mounted ? ( isDarkTheme ? <Sun className={ "size-4" }/> : <Moon className={ "size-4" }/> ) : <Moon className={ "size-4" }/> }
					</IconButton>
				</div>
			</Navbar.Header>
		</Navbar>
	);
}
