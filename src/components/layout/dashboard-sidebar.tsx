"use client";

import type { NavItem } from "../../constants/nav-items";

import { Avatar, Chip } from "@heroui/react";
import { Sidebar } from "@heroui-pro/react";

import { FOOTER_ITEMS, NAV_ITEMS } from "../../constants/nav-items";

interface DashboardSidebarProps {
	pathname: string;
	basePath: string;
	disableNavigation?: boolean;
}

export function DashboardSidebar( {
									  basePath,
									  disableNavigation = false,
									  pathname,
								  }: DashboardSidebarProps ) {
	return (
		<>
			<Sidebar>
				<SidebarContents
					basePath={ basePath }
					disableNavigation={ disableNavigation }
					pathname={ pathname }
				/>
			</Sidebar>
			<Sidebar.Mobile>
				<SidebarContents
					basePath={ basePath }
					disableNavigation={ disableNavigation }
					idPrefix={ "mobile-" }
					pathname={ pathname }
				/>
			</Sidebar.Mobile>
		</>
	);
}

interface SidebarContentsProps {
	basePath: string;
	disableNavigation: boolean;
	pathname: string;
	idPrefix?: string;
}

function SidebarContents( {
							  basePath,
							  disableNavigation,
							  idPrefix = "",
							  pathname,
						  }: SidebarContentsProps ) {
	return (
		<>
			<Sidebar.Header>
				<div className={ "flex items-center gap-3 px-1 py-1" }>
					<Avatar className={ "size-9" }>
						<Avatar.Image
							alt={ "Kate Moore" }
							src={ "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue-light.jpg" }
						/>
						<Avatar.Fallback>KM</Avatar.Fallback>
					</Avatar>
					<div className={ "flex min-w-0 flex-col" } data-sidebar={ "label" }>
						<span className={ "text-foreground text-sm font-medium leading-tight" }>Kate Moore</span>
						<span className={ "text-muted text-xs font-medium leading-tight" }>Admin</span>
					</div>
				</div>
			</Sidebar.Header>
			<Sidebar.Content>
				<Sidebar.Group>
					<Sidebar.Menu aria-label={ "Dashboard navigation" }>
						{ NAV_ITEMS.map( ( item ) => (
							<SidebarNavItem
								key={ item.href ?? item.label }
								basePath={ basePath }
								disableNavigation={ disableNavigation }
								idPrefix={ idPrefix }
								item={ item }
								pathname={ pathname }
							/>
						) ) }
					</Sidebar.Menu>
				</Sidebar.Group>
			</Sidebar.Content>
			<Sidebar.Footer>
				<Sidebar.Menu aria-label={ "Account" }>
					{ FOOTER_ITEMS.map( ( item ) => (
						<SidebarNavItem
							key={ item.href ?? item.label }
							basePath={ basePath }
							disableNavigation={ disableNavigation }
							idPrefix={ idPrefix }
							item={ item }
							pathname={ pathname }
						/>
					) ) }
				</Sidebar.Menu>
			</Sidebar.Footer>
		</>
	);
}

interface SidebarNavItemProps {
	basePath: string;
	disableNavigation: boolean;
	idPrefix: string;
	item: NavItem;
	pathname: string;
}

function SidebarNavItem( {
							 basePath,
							 disableNavigation,
							 idPrefix,
							 item,
							 pathname,
						 }: SidebarNavItemProps ) {
	const Icon = item.icon;
	const fullHref = item.href ? basePath + item.href : undefined;
	const isCurrent = item.href
		? item.href === "/"
			? pathname === fullHref || pathname === basePath || pathname === `${ basePath }/`
			: pathname === fullHref || pathname.startsWith( `${ fullHref }/` )
		: item.children?.some( ( child ) => {
			if (!child.href) return false;

			const childFullHref = basePath + child.href;

			return pathname === childFullHref || pathname.startsWith( `${ childFullHref }/` );
		} ) ?? false;
	const id = `${ idPrefix }${ item.href ?? item.label.toLowerCase().replace( /\s+/g, "-" ) }`;

	return (
		<Sidebar.MenuItem
			href={ disableNavigation ? undefined : fullHref }
			id={ id }
			isCurrent={ isCurrent }
			textValue={ item.label }
		>
			<Sidebar.MenuIcon>
				<Icon className={ "size-4" }/>
			</Sidebar.MenuIcon>
			<Sidebar.MenuLabel>{ item.label }</Sidebar.MenuLabel>
			{ item.badge ? (
				<Sidebar.MenuChip>
					<Chip color={ "success" } size={ "sm" } variant={ "soft" }>
						{ item.badge }
					</Chip>
				</Sidebar.MenuChip>
			) : null }
			{ item.children ? (
				<Sidebar.MenuTrigger aria-label={ `Desplegar ${ item.label }` }>
					<Sidebar.MenuIndicator/>
				</Sidebar.MenuTrigger>
			) : null }
			{ item.children ? (
				<Sidebar.Submenu>
					{ item.children.map( ( child ) => (
						<SidebarNavItem
							key={ child.href ?? child.label }
							basePath={ basePath }
							disableNavigation={ disableNavigation }
							idPrefix={ idPrefix }
							item={ child }
							pathname={ pathname }
						/>
					) ) }
				</Sidebar.Submenu>
			) : null }
		</Sidebar.MenuItem>
	);
}
