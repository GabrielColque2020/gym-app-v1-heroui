"use client";

import { Alert, Card } from "@heroui/react";

import { EditRoutineDayMainCardEmptyState } from "@/features/role/coach/routine/components/shared/edit-routine-day-main-card-empty-state";
import { EditRoutineDayMainCardHeader } from "@/features/role/coach/routine/components/shared/edit-routine-day-main-card-header";
import { RoutineDayExercisesDesktop, RoutineDayExercisesMobile } from "@/features/role/coach/routine/components/shared/routine-day-exercise-editor";
import type { DraftRoutineDayExercise } from "@/features/routine/services/routine-day-editor";

type EditRoutineDayMainCardProps = {
	addedExerciseIds: Set<string>;
	draftRoutines: DraftRoutineDayExercise[];
	getSuggestedOrder: () => number;
	isRefreshing: boolean;
	routineSubtitle: string;
	routineTitle: string;
	validationError: string | null;
	onAddExercise: ( exercise: import("@/features/exercises/types/exercise-list-item").ExerciseListItem, order: number ) => void;
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

			<Card.Content className={ "space-y-4" }>
				{ validationError ? (
					<Alert className={ "border border-warning/20" } status={ "warning" }>
						<Alert.Content>
							<Alert.Title>Revisa el borrador antes de guardar</Alert.Title>
							<Alert.Description>{ validationError }</Alert.Description>
						</Alert.Content>
					</Alert>
				) : null }

				{ draftRoutines.length === 0 ? (
					<EditRoutineDayMainCardEmptyState/>
				) : (
					<>
						<RoutineDayExercisesDesktop
							onDelete={ onDeleteExercise }
							onUpdateField={ onUpdateExerciseField }
							routines={ draftRoutines }
						/>
						<RoutineDayExercisesMobile
							onDelete={ onDeleteExercise }
							onUpdateField={ onUpdateExerciseField }
							routines={ draftRoutines }
						/>
					</>
				) }
			</Card.Content>
		</Card>
	);
}
