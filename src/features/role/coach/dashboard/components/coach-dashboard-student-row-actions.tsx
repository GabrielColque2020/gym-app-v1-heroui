"use client";

import { Button, Dropdown, Header, Label } from "@heroui/react";
import { useRouter } from "next/navigation";
import { CalendarClock, Dumbbell, MoreVertical, UtensilsCrossed } from "lucide-react";

import type { CoachDashboardStudentSummary } from "@/features/role/coach/dashboard/actions/get-coach-dashboard-summary";
import {
	buildStudentHistoryHref,
	buildStudentMealPlanHref,
	buildStudentTrainingRoutineHref,
} from "@/features/role/coach/dashboard/services/coach-dashboard-links";

type CoachDashboardStudentRowActionsProps = {
	student: CoachDashboardStudentSummary;
};

export function CoachDashboardStudentRowActions( { student }: CoachDashboardStudentRowActionsProps ) {
	const router = useRouter();

	return (
		<Dropdown>
			<Button
				isIconOnly
				aria-label={ `Opciones de ${ student.name }` }
				className={ "size-8 shrink-0 text-foreground" }
				size={ "sm" }
				variant={ "ghost" }
			>
				<MoreVertical className={ "size-4" }/>
			</Button>
			<Dropdown.Popover placement={ "bottom end" }>
				<Dropdown.Menu onAction={ ( key ) => {
					if (key === "routine") {
						router.push( buildStudentTrainingRoutineHref( student.id ) );
					}

					if (key === "meal-plan") {
						router.push( buildStudentMealPlanHref( student.id ) );
					}

					if (key === "history") {
						router.push( buildStudentHistoryHref( student.id ) );
					}
				} }>
					<Header>Opciones</Header>
					<Dropdown.Item id={ "routine" } textValue={ "Rutina" }>
						<Dumbbell className={ "size-4 shrink-0 text-accent" }/>
						<Label className={ "text-accent" }>Rutina</Label>
					</Dropdown.Item>
					<Dropdown.Item id={ "meal-plan" } textValue={ "Plan alimenticio" }>
						<UtensilsCrossed className={ "size-4 shrink-0 text-success" }/>
						<Label className={ "text-success" }>Plan</Label>
					</Dropdown.Item>
					<Dropdown.Item id={ "history" } textValue={ "Historial" }>
						<CalendarClock className={ "size-4 shrink-0 text-warning" }/>
						<Label className={ "text-warning" }>Historial</Label>
					</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown.Popover>
		</Dropdown>
	);
}
