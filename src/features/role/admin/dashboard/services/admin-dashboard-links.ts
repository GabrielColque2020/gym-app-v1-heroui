export function buildStudentsIndexHref() {
	return "/admin/student";
}

export function buildExercisesIndexHref() {
	return "/admin/exercises";
}

export function buildTrainingRoutinesStudentsHref() {
	return "/admin/trainingRoutinesStudents";
}

export function buildMealPlansStudentsHref() {
	return "/admin/mealPlansStudents";
}

export function buildHistoryRoutinesStudentsHref() {
	return "/admin/historyRoutinesStudents";
}

export function buildStudentTrainingRoutineHref( studentId: string ) {
	return `/admin/trainingRoutine?studentId=${ studentId }`;
}

export function buildStudentMealPlanHref( studentId: string ) {
	return `/admin/mealPlans?studentId=${ studentId }`;
}

export function buildStudentHistoryHref( studentId: string ) {
	return `/admin/historyRoutines?studentId=${ studentId }`;
}

export const ADMIN_DASHBOARD_QUICK_ACTIONS = [
	{
		compactLabel: "Estudiantes",
		description: "Alta, edición y seguimiento administrativo.",
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
