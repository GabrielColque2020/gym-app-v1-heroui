"use client";

import { useState } from "react";

import { Button } from "@heroui/react";
import { PencilLine } from "lucide-react";

import { AdminExerciseGlobalDrawer } from "@/features/role/admin/exercises/components/shared/admin-exercise-global-drawer";
import type { AdminExerciseGlobalListItem } from "@/features/role/admin/exercises/types/admin-exercise-global-list-item";

type AdminExerciseGlobalRowActionsProps = {
	exercise: AdminExerciseGlobalListItem;
};

// Editar es lo unico que se hace con un ejercicio global: va en un boton directo,
// sin un menu de una sola opcion.
export function AdminExerciseGlobalRowActions( {
	exercise,
}: AdminExerciseGlobalRowActionsProps ) {
	const [ isEditOpen, setIsEditOpen ] = useState( false );

	return (
		<>
			<Button
				isIconOnly
				aria-label={ `Editar ${ exercise.name }` }
				className={ "size-8 shrink-0 text-foreground" }
				size={ "sm" }
				variant={ "ghost" }
				onPress={ () => setIsEditOpen( true ) }
			>
				<PencilLine className={ "size-4" }/>
			</Button>
			<AdminExerciseGlobalDrawer
				hideTrigger
				exercise={ exercise }
				isOpen={ isEditOpen }
				onOpenChangeAction={ setIsEditOpen }
			/>
		</>
	);
}
