import { useState } from "react";
import { Button, Input, TextField } from "@heroui/react";
import { Layers } from "lucide-react";

import { RoutineRestSelect } from "@/features/role/coach/routine/components/shared/routine-rest-select";
import { RoutineSetBlocksEditor } from "@/features/role/coach/routine/components/shared/routine-set-blocks-editor";
import { REPS_PER_SET_SEPARATOR } from "@/features/routine/services/reps-per-set";
import { RIR_MAX_LENGTH } from "@/features/routine/services/rir";

type SearchAndCreateExerciseDrawerPrescriptionProps = {
	// Se intento agregar con algo vacio: se marca lo que falta.
	isMissingShown: boolean;
	onRepsChange: ( value: string ) => void;
	onRestChange: ( value: number | null ) => void;
	onRirChange: ( value: string ) => void;
	onSetsChange: ( value: string ) => void;
	repsValue: string;
	restValue: number | null;
	rirValue: string;
	setsValue: string;
};

const PRESETS = [
	{ reps: "10", sets: "3" },
	{ reps: "12", sets: "3" },
	{ reps: "10", sets: "4" },
	{ reps: "12", sets: "4" },
] as const;

// Series, repeticiones, RIR y descanso del ejercicio que se esta agregando. Los
// atajos cargan las combinaciones mas comunes de un toque. Series y repeticiones
// son obligatorias: un ejercicio sin ellas no le sirve al estudiante, y agregado
// en otros dias les llegaria vacio.
export function SearchAndCreateExerciseDrawerPrescription( {
															   isMissingShown,
															   onRepsChange,
															   onRestChange,
															   onRirChange,
															   onSetsChange,
															   repsValue,
															   restValue,
															   rirValue,
															   setsValue,
														   }: SearchAndCreateExerciseDrawerPrescriptionProps ) {
	const isSetsMissing = isMissingShown && !setsValue.trim();
	const isRepsMissing = isMissingShown && !repsValue.trim();
	const missingClassName = "border-danger";
	// Series diferentes (1 × 5 y 2 × 6): bloques en lugar de un solo "series × reps".
	const [ hasSetBlocks, setHasSetBlocks ] = useState( false );
	// Opcional: las repeticiones que el estudiante deja en reserva ("2", "1-2").
	const rirField = (
		<TextField className={ "w-16 shrink-0" } name={ "exercise-rir" } value={ rirValue } onChange={ ( value ) => onRirChange( value.slice( 0, RIR_MAX_LENGTH ) ) }>
			<Input aria-label={ "RIR (repeticiones en reserva)" } className={ "border border-border" } placeholder={ "RIR" }/>
		</TextField>
	);

	return (
		<div className={ "space-y-2 rounded-xl border border-border bg-surface-secondary p-3" }>
			<p className={ "text-sm font-medium text-foreground" }>
				Series y repeticiones
				<span className={ "font-normal text-muted" }> · obligatorias</span>
			</p>
			{ hasSetBlocks ? (
				<>
					<RoutineSetBlocksEditor
						exerciseName={ "el ejercicio" }
						isMissingShown={ isMissingShown }
						reps={ repsValue }
						sets={ setsValue }
						onChangeAction={ ( value ) => {
							onSetsChange( value.sets );
							onRepsChange( value.reps );
						} }
						onDisableAction={ ( value ) => {
							onSetsChange( value.sets );
							onRepsChange( value.reps );
							setHasSetBlocks( false );
						} }
					/>
					<div className={ "flex items-center gap-2" }>
						{ rirField }
						<RoutineRestSelect
							showLabel
							ariaLabel={ "Descanso" }
							value={ restValue }
							onChangeAction={ onRestChange }
						/>
					</div>
				</>
			) : (
			<>
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
				<TextField
					className={ "w-20 shrink-0 sm:w-24" }
					name={ "exercise-reps" }
					value={ repsValue }
					// La barra separa las series diferentes por dentro: escrita aca las partiria sin que se vea.
					onChange={ ( value ) => onRepsChange( value.replaceAll( REPS_PER_SET_SEPARATOR, "" ) ) }
				>
					<Input
						aria-invalid={ isRepsMissing || undefined }
						aria-label={ "Repeticiones" }
						className={ `border ${ isRepsMissing ? missingClassName : "border-border" }` }
						placeholder={ "Reps" }
					/>
				</TextField>
				{ rirField }
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
			{ /* Para una top set con back-off o una piramide. */ }
			<Button size={ "sm" } variant={ "ghost" } onPress={ () => setHasSetBlocks( true ) }>
				<Layers className={ "size-4" }/>
				Series diferentes
			</Button>
			</>
			) }
			{ isSetsMissing || isRepsMissing ? (
				<p className={ "text-xs font-medium text-danger" } role={ "alert" }>
					Cargá series y repeticiones para agregar el ejercicio.
				</p>
			) : null }
		</div>
	);
}
