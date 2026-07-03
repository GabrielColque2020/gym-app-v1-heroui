"use client";

import { CircleCheck, Pencil, Plus } from "@gravity-ui/icons";
import { Description } from "@heroui/react";
import { Sheet } from "@heroui-pro/react";

type ExerciseSheetHeaderProps = {
	isEditMode: boolean;
};

export function ExerciseSheetHeader( {
	isEditMode,
}: ExerciseSheetHeaderProps ) {
	const title = isEditMode ? "Editar ejercicio" : "Nuevo ejercicio";
	const description = isEditMode
		? "Actualiza los datos del ejercicio y su estado dentro del catalogo."
		: "Carga un ejercicio disponible para rutinas y seguimiento de alumnos.";

	return (
		<Sheet.Header className={ "border-default-100 relative border-b pb-4" }>
			<div className={ "flex gap-3 " }>
				<div className={ "flex size-10 shrink-0 items-center justify-center rounded-xl border border-accent-soft bg-accent-soft/60 text-accent" }>
					{ isEditMode ? <Pencil className={ "size-5" }/> : <Plus className={ "size-5" }/> }
				</div>
				<div>
					<Sheet.Heading>{ title }</Sheet.Heading>
					<Description className={ "mt-1 text-sm" }>{ description }</Description>
				</div>
			</div>
		</Sheet.Header>
	);
}

export { CircleCheck };
