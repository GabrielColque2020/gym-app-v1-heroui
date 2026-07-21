"use client";

import type { NavItem } from "@/constants/nav-items";
import { NAV_ITEMS } from "@/constants/nav-items";

import { Avatar } from "@heroui/react";
import { Sidebar, useSidebar } from "@heroui-pro/react";

import type { Role } from "@/generated/prisma/client";

interface DashboardSidebarProps {
	pathname: string;
	basePath: string;
	disableNavigation?: boolean;
	userName: string;
	userRole: Role;
}

export function DashboardSidebar( {
									  basePath,
									  disableNavigation = false,
									  userName,
									  userRole,
									  pathname,
								  }: DashboardSidebarProps ) {
	return (
		<>
			<Sidebar>
				<SidebarContents
					basePath={ basePath }
					disableNavigation={ disableNavigation }
					userName={ userName }
					userRole={ userRole }
					pathname={ pathname }
				/>
			</Sidebar>
			<Sidebar.Mobile>
				<SidebarContents
					basePath={ basePath }
					disableNavigation={ disableNavigation }
					userName={ userName }
					userRole={ userRole }
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
	userName: string;
	userRole: Role;
	pathname: string;
	idPrefix?: string;
}

function SidebarContents( {
							  basePath,
							  disableNavigation,
							  userName,
							  userRole,
							  idPrefix = "",
							  pathname,
						  }: SidebarContentsProps ) {
	const { isMobile, isOpen } = useSidebar();
	const isCollapsed = !isMobile && !isOpen;
	const visibleNavItems = NAV_ITEMS.filter( ( item ) => isNavItemVisible( item, userRole ) );

	return (
		<>
			<Sidebar.Header>
				<div className={ `flex w-full items-center ${ isCollapsed ? "justify-center px-0 py-2" : "gap-3 px-1 py-1" }` }>
					<GradientInitialsAvatar name={ userName }/>
					<div className={ `${ isCollapsed ? "sr-only" : "flex min-w-0 flex-col" }` } data-sidebar={ "label" }>
						<span className={ "truncate text-sm font-medium leading-tight text-foreground" }>{ userName }</span>
						<span className={ "text-xs font-medium leading-tight text-muted" }>{ getRoleLabel( userRole ) }</span>
					</div>
				</div>
			</Sidebar.Header>
			<Sidebar.Content>
				<Sidebar.Group>
					<Sidebar.Menu aria-label={ "Dashboard navigation" }>
						{ visibleNavItems.map( ( item ) => (
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
		</>
	);
}

interface SidebarNavItemProps {
	basePath: string;
	disableNavigation: boolean;
	idPrefix: string;
	item: NavItem;
	pathname: string;
	isChildren?: boolean;
}

function isNavItemVisible( item: NavItem, userRole: Role ): boolean {
	if (item.roles && !item.roles.includes( userRole )) {
		return false;
	}

	if (!item.children) {
		return true;
	}

	return item.children.some( ( child ) => isNavItemVisible( child, userRole ) );
}

function SidebarNavItem( {
							 basePath,
							 disableNavigation,
							 idPrefix,
							 item,
							 pathname,
							 isChildren = false,
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
			className={ isChildren ? "py-px" : undefined }
		>
			<Sidebar.MenuIcon>
				<Icon className={ "size-4" }/>
			</Sidebar.MenuIcon>
			<Sidebar.MenuLabel
				className={
					"whitespace-normal wrap-break-word leading-snug **:data-[slot=sidebar-menu-label-text]:whitespace-normal **:data-[slot=sidebar-menu-label-text]:wrap-break-word [&_[data-slot=sidebar-menu-label-text]]:overflow-visible [&_[data-slot=sidebar-menu-label-text]]:text-clip"
				}
			>
				{ item.label }
			</Sidebar.MenuLabel>
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
							isChildren={ true }
						/>
					) ) }
				</Sidebar.Submenu>
			) : null }
		</Sidebar.MenuItem>
	);
}

function GradientInitialsAvatar( { name }: { name: string } ) {
	return (
		<Avatar
			className={ "size-10 shrink-0 rounded-full bg-linear-to-br from-accent via-accent/80 to-primary text-accent-foreground shadow-sm" }
		>
			<Avatar.Fallback className={ "bg-transparent text-sm font-bold text-accent-foreground" }>
				{ getInitials( name ) }
			</Avatar.Fallback>
		</Avatar>
	);
}

function getInitials( name: string ) {
	const parts = name.trim().split( /\s+/ ).filter( Boolean );
	const initials = parts.slice( 0, 2 ).map( ( part ) => part[ 0 ]?.toUpperCase() ?? "" ).join( "" );

	return initials || "U";
}

function getRoleLabel( role: Role ) {
	if (role === "ADMIN") {
		return "Administrador";
	}

	return role === "COACH" ? "Entrenador" : "Estudiante";
}
