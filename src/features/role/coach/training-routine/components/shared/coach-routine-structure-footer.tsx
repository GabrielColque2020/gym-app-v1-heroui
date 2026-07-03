"use client";

import { Button, Spinner } from "@heroui/react";
import { CheckCircle2 } from "lucide-react";

type CoachRoutineStructureFooterProps = {
	disabled: boolean;
	isPending: boolean;
	mode: "create" | "edit";
	onCancelAction: () => void;
	onSaveAction: () => void;
};

export function CoachRoutineStructureFooter( {
	disabled,
	isPending,
	mode,
	onCancelAction,
	onSaveAction,
}: CoachRoutineStructureFooterProps ) {
	return (
		<div className={ "border-default-100 bg-background flex shrink-0 justify-end gap-2 border-t px-6 py-4" }>
			<Button isDisabled={ isPending } variant={ "secondary" } onPress={ onCancelAction }>
				Cancelar
			</Button>
			<Button isDisabled={ disabled } isPending={ isPending } onPress={ onSaveAction }>
				{ ( { isPending: buttonPending } ) => (
					<>
						{ buttonPending ? <Spinner color={ "current" } size={ "sm" }/> : <CheckCircle2 className={ "size-4" }/> }
						{ buttonPending ? "Guardando..." : mode === "create" ? "Crear rutina" : "Guardar estructura" }
					</>
				) }
			</Button>
		</div>
	);
}
