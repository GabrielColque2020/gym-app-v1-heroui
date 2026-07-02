"use client";

import type { HistoryRoutinesStudentListItem } from "@/features/role/coach/history-routines-students/actions/get-history-routines-students";

import { Button, Card, Chip, Label, SearchField } from "@heroui/react";
import { ArrowRight, Person } from "@gravity-ui/icons";
import { useRouter } from "next/navigation";

import { ListPagination } from "@/components/common";
import { useHistoryRoutinesStudentsList } from "@/features/role/coach/history-routines-students/hooks/useHistoryRoutinesStudentsList";

type HistoryRoutinesStudentsContentMobileProps = {
	students: HistoryRoutinesStudentListItem[];
};

function HistoryRoutineStudentMobileCard( { student }: { student: HistoryRoutinesStudentListItem } ) {
	const router = useRouter();

	return (
		<Card className={ "overflow-hidden rounded-2xl border border-border/70 shadow-sm" } variant={ "default" }>
			<Card.Content className={ "py-1" }>
				<div className={ "grid grid-cols-[4rem_1fr_auto] items-start gap-3" }>
					<div className={ "flex size-16 items-center justify-center rounded-full bg-accent-soft text-accent" }>
						<Person className={ "size-8" }/>
					</div>

					<div className={ "min-w-0" }>
						<h3 className={ "truncate text-lg font-semibold leading-6 text-foreground" }>{ student.name }</h3>
						<p className={ "mt-1 truncate text-sm font-medium text-muted" }>{ student.email }</p>
						<p className={ "mt-0.5 truncate text-xs text-muted" }>DNI { student.dni }</p>
						<Chip className={ "mt-2 w-fit px-2" } color={ "success" } size={ "sm" } variant={ "soft" }>
							Activo
						</Chip>
					</div>

					<Button
						isIconOnly
						aria-label={ `Ver historial de ${ student.name }` }
						className={ "size-8 shrink-0 text-accent" }
						variant={ "ghost" }
						onPress={ () => router.push( `/coach/historyRoutines?studentId=${ student.id }` ) }
					>
						<ArrowRight className={ "size-5" }/>
					</Button>
				</div>
			</Card.Content>
		</Card>
	);
}

export function HistoryRoutinesStudentsContentMobile( { students }: HistoryRoutinesStudentsContentMobileProps ) {
	const {
		changePage,
		clearFilters,
		filteredStudents,
		hasFilters,
		pagination,
		searchFilter,
		updateSearchFilter,
	} = useHistoryRoutinesStudentsList( { students } );
	const {
		currentPage,
		paginatedItems: paginatedStudents,
		showingFrom,
		showingTo,
		totalItems,
		totalPages,
	} = pagination;

	if (students.length === 0) {
		return (
			<Card className={ "border border-dashed border-border bg-surface-secondary" } variant={ "default" }>
				<Card.Content className={ "py-10 text-center text-sm text-muted" }>
					No hay estudiantes activos cargados
				</Card.Content>
			</Card>
		);
	}

	return (
		<div className={ "flex w-full flex-col gap-4" }>
			<div className={ "grid w-full min-w-0 gap-4 overflow-hidden rounded-2xl border border-border bg-surface-secondary px-4 py-5" }>
				<SearchField
					className={ "min-w-0 gap-2" }
					name={ "mobile-history-routine-student-search-filter" }
					value={ searchFilter }
					onChange={ updateSearchFilter }
				>
					<Label>Buscar</Label>
					<SearchField.Group className={ "w-full min-w-0" }>
						<SearchField.SearchIcon/>
						<SearchField.Input className={ "min-w-0" } placeholder={ "Nombre, email o DNI..." }/>
						<SearchField.ClearButton/>
					</SearchField.Group>
				</SearchField>

				<div className={ "grid gap-2" }>
					<Button isDisabled={ !hasFilters } size={ "sm" } variant={ "secondary" } onPress={ clearFilters }>
						Limpiar
					</Button>
				</div>
			</div>

			{ filteredStudents.length === 0 ? (
				<Card className={ "border border-dashed border-border bg-surface-secondary" } variant={ "default" }>
					<Card.Content className={ "py-10 text-center text-sm text-muted" }>
						No hay estudiantes activos que coincidan con la busqueda
					</Card.Content>
				</Card>
			) : (
				<>
					<div className={ "grid gap-3" }>
						{ paginatedStudents.map( ( student ) => (
							<HistoryRoutineStudentMobileCard key={ student.id } student={ student }/>
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
