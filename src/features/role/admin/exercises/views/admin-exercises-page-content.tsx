"use client";

import type { DataGridColumn } from "@heroui-pro/react";
import { DataGrid } from "@heroui-pro/react";
import { Button, Card, Chip, Label, ListBox, SearchField, Select } from "@heroui/react";
import { useMemo } from "react";
import { RotateCw } from "lucide-react";

import { AsyncMedia, ListPagination, PageBreadcrumbs, PageHeader } from "@/components/common";
import { AdminExercisesLoadingState } from "@/features/role/admin/exercises/components/shared/admin-exercises-loading-state";
import { useAdminExerciseGlobals } from "@/features/role/admin/exercises/hooks/use-admin-exercise-globals";
import { useAdminExerciseGlobalsPageState } from "@/features/role/admin/exercises/hooks/use-admin-exercise-globals-page-state";
import { AdminExerciseGlobalMobileCard } from "@/features/role/admin/exercises/components/admin-exercise-global-mobile-card";
import { AdminExerciseGlobalRowActions } from "@/features/role/admin/exercises/components/admin-exercise-global-row-actions";
import type { AdminExerciseGlobalListItem } from "@/features/role/admin/exercises/types/admin-exercise-global-list-item";

function getStatusLabel( exercise: AdminExerciseGlobalListItem ) {
	return exercise.active ? "Activo" : "Inactivo";
}

export default function AdminExercisesPageContent() {
	const { data = [], error, isError, isFetching, isLoading, refetch } = useAdminExerciseGlobals();
	const pageState = useAdminExerciseGlobalsPageState( { exercises: data } );
	const isRefreshing = isFetching && !isLoading;
	const {
		currentPage,
		showingFrom,
		showingTo,
		totalItems,
		totalPages,
	} = pageState.pagination;
	const exercises = pageState.pagination.paginatedItems;
	const breadcrumbs = [
		{ href: "/admin/dashboard", label: "Inicio" },
		{ label: "Ejercicios globales" },
	];

	const columns = useMemo<DataGridColumn<AdminExerciseGlobalListItem>[]>( () => [
		{
			accessorKey: "name",
			header: "Ejercicio",
			id: "name",
			isRowHeader: true,
			minWidth: 280,
			cell: ( exercise ) => (
				<div className={ "flex min-w-0 items-center gap-3" }>
					<AsyncMedia
						alt={ `Imagen de ${ exercise.name }` }
						className={ "size-12 shrink-0 rounded-xl border border-border" }
						emptyLabel={ "Sin imagen" }
						spinnerLabel={ `Cargando imagen de ${ exercise.name }` }
						src={ exercise.imageUrl }
					/>
					<div className={ "flex min-w-0 flex-col" }>
						<span className={ "truncate font-medium text-foreground" }>{ exercise.name }</span>
					</div>
				</div>
			),
		},
		{
			accessorKey: "category",
			header: "Categoria",
			id: "category",
			minWidth: 140,
		},
		{
			accessorKey: "target",
			header: "Grupo Muscular",
			id: "target",
			minWidth: 150,
		},
		{
			accessorKey: "equipment",
			header: "Equipamiento",
			id: "equipment",
			minWidth: 170,
		},
		{
			accessorKey: "active",
			header: "Estado",
			id: "active",
			minWidth: 110,
			cell: ( exercise ) => (
				<Chip color={ exercise.active ? "success" : "danger" } size={ "sm" } variant={ "soft" }>
					{ getStatusLabel( exercise ) }
				</Chip>
			),
		},
		{
			align: "end",
			header: "Acciones",
			id: "actions",
			minWidth: 120,
			cell: ( exercise ) => <AdminExerciseGlobalRowActions exercise={ exercise }/>,
		},
	], [] );

	if (isLoading) {
		return (
			<div className={ "flex flex-col gap-4" }>
				<PageBreadcrumbs
					backHref={ "/admin/dashboard" }
					backLabel={ "Volver al inicio" }
					crumbs={ breadcrumbs }
				/>
				<AdminExercisesLoadingState/>
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
				<Card className={ "border border-danger/20 bg-surface" } variant={ "default" }><Card.Content
					className={ "p-4 text-sm text-danger" }>{ error?.message ?? "No pudimos cargar el catalogo global." }</Card.Content></Card>
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
				<Card.Content className={ "flex flex-col gap-3 p-3 lg:flex-row  md:items-end md:justify-between" }>
					<PageHeader
						description={ "Catalogo global compartido por todos los coaches. Desde aquí se corrigen datos." }
						title={ "Ejercicios globales" }
					/>
					<div className={ "flex justify-end" }>
						<Button className={ "w-full md:w-auto" } isDisabled={ isRefreshing } variant={ "secondary" } onPress={ () => void refetch() }>
							<RotateCw className={ isRefreshing ? "size-4 animate-spin" : "size-4" }/>
							{ isRefreshing ? "Actualizando..." : "Actualizar" }
						</Button>
					</div>
				</Card.Content>
			</Card>

			<Card className={ "border border-border py-2" } variant={ "default" }>
				<Card.Content className={ "space-y-4 p-3" }>
					<div className={ "grid gap-3 lg:grid-cols-3" }>
						<SearchField name={ "admin-exercise-search" } value={ pageState.search } onChange={ pageState.updateNameFilter }>
							<Label>Buscar</Label>
							<SearchField.Group className={ "border border-border" }>
								<SearchField.SearchIcon/>
								<SearchField.Input placeholder={ "Nombre, id, categoria o target..." }/>
								<SearchField.ClearButton/>
							</SearchField.Group>
						</SearchField>
						<Select value={ pageState.statusFilter } variant={ "primary" }
						        onChange={ ( value ) => pageState.updateStatusFilter( value === null ? null : String( value ) as typeof pageState.statusFilter ) }>
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
						<Select value={ pageState.categoryFilter } variant={ "primary" } onChange={ ( value ) => pageState.updateCategoryFilter( value === null ? null : String( value ) ) }>
							<Label>Categoria</Label>
							<Select.Trigger className={ "border border-border" }><Select.Value/><Select.Indicator/></Select.Trigger>
							<Select.Popover>
								<ListBox>
									<ListBox.Item id={ "ALL" } textValue={ "Todos" }>Todos<ListBox.ItemIndicator/></ListBox.Item>
									{ pageState.categories.map( ( category ) => (
										<ListBox.Item key={ category } id={ category } textValue={ category }>{ category }<ListBox.ItemIndicator/></ListBox.Item>
									) ) }
								</ListBox>
							</Select.Popover>
						</Select>
					</div>

					<Chip size={ "sm" } variant={ "soft" }>
						{ totalItems } ejercicios
					</Chip>

					{ exercises.length === 0 ? (
						<Card className={ "border border-border bg-surface" } variant={ "default" }>
							<Card.Content className={ "p-4 text-sm text-muted" }>
								No hay ejercicios que coincidan con los filtros.
							</Card.Content>
						</Card>
					) : (
						<>
							<div className={ "hidden md:block" }>
								<DataGrid
									aria-label={ "Listado de ejercicios globales" }
									columns={ columns }
									contentClassName={ "min-w-full sm:min-w-[1100px]" }
									data={ exercises }
									getRowId={ ( exercise ) => exercise.id }
								/>
							</div>
							<div className={ "space-y-3 md:hidden" }>
								{ exercises.map( ( exercise ) => (
									<AdminExerciseGlobalMobileCard key={ exercise.id } exercise={ exercise }/>
								) ) }
							</div>
							<ListPagination
								currentPage={ currentPage }
								itemLabel={ "ejercicios" }
								onPageChangeAction={ pageState.setPage }
								showingFrom={ showingFrom }
								showingTo={ showingTo }
								totalItems={ totalItems }
								totalPages={ totalPages }
							/>
						</>
					) }
				</Card.Content>
			</Card>
		</div>
	);
}
