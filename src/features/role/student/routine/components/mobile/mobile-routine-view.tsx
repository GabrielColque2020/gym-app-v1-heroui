import { Button } from "@heroui/react";
import { Carousel } from "@heroui-pro/react";
import { ArrowLeft, ArrowRight, Save } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import MobileExerciseCard from "@/features/role/student/routine/components/mobile/mobile-exercise-card";
import { MobileExerciseSetCard } from "@/features/role/student/routine/components/mobile/mobile-exercise-set-card";
import { ExerciseSetsEditor } from "@/features/role/student/routine/components/shared/exercise-sets-editor";
import {
	RoutineExerciseEmptyState
} from "@/features/role/student/routine/components/shared/routine-exercise-empty-state";
import {
	RoutineSessionOverviewCards
} from "@/features/role/student/routine/components/shared/routine-session-overview-cards";
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
					<div className={ "mb-4 grid gap-3" }>
						<RoutineSessionOverviewCards
							latestProgressDate={ latestProgressDate }
							routineObservation={ routineObservation }
							routineStatusDescription={ routineStatusDescription }
						/>
					</div>

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

					<div className={ "flex items-center justify-between gap-3 px-2 pt-4" }>
						<Button className={ "bg-primary text-primary-foreground" } onPress={ () => api?.scrollPrev() } variant={ "secondary" }>
							<ArrowLeft className={ "size-4" }/>
							Anterior
						</Button>
						<p className={ "min-w-20 text-center text-sm font-semibold text-muted" }>{ `${ activeExerciseIndex } / ${ exercises.length }` }</p>
						<Button className={ "bg-primary text-primary-foreground" } onPress={ () => api?.scrollNext() } variant={ "secondary" }>
							Siguiente
							<ArrowRight className={ "size-4" }/>
						</Button>
					</div>

					<Button className={ "mt-4 flex w-full font-semibold sm:hidden" } fullWidth isDisabled={ !canSaveProgress } isPending={ isPending } size={ "lg" } onPress={ onSave }>
						<Save/>
						Guardar progreso
					</Button>
				</>
			) : (
				<RoutineExerciseEmptyState/>
			) }
		</div>
	);
}
