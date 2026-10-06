"use client";

import { Button, Description, Dropdown, Header, Label } from "@heroui/react";
import { useState } from "react";
import { Link2, MoreVertical, Trash2 } from "lucide-react";

import { ExerciseVariantsDrawer } from "@/features/role/coach/exercises/components/shared/exercise-variants-drawer";
import { useRoutineDayEditorActions } from "@/features/role/coach/routine/components/shared/routine-day-editor-actions-context";
import type { DraftRoutineDayExercise } from "@/features/routine/services/routine-day-editor";

type RoutineExerciseActionsProps = {
	exercise: DraftRoutineDayExercise[ "exercise" ];
	clientId: string;
	exerciseName: string;
	routineId: string | null;
	onDeleteAction: () => void;
};

export function RoutineExerciseActions( {
										 exercise,
										 clientId,
										 exerciseName,
										 routineId,
										 onDeleteAction,
									 }: RoutineExerciseActionsProps ) {
	const [ isVariantsOpen, setIsVariantsOpen ] = useState( false );
	const { onRequestVariants } = useRoutineDayEditorActions();
	// Un ejercicio recien agregado todavia no existe en la rutina: se guarda el
	// dia y el editor abre las variantes apenas tiene la fila guardada.
	const needsSaveFirst = Boolean( exercise ) && !routineId;

	return (
		<>
			<Dropdown>
				<Button
					isIconOnly
					aria-label={ `Opciones de ${ exerciseName }` }
					className={ "size-8 shrink-0 text-foreground" }
					variant={ "ghost" }
				>
					<MoreVertical className={ "size-4" }/>
				</Button>
				<Dropdown.Popover placement={ "bottom end" }>
					<Dropdown.Menu
						onAction={ ( key ) => {
							if (key === "variants" && needsSaveFirst) onRequestVariants( clientId );
							if (key === "variants" && !needsSaveFirst) setIsVariantsOpen( true );
							if (key === "delete") onDeleteAction();
						} }
					>
						<Header>Opciones</Header>
						<Dropdown.Item id={ "variants" } textValue={ "Variantes" } isDisabled={ !exercise }>
							<div className={ "flex min-w-0 flex-col" }>
								<div className={ "flex items-center gap-2" }>
									<Link2 className={ "size-4 shrink-0 text-accent" }/>
									<Label className={ "text-accent" }>Variantes</Label>
								</div>
								{ needsSaveFirst ? (
									<Description className={ "text-xs text-muted" }>
										Guarda el día y abre las variantes.
									</Description>
								) : null }
							</div>
						</Dropdown.Item>
						<Dropdown.Item id={ "delete" } textValue={ "Eliminar" } variant={ "danger" }>
							<Trash2 className={ "size-4 shrink-0 text-danger" }/>
							<Label>Eliminar</Label>
						</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown.Popover>
			</Dropdown>

			{ exercise ? (
				<ExerciseVariantsDrawer
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
