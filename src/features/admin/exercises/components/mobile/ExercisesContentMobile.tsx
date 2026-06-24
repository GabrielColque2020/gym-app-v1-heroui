"use client";

import type { ExerciseListItem } from "@/features/admin/exercises/actions/get-exercises";
import type { Key } from "@heroui/react";

import {
	Button,
	Card,
	Chip,
	Dropdown,
	Header,
	Label,
	Spinner,
} from "@heroui/react";
import { CircleCheck, EllipsisVertical, Pencil, TrashBin } from "@gravity-ui/icons";
import { useState } from "react";

import { ListPagination } from "@/components/common";
import { ExerciseFilters } from "@/features/admin/exercises/components/shared/ExerciseFilters";
import { ExerciseSheet } from "@/features/admin/exercises/components/shared/ExerciseSheet";
import { useExerciseList } from "@/features/admin/exercises/hooks/useExerciseList";
import { useExerciseStatusAction } from "@/features/admin/exercises/hooks/useExerciseStatusAction";
import { formatBodyPart } from "@/features/admin/exercises/services/exercise-form";

type ExercisesTableMobileProps = {
	exercises: ExerciseListItem[];
};

function ExerciseIcon() {
	return (
		<svg
			aria-hidden
			className={ "size-8" }
			fill={ "none" }
			stroke={ "currentColor" }
			strokeLinecap={ "round" }
			strokeLinejoin={ "round" }
			strokeWidth={ 2 }
			viewBox={ "0 0 32 32" }
		>
			<path d={ "M6 10v12" }/>
			<path d={ "M10 8v16" }/>
			<path d={ "M22 8v16" }/>
			<path d={ "M26 10v12" }/>
			<path d={ "M10 16h12" }/>
			<path d={ "M16 16v9" }/>
			<path d={ "M13 25h6" }/>
		</svg>
	);
}

function ExerciseMobileCard( { exercise }: { exercise: ExerciseListItem } ) {
	const [ isEditOpen, setIsEditOpen ] = useState( false );
	const { changeStatus, isPending, statusLabel } = useExerciseStatusAction( { exercise } );

	function handleAction( key: Key ) {
		if (key === "edit") {
			setIsEditOpen( true );

			return;
		}

		if (key === "status") {
			void changeStatus();
		}
	}

	return (
		<Card className={ "overflow-hidden rounded-2xl border border-border/70 shadow-sm" } variant={ "default" }>
			<Card.Content className={ "py-1" }>
				<div className={ "grid grid-cols-[4rem_1fr_auto] items-start gap-3" }>
					<div className={ "flex size-16 items-center justify-center rounded-full bg-accent-soft text-accent" }>
						<ExerciseIcon/>
					</div>

					<div className={ "min-w-0" }>
						<h3 className={ "truncate text-lg font-semibold leading-6 text-foreground" }>{ exercise.name }</h3>
						<p className={ "mt-1 truncate text-sm font-medium text-muted" }>
							{ formatBodyPart( exercise.bodyPart ) }
						</p>
						<Chip
							className={ "mt-2 w-fit px-2" }
							color={ exercise.active ? "success" : "danger" }
							size={ "sm" }
							variant={ "soft" }
						>
							{ exercise.active ? "Activo" : "Inactivo" }
						</Chip>
					</div>

					<Dropdown>
						<Button
							isIconOnly
							aria-label={ `Opciones de ${ exercise.name }` }
							className={ "size-8 shrink-0 text-foreground" }
							isDisabled={ isPending }
							variant={ "ghost" }
						>
							{ isPending ? (
								<Spinner color={ "current" } size={ "sm" }/>
							) : (
								<EllipsisVertical className={ "size-5" }/>
							) }
						</Button>
						<Dropdown.Popover placement={ "bottom end" }>
							<Dropdown.Menu onAction={ handleAction }>
								<Header>Opciones</Header>
								<Dropdown.Item id={ "edit" } textValue={ "Editar" }>
									<Pencil className={ "size-4 shrink-0 text-warning" }/>
									<Label className={ "text-warning" }>Editar</Label>
								</Dropdown.Item>
								<Dropdown.Item
									id={ "status" }
									textValue={ statusLabel }
									variant={ exercise.active ? "danger" : "default" }
								>
									{ exercise.active ? (
										<TrashBin className={ "size-4 shrink-0 text-danger" }/>
									) : (
										<CircleCheck className={ "size-4 shrink-0 text-success" }/>
									) }
									<Label>{ statusLabel }</Label>
								</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown.Popover>
					</Dropdown>
				</div>
			</Card.Content>

			<ExerciseSheet
				hideTrigger
				exercise={ exercise }
				isOpen={ isEditOpen }
				mode={ "edit" }
				placement={ "bottom" }
				onOpenChange={ setIsEditOpen }
			/>
		</Card>
	);
}

export function ExercisesContentMobile( { exercises }: ExercisesTableMobileProps ) {
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
				layout={ "mobile" }
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
					<div className={ "grid gap-3" }>
						{ paginatedExercises.map( ( exercise ) => (
							<ExerciseMobileCard key={ exercise.id } exercise={ exercise }/>
						) ) }
					</div>

					<ListPagination
						currentPage={ currentPage }
						mode={ "compact" }
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
