"use client";

import type { ReactNode } from "react";
import { Button, Modal, Spinner } from "@heroui/react";
import { CircleSlash } from "lucide-react";

type DeactivateConfirmModalProps = {
	// Que pasa al desactivar y como se vuelve atras.
	description: ReactNode;
	isOpen: boolean;
	isPending: boolean;
	onConfirmAction: () => Promise<void> | void;
	onOpenChangeAction: ( isOpen: boolean ) => void;
	title: string;
};

// Desactivar se puede deshacer, pero mientras tanto le corta el acceso a una
// persona o saca un ejercicio de uso. Antes pasaba con un solo toque en el menu,
// al lado de "Editar": un toque de mas alcanzaba para hacerlo sin querer.
export function DeactivateConfirmModal( {
	description,
	isOpen,
	isPending,
	onConfirmAction,
	onOpenChangeAction,
	title,
}: DeactivateConfirmModalProps ) {
	return (
		<Modal.Backdrop
			isDismissable={ false }
			isOpen={ isOpen }
			variant={ "blur" }
			onOpenChange={ onOpenChangeAction }
		>
			<Modal.Container size={ "sm" }>
				<Modal.Dialog className={ "sm:max-w-md" }>
					<Modal.Header>
						<Modal.Heading>{ title }</Modal.Heading>
					</Modal.Header>
					<Modal.Body>
						<p className={ "text-sm leading-6 text-muted" }>{ description }</p>
					</Modal.Body>
					<Modal.Footer className={ "gap-2" }>
						<Button isDisabled={ isPending } variant={ "secondary" } onPress={ () => onOpenChangeAction( false ) }>
							Cancelar
						</Button>
						<Button
							className={ "bg-danger text-danger-foreground" }
							isDisabled={ isPending }
							isPending={ isPending }
							onPress={ async () => {
								await onConfirmAction();
								onOpenChangeAction( false );
							} }
						>
							{ isPending ? <Spinner color={ "current" } size={ "sm" }/> : <CircleSlash className={ "size-4" }/> }
							{ isPending ? "Desactivando..." : "Desactivar" }
						</Button>
					</Modal.Footer>
				</Modal.Dialog>
			</Modal.Container>
		</Modal.Backdrop>
	);
}
