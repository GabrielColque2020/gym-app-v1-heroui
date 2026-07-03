"use client";

import { Card } from "@heroui/react";

import type { ExerciseListItem } from "@/features/exercises/types/exercise-list-item";
import { EditRoutineDayMainCardContent } from "@/features/role/coach/routine/components/shared/edit-routine-day-main-card-content";
import { EditRoutineDayMainCardHeader } from "@/features/role/coach/routine/components/shared/edit-routine-day-main-card-header";
import type { DraftRoutineDayExercise } from "@/features/routine/services/routine-day-editor";

type EditRoutineDayMainCardProps = {
	addedExerciseIds: Set<string>;
	draftRoutines: DraftRoutineDayExercise[];
	getSuggestedOrder: () => number;
	isRefreshing: boolean;
	routineSubtitle: string;
	routineTitle: string;
	validationError: string | null;
	onAddExercise: ( exercise: ExerciseListItem, order: number ) => void;
	onDeleteExercise: ( clientId: string ) => void;
	onRefresh: () => void;
	onUpdateExerciseField: ( clientId: string, field: "observation" | "order" | "reps" | "sets", value: number | string ) => void;
};

export function EditRoutineDayMainCard( {
	addedExerciseIds,
	draftRoutines,
	getSuggestedOrder,
	isRefreshing,
	routineSubtitle,
	routineTitle,
	validationError,
	onAddExercise,
	onDeleteExercise,
	onRefresh,
	onUpdateExerciseField,
}: EditRoutineDayMainCardProps ) {
	return (
		<Card className={ "border border-border bg-surface" } variant={ "default" }>
			<EditRoutineDayMainCardHeader
				addedExerciseIds={ addedExerciseIds }
				draftCount={ draftRoutines.length }
				getSuggestedOrder={ getSuggestedOrder }
				isRefreshing={ isRefreshing }
				routineSubtitle={ routineSubtitle }
				routineTitle={ routineTitle }
				onAddExercise={ onAddExercise }
				onRefresh={ onRefresh }
			/>

			<EditRoutineDayMainCardContent
				draftRoutines={ draftRoutines }
				onDeleteExercise={ onDeleteExercise }
				onUpdateExerciseField={ onUpdateExerciseField }
				validationError={ validationError }
			/>
		</Card>
	);
}
