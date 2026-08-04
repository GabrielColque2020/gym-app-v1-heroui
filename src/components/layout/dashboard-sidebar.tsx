"use client";

import type { NavItem } from "@/constants/nav-items";
import { NAV_ITEMS } from "@/constants/nav-items";

import { Avatar } from "@heroui/react";
import { Sidebar, useSidebar, useSidebarPages } from "@heroui-pro/react";
import { ArrowLeft } from "lucide-react";

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
	const initialPage = getInitialPage(visibleNavItems, basePath, pathname);

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
				<Sidebar.Pages defaultValue={ initialPage }>
					<Sidebar.Page value={ "main" }>
						<Sidebar.Group>
							<Sidebar.Menu aria-label={ "Dashboard navigation" }>
								{ visibleNavItems.map((item) => (
									<SidebarNavItem
										key={ `${item.href ?? item.label}-${item.label}` }
										basePath={ basePath }
										disableNavigation={ disableNavigation }
										idPrefix={ idPrefix }
										item={ item }
										pathname={ pathname }
									/>
								)) }
							</Sidebar.Menu>
						</Sidebar.Group>
					</Sidebar.Page>
					{ visibleNavItems.filter(hasChildren).map((item) => (
						<Sidebar.Page key={ getPageValue(item) } value={ getPageValue(item) }>
							<SidebarPageMenu
								basePath={ basePath }
								disableNavigation={ disableNavigation }
								idPrefix={ idPrefix }
								item={ item }
								pathname={ pathname }
							/>
						</Sidebar.Page>
					)) }
				</Sidebar.Pages>
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

function hasChildren(item: NavItem): item is NavItem & { children: readonly NavItem[] } {
	return Boolean(item.children?.length);
}

function getPageValue(item: NavItem) {
	return `page-${item.label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")}`;
}

function getInitialPage(items: readonly NavItem[], basePath: string, pathname: string) {
	const activeGroup = items.find((item) => item.children?.some((child) => isPathActive(basePath + (child.href ?? ""), pathname)));

	return activeGroup ? getPageValue(activeGroup) : "main";
}

function isPathActive(href: string, pathname: string) {
	return pathname === href || pathname.startsWith(`${href}/`);
}

interface SidebarPageMenuProps {
	basePath: string;
	disableNavigation: boolean;
	idPrefix: string;
	item: NavItem & { children: readonly NavItem[] };
	pathname: string;
}

function SidebarPageMenu({
							 basePath,
							 disableNavigation,
							 idPrefix,
							 item,
							 pathname,
						 }: SidebarPageMenuProps) {
	const { setActiveValue } = useSidebarPages();

	return (
		<Sidebar.Group>
			<Sidebar.Menu aria-label={ item.label }>
				<Sidebar.MenuItem onAction={ () => setActiveValue("main") } textValue={ "Volver" }>
					<Sidebar.MenuIcon>
						<ArrowLeft className={ "size-4" }/>
					</Sidebar.MenuIcon>
					<Sidebar.MenuLabel>Volver</Sidebar.MenuLabel>
				</Sidebar.MenuItem>
				{ item.children.map((child) => (
					<SidebarNavItem
						key={ `${child.href ?? child.label}-${child.label}` }
						basePath={ basePath }
						disableNavigation={ disableNavigation }
						idPrefix={ idPrefix }
						item={ child }
						pathname={ pathname }
						isChildren={ true }
					/>
				)) }
			</Sidebar.Menu>
		</Sidebar.Group>
	);
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
	const navKey = `${ item.label }-${ item.href ?? "group" }`
		.toLowerCase()
		.replace( /[^a-z0-9]+/g, "-" )
		.replace( /^-+|-+$/g, "" );
	const id = `${ idPrefix }${ navKey }`;

	if (item.children) {
		return <SidebarGroupLink id={ id } item={ item } isCurrent={ isCurrent }/>;
	}

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
		</Sidebar.MenuItem>
	);
}

function SidebarGroupLink({ id, item, isCurrent }: { id: string; item: NavItem; isCurrent: boolean }) {
	const { setActiveValue } = useSidebarPages();
	const Icon = item.icon;

	return (
		<Sidebar.MenuItem
			id={ id }
			isCurrent={ isCurrent }
			onAction={ () => setActiveValue(getPageValue(item)) }
			textValue={ item.label }
		>
			<Sidebar.MenuIcon>
				<Icon className={ "size-4" }/>
			</Sidebar.MenuIcon>
			<Sidebar.MenuLabel>{ item.label }</Sidebar.MenuLabel>
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
