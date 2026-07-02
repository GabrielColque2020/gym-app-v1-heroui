export function buildStudentDashboardHref() {
	return "/dashboard";
}

export function buildTrainingRoutineHref() {
	return "/trainingRoutine";
}

export function buildMealPlansHref() {
	return "/mealPlans";
}

export function buildHistoryRoutinesHref() {
	return "/historyRoutines";
}

export function buildRoutineDayHref( routineDayId: string ) {
	return `/routine?routineDayId=${ routineDayId }`;
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
