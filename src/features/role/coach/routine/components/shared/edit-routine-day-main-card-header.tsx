import { Button, Card } from "@heroui/react";
import { RotateCw } from "lucide-react";

import { SearchAndCreateExerciseDrawer } from "@/features/role/coach/routine/components/shared/search-and-create-exercise-drawer";
import type { ExercisePrescription } from "@/features/role/coach/routine/components/shared/use-search-and-create-exercise-drawer-state";

type EditRoutineDayMainCardHeaderProps = {
	addedExerciseIds: Set<string>;
	getSuggestedOrder: () => number;
	isRefreshing: boolean;
	routineSubtitle: string;
	routineTitle: string;
	draftCount: number;
	lastPrescription: ExercisePrescription | null;
	onAddExerciseAction: ( exercise: import("@/features/exercises/types/exercise-list-item").ExerciseListItem, order: number, prescription: ExercisePrescription ) => void;
	onRefreshAction: () => void;
};

export function EditRoutineDayMainCardHeader( {
												  addedExerciseIds,
												  getSuggestedOrder,
												  isRefreshing,
												  routineSubtitle,
												  routineTitle,
												  draftCount,
												  lastPrescription,
												  onAddExerciseAction,
												  onRefreshAction,
											  }: EditRoutineDayMainCardHeaderProps ) {
	return (
		<Card.Header className={ "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between px-3 pt-3" }>
			<div className={ "min-w-0" }>
				<p className={ "truncate text-lg font-semibold text-foreground" }>{ routineTitle }</p>
				<p className={ "text-sm text-muted" }>{ routineSubtitle }</p>
				<p className={ "text-sm text-muted" }>{ draftCount } { draftCount === 1 ? "ejercicio" : "ejercicios" }</p>
			</div>
			<div className={ "flex w-full sm:flex-row gap-2 sm:w-auto " }>
				<Button
					className={ "shadow-sm" }
					isDisabled={ isRefreshing }
					variant={ "secondary" }
					onPress={ onRefreshAction }
				>
					<RotateCw className={ isRefreshing ? "size-4 animate-spin" : "size-4" }/>
					{ isRefreshing ? "Actualizando..." : "Actualizar" }
				</Button>
				<SearchAndCreateExerciseDrawer
					addedExerciseIds={ addedExerciseIds }
					lastPrescription={ lastPrescription }
					onAddExerciseAction={ onAddExerciseAction }
					suggestedOrder={ getSuggestedOrder() }
				/>
			</div>
		</Card.Header>
	);
}
