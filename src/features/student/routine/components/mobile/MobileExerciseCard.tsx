import React, { useState } from 'react';
import { Card, Chip } from '@heroui/react';
import type { Exercise } from '../../types/routine.types';
import { EJERCICES } from "@/features/student/routine/data/exampleEjercices";
import { GenericSheet } from "@/components/common";

interface ExerciseCardProps {
	exercise: Exercise;
	children: React.ReactNode;
}


export default function MobileExerciseCard( { exercise, children }: ExerciseCardProps ) {
	const [ isChangeExercise, setIsChangeExercise ] = useState( false )
	const [ changeNameExercise, setChangeNameExercise ] = useState( exercise.name )

	const handleExerciseSelect = ( selectedExercise: typeof EJERCICES[0] ) => {
		// Aquí puedes hacer lo que necesites con el ejercicio seleccionado
		console.log( "Ejercicio seleccionado:", selectedExercise.name );
		setIsChangeExercise( true )
		setChangeNameExercise( selectedExercise.name )
		// Actualizar estado, etc.
	};

	return (
		<>
			<Card className={ "border-l-6 border-accent" }>
				<Card.Header className={ "pb-2" }>
					<Card.Title className={ "text-xl font-bold text-foreground" }>
						{ changeNameExercise }
						{ isChangeExercise && <Chip className={ "ml-2 px-2 py-1 w-fit font-semibold" } variant={ "soft" } color={ "success" }>
                            SUSTITUIDO
                        </Chip> }
					</Card.Title>
					<Card.Content>
						<div className={ "flex flex-col gap-2" }>
							{
								isChangeExercise
									? <>
										<span className={ "text-muted mt-1" }>
											{ exercise.equipment } | Descanso: { exercise.restTime }
										</span>
										<div className={ "flex items-center gap-2 flex-wrap" }>
											<span className={ "text-muted" }>Última sesión:</span>
											{ exercise.sets.map( ( set, idx ) => (
												<Chip key={ idx } className={ "px-2" } color={ "success" } variant={ "soft" }>
													<Chip.Label>
														{ set.setNumber } x { set.previousReps } - { set.previousWeight }kg
													</Chip.Label>
												</Chip>
											) ) }
										</div>
										<Chip size={ "lg" } className={ "px-2 py-1 mt-1" } variant={ "soft" } color={ "warning" }>
											<strong>Original: </strong> { exercise.name }
										</Chip>
									</>
									: <>
										<span className={ "text-muted mt-2" }>
											{ exercise.equipment } | Descanso: { exercise.restTime }
										</span>

										<div className={ "flex items-center gap-2 flex-wrap" }>
											<span className={ "text-muted" }>Última sesión:</span>
											{ exercise.sets.map( ( set, idx ) => (
												<Chip key={ idx } className={ "px-2" }>
													<Chip.Label>
														{ set.setNumber } x { set.previousReps } - { set.previousWeight }kg
													</Chip.Label>
												</Chip>
											) ) }
										</div>

									</>
							}
							<div className={ "flex justify-start  mt-2" }>
								<GenericSheet
									items={ EJERCICES }
									title={ "Cambiar Ejercicio" }
									triggerLabel={ "Cambiar Ejercicio" }
									searchPlaceholder={ "Buscar ejercicio..." }
									emptyStateMessage={ "No se encontraron ejercicios." }
									searchAriaLabel={ "Search exercises" }
									listBoxAriaLabel={ "Exercises" }
									onSelect={ handleExerciseSelect }
									placement={ "bottom" }
								/>
							</div>
						</div>
					</Card.Content>
				</Card.Header>
				<Card.Content className={ "pt-2" }>
					{ children }
				</Card.Content>
			</Card>
		</>
	);
}

// <Card className={ "border-l-6 border-accent" }>
// 	<Card.Header className={ "pb-2" }>
// 		<Card.Title className={ "text-xl font-bold text-foreground" }>
// 			{ exercise.name }
// 		</Card.Title>
// 		<Card.Content>
// 			<div className={ "flex flex-col gap-2" }>
// 							<span className={ "text-muted text-sm mt-2" }>
// 								{ exercise.equipment } | Descanso: { formatRestTime( exercise.restTime ) }
// 							</span>
// 				<div className={ "flex items-center gap-2 flex-wrap" }>
// 					<span className={ "text-muted text-sm" }>Última sesión:</span>
// 					{ exercise.sets.map( ( set, idx ) => (
// 						<Chip key={ idx } size={ "sm" } className={ "px-2" }>
// 							<Chip.Label>
// 								{ set.setNumber } x { set.previousReps } - { set.previousWeight }kg
// 							</Chip.Label>
// 						</Chip>
// 					) ) }
// 				</div>
// 			</div>
// 		</Card.Content>
// 	</Card.Header>
//
// 	<Card.Content className={ "pt-2" }>
// 		{ children }
// 	</Card.Content>
// </Card>