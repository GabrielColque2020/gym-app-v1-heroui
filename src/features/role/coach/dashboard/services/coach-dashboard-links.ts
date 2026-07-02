export function buildStudentsIndexHref() {
	return "/coach/student";
}

export function buildExercisesIndexHref() {
	return "/coach/exercises";
}

export function buildTrainingRoutinesStudentsHref() {
	return "/coach/trainingRoutinesStudents";
}

export function buildMealPlansStudentsHref() {
	return "/coach/mealPlansStudents";
}

export function buildHistoryRoutinesStudentsHref() {
	return "/coach/historyRoutinesStudents";
}

export function buildStudentTrainingRoutineHref( studentId: string ) {
	return `/coach/trainingRoutine?studentId=${ studentId }`;
}

export function buildStudentMealPlanHref( studentId: string ) {
	return `/coach/mealPlans?studentId=${ studentId }`;
}

export function buildStudentHistoryHref( studentId: string ) {
	return `/coach/historyRoutines?studentId=${ studentId }`;
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
		description: "Catalogo del coach para rutinas y variantes.",
		href: buildExercisesIndexHref(),
		id: "exercises",
		label: "Ejercicios",
	},
	{
		compactLabel: "Rutinas",
		description: "Ir al listado operativo para asignar rutinas.",
		href: buildTrainingRoutinesStudentsHref(),
		id: "training-routines",
		label: "Rutinas por estudiante",
	},
	{
		compactLabel: "Alimentación",
		description: "Acceso directo a planes alimenticios por alumno.",
		href: buildMealPlansStudentsHref(),
		id: "meal-plans",
		label: "Planes por estudiante",
	},
	{
		compactLabel: "Historial",
		description: "Revision mensual del trabajo realizado.",
		href: buildHistoryRoutinesStudentsHref(),
		id: "history-routines",
		label: "Historial por estudiante",
	},
] as const;
