"use client";

import { ArrowRight } from "@gravity-ui/icons";
import { Button, Card, Chip } from "@heroui/react";
import { useRouter } from "next/navigation";

import { StudentDashboardEmptyState } from "@/features/role/student/dashboard/components/student-dashboard-empty-state";
import {
	buildRoutineDayHref,
	buildTrainingRoutineHref,
} from "@/features/role/student/dashboard/services/student-dashboard-links";

type StudentDashboardTodayCardProps = {
	currentMonth: number;
	currentYear: number;
	exercisesInNextDay: number;
	hasCurrentMonthRoutine: boolean;
	nextRoutineDay: {
		dayNumber: number;
		exerciseCount: number;
		id: string;
		isFinalized: boolean;
		title: string;
		week: number;
	} | null;
	totalWeeks: number;
};

export function StudentDashboardTodayCard( {
	currentMonth,
	currentYear,
	exercisesInNextDay,
	hasCurrentMonthRoutine,
	nextRoutineDay,
	totalWeeks,
}: StudentDashboardTodayCardProps ) {
	const router = useRouter();

	if (!hasCurrentMonthRoutine) {
		return (
			<StudentDashboardEmptyState
				description={ `No encontramos una rutina para ${ String( currentMonth ).padStart( 2, "0" ) }/${ currentYear }.` }
				title={ "Todavia no tienes una rutina cargada este mes" }
			/>
		);
	}

	if (!nextRoutineDay) {
		return (
			<StudentDashboardEmptyState
				description={ "Puedes revisar todas tus semanas y dias desde tu modulo de rutina." }
				title={ "No hay un dia disponible para mostrar ahora mismo" }
			/>
		);
	}

	return (
		<Card className={ "border border-border bg-surface" } variant={ "default" }>
			<Card.Content className={ "space-y-4 px-5 py-4 sm:px-6" }>
				<div className={ "flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between" }>
					<div className={ "space-y-2" }>
						<div className={ "flex flex-wrap items-center gap-2" }>
							<p className={ "text-base font-semibold text-foreground" }>Tu proxima sesion</p>
							<Chip
								color={ nextRoutineDay.isFinalized ? "success" : "warning" }
								size={ "sm" }
								variant={ "soft" }
							>
								{ nextRoutineDay.isFinalized ? "Guardada" : "Pendiente" }
							</Chip>
						</div>
						<div className={ "space-y-1" }>
							<p className={ "text-2xl font-black text-foreground" }>{ `Dia ${ nextRoutineDay.dayNumber }` }</p>
							<p className={ "text-sm text-muted" }>{ `${ nextRoutineDay.title } · Semana ${ nextRoutineDay.week }` }</p>
						</div>
					</div>
					<Button onPress={ () => router.push( buildRoutineDayHref( nextRoutineDay.id ) ) }>
						<ArrowRight className={ "size-4" }/>
						{ nextRoutineDay.isFinalized ? "Volver a la rutina" : "Continuar rutina" }
					</Button>
				</div>
				<div className={ "grid gap-3 sm:grid-cols-3" }>
					<div className={ "rounded-lg border border-border bg-surface-secondary px-4 py-3" }>
						<p className={ "text-xs font-medium text-muted" }>Ejercicios del dia</p>
						<p className={ "mt-1 text-lg font-semibold text-foreground" }>{ exercisesInNextDay }</p>
					</div>
					<div className={ "rounded-lg border border-border bg-surface-secondary px-4 py-3" }>
						<p className={ "text-xs font-medium text-muted" }>Semanas cargadas</p>
						<p className={ "mt-1 text-lg font-semibold text-foreground" }>{ totalWeeks }</p>
					</div>
					<div className={ "rounded-lg border border-border bg-surface-secondary px-4 py-3" }>
						<p className={ "text-xs font-medium text-muted" }>Estado del dia</p>
						<p className={ "mt-1 text-lg font-semibold text-foreground" }>
							{ nextRoutineDay.isFinalized ? "Completado" : "En curso" }
						</p>
					</div>
				</div>
				<Button
					className={ "w-full sm:w-auto" }
					variant={ "secondary" }
					onPress={ () => router.push( buildTrainingRoutineHref() ) }
				>
					Ver todas mis semanas
				</Button>
			</Card.Content>
		</Card>
	);
}
