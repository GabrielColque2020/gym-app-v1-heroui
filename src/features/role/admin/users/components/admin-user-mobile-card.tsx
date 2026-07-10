"use client";

import type { AdminUserListItem } from "@/features/role/admin/users/actions/get-admin-users";

import { Card, Chip } from "@heroui/react";

import { AdminUserRowActions } from "@/features/role/admin/users/components/admin-user-row-actions";

type AdminUserMobileCardProps = {
	user: AdminUserListItem;
};

export function AdminUserMobileCard( { user }: AdminUserMobileCardProps ) {
	const coachLabel = user.role === "STUDENT"
		? user.coach?.name ?? "Sin coach"
		: "No aplica";

	return (
		<Card className={ "border border-border" } variant={ "default" }>
			<Card.Content className={ "space-y-3 p-4" }>
				<div className={ "flex items-start justify-between gap-3" }>
					<div className={ "min-w-0" }>
						<p className={ "truncate text-base font-semibold text-foreground" }>{ user.name }</p>
						<p className={ "truncate text-sm text-muted" }>{ user.email }</p>
					</div>
					<Chip color={ user.active ? "success" : "danger" } size={ "sm" } variant={ "soft" }>
						{ user.active ? "Activo" : "Inactivo" }
					</Chip>
				</div>

				<div className={ "grid grid-cols-2 gap-3 text-sm" }>
					<div>
						<p className={ "text-muted" }>Rol</p>
						<p className={ "font-medium text-foreground" }>{ user.role }</p>
					</div>
					<div>
						<p className={ "text-muted" }>DNI</p>
						<p className={ "font-medium text-foreground" }>{ user.dni }</p>
					</div>
					<div className={ "col-span-2" }>
						<p className={ "text-muted" }>Coach</p>
						<p className={ "font-medium text-foreground" }>{ coachLabel }</p>
					</div>
				</div>

				<div className={ "flex items-center justify-between gap-2 pt-1" }>
					<AdminUserRowActions user={ user }/>
				</div>
			</Card.Content>
		</Card>
	);
}
