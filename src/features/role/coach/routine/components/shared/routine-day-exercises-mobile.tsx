import type { DraftRoutineDayExercise } from "@/features/routine/services/routine-day-editor";

import { RoutineDayExerciseMobileCard } from "@/features/role/coach/routine/components/shared/routine-day-exercise-mobile-card";

type RoutineDayExercisesMobileProps = {
	onDeleteAction: ( clientId: string ) => void;
	onUpdateField: ( clientId: string, field: "observation" | "order" | "reps" | "sets", value: number | string ) => void;
	routines: DraftRoutineDayExercise[];
};

export function RoutineDayExercisesMobile( {
											   onDeleteAction,
											   onUpdateField,
											   routines,
										   }: RoutineDayExercisesMobileProps ) {
	return (
		<div className={ "grid gap-3 md:hidden" }>
			{ routines.map( ( routine, index ) => (
				<RoutineDayExerciseMobileCard
					key={ routine.clientId }
					isFirst={ index === 0 }
					isLast={ index === routines.length - 1 }
					onDeleteAction={ onDeleteAction }
					onUpdateField={ onUpdateField }
					routine={ routine }
				/>
			) ) }
		</div>
	);
}
