"use client";

import { useState } from "react";

import { Button, Card, Checkbox, Drawer, Input, Label, TextArea } from "@heroui/react";
import { MessageSquarePlus } from "lucide-react";

import { useIsRoutineSessionLocked } from "@/features/role/student/routine/components/shared/routine-session-lock-context";
import { parseWeightInput } from "@/features/role/student/routine/views/routine-page-content.utils";
import { FeatureDrawerLayout } from "@/features/shared/components/feature-drawer-layout";
import type { ExerciseSessionHistory, ExerciseSet } from "@/features/routine/types/routine-exercise.types";

type MobileExerciseSetCardProps = {
	exerciseId: string;
	onSetUpdate: (
		exerciseId: string,
		setId: string,
		updates: Partial<{ weight: number | null; reps: number | null; notes: string | null }>,
	) => void;
	previousSessionHistory: ExerciseSessionHistory | null;
	sets: ExerciseSet[];
	useSessionHistoryAsPrevious?: boolean;
};

function parseNumericInput( value: string ) {
	const nextValue = value.trim() === "" ? null : Number.parseInt( value, 10 );

	return Number.isNaN( nextValue ) ? null : nextValue;
}

export function MobileExerciseSetCard( {
	exerciseId,
	onSetUpdate,
	previousSessionHistory,
	sets,
}: MobileExerciseSetCardProps ) {
	const isLocked = useIsRoutineSessionLocked();
	const [ noteSetId, setNoteSetId ] = useState<string | null>( null );
	const selectedNoteSet = sets.find( ( set ) => set.id === noteSetId ) ?? null;
	const previousSessionSetsByNumber = new Map(
		(previousSessionHistory?.sets ?? []).map( ( set ) => [ set.setNumber, set ] ),
	);

	return (
		<>
			<Card className={ "flex h-full flex-col border border-accent-soft-hover shadow-sm" }>
				<Card.Content className={ "min-h-0 flex-1 divide-y divide-border px-3" }>
					{ /* Una fila por serie: las tres o cuatro series entran en una pantalla. */ }
					{ sets.map( ( set ) => {
						const previousSessionSet = previousSessionSetsByNumber.get( set.setNumber );
						const previousReps = previousSessionSet?.repsCompleted ?? set.previousReps;
						const previousWeight = previousSessionSet?.weightUsed ?? set.previousWeight;
						const hasNote = Boolean( set.notes?.trim() );

						return (
							<div key={ set.id } className={ "space-y-2.5 py-4 first:pt-3 last:pb-3" }>
								<div className={ "grid grid-cols-[auto_1fr_1fr_auto] items-center gap-3" }>
									<div className={ "flex w-12 items-center gap-1.5" }>
										<Checkbox
											isReadOnly
											aria-label={ `Serie ${ set.setNumber } completa` }
											isSelected={ set.completed }
										>
											<Checkbox.Control className={ "size-5 rounded-md border border-border shadow-sm" }>
												<Checkbox.Indicator/>
											</Checkbox.Control>
										</Checkbox>
										<span className={ "text-sm font-bold text-foreground" }>S{ set.setNumber }</span>
									</div>
									<Input
										fullWidth
										aria-label={ `Reps de la serie ${ set.setNumber }` }
										// Marcado cuando falta y el otro dato ya esta: la serie no se guarda a medias.
										className={ `min-w-0 border px-1 text-center ${ !set.completed && set.currentReps === null && set.currentWeight !== null ? "border-warning" : "border-border" }` }
										disabled={ isLocked }
										inputMode={ "numeric" }
										placeholder={ `${ set.targetReps } reps` }
										type={ "number" }
										value={ set.currentReps?.toString() || "" }
										onChange={ ( e ) => onSetUpdate( exerciseId, set.id, { reps: parseNumericInput( e.target.value ) } ) }
									/>
									<Input
										fullWidth
										aria-label={ `Peso de la serie ${ set.setNumber }` }
										className={ `min-w-0 border px-1 text-center ${ !set.completed && set.currentWeight === null && set.currentReps !== null ? "border-warning" : "border-border" }` }
										disabled={ isLocked }
										inputMode={ "decimal" }
										placeholder={ "kg" }
										step={ "any" }
										type={ "number" }
										value={ set.currentWeight?.toString() || "" }
										onChange={ ( e ) => onSetUpdate( exerciseId, set.id, { weight: parseWeightInput( e.target.value ) } ) }
									/>
									<Button
										isIconOnly
										aria-label={
											hasNote
												? `Editar nota de la serie ${ set.setNumber }`
												: `Agregar nota a la serie ${ set.setNumber }`
										}
										className={ hasNote ? "size-9 text-accent" : "size-9 text-muted" }
										isDisabled={ isLocked }
										variant={ "ghost" }
										onPress={ () => setNoteSetId( set.id ) }
									>
										<MessageSquarePlus className={ "size-4" }/>
									</Button>
								</div>
								<p className={ "text-xs text-muted" }>
									{ previousReps === null && previousWeight === null
										? "Sin registro anterior"
										: `Anterior: ${ previousReps ?? "–" } reps · ${ previousWeight ?? "–" } kg` }
								</p>
							</div>
						);
					} ) }
				</Card.Content>
			</Card>

			<FeatureDrawerLayout
				bottomContentClassName={ "max-h-[82dvh]" }
				isOpen={ Boolean( selectedNoteSet ) }
				placement={ "bottom" }
				onOpenChangeAction={ ( isOpen ) => {
					if (!isOpen) setNoteSetId( null );
				} }
			>
				<Drawer.Header className={ "border-default-100 relative border-b pb-4" }>
					<Drawer.Heading>Nota de la serie { selectedNoteSet?.setNumber }</Drawer.Heading>
				</Drawer.Header>
				<Drawer.Body className={ "min-h-0 flex-1 overflow-y-auto py-4" }>
					<Label htmlFor={ "textarea-rows-3" }>Nota</Label>
					<TextArea
						fullWidth
						aria-label={ "Nota" }
						placeholder={ "Agrega una observación para esta serie" }
						value={ selectedNoteSet?.notes ?? "" }
						className={ "border border-border" }
						onChange={ ( e ) => {
							if (!selectedNoteSet) return;

							onSetUpdate( exerciseId, selectedNoteSet.id, { notes: e.target.value } );
						} }
					/>
				</Drawer.Body>
				<Drawer.Footer className={ "border-default-100 shrink-0 justify-end gap-2 border-t pt-4" }>
					<Button slot={ "close" } variant={ "secondary" }>
						Listo
					</Button>
				</Drawer.Footer>
			</FeatureDrawerLayout>
		</>
	);
}
