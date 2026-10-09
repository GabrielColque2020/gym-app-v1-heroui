"use client";

import type { DataGridColumn } from "@heroui-pro/react";
import { DataGrid } from "@heroui-pro/react";
import { Chip } from "@heroui/react";
import { useMemo } from "react";

import { ListPagination } from "@/components/common";
import { MediaPreviewThumbnail } from "@/components/common/media-preview-thumbnail";
import {
	CoachExercisesEmptyState
} from "@/features/role/coach/exercises/components/shared/coach-exercises-empty-state";
import { ExerciseFilters } from "@/features/role/coach/exercises/components/shared/exercise-filters";
import { ExerciseRowActions } from "@/features/role/coach/exercises/components/desktop/exercise-row-actions";
import { useCoachExerciseList } from "@/features/role/coach/exercises/hooks/use-coach-exercise-list";
import {
	formatCoachExerciseSource,
	formatCoachExerciseSummary
} from "@/features/role/coach/exercises/services/coach-exercise-formatters";
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
						{ /* Al pasar el mouse se ve el movimiento en grande, igual que al
						     agregar un ejercicio a la rutina. */ }
						<MediaPreviewThumbnail
							imageUrl={ exercise.imageUrl }
							name={ exercise.name }
							thumbnailClassName={ "size-18" }
							videoUrl={ exercise.videoUrl }
						/>
						<div className={ "flex min-w-0 flex-col" }>
							<span className={ "line-clamp-2 font-medium text-foreground" }>{ exercise.name }</span>
							<span className={ "truncate text-xs text-muted" }>{ formatCoachExerciseSummary( exercise ) || "Sin datos adicionales" }</span>
						</div>
					</div>
				),
				header: "Nombre",
				// Los anchos minimos suman 750: la tabla se muestra desde 768 y entra entera.
				id: "name",
				isRowHeader: true,
				minWidth: 250,
			},
			{
				accessorKey: "category",
				allowsSorting: true,
				cell: ( exercise ) => <span>{ exercise.category }</span>,
				header: "Categoría",
				id: "category",
				minWidth: 150,
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
				minWidth: 110,
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
				minWidth: 100,
			},
			{
				cell: ( exercise ) => <ExerciseRowActions exercise={ exercise }/>,
				header: "Acciones",
				id: "actions",
				minWidth: 190,
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
						contentClassName={ "min-w-full" }
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
