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
	{ buildHref: buildStudentTrainingRoutineHref, icon: Dumbbell, id: "routine", label: "Rutina" },
	{ buildHref: buildStudentMealPlanHref, icon: UtensilsCrossed, id: "meal-plan", label: "Plan alimenticio" },
	{ buildHref: buildStudentHistoryHref, icon: CalendarClock, id: "history", label: "Historial" },
] as const;

// Las tres pantallas de un estudiante (rutina, plan e historial) son paginas
// separadas; estas pestañas las presentan como una sola ficha, para pasar de una
// a otra sin volver a elegir al estudiante en otra lista.
export function CoachStudentTabs( { active, studentId }: CoachStudentTabsProps ) {
	return (
		<nav aria-label={ "Secciones del estudiante" } className={ "flex gap-2 overflow-x-auto pb-1" }>
			{ TABS.map( ( tab ) => {
				const isActive = tab.id === active;
				const Icon = tab.icon;

				return (
					<Link
						key={ tab.id }
						aria-current={ isActive ? "page" : undefined }
						className={
							`flex shrink-0 items-center gap-2 rounded-xl border px-3 py-2 text-sm font-medium transition-colors ${
								isActive
									? "border-accent bg-accent-soft/40 text-foreground"
									: "border-border bg-surface text-muted hover:bg-surface-secondary hover:text-foreground"
							}`
						}
						href={ tab.buildHref( studentId ) }
					>
						<Icon className={ "size-4" }/>
						{ tab.label }
					</Link>
				);
			} ) }
		</nav>
	);
}
