"use client";

import { ArrowLeft, ArrowRight } from "@gravity-ui/icons";
import { Button, Checkbox, Chip, Input, Label } from "@heroui/react";
import { Carousel, DataGrid, type DataGridColumn } from "@heroui-pro/react";

import DesktopExerciseCard from "@/features/role/student/routine/components/desktop/desktop-exercise-card";
import { RoutineExerciseEmptyState } from "@/features/role/student/routine/components/shared/routine-exercise-empty-state";
import { RoutineSessionOverviewCards } from "@/features/role/student/routine/components/shared/routine-session-overview-cards";
import { useExerciseCarouselState } from "@/features/role/student/routine/components/shared/use-exercise-carousel-state";
import type { Exercise, ExerciseSet } from "@/features/routine/types/routine-types";

type DesktopRoutineViewProps = {
	exercises: Exercise[];
	latestProgressDate: Date | null;
	onVariantChange: ( exerciseId: string, variantExerciseId: string | null ) => void;
	onSetUpdate: (
		exerciseId: string,
		setId: string,
		updates: Partial<{ weight: number | null; reps: number | null; notes: string | null }>,
	) => void;
	routineStatusDescription: string;
};

export default function DesktopRoutineView( {
	exercises,
	latestProgressDate,
	onVariantChange,
	onSetUpdate,
	routineStatusDescription,
}: DesktopRoutineViewProps ) {
	const { activeExerciseIndex, api, setApi } = useExerciseCarouselState();

	function renderPreviousRecord( previousReps: number | null ) {
		if (previousReps === null) {
			return <span className={ "text-xs text-muted" }>Sin registro anterior</span>;
		}

		return <span className={ "text-xs text-muted" }>{ `${ previousReps } reps anteriores` }</span>;
	}

	function getExerciseIdBySetId( setId: string ) {
		return exercises.find( ( exercise ) => exercise.sets.some( ( set ) => set.id === setId ) )?.id;
	}

	const columns: DataGridColumn<ExerciseSet>[] = [
		{
			id: "completado",
			header: "",
			cell: ( item ) => (
				<div className={ "flex items-center justify-center" }>
					<Checkbox isDisabled isSelected={ item.completed }>
						<Checkbox.Control className={ "size-5 rounded-full border border-muted/25 shadow-md before:rounded-full" }>
							<Checkbox.Indicator/>
						</Checkbox.Control>
					</Checkbox>
				</div>
			),
			align: "center",
			maxWidth: 50,
		},
		{
			id: "set",
			header: "SERIE",
			isRowHeader: true,
			cell: ( item ) => (
				<div className={ "flex flex-col items-center gap-1" }>
					<Chip className={ "h-8 rounded-full px-4" } size={ "sm" } variant={ "secondary" }>
						<Chip.Label className={ "font-mono text-xs text-muted" }>
							{ String( item.setNumber ).padStart( 2, "0" ) }
						</Chip.Label>
					</Chip>
				</div>
			),
			align: "center",
			width: 80,
		},
		{
			id: "reps",
			header: "REPS",
			cell: ( item ) => (
				<div className={ "flex items-center justify-center" }>
					<div className={ "flex w-50 flex-col items-start gap-2" }>
						<Label className={ "text-xs font-medium text-muted" }>{ `Meta ${ item.targetReps } reps` }</Label>
						<Input
							fullWidth
							placeholder={ "Reps" }
							type={ "number" }
							value={ item.currentReps?.toString() || "" }
							onChange={ ( e ) => {
								const exerciseId = getExerciseIdBySetId( item.id );
								const nextValue = e.target.value.trim() === "" ? null : Number.parseInt( e.target.value, 10 );

								if (exerciseId) {
									onSetUpdate( exerciseId, item.id, { reps: Number.isNaN( nextValue ) ? null : nextValue } );
								}
							} }
						/>
						{ renderPreviousRecord( item.previousReps ) }
					</div>
				</div>
			),
			align: "center",
			width: 80,
		},
		{
			id: "peso",
			header: "PESO (KG)",
			cell: ( item ) => (
				<div className={ "flex items-center justify-center" }>
					<div className={ "flex w-50 flex-col items-start gap-2" }>
						<Label className={ "text-xs font-medium text-muted" }>Peso (kg)</Label>
						<Input
							fullWidth
							placeholder={ "Peso (kg)" }
							type={ "number" }
							value={ item.currentWeight?.toString() || "" }
							onChange={ ( e ) => {
								const exerciseId = getExerciseIdBySetId( item.id );
								const nextValue = e.target.value.trim() === "" ? null : Number.parseInt( e.target.value, 10 );

								if (exerciseId) {
									onSetUpdate( exerciseId, item.id, { weight: Number.isNaN( nextValue ) ? null : nextValue } );
								}
							} }
						/>
						{ item.previousWeight === null ? (
							<span className={ "text-xs text-muted" }>Sin registro anterior</span>
						) : (
							<span className={ "text-xs text-muted" }>{ `${ item.previousWeight } kg anteriores` }</span>
						) }
					</div>
				</div>
			),
			align: "center",
			minWidth: 100,
		},
		{
			id: "notas",
			header: "NOTAS",
			cell: ( item ) => (
				<div className={ "mb-5.5 flex items-start justify-center" }>
					<div className={ "flex w-60 flex-col items-start gap-2" }>
						<Label className={ "text-xs font-medium text-muted" }>Notas</Label>
						<Input
							fullWidth
							placeholder={ "Opcional" }
							value={ item.notes ?? "" }
							onChange={ ( e ) => {
								const exerciseId = getExerciseIdBySetId( item.id );
								if (exerciseId) {
									onSetUpdate( exerciseId, item.id, { notes: e.target.value } );
								}
							} }
						/>
					</div>
				</div>
			),
			align: "center",
			minWidth: 180,
		},
	];

	return (
		<div className={ "hidden w-full flex-col gap-4 sm:flex" }>
			{ exercises.length > 0 ? (
				<>
					<div className={ "grid gap-4 lg:grid-cols-[1.2fr_0.9fr_0.9fr]" }>
						<RoutineSessionOverviewCards
							exercises={ exercises }
							latestProgressDate={ latestProgressDate }
							routineStatusDescription={ routineStatusDescription }
						/>
					</div>
					<div className={ "min-w-0" }>
						<Carousel opts={ { loop: true } } setApi={ setApi }>
							<Carousel.Content>
								{ exercises.map( ( exercise ) => (
									<Carousel.Item key={ exercise.id }>
										<DesktopExerciseCard exercise={ exercise } onVariantChange={ onVariantChange }>
											<DataGrid aria-label={ `${ exercise.name } sets` } columns={ columns } data={ exercise.sets } getRowId={ ( item ) => item.id }/>
										</DesktopExerciseCard>
									</Carousel.Item>
								) ) }
							</Carousel.Content>
						</Carousel>
						<div className={ "flex items-center justify-between gap-3 px-4 pt-3" }>
							<Button className={ "bg-primary text-primary-foreground " } variant={ "secondary" } onPress={ () => api?.scrollPrev() }>
								<ArrowLeft className={ "size-4" }/>
								Anterior
							</Button>
							<p className={ "min-w-20 text-center text-sm" }>{ `${ activeExerciseIndex } / ${ exercises.length }` }</p>
							<Button className={ "bg-primary text-primary-foreground" } variant={ "secondary" } onPress={ () => api?.scrollNext() }>
								Siguiente
								<ArrowRight className={ "size-4" }/>
							</Button>
						</div>
					</div>
				</>
			) : (
				<RoutineExerciseEmptyState/>
			) }
		</div>
	);
}
