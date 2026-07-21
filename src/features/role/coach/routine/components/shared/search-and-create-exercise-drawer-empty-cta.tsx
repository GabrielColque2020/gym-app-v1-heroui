import { Alert, Button } from "@heroui/react";

type SearchAndCreateExerciseDrawerEmptyCtaProps = {
	onPress: () => void;
};

export function SearchAndCreateExerciseDrawerEmptyCta( {
														   onPress,
													   }: SearchAndCreateExerciseDrawerEmptyCtaProps ) {
	return (
		<Alert
			className={ "mb-3 border border-border bg-warning/15 w-full" }
			status={ "warning" }
		>
			<Alert.Content>
				<Alert.Title>
					No encontras el ejercicio?
				</Alert.Title>
				<Alert.Description>
					<p className={ "mt-1 text-sm text-muted" }>
						Crea una nueva entrada en el catalogo y vuelve a sumarla al borrador.
					</p>
					<div className={ "pt-3" }>
						<Button
							aria-label={ "Crear nuevo ejercicio" }
							className={ "w-full sm:w-auto" }
							variant={ "secondary" }
							onPress={ onPress }
						>
							Crear nuevo ejercicio
						</Button>
					</div>
				</Alert.Description>
			</Alert.Content>
		</Alert>
	);
}
