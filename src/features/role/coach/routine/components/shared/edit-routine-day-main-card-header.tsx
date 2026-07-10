import { Button, Card } from "@heroui/react";
import { RotateCw } from "lucide-react";

import { SearchAndCreateExerciseDrawer } from "@/features/role/coach/routine/components/shared/search-and-create-exercise-drawer";

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
		<Card.Header className={ "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between px-3 pt-3" }>
			<div className={ "min-w-0" }>
				<p className={ "truncate text-lg font-semibold text-foreground" }>{ routineTitle }</p>
				<p className={ "text-sm text-muted" }>{ routineSubtitle }</p>
				<p className={ "text-sm text-muted" }>{ draftCount } ejercicios en borrador</p>
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
					onAddExerciseAction={ onAddExerciseAction }
					suggestedOrder={ getSuggestedOrder() }
				/>
			</div>
		</Card.Header>
	);
}
