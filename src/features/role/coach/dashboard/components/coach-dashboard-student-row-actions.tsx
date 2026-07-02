"use client";

import { Calendar, CircleFill, EllipsisVertical, Gear } from "@gravity-ui/icons";
import { Button, Dropdown, Header, Label } from "@heroui/react";
import { useRouter } from "next/navigation";

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
				<EllipsisVertical className={ "size-4" }/>
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
						<Gear className={ "size-4 shrink-0 text-accent" }/>
						<Label className={ "text-accent" }>Rutina</Label>
					</Dropdown.Item>
					<Dropdown.Item id={ "meal-plan" } textValue={ "Plan alimenticio" }>
						<CircleFill className={ "size-4 shrink-0 text-success" }/>
						<Label className={ "text-success" }>Plan</Label>
					</Dropdown.Item>
					<Dropdown.Item id={ "history" } textValue={ "Historial" }>
						<Calendar className={ "size-4 shrink-0 text-warning" }/>
						<Label className={ "text-warning" }>Historial</Label>
					</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown.Popover>
		</Dropdown>
	);
}
