"use client";

import type { Key } from "@heroui/react";

import { useState } from "react";

import { Button, Dropdown, Header, Label } from "@heroui/react";
import { EllipsisVertical, PencilLine } from "lucide-react";

import { AdminExerciseGlobalDrawer } from "@/features/role/admin/exercises/components/shared/admin-exercise-global-drawer";
import type { AdminExerciseGlobalListItem } from "@/features/role/admin/exercises/types/admin-exercise-global-list-item";

type AdminExerciseGlobalActionMenuProps = {
	exercise: AdminExerciseGlobalListItem;
};

export function AdminExerciseGlobalActionMenu( {
	exercise,
}: AdminExerciseGlobalActionMenuProps ) {
	const [ isEditOpen, setIsEditOpen ] = useState( false );

	function handleAction( key: Key ) {
		if (key === "edit") {
			setIsEditOpen( true );
		}
	}

	return (
		<>
			<Dropdown>
				<Button
					isIconOnly
					aria-label={ `Opciones de ${ exercise.name }` }
					className={ "size-8 shrink-0 text-foreground" }
					size={ "sm" }
					variant={ "ghost" }
				>
					<EllipsisVertical className={ "size-4" }/>
				</Button>
				<Dropdown.Popover placement={ "bottom end" }>
					<Dropdown.Menu onAction={ handleAction }>
						<Header>Opciones</Header>
						<Dropdown.Item id={ "edit" } textValue={ "Editar ejercicio global" }>
							<PencilLine className={ "size-4 shrink-0 text-warning" }/>
							<Label className={ "text-warning" }>Editar</Label>
						</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown.Popover>
			</Dropdown>

			<AdminExerciseGlobalDrawer
				hideTrigger
				exercise={ exercise }
				isOpen={ isEditOpen }
				onOpenChangeAction={ setIsEditOpen }
			/>
		</>
	);
}
