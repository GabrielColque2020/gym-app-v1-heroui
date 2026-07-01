"use client";

import { useEffect, useState } from "react";
import type { EmblaCarouselType } from "embla-carousel";
import { ArrowLeft, ArrowRight, Bulb, Calendar, ChartLine } from "@gravity-ui/icons";
import { Button, Card, Checkbox, Chip, Input, Label } from "@heroui/react";
import { Carousel, DataGrid, type DataGridColumn } from "@heroui-pro/react";
import DesktopExerciseCard from "@/features/role/student/routine/components/desktop/DesktopExerciseCard";
import type { Exercise, ExerciseSet } from "@/features/routine/types/routine.types";

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

function formatDateLabel( date: Date | null ) {
	if (!date) return "Sin sesion registrada";

	return new Intl.DateTimeFormat( "es-AR", {
		day: "numeric",
		month: "long",
		year: "numeric",
	} ).format( date );
}

export default function DesktopRoutineView( {
												exercises,
												latestProgressDate,
												onVariantChange,
												onSetUpdate,
												routineStatusDescription,
											}: DesktopRoutineViewProps ) {
	const [ api, setApi ] = useState<EmblaCarouselType>();
	const [ activeExerciseIndex, setActiveExerciseIndex ] = useState( 1 );

	useEffect( () => {
		if (!api) return;

		const syncActiveIndex = () => {
			setActiveExerciseIndex( api.selectedScrollSnap() + 1 );
		};

		syncActiveIndex();
		api.on( "select", syncActiveIndex );
		api.on( "reInit", syncActiveIndex );

		return () => {
			api.off( "select", syncActiveIndex );
			api.off( "reInit", syncActiveIndex );
		};
	}, [ api ] );

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
				<div className={ "flex items-start justify-center mb-5.5" }>
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
						<Card className={ "border border-border bg-surface shadow-sm" } variant={ "default" }>
							<Card.Content className={ "flex h-full items-center justify-center p-1" }>
								<div className={ "flex items-center gap-3" }>
									<div className={ "flex size-10 items-center justify-center rounded-full bg-warning/10 text-warning" }>
										<Bulb className={ "size-5" }/>
									</div>
									<div className={ "min-w-0" }>
										<p className={ "text-sm font-semibold text-foreground" }>Consejo del entrenador</p>
										<p className={ "text-sm leading-6 text-muted" }>{ exercises[ 0 ]?.notes ?? "Mantén una buena técnica durante todo el ejercicio. Controla el movimiento y respira correctamente." }</p>
									</div>
								</div>
							</Card.Content>
						</Card>
						<Card className={ "border border-border bg-surface shadow-sm" } variant={ "default" }>
							<Card.Content className={ "flex h-full items-center justify-center p-1" }>
								<div className={ "flex items-center gap-3" }>
									<div className={ "flex size-10 items-center justify-center rounded-full bg-accent/10 text-accent" }>
										<ChartLine className={ "size-5" }/>
									</div>
									<div className={ "min-w-0" }>
										<p className={ "text-sm font-semibold text-foreground" }>Resumen de la sesion</p>
										<p className={ "text-sm text-muted" }>{ routineStatusDescription }</p>
									</div>
								</div>
							</Card.Content>
						</Card>
						<Card className={ "border border-border bg-surface shadow-sm" } variant={ "default" }>
							<Card.Content className={ "flex h-full items-center justify-center p-1" }>
								<div className={ "flex items-center gap-3" }>
									<div className={ "flex size-10 items-center justify-center rounded-full bg-accent/10 text-accent" }>
										<Calendar className={ "size-5" }/>
									</div>
									<div className={ "min-w-0" }>
										<p className={ "text-sm font-semibold text-foreground" }>Ultima sesion completa</p>
										<p className={ "text-sm text-muted" }>{ formatDateLabel( latestProgressDate ) }</p>
									</div>
								</div>
							</Card.Content>
						</Card>
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
				<Card className={ "border border-dashed border-border" } variant={ "default" }>
					<Card.Content className={ "py-10 text-center" }>
						<p className={ "text-base font-semibold text-foreground" }>No hay ejercicios cargados para este dia</p>
						<p className={ "mt-1 text-sm text-muted" }>
							Cuando la rutina tenga ejercicios asignados vas a poder registrar reps, peso y notas desde aqui.
						</p>
					</Card.Content>
				</Card>
			) }
		</div>
	);
}
