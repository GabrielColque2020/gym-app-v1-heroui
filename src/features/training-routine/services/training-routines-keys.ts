export const coachTrainingRoutinesQueryKey = ( studentId: string, month: number, year: number ) =>
	[ "coach-training-routines", studentId, month, year ] as const;

export const studentTrainingRoutinesQueryKey = ( month: number, year: number ) =>
	[ "student-training-routines", month, year ] as const;
