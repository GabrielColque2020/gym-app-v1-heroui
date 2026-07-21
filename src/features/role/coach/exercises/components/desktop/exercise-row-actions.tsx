"use client";

import { Button, Spinner } from "@heroui/react";
import { CheckCircle2, Trash2 } from "lucide-react";

import { ExerciseDrawer } from "@/features/role/coach/exercises/components/shared/exercise-drawer";
import type { CoachExerciseListItem } from "@/features/role/coach/exercises/types/coach-exercise-list-item";
import { useCoachExerciseStatusAction } from "@/features/role/coach/exercises/hooks/use-coach-exercise-status-action";

type ExerciseRowActionsProps = {
	exercise: CoachExerciseListItem;
};

export function ExerciseRowActions( {
	exercise,
}: ExerciseRowActionsProps ) {
	const { changeStatus, isPending, statusClassName, statusLabel } = useCoachExerciseStatusAction( { exercise } );

	return (
		<div className={ "flex items-center justify-start gap-2" }>
			<ExerciseDrawer exercise={ exercise } mode={ "edit" }/>
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
