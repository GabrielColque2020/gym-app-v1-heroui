import { ArrowsRotateLeft } from "@gravity-ui/icons";
import { Button, Modal } from "@heroui/react";

type EditRoutineDayRefreshModalProps = {
	isOpen: boolean;
	onCloseAction: () => void;
	onConfirmAction: () => void;
};

export function EditRoutineDayRefreshModal( {
	isOpen,
	onCloseAction,
	onConfirmAction,
}: EditRoutineDayRefreshModalProps ) {
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
										Vas a volver a cargar la version mas reciente del dia. Si tenes cambios sin guardar,
										se reemplazaran por lo que trae el servidor.
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
										<ArrowsRotateLeft className={ "size-4" }/>
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
