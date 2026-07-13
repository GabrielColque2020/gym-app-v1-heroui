"use client";

import type { AdminUserListItem } from "@/features/role/admin/users/actions/get-admin-users";

import { Alert, Button, Description, Drawer, Spinner, Surface } from "@heroui/react";
import { Trash2 } from "lucide-react";

import { FeatureDrawerLayout } from "@/features/shared/components/feature-drawer-layout";
import { useResponsiveDrawerPlacement } from "@/features/shared/hooks/use-responsive-drawer-placement";
import { AdminDeleteUserSummaryRow } from "@/features/role/admin/users/components/admin-delete-user-summary-row";

type AdminDeleteUserDrawerProps = {
	deleteErrorMessage?: string;
	isOpen: boolean;
	isDeleting: boolean;
	user: AdminUserListItem;
	onCloseAction: () => void;
	onConfirmAction: () => void;
};

export function AdminDeleteUserDrawer( {
	deleteErrorMessage,
	isOpen,
	isDeleting,
	user,
	onCloseAction,
	onConfirmAction,
}: AdminDeleteUserDrawerProps ) {
	const placement = useResponsiveDrawerPlacement();
	const roleLabel = user.role === "COACH" ? "Coach" : "Estudiante";
	const impactLabel = user.role === "COACH"
		? "Se desacoplaran sus estudiantes y sus ejercicios quedaran sin coach asignado."
		: "Se eliminaran sus rutinas, planes alimenticios, progreso, relacion con coach y demas datos asociados.";

	return (
		<FeatureDrawerLayout
			isDismissable={ false }
			isOpen={ isOpen }
			placement={ placement }
			rightContentClassName={ "w-[34rem] px-5 pt-5 pb-4" }
			onOpenChangeAction={ onCloseAction }
		>
			<Drawer.Header className={ "border-default-100 relative border-b pb-4" }>
				<div className={ "flex min-w-0 items-start gap-3 pe-10" }>
					<div className={ "flex size-10 shrink-0 items-center justify-center rounded-xl border border-danger/20 bg-danger/10 text-danger" }>
						<Trash2 className={ "size-5" }/>
					</div>
					<div className={ "min-w-0 flex-1" }>
						<Drawer.Heading>Eliminar { roleLabel.toLowerCase() }</Drawer.Heading>
						<Description className={ "mt-1 text-sm" }>
							Esta accion no se puede deshacer.
						</Description>
					</div>
				</div>
			</Drawer.Header>

			<Drawer.Body className={ "min-h-0 flex-1 space-y-6 overflow-y-auto py-3" }>
				<Alert className={ "border border-danger/20" } status={ "danger" }>
					<Alert.Content>
						<Alert.Title>Accion irreversible</Alert.Title>
						<Alert.Description>{ impactLabel }</Alert.Description>
					</Alert.Content>
				</Alert>

				{ deleteErrorMessage ? (
					<Alert className={ "border border-danger/20" } status={ "danger" }>
						<Alert.Content>
							<Alert.Title>Error al eliminar</Alert.Title>
							<Alert.Description>{ deleteErrorMessage }</Alert.Description>
						</Alert.Content>
					</Alert>
				) : null }

				<Surface className={ "rounded-xl border border-default-hover bg-surface p-4" }>
					<div className={ "grid gap-3" }>
						<AdminDeleteUserSummaryRow label={ "Nombre" } value={ user.name }/>
						<AdminDeleteUserSummaryRow label={ "Email" } value={ user.email }/>
						<AdminDeleteUserSummaryRow label={ "DNI" } value={ user.dni }/>
						<AdminDeleteUserSummaryRow label={ "Rol" } value={ roleLabel }/>
						{ user.role === "STUDENT" ? (
							<AdminDeleteUserSummaryRow label={ "Coach actual" } value={ user.coach?.name ?? "Sin coach" }/>
						) : null }
					</div>
				</Surface>
			</Drawer.Body>

			<Drawer.Footer className={ "border-default-100 shrink-0 justify-end gap-2 border-t pt-4" }>
				<Button isDisabled={ isDeleting } variant={ "secondary" } onPress={ onCloseAction }>
					Cancelar
				</Button>
				<Button
					className={ "bg-danger text-danger-foreground" }
					isDisabled={ isDeleting }
					isPending={ isDeleting }
					onPress={ onConfirmAction }
				>
					{ ( { isPending } ) => (
						<>
							{ isPending ? <Spinner color={ "current" } size={ "sm" }/> : <Trash2 className={ "size-4" }/> }
							{ isPending ? "Eliminando..." : "Eliminar permanentemente" }
						</>
					) }
				</Button>
			</Drawer.Footer>
		</FeatureDrawerLayout>
	);
}
