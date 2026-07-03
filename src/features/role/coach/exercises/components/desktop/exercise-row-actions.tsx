"use client";

import { Button, Spinner } from "@heroui/react";
import { CheckCircle2, Trash2 } from "lucide-react";

import { ExerciseSheet } from "@/features/role/coach/exercises/components/shared/exercise-sheet";
import { useExerciseStatusAction } from "@/features/exercises/hooks/use-exercise-status-action";
import type { ExerciseListItem } from "@/features/exercises/types/exercise-list-item";

type ExerciseRowActionsProps = {
	exercise: ExerciseListItem;
};

export function ExerciseRowActions( {
	exercise,
}: ExerciseRowActionsProps ) {
	const { changeStatus, isPending, statusClassName, statusLabel } = useExerciseStatusAction( { exercise } );

	return (
		<div className={ "flex items-center justify-start gap-2" }>
			<ExerciseSheet exercise={ exercise } mode={ "edit" }/>
			<Button
				isIconOnly
				aria-label={ `${ statusLabel } ${ exercise.name }` }
				className={ statusClassName }
				isDisabled={ isPending }
				size={ "sm" }
				variant={ "ghost" }
				onPress={ changeStatus }
			>
				{ isPending ? (
					<Spinner color={ "current" } size={ "sm" }/>
				) : exercise.active ? (
					<Trash2 className={ "size-4" }/>
				) : (
					<CheckCircle2 className={ "size-4" }/>
				) }
			</Button>
		</div>
	);
}
