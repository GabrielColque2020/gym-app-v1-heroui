"use client";

import type { StudentListItem } from "@/features/admin/user/student/actions/get-students";
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
import { CircleCheck, EllipsisVertical, Pencil, Person, TrashBin } from "@gravity-ui/icons";
import { useState } from "react";

import { ListPagination } from "@/components/common";
import { StudentFilters } from "@/features/admin/user/student/components/shared/StudentFilters";
import { StudentFormSheet } from "@/features/admin/user/student/components/shared/StudentFormSheet";
import { useStudentList } from "@/features/admin/user/student/hooks/useStudentList";
import { useStudentStatusAction } from "@/features/admin/user/student/hooks/useStudentStatusAction";

type StudentsContentMobileProps = {
	students: StudentListItem[];
};

function StudentMobileCard( { student }: { student: StudentListItem } ) {
	const [ isEditOpen, setIsEditOpen ] = useState( false );
	const { changeStatus, isPending, statusLabel } = useStudentStatusAction( { student } );

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
						<Person className={ "size-8" }/>
					</div>

					<div className={ "min-w-0" }>
						<h3 className={ "truncate text-lg font-semibold leading-6 text-foreground" }>{ student.name }</h3>
						<p className={ "mt-1 truncate text-sm font-medium text-muted" }>{ student.email }</p>
						<p className={ "mt-0.5 truncate text-xs text-muted" }>DNI { student.dni }</p>
						<Chip
							className={ "mt-2 w-fit px-2" }
							color={ student.active ? "success" : "danger" }
							size={ "sm" }
							variant={ "soft" }
						>
							{ student.active ? "Activo" : "Inactivo" }
						</Chip>
					</div>

					<Dropdown>
						<Button
							isIconOnly
							aria-label={ `Opciones de ${ student.name }` }
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
									variant={ student.active ? "danger" : "default" }
								>
									{ student.active ? (
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

			<StudentFormSheet
				hideTrigger
				isOpen={ isEditOpen }
				mode={ "edit" }
				placement={ "bottom" }
				student={ student }
				onOpenChange={ setIsEditOpen }
			/>
		</Card>
	);
}

export function StudentsContentMobile( { students }: StudentsContentMobileProps ) {
	const {
		changePage,
		clearFilters,
		filteredStudents,
		hasFilters,
		pagination,
		searchFilter,
		statusFilter,
		updateSearchFilter,
		updateStatusFilter,
	} = useStudentList( { students } );
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
					No hay estudiantes cargados
				</Card.Content>
			</Card>
		);
	}

	return (
		<div className={ "flex w-full flex-col gap-4" }>
			<StudentFilters
				hasFilters={ hasFilters }
				layout={ "mobile" }
				searchFilter={ searchFilter }
				statusFilter={ statusFilter }
				onClearFilters={ clearFilters }
				onSearchFilterChange={ updateSearchFilter }
				onStatusFilterChange={ updateStatusFilter }
			/>

			{ filteredStudents.length === 0 ? (
				<Card className={ "border border-dashed border-border bg-surface-secondary" } variant={ "default" }>
					<Card.Content className={ "py-10 text-center text-sm text-muted" }>
						No hay estudiantes que coincidan con los filtros
					</Card.Content>
				</Card>
			) : (
				<>
					<div className={ "grid gap-3" }>
						{ paginatedStudents.map( ( student ) => (
							<StudentMobileCard key={ student.id } student={ student }/>
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
