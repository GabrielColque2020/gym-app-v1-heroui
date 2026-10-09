"use client";

import type { StudentListItem } from "@/features/students/actions/get-students";

import { useState } from "react";
import { Button } from "@heroui/react";
import { PencilLine } from "lucide-react";

import { StudentDrawer } from "@/features/students/components/shared/student-drawer";
import { useResponsiveDrawerPlacement } from "@/features/shared/hooks/use-responsive-drawer-placement";

type StudentEditButtonProps = {
	// En la tabla va con texto; en la tarjeta del telefono, solo el lapiz.
	showLabel?: boolean;
	student: StudentListItem;
};

// "Editar" a la vista en cada estudiante. Antes estaba dentro de un menu de tres
// puntos junto a "Desactivar": lo que mas se usa quedaba escondido al lado de lo
// mas grave. Desactivar ahora esta dentro del formulario que abre este boton.
export function StudentEditButton( { showLabel = false, student }: StudentEditButtonProps ) {
	const [ isEditOpen, setIsEditOpen ] = useState( false );
	const placement = useResponsiveDrawerPlacement();

	return (
		<>
			<Button
				aria-label={ `Editar a ${ student.name }` }
				className={ showLabel ? "shrink-0" : "size-9 shrink-0" }
				isIconOnly={ !showLabel }
				size={ "sm" }
				// El mismo estilo que "Abrir": dos botones iguales se leen como un par.
				// Uno relleno y otro de texto suelto parecian cosas de distinto tipo.
				variant={ "secondary" }
				onPress={ () => setIsEditOpen( true ) }
			>
				<PencilLine className={ "size-4" }/>
				{ showLabel ? "Editar" : null }
			</Button>

			<StudentDrawer
				hideTrigger
				isOpen={ isEditOpen }
				mode={ "edit" }
				placement={ placement }
				student={ student }
				onOpenChangeAction={ setIsEditOpen }
			/>
		</>
	);
}
