"use client";

import { ArrowsRotateLeft } from "@gravity-ui/icons";
import { Button, Card } from "@heroui/react";

import { SearchAndCreateExerciseSheet } from "@/features/role/coach/routine/components/shared/search-and-create-exercise-sheet";

type EditRoutineDayMainCardHeaderProps = {
	addedExerciseIds: Set<string>;
	getSuggestedOrder: () => number;
	isRefreshing: boolean;
	routineSubtitle: string;
	routineTitle: string;
	draftCount: number;
	onAddExercise: ( exercise: import("@/features/exercises/types/exercise-list-item").ExerciseListItem, order: number ) => void;
	onRefresh: () => void;
};

export function EditRoutineDayMainCardHeader( {
	addedExerciseIds,
	getSuggestedOrder,
	isRefreshing,
	routineSubtitle,
	routineTitle,
	draftCount,
	onAddExercise,
	onRefresh,
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
					onPress={ onRefresh }
				>
					<ArrowsRotateLeft className={ isRefreshing ? "size-4 animate-spin" : "size-4" }/>
					{ isRefreshing ? "Actualizando..." : "Actualizar" }
				</Button>
				<SearchAndCreateExerciseSheet
					addedExerciseIds={ addedExerciseIds }
					onAddExercise={ onAddExercise }
					suggestedOrder={ getSuggestedOrder() }
				/>
			</div>
		</Card.Header>
	);
}
