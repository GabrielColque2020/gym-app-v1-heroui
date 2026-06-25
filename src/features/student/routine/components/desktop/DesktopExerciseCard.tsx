"use client";

import React, { useMemo } from "react";

import { Card, Chip } from "@heroui/react";

import type {
	Exercise,
	ExerciseSessionHistory,
	ExerciseVariantOption,
} from "@/features/student/routine/types/routine.types";
import { ExerciseChangeSheet } from "@/features/student/routine/components/shared/ExerciseChangeSheet";

interface ExerciseCardProps {
	exercise: Exercise;
	children: React.ReactNode;
	onVariantChange: ( exerciseId: string, variantExerciseId: string | null ) => void;
}

// Devuelve la variante seleccionada para mostrar su nombre en la card.
function getSelectedVariant( variantOptions: ExerciseVariantOption[], selectedVariantId: string | null ) {
	return variantOptions.find( ( variant ) => variant.id === selectedVariantId ) ?? null;
}

// Formatea la fecha de una sesion historica para mostrarla en la UI.
function formatSessionDateLabel( date: Date ) {
	return new Intl.DateTimeFormat( "es-AR", {
		day: "numeric",
		month: "long",
		year: "numeric",
	} ).format( date );
}

// Retorna el historial que debe verse en la card segun la variante seleccionada.
function getDisplayedSessionHistory(
	exercise: Exercise,
	selectedVariant: ExerciseVariantOption | null,
): ExerciseSessionHistory | null {
	return selectedVariant?.lastSession ?? exercise.lastSession;
}

// Calcula cuantas series del ejercicio ya quedaron completadas para mostrar un resumen corto.
function getCompletedSetsSummary( exercise: Exercise ) {
	const completedSets = exercise.sets.filter( ( set ) => set.completed ).length;

	return {
		completedSets,
		totalSets: exercise.sets.length,
	};
}

export default function DesktopExerciseCard( { exercise, children, onVariantChange }: ExerciseCardProps ) {
	const variantOptions = useMemo(
		() => exercise.variantOptions ?? [],
		[ exercise.variantOptions ],
	);
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

	return (
		<Card className={ "border border-border bg-surface shadow-sm" }>
				<Card.Content className={ "p-2" }>
					<div className={ "space-y-2" }>
						<div className={ "space-y-1" }>
							<div className={ "flex flex-col gap-2" }>
								<div className={ "flex min-w-0 items-start justify-between gap-3" }>
									<div className={ "min-w-0 space-y-1" }>
										<h2 className={ "min-w-0 text-3xl font-black tracking-tight text-foreground" }>{ displayedExerciseName }</h2>
										{ selectedVariant ? (
											<Chip color={ "warning" } size={ "sm" } variant={ "soft" }>
												<Chip.Label>{ `Original: ${ exercise.baseName }` }</Chip.Label>
											</Chip>
										) : null }
									</div>

									<ExerciseChangeSheet
										exercise={ exercise }
										hasVariants={ hasVariants }
										selectedVariant={ selectedVariant }
										variantOptions={ variantOptions }
										onVariantChange={ onVariantChange }
									/>
								</div>

								<div className={ "flex flex-nowrap items-center gap-2 overflow-x-auto pb-1" }>
									<Chip className={ "shrink-0" } color={ "default" } size={ "md" } variant={ "soft" }>
										{ exercise.equipment }
									</Chip>
									<Chip
										className={ "shrink-0" }
										color={ hasCompletedSets ? "success" : "default" }
										size={ "md" }
										variant={ "soft" }
									>
										<Chip.Label>
											{ `Series completadas: ${ completedSetsSummary.completedSets }/${ completedSetsSummary.totalSets }` }
										</Chip.Label>
									</Chip>
									{ selectedVariant ? (
										<Chip className={ "shrink-0" } color={ "warning" } size={ "md" } variant={ "soft" }>
											<Chip.Label>Ejercicio cambiado</Chip.Label>
										</Chip>
									) : null }
								</div>
							</div>
						</div>

						<div className={ "space-y-2" }>
							<div className={ "flex items-center gap-3 whitespace-nowrap overflow-x-auto pb-1" }>
								<p className={ "shrink-0 text-sm font-medium tracking-wide text-foreground" }>
									Ultima sesion:
								</p>

								{ hasSessionHistory && displayedSessionHistory ? (
									<>
										<Chip className={ "shrink-0" } size={ "sm" } variant={ "soft" }>
											<Chip.Label>{ formatSessionDateLabel( displayedSessionHistory.date ) }</Chip.Label>
										</Chip>

										{ displayedSessionHistory.sets.map( ( set, index ) => (
											<Chip
												key={ `${ displayedSessionHistory.date.toISOString() }-${ set.setNumber }-${ index }` }
												className={ "shrink-0" }
												size={ "sm" }
												variant={ "soft" }
											>
												<Chip.Label>
													{ `${ String( set.setNumber ).padStart( 2, "0" ) } x ${ set.repsCompleted ?? 0 } reps · ${ set.weightUsed ?? 0 } kg` }
												</Chip.Label>
											</Chip>
										) ) }
									</>
								) : (
									<Chip className={ "shrink-0" } color={ "warning" } size={ "sm" } variant={ "soft" }>
										<Chip.Label>Sin registro anterior</Chip.Label>
									</Chip>
								) }
							</div>
						</div>

						<div className={ "space-y-3 border-t border-border pt-5" }>
							{ children }
						</div>
					</div>
				</Card.Content>
			</Card>
	);
}
