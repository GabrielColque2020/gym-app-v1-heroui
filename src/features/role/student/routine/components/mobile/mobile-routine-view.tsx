"use client";

import { ArrowLeft, ArrowRight, FloppyDisk } from "@gravity-ui/icons";
import { Button, Card, Checkbox, Input, Label, ScrollShadow } from "@heroui/react";
import { Carousel } from "@heroui-pro/react";

import MobileExerciseCard from "@/features/role/student/routine/components/mobile/mobile-exercise-card";
import { RoutineExerciseEmptyState } from "@/features/role/student/routine/components/shared/routine-exercise-empty-state";
import { RoutineSessionOverviewCards } from "@/features/role/student/routine/components/shared/routine-session-overview-cards";
import { useExerciseCarouselState } from "@/features/role/student/routine/components/shared/use-exercise-carousel-state";
import type { Exercise } from "@/features/routine/types/routine-types";

interface MobileRoutineViewProps {
	exercises: Exercise[];
	canSaveProgress: boolean;
	isPending: boolean;
	latestProgressDate: Date | null;
	routineStatusDescription: string;
	onSave: () => void;
	onSetUpdate: ( exerciseId: string, setId: string, updates: Partial<{ weight: number | null; reps: number | null; notes: string | null }> ) => void;
	onVariantChange: ( exerciseId: string, variantExerciseId: string | null ) => void;
}

export default function MobileRoutineView( {
	exercises,
	canSaveProgress,
	isPending,
	latestProgressDate,
	routineStatusDescription,
	onSave,
	onSetUpdate,
	onVariantChange,
}: MobileRoutineViewProps ) {
	const { activeExerciseIndex, api, setApi } = useExerciseCarouselState();

	return (
		<div className={ "flex flex-col sm:hidden" }>
			{ exercises.length > 0 ? (
				<>
					<div className={ "mb-4 grid gap-3" }>
						<RoutineSessionOverviewCards
							exercises={ exercises }
							latestProgressDate={ latestProgressDate }
							routineStatusDescription={ routineStatusDescription }
						/>
					</div>

					<Carousel opts={ { loop: true } } setApi={ setApi }>
						<Carousel.Content>
							{ exercises.map( ( exercise ) => (
								<Carousel.Item key={ exercise.id } className={ "px-2" }>
									<MobileExerciseCard exercise={ exercise } onVariantChange={ onVariantChange }>
										<ScrollShadow className={ "h-75 pr-4" } size={ 80 } visibility={ "none" }>
											<div className={ "space-y-4" }>
												{ exercise.sets.map( ( set ) => (
													<Card key={ set.id } className={ "border border-accent-soft-hover" }>
														<Card.Header>
															<Card.Title>
																<div className={ "mb-4 flex w-full items-center justify-between" }>
																	<span className={ "text-xl font-bold text-foreground" }>Serie { set.setNumber }</span>
																	<Checkbox isDisabled isSelected={ set.completed }>
																		<Checkbox.Control className={ "border-2 border-accent" }>
																			<Checkbox.Indicator/>
																		</Checkbox.Control>
																	</Checkbox>
																</div>
															</Card.Title>
															<Card.Content>
																<div className={ "mb-2 grid grid-cols-2 gap-10" }>
																	<div className={ "flex flex-col space-y-2" }>
																		<Label className={ "ml-2 text-sm text-muted" }>Reps</Label>
																		<Input
																			fullWidth
																			placeholder={ "Reps" }
																			type={ "number" }
																			value={ set.currentReps?.toString() || "" }
																			onChange={ ( e ) => {
																				const nextValue = e.target.value.trim() === "" ? null : Number.parseInt( e.target.value, 10 );
																				onSetUpdate( exercise.id, set.id, { reps: Number.isNaN( nextValue ) ? null : nextValue } );
																			} }
																		/>
																		{ set.previousReps === null && set.previousWeight === null ? (
																			<span className={ "text-muted" }>Sin registro anterior</span>
																		) : (
																			<span className={ "px-1 text-sm text-muted" }>{ `${ set.previousReps ?? 0 } reps Anterior` }</span>
																		) }
																	</div>
																	<div className={ "flex flex-col space-y-2" }>
																		<Label className={ "ml-2 text-sm text-muted" }>Peso</Label>
																		<Input
																			fullWidth
																			placeholder={ "Peso (Kg)" }
																			type={ "number" }
																			value={ set.currentWeight?.toString() || "" }
																			onChange={ ( e ) => {
																				const nextValue = e.target.value.trim() === "" ? null : Number.parseInt( e.target.value, 10 );
																				onSetUpdate( exercise.id, set.id, { weight: Number.isNaN( nextValue ) ? null : nextValue } );
																			} }
																		/>
																		{ set.previousReps === null && set.previousWeight === null ? (
																			<span className={ "text-muted" }>Sin registro anterior</span>
																		) : (
																			<span className={ "px-1 text-sm text-muted" }>{ `${ set.previousWeight ?? 0 } Kg Anterior` }</span>
																		) }
																	</div>
																</div>
																<div className={ "flex flex-col space-y-2" }>
																	<Label className={ "ml-2 text-sm text-muted" }>Notas</Label>
																	<Input
																		fullWidth
																		placeholder={ "Opcional" }
																		value={ set.notes ?? "" }
																		onChange={ ( e ) => onSetUpdate( exercise.id, set.id, { notes: e.target.value } ) }
																	/>
																</div>
															</Card.Content>
														</Card.Header>
													</Card>
												) ) }
											</div>
										</ScrollShadow>
									</MobileExerciseCard>
								</Carousel.Item>
							) ) }
						</Carousel.Content>
					</Carousel>

					<div className={ "flex items-center justify-between gap-3 px-2 pt-4" }>
						<Button className={ "bg-primary text-primary-foreground" } onPress={ () => api?.scrollPrev() } variant={ "secondary" }>
							<ArrowLeft className={ "size-4" }/>
							Anterior
						</Button>
						<p className={ "min-w-20 text-center text-sm font-semibold text-muted" }>{ `${ activeExerciseIndex } / ${ exercises.length }` }</p>
						<Button className={ "bg-primary text-primary-foreground" } onPress={ () => api?.scrollNext() } variant={ "secondary" }>
							Siguiente
							<ArrowRight className={ "size-4" }/>
						</Button>
					</div>

					<Button className={ "mt-4 flex w-full font-semibold sm:hidden" } fullWidth isDisabled={ !canSaveProgress } isPending={ isPending } size={ "lg" } onPress={ onSave }>
						<FloppyDisk/>
						Guardar progreso
					</Button>
				</>
			) : (
				<RoutineExerciseEmptyState/>
			) }
		</div>
	);
}
