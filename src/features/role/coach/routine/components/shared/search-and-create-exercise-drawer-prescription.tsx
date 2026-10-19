import { Button, Input, TextField } from "@heroui/react";

import { RoutineRestSelect } from "@/features/role/coach/routine/components/shared/routine-rest-select";

type SearchAndCreateExerciseDrawerPrescriptionProps = {
	// Se intento agregar con algo vacio: se marca lo que falta.
	isMissingShown: boolean;
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

// Series, repeticiones y descanso del ejercicio que se esta agregando. Los
// atajos cargan las combinaciones mas comunes de un toque. Series y repeticiones
// son obligatorias: un ejercicio sin ellas no le sirve al estudiante, y agregado
// en otros dias les llegaria vacio.
export function SearchAndCreateExerciseDrawerPrescription( {
															   isMissingShown,
															   onRepsChange,
															   onRestChange,
															   onSetsChange,
															   repsValue,
															   restValue,
															   setsValue,
														   }: SearchAndCreateExerciseDrawerPrescriptionProps ) {
	const isSetsMissing = isMissingShown && !setsValue.trim();
	const isRepsMissing = isMissingShown && !repsValue.trim();
	const missingClassName = "border-danger";

	return (
		<div className={ "space-y-2 rounded-xl border border-border bg-surface-secondary p-3" }>
			<p className={ "text-sm font-medium text-foreground" }>
				Series y repeticiones
				<span className={ "font-normal text-muted" }> · obligatorias</span>
			</p>
			{ /* En el telefono va todo en un solo renglon que se desliza: envolviendo
			     en dos renglones le sacaba lugar a la lista de ejercicios. */ }
			<div className={ "flex items-center gap-2 overflow-x-auto [scrollbar-width:none] sm:flex-wrap sm:overflow-visible [&::-webkit-scrollbar]:hidden" }>
				<TextField className={ "w-16 shrink-0 sm:w-20" } name={ "exercise-sets" } value={ setsValue } onChange={ ( value ) => onSetsChange( value.replace( /\D/g, "" ).slice( 0, 2 ) ) }>
					<Input
						aria-invalid={ isSetsMissing || undefined }
						aria-label={ "Series" }
						className={ `border ${ isSetsMissing ? missingClassName : "border-border" }` }
						inputMode={ "numeric" }
						placeholder={ "Series" }
					/>
				</TextField>
				<span aria-hidden className={ "shrink-0 text-sm text-muted" }>×</span>
				<TextField className={ "w-20 shrink-0 sm:w-24" } name={ "exercise-reps" } value={ repsValue } onChange={ onRepsChange }>
					<Input
						aria-invalid={ isRepsMissing || undefined }
						aria-label={ "Repeticiones" }
						className={ `border ${ isRepsMissing ? missingClassName : "border-border" }` }
						placeholder={ "Reps" }
					/>
				</TextField>
				<RoutineRestSelect
					showLabel
					ariaLabel={ "Descanso" }
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
			{ isSetsMissing || isRepsMissing ? (
				<p className={ "text-xs font-medium text-danger" } role={ "alert" }>
					Cargá series y repeticiones para agregar el ejercicio.
				</p>
			) : null }
		</div>
	);
}
