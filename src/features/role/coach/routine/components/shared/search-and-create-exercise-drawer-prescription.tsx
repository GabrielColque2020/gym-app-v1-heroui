import { Button, Input, TextField } from "@heroui/react";

type SearchAndCreateExerciseDrawerPrescriptionProps = {
	onRepsChange: ( value: string ) => void;
	onSetsChange: ( value: string ) => void;
	repsValue: string;
	setsValue: string;
};

const PRESETS = [
	{ reps: "10", sets: "3" },
	{ reps: "12", sets: "3" },
	{ reps: "10", sets: "4" },
	{ reps: "12", sets: "4" },
] as const;

// Series y repeticiones que se aplican a cada ejercicio que se agrega. Casi
// siempre son las mismas para varios seguidos, y cargarlas aca evita volver a
// tipearlas ejercicio por ejercicio. Se pueden dejar vacias y completar despues.
export function SearchAndCreateExerciseDrawerPrescription( {
															   onRepsChange,
															   onSetsChange,
															   repsValue,
															   setsValue,
														   }: SearchAndCreateExerciseDrawerPrescriptionProps ) {
	return (
		<div className={ "space-y-2 rounded-xl border border-border bg-surface-secondary p-3" }>
			<p className={ "text-sm font-medium text-foreground" }>
				Series y repeticiones
				<span className={ "font-normal text-muted" }> · para cada ejercicio que agregues</span>
			</p>
			{ /* Todo en una fila que envuelve: en el telefono no le saca lugar a la lista. */ }
			<div className={ "flex flex-wrap items-center gap-2" }>
				<TextField className={ "w-20" } name={ "exercise-sets" } value={ setsValue } onChange={ onSetsChange }>
					<Input
						aria-label={ "Series para los ejercicios que agregues" }
						className={ "border border-border" }
						inputMode={ "numeric" }
						placeholder={ "Series" }
					/>
				</TextField>
				<span aria-hidden className={ "text-sm text-muted" }>×</span>
				<TextField className={ "w-24" } name={ "exercise-reps" } value={ repsValue } onChange={ onRepsChange }>
					<Input
						aria-label={ "Repeticiones para los ejercicios que agregues" }
						className={ "border border-border" }
						placeholder={ "Reps" }
					/>
				</TextField>
				{ PRESETS.map( ( preset ) => {
					const isActive = preset.sets === setsValue.trim() && preset.reps === repsValue.trim();

					return (
						<Button
							key={ `${ preset.sets }x${ preset.reps }` }
							aria-pressed={ isActive }
							className={ isActive ? "bg-accent text-accent-foreground" : undefined }
							size={ "sm" }
							variant={ isActive ? undefined : "secondary" }
							onPress={ () => {
								onSetsChange( preset.sets );
								onRepsChange( preset.reps );
							} }
						>
							{ preset.sets }×{ preset.reps }
						</Button>
					);
				} ) }
			</div>
		</div>
	);
}
