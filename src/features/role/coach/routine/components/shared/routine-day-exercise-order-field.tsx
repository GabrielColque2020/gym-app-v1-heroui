import { Input, TextField } from "@heroui/react";

import { getExerciseName } from "@/features/role/coach/routine/components/shared/routine-day-exercise-editor.utils";
import type { DraftRoutineDayExercise } from "@/features/routine/services/routine-day-editor";

type RoutineDayExerciseOrderFieldProps = {
	onUpdateField: ( clientId: string, field: "observation" | "order" | "reps" | "sets", value: number | string ) => void;
	routine: DraftRoutineDayExercise;
};

export function RoutineDayExerciseOrderField( {
	onUpdateField,
	routine,
}: RoutineDayExerciseOrderFieldProps ) {
	return (
		<TextField
			aria-label={ `Orden de ${ getExerciseName( routine ) }` }
			name={ `order-${ routine.clientId }` }
			value={ String( routine.order ) }
			onChange={ ( value ) => onUpdateField( routine.clientId, "order", Number( value ) || 0 ) }
		>
			<Input className={ "w-20 text-center" } inputMode={ "numeric" } variant={ "secondary" }/>
		</TextField>
	);
}
