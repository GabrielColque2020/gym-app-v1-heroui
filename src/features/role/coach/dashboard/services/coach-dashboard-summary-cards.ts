import type { CoachDashboardSummary } from "@/features/role/coach/dashboard/actions/get-coach-dashboard-summary";

export function buildCoachDashboardQuickStats( summary: CoachDashboardSummary ) {
	return [
		{
			description: "Alumnos activos vinculados al coach.",
			label: "Estudiantes activos",
			value: summary.totals.activeStudents,
		},
		{
			description: "Catalogo disponible para armar rutinas.",
			label: "Ejercicios activos",
			value: summary.totals.activeExercises,
		},
		{
			description: "Estudiantes activos con rutina cargada este mes.",
			label: "Rutinas del mes",
			value: summary.totals.studentsWithRoutineThisMonth,
		},
		{
			description: "Estudiantes activos con plan alimenticio registrado.",
			label: "Planes alimenticios",
			value: summary.totals.studentsWithMealPlan,
		},
	] as const;
}
