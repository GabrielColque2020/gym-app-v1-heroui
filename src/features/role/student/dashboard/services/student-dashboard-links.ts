export function buildStudentDashboardHref() {
	return "/student/dashboard";
}

export function buildTrainingRoutineHref() {
	return "/student/training-routine";
}

export function buildMealPlansHref() {
	return "/student/meal-plans";
}

export function buildHistoryRoutinesHref() {
	return "/student/history-routines";
}

export function buildRoutineDayHref( routineDayId: string ) {
	return `/student/routine?routineDayId=${ routineDayId }`;
}

export const STUDENT_DASHBOARD_QUICK_ACTIONS = [
	{
		compactLabel: "Rutina",
		href: buildTrainingRoutineHref(),
		id: "training-routine",
		label: "Rutina de entrenamiento",
	},
	{
		compactLabel: "Planes",
		href: buildMealPlansHref(),
		id: "meal-plans",
		label: "Planes alimenticios",
	},
	{
		compactLabel: "Historial",
		href: buildHistoryRoutinesHref(),
		id: "history-routines",
		label: "Historial de rutinas",
	},
] as const;
