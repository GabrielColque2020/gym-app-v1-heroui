export function buildStudentsIndexHref() {
	return "/coach/student";
}

export function buildExercisesIndexHref() {
	return "/coach/exercises";
}

export function buildStudentTrainingRoutineHref( studentId: string ) {
	return `/coach/training-routine?studentId=${ studentId }`;
}

export function buildStudentMealPlanHref( studentId: string ) {
	return `/coach/meal-plans?studentId=${ studentId }`;
}

export function buildStudentHistoryHref( studentId: string ) {
	return `/coach/history-routines?studentId=${ studentId }`;
}

export const COACH_DASHBOARD_QUICK_ACTIONS = [
	{
		compactLabel: "Estudiantes",
		description: "Alta, edición y seguimiento de estudiantes.",
		href: buildStudentsIndexHref(),
		id: "students",
		label: "Estudiantes",
	},
	{
		compactLabel: "Ejercicios",
		description: "Catálogo del coach para rutinas y variantes.",
		href: buildExercisesIndexHref(),
		id: "exercises",
		label: "Ejercicios",
	},
] as const;
