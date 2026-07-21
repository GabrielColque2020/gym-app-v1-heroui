import { Alert, Card } from "@heroui/react";

import { EditRoutineDayMainCardEmptyState } from "@/features/role/coach/routine/components/shared/edit-routine-day-main-card-empty-state";
import { RoutineDayExercisesDesktop } from "@/features/role/coach/routine/components/shared/routine-day-exercises-desktop";
import { RoutineDayExercisesMobile } from "@/features/role/coach/routine/components/shared/routine-day-exercises-mobile";
import type { DraftRoutineDayExercise } from "@/features/routine/services/routine-day-editor";

type EditRoutineDayMainCardContentProps = {
	draftRoutines: DraftRoutineDayExercise[];
	requiredFieldsMessage: string | null;
	validationError: string | null;
	onDeleteExercise: ( clientId: string ) => void;
	onUpdateExerciseField: ( clientId: string, field: "observation" | "order" | "reps" | "sets", value: number | string ) => void;
};

export function EditRoutineDayMainCardContent( {
												   draftRoutines,
												   requiredFieldsMessage,
												   validationError,
												   onDeleteExercise,
												   onUpdateExerciseField,
											   }: EditRoutineDayMainCardContentProps ) {
	return (
		<Card.Content className={ "px-3 pb-3" }>
			{ validationError ? (
				<Alert className={ "border border-warning/20" } status={ "warning" }>
					<Alert.Content>
						<Alert.Title>Revisa el borrador antes de guardar</Alert.Title>
						<Alert.Description>{ validationError }</Alert.Description>
					</Alert.Content>
				</Alert>
			) : null }

			{ !validationError && draftRoutines.length > 0 ? (
				<Alert
					className={ `mb-3 border border-border ${ requiredFieldsMessage ? "bg-warning/10" : "bg-success/10" } ` }
					status={ requiredFieldsMessage ? "warning" : "success" }
				>
					<Alert.Content>
						<Alert.Title>
							{ requiredFieldsMessage ? "Faltan datos para guardar" : "Listo para guardar" }
						</Alert.Title>
						<Alert.Description>
							{ requiredFieldsMessage ?? "Todos los ejercicios tienen series y repeticiones completas." }
						</Alert.Description>
					</Alert.Content>
				</Alert>
			) : null }

			{ draftRoutines.length === 0 ? (
				<EditRoutineDayMainCardEmptyState/>
			) : (
				<>
					<RoutineDayExercisesDesktop
						onDeleteAction={ onDeleteExercise }
						onUpdateField={ onUpdateExerciseField }
						routines={ draftRoutines }
					/>
					<RoutineDayExercisesMobile
						onDeleteAction={ onDeleteExercise }
						onUpdateField={ onUpdateExerciseField }
						routines={ draftRoutines }
					/>
				</>
			) }
		</Card.Content>
	);
}
