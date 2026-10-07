"use client";

import { Button, Modal, Spinner, toast } from "@heroui/react";
import { BookmarkCheck, Check } from "lucide-react";
import { useState } from "react";

import { monthYearLabel } from "@/constants/months";
import { useApplyRoutineTemplate, useRoutineTemplates } from "@/features/role/coach/training-routine/hooks/use-routine-templates";

type CoachUseTemplateModalProps = {
	// Series que el estudiante ya cargo en el mes.
	destinationLoadedSetCount?: number;
	// Si el mes ya tiene rutina, usar una plantilla la reemplaza.
	hasActiveRoutine: boolean;
	isOpen: boolean;
	month: number;
	onOpenChangeAction: ( isOpen: boolean ) => void;
	studentId: string;
	studentName: string;
	year: number;
};

function pluralize( count: number, singular: string, plural: string ) {
	return `${ count } ${ count === 1 ? singular : plural }`;
}

// Arma la rutina del mes a partir de una plantilla del entrenador. Si el mes ya
// tiene rutina, el primer toque no la pisa: pide confirmar, porque lo
// reemplazado no se recupera.
export function CoachUseTemplateModal( {
	destinationLoadedSetCount = 0,
	hasActiveRoutine,
	isOpen,
	month,
	onOpenChangeAction,
	studentId,
	studentName,
	year,
}: CoachUseTemplateModalProps ) {
	const { data: templates = [], isError, isLoading } = useRoutineTemplates();
	const applyTemplate = useApplyRoutineTemplate();
	const [ selectedTemplateId, setSelectedTemplateId ] = useState<string | null>( null );
	const [ isConfirming, setIsConfirming ] = useState( false );
	const selectedTemplate = templates.find( ( template ) => template.id === selectedTemplateId ) ?? null;
	const monthLabel = monthYearLabel( String( month ), String( year ) );

	function handleOpenChange( nextIsOpen: boolean ) {
		if (!nextIsOpen) {
			setSelectedTemplateId( null );
			setIsConfirming( false );
			applyTemplate.reset();
		}

		onOpenChangeAction( nextIsOpen );
	}

	async function handleApply() {
		if (!selectedTemplate) return;

		if (hasActiveRoutine && !isConfirming) {
			setIsConfirming( true );

			return;
		}

		try {
			const result = await applyTemplate.mutateAsync( { month, studentId, templateId: selectedTemplate.id, year } );

			if (result.ok) {
				toast.success( "Rutina armada con la plantilla", {
					description: `${ studentName } ya tiene "${ result.templateName }" en ${ monthLabel }. Ajustala a su medida.`,
				} );
				handleOpenChange( false );

				return;
			}

			setSelectedTemplateId( null );
			setIsConfirming( false );
			toast.danger( result.reason === "template-not-found" ? "Esa plantilla ya no existe" : "No se encontró al estudiante", {
				description: "La rutina quedó como estaba.",
			} );
		} catch {
			toast.danger( "No se pudo usar la plantilla", {
				description: "La rutina quedó como estaba. Probá de nuevo.",
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
						<Modal.Heading>Usar una plantilla</Modal.Heading>
					</Modal.Header>
					<Modal.Body className={ "space-y-3" }>
						{ isLoading ? (
							<div className={ "flex justify-center py-6" }>
								<Spinner aria-label={ "Cargando plantillas" }/>
							</div>
						) : isError ? (
							<p className={ "text-sm leading-6 text-muted" }>No se pudieron cargar las plantillas. Cerrá y probá de nuevo.</p>
						) : templates.length === 0 ? (
							<p className={ "text-sm leading-6 text-muted" }>
								Todavía no tenés plantillas. Para crear una, abrí una rutina que te guste, tocá los tres puntos y elegí &quot;Guardar como plantilla&quot;.
							</p>
						) : (
							<>
								<p className={ "text-sm leading-6 text-muted" }>
									Elegí con cuál armar la rutina de { monthLabel } de { studentName }. Se copia entera y después la ajustás.
								</p>
								<div aria-label={ "Plantillas" } className={ "max-h-72 space-y-2 overflow-y-auto p-0.5" } role={ "radiogroup" }>
									{ templates.map( ( template ) => {
										const isSelected = template.id === selectedTemplateId;

										return (
											<button
												key={ template.id }
												aria-checked={ isSelected }
												className={ `flex w-full cursor-pointer items-center gap-3 rounded-xl border p-3 text-left outline-none transition focus-visible:ring-2 focus-visible:ring-accent ${ isSelected ? "border-accent bg-accent-soft/50" : "border-border hover:bg-default/60" }` }
												disabled={ applyTemplate.isPending }
												role={ "radio" }
												type={ "button" }
												onClick={ () => {
													setSelectedTemplateId( template.id );
													setIsConfirming( false );
												} }
											>
												<span className={ "min-w-0 flex-1" }>
													<span className={ "line-clamp-2 block text-sm font-semibold text-foreground" }>{ template.name }</span>
													<span className={ "block text-xs text-muted" }>
														{ pluralize( template.weekCount, "semana", "semanas" ) } · { pluralize( template.dayCount, "día", "días" ) } · { pluralize( template.exerciseCount, "ejercicio", "ejercicios" ) }
													</span>
												</span>
												{ isSelected ? <Check aria-hidden className={ "size-4 shrink-0 text-accent" }/> : null }
											</button>
										);
									} ) }
								</div>
								{ isConfirming ? (
									<p className={ "text-sm font-medium text-danger" } role={ "alert" }>
										{ `¿Reemplazar la rutina de ${ monthLabel }? Lo que tiene cargado ese mes se pierde y no se recupera.` }
										{ destinationLoadedSetCount > 0
											? " Las series que el estudiante ya cargó no se borran, pero los días vuelven a figurar sin terminar."
											: "" }
									</p>
								) : hasActiveRoutine ? (
									<p className={ "text-xs leading-5 text-muted" }>{ monthLabel } ya tiene rutina: usar una plantilla la reemplaza.</p>
								) : null }
							</>
						) }
					</Modal.Body>
					<Modal.Footer className={ "gap-2" }>
						<Button
							isDisabled={ applyTemplate.isPending }
							variant={ "secondary" }
							onPress={ () => ( isConfirming ? setIsConfirming( false ) : handleOpenChange( false ) ) }
						>
							{ templates.length === 0 ? "Cerrar" : isConfirming ? "Volver" : "Cancelar" }
						</Button>
						{ templates.length > 0 ? (
							<Button
								className={ isConfirming ? "bg-danger text-danger-foreground" : "" }
								isDisabled={ !selectedTemplate || applyTemplate.isPending }
								isPending={ applyTemplate.isPending }
								onPress={ () => void handleApply() }
							>
								{ applyTemplate.isPending ? <Spinner color={ "current" } size={ "sm" }/> : <BookmarkCheck className={ "size-4" }/> }
								{ applyTemplate.isPending ? "Armando..." : isConfirming ? "Sí, reemplazar" : "Usar plantilla" }
							</Button>
						) : null }
					</Modal.Footer>
				</Modal.Dialog>
			</Modal.Container>
		</Modal.Backdrop>
	);
}
