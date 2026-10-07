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
	// Estudiantes a cargo, cuando se elimina a un entrenador.
	studentCount?: number;
	user: AdminUserListItem;
	onCloseAction: () => void;
	onConfirmAction: () => void;
};

export function AdminDeleteUserDrawer( {
	deleteErrorMessage,
	isOpen,
	isDeleting,
	studentCount = 0,
	user,
	onCloseAction,
	onConfirmAction,
}: AdminDeleteUserDrawerProps ) {
	const placement = useResponsiveDrawerPlacement();
	const roleLabel = user.role === "COACH" ? "Entrenador" : "Estudiante";
	const impactLabel = user.role === "COACH"
		? studentCount > 0
			? `Tiene ${ studentCount === 1 ? "1 estudiante" : `${ studentCount } estudiantes` } a cargo, que ${ studentCount === 1 ? "queda" : "quedan" } sin entrenador. Si querés pasarlos a otro, cancelá y usá "Reasignar estudiantes" antes de eliminar. Sus ejercicios propios dejan de tener dueño.`
			: "No tiene estudiantes a cargo. Sus ejercicios propios dejan de tener dueño."
		: "Se eliminan sus rutinas, su plan alimenticio, todo lo que registró y el resto de sus datos.";

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
							Esta acción no se puede deshacer.
						</Description>
					</div>
				</div>
			</Drawer.Header>

			<Drawer.Body className={ "min-h-0 flex-1 space-y-6 overflow-y-auto py-3" }>
				<Alert className={ "border border-danger/20" } status={ "danger" }>
					<Alert.Content>
						<Alert.Title>No se puede deshacer</Alert.Title>
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
							<AdminDeleteUserSummaryRow label={ "Entrenador actual" } value={ user.coach?.name ?? "Sin entrenador" }/>
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
