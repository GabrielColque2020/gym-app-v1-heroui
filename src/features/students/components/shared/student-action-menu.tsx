"use client";

import type { StudentListItem } from "@/features/students/actions/get-students";
import type { Key } from "@heroui/react";
import { Button, Dropdown, Header, Label, Spinner } from "@heroui/react";

import { useState } from "react";
import { CheckCircle2, EllipsisVertical, PencilLine, Trash2 } from "lucide-react";

import { StudentDrawer } from "@/features/students/components/shared/student-drawer";
import { useStudentStatusAction } from "@/features/students/hooks/use-student-status-action";
import { useResponsiveDrawerPlacement } from "@/features/shared/hooks/use-responsive-drawer-placement";

type StudentActionMenuProps = {
	student: StudentListItem;
};

export function StudentActionMenu( { student }: StudentActionMenuProps ) {
	const [ isEditOpen, setIsEditOpen ] = useState( false );
	const { changeStatus, isPending, statusLabel } = useStudentStatusAction( { student } );
	const placement = useResponsiveDrawerPlacement();

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
		<>
			<Dropdown>
				<Button
					isIconOnly
					aria-label={ `Opciones de ${ student.name }` }
					className={ "size-8 shrink-0 text-foreground" }
					isDisabled={ isPending }
					size={ "sm" }
					variant={ "ghost" }
				>
					{ isPending ? (
						<Spinner color={ "current" } size={ "sm" }/>
					) : (
						<EllipsisVertical className={ "size-4" }/>
					) }
				</Button>
				<Dropdown.Popover placement={ "bottom end" }>
					<Dropdown.Menu onAction={ handleAction }>
						<Header>Opciones</Header>
						<Dropdown.Item id={ "edit" } textValue={ "Editar" }>
							<PencilLine className={ "size-4 shrink-0 text-warning" }/>
							<Label className={ "text-warning" }>Editar</Label>
						</Dropdown.Item>
						<Dropdown.Item
							id={ "status" }
							textValue={ statusLabel }
							variant={ student.active ? "danger" : "default" }
						>
							{ student.active ? (
								<Trash2 className={ "size-4 shrink-0 text-danger" }/>
							) : (
								<CheckCircle2 className={ "size-4 shrink-0 text-success" }/>
							) }
							<Label className={ student.active ? "text-danger" : "text-success" }>{ statusLabel }</Label>
						</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown.Popover>
			</Dropdown>

			<StudentDrawer
				hideTrigger
				isOpen={ isEditOpen }
				mode={ "edit" }
				placement={ placement }
				student={ student }
				onOpenChangeAction={ setIsEditOpen }
			/>
		</>
	);
}
