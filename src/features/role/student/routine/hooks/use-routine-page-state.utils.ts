import type { StudentRoutineSessionDetail, StudentRoutineSession } from "@/features/routine/services/routine-session";

import { buildRoutineSaveSummary } from "@/features/role/student/routine/views/routine-page-content.utils";

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
	const routineObservation = data?.routines.find( ( routine ) => routine.observation?.trim().length )?.observation?.trim() ?? null;
	const completedExercises = activeSession?.exercises.filter( ( exercise ) =>
		exercise.sets.length > 0
		&& exercise.sets.every( ( set ) => set.completed && set.currentReps !== null && set.currentWeight !== null ),
	).length ?? 0;
	const latestProgressDate = data?.progressEntries[ 0 ]?.date ? new Date( data.progressEntries[ 0 ].date ) : null;
	const routineStatusDescription = activeSession
		? hasExercises
			? `${ completedExercises } de ${ exerciseCount } ejercicios completos`
			: "No hay ejercicios cargados para este dia"
		: "Sin ejercicios cargados";

	return {
		backHref: `/student/training-routine?month=${ data?.trainingRoutine.month ?? "" }&year=${ data?.trainingRoutine.year ?? "" }`,
		canSaveProgress: hasExercises && !isSavePending,
		latestProgressDate,
		routineObservation,
		routineStatusDescription,
		saveSummary: activeSession ? buildRoutineSaveSummary( activeSession ) : [],
	};
}

