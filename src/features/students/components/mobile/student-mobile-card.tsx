"use client";

import type { StudentListItem } from "@/features/students/actions/get-students";
import type { Key } from "@heroui/react";

import { CircleCheck, EllipsisVertical, Pencil, Person, TrashBin } from "@gravity-ui/icons";
import {
	Button,
	Card,
	Chip,
	Dropdown,
	Header,
	Label,
	Spinner,
} from "@heroui/react";
import { useState } from "react";

import { StudentSheet } from "@/features/students/components/shared/student-sheet";
import { useStudentStatusAction } from "@/features/students/hooks/use-student-status-action";

type StudentMobileCardProps = {
	student: StudentListItem;
};

export function StudentMobileCard( { student }: StudentMobileCardProps ) {
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

			<StudentSheet
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
