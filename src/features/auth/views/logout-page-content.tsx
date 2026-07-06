"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

import { Button, Modal, Spinner, Typography } from "@heroui/react";
import { AlertTriangle, LogOut } from "lucide-react";

import { clearRoutineStateOnLogout } from "@/features/routine/services/routine-logout";
import { clearAppliedThemePreference } from "@/features/theme/theme-preference";

export default function LogoutPageContent() {
	const router = useRouter();
	const queryClient = useQueryClient();
	const [ isLoggingOut, setIsLoggingOut ] = useState( false );

	useEffect( () => {
		router.prefetch( "/" );
	}, [ router ] );

	async function handleLogout() {
		if (isLoggingOut) return;

		setIsLoggingOut( true );

		try {
			await fetch( "/api/auth/logout", {
				method: "POST",
			} );
		} finally {
			clearRoutineStateOnLogout();
			clearAppliedThemePreference();
			queryClient.clear();
			window.sessionStorage.clear();
			router.replace( "/" );
			router.refresh();
		}
	}

	function handleCancel() {
		router.replace( "/" );
	}

	return (
		<main className={ "flex min-h-screen items-center justify-center bg-background px-4 py-6" }>
			<Modal>
				<Modal.Backdrop
					isDismissable={ false }
					isOpen
					variant={ "blur" }
				>
					<Modal.Container size={ "sm" }>
						<Modal.Dialog className={ "sm:max-w-md" }>
							{ ( { close } ) => (
								<>
									<Modal.Header>
										<Modal.Heading>Cerrar sesion</Modal.Heading>
									</Modal.Header>
									<Modal.Body className={ "space-y-4" }>
										<div className={ "flex items-start gap-3 rounded-xl border border-warning/20 bg-warning/10 p-4 text-warning-foreground" }>
											<AlertTriangle className={ "mt-0.5 size-5 shrink-0 text-warning" }/>
											<div className={ "space-y-1" }>
												<Typography className={ "text-sm font-medium" } type={ "body-sm" }>
													Estas por cerrar sesion.
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
													{ isPending ? "Cerrando sesion..." : "Cerrar sesion" }
												</>
											) }
										</Button>
									</Modal.Footer>
								</>
							) }
						</Modal.Dialog>
					</Modal.Container>
				</Modal.Backdrop>
			</Modal>
		</main>
	);
}
