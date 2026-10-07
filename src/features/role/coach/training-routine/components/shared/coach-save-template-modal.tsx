"use client";

import { Button, FieldError, Input, Label, Modal, Spinner, TextField, toast } from "@heroui/react";
import { BookmarkPlus } from "lucide-react";
import { useState } from "react";

import { monthYearLabel } from "@/constants/months";
import { useSaveRoutineAsTemplate } from "@/features/role/coach/training-routine/hooks/use-routine-templates";
import {
	isRoutineTemplateNameValid,
	ROUTINE_TEMPLATE_NAME_MAX_LENGTH,
} from "@/features/training-routine/services/routine-template";

type CoachSaveTemplateModalProps = {
	isOpen: boolean;
	month: number;
	onOpenChangeAction: ( isOpen: boolean ) => void;
	studentId: string;
	studentName: string;
	summary: { dayCount: number; exerciseCount: number; weekCount: number };
	year: number;
};

function pluralize( count: number, singular: string, plural: string ) {
	return `${ count } ${ count === 1 ? singular : plural }`;
}

// Guarda la rutina del mes como plantilla, con un nombre. Solo pide el nombre:
// el contenido es la rutina que el entrenador ya tiene en pantalla.
export function CoachSaveTemplateModal( {
	isOpen,
	month,
	onOpenChangeAction,
	studentId,
	studentName,
	summary,
	year,
}: CoachSaveTemplateModalProps ) {
	const saveTemplate = useSaveRoutineAsTemplate();
	const [ name, setName ] = useState( "" );
	const [ nameError, setNameError ] = useState<string | null>( null );
	const hasExercises = summary.exerciseCount > 0;

	function handleOpenChange( nextIsOpen: boolean ) {
		if (!nextIsOpen) {
			setName( "" );
			setNameError( null );
			saveTemplate.reset();
		}

		onOpenChangeAction( nextIsOpen );
	}

	async function handleSave() {
		if (!isRoutineTemplateNameValid( name )) {
			setNameError( "Escribí un nombre para la plantilla." );

			return;
		}

		try {
			const result = await saveTemplate.mutateAsync( { month, name, studentId, year } );

			if (result.ok) {
				toast.success( "Plantilla guardada", {
					description: `"${ result.template.name }" quedó guardada con ${ pluralize( result.template.exerciseCount, "ejercicio", "ejercicios" ) }.`,
				} );
				handleOpenChange( false );

				return;
			}

			setNameError(
				result.reason === "duplicate-name"
					? "Ya tenés una plantilla con ese nombre. Probá con otro."
					: result.reason === "empty-routine"
						? "Esta rutina no tiene ejercicios para guardar."
						: "Escribí un nombre para la plantilla.",
			);
		} catch {
			toast.danger( "No se pudo guardar la plantilla", {
				description: "La rutina del estudiante quedó como estaba. Probá de nuevo.",
			} );
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
						<Modal.Heading>Guardar como plantilla</Modal.Heading>
					</Modal.Header>
					<Modal.Body className={ "space-y-4" }>
						{ hasExercises ? (
							<>
								<p className={ "text-sm leading-6 text-muted" }>
									Se guarda una copia de la rutina de { monthYearLabel( String( month ), String( year ) ) } de { studentName }:{ " " }
									{ pluralize( summary.weekCount, "semana", "semanas" ) }, { pluralize( summary.dayCount, "día", "días" ) } y{ " " }
									{ pluralize( summary.exerciseCount, "ejercicio", "ejercicios" ) }. Si después cambiás la rutina del estudiante, la plantilla no cambia.
								</p>
								<TextField
									autoFocus
									fullWidth
									isRequired
									isInvalid={ nameError !== null }
									maxLength={ ROUTINE_TEMPLATE_NAME_MAX_LENGTH }
									name={ "template-name" }
									value={ name }
									onChange={ ( value ) => {
										setName( value );
										setNameError( null );
									} }
								>
									<Label>Nombre de la plantilla</Label>
									<Input placeholder={ "Ej.: Hipertrofia 4 días" } variant={ "secondary" }/>
									<FieldError>{ nameError }</FieldError>
								</TextField>
							</>
						) : (
							<p className={ "text-sm leading-6 text-muted" }>
								Esta rutina todavía no tiene ejercicios. Cargá al menos uno para guardarla como plantilla.
							</p>
						) }
					</Modal.Body>
					<Modal.Footer className={ "gap-2" }>
						<Button isDisabled={ saveTemplate.isPending } variant={ "secondary" } onPress={ () => handleOpenChange( false ) }>
							{ hasExercises ? "Cancelar" : "Cerrar" }
						</Button>
						{ hasExercises ? (
							<Button
								isDisabled={ !name.trim() || saveTemplate.isPending }
								isPending={ saveTemplate.isPending }
								onPress={ () => void handleSave() }
							>
								{ saveTemplate.isPending ? <Spinner color={ "current" } size={ "sm" }/> : <BookmarkPlus className={ "size-4" }/> }
								{ saveTemplate.isPending ? "Guardando..." : "Guardar plantilla" }
							</Button>
						) : null }
					</Modal.Footer>
				</Modal.Dialog>
			</Modal.Container>
		</Modal.Backdrop>
	);
}
