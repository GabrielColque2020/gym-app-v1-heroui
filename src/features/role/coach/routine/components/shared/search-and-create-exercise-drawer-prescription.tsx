import { Button, Input, TextField } from "@heroui/react";

import { RoutineRestSelect } from "@/features/role/coach/routine/components/shared/routine-rest-select";

type SearchAndCreateExerciseDrawerPrescriptionProps = {
	onRepsChange: ( value: string ) => void;
	onRestChange: ( value: number | null ) => void;
	onSetsChange: ( value: string ) => void;
	repsValue: string;
	restValue: number | null;
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
															   onRestChange,
															   onSetsChange,
															   repsValue,
															   restValue,
															   setsValue,
														   }: SearchAndCreateExerciseDrawerPrescriptionProps ) {
	return (
		<div className={ "space-y-2 rounded-xl border border-border bg-surface-secondary p-3" }>
			<p className={ "text-sm font-medium text-foreground" }>
				Series y repeticiones
				<span className={ "hidden font-normal text-muted sm:inline" }> · para cada ejercicio que agregues</span>
			</p>
			{ /* En el telefono va todo en un solo renglon que se desliza: envolviendo
			     en dos renglones le sacaba lugar a la lista de ejercicios. */ }
			<div className={ "flex items-center gap-2 overflow-x-auto [scrollbar-width:none] sm:flex-wrap sm:overflow-visible [&::-webkit-scrollbar]:hidden" }>
				<TextField className={ "w-16 shrink-0 sm:w-20" } name={ "exercise-sets" } value={ setsValue } onChange={ ( value ) => onSetsChange( value.replace( /\D/g, "" ).slice( 0, 2 ) ) }>
					<Input
						aria-label={ "Series para los ejercicios que agregues" }
						className={ "border border-border" }
						inputMode={ "numeric" }
						placeholder={ "Series" }
					/>
				</TextField>
				<span aria-hidden className={ "shrink-0 text-sm text-muted" }>×</span>
				<TextField className={ "w-20 shrink-0 sm:w-24" } name={ "exercise-reps" } value={ repsValue } onChange={ onRepsChange }>
					<Input
						aria-label={ "Repeticiones para los ejercicios que agregues" }
						className={ "border border-border" }
						placeholder={ "Reps" }
					/>
				</TextField>
				<RoutineRestSelect
					showLabel
					ariaLabel={ "Descanso para los ejercicios que agregues" }
					value={ restValue }
					onChangeAction={ onRestChange }
				/>
				{ PRESETS.map( ( preset ) => {
					const isActive = preset.sets === setsValue.trim() && preset.reps === repsValue.trim();

					return (
						<Button
							key={ `${ preset.sets }x${ preset.reps }` }
							aria-pressed={ isActive }
							className={ isActive ? "shrink-0 bg-accent text-accent-foreground" : "shrink-0" }
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
