"use client";

import { Pencil, Plus } from "@gravity-ui/icons";
import { Description, Typography } from "@heroui/react";

type CoachRoutineStructureHeaderProps = {
	description: string;
	mode: "create" | "edit";
};

export function CoachRoutineStructureHeader( {
	description,
	mode,
}: CoachRoutineStructureHeaderProps ) {
	const Icon = mode === "create" ? Plus : Pencil;
	const title = mode === "create" ? "Crear rutina" : "Editar rutina";

	return (
		<div className={ "border-default-100 relative border-b px-6 pb-5 pt-5" }>
			<div className={ "flex min-w-0 items-start gap-3 pe-10" }>
				<div className={ "flex size-10 shrink-0 items-center justify-center rounded-xl border border-accent-soft bg-accent-soft/60 text-accent" }>
					<Icon className={ "size-5" }/>
				</div>
				<div className={ "min-w-0 flex-1" }>
					<Typography className={ "text-lg font-semibold" }>{ title }</Typography>
					<Description className={ "mt-1 text-sm" }>{ description }</Description>
				</div>
			</div>
		</div>
	);
}
