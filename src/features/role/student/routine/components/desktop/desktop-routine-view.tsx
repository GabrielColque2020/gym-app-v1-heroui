import { Button } from "@heroui/react";
import { Carousel } from "@heroui-pro/react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import DesktopExerciseCard from "@/features/role/student/routine/components/desktop/desktop-exercise-card";
import { DesktopExerciseSetsGrid } from "@/features/role/student/routine/components/desktop/desktop-exercise-sets-grid";
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

type DesktopRoutineViewProps = {
	exercises: Exercise[];
	latestProgressDate: Date | null;
	routineObservation: string | null;
	onVariantChangeAction: ( exerciseId: string, variantExerciseId: string | null ) => void;
	onExerciseUpdate: (
		exerciseId: string,
		updates: Partial<{ weight: number | null; reps: number | null; notes: string | null }>,
	) => void;
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
	routineObservation,
	onExerciseUpdate,
	onVariantChangeAction,
	onSetUpdate,
	routineStatusDescription,
}: DesktopRoutineViewProps ) {
	const { activeExerciseIndex, api, setApi } = useExerciseCarouselState();

	return (
		<div className={ "hidden w-full flex-col gap-4 sm:flex" }>
			{ exercises.length > 0 ? (
				<>
					<div className={ "grid gap-4 lg:grid-cols-[1.2fr_0.9fr_0.9fr]" }>
						<RoutineSessionOverviewCards
							latestProgressDate={ latestProgressDate }
							routineObservation={ routineObservation }
							routineStatusDescription={ routineStatusDescription }
						/>
					</div>
					<div className={ "min-w-0" }>
						<Carousel opts={ { loop: true } } setApi={ setApi }>
							<Carousel.Content>
							{ exercises.map( ( exercise ) => (
								<Carousel.Item key={ exercise.id }>
									<DesktopExerciseCard exercise={ exercise } onVariantChangeAction={ onVariantChangeAction }>
										<ExerciseSetsEditor
											exercise={ exercise }
											isActive={ activeExerciseIndex === exercises.findIndex( ( currentExercise ) => currentExercise.id === exercise.id ) + 1 }
											onExerciseUpdate={ onExerciseUpdate }
											detailContent={ <DesktopExerciseSetsGrid exercise={ exercise } onSetUpdate={ onSetUpdate }/> }
										/>
									</DesktopExerciseCard>
								</Carousel.Item>
							) ) }
							</Carousel.Content>
						</Carousel>
						<div className={ "flex items-center justify-between gap-3 px-4" }>
							<Button variant={ "secondary" } onPress={ () => api?.scrollPrev() }>
								<ArrowLeft className={ "size-4" }/>
								Anterior
							</Button>
							<p className={ "min-w-20 text-center text-sm " }>{ `Ejercicio ${activeExerciseIndex} de ${exercises.length}` }</p>
							<Button variant={ "secondary" } onPress={ () => api?.scrollNext() }>
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

