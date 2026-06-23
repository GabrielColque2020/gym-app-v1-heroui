"use client";

import React, { useMemo, useState } from "react";

import { ArrowRightArrowLeft, CircleLink } from "@gravity-ui/icons";
import { Alert, Button, Card, Chip, Description } from "@heroui/react";
import { Sheet } from "@heroui-pro/react";

import { formatBodyPart } from "@/features/admin/exercises/services/exercise-form";
import type {
	Exercise,
	ExerciseSessionHistory,
	ExerciseVariantOption,
} from "@/features/student/routine/types/routine.types";

interface ExerciseCardProps {
	children: React.ReactNode;
	exercise: Exercise;
	onVariantChange: ( exerciseId: string, variantExerciseId: string | null ) => void;
}

// Devuelve la variante seleccionada para reflejar el nombre activo en la tarjeta.
function getSelectedVariant( variantOptions: ExerciseVariantOption[], selectedVariantId: string | null ) {
	return variantOptions.find( ( variant ) => variant.id === selectedVariantId ) ?? null;
}

// Formatea la fecha de una sesion historica para mostrarla en texto corto.
function formatSessionDateLabel( date: Date ) {
	return new Intl.DateTimeFormat( "es-AR", {
		day: "numeric",
		month: "long",
		year: "numeric",
	} ).format( date );
}

// Retorna el historial que debe mostrarse en la tarjeta segun la variante activa.
function getDisplayedSessionHistory(
	exercise: Exercise,
	selectedVariant: ExerciseVariantOption | null,
): ExerciseSessionHistory | null {
	return selectedVariant?.lastSession ?? exercise.lastSession;
}

// Calcula el resumen de series completadas para mostrarlo como chip.
function getCompletedSetsSummary( exercise: Exercise ) {
	const completedSets = exercise.sets.filter( ( set ) => set.completed ).length;

	return {
		completedSets,
		totalSets: exercise.sets.length,
	};
}

export default function MobileExerciseCard( { exercise, children, onVariantChange }: ExerciseCardProps ) {
	const [ isVariantSheetOpen, setIsVariantSheetOpen ] = useState( false );
	const variantOptions = exercise.variantOptions ?? [];
	const selectedVariant = useMemo(
		() => getSelectedVariant( variantOptions, exercise.variantExerciseId ),
		[ exercise.variantExerciseId, variantOptions ],
	);
	const displayedSessionHistory = useMemo(
		() => getDisplayedSessionHistory( exercise, selectedVariant ),
		[ exercise, selectedVariant ],
	);
	const completedSetsSummary = useMemo(
		() => getCompletedSetsSummary( exercise ),
		[ exercise ],
	);
	const displayedExerciseName = selectedVariant?.name ?? exercise.name;
	const hasVariants = variantOptions.length > 0;
	const hasSessionHistory = Boolean( displayedSessionHistory?.sets.length );
	const hasCompletedSets = completedSetsSummary.completedSets > 0;

	// Abre el sheet para revisar variantes disponibles del ejercicio actual.
	function handleOpenVariantSheet() {
		if (!hasVariants) return;

		setIsVariantSheetOpen( true );
	}

	// Aplica una variante al draft activo y cierra el sheet.
	function handleSelectVariant( variant: ExerciseVariantOption ) {
		onVariantChange( exercise.id, variant.id );
		setIsVariantSheetOpen( false );
	}

	// Restablece el ejercicio al original y cierra el sheet.
	function handleResetVariant() {
		onVariantChange( exercise.id, null );
		setIsVariantSheetOpen( false );
	}

	return (
		<>
			<Card className={ "border border-border bg-surface shadow-sm" }>
				<Card.Header className={ "pb-2" }>
					<Card.Title className={ "w-full text-xl font-bold text-foreground" }>
						<div className={ "space-y-2" }>
							<div className={ "flex items-start justify-between gap-3" }>
								<div className={ "min-w-0 space-y-1" }>
									<h2 className={ "min-w-0 text-2xl font-black tracking-tight text-foreground" }>
										{ displayedExerciseName }
									</h2>
									{ selectedVariant ? (
										<Chip color={ "warning" } size={ "sm" } variant={ "soft" }>
											<Chip.Label>{ `Original: ${ exercise.baseName }` }</Chip.Label>
										</Chip>
									) : null }
								</div>

								{ hasVariants ? (
									<Button size={ "sm" } variant={ "secondary" } onPress={ handleOpenVariantSheet }>
										<ArrowRightArrowLeft className={ "size-4" }/>
										Cambiar ejercicio
									</Button>
								) : null }
							</div>

							<div className={ "flex flex-wrap items-center gap-2" }>
								<Chip size={ "sm" } variant={ "soft" }>
									{ exercise.equipment }
								</Chip>
								<Chip
									color={ hasCompletedSets ? "success" : "default" }
									size={ "sm" }
									variant={ "soft" }
								>
									<Chip.Label>
										{ `Series completadas: ${ completedSetsSummary.completedSets }/${ completedSetsSummary.totalSets }` }
									</Chip.Label>
								</Chip>
								{ selectedVariant ? (
									<Chip color={ "warning" } size={ "sm" } variant={ "soft" }>
										<Chip.Label>Ejercicio cambiado</Chip.Label>
									</Chip>
								) : null }
							</div>

							<div className={ "space-y-1" }>
								<p className={ "text-xs font-medium text-foreground" }>Ultima sesion</p>
								{ hasSessionHistory && displayedSessionHistory ? (
									<div className={ "flex flex-wrap items-center gap-2" }>
										<Chip size={ "sm" } variant={ "soft" }>
											<Chip.Label>{ formatSessionDateLabel( displayedSessionHistory.date ) }</Chip.Label>
										</Chip>

										{ displayedSessionHistory.sets.map( ( set ) => (
											<Chip
												key={ `${ displayedSessionHistory.date.toISOString() }-${ set.setNumber }` }
												size={ "sm" }
												variant={ "soft" }
											>
												<Chip.Label>
													{ `${ String( set.setNumber ).padStart( 2, "0" ) } x ${ set.repsCompleted ?? 0 } reps · ${ set.weightUsed ?? 0 } kg` }
												</Chip.Label>
											</Chip>
										) ) }
									</div>
								) : (
									<Chip color={ "warning" } size={ "sm" } variant={ "soft" }>
										<Chip.Label>Sin registro anterior</Chip.Label>
									</Chip>
								) }
							</div>
						</div>
					</Card.Title>
				</Card.Header>

				<Card.Content className={ "pt-2" }>
					<div className={ "space-y-3 border-t border-border pt-4" }>
						{ children }
					</div>
				</Card.Content>
			</Card>

			<Sheet isDetached isOpen={ isVariantSheetOpen } placement={ "bottom" } onOpenChange={ setIsVariantSheetOpen }>
				<Sheet.Backdrop variant={ "opaque" }>
					<Sheet.Content className={ "w-full max-h-[90vh]" }>
						<Sheet.Dialog className={ "flex min-h-0 flex-col" }>
							<Sheet.Handle/>
							<Sheet.CloseTrigger/>

							<Sheet.Header className={ "border-default-100 border-b pb-4" }>
								<div className={ "flex items-start gap-3" }>
									<div className={ "flex size-10 shrink-0 items-center justify-center rounded-xl border border-accent-soft bg-accent-soft/60 text-accent" }>
										<CircleLink className={ "size-5" }/>
									</div>
									<div className={ "min-w-0" }>
										<Sheet.Heading>Cambiar ejercicio</Sheet.Heading>
										<Description className={ "mt-1 text-sm" }>
											Selecciona una variante disponible para esta rutina.
										</Description>
									</div>
								</div>
							</Sheet.Header>

							<Sheet.Body className={ "min-h-0 flex-1 space-y-4 overflow-y-auto px-4 py-5" }>
								{ selectedVariant ? (
									<div className={ "flex items-center justify-between gap-3 rounded-xl border border-warning/20 bg-warning/5 px-4 py-3" }>
										<div className={ "min-w-0" }>
											<p className={ "text-sm font-semibold text-foreground" }>Ejercicio original</p>
											<p className={ "truncate text-sm text-muted" }>{ exercise.baseName }</p>
										</div>

										<Button size={ "sm" } variant={ "secondary" } onPress={ handleResetVariant }>
											Restablecer al original
										</Button>
									</div>
								) : null }

								{ !hasVariants ? (
									<Alert className={ "border border-warning/20" } status={ "warning" }>
										<Alert.Content>
											<Alert.Title>Sin variantes disponibles</Alert.Title>
											<Alert.Description>
												Esta rutina no tiene ejercicios alternativos configurados.
											</Alert.Description>
										</Alert.Content>
									</Alert>
								) : (
									<div className={ "space-y-2" }>
										{ variantOptions.map( ( variant ) => {
											const isCurrentVariant = variant.id === exercise.variantExerciseId;

											return (
												<Button
													key={ variant.id }
													className={ "h-auto w-full justify-start px-4 py-3 text-left" }
													variant={ isCurrentVariant ? "secondary" : "ghost" }
													onPress={ () => handleSelectVariant( variant ) }
												>
													<div className={ "flex w-full items-center justify-between gap-3" }>
														<div className={ "min-w-0" }>
															<p className={ "truncate text-sm font-semibold text-foreground" }>{ variant.name }</p>
															<p className={ "truncate text-xs text-muted" }>{ formatBodyPart( variant.bodyPart as Parameters<typeof formatBodyPart>[0] ) }</p>
															<p className={ "truncate text-xs text-muted" }>
																{ variant.lastSession ? (
																	`Ultima sesion: ${ formatSessionDateLabel( variant.lastSession.date ) }`
																) : (
																	"Sin registro anterior"
																) }
															</p>
														</div>
														{ variant.active ? (
															<Chip color={ "success" } size={ "sm" } variant={ "soft" }>
																<Chip.Label>Activo</Chip.Label>
															</Chip>
														) : (
															<Chip color={ "warning" } size={ "sm" } variant={ "soft" }>
																<Chip.Label>Inactivo</Chip.Label>
															</Chip>
														) }
													</div>
												</Button>
											);
										} ) }
									</div>
								) }
							</Sheet.Body>

							<Sheet.Footer className={ "border-default-100 flex shrink-0 justify-end gap-2 border-t px-4 py-4" }>
								<Sheet.Close>
									<Button variant={ "secondary" }>
										Cerrar
									</Button>
								</Sheet.Close>
							</Sheet.Footer>
						</Sheet.Dialog>
					</Sheet.Content>
				</Sheet.Backdrop>
			</Sheet>
		</>
	);
}
