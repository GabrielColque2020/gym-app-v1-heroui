import type { ExerciseSet } from "@/features/routine/types/routine.types";
import { Input, Label } from "@heroui/react";

interface SetFormProps {
	set: ExerciseSet;
	showLabels?: boolean;
	onWeightChange: ( setId: string, weight: number ) => void;
	onRepsChange: ( setId: string, reps: number ) => void;
	onCompleteChange: ( setId: string, completed: boolean ) => void;
}

export default function SetForm( { set, showLabels = false, onRepsChange }: SetFormProps ) {
	return (
		<div className={ showLabels ? "flex flex-col space-y-2" : "flex items-center justify-center" }>
			<div className={ "flex w-50 flex-col items-start space-y-3" }>
				{ showLabels ? <Label className={ "ml-2 text-sm text-muted" }>Reps</Label> : null }
				<Input
					fullWidth
					placeholder={ "Reps" }
					type={ "number" }
					value={ set.currentReps?.toString() || "" }
					onChange={ ( e ) => onRepsChange( set.id, Number.parseInt( e.target.value, 10 ) || 0 ) }
				/>
				<span className={ "px-1 text-sm text-muted" }>{ set.previousReps } reps Anterior</span>
			</div>
		</div>
	);
}

