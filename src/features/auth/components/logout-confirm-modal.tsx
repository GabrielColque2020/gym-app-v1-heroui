"use client";

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { Button, Modal, Spinner, Typography } from "@heroui/react";
import { AlertTriangle, LogOut } from "lucide-react";

import { leaveSession } from "@/features/auth/services/leave-session";

type LogoutConfirmModalProps = {
	isOpen: boolean;
	onOpenChangeAction: ( isOpen: boolean ) => void;
};

export function LogoutConfirmModal( {
	isOpen,
	onOpenChangeAction,
}: LogoutConfirmModalProps ) {
	const queryClient = useQueryClient();
	const [ isLoggingOut, setIsLoggingOut ] = useState( false );

	async function handleLogout() {
		if (isLoggingOut) return;

		setIsLoggingOut( true );

		await leaveSession( queryClient );
	}

	function handleCancel() {
		if (isLoggingOut) return;

		onOpenChangeAction( false );
	}

	return (
		<Modal.Backdrop
			isDismissable={ false }
			isOpen={ isOpen }
			variant={ "blur" }
			onOpenChange={ onOpenChangeAction }
		>
			<Modal.Container placement={ "center" } size={ "sm" }>
				<Modal.Dialog className={ "mx-auto w-full max-w-sm sm:max-w-md" }>
					{ ( { close } ) => (
						<>
							<Modal.Header>
								<Modal.Heading>Cerrar sesión</Modal.Heading>
							</Modal.Header>
							<Modal.Body className={ "space-y-4" }>
								<div className={ "flex items-start gap-3 rounded-xl border border-warning/20 bg-warning/10 p-4 text-warning-foreground" }>
									<AlertTriangle className={ "mt-0.5 size-5 shrink-0 text-warning" }/>
									<div className={ "space-y-1" }>
										<Typography className={ "text-sm font-medium" } type={ "body-sm" }>
											Estas por cerrar sesión.
										</Typography>
										<Typography className={ "text-sm text-muted" } type={ "body-sm" }>
											Los datos no guardados podrian perderse. Antes de continuar, verifica que no
											te falte guardar cambios.
										</Typography>
									</div>
								</div>
							</Modal.Body>
							<Modal.Footer className={ "gap-2" }>
								<Button
									isDisabled={ isLoggingOut }
									variant={ "secondary" }
									onPress={ () => {
										close();
										handleCancel();
									} }
								>
									Cancelar
								</Button>
								<Button
									className={ "bg-danger text-danger-foreground" }
									isDisabled={ isLoggingOut }
									isPending={ isLoggingOut }
									onPress={ () => {
										close();
										void handleLogout();
									} }
								>
									{ ( { isPending } ) => (
										<>
											{ isPending ? <Spinner color={ "current" } size={ "sm" }/> : <LogOut className={ "size-4" }/> }
											{ isPending ? "Cerrando sesión..." : "Cerrar sesión" }
										</>
									) }
								</Button>
							</Modal.Footer>
						</>
					) }
				</Modal.Dialog>
			</Modal.Container>
		</Modal.Backdrop>
	);
}
