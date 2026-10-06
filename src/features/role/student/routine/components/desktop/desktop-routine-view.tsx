import { Button } from "@heroui/react";
import { Carousel } from "@heroui-pro/react/carousel";
import { ArrowLeft, ArrowRight } from "lucide-react";

import DesktopExerciseCard from "@/features/role/student/routine/components/desktop/desktop-exercise-card";
import { DesktopExerciseSetsGrid } from "@/features/role/student/routine/components/desktop/desktop-exercise-sets-grid";
import { ExerciseSetsEditor } from "@/features/role/student/routine/components/shared/exercise-sets-editor";
import {
	RoutineExerciseEmptyState
} from "@/features/role/student/routine/components/shared/routine-exercise-empty-state";
import { RoutineExerciseStrip } from "@/features/role/student/routine/components/shared/routine-exercise-strip";
import {
	useExerciseCarouselState
} from "@/features/role/student/routine/components/shared/use-exercise-carousel-state";
import type { Exercise } from "@/features/routine/types/routine-exercise.types";

type DesktopRoutineViewProps = {
	exercises: Exercise[];
	onVariantChangeAction: ( exerciseId: string, variantExerciseId: string | null ) => void;
	onExerciseUpdate: (
		exerciseId: string,
		updates: Partial<{ weight: number | null; reps: number | null; notes: string | null }>,
	) => void;
	onRepeatLastSessionAction: ( exerciseId: string ) => void;
	onSetUpdate: (
		exerciseId: string,
		setId: string,
		updates: Partial<{ weight: number | null; reps: number | null; notes: string | null }>,
	) => void;
};

export default function DesktopRoutineView( {
	exercises,
	onExerciseUpdate,
	onVariantChangeAction,
	onRepeatLastSessionAction,
	onSetUpdate,
}: DesktopRoutineViewProps ) {
	const { activeExerciseIndex, api, setApi } = useExerciseCarouselState();

	return (
		<div className={ "hidden w-full flex-col gap-4 sm:flex" }>
			{ exercises.length > 0 ? (
				<>
					<RoutineExerciseStrip
						activeExerciseIndex={ activeExerciseIndex }
						exercises={ exercises }
						onSelectAction={ ( index ) => api?.scrollTo( index ) }
					/>
					<div className={ "min-w-0" }>
						<Carousel opts={ { loop: false } } setApi={ setApi }>
							<Carousel.Content>
							{ exercises.map( ( exercise ) => (
								<Carousel.Item key={ exercise.id }>
									<DesktopExerciseCard exercise={ exercise } onVariantChangeAction={ onVariantChangeAction }>
										<ExerciseSetsEditor
											exercise={ exercise }
											isActive={ activeExerciseIndex === exercises.findIndex( ( currentExercise ) => currentExercise.id === exercise.id ) + 1 }
											onExerciseUpdate={ onExerciseUpdate }
											onRepeatLastSession={ () => onRepeatLastSessionAction( exercise.id ) }
											detailContent={ <DesktopExerciseSetsGrid exercise={ exercise } onSetUpdate={ onSetUpdate }/> }
										/>
									</DesktopExerciseCard>
								</Carousel.Item>
							) ) }
							</Carousel.Content>
						</Carousel>
						<div className={ "flex items-center justify-between gap-3 px-4 mt-2" }>
							<Button isDisabled={ activeExerciseIndex <= 1 } variant={ "secondary" } onPress={ () => api?.scrollPrev() }>
								<ArrowLeft className={ "size-4" }/>
								Anterior
							</Button>
							<p className={ "min-w-20 text-center text-sm font-medium text-muted" }>{ `Ejercicio ${activeExerciseIndex} de ${exercises.length}` }</p>
							<Button isDisabled={ activeExerciseIndex >= exercises.length } variant={ "secondary" } onPress={ () => api?.scrollNext() }>
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

