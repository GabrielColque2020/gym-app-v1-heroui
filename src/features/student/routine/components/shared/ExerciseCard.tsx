import React from 'react';
import { Card, Chip } from '@heroui/react';
import type { Exercise } from '../../types/routine.types';
import { ArrowRightArrowLeft } from "@gravity-ui/icons";
import { EJERCICES } from "@/features/student/routine/data/exampleEjercices";
import { GenericSheet } from "@/components/common";

interface ExerciseCardProps {
	exercise: Exercise;
	children: React.ReactNode;
}


export default function ExerciseCard( { exercise, children }: ExerciseCardProps ) {


	const handleExerciseSelect = ( selectedExercise: typeof EJERCICES[0] ) => {
		// Aquí puedes hacer lo que necesites con el ejercicio seleccionado
		console.log( "Ejercicio seleccionado:", selectedExercise.name );
		// Actualizar estado, etc.
	};

	return (
		<>
			<Card className={ "border-l-6 border-accent" }>
				<Card.Header className={ "pb-2" }>
					<Card.Title className={ "text-xl font-bold text-foreground" }>
						Press con Mancuerna
					</Card.Title>
					<Card.Content>
						<div className={ "flex flex-col gap-2" }>
							<Chip size={ "lg" } className={ "px-2 py-1 mt-2" } variant={ "soft" } color={ "success" }>
								<ArrowRightArrowLeft className={ "size-3.5 mr-1" }/>
								Sustituye { exercise.name }
							</Chip>
							<div className={ "flex items-center gap-2 flex-wrap" }>
								<span className={ "text-muted text-sm" }>Última sesión:</span>
								{ exercise.sets.map( ( set, idx ) => (
									<Chip key={ idx } size={ "sm" } className={ "px-2" }>
										<Chip.Label>
											{ set.setNumber } x { set.previousReps } - { set.previousWeight }kg
										</Chip.Label>
									</Chip>
								) ) }
							</div>
							<div className={ "flex  mt-2" }>
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