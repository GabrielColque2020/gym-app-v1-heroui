"use client";

import type { Key } from "@heroui/react";
import type { AdminUserListItem } from "@/features/role/admin/users/actions/get-admin-users";

import { Button, Dropdown, Header, Label, Spinner, toast } from "@heroui/react";
import { CheckCircle2, MoreVertical, PencilLine, Trash2 } from "lucide-react";
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
			toast.success( user.active ? "Usuario desactivado" : "Usuario activado", {
				description: `${ user.name } quedo actualizado.`,
			} );
		} catch {
			toast.danger( "Error al actualizar usuario", {
				description: "No se pudo cambiar el estado de la cuenta.",
			} );
		}
	}

	async function handleDelete() {
		if (!canDelete) return;

		try {
			await deleteMutation.mutateAsync( {
				id: user.id,
			} );
			toast.success( user.role === "COACH" ? "Coach eliminado" : "Estudiante eliminado", {
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
					className={ "size-8 shrink-0 text-foreground" }
					size={ "sm" }
					variant={ "ghost" }
				>
					{ mutation.isPending ? <Spinner color={ "current" } size={ "sm" }/> : <MoreVertical className={ "size-4" }/> }
				</Button>
				<Dropdown.Popover placement={ "bottom end" }>
					<Dropdown.Menu onAction={ handleAction }>
						<Header>Opciones</Header>
						<Dropdown.Item id={ "edit" } textValue={ "Editar usuario" }>
							<PencilLine className={ "size-4 shrink-0 text-warning" }/>
							<Label className={ "text-warning" }>Editar</Label>
						</Dropdown.Item>
						{ canToggle ? (
							<Dropdown.Item id={ "toggle" } textValue={ user.active ? "Desactivar usuario" : "Activar usuario" } variant={ "danger" }>
								{ user.active ? <Trash2 className={ "size-4 shrink-0 text-danger" }/> : <CheckCircle2 className={ "size-4 shrink-0 text-success" }/> }
								<Label className={ user.active ? "text-danger" : "text-success" }>
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
