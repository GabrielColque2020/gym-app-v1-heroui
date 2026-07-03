"use client";

import { Alert, Card } from "@heroui/react";

import { EditRoutineDayMainCardEmptyState } from "@/features/role/coach/routine/components/shared/edit-routine-day-main-card-empty-state";
import { RoutineDayExercisesDesktop } from "@/features/role/coach/routine/components/shared/routine-day-exercises-desktop";
import { RoutineDayExercisesMobile } from "@/features/role/coach/routine/components/shared/routine-day-exercises-mobile";
import type { DraftRoutineDayExercise } from "@/features/routine/services/routine-day-editor";

type EditRoutineDayMainCardContentProps = {
	draftRoutines: DraftRoutineDayExercise[];
	validationError: string | null;
	onDeleteExercise: ( clientId: string ) => void;
	onUpdateExerciseField: ( clientId: string, field: "observation" | "order" | "reps" | "sets", value: number | string ) => void;
};

export function EditRoutineDayMainCardContent( {
	draftRoutines,
	validationError,
	onDeleteExercise,
	onUpdateExerciseField,
}: EditRoutineDayMainCardContentProps ) {
	return (
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
	);
}
