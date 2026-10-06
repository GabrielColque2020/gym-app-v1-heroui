import type { StudentRoutineSessionDetail, StudentRoutineSession } from "@/features/routine/services/routine-session";

import {
	buildRoutineSaveSummary,
	countHalfLoadedSets,
} from "@/features/role/student/routine/views/routine-page-content.utils";

type BuildRoutinePageDerivedStateParams = {
	activeSession: StudentRoutineSession | null;
	data: StudentRoutineSessionDetail | undefined;
	isSavePending: boolean;
};

export function buildRoutinePageDerivedState( {
	activeSession,
	data,
	isSavePending,
}: BuildRoutinePageDerivedStateParams ) {
	const exerciseCount = activeSession?.exercises.length ?? 0;
	const hasExercises = exerciseCount > 0;
	const completedExercises = activeSession?.exercises.filter( ( exercise ) =>
		exercise.sets.length > 0
		&& exercise.sets.every( ( set ) => set.completed ),
	).length ?? 0;
	const routineStatusDescription = activeSession
		? hasExercises
			? `${ completedExercises } de ${ exerciseCount } ejercicios completos`
			: "No hay ejercicios cargados para este día"
		: "Sin ejercicios cargados";

	return {
		backHref: `/student/training-routine?month=${ data?.trainingRoutine.month ?? "" }&year=${ data?.trainingRoutine.year ?? "" }`,
		canFinishDay: hasExercises && !isSavePending,
		halfLoadedSetCount: activeSession ? countHalfLoadedSets( activeSession ) : 0,
		isDayFinished: Boolean( data?.isFinalized ),
		routineStatusDescription,
		saveSummary: activeSession ? buildRoutineSaveSummary( activeSession ) : [],
	};
}

