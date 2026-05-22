import { Sheet } from "@heroui-pro/react";
import { Button } from "@heroui/react";
import { Plus } from "@gravity-ui/icons";
import React from "react";

export function AdminCreateRoutineSheetMobile() {
	return (
		<Sheet key={ "SheetWeb" } isDetached placement={ "bottom" }>
			<Sheet.Trigger>
				{ /*className={ "text-accent border-accent" }*/ }
				<Button variant={ "outline" } className={ "text-accent border-accent" }>
					<Plus/>
					Crear Rutina
				</Button>
			</Sheet.Trigger>
			<Sheet.Backdrop>
				<Sheet.Content className={ "mx-auto max-w-105" }>
					<Sheet.Handle/>
					<Sheet.Dialog>
						<Sheet.Body className={ "flex flex-col gap-4 py-5" }>
							<Sheet.Heading>Crear Rutina</Sheet.Heading>
							<p className={ "text-muted text-sm" }>
								Crea una nueva rutina desde cero, eligiendo las semanas y dias.
							</p>
						</Sheet.Body>
					</Sheet.Dialog>
				</Sheet.Content>
			</Sheet.Backdrop>
		</Sheet>
	)
}