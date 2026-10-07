import { Button, Card } from "@heroui/react";
import { RotateCw } from "lucide-react";

import type { ExerciseListItem } from "@/features/exercises/types/exercise-list-item";
import { SearchAndCreateExerciseDrawer } from "@/features/role/coach/routine/components/shared/search-and-create-exercise-drawer";
import type { ExercisePrescription } from "@/features/role/coach/routine/components/shared/use-search-and-create-exercise-drawer-state";

type EditRoutineDayMainCardHeaderProps = {
	addedExerciseIds: Set<string>;
	getSuggestedOrder: () => number;
	isRefreshing: boolean;
	draftCount: number;
	onAddExerciseAction: ( exercise: ExerciseListItem, order: number, prescription: ExercisePrescription ) => void;
	onRefreshAction: () => void;
};

// La semana, el mes y el estudiante ya estan en el encabezado de la pagina: aca
// solo va la cantidad de ejercicios y las acciones de la lista.
export function EditRoutineDayMainCardHeader( {
												  addedExerciseIds,
												  getSuggestedOrder,
												  isRefreshing,
												  draftCount,
												  onAddExerciseAction,
												  onRefreshAction,
											  }: EditRoutineDayMainCardHeaderProps ) {
	return (
		<Card.Header className={ "flex flex-row flex-wrap items-center justify-between gap-2 px-3 pt-3" }>
			<p className={ "whitespace-nowrap text-base font-semibold text-foreground" }>
				{ draftCount } { draftCount === 1 ? "ejercicio" : "ejercicios" }
			</p>
			<div className={ "flex shrink-0 items-center gap-2" }>
				<Button
					isIconOnly
					aria-label={ isRefreshing ? "Actualizando" : "Actualizar" }
					isDisabled={ isRefreshing }
					variant={ "secondary" }
					onPress={ onRefreshAction }
				>
					<RotateCw className={ isRefreshing ? "size-4 animate-spin" : "size-4" }/>
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
