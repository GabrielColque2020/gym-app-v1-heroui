import React from 'react';
import type { ExerciseSet } from '../../types/routine.types';
import { Input, Label } from '@heroui/react';

interface SetFormProps {
	set: ExerciseSet;
	showLabels?: boolean;
	onWeightChange: ( setId: string, weight: number ) => void;
	onRepsChange: ( setId: string, reps: number ) => void;
	onCompleteChange: ( setId: string, completed: boolean ) => void;
}

export default function SetForm( {
									 set,
									 showLabels = false,
									 onWeightChange,
									 onRepsChange,
									 onCompleteChange
								 }: SetFormProps ) {
	return (
		<div className={ `${ showLabels ? 'flex flex-col space-y-2' : 'flex items-center justify-center' }` }>
			{ showLabels ? (
				<div className={ "flex flex-col items-start w-50 space-y-3" }>
					<Label className={ "text-muted text-sm ml-2" }>Reps</Label>
					<Input
						fullWidth
						placeholder={ "Reps" }
						type={ "number" }
						value={ set.currentReps?.toString() || '' }
						onChange={ ( e ) => onRepsChange( set.id, parseInt( e.target.value ) || 0 ) }
					/>
					<span className={ "px-1 text-sm text-muted" }>
						{ set.previousReps } reps Anterior
					</span>
				</div>
			) : (
				<div className={ "flex flex-col items-start w-50 space-y-3" }>
					<Input
						fullWidth
						placeholder={ "Reps" }
						type={ "number" }
						value={ set.currentReps?.toString() || '' }
						onChange={ ( e ) => onRepsChange( set.id, parseInt( e.target.value ) || 0 ) }
					/>
					<span className={ "px-1 text-sm text-muted" }>
						{ set.previousReps } reps Anterior
					</span>
				</div>
			) }
		</div>
	);
}