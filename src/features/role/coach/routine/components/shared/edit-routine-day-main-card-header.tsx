import { Button, Card } from "@heroui/react";
import { RotateCcw } from "lucide-react";

import { SearchAndCreateExerciseSheet } from "@/features/role/coach/routine/components/shared/search-and-create-exercise-sheet";

type EditRoutineDayMainCardHeaderProps = {
	addedExerciseIds: Set<string>;
	getSuggestedOrder: () => number;
	isRefreshing: boolean;
	routineSubtitle: string;
	routineTitle: string;
	draftCount: number;
	onAddExerciseAction: ( exercise: import("@/features/exercises/types/exercise-list-item").ExerciseListItem, order: number ) => void;
	onRefreshAction: () => void;
};

export function EditRoutineDayMainCardHeader( {
	addedExerciseIds,
	getSuggestedOrder,
	isRefreshing,
	routineSubtitle,
	routineTitle,
	draftCount,
	onAddExerciseAction,
	onRefreshAction,
}: EditRoutineDayMainCardHeaderProps ) {
	return (
		<Card.Header className={ "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between" }>
			<div className={ "min-w-0 pl-2" }>
				<p className={ "truncate text-lg font-semibold text-foreground" }>{ routineTitle }</p>
				<p className={ "text-sm text-muted" }>{ routineSubtitle }</p>
				<p className={ "text-sm text-muted" }>{ draftCount } ejercicios en borrador</p>
			</div>
			<div className={ "flex w-full flex-col gap-2 sm:w-auto sm:flex-row" }>
				<Button
					className={ "shadow-sm" }
					isDisabled={ isRefreshing }
					variant={ "secondary" }
					onPress={ onRefreshAction }
				>
					<RotateCcw className={ isRefreshing ? "size-4 animate-spin" : "size-4" }/>
					{ isRefreshing ? "Actualizando..." : "Actualizar" }
				</Button>
				<SearchAndCreateExerciseSheet
					addedExerciseIds={ addedExerciseIds }
					onAddExerciseAction={ onAddExerciseAction }
					suggestedOrder={ getSuggestedOrder() }
				/>
			</div>
		</Card.Header>
	);
}
