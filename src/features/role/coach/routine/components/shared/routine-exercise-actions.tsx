"use client";

import { Button, Description, Dropdown, Header, Label } from "@heroui/react";
import { useState } from "react";
import { Link2, MoreVertical, Trash2 } from "lucide-react";

import { ExerciseVariantsDrawer } from "@/features/role/coach/exercises/components/shared/exercise-variants-drawer";
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
	const canOpenVariants = Boolean( exercise && routineId );
	const variantsHelpMessage = !routineId
		? "Guarda primero la rutina para poder editar variantes."
		: "Guarda este ejercicio en la rutina para poder editar variantes.";

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
							if (key === "variants" && canOpenVariants) setIsVariantsOpen( true );
							if (key === "delete") onDeleteAction();
						} }
					>
						<Header>Opciones</Header>
						<Dropdown.Item id={ "variants" } textValue={ "Variantes" } isDisabled={ !canOpenVariants }>
							<div className={ "flex min-w-0 flex-col" }>
								<div className={ "flex items-center gap-2" }>
									<Link2 className={ "size-4 shrink-0 text-accent" }/>
									<Label className={ "text-accent" }>Variantes</Label>
								</div>
								{ !canOpenVariants ? (
									<Description className={ "text-xs text-muted" }>
										{ variantsHelpMessage }
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
