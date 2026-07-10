"use client";

import type { Key } from "@heroui/react";
import type { AdminUserListItem } from "@/features/role/admin/users/actions/get-admin-users";

import { Button, Dropdown, Header, Label, Spinner, toast } from "@heroui/react";
import { CheckCircle2, MoreVertical, PencilLine, Trash2, Users } from "lucide-react";
import { useState } from "react";

import { AdminAssignCoachDrawer } from "@/features/role/admin/users/components/admin-assign-coach-drawer";
import { AdminUserDrawer } from "@/features/role/admin/users/components/admin-user-drawer";
import { useToggleUserStatus } from "@/features/role/admin/users/hooks/use-admin-users";

type AdminUserRowActionsProps = {
	user: AdminUserListItem;
};

export function AdminUserRowActions( { user }: AdminUserRowActionsProps ) {
	const mutation = useToggleUserStatus();
	const [ isEditOpen, setIsEditOpen ] = useState( false );
	const [ isAssignCoachOpen, setIsAssignCoachOpen ] = useState( false );
	const isProtected = user.role === "ADMIN";
	const nextActive = !user.active;

	function handleAction( key: Key ) {
		if (key === "edit") {
			setIsEditOpen( true );
			return;
		}

		if (key === "assign-coach") {
			setIsAssignCoachOpen( true );
			return;
		}

		if (key === "toggle") {
			void handleToggle();
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
						{ user.role === "STUDENT" ? (
							<Dropdown.Item id={ "assign-coach" } textValue={ "Asignar coach" }>
								<Users className={ "size-4 shrink-0 text-accent" }/>
								<Label className={ "text-accent" }>Asignar coach</Label>
							</Dropdown.Item>
						) : null }
						<Dropdown.Item id={ "toggle" } textValue={ user.active ? "Desactivar usuario" : "Activar usuario" } variant={ isProtected ? "default" : "danger" }>
							{ user.active ? <Trash2 className={ "size-4 shrink-0 text-danger" }/> : <CheckCircle2 className={ "size-4 shrink-0 text-success" }/> }
							<Label className={ user.active ? "text-danger" : "text-success" }>
								{ user.active ? "Desactivar" : "Activar" }
							</Label>
						</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown.Popover>
			</Dropdown>

			<AdminUserDrawer hideTrigger isOpen={ isEditOpen } user={ user } onOpenChangeAction={ setIsEditOpen }/>
			{ user.role === "STUDENT" ? (
				<AdminAssignCoachDrawer
					hideTrigger
					isOpen={ isAssignCoachOpen }
					student={ user }
					onOpenChangeAction={ setIsAssignCoachOpen }
				/>
			) : null }
		</>
	);
}
