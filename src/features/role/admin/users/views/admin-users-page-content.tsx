"use client";

import { Button, Card, Chip, Label, ListBox, SearchField, Select } from "@heroui/react";
import type { DataGridColumn } from "@heroui-pro/react";
import { DataGrid } from "@heroui-pro/react";
import { useEffect, useMemo, useState } from "react";
import { RotateCw, UserPlus, UserX } from "lucide-react";

import { ErrorAlert, PageBreadcrumbs, PageHeader } from "@/components/common";
import { TableSkeleton } from "@/components/common/skeletons";
import { useIsMounted } from "@/components/layout/use-is-mounted";
import { useAdminUsers } from "@/features/role/admin/users/hooks/use-admin-users";
import { AdminCoachDrawer } from "@/features/role/admin/users/components/admin-coach-drawer";
import { AdminStudentDrawer } from "@/features/role/admin/users/components/admin-student-drawer";
import { AdminUserMobileCard } from "@/features/role/admin/users/components/admin-user-mobile-card";
import { AdminUserRowActions } from "@/features/role/admin/users/components/admin-user-row-actions";
import type { AdminUserListItem } from "@/features/role/admin/users/actions/get-admin-users";
import { getAdminCoachLabel, getAdminRoleLabel } from "@/features/role/admin/users/services/admin-user-labels";
import { useAdminUsersPageState } from "@/features/role/admin/users/hooks/use-admin-users-page-state";

type AdminUsersPageContentProps = {
	// Formulario que se abre al entrar, cuando se llega desde un acceso rápido.
	initialCreate?: "coach" | "student" | null;
	// Filtros con los que se abre la lista, cuando se llega desde un contador de Inicio.
};

export default function AdminUsersPageContent( { initialCreate = null }: AdminUsersPageContentProps ) {
	const isMounted = useIsMounted();
	const { data = [], error, isError, isFetching, isLoading, refetch } = useAdminUsers();
	const isRefreshing = isFetching && !isLoading;
	const [ isCreateCoachOpen, setIsCreateCoachOpen ] = useState( initialCreate === "coach" );
	const [ isCreateStudentOpen, setIsCreateStudentOpen ] = useState( initialCreate === "student" );

	// Se saca "?nuevo=" de la dirección para que recargar o volver atrás no reabra
	// el formulario. Los filtros quedan: son de la lista y viven en la URL.
	useEffect( () => {
		if (!initialCreate) return;

		const params = new URLSearchParams( window.location.search );

		params.delete( "nuevo" );
		window.history.replaceState( null, "", `${ window.location.pathname }${ params.size ? `?${ params }` : "" }` );
	}, [ initialCreate ] );

	const pageState = useAdminUsersPageState( data );
	const filteredUsers = pageState.filteredUsers;
	const breadcrumbs = [
		{ href: "/admin/dashboard", label: "Inicio" },
		{ label: "Usuarios" },
	];

	const columns = useMemo<DataGridColumn<AdminUserListItem>[]>( () => [
		{
			accessorKey: "name",
			header: "Usuario",
			id: "name",
			isRowHeader: true,
			minWidth: 200,
			cell: ( user ) => (
				<div className={ "flex min-w-0 flex-col" }>
					<span className={ "font-medium text-foreground" }>{ user.name }</span>
					<span className={ "text-xs text-muted" }>{ user.email }</span>
				</div>
			),
		},
		{
			accessorKey: "role",
			header: "Rol",
			id: "role",
			minWidth: 110,
			cell: ( user ) => <Chip size={ "sm" } variant={ "soft" }>{ getAdminRoleLabel( user.role ) }</Chip>,
		},
		{
			accessorKey: "coach",
			header: "Entrenador",
			id: "coach",
			minWidth: 180,
			cell: ( user ) => (
				<div className={ "flex min-w-0 flex-col" }>
					<span className={ "text-sm text-foreground" }>{ getAdminCoachLabel( user ) }</span>
					{ user.role === "STUDENT" ?
						<span className={ "text-xs text-muted" }>{ user.coach?.active ? "Entrenador activo" : user.coach ? "Entrenador inactivo" : "Sin asignar" }</span> : null }
				</div>
			),
		},
		{
			accessorKey: "dni",
			header: "DNI",
			id: "dni",
			minWidth: 110,
		},
		{
			accessorKey: "active",
			header: "Estado",
			id: "active",
			minWidth: 110,
			cell: ( user ) => (
				<Chip color={ user.active ? "success" : "danger" } size={ "sm" } variant={ "soft" }>
					{ user.active ? "Activo" : "Inactivo" }
				</Chip>
			),
		},
		{
			align: "end",
			header: "Acciones",
			id: "actions",
			minWidth: 160,
			cell: ( user ) => <AdminUserRowActions user={ user }/>,
		},
	], [] );

	if (!isMounted || isLoading || ( !data.length && isFetching && !isError )) {
		return (
			<div className={ "flex flex-col gap-4" }>
				<PageBreadcrumbs
					backHref={ "/admin/dashboard" }
					backLabel={ "Volver al inicio" }
					crumbs={ breadcrumbs }
				/>
				<TableSkeleton columns={ 6 } rows={ 6 } />
			</div>
		);
	}

	if (isError) {
		return (
			<div className={ "flex flex-col gap-4" }>
				<PageBreadcrumbs
					backHref={ "/admin/dashboard" }
					backLabel={ "Volver al inicio" }
					crumbs={ breadcrumbs }
				/>
				<ErrorAlert
					isRetrying={ isFetching }
					message={ error?.message ?? "No pudimos cargar usuarios." }
					title={ "No se pudo cargar la lista de usuarios" }
					onRetryAction={ () => void refetch() }
				/>
			</div>
		);
	}

	return (
		<div className={ "flex flex-col gap-4" }>
			<PageBreadcrumbs
				backHref={ "/admin/dashboard" }
				backLabel={ "Volver al inicio" }
				crumbs={ breadcrumbs }
			/>
			<Card className={ "border border-border py-2" } variant={ "default" }>
				<Card.Content className={ "flex flex-col gap-3 p-3 lg:flex-row lg:items-end lg:justify-between" }>
					<PageHeader
						description={ "Todas las cuentas de la app y el entrenador de cada estudiante." }
						title={ "Usuarios" }
					/>
					{ /* Crear es lo que mas se hace aca: los dos botones van a la vista. */ }
					<div className={ "grid grid-cols-2 gap-2 sm:flex sm:items-center lg:justify-end" }>
						<Button aria-label={ "Nuevo entrenador" } className={ "w-full min-w-0 sm:w-auto" } variant={ "secondary" } onPress={ () => setIsCreateCoachOpen( true ) }>
							<UserPlus className={ "size-4 shrink-0" }/>
							{ /* En el telefono no entran los dos rotulos completos: queda lo que los distingue. */ }
							<span className={ "truncate sm:hidden" }>Entrenador</span>
							<span className={ "hidden truncate sm:inline" }>Nuevo entrenador</span>
						</Button>
						<Button aria-label={ "Nuevo estudiante" } className={ "w-full min-w-0 sm:w-auto" } onPress={ () => setIsCreateStudentOpen( true ) }>
							<UserPlus className={ "size-4 shrink-0" }/>
							<span className={ "truncate sm:hidden" }>Estudiante</span>
							<span className={ "hidden truncate sm:inline" }>Nuevo estudiante</span>
						</Button>
						<AdminCoachDrawer hideTrigger isOpen={ isCreateCoachOpen } onOpenChangeAction={ setIsCreateCoachOpen }/>
						<AdminStudentDrawer hideTrigger isOpen={ isCreateStudentOpen } mode={ "create" } onOpenChangeAction={ setIsCreateStudentOpen }/>
					</div>
				</Card.Content>
			</Card>

			<Card className={ "border border-border py-2" } variant={ "default" }>
				{ /* La tabla se muestra cuando este bloque tiene lugar para ella (896 px);
				     por debajo van las tarjetas. No depende del ancho de la ventana. */ }
				<Card.Content className={ "@container space-y-4 p-3" }>
					{ /* En el telefono: el buscador a lo ancho y los dos filtros lado a lado, sin
					     etiquetas. Con una etiqueta y un renglon cada uno ocupaban media pantalla
					     antes del primer usuario. */ }
					<div className={ "grid grid-cols-2 gap-2 @3xl:grid-cols-3 @3xl:gap-3" }>
						<SearchField className={ "col-span-2 @3xl:col-span-1" } name={ "admin-user-search" } value={ pageState.search } onChange={ pageState.setSearch }>
							<Label className={ "sr-only @3xl:not-sr-only" }>Buscar</Label>
							<SearchField.Group className={ "border border-border" }>
								<SearchField.SearchIcon/>
								<SearchField.Input placeholder={ "Nombre, email, DNI o entrenador..." }/>
								<SearchField.ClearButton/>
							</SearchField.Group>
						</SearchField>
						<Select className={ "min-w-0" } value={ pageState.roleFilter } variant={ "primary" }
						        onChange={ ( value ) => pageState.setRoleFilter( value as typeof pageState.roleFilter ) }>
							<Label className={ "sr-only @3xl:not-sr-only" }>Rol</Label>
							<Select.Trigger className={ "w-full min-w-0 border border-border" }>
								<FilterValue isAll={ pageState.roleFilter === "ALL" } shortLabel={ "Rol" }/>
								<Select.Indicator/>
							</Select.Trigger>
							<Select.Popover>
								<ListBox>
									<ListBox.Item id={ "ALL" } textValue={ "Todos los roles" }>Todos los roles<ListBox.ItemIndicator/></ListBox.Item>
									<ListBox.Item id={ "ADMIN" } textValue={ "Administrador" }>Administrador<ListBox.ItemIndicator/></ListBox.Item>
									<ListBox.Item id={ "COACH" } textValue={ "Entrenador" }>Entrenador<ListBox.ItemIndicator/></ListBox.Item>
									<ListBox.Item id={ "STUDENT" } textValue={ "Estudiante" }>Estudiante<ListBox.ItemIndicator/></ListBox.Item>
								</ListBox>
							</Select.Popover>
						</Select>
						<Select className={ "min-w-0" } value={ pageState.statusFilter } variant={ "primary" }
						        onChange={ ( value ) => pageState.setStatusFilter( value as typeof pageState.statusFilter ) }>
							<Label className={ "sr-only @3xl:not-sr-only" }>Estado</Label>
							<Select.Trigger className={ "w-full min-w-0 border border-border" }>
								<FilterValue isAll={ pageState.statusFilter === "ALL" } shortLabel={ "Estado" }/>
								<Select.Indicator/>
							</Select.Trigger>
							<Select.Popover>
								<ListBox>
									<ListBox.Item id={ "ALL" } textValue={ "Todos los estados" }>Todos los estados<ListBox.ItemIndicator/></ListBox.Item>
									<ListBox.Item id={ "ACTIVE" } textValue={ "Activos" }>Activos<ListBox.ItemIndicator/></ListBox.Item>
									<ListBox.Item id={ "INACTIVE" } textValue={ "Inactivos" }>Inactivos<ListBox.ItemIndicator/></ListBox.Item>
								</ListBox>
							</Select.Popover>
						</Select>
					</div>

					<div className={ "flex flex-wrap items-center justify-between gap-2" }>
						<div className={ "flex flex-wrap items-center gap-2" }>
							<Chip size={ "sm" } variant={ "soft" }>
								{ filteredUsers.length === 1 ? "1 usuario" : `${ filteredUsers.length } usuarios` }
							</Chip>
							{ pageState.withoutCoachCount > 0 || pageState.onlyWithoutCoach ? (
								<Button
									aria-pressed={ pageState.onlyWithoutCoach }
									className={ pageState.onlyWithoutCoach ? "bg-warning text-warning-foreground" : "text-warning" }
									size={ "sm" }
									variant={ "secondary" }
									onPress={ pageState.toggleOnlyWithoutCoach }
								>
									<UserX className={ "size-4" }/>
									{ pageState.onlyWithoutCoach ? "Ver todos" : `${ pageState.withoutCoachCount } sin entrenador` }
								</Button>
							) : null }
						</div>
						<Button isDisabled={ isRefreshing } size={ "sm" } variant={ "ghost" } onPress={ () => void refetch() }>
							<RotateCw className={ isRefreshing ? "size-4 animate-spin" : "size-4" }/>
							{ isRefreshing ? "Actualizando..." : "Actualizar" }
						</Button>
					</div>

					{ filteredUsers.length === 0 ? (
						<p className={ "rounded-xl border border-dashed border-border px-4 py-6 text-center text-sm text-muted" }>
							{ pageState.onlyWithoutCoach ? "Todos los estudiantes activos tienen entrenador." : "No hay usuarios que coincidan con los filtros." }
						</p>
					) : null }

					<div className={ filteredUsers.length === 0 ? "hidden" : "hidden @4xl:block" }>
						<DataGrid
							aria-label={ "Listado de usuarios" }
							columns={ columns }
							contentClassName={ "min-w-full" }
							data={ filteredUsers }
							getRowId={ ( user ) => user.id }
						/>
					</div>
					<div className={ "space-y-2 @4xl:hidden" }>
						{ filteredUsers.map( ( user ) => (
							<AdminUserMobileCard key={ user.id } user={ user }/>
						) ) }
					</div>
				</Card.Content>
			</Card>
		</div>
	);
}

// Sin filtro, en el telefono el desplegable dice solo "Rol" o "Estado": "Todos los
// estados" no entra en la mitad del ancho. En escritorio, con la etiqueta arriba,
// queda el texto de la opcion.
function FilterValue( { isAll, shortLabel }: { isAll: boolean; shortLabel: string } ) {
	return (
		<Select.Value className={ "truncate" }>
			{ ( { selectedText } ) => isAll ? (
				<>
					<span className={ "@3xl:hidden" }>{ shortLabel }</span>
					<span className={ "hidden @3xl:inline" }>{ selectedText }</span>
				</>
			) : selectedText }
		</Select.Value>
	);
}
