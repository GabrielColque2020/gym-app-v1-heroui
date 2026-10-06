import { Button } from "@heroui/react";
import { Carousel } from "@heroui-pro/react/carousel";
import { ArrowLeft, ArrowRight, Calendar, ChartLine, Lightbulb, Save } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import MobileExerciseCard from "@/features/role/student/routine/components/mobile/mobile-exercise-card";
import { MobileExerciseSetCard } from "@/features/role/student/routine/components/mobile/mobile-exercise-set-card";
import { ExerciseSetsEditor } from "@/features/role/student/routine/components/shared/exercise-sets-editor";
import {
	RoutineExerciseEmptyState
} from "@/features/role/student/routine/components/shared/routine-exercise-empty-state";
import {
	RoutineSessionOverviewCard
} from "@/features/role/student/routine/components/shared/routine-session-overview-card";
import { formatDateLabel } from "@/features/role/student/routine/views/routine-page-content.utils";
import {
	useExerciseCarouselState
} from "@/features/role/student/routine/components/shared/use-exercise-carousel-state";
import type { Exercise } from "@/features/routine/types/routine-exercise.types";

interface MobileRoutineViewProps {
	exercises: Exercise[];
	canSaveProgress: boolean;
	isPending: boolean;
	latestProgressDate: Date | null;
	routineObservation: string | null;
	routineStatusDescription: string;
	onExerciseUpdate: ( exerciseId: string, updates: Partial<{ weight: number | null; reps: number | null; notes: string | null }> ) => void;
	onSave: () => void;
	onRepeatLastSessionAction: ( exerciseId: string ) => void;
	onSetUpdate: ( exerciseId: string, setId: string, updates: Partial<{ weight: number | null; reps: number | null; notes: string | null }> ) => void;
	onVariantChangeAction: ( exerciseId: string, variantExerciseId: string | null ) => void;
}

export default function MobileRoutineView( {
	exercises,
	canSaveProgress,
	isPending,
	latestProgressDate,
	routineObservation,
	routineStatusDescription,
	onExerciseUpdate,
	onSave,
	onRepeatLastSessionAction,
	onSetUpdate,
	onVariantChangeAction,
}: MobileRoutineViewProps ) {
	const { activeExerciseIndex, api, setApi } = useExerciseCarouselState();
	const slideRefs = useRef<Array<HTMLDivElement | null>>( [] );
	const [ carouselHeight, setCarouselHeight ] = useState<number | null>( null );

	const syncCarouselHeight = useCallback( ( index?: number ) => {
		const targetIndex = typeof index === "number" ? index : Math.max( activeExerciseIndex - 1, 0 );
		const activeSlide = slideRefs.current[ targetIndex ];

		if (!activeSlide) return;

		window.requestAnimationFrame( () => {
			setCarouselHeight( activeSlide.offsetHeight );
		} );
	}, [ activeExerciseIndex ] );

	useEffect( () => {
		syncCarouselHeight();
	}, [ syncCarouselHeight ] );

	useEffect( () => {
		if (!api) return;

		const handleSyncHeight = () => {
			syncCarouselHeight( api.selectedScrollSnap() );
		};

		handleSyncHeight();
		api.on( "select", handleSyncHeight );
		api.on( "reInit", handleSyncHeight );

		return () => {
			api.off( "select", handleSyncHeight );
			api.off( "reInit", handleSyncHeight );
		};
	}, [ api, syncCarouselHeight ] );

	useEffect( () => {
		const activeSlide = slideRefs.current[ Math.max( activeExerciseIndex - 1, 0 ) ];
		if (!activeSlide || typeof ResizeObserver === "undefined") return;

		const resizeObserver = new ResizeObserver( () => {
			setCarouselHeight( activeSlide.offsetHeight );
		} );

		resizeObserver.observe( activeSlide );

		return () => {
			resizeObserver.disconnect();
		};
	}, [ activeExerciseIndex ] );

	return (
		<div className={ "flex flex-col sm:hidden" }>
			{ exercises.length > 0 ? (
				<>
					{ /* Antes del ejercicio solo va la nota del entrenador, y solo si escribio
					     una: el resto del resumen queda al final para llegar rapido a entrenar. */ }
					{ routineObservation ? (
						<div className={ "mb-4 flex gap-3 rounded-2xl border border-border bg-surface px-3 py-3" }>
							<Lightbulb className={ "mt-0.5 size-5 shrink-0 text-warning" }/>
							<div className={ "min-w-0" }>
								<p className={ "text-sm font-semibold text-foreground" }>Nota del entrenador</p>
								<p className={ "text-sm text-muted" }>{ routineObservation }</p>
							</div>
						</div>
					) : null }

					<div
						className={ "transition-[height] duration-200 ease-out" }
						style={ carouselHeight !== null ? { height: `${ carouselHeight }px` } : undefined }
					>
						<Carousel opts={ { loop: true } } setApi={ setApi }>
							<Carousel.Content>
							{ exercises.map( ( exercise ) => (
								<Carousel.Item key={ exercise.id } className={ "flex items-start" }>
									<div
										ref={ ( node ) => {
											slideRefs.current[ exercises.findIndex( ( currentExercise ) => currentExercise.id === exercise.id ) ] = node;
										} }
										className={ "w-full" }
									>
										<MobileExerciseCard exercise={ exercise } onVariantChangeAction={ onVariantChangeAction }>
											<ExerciseSetsEditor
												exercise={ exercise }
												isActive={ activeExerciseIndex === exercises.findIndex( ( currentExercise ) => currentExercise.id === exercise.id ) + 1 }
												onExerciseUpdate={ onExerciseUpdate }
												onRepeatLastSession={ () => onRepeatLastSessionAction( exercise.id ) }
								detailContent={
													<MobileExerciseSetCard
														exerciseId={ exercise.id }
														onSetUpdate={ onSetUpdate }
														previousSessionHistory={
															( exercise.variantOptions.find( ( variant ) => variant.id === exercise.variantExerciseId )?.lastSession )
															?? exercise.lastSession
														}
														sets={ exercise.sets }
													/>
												}
											/>
										</MobileExerciseCard>
									</div>
								</Carousel.Item>
							) ) }
							</Carousel.Content>
						</Carousel>
					</div>

					{ /* Barra fija abajo: pasar de ejercicio y guardar quedan a mano del pulgar
					     sin tener que llegar al final de una tarjeta larga. */ }
					<div className={ "sticky bottom-0 z-10 -mx-1 mt-4 space-y-2 border-t border-border bg-background/95 px-1 pb-2 pt-3 backdrop-blur" }>
						<div className={ "flex items-center justify-between gap-2" }>
							<Button
								isIconOnly
								aria-label={ "Ejercicio anterior" }
								variant={ "secondary" }
								onPress={ () => api?.scrollPrev() }
							>
								<ArrowLeft className={ "size-4" }/>
							</Button>
							<p className={ "min-w-0 flex-1 text-center text-sm font-semibold text-muted" }>{ `Ejercicio ${activeExerciseIndex} de ${exercises.length}` }</p>
							<Button
								isIconOnly
								aria-label={ "Ejercicio siguiente" }
								variant={ "secondary" }
								onPress={ () => api?.scrollNext() }
							>
								<ArrowRight className={ "size-4" }/>
							</Button>
						</div>
						<Button className={ "flex w-full font-semibold" } fullWidth isDisabled={ !canSaveProgress } isPending={ isPending } onPress={ onSave }>
							<Save/>
							Guardar progreso
						</Button>
					</div>

					<div className={ "mt-4 grid gap-3" }>
						<RoutineSessionOverviewCard
							description={ routineStatusDescription }
							icon={ <ChartLine className={ "size-5" }/> }
							iconClassName={ "flex size-10 items-center justify-center rounded-full bg-accent/10 text-accent" }
							title={ "Resumen de la sesión" }
						/>
						<RoutineSessionOverviewCard
							description={ formatDateLabel( latestProgressDate ) }
							icon={ <Calendar className={ "size-5" }/> }
							iconClassName={ "flex size-10 items-center justify-center rounded-full bg-accent/10 text-accent" }
							title={ "Última sesión completa" }
						/>
					</div>
				</>
			) : (
				<RoutineExerciseEmptyState/>
			) }
		</div>
	);
}
