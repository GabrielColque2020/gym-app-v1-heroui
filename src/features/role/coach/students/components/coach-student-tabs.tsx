import Link from "next/link";
import { CalendarClock, Dumbbell, UtensilsCrossed } from "lucide-react";

import {
	buildStudentHistoryHref,
	buildStudentMealPlanHref,
	buildStudentTrainingRoutineHref,
} from "@/features/role/coach/dashboard/services/coach-dashboard-links";

export type CoachStudentTab = "history" | "meal-plan" | "routine";

type CoachStudentTabsProps = {
	active: CoachStudentTab;
	studentId: string;
};

const TABS = [
	{ buildHref: buildStudentTrainingRoutineHref, icon: Dumbbell, id: "routine", label: "Rutina", shortLabel: "Rutina" },
	{ buildHref: buildStudentMealPlanHref, icon: UtensilsCrossed, id: "meal-plan", label: "Plan alimenticio", shortLabel: "Plan" },
	{ buildHref: buildStudentHistoryHref, icon: CalendarClock, id: "history", label: "Historial", shortLabel: "Historial" },
] as const;

// Las tres pantallas de un estudiante (rutina, plan e historial) son paginas
// separadas; estas pestañas las presentan como una sola ficha, para pasar de una
// a otra sin volver a elegir al estudiante en otra lista.
export function CoachStudentTabs( { active, studentId }: CoachStudentTabsProps ) {
	return (
		<nav aria-label={ "Secciones del estudiante" } className={ "grid grid-cols-3 gap-2 sm:flex" }>
			{ TABS.map( ( tab ) => {
				const isActive = tab.id === active;
				const Icon = tab.icon;

				return (
					<Link
						key={ tab.id }
						aria-current={ isActive ? "page" : undefined }
						className={
							// En el telefono las tres se reparten el ancho: antes la tercera
							// quedaba cortada y habia que desplazar para verla.
							`flex min-w-0 items-center justify-center gap-1.5 rounded-xl border px-2 py-2 text-sm font-medium transition-colors sm:shrink-0 sm:justify-start sm:gap-2 sm:px-3 ${
								isActive
									? "border-accent bg-accent-soft/40 text-foreground"
									: "border-border bg-surface text-muted hover:bg-surface-secondary hover:text-foreground"
							}`
						}
						href={ tab.buildHref( studentId ) }
					>
						<Icon className={ "size-4 shrink-0" }/>
						<span className={ "truncate sm:hidden" }>{ tab.shortLabel }</span>
						<span className={ "hidden sm:inline" }>{ tab.label }</span>
					</Link>
				);
			} ) }
		</nav>
	);
}
