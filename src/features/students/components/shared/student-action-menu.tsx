"use client";

import type { StudentListItem } from "@/features/students/actions/get-students";
import type { Key } from "@heroui/react";
import { Button, Dropdown, Header, Label, Spinner } from "@heroui/react";

import { useState } from "react";
import { CheckCircle2, CircleSlash, EllipsisVertical, PencilLine } from "lucide-react";

import { StudentDrawer } from "@/features/students/components/shared/student-drawer";
import { useStudentStatusAction } from "@/features/students/hooks/use-student-status-action";
import { DeactivateConfirmModal } from "@/features/shared/components/deactivate-confirm-modal";
import { useResponsiveDrawerPlacement } from "@/features/shared/hooks/use-responsive-drawer-placement";

type StudentActionMenuProps = {
	student: StudentListItem;
};

export function StudentActionMenu( { student }: StudentActionMenuProps ) {
	const [ isEditOpen, setIsEditOpen ] = useState( false );
	const [ isDeactivateOpen, setIsDeactivateOpen ] = useState( false );
	const { changeStatus, isPending, statusLabel } = useStudentStatusAction( { student } );
	const placement = useResponsiveDrawerPlacement();

	function handleAction( key: Key ) {
		if (key === "edit") {
			setIsEditOpen( true );
			return;
		}

		if (key === "status") {
			// Desactivar pide confirmar; restaurar no, porque no le saca nada a nadie.
			if (student.active) {
				setIsDeactivateOpen( true );
				return;
			}

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
							<PencilLine className={ "size-4 shrink-0 text-foreground" }/>
							<Label>Editar</Label>
						</Dropdown.Item>
						<Dropdown.Item
							id={ "status" }
							textValue={ statusLabel }
							variant={ student.active ? "danger" : "default" }
						>
							{ /* Desactivar va en rojo porque le corta el acceso a alguien o saca
							     un ejercicio de uso. El tacho queda solo para eliminar. */ }
							{ student.active ? (
								<CircleSlash className={ "size-4 shrink-0 text-danger" }/>
							) : (
								<CheckCircle2 className={ "size-4 shrink-0 text-foreground" }/>
							) }
							<Label className={ student.active ? "text-danger" : undefined }>{ statusLabel }</Label>
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
			<DeactivateConfirmModal
				description={ "No va a poder entrar a la app hasta que lo restaures. Su rutina, su plan y su historial no se borran." }
				isOpen={ isDeactivateOpen }
				isPending={ isPending }
				title={ `Desactivar a ${ student.name }` }
				onConfirmAction={ changeStatus }
				onOpenChangeAction={ setIsDeactivateOpen }
			/>
		</>
	);
}
