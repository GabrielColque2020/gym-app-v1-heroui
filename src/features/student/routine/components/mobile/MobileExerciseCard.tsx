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

								<ExerciseChangeSheet
									exercise={ exercise }
									hasVariants={ hasVariants }
									selectedVariant={ selectedVariant }
									variantOptions={ variantOptions }
									onVariantChange={ onVariantChange }
								/>
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

		</>
	);
}
