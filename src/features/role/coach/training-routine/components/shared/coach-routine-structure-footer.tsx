"use client";

import { CircleCheck } from "@gravity-ui/icons";
import { Button, Spinner } from "@heroui/react";

type CoachRoutineStructureFooterProps = {
	disabled: boolean;
	isPending: boolean;
	mode: "create" | "edit";
	onCancel: () => void;
	onSave: () => void;
};

export function CoachRoutineStructureFooter( {
	disabled,
	isPending,
	mode,
	onCancel,
	onSave,
}: CoachRoutineStructureFooterProps ) {
	return (
		<div className={ "border-default-100 bg-background flex shrink-0 justify-end gap-2 border-t px-6 py-4" }>
			<Button isDisabled={ isPending } variant={ "secondary" } onPress={ onCancel }>
				Cancelar
			</Button>
			<Button isDisabled={ disabled } isPending={ isPending } onPress={ onSave }>
				{ ( { isPending: buttonPending } ) => (
					<>
						{ buttonPending ? <Spinner color={ "current" } size={ "sm" }/> : <CircleCheck className={ "size-4" }/> }
						{ buttonPending ? "Guardando..." : mode === "create" ? "Crear rutina" : "Guardar estructura" }
					</>
				) }
			</Button>
		</div>
	);
}
