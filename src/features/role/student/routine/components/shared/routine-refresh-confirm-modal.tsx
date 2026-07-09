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
		<Modal>
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
										Vas a volver a cargar la rutina desde el servidor. Los cambios compatibles que ya
										hiciste se conservaran, y si alguna variante ya no esta disponible, se mostrara el
										ejercicio original.
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
		</Modal>
	);
}
