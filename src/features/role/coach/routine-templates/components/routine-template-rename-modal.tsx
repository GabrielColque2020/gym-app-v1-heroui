"use client";

import type { RoutineTemplateListItem } from "@/features/training-routine/services/routine-template";

import { Button, FieldError, Input, Label, Modal, Spinner, TextField, toast } from "@heroui/react";
import { useState } from "react";

import { useRenameRoutineTemplate } from "@/features/role/coach/training-routine/hooks/use-routine-templates";
import {
	isRoutineTemplateNameValid,
	normalizeRoutineTemplateName,
	ROUTINE_TEMPLATE_NAME_MAX_LENGTH,
} from "@/features/training-routine/services/routine-template";

type RoutineTemplateRenameModalProps = {
	isOpen: boolean;
	onOpenChangeAction: ( isOpen: boolean ) => void;
	template: RoutineTemplateListItem;
};

export function RoutineTemplateRenameModal( { isOpen, onOpenChangeAction, template }: RoutineTemplateRenameModalProps ) {
	const renameTemplate = useRenameRoutineTemplate();
	// Sin valor mientras no se toca el campo: asi muestra siempre el nombre actual.
	const [ draftName, setDraftName ] = useState<string | null>( null );
	const [ nameError, setNameError ] = useState<string | null>( null );
	const name = draftName ?? template.name;
	const isUnchanged = normalizeRoutineTemplateName( name ) === template.name;

	function handleOpenChange( nextIsOpen: boolean ) {
		if (!nextIsOpen) {
			setDraftName( null );
			setNameError( null );
			renameTemplate.reset();
		}

		onOpenChangeAction( nextIsOpen );
	}

	async function handleSave() {
		if (!isRoutineTemplateNameValid( name )) {
			setNameError( "Escribí un nombre para la plantilla." );

			return;
		}

		try {
			const result = await renameTemplate.mutateAsync( { name, templateId: template.id } );

			if (result.ok) {
				toast.success( "Nombre cambiado", { description: `Ahora se llama "${ result.name }".` } );
				handleOpenChange( false );

				return;
			}

			if (result.reason === "template-not-found") {
				toast.danger( "Esa plantilla ya no existe", { description: "La lista se actualizó." } );
				handleOpenChange( false );

				return;
			}

			setNameError(
				result.reason === "duplicate-name"
					? "Ya tenés una plantilla con ese nombre. Probá con otro."
					: "Escribí un nombre para la plantilla.",
			);
		} catch {
			toast.danger( "No se pudo cambiar el nombre", { description: "Probá de nuevo." } );
		}
	}

	return (
		<Modal.Backdrop
			isDismissable={ false }
			isOpen={ isOpen }
			variant={ "blur" }
			onOpenChange={ handleOpenChange }
		>
			<Modal.Container size={ "sm" }>
				<Modal.Dialog className={ "sm:max-w-md" }>
					<Modal.Header>
						<Modal.Heading>Cambiar el nombre</Modal.Heading>
					</Modal.Header>
					<Modal.Body>
						<TextField
							autoFocus
							fullWidth
							isRequired
							isInvalid={ nameError !== null }
							maxLength={ ROUTINE_TEMPLATE_NAME_MAX_LENGTH }
							name={ "template-name" }
							value={ name }
							onChange={ ( value ) => {
								setDraftName( value );
								setNameError( null );
							} }
						>
							<Label>Nombre de la plantilla</Label>
							<Input variant={ "secondary" }/>
							<FieldError>{ nameError }</FieldError>
						</TextField>
					</Modal.Body>
					<Modal.Footer className={ "gap-2" }>
						<Button isDisabled={ renameTemplate.isPending } variant={ "secondary" } onPress={ () => handleOpenChange( false ) }>
							Cancelar
						</Button>
						<Button
							isDisabled={ !name.trim() || isUnchanged || renameTemplate.isPending }
							isPending={ renameTemplate.isPending }
							onPress={ () => void handleSave() }
						>
							{ renameTemplate.isPending ? <Spinner color={ "current" } size={ "sm" }/> : null }
							{ renameTemplate.isPending ? "Guardando..." : "Guardar" }
						</Button>
					</Modal.Footer>
				</Modal.Dialog>
			</Modal.Container>
		</Modal.Backdrop>
	);
}
