"use client";

import DesktopRoutineView from "../components/desktop/DesktopRoutineView";
import MobileRoutineView from "../components/mobile/MobileRoutineView";
import React, { useState } from "react";
import type { WorkoutSession } from '../types/routine.types';
import { RoutineHeader } from "@/features/student/routine/components/shared";
import { mockWorkoutSession } from '../data/mockRoutine';

export default function RoutinePageContent() {
	const [ workoutSession, setWorkoutSession ] = useState<WorkoutSession>( mockWorkoutSession );
	const [ isPending, setIsPending ] = useState( false );

	const handleSetUpdate = (
		exerciseId: string,
		setId: string,
		updates: Partial<{ weight: number; reps: number; completed: boolean }>
	) => {
		setWorkoutSession( prevSession => ( {
			...prevSession,
			exercises: prevSession.exercises.map( exercise =>
				exercise.id === exerciseId
					? {
						...exercise,
						sets: exercise.sets.map( set =>
							set.id === setId
								? {
									...set,
									...( updates.weight !== undefined && { currentWeight: updates.weight } ),
									...( updates.reps !== undefined && { currentReps: updates.reps } ),
									...( updates.completed !== undefined && { completed: updates.completed } )
								}
								: set
						)
					}
					: exercise
			)
		} ) );
	};

	const handleSave = () => {
		console.log( "Guardando rutina...", workoutSession );
		setIsPending( true );
		setTimeout( () => {
			setIsPending( false );
		}, 2000 );
	};

	return (
		<>
			<RoutineHeader
				title={ `Rutina - Día ${ workoutSession.dayNumber }` }
				subtitle={ "Sesión Actual" }
				description={ `${ workoutSession.title } - Sesión de entrenamiento` }
				isPending={ isPending }
				onSave={ handleSave }
			/>

			<MobileRoutineView
				exercises={ workoutSession.exercises }
				isPending={ isPending }
				onSave={ handleSave }
				onSetUpdate={ handleSetUpdate }
			/>

			<DesktopRoutineView
				exercises={ workoutSession.exercises }
				onSetUpdate={ handleSetUpdate }
			/>
		</>
	);
}