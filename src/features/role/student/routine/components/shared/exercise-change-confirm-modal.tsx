import { Button, Modal } from "@heroui/react";

type ExerciseChangeConfirmModalProps = {
	completedSets: number;
	currentName: string;
	isOpen: boolean;
	targetName: string;
	onCloseAction: () => void;
	onConfirmAction: () => void;
};

// Cambiar de ejercicio en un dia que ya tiene series cargadas pasa esas series
// al otro ejercicio, y con ellas cambia el historial y el progreso de los dos.
// Un toque por error no debe hacer eso solo: se avisa y se pide confirmar.
export function ExerciseChangeConfirmModal( {
	completedSets,
	currentName,
	isOpen,
	targetName,
	onCloseAction,
	onConfirmAction,
}: ExerciseChangeConfirmModalProps ) {
	const setsLabel = completedSets === 1 ? "la serie que cargaste" : `las ${ completedSets } series que cargaste`;

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
								<Modal.Heading>Cambiar ejercicio</Modal.Heading>
							</Modal.Header>
							<Modal.Body>
								<p className={ "text-sm leading-6 text-muted" }>
									Hoy ya cargaste series de <span className={ "font-semibold text-foreground" }>{ currentName }</span>.
									Si cambiás, { setsLabel } { completedSets === 1 ? "pasa" : "pasan" } a contar
									para <span className={ "font-semibold text-foreground" }>{ targetName }</span>: así
									van a figurar en tu historial y en tu progreso.
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
									Cambiar ejercicio
								</Button>
							</Modal.Footer>
						</>
					) }
				</Modal.Dialog>
			</Modal.Container>
		</Modal.Backdrop>
	);
}
