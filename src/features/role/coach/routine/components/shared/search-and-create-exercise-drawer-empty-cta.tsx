import { Button, Card } from "@heroui/react";

type SearchAndCreateExerciseDrawerEmptyCtaProps = {
	onPress: () => void;
};

export function SearchAndCreateExerciseDrawerEmptyCta( {
														   onPress,
													   }: SearchAndCreateExerciseDrawerEmptyCtaProps ) {
	return (
		<Card className={ "border  px-4 py-4 border-warning-soft bg-warning-soft/60" }>
			<p className={ "text-sm font-semibold text-foreground" }>No encontras el ejercicio?</p>
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
		</Card>
	);
}
