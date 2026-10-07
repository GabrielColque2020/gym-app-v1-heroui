"use client";

import type { AdminUserListItem } from "@/features/role/admin/users/actions/get-admin-users";

import { Card, Chip } from "@heroui/react";

import { AdminUserRowActions } from "@/features/role/admin/users/components/admin-user-row-actions";
import { getAdminRoleLabel } from "@/features/role/admin/users/services/admin-user-labels";

type AdminUserMobileCardProps = {
	user: AdminUserListItem;
};

// Fila compacta: en una pantalla de telefono entran varias cuentas, no una y media.
export function AdminUserMobileCard( { user }: AdminUserMobileCardProps ) {
	return (
		<Card className={ "border border-border" } variant={ "default" }>
			<Card.Content className={ "space-y-2 p-3" }>
				<div className={ "flex items-start justify-between gap-2" }>
					<div className={ "min-w-0" }>
						<p className={ "truncate text-base font-semibold text-foreground" }>{ user.name }</p>
						<p className={ "truncate text-sm text-muted" }>{ user.email }</p>
					</div>
					<AdminUserRowActions user={ user }/>
				</div>

				<div className={ "flex flex-wrap items-center gap-x-2 gap-y-1" }>
					<Chip size={ "sm" } variant={ "soft" }>{ getAdminRoleLabel( user.role ) }</Chip>
					<Chip color={ user.active ? "success" : "danger" } size={ "sm" } variant={ "soft" }>
						{ user.active ? "Activo" : "Inactivo" }
					</Chip>
					<span className={ "text-xs text-muted" }>DNI { user.dni }</span>
				</div>

				{ /* Solo los estudiantes tienen entrenador. */ }
				{ user.role === "STUDENT" ? (
					<p className={ "truncate text-sm text-muted" }>
						Entrenador: { " " }
						<span className={ user.coach ? "font-medium text-foreground" : "font-medium text-warning" }>
							{ user.coach ? user.coach.name : "sin asignar" }
						</span>
						{ user.coach && !user.coach.active ? " (inactivo)" : null }
					</p>
				) : null }
			</Card.Content>
		</Card>
	);
}
