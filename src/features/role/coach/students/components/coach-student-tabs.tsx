import Link from "next/link";
import { CalendarClock, Dumbbell, TrendingUp, UtensilsCrossed } from "lucide-react";

import { CoachStudentSummary } from "@/features/role/coach/students/components/coach-student-summary";
import {
	buildStudentHistoryHref,
	buildStudentMealPlanHref,
	buildStudentProgressHref,
	buildStudentTrainingRoutineHref,
} from "@/features/role/coach/dashboard/services/coach-dashboard-links";

export type CoachStudentTab = "history" | "meal-plan" | "progress" | "routine";

type CoachStudentTabsProps = {
	active: CoachStudentTab;
	studentId: string;
};

const TABS = [
	{ buildHref: buildStudentTrainingRoutineHref, icon: Dumbbell, id: "routine", label: "Rutina", shortLabel: "Rutina" },
	{ buildHref: buildStudentMealPlanHref, icon: UtensilsCrossed, id: "meal-plan", label: "Plan alimenticio", shortLabel: "Plan" },
	{ buildHref: buildStudentHistoryHref, icon: CalendarClock, id: "history", label: "Historial", shortLabel: "Historial" },
	{ buildHref: buildStudentProgressHref, icon: TrendingUp, id: "progress", label: "Progreso", shortLabel: "Progreso" },
] as const;

// Las pantallas de un estudiante (rutina, plan, historial y progreso) son paginas
// separadas; estas pestañas las presentan como una sola ficha, para pasar de una
// a otra sin volver a elegir al estudiante en otra lista. Arriba, lo que hay
// que tener a la vista del estudiante en cualquiera de ellas.
export function CoachStudentTabs( { active, studentId }: CoachStudentTabsProps ) {
	return (
		<div className={ "flex flex-col gap-3" }>
			<CoachStudentSummary studentId={ studentId }/>
			<nav aria-label={ "Secciones del estudiante" } className={ "grid grid-cols-4 gap-1.5 sm:flex sm:gap-2" }>
				{ TABS.map( ( tab ) => {
					const isActive = tab.id === active;
					const Icon = tab.icon;

					return (
						<Link
							key={ tab.id }
							aria-current={ isActive ? "page" : undefined }
							className={
								// En el telefono se reparten el ancho, con el icono arriba del
								// nombre: las cuatro en un renglon no entran con el icono al lado.
								`flex min-w-0 flex-col items-center justify-center gap-0.5 rounded-xl border px-1 py-2 text-xs font-medium transition-colors sm:shrink-0 sm:flex-row sm:justify-start sm:gap-2 sm:px-3 sm:text-sm ${
									isActive
										? "border-accent bg-accent-soft/40 text-foreground"
										: "border-border bg-surface text-muted hover:bg-surface-secondary hover:text-foreground"
								}`
							}
							href={ tab.buildHref( studentId ) }
						>
							<Icon className={ "size-4 shrink-0" }/>
							<span className={ "max-w-full truncate sm:hidden" }>{ tab.shortLabel }</span>
							<span className={ "hidden sm:inline" }>{ tab.label }</span>
						</Link>
					);
				} ) }
			</nav>
		</div>
	);
}
