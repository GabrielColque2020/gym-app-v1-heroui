"use client";

import type { DataGridColumn } from "@heroui-pro/react";
import { DataGrid } from "@heroui-pro/react";
import { Chip } from "@heroui/react";
import { useMemo } from "react";

import { AsyncMedia, ListPagination } from "@/components/common";
import { CoachExercisesEmptyState } from "@/features/role/coach/exercises/components/shared/coach-exercises-empty-state";
import { ExerciseFilters } from "@/features/role/coach/exercises/components/shared/exercise-filters";
import { ExerciseRowActions } from "@/features/role/coach/exercises/components/desktop/exercise-row-actions";
import { useCoachExerciseList } from "@/features/role/coach/exercises/hooks/use-coach-exercise-list";
import { formatCoachExerciseSource, formatCoachExerciseSummary } from "@/features/role/coach/exercises/services/coach-exercise-formatters";
import type { CoachExerciseListItem } from "@/features/role/coach/exercises/types/coach-exercise-list-item";

type ExercisesContentDesktopProps = {
	exercises: CoachExerciseListItem[];
};

export function ExercisesContentDesktop( { exercises }: ExercisesContentDesktopProps ) {
	const columns = useMemo<DataGridColumn<CoachExerciseListItem>[]>(
		() => [
			{
				accessorKey: "name",
				allowsSorting: true,
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
							<span className={ "truncate text-xs text-muted" }>{ formatCoachExerciseSummary( exercise ) || "Sin datos adicionales" }</span>
						</div>
					</div>
				),
				header: "Nombre",
				id: "name",
				isRowHeader: true,
				minWidth: 280,
			},
			{
				accessorKey: "category",
				allowsSorting: true,
				cell: ( exercise ) => <span>{ exercise.category }</span>,
				header: "Categoria",
				id: "category",
				minWidth: 180,
			},
			{
				accessorKey: "sourceType",
				allowsSorting: true,
				cell: ( exercise ) => (
					<Chip color={ exercise.sourceType === "global" ? "accent" : exercise.isOverride ? "warning" : "default" } size={ "sm" } variant={ "soft" }>
						{ formatCoachExerciseSource( exercise ) }
					</Chip>
				),
				header: "Origen",
				id: "sourceType",
				minWidth: 150,
			},
			{
				accessorKey: "active",
				allowsSorting: true,
				cell: ( exercise ) => (
					<Chip color={ exercise.active ? "success" : "danger" } size={ "sm" } variant={ "soft" }>
						{ exercise.active ? "Activo" : "Inactivo" }
					</Chip>
				),
				header: "Estado",
				id: "active",
				minWidth: 140,
			},
			{
				cell: ( exercise ) => <ExerciseRowActions exercise={ exercise }/>,
				header: "Acciones",
				id: "actions",
				minWidth: 180,
			},
		],
		[],
	);
	const {
		bodyParts,
		bodyPartFilter,
		changePage,
		clearFilters,
		filteredExercises,
		hasFilters,
		nameFilter,
		pagination,
		sourceFilter,
		updateBodyPartFilter,
		updateNameFilter,
		updateSourceFilter,
	} = useCoachExerciseList( { exercises } );
	const {
		currentPage,
		paginatedItems: paginatedExercises,
		showingFrom,
		showingTo,
		totalItems,
		totalPages,
	} = pagination;

	if (exercises.length === 0) {
		return <CoachExercisesEmptyState message={ "No hay ejercicios cargados" }/>;
	}

	return (
		<div className={ "flex w-full flex-col gap-4" }>
			<ExerciseFilters
				bodyParts={ bodyParts }
				bodyPartFilter={ bodyPartFilter }
				hasFilters={ hasFilters }
				layout={ "desktop" }
				nameFilter={ nameFilter }
				onBodyPartFilterChangeAction={ updateBodyPartFilter }
				onClearFiltersAction={ clearFilters }
				onNameFilterChangeAction={ updateNameFilter }
				onSourceFilterChangeAction={ updateSourceFilter }
				sourceFilter={ sourceFilter }
			/>

			{ filteredExercises.length === 0 ? (
				<CoachExercisesEmptyState message={ "No hay ejercicios que coincidan con los filtros" }/>
			) : (
				<>
					<DataGrid
						aria-label={ "Listado de ejercicios" }
						columns={ columns }
						contentClassName={ "min-w-full sm:min-w-[960px]" }
						data={ paginatedExercises }
						getRowId={ ( exercise ) => exercise.id }
					/>

					<ListPagination
						currentPage={ currentPage }
						itemLabel={ "ejercicios" }
						showingFrom={ showingFrom }
						showingTo={ showingTo }
						totalItems={ totalItems }
						totalPages={ totalPages }
						onPageChangeAction={ changePage }
					/>
				</>
			) }
		</div>
	);
}
