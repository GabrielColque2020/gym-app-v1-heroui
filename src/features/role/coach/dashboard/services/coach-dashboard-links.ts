export function buildStudentTrainingRoutineHref( studentId: string ) {
	return `/coach/training-routine?studentId=${ studentId }`;
}

export function buildStudentMealPlanHref( studentId: string ) {
	return `/coach/meal-plans?studentId=${ studentId }`;
}

export function buildStudentHistoryHref( studentId: string ) {
	return `/coach/history-routines?studentId=${ studentId }`;
}

export function buildStudentProgressHref( studentId: string ) {
	return `/coach/progress?studentId=${ studentId }`;
}
