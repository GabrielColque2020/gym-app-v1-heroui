"use client";

import { CircleLink, EllipsisVertical, TrashBin } from "@gravity-ui/icons";
import { Button, Dropdown, Header, Label } from "@heroui/react";
import { useState } from "react";

import { ExerciseVariantsSheet } from "@/features/role/coach/exercises/components/shared/exercise-variants-sheet";
import type { DraftRoutineDayExercise } from "@/features/routine/services/routine-day-editor";

type RoutineExerciseActionsProps = {
	exercise: DraftRoutineDayExercise[ "exercise" ];
	exerciseName: string;
	routineId: string | null;
	onDeleteAction: () => void;
};

export function RoutineExerciseActions( {
	exercise,
	exerciseName,
	routineId,
	onDeleteAction,
}: RoutineExerciseActionsProps ) {
	const [ isVariantsOpen, setIsVariantsOpen ] = useState( false );

	return (
		<>
			<Dropdown>
				<Button
					isIconOnly
					aria-label={ `Opciones de ${ exerciseName }` }
					className={ "size-8 shrink-0 text-foreground" }
					variant={ "ghost" }
				>
					<EllipsisVertical className={ "size-4" }/>
				</Button>
				<Dropdown.Popover placement={ "bottom end" }>
					<Dropdown.Menu
						onAction={ ( key ) => {
							if (key === "variants" && exercise && routineId) setIsVariantsOpen( true );
							if (key === "delete") onDeleteAction();
						} }
					>
						<Header>Opciones</Header>
						<Dropdown.Item id={ "variants" } textValue={ "Variantes" } isDisabled={ !exercise || !routineId }>
							<CircleLink className={ "size-4 shrink-0 text-accent" }/>
							<Label className={ "text-accent" }>Variantes</Label>
						</Dropdown.Item>
						<Dropdown.Item id={ "delete" } textValue={ "Eliminar" } variant={ "danger" }>
							<TrashBin className={ "size-4 shrink-0 text-danger" }/>
							<Label>Eliminar</Label>
						</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown.Popover>
			</Dropdown>

			{ exercise ? (
				<ExerciseVariantsSheet
					hideTrigger
					exercise={ exercise }
					routineId={ routineId }
					isOpen={ isVariantsOpen }
					onOpenChangeAction={ setIsVariantsOpen }
				/>
			) : null }
		</>
	);
}
