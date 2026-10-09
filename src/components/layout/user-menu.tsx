"use client";

import type { Key } from "@heroui/react";

import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useState } from "react";

import { Button, Dropdown, Header, Label, Separator } from "@heroui/react";
import { Laptop, LogOut, Moon, Sun, UserRound } from "lucide-react";

import { InitialsAvatar, getRoleLabel } from "@/components/layout/initials-avatar";
import { useIsMounted } from "@/components/layout/use-is-mounted";
import { LogoutConfirmModal } from "@/features/auth/components/logout-confirm-modal";
import { updateThemePreferenceAction } from "@/features/theme/actions/update-theme-preference";
import type { UiThemePreference } from "@/features/theme/theme-preference";
import type { Role } from "@/generated/prisma/client";

type UserMenuProps = {
	userName: string;
	userRole: Role;
};

// Lo tuyo, en un solo lugar: quién sos, tu perfil, cómo ves la app y la salida.
// Antes eran dos botones sueltos en la barra —tema y cerrar sesión—, y cerrar
// sesión, lo que menos se usa, era el botón más grande y más rojo de la pantalla.
export function UserMenu( { userName, userRole }: UserMenuProps ) {
	const router = useRouter();
	const isMounted = useIsMounted();
	const [ isLogoutOpen, setIsLogoutOpen ] = useState( false );
	const { setTheme, theme } = useTheme();

	const currentTheme = ( theme ?? "system" ) as UiThemePreference;
	// El administrador no tiene "Mi perfil": sus datos se manejan desde Usuarios.
	const hasProfile = userRole !== "ADMIN";

	async function handleThemeAction( key: Key ) {
		if (key === "system" || key === "light" || key === "dark") {
			const themePreference = key as UiThemePreference;

			setTheme( themePreference );
			await updateThemePreferenceAction( themePreference );
		}
	}

	function handleAccountAction( key: Key ) {
		if (key === "profile") {
			router.push( "/profile" );
			return;
		}

		// El menú ya se cerró al tocar el item: el modal vive afuera del Dropdown
		// para no desmontarse con él.
		if (key === "logout") {
			setIsLogoutOpen( true );
		}
	}

	return (
		<>
			<Dropdown>
				<Button
					aria-label={ "Tu cuenta y tus preferencias" }
					className={ "size-11 min-w-11 rounded-full p-0" }
					size={ "sm" }
					variant={ "tertiary" }
				>
					<InitialsAvatar className={ "size-8" } name={ userName }/>
				</Button>

				<Dropdown.Popover
					className={ "min-w-60 max-w-[min(20rem,calc(100vw-1.5rem))]" }
					placement={ "bottom end" }
				>
					{ /* Quién sos, arriba y sin ser un item: no se toca, se lee. */ }
					<div className={ "px-3 py-2.5" }>
						<p className={ "truncate text-sm font-medium text-foreground" }>{ userName }</p>
						<p className={ "truncate text-xs text-muted" }>{ getRoleLabel( userRole ) }</p>
					</div>

					{ hasProfile ? (
						<>
							<Separator/>
							<Dropdown.Menu aria-label={ "Tu cuenta" } onAction={ handleAccountAction }>
								<Dropdown.Item id={ "profile" } textValue={ "Mi perfil" }>
									<UserRound className={ "size-4 shrink-0 text-muted" }/>
									<Label>Mi perfil</Label>
								</Dropdown.Item>
							</Dropdown.Menu>
						</>
					) : null }

					<Separator/>
					<Dropdown.Menu
						aria-label={ "Tema" }
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

					<Separator/>
					<Dropdown.Menu aria-label={ "Sesión" } onAction={ handleAccountAction }>
						<Dropdown.Item id={ "logout" } textValue={ "Cerrar sesión" }>
							<LogOut className={ "size-4 shrink-0 text-danger" }/>
							<Label className={ "text-danger" }>Cerrar sesión</Label>
						</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown.Popover>
			</Dropdown>

			<LogoutConfirmModal isOpen={ isLogoutOpen } onOpenChangeAction={ setIsLogoutOpen }/>
		</>
	);
}
