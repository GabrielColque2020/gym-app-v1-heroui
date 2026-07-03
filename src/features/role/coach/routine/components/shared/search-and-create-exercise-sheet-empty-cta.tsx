import { Button } from "@heroui/react";

type SearchAndCreateExerciseSheetEmptyCtaProps = {
	onPress: () => void;
};

export function SearchAndCreateExerciseSheetEmptyCta( {
	onPress,
}: SearchAndCreateExerciseSheetEmptyCtaProps ) {
	return (
		<div className={ "rounded-xl border border-dashed border-border bg-surface-secondary px-4 py-4 mb-20 sm:mb-0" }>
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
		</div>
	);
}
