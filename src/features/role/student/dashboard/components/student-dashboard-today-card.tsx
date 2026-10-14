"use client";

import { Alert, Button, Card, Chip } from "@heroui/react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

import { StudentDashboardEmptyState } from "@/features/role/student/dashboard/components/student-dashboard-empty-state";
import { buildRoutineDayHref, buildTrainingRoutineHref, } from "@/features/role/student/dashboard/services/student-dashboard-links";
import { APP_TIME_ZONE, getAppDateParts } from "@/lib/app-date";

type StudentDashboardTodayCardProps = {
	currentMonth: number;
	currentYear: number;
	exercisesInNextDay: number;
	hasCurrentMonthRoutine: boolean;
	nextRoutineDay: {
		dayNumber: number;
		exerciseCount: number;
		hasProgress: boolean;
		id: string;
		isFinalized: boolean;
		title: string;
		unfinishedSince: string | null;
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
				action={
					// Mientras tanto puede repetir la de otro mes: en la rutina se cambia de mes.
					<Button variant={ "secondary" } onPress={ () => router.push( buildTrainingRoutineHref() ) }>
						Ver mis rutinas
					</Button>
				}
				description={ `Tu entrenador todavía no cargó la de ${ String( currentMonth ).padStart( 2, "0" ) }/${ currentYear }. Cuando la cargue, aparece acá.` }
				title={ "Todavía no tenés rutina este mes" }
			/>
		);
	}

	if (!nextRoutineDay) {
		return (
			<StudentDashboardEmptyState
				action={
					<Button variant={ "secondary" } onPress={ () => router.push( buildTrainingRoutineHref() ) }>
						Ver todas mis semanas
					</Button>
				}
				description={ "Tus semanas y días están en la rutina del mes." }
				title={ "No hay un día para mostrar ahora" }
			/>
		);
	}

	const unfinishedLabel = nextRoutineDay.unfinishedSince ? formatUnfinishedDay( nextRoutineDay.unfinishedSince ) : null;

	return (
		<Card className={ "border border-border py-2" } variant={ "default" }>
			<Card.Content className={ "space-y-4 p-3" }>
				{ /* Cargo series en otra fecha y no toco "Terminar día". Lo cargado ya esta
				     guardado; falta marcarlo como hecho para seguir con el proximo. */ }
				{ unfinishedLabel ? (
					<Alert className={ "border border-warning/20" } status={ "warning" }>
						<Alert.Content>
							<Alert.Title>Te quedó sin terminar</Alert.Title>
							<Alert.Description>
								{ `Cargaste series ${ unfinishedLabel } y no tocaste "Terminar día". Lo que cargaste está guardado: si ya hiciste todo, entrá y terminalo.` }
							</Alert.Description>
						</Alert.Content>
					</Alert>
				) : null }
				<div className={ "flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between" }>
					<div className={ "space-y-2" }>
						<div className={ "flex flex-wrap items-center gap-2" }>
							<p className={ "text-base font-semibold text-foreground" }>Tu próxima sesión</p>
							<Chip
								color={ nextRoutineDay.isFinalized ? "success" : nextRoutineDay.hasProgress ? "accent" : "default" }
								size={ "sm" }
								variant={ "soft" }
							>
								{ nextRoutineDay.isFinalized ? "Terminada" : nextRoutineDay.hasProgress ? "En curso" : "Pendiente" }
							</Chip>
						</div>
						<div className={ "space-y-1" }>
							<p className={ "text-2xl font-black text-foreground" }>{ `Día ${ nextRoutineDay.dayNumber }` }</p>
							<p className={ "text-sm text-muted" }>
								{ /* El titulo suele ser el nombre de la semana: no se repite si ya lo dice. */ }
								{ [
									nextRoutineDay.title === `Semana ${ nextRoutineDay.week }` ? null : nextRoutineDay.title,
									`Semana ${ nextRoutineDay.week }`,
									`${ exercisesInNextDay } ${ exercisesInNextDay === 1 ? "ejercicio" : "ejercicios" }`,
								].filter( Boolean ).join( " · " ) }
							</p>
						</div>
					</div>
					<Button
						className={ "w-full bg-accent text-accent-foreground lg:w-auto" }
						size={ "lg" }
						onPress={ () => router.push( buildRoutineDayHref( nextRoutineDay.id ) ) }
					>
						{ nextRoutineDay.isFinalized ? "Ver lo que hice" : unfinishedLabel ? "Terminar ahora" : nextRoutineDay.hasProgress ? "Continuar rutina" : "Empezar rutina" }
						<ArrowRight className={ "size-4" }/>
					</Button>
				</div>
				{ /* En el telefono el detalle del dia se omite: ya esta en las tarjetas de abajo. */ }
				<div className={ "hidden gap-3 sm:grid sm:grid-cols-3" }>
					<div className={ "rounded-lg border border-border bg-surface-secondary px-4 py-3" }>
						<p className={ "text-xs font-medium text-muted" }>Ejercicios del día</p>
						<p className={ "mt-1 text-lg font-semibold text-foreground" }>{ exercisesInNextDay }</p>
					</div>
					<div className={ "rounded-lg border border-border bg-surface-secondary px-4 py-3" }>
						<p className={ "text-xs font-medium text-muted" }>Semanas cargadas</p>
						<p className={ "mt-1 text-lg font-semibold text-foreground" }>{ totalWeeks }</p>
					</div>
					<div className={ "rounded-lg border border-border bg-surface-secondary px-4 py-3" }>
						<p className={ "text-xs font-medium text-muted" }>Estado del día</p>
						<p className={ "mt-1 text-lg font-semibold text-foreground" }>
							{ nextRoutineDay.isFinalized ? "Terminado" : nextRoutineDay.hasProgress ? "En curso" : "Pendiente" }
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

const weekdayFormatter = new Intl.DateTimeFormat( "es-AR", {
	day: "numeric",
	month: "numeric",
	timeZone: APP_TIME_ZONE,
	weekday: "long",
} );

// "ayer" o "el martes 13/10", en hora argentina.
function formatUnfinishedDay( isoDate: string ) {
	const date = new Date( isoDate );
	const day = getAppDateParts( date );
	const yesterday = getAppDateParts( new Date( Date.now() - 24 * 60 * 60 * 1000 ) );

	if (day.year === yesterday.year && day.month === yesterday.month && day.day === yesterday.day) return "ayer";

	return `el ${ weekdayFormatter.format( date ).replace( ",", "" ) }`;
}
