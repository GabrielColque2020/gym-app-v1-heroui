"use client";

import type { DataGridColumn } from "@heroui-pro/react";
import { DataGrid } from "@heroui-pro/react";
import type { ExerciseListItem } from "@/features/exercises/types/exercise-list-item";
import { Chip } from "@heroui/react";
import { useMemo } from "react";

import { ListPagination } from "@/components/common";
import { ExerciseRowActions } from "@/features/role/coach/exercises/components/desktop/exercise-row-actions";
import { CoachExercisesEmptyState } from "@/features/role/coach/exercises/components/shared/coach-exercises-empty-state";
import { ExerciseFilters } from "@/features/role/coach/exercises/components/shared/exercise-filters";
import { useExerciseList } from "@/features/exercises/hooks/use-exercise-list";
import { formatBodyPart } from "@/features/exercises/services/exercise-form";

type ExercisesContentDesktopProps = {
	exercises: ExerciseListItem[];
};

export function ExercisesContentDesktop( { exercises }: ExercisesContentDesktopProps ) {
	const columns = useMemo<DataGridColumn<ExerciseListItem>[]>(
		() => [
			{
				accessorKey: "name",
				allowsSorting: true,
				cell: ( exercise ) => (
					<div className={ "flex min-w-0 flex-col" }>
						<span className={ "truncate font-medium text-foreground" }>{ exercise.name }</span>
						<span className={ "truncate text-xs text-muted" }>
							{ exercise.tips?.trim() || "Sin recomendaciones cargadas" }
						</span>
					</div>
				),
				header: "Nombre",
				id: "name",
				isRowHeader: true,
				minWidth: 260,
			},
			{
				accessorKey: "bodyPart",
				allowsSorting: true,
				cell: ( exercise ) => <span>{ formatBodyPart( exercise.bodyPart ) }</span>,
				header: "Parte del cuerpo",
				id: "bodyPart",
				minWidth: 180,
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
		bodyPartFilter,
		changePage,
		clearFilters,
		filteredExercises,
		hasFilters,
		nameFilter,
		pagination,
		updateBodyPartFilter,
		updateNameFilter,
	} = useExerciseList( { exercises } );
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
				bodyPartFilter={ bodyPartFilter }
				hasFilters={ hasFilters }
				layout={ "desktop" }
				nameFilter={ nameFilter }
				onBodyPartFilterChangeAction={ updateBodyPartFilter }
				onClearFiltersAction={ clearFilters }
				onNameFilterChangeAction={ updateNameFilter }
			/>

			{ filteredExercises.length === 0 ? (
				<CoachExercisesEmptyState message={ "No hay ejercicios que coincidan con los filtros" }/>
			) : (
				<>
					<DataGrid
						aria-label={ "Listado de ejercicios" }
						columns={ columns }
						contentClassName={ "min-w-full sm:min-w-[760px]" }
						data={ paginatedExercises }
						getRowId={ ( exercise ) => exercise.id }
					/>

					<ListPagination
						currentPage={ currentPage }
						itemLabel={ "ejercicios" }
						mode={ "full" }
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
