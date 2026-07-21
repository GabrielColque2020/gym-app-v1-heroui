"use client";

import type { Key } from "@heroui/react";
import { Button, Dropdown, Header, Label } from "@heroui/react";
import { Navbar, Sidebar } from "@heroui-pro/react";
import { useTheme } from "next-themes";
import { ChevronDown, Laptop, LogOut, Moon, Sun } from "lucide-react";
import { useState } from "react";

import { useIsMounted } from "@/components/layout/use-is-mounted";
import { LogoutConfirmModal } from "@/features/auth/components/logout-confirm-modal";
import { updateThemePreferenceAction } from "@/features/theme/actions/update-theme-preference";
import type { UiThemePreference } from "@/features/theme/theme-preference";

export function DashboardNavbar() {
	const isMounted = useIsMounted();
	const [ isLogoutOpen, setIsLogoutOpen ] = useState( false );
	const { resolvedTheme, setTheme, theme } = useTheme();

	const currentTheme = ( theme === "system" ? "system" : theme ?? "system" ) as UiThemePreference;
	const isDarkTheme = ( resolvedTheme ?? theme ) === "dark";

	async function handleThemeAction( key: Key ) {
		if (key === "system" || key === "light" || key === "dark") {
			const themePreference = key as UiThemePreference;

			await updateThemePreferenceAction( themePreference );
			setTheme( themePreference );
		}
	}

	return (
		<Navbar maxWidth={ "full" } position={ "static" } className={ "bg-transparent border-b border-border" }>
			<Navbar.Header>
				<Sidebar.Trigger/>
				<Navbar.Spacer/>
				<div className={ "flex items-center gap-2" }>
					<Dropdown>
						<Button
							aria-label={ "Cambiar tema" }
							className={ "gap-2 px-3" }
							size={ "sm" }
							variant={ "tertiary" }
						>
							{ !isMounted ? (
								<span className={ "size-4" } aria-hidden={ "true" }/>
							) : currentTheme === "system" ? (
								<Laptop className={ "size-4" }/>
							) : isDarkTheme ? (
								<Moon className={ "size-4" }/>
							) : (
								<Sun className={ "size-4" }/>
							) }
							<ChevronDown className={ "size-4 opacity-70" }/>
						</Button>
						<Dropdown.Popover placement={ "bottom end" }>
							<Dropdown.Menu
								aria-label={ "Selector de tema" }
								onAction={ handleThemeAction }
								selectedKeys={ new Set( [ isMounted ? currentTheme : "system" ] ) }
								selectionMode={ "single" }
							>
								<Header>Tema</Header>
								<Dropdown.Item id={ "system" } textValue={ "Sistema" }>
									<Dropdown.ItemIndicator/>
									<Laptop className={ "size-4 shrink-0 text-muted" }/>
									<Label>Sistema</Label>
								</Dropdown.Item>
								<Dropdown.Item id={ "light" } textValue={ "Claro" }>
									<Dropdown.ItemIndicator/>
									<Sun className={ "size-4 shrink-0 text-muted" }/>
									<Label>Claro</Label>
								</Dropdown.Item>
								<Dropdown.Item id={ "dark" } textValue={ "Oscuro" }>
									<Dropdown.ItemIndicator/>
									<Moon className={ "size-4 shrink-0 text-muted" }/>
									<Label>Oscuro</Label>
								</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown.Popover>
					</Dropdown>
					<Button
						aria-label={ "Cerrar sesión" }
						size={ "sm" }
						variant={ "danger-soft" }
						onPress={ () => setIsLogoutOpen( true ) }
					>
						<LogOut className={ "size-4" }/> Cerrar sesión
					</Button>
				</div>
				<LogoutConfirmModal isOpen={ isLogoutOpen } onOpenChangeAction={ setIsLogoutOpen }/>
			</Navbar.Header>
		</Navbar>
	);
}
