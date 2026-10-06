import { Button, Modal } from "@heroui/react";
import { RotateCw } from "lucide-react";

type RoutineRefreshConfirmModalProps = {
	isOpen: boolean;
	onCloseAction: () => void;
	onConfirmAction: () => void;
};

export function RoutineRefreshConfirmModal( {
												isOpen,
												onCloseAction,
												onConfirmAction,
											}: RoutineRefreshConfirmModalProps ) {
	return (
		<Modal.Backdrop
			isDismissable={ false }
			isOpen={ isOpen }
			onOpenChange={ onCloseAction }
			variant={ "blur" }
		>
			<Modal.Container size={ "sm" }>
				<Modal.Dialog className={ "sm:max-w-md" }>
					{ ( { close } ) => (
						<>
							<Modal.Header>
								<Modal.Heading>Actualizar rutina</Modal.Heading>
							</Modal.Header>
							<Modal.Body>
								<p className={ "text-sm leading-6 text-muted" }>
									Tenés series que todavía no se guardaron. Si actualizás, se descartan y vas a
									ver la rutina tal como está guardada.
								</p>
							</Modal.Body>
							<Modal.Footer className={ "gap-2" }>
								<Button variant={ "secondary" } onPress={ close }>
									Cancelar
								</Button>
								<Button onPress={ () => {
									close();
									onConfirmAction();
								} }>
									<RotateCw className={ "size-4" }/>
									Actualizar
								</Button>
							</Modal.Footer>
						</>
					) }
				</Modal.Dialog>
			</Modal.Container>
		</Modal.Backdrop>
	);
}

