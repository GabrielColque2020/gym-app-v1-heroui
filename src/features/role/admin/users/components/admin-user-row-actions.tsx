"use client";

import type { Key } from "@heroui/react";
import type { AdminUserListItem } from "@/features/role/admin/users/actions/get-admin-users";

import { Button, Dropdown, Header, Label, Modal, Spinner, toast } from "@heroui/react";
import { CheckCircle2, CircleSlash, EllipsisVertical, PencilLine, Trash2 } from "lucide-react";
import { useState } from "react";

import { AdminDeleteUserDrawer } from "@/features/role/admin/users/components/admin-delete-user-drawer";
import { AdminStudentDrawer } from "@/features/role/admin/users/components/admin-student-drawer";
import { AdminUserDrawer } from "@/features/role/admin/users/components/admin-user-drawer";
import { useDeleteAdminUser, useToggleUserStatus } from "@/features/role/admin/users/hooks/use-admin-users";

type AdminUserRowActionsProps = {
	user: AdminUserListItem;
};

export function AdminUserRowActions( { user }: AdminUserRowActionsProps ) {
	const mutation = useToggleUserStatus();
	const deleteMutation = useDeleteAdminUser();
	const [ isEditOpen, setIsEditOpen ] = useState( false );
	const [ isDeleteOpen, setIsDeleteOpen ] = useState( false );
	const [ isDeactivateOpen, setIsDeactivateOpen ] = useState( false );
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
						{ canToggle ? (
							<Dropdown.Item id={ "toggle" } textValue={ user.active ? "Desactivar usuario" : "Activar usuario" }>
								{ /* El tacho queda solo para eliminar: desactivar se puede revertir. */ }
								{ user.active ? <CircleSlash className={ "size-4 shrink-0 text-warning" }/> : <CheckCircle2 className={ "size-4 shrink-0 text-success" }/> }
								<Label className={ user.active ? "text-warning" : "text-success" }>
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
							{ user.role === "COACH" ? (
								<p className={ "text-sm font-medium leading-6 text-warning" }>
									Sus estudiantes siguen asignados a este entrenador. Si no va a volver, reasignalos a otro.
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
			<AdminDeleteUserDrawer
				deleteErrorMessage={ deleteMutation.isError ? deleteMutation.error.message : undefined }
				isDeleting={ deleteMutation.isPending }
				isOpen={ isDeleteOpen }
				user={ user }
				onCloseAction={ () => handleDeleteOpenChange( false ) }
				onConfirmAction={ handleDelete }
			/>
		</>
	);
}
