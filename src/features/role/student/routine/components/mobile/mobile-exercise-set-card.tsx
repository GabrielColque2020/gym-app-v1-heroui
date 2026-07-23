"use client";

import { useState } from "react";

import { Button, Card, Checkbox, Drawer, Input, Label, TextArea } from "@heroui/react";
import { MessageSquarePlus } from "lucide-react";

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
	const [ noteSetId, setNoteSetId ] = useState<string | null>( null );
	const selectedNoteSet = sets.find( ( set ) => set.id === noteSetId ) ?? null;
	const previousSessionSetsByNumber = new Map(
		(previousSessionHistory?.sets ?? []).map( ( set ) => [ set.setNumber, set ] ),
	);

	return (
		<>
			<Card className={ "flex h-full flex-col border border-accent-soft-hover shadow-sm" }>
				<Card.Content className={ "min-h-0 flex-1 divide-y divide-border px-1" }>
					{ sets.map( ( set ) => (
						<div key={ set.id } className={ "space-y-3 py-4 first:pt-2 last:pb-2" }>
							{ (() => {
								const previousSessionSet = previousSessionSetsByNumber.get( set.setNumber );
								const previousReps = previousSessionSet?.repsCompleted ?? set.previousReps;
								const previousWeight = previousSessionSet?.weightUsed ?? set.previousWeight;

								return (
									<>
							<div className={ "flex items-center gap-3" }>
								<Checkbox isReadOnly isSelected={ set.completed }>
									<Checkbox.Control className={ "size-5 rounded-md border border-border shadow-sm" }>
										<Checkbox.Indicator/>
									</Checkbox.Control>
								</Checkbox>
								<span className={ "text-base font-bold text-foreground" }>Serie { set.setNumber }</span>
							</div>

							<div className={ "grid grid-cols-2 gap-4" }>
								<div className={ "space-y-2" }>
									<Label className={ "text-xs  text-muted" }>{ `Meta ${ set.targetReps } reps` }</Label>
									<Input
										fullWidth
										className={ "border border-border" }
										placeholder={ "Reps" }
										type={ "number" }
										value={ set.currentReps?.toString() || "" }
										onChange={ ( e ) => onSetUpdate( exerciseId, set.id, { reps: parseNumericInput( e.target.value ) } ) }
									/>
									<span className={ "block text-xs text-muted" }>
										{ previousReps === null ? "Sin registro anterior" : `${ previousReps } reps Anterior` }
									</span>
								</div>

								<div className={ "space-y-2" }>
									<Label className={ "text-xs text-muted" }>Peso (Kg)</Label>
									<Input
										fullWidth
										className={ "border border-border" }
										placeholder={ "Peso kg" }
										type={ "number" }
										value={ set.currentWeight?.toString() || "" }
										onChange={ ( e ) => onSetUpdate( exerciseId, set.id, { weight: parseNumericInput( e.target.value ) } ) }
									/>
									<span className={ "block text-xs text-muted" }>
										{ previousWeight === null ? "Sin registro anterior" : `${ previousWeight } Kg Anterior` }
									</span>
								</div>
							</div>

							<Button
								className={ "h-auto min-h-0 justify-start px-0 py-0 text-sm text-accent" }
								variant={ "ghost" }
								onPress={ () => setNoteSetId( set.id ) }
							>
								<MessageSquarePlus className={ "size-4" }/>
								{ set.notes?.trim() ? "Editar nota" : "Agregar nota" }
							</Button>
									</>
								);
							} )() }
						</div>
					) ) }
				</Card.Content>
			</Card>

			<FeatureDrawerLayout
				bottomContentClassName={ "mx-auto flex max-h-[82dvh] w-full max-w-105 flex-col" }
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
						placeholder={ "Agrega una observacion para esta serie" }
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
						Cerrar
					</Button>
				</Drawer.Footer>
			</FeatureDrawerLayout>
		</>
	);
}
