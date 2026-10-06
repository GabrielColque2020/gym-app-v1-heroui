"use client";

import type { CoachDashboardStudentSummary } from "@/features/role/coach/dashboard/actions/get-coach-dashboard-summary";

import { useState } from "react";
import Link from "next/link";
import { Button, Card } from "@heroui/react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { buildStudentTrainingRoutineHref } from "@/features/role/coach/dashboard/services/coach-dashboard-links";

type CoachDashboardPendingRoutinesProps = {
	periodLabel: string;
	students: CoachDashboardStudentSummary[];
};

// Cuantos se muestran antes de pedir "ver todos".
const VISIBLE_STUDENTS = 5;

// Lo primero que mira un coach a principio de mes: a quien le falta la rutina.
export function CoachDashboardPendingRoutines( { periodLabel, students }: CoachDashboardPendingRoutinesProps ) {
	const [ isExpanded, setIsExpanded ] = useState( false );
	const activeStudents = students.filter( ( student ) => student.active );
	const pendingStudents = activeStudents.filter( ( student ) => !student.hasRoutineThisMonth );

	if (activeStudents.length === 0) return null;

	if (pendingStudents.length === 0) {
		return (
			<Card className={ "border border-success/30 py-2" } variant={ "default" }>
				<Card.Content className={ "flex items-center gap-3 p-3" }>
					<CheckCircle2 className={ "size-5 shrink-0 text-success" }/>
					<p className={ "text-sm font-medium text-foreground" }>
						Todos tus estudiantes activos tienen rutina cargada en { periodLabel }.
					</p>
				</Card.Content>
			</Card>
		);
	}

	const visibleStudents = isExpanded ? pendingStudents : pendingStudents.slice( 0, VISIBLE_STUDENTS );
	const hiddenCount = pendingStudents.length - visibleStudents.length;

	return (
		<Card className={ "border border-warning/40 py-2" } variant={ "default" }>
			<Card.Content className={ "space-y-3 p-3" }>
				<div>
					<p className={ "text-base font-semibold text-foreground" }>
						{ pendingStudents.length === 1
							? `1 estudiante sin rutina en ${ periodLabel }`
							: `${ pendingStudents.length } estudiantes sin rutina en ${ periodLabel }` }
					</p>
					<p className={ "text-sm text-muted" }>
						De { activeStudents.length } { activeStudents.length === 1 ? "activo" : "activos" }. Al entrar podés copiar la del mes anterior o armar una nueva.
					</p>
				</div>
				<ul className={ "grid gap-2" }>
					{ visibleStudents.map( ( student ) => (
						<li
							key={ student.id }
							className={ "flex items-center justify-between gap-3 rounded-xl border border-border bg-surface-secondary px-3 py-2" }
						>
							<div className={ "min-w-0" }>
								<p className={ "line-clamp-2 text-sm font-semibold text-foreground" }>{ student.name }</p>
								<p className={ "truncate text-xs text-muted" }>
									{ student.lastRoutineMonthLabel
										? `Última rutina: ${ student.lastRoutineMonthLabel }`
										: "Nunca tuvo rutina" }
								</p>
							</div>
							<Link
								className={ "flex shrink-0 items-center gap-1.5 rounded-full bg-accent px-3 py-1.5 text-sm font-medium text-accent-foreground" }
								href={ buildStudentTrainingRoutineHref( student.id ) }
							>
								Cargar rutina
								<ArrowRight className={ "size-4" }/>
							</Link>
						</li>
					) ) }
				</ul>
				{ pendingStudents.length > VISIBLE_STUDENTS ? (
					<Button size={ "sm" } variant={ "ghost" } onPress={ () => setIsExpanded( ( current ) => !current ) }>
						{ isExpanded ? "Ver menos" : `Ver los ${ hiddenCount } restantes` }
					</Button>
				) : null }
			</Card.Content>
		</Card>
	);
}
