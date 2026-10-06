import { Alert, Card } from "@heroui/react";

import { EditRoutineDayMainCardEmptyState } from "@/features/role/coach/routine/components/shared/edit-routine-day-main-card-empty-state";
import { RoutineDayExerciseList } from "@/features/role/coach/routine/components/shared/routine-day-exercise-list";
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
		<Card.Content className={ "min-w-0 space-y-3 px-3 pb-3" }>
			{ validationError ? (
				<Alert className={ "border border-warning/20" } status={ "warning" }>
					<Alert.Content>
						<Alert.Title>Revisa el borrador antes de guardar</Alert.Title>
						<Alert.Description>{ validationError }</Alert.Description>
					</Alert.Content>
				</Alert>
			) : null }

			{ /* Solo avisa cuando falta algo: que este listo ya lo dice el estado del encabezado. */ }
			{ !validationError && requiredFieldsMessage ? (
				<p className={ "text-sm font-medium text-warning" } role={ "status" }>{ requiredFieldsMessage }</p>
			) : null }

			{ draftRoutines.length === 0 ? (
				<EditRoutineDayMainCardEmptyState/>
			) : (
				<RoutineDayExerciseList
					routines={ draftRoutines }
					onDeleteAction={ onDeleteExercise }
					onUpdateField={ onUpdateExerciseField }
				/>
			) }
		</Card.Content>
	);
}
