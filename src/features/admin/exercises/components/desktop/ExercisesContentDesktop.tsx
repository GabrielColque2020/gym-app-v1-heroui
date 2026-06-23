"use client";

import type { DataGridColumn } from "@heroui-pro/react";
import type { ExerciseListItem } from "@/features/admin/exercises/actions/get-exercises";

import { DataGrid } from "@heroui-pro/react";
import { Button, Card, Chip, Spinner } from "@heroui/react";
import { CircleCheck, TrashBin } from "@gravity-ui/icons";
import { useMemo } from "react";

import { ListPagination } from "@/components/common";
import { ExerciseFilters } from "@/features/admin/exercises/components/shared/ExerciseFilters";
import { ExerciseFormSheet } from "@/features/admin/exercises/components/shared/ExerciseFormSheet";
import { useExerciseList } from "@/features/admin/exercises/hooks/useExerciseList";
import { useExerciseStatusAction } from "@/features/admin/exercises/hooks/useExerciseStatusAction";
import { formatBodyPart } from "@/features/admin/exercises/services/exercise-form";

type ExercisesContentDesktopProps = {
	exercises: ExerciseListItem[];
};

function ExerciseRowActions( { exercise }: { exercise: ExerciseListItem } ) {
	const { changeStatus, isPending, statusClassName, statusLabel } = useExerciseStatusAction( { exercise } );

	return (
		<div className={ "flex items-center justify-start gap-2" }>
			<ExerciseFormSheet exercise={ exercise } mode={ "edit" }/>
			<Button
				isIconOnly
				aria-label={ `${ statusLabel } ${ exercise.name }` }
				className={ statusClassName }
				isDisabled={ isPending }
				size={ "sm" }
				variant={ "ghost" }
				onPress={ changeStatus }
			>
				{ isPending ? (
					<Spinner color={ "current" } size={ "sm" }/>
				) : exercise.active ? (
					<TrashBin className={ "size-4" }/>
				) : (
					<CircleCheck className={ "size-4" }/>
				) }
			</Button>
		</div>
	);
}

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
		return (
			<Card className={ "border border-dashed border-border bg-surface-secondary" } variant={ "default" }>
				<Card.Content className={ "py-10 text-center text-sm text-muted" }>
					No hay ejercicios cargados
				</Card.Content>
			</Card>
		);
	}

	return (
		<div className={ "flex w-full flex-col gap-4" }>
			<ExerciseFilters
				bodyPartFilter={ bodyPartFilter }
				hasFilters={ hasFilters }
				layout={ "desktop" }
				nameFilter={ nameFilter }
				onBodyPartFilterChange={ updateBodyPartFilter }
				onClearFilters={ clearFilters }
				onNameFilterChange={ updateNameFilter }
			/>

			{ filteredExercises.length === 0 ? (
				<Card className={ "border border-dashed border-border bg-surface-secondary" } variant={ "default" }>
					<Card.Content className={ "py-10 text-center text-sm text-muted" }>
						No hay ejercicios que coincidan con los filtros
					</Card.Content>
				</Card>
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
						onPageChange={ changePage }
					/>
				</>
			) }
		</div>
	);
}
