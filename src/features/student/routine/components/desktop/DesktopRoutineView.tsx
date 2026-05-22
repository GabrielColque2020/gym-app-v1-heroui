"use client";

import React from 'react';
import type { Exercise, ExerciseSet } from '@/features/student/routine/types/routine.types';
import { Carousel, DataGrid, type DataGridColumn } from "@heroui-pro/react";
import { Checkbox, Input, Chip } from '@heroui/react';
import { TipsCard } from "@/features/student/routine/components/shared";
import DesktopExerciseCard from "@/features/student/routine/components/desktop/DesktopExerciseCard";

interface DesktopRoutineViewProps {
	exercises: Exercise[];
	onSetUpdate: ( exerciseId: string, setId: string, updates: Partial<{ weight: number; reps: number; completed: boolean }> ) => void;
}

export default function DesktopRoutineView( {
												exercises,
												onSetUpdate
											}: DesktopRoutineViewProps ) {
	const columns: DataGridColumn<ExerciseSet>[] = [
		{
			id: "set",
			header: "SERIE",
			isRowHeader: true,
			cell: ( item ) => (
				<Chip
					size={ "sm" }
					variant={ "secondary" }
					className={ "px-4 h-8 rounded-full" }
				>
					<Chip.Label className={ "text-xs font-mono text-muted" }>
						{ String( item.setNumber ).padStart( 2, '0' ) }
					</Chip.Label>
				</Chip>
			),
			align: "center",
			width: 80
		},
		{
			id: "reps",
			header: "REPS",
			cell: ( item ) => (
				<div className={ "flex items-center justify-center" }>
					<div className={ "flex flex-col items-start w-50 space-y-3" }>
						<Input
							fullWidth
							placeholder={ "Reps" }
							type={ "number" }
							value={ item.currentReps?.toString() || '' }
							onChange={ ( e ) => {
								const exerciseId = exercises.find( ex => ex.sets.some( s => s.id === item.id ) )?.id;
								if (exerciseId) {
									onSetUpdate( exerciseId, item.id, { reps: parseInt( e.target.value ) || 0 } );
								}
							} }
						/>
						<span className={ "px-1 text-sm text-muted" }>
							{ item.previousReps } reps Anterior
						</span>
					</div>
				</div>
			),
			align: "center",
			width: 80
		},
		{
			id: "peso",
			header: "PESO (KG)",
			cell: ( item ) => (
				<div className={ "flex items-center justify-center" }>
					<div className={ "flex flex-col items-start w-50 space-y-3" }>
						<Input
							fullWidth
							placeholder={ "Peso (kg)" }
							type={ "number" }
							value={ item.currentWeight?.toString() || '' }
							onChange={ ( e ) => {
								const exerciseId = exercises.find( ex => ex.sets.some( s => s.id === item.id ) )?.id;
								if (exerciseId) {
									onSetUpdate( exerciseId, item.id, { weight: parseInt( e.target.value ) || 0 } );
								}
							} }
						/>
						<span className={ "px-1 text-sm text-muted" }>
							{ item.previousWeight } Kg Anterior
						</span>
					</div>
				</div>
			),
			align: "center",
			minWidth: 100
		},
		{
			id: "completado",
			header: "COMPLETADO",
			cell: ( item ) => (
				<div className={ "flex items-center justify-center" }>
					<Checkbox
						isSelected={ item.completed }
						onChange={ ( isSelected ) => {
							const exerciseId = exercises.find( ex => ex.sets.some( s => s.id === item.id ) )?.id;
							if (exerciseId) {
								onSetUpdate( exerciseId, item.id, { completed: isSelected } );
							}
						} }
					>
						<Checkbox.Control className={ "size-5 rounded-full before:rounded-full" }>
							<Checkbox.Indicator/>
						</Checkbox.Control>
					</Checkbox>
				</div>
			),
			align: "center",
			maxWidth: 50
		}
	];

	return (
		<div className={ "w-full hidden sm:flex" }>
			<Carousel opts={ { loop: true } }>
				<Carousel.Content>
					{ exercises.map( ( exercise ) => (
						<Carousel.Item key={ exercise.id }>
							<div className={ "flex flex-col-reverse sm:grid sm:grid-cols-6 gap-4 px-2" }>
								{ /* Table */ }
								<div className={ "sm:col-span-4" }>
									<DesktopExerciseCard exercise={ exercise }>
										<DataGrid
											aria-label={ `${ exercise.name } sets` }
											columns={ columns }
											data={ exercise.sets }
											getRowId={ ( item ) => item.id }
											variant={ "secondary" }
											className={ "[&_.table__cell]:py-3 [&_.table__cell]:text-sm [&_.table__column]:py-2 [&_.table__column]:text-xs [&_.table__column]:font-semibold [&_.table__column]:text-muted [&_.table__column]:tracking-wider" }
										/>
									</DesktopExerciseCard>
								</div>

								{ /* Tips */ }
								<div className={ "sm:col-span-2" }>
									<TipsCard tips={ exercise.notes }/>
								</div>
							</div>
						</Carousel.Item>
					) ) }
				</Carousel.Content>
				<Carousel.Dots/>
			</Carousel>
		</div>
	);
}