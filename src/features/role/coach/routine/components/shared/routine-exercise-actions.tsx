"use client";

import { Button, Dropdown, Header, Label } from "@heroui/react";
import { MoreVertical, Trash2 } from "lucide-react";

type RoutineExerciseActionsProps = {
	exerciseName: string;
	onDeleteAction: () => void;
};

// Las variantes ya no estan aca: tienen su propio boton en la fila, a la vista.
export function RoutineExerciseActions( { exerciseName, onDeleteAction }: RoutineExerciseActionsProps ) {
	return (
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
						if (key === "delete") onDeleteAction();
					} }
				>
					<Header>Opciones</Header>
					<Dropdown.Item id={ "delete" } textValue={ "Eliminar" } variant={ "danger" }>
						<Trash2 className={ "size-4 shrink-0 text-danger" }/>
						<Label className={ "text-danger" }>Eliminar</Label>
					</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown.Popover>
		</Dropdown>
	);
}
