"use client";

import { Plus } from "@gravity-ui/icons";
import { Description } from "@heroui/react";
import { Sheet } from "@heroui-pro/react";

export function SearchAndCreateExerciseSheetHeader() {
	return (
		<Sheet.Header className={ "border-default-100 relative border-b px-6 pb-5 pt-5" }>
			<div className={ "flex min-w-0 items-start gap-3 pe-10" }>
				<div className={ "flex size-10 shrink-0 items-center justify-center rounded-xl border border-accent-soft bg-accent-soft/60 text-accent" }>
					<Plus className={ "size-5" }/>
				</div>
				<div className={ "min-w-0 flex-1" }>
					<Sheet.Heading>Agregar ejercicio</Sheet.Heading>
					<Description className={ "mt-1 text-sm" }>
						Busca en el catalogo activo y agregalo al borrador del dia.
					</Description>
				</div>
			</div>
		</Sheet.Header>
	);
}
