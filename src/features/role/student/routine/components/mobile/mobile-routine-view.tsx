import { Button } from "@heroui/react";
import { Carousel } from "@heroui-pro/react/carousel";
import { ArrowLeft, ArrowRight, CheckCircle2, Flag, Pencil } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import MobileExerciseCard from "@/features/role/student/routine/components/mobile/mobile-exercise-card";
import { MobileExerciseSetCard } from "@/features/role/student/routine/components/mobile/mobile-exercise-set-card";
import { ExerciseSetsEditor } from "@/features/role/student/routine/components/shared/exercise-sets-editor";
import {
	RoutineExerciseEmptyState
} from "@/features/role/student/routine/components/shared/routine-exercise-empty-state";
import { RoutineExerciseStrip } from "@/features/role/student/routine/components/shared/routine-exercise-strip";
import {
	useExerciseCarouselState
} from "@/features/role/student/routine/components/shared/use-exercise-carousel-state";
import type { Exercise } from "@/features/routine/types/routine-exercise.types";

interface MobileRoutineViewProps {
	exercises: Exercise[];
	canFinishDay: boolean;
	isDayFinished: boolean;
	isSessionLocked: boolean;
	onUnlockSessionAction: () => void;
	onExerciseUpdate: ( exerciseId: string, updates: Partial<{ weight: number | null; reps: number | null; notes: string | null }> ) => void;
	onFinishDayAction: () => void;
	onRepeatLastSessionAction: ( exerciseId: string ) => void;
	onSetUpdate: ( exerciseId: string, setId: string, updates: Partial<{ weight: number | null; reps: number | null; notes: string | null }> ) => void;
	onVariantChangeAction: ( exerciseId: string, variantExerciseId: string | null ) => void;
}

export default function MobileRoutineView( {
	exercises,
	canFinishDay,
	isDayFinished,
	isSessionLocked,
	onUnlockSessionAction,
	onExerciseUpdate,
	onFinishDayAction,
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
					<div className={ "mb-3" }>
						<RoutineExerciseStrip
							activeExerciseIndex={ activeExerciseIndex }
							exercises={ exercises }
							onSelectAction={ ( index ) => api?.scrollTo( index ) }
						/>
					</div>

					<div
						className={ "transition-[height] duration-200 ease-out" }
						style={ carouselHeight !== null ? { height: `${ carouselHeight }px` } : undefined }
					>
						<Carousel opts={ { loop: false } } setApi={ setApi }>
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

					{ /* Barra fija abajo: pasar de ejercicio y terminar el dia quedan a mano del
					     pulgar sin tener que llegar al final de una tarjeta larga. Las series se
					     guardan solas; este boton solo marca el dia como realizado. */ }
					<div className={ "sticky bottom-0 z-10 -mx-1 mt-4 space-y-2 border-t border-border bg-background/95 px-1 pb-2 pt-3 backdrop-blur" }>
						<div className={ "flex items-center justify-between gap-2" }>
							<Button
								isIconOnly
								aria-label={ "Ejercicio anterior" }
								isDisabled={ activeExerciseIndex <= 1 }
								variant={ "secondary" }
								onPress={ () => api?.scrollPrev() }
							>
								<ArrowLeft className={ "size-4" }/>
							</Button>
							<p className={ "min-w-0 flex-1 text-center text-sm font-semibold text-muted" }>{ `Ejercicio ${activeExerciseIndex} de ${exercises.length}` }</p>
							<Button
								isIconOnly
								aria-label={ "Ejercicio siguiente" }
								isDisabled={ activeExerciseIndex >= exercises.length }
								variant={ "secondary" }
								onPress={ () => api?.scrollNext() }
							>
								<ArrowRight className={ "size-4" }/>
							</Button>
						</div>
						{ isDayFinished ? (
							<div className={ "flex items-center justify-between gap-2 py-1" }>
								<p className={ "flex items-center gap-1.5 text-sm font-semibold text-success" }>
									<CheckCircle2 className={ "size-4" }/>
									{ isSessionLocked ? "Día terminado" : "Corrigiendo el día" }
								</p>
								{ isSessionLocked ? (
									<Button size={ "sm" } variant={ "secondary" } onPress={ onUnlockSessionAction }>
										<Pencil className={ "size-4" }/>
										Corregir
									</Button>
								) : null }
							</div>
						) : (
							<Button className={ "flex w-full font-semibold" } fullWidth isDisabled={ !canFinishDay } onPress={ onFinishDayAction }>
								<Flag className={ "size-4" }/>
								Terminar día
							</Button>
						) }
					</div>

				</>
			) : (
				<RoutineExerciseEmptyState/>
			) }
		</div>
	);
}
