"use client";

import React from 'react';
import type { Exercise } from '../../types/routine.types';
import { Button, Card, Checkbox, Input, Label, ScrollShadow, Spinner } from '@heroui/react';
import { Carousel } from "@heroui-pro/react";
import { TipsCard } from "@/features/student/routine/components/shared";
import { FloppyDisk } from '@gravity-ui/icons';
import MobileExerciseCard from "@/features/student/routine/components/mobile/MobileExerciseCard";

interface MobileRoutineViewProps {
	exercises: Exercise[];
	isPending: boolean;
	onSave: () => void;
	onSetUpdate: ( exerciseId: string, setId: string, updates: Partial<{ weight: number; reps: number; completed: boolean }> ) => void;
}

export default function MobileRoutineView( {
											   exercises,
											   isPending,
											   onSave,
											   onSetUpdate
										   }: MobileRoutineViewProps ) {
	return (
		<div className={ "flex flex-col sm:hidden" }>
			<Carousel opts={ { loop: true } }>
				<Carousel.Content>
					{ exercises.map( ( exercise ) => (
						<Carousel.Item key={ exercise.id } className={ "px-2" }>
							<div className={ "mb-4" }>
								<TipsCard tips={ exercise.notes }/>

							</div>
							<MobileExerciseCard exercise={ exercise }>
								<ScrollShadow className={ "h-75 pr-4" } size={ 80 }>
									<div className={ "space-y-4" }>
										{ exercise.sets.map( ( set ) => (
											<Card key={ set.id } className={ "border border-accent-soft-hover" }>
												<Card.Header>
													<Card.Title>
														<div className={ "flex justify-between items-center w-full mb-4" }>
															<span className={ "text-xl font-bold text-foreground" }>
																Serie { set.setNumber }
															</span>
															<Checkbox
																isSelected={ set.completed }
																onChange={ ( isSelected ) =>
																	onSetUpdate( exercise.id, set.id, { completed: isSelected } )
																}
															>
																<Checkbox.Control className={ "border-2 border-accent" }>
																	<Checkbox.Indicator/>
																</Checkbox.Control>
															</Checkbox>
														</div>
													</Card.Title>
													<Card.Content>
														<div className={ "grid grid-cols-2 gap-10 mb-2" }>
															<div className={ "flex flex-col space-y-2" }>
																<Label className={ "text-muted text-sm ml-2" }>Reps</Label>
																<Input
																	fullWidth
																	placeholder={ "Reps" }
																	type={ "number" }
																	value={ set.currentReps?.toString() || '' }
																	onChange={ ( e ) =>
																		onSetUpdate( exercise.id, set.id, { reps: parseInt( e.target.value ) || 0 } )
																	}
																/>
																<span className={ "px-1 text-sm text-muted" }>
																	{ set.previousReps } reps Anterior
																</span>
															</div>
															<div className={ "flex flex-col space-y-2" }>
																<Label className={ "text-muted text-sm ml-2" }>Peso</Label>
																<Input
																	fullWidth
																	placeholder={ "Peso (Kg)" }
																	type={ "number" }
																	value={ set.currentWeight?.toString() || '' }
																	onChange={ ( e ) =>
																		onSetUpdate( exercise.id, set.id, { weight: parseInt( e.target.value ) || 0 } )
																	}
																/>
																<span className={ "px-1 text-sm text-muted" }>
																	{ set.previousWeight } Kg Anterior
																</span>
															</div>
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
				<Carousel.Dots/>
			</Carousel>

			{ isPending ? (
				<Button
					isPending
					size={ "lg" }
					className={ "font-semibold flex sm:hidden mt-4" }
					fullWidth
				>
					{ ( { isPending } ) => (
						<>
							{ isPending ? <Spinner color={ "current" } size={ "sm" }/> : null }
							Guardando...
						</>
					) }
				</Button>
			) : (
				<Button
					size={ "lg" }
					className={ "font-semibold flex sm:hidden mt-4" }
					fullWidth
					onClick={ onSave }
				>
					<FloppyDisk/>
					Finalizar rutina
				</Button>
			) }
		</div>
	);
}