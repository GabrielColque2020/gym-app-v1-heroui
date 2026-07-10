"use client";

import type { DataGridColumn } from "@heroui-pro/react";
import { DataGrid } from "@heroui-pro/react";
import { Button, Card, Chip, Label, ListBox, SearchField, Select } from "@heroui/react";
import { useMemo } from "react";
import { RotateCw } from "lucide-react";

import { PageHeader } from "@/components/common";
import { useAdminUsers } from "@/features/role/admin/users/hooks/use-admin-users";
import { AdminCoachDrawer } from "@/features/role/admin/users/components/admin-coach-drawer";
import { AdminUserMobileCard } from "@/features/role/admin/users/components/admin-user-mobile-card";
import { AdminUserRowActions } from "@/features/role/admin/users/components/admin-user-row-actions";
import type { AdminUserListItem } from "@/features/role/admin/users/actions/get-admin-users";
import { useAdminUsersPageState } from "@/features/role/admin/users/hooks/use-admin-users-page-state";

function getRoleLabel( role: AdminUserListItem["role"] ) {
	return role === "ADMIN" ? "Admin" : role === "COACH" ? "Coach" : "Student";
}

function getCoachLabel( user: AdminUserListItem ) {
	if (user.role !== "STUDENT") {
		return "No aplica";
	}

	return user.coach ? user.coach.name : "Sin coach";
}

export default function AdminUsersPageContent() {
	const { data = [], error, isError, isFetching, isLoading, refetch } = useAdminUsers();
	const isRefreshing = isFetching && !isLoading;
	const pageState = useAdminUsersPageState( data );
	const filteredUsers = pageState.filteredUsers;

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
			cell: ( user ) => <Chip size={ "sm" } variant={ "soft" }>{ getRoleLabel( user.role ) }</Chip>,
		},
		{
			accessorKey: "coach",
			header: "Coach",
			id: "coach",
			minWidth: 180,
			cell: ( user ) => (
				<div className={ "flex min-w-0 flex-col" }>
					<span className={ "text-sm text-foreground" }>{ getCoachLabel( user ) }</span>
					{ user.role === "STUDENT" ?
						<span className={ "text-xs text-muted" }>{ user.coach?.active ? "Coach activo" : user.coach ? "Coach inactivo" : "Sin asignacion" }</span> : null }
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
			minWidth: 120,
			cell: ( user ) => <AdminUserRowActions user={ user }/>,
		},
	], [] );

	if (isLoading) {
		return <Card className={ "border border-border bg-surface" } variant={ "default" }><Card.Content className={ "p-4 text-sm text-muted" }>Cargando usuarios...</Card.Content></Card>;
	}

	if (isError) {
		return <Card className={ "border border-danger/20 bg-surface" } variant={ "default" }><Card.Content
			className={ "p-4 text-sm text-danger" }>{ error?.message ?? "No pudimos cargar usuarios." }</Card.Content></Card>;
	}

	return (
		<div className={ "flex flex-col gap-4" }>
			<Card className={ "border border-border py-2" } variant={ "default" }>
				<Card.Content className={ "flex flex-col gap-3 p-3 lg:flex-row lg:items-start lg:justify-between" }>
					<PageHeader
						description={ "Listado global para crear coaches y revisar la asignacion estudiante-coach." }
						title={ "Usuarios admin" }
					/>
					<div className={ "flex flex-col gap-2 sm:flex-row" }>
						<Button isDisabled={ isRefreshing } variant={ "secondary" } onPress={ () => void refetch() }>
							<RotateCw className={ isRefreshing ? "size-4 animate-spin" : "size-4" }/>
							{ isRefreshing ? "Actualizando..." : "Actualizar" }
						</Button>
						<AdminCoachDrawer/>
					</div>
				</Card.Content>
			</Card>

			<Card className={ "border border-border py-2" } variant={ "default" }>
				<Card.Content className={ "space-y-4 p-3" }>
					<div className={ "grid gap-3 md:grid-cols-3" }>
						<SearchField name={ "admin-user-search" } value={ pageState.search } onChange={ pageState.setSearch }>
							<Label>Buscar</Label>
							<SearchField.Group className={ "border border-border" }>
								<SearchField.SearchIcon/>
								<SearchField.Input placeholder={ "Nombre, email, DNI o coach..." }/>
								<SearchField.ClearButton/>
							</SearchField.Group>
						</SearchField>
						<Select value={ pageState.roleFilter } variant={ "primary" }
						        onChange={ ( value ) => pageState.setRoleFilter( value as typeof pageState.roleFilter ) }>
							<Label>Rol</Label>
							<Select.Trigger className={ "border border-border" }><Select.Value/><Select.Indicator/></Select.Trigger>
							<Select.Popover>
								<ListBox>
									<ListBox.Item id={ "ALL" } textValue={ "Todos" }>Todos<ListBox.ItemIndicator/></ListBox.Item>
									<ListBox.Item id={ "ADMIN" } textValue={ "Admin" }>Admin<ListBox.ItemIndicator/></ListBox.Item>
									<ListBox.Item id={ "COACH" } textValue={ "Coach" }>Coach<ListBox.ItemIndicator/></ListBox.Item>
									<ListBox.Item id={ "STUDENT" } textValue={ "Student" }>Student<ListBox.ItemIndicator/></ListBox.Item>
								</ListBox>
							</Select.Popover>
						</Select>
						<Select value={ pageState.statusFilter } variant={ "primary" }
						        onChange={ ( value ) => pageState.setStatusFilter( value as typeof pageState.statusFilter ) }>
							<Label>Estado</Label>
							<Select.Trigger className={ "border border-border" }><Select.Value/><Select.Indicator/></Select.Trigger>
							<Select.Popover>
								<ListBox>
									<ListBox.Item id={ "ALL" } textValue={ "Todos" }>Todos<ListBox.ItemIndicator/></ListBox.Item>
									<ListBox.Item id={ "ACTIVE" } textValue={ "Activos" }>Activos<ListBox.ItemIndicator/></ListBox.Item>
									<ListBox.Item id={ "INACTIVE" } textValue={ "Inactivos" }>Inactivos<ListBox.ItemIndicator/></ListBox.Item>
								</ListBox>
							</Select.Popover>
						</Select>
					</div>

					<Chip size={ "sm" } variant={ "soft" }>
						{ filteredUsers.length } usuarios
					</Chip>

					<div className={ "hidden md:block" }>
						<DataGrid
							aria-label={ "Listado de usuarios admin" }
							columns={ columns }
							contentClassName={ "min-w-full sm:min-w-[900px]" }
							data={ filteredUsers }
							getRowId={ ( user ) => user.id }
						/>
					</div>
					<div className={ "space-y-3 md:hidden" }>
						{ filteredUsers.map( ( user ) => (
							<AdminUserMobileCard key={ user.id } user={ user }/>
						) ) }
					</div>
				</Card.Content>
			</Card>
		</div>
	);
}
