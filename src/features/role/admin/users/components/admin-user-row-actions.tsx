"use client";

import type { Key } from "@heroui/react";
import type { AdminUserListItem } from "@/features/role/admin/users/actions/get-admin-users";

import { Button, Dropdown, Header, Label, Modal, Spinner, toast } from "@heroui/react";
import { ArrowRightLeft, CheckCircle2, CircleSlash, EllipsisVertical, PencilLine, Trash2 } from "lucide-react";
import { useState } from "react";

import { AdminDeleteUserDrawer } from "@/features/role/admin/users/components/admin-delete-user-drawer";
import { AdminReassignStudentsModal } from "@/features/role/admin/users/components/admin-reassign-students-modal";
import { AdminStudentDrawer } from "@/features/role/admin/users/components/admin-student-drawer";
import { AdminUserDrawer } from "@/features/role/admin/users/components/admin-user-drawer";
import { useAdminUsers, useDeleteAdminUser, useToggleUserStatus } from "@/features/role/admin/users/hooks/use-admin-users";

type AdminUserRowActionsProps = {
	user: AdminUserListItem;
};

export function AdminUserRowActions( { user }: AdminUserRowActionsProps ) {
	const mutation = useToggleUserStatus();
	const deleteMutation = useDeleteAdminUser();
	const [ isEditOpen, setIsEditOpen ] = useState( false );
	const [ isDeleteOpen, setIsDeleteOpen ] = useState( false );
	const [ isDeactivateOpen, setIsDeactivateOpen ] = useState( false );
	const [ isReassignOpen, setIsReassignOpen ] = useState( false );
	const { data: users = [] } = useAdminUsers();
	// Cuantos estudiantes dependen de este entrenador: es lo que se pierde de vista
	// al desactivarlo o eliminarlo.
	const studentCount = user.role === "COACH"
		? users.filter( ( candidate ) => candidate.role === "STUDENT" && candidate.coach?.id === user.id ).length
		: 0;
	const studentCountLabel = studentCount === 1 ? "1 estudiante" : `${ studentCount } estudiantes`;
	const isProtected = user.role === "ADMIN";
	const nextActive = !user.active;
	const canToggle = !isProtected;
	const canDelete = user.role === "COACH" || user.role === "STUDENT";

	function handleAction( key: Key ) {
		if (key === "edit") {
			setIsEditOpen( true );
			return;
		}

		if (key === "toggle") {
			if (!canToggle) return;

			// Desactivar le quita el acceso a la persona: se pide confirmar. Activar no.
			if (user.active) {
				setIsDeactivateOpen( true );
				return;
			}

			void handleToggle();
			return;
		}

		if (key === "reassign") {
			setIsReassignOpen( true );
			return;
		}

		if (key === "delete") {
			deleteMutation.reset();
			setIsDeleteOpen( true );
		}
	}

	async function handleToggle() {
		if (isProtected) return;

		try {
			await mutation.mutateAsync( {
				active: nextActive,
				id: user.id,
			} );
			toast.success( user.active ? "Cuenta desactivada" : "Cuenta activada", {
				description: user.active
					? `${ user.name } ya no puede entrar a la app.`
					: `${ user.name } puede volver a entrar a la app.`,
			} );
			setIsDeactivateOpen( false );
		} catch {
			toast.danger( "No se pudo cambiar el estado", {
				description: "La cuenta quedó como estaba. Probá de nuevo.",
			} );
		}
	}

	async function handleDelete() {
		if (!canDelete) return;

		try {
			await deleteMutation.mutateAsync( {
				id: user.id,
			} );
			toast.success( user.role === "COACH" ? "Entrenador eliminado" : "Estudiante eliminado", {
				description: "La cuenta fue borrada permanentemente.",
			} );
			setIsDeleteOpen( false );
		} catch {
			toast.danger( "Error al eliminar usuario", {
				description: "No se pudo borrar la cuenta permanentemente.",
			} );
		}
	}

	function handleDeleteOpenChange( nextIsOpen: boolean ) {
		if (!nextIsOpen) {
			deleteMutation.reset();
		}

		setIsDeleteOpen( nextIsOpen );
	}

	return (
		<>
			<Dropdown>
				<Button
					isIconOnly
					aria-label={ `Opciones de ${ user.name }` }
					className={ "size-8" }
					variant={ "ghost" }
				>
					{ mutation.isPending ? <Spinner color={ "current" } size={ "sm" }/> : <EllipsisVertical className={ "size-4" }/> }
				</Button>
				<Dropdown.Popover placement={ "bottom end" }>
					<Dropdown.Menu onAction={ handleAction }>
						<Header>Opciones</Header>
						<Dropdown.Item id={ "edit" } textValue={ "Editar usuario" }>
							<PencilLine className={ "size-4 shrink-0" }/>
							<Label>Editar</Label>
						</Dropdown.Item>
						{ studentCount > 0 ? (
							<Dropdown.Item id={ "reassign" } textValue={ "Reasignar estudiantes" }>
								<ArrowRightLeft className={ "size-4 shrink-0" }/>
								<Label>Reasignar estudiantes</Label>
							</Dropdown.Item>
						) : null }
						{ canToggle ? (
							<Dropdown.Item id={ "toggle" } textValue={ user.active ? "Desactivar usuario" : "Activar usuario" } variant={ user.active ? "danger" : "default" }>
								{ /* Desactivar va en rojo: le corta el acceso a la persona. El tacho
								     queda solo para eliminar. */ }
								{ user.active ? <CircleSlash className={ "size-4 shrink-0 text-danger" }/> : <CheckCircle2 className={ "size-4 shrink-0 text-foreground" }/> }
								<Label className={ user.active ? "text-danger" : undefined }>
									{ user.active ? "Desactivar" : "Activar" }
								</Label>
							</Dropdown.Item>
						) : null }
						{ canDelete ? (
							<Dropdown.Item id={ "delete" } textValue={ "Eliminar permanentemente" } variant={ "danger" }>
								<Trash2 className={ "size-4 shrink-0 text-danger" }/>
								<Label className={ "text-danger" }>Eliminar permanentemente</Label>
							</Dropdown.Item>
						) : null }
					</Dropdown.Menu>
				</Dropdown.Popover>
			</Dropdown>

			{ user.role === "STUDENT" ? (
				<AdminStudentDrawer hideTrigger isOpen={ isEditOpen } mode={ "edit" } student={ user } onOpenChangeAction={ setIsEditOpen }/>
			) : (
				<AdminUserDrawer hideTrigger isOpen={ isEditOpen } user={ user } onOpenChangeAction={ setIsEditOpen }/>
			) }
			<Modal.Backdrop
				isDismissable={ false }
				isOpen={ isDeactivateOpen }
				variant={ "blur" }
				onOpenChange={ setIsDeactivateOpen }
			>
				<Modal.Container size={ "sm" }>
					<Modal.Dialog className={ "sm:max-w-md" }>
						<Modal.Header>
							<Modal.Heading>Desactivar a { user.name }</Modal.Heading>
						</Modal.Header>
						<Modal.Body className={ "space-y-3" }>
							<p className={ "text-sm leading-6 text-muted" }>
								No va a poder entrar a la app hasta que vuelvas a activar la cuenta. Sus datos no se borran.
							</p>
							{ studentCount > 0 ? (
								<p className={ "text-sm font-medium leading-6 text-warning" }>
									Tiene { studentCountLabel } a cargo, que { studentCount === 1 ? "queda" : "quedan" } sin nadie que { studentCount === 1 ? "le" : "les" } arme la rutina. Si no va a volver, pasalos a otro con "Reasignar estudiantes".
								</p>
							) : null }
						</Modal.Body>
						<Modal.Footer className={ "gap-2" }>
							<Button isDisabled={ mutation.isPending } variant={ "secondary" } onPress={ () => setIsDeactivateOpen( false ) }>
								Cancelar
							</Button>
							<Button
								className={ "bg-warning text-warning-foreground" }
								isDisabled={ mutation.isPending }
								isPending={ mutation.isPending }
								onPress={ () => void handleToggle() }
							>
								{ mutation.isPending ? <Spinner color={ "current" } size={ "sm" }/> : <CircleSlash className={ "size-4" }/> }
								{ mutation.isPending ? "Desactivando..." : "Desactivar" }
							</Button>
						</Modal.Footer>
					</Modal.Dialog>
				</Modal.Container>
			</Modal.Backdrop>
			{ user.role === "COACH" ? (
				<AdminReassignStudentsModal coach={ user } isOpen={ isReassignOpen } onOpenChangeAction={ setIsReassignOpen }/>
			) : null }
			<AdminDeleteUserDrawer
				deleteErrorMessage={ deleteMutation.isError ? deleteMutation.error.message : undefined }
				isDeleting={ deleteMutation.isPending }
				isOpen={ isDeleteOpen }
				studentCount={ studentCount }
				user={ user }
				onCloseAction={ () => handleDeleteOpenChange( false ) }
				onConfirmAction={ handleDelete }
			/>
		</>
	);
}
