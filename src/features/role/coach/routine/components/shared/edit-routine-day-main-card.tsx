import { Card } from "@heroui/react";

import type { ExerciseListItem } from "@/features/exercises/types/exercise-list-item";
import { EditRoutineDayMainCardContent } from "@/features/role/coach/routine/components/shared/edit-routine-day-main-card-content";
import { EditRoutineDayMainCardHeader } from "@/features/role/coach/routine/components/shared/edit-routine-day-main-card-header";
import type { ExercisePrescription } from "@/features/role/coach/routine/components/shared/use-search-and-create-exercise-drawer-state";
import type { DraftRoutineDayExercise } from "@/features/routine/services/routine-day-editor";

type EditRoutineDayMainCardProps = {
	addedExerciseIds: Set<string>;
	draftRoutines: DraftRoutineDayExercise[];
	getSuggestedOrder: () => number;
	isRefreshing: boolean;
	requiredFieldsMessage: string | null;
	validationError: string | null;
	onAddExerciseAction: ( exercise: ExerciseListItem, order: number, prescription: ExercisePrescription ) => void;
	onDeleteExerciseAction: ( clientId: string ) => void;
	onRefreshAction: () => void;
	onUpdateExerciseField: ( clientId: string, field: "observation" | "order" | "reps" | "restSeconds" | "sets", value: number | string | null ) => void;
};

export function EditRoutineDayMainCard( {
											addedExerciseIds,
											draftRoutines,
											getSuggestedOrder,
											isRefreshing,
											requiredFieldsMessage,
											validationError,
											onAddExerciseAction,
											onDeleteExerciseAction,
											onRefreshAction,
											onUpdateExerciseField,
										}: EditRoutineDayMainCardProps ) {
	return (
		<Card className={ "border border-border bg-surface" } variant={ "default" }>
			<EditRoutineDayMainCardHeader
				addedExerciseIds={ addedExerciseIds }
				draftCount={ draftRoutines.length }
				getSuggestedOrder={ getSuggestedOrder }
				isRefreshing={ isRefreshing }
				onAddExerciseAction={ onAddExerciseAction }
				onRefreshAction={ onRefreshAction }
			/>

			<EditRoutineDayMainCardContent
				draftRoutines={ draftRoutines }
				onDeleteExercise={ onDeleteExerciseAction }
				onUpdateExerciseField={ onUpdateExerciseField }
				requiredFieldsMessage={ requiredFieldsMessage }
				validationError={ validationError }
			/>
		</Card>
	);
}
