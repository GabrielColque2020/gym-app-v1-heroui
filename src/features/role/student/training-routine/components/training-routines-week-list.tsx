import type {
	StudentTrainingRoutine,
	StudentTrainingRoutineDay,
} from "@/features/role/student/training-routine/actions/get-training-routines-by-student";

import Link from "next/link";
import { Card, Chip } from "@heroui/react";
import { CheckCircle2, ChevronRight, CircleDashed, Play } from "lucide-react";

import {
	getTrainingRoutineDayDescription,
	getTrainingRoutineDayStatus,
	getTrainingRoutineDayTitle,
} from "@/features/role/student/training-routine/components/training-routines-day-card.utils";

type TrainingRoutinesWeekListProps = {
	routineWeeks: StudentTrainingRoutine[];
};

type DayRowProps = {
	day: StudentTrainingRoutineDay;
	isNext: boolean;
};

// El dia por el que sigue el estudiante: el que dejo empezado y, si no hay
// ninguno, el primero que todavia no hizo.
function findNextDayId( routineWeeks: StudentTrainingRoutine[] ) {
	const days = routineWeeks.flatMap( ( week ) => week.routineDays ).filter( ( day ) => day.routines.length > 0 );
	const nextDay = days.find( ( day ) => !day.isFinalized && day.loadedSetCount > 0 )
		?? days.find( ( day ) => !day.isFinalized );

	return nextDay?.id ?? null;
}

function DayRow( { day, isNext }: DayRowProps ) {
	const status = getTrainingRoutineDayStatus( day );
	const exerciseCount = day.routines.length;
	const content = (
		<>
			<div className={ "min-w-0 flex-1" }>
				<p className={ "flex flex-wrap items-center gap-2 text-base font-bold text-foreground" }>
					{ getTrainingRoutineDayTitle( day.dayNumber ) }
					{ isNext ? (
						<span className={ "rounded-full bg-accent px-2 py-0.5 text-[11px] font-semibold text-accent-foreground" }>
							{ status.label === "En curso" ? "Seguí por acá" : "Te toca este" }
						</span>
					) : null }
				</p>
				<p className={ "text-sm text-muted" }>
					{ exerciseCount === 0
						? "Tu entrenador todavía no cargó ejercicios"
						: `${ getTrainingRoutineDayDescription( day ) } · ${ exerciseCount } ${ exerciseCount === 1 ? "ejercicio" : "ejercicios" }` }
				</p>
			</div>
			{ exerciseCount === 0 ? null : (
				<>
					<Chip className={ "shrink-0" } color={ status.color } size={ "sm" } variant={ "soft" }>
						{ day.isFinalized
							? <CheckCircle2 className={ "size-3" }/>
							: day.loadedSetCount > 0 ? <Play className={ "size-3" }/> : <CircleDashed className={ "size-3" }/> }
						<Chip.Label>{ status.label }</Chip.Label>
					</Chip>
					<ChevronRight className={ "size-4 shrink-0 text-muted" }/>
				</>
			) }
		</>
	);
	const className = `flex items-center gap-3 rounded-xl border px-3 py-3 ${
		isNext ? "border-accent bg-accent/5" : "border-border bg-surface-secondary"
	}`;

	// Un dia sin ejercicios no abre nada.
	if (exerciseCount === 0) {
		return <div className={ `${ className } opacity-70` }>{ content }</div>;
	}

	// Toda la fila es el enlace: se abre con un toque en cualquier parte.
	return (
		<Link
			aria-label={ `${ getTrainingRoutineDayTitle( day.dayNumber ) }, ${ status.label.toLowerCase() }: ${ status.actionLabel.toLowerCase() }` }
			className={ `${ className } transition-colors hover:border-accent` }
			href={ `/student/routine?routineDayId=${ day.id }` }
		>
			{ content }
		</Link>
	);
}

// El mes entero a la vista, una tarjeta por semana y una fila por dia. Antes
// habia que elegir la semana con pestañas y siempre abria en la primera.
export function TrainingRoutinesWeekList( { routineWeeks }: TrainingRoutinesWeekListProps ) {
	const nextDayId = findNextDayId( routineWeeks );

	return (
		<div className={ "flex flex-col gap-3" }>
			{ routineWeeks.map( ( routineWeek ) => {
				const daysWithExercises = routineWeek.routineDays.filter( ( day ) => day.routines.length > 0 );
				const finishedDays = daysWithExercises.filter( ( day ) => day.isFinalized ).length;

				return (
					<Card key={ routineWeek.id } className={ "border border-border" } variant={ "default" }>
						<Card.Header className={ "px-3 pt-3" }>
							<p className={ "text-base font-semibold text-foreground" }>Semana { routineWeek.week }</p>
							<p className={ "text-xs text-muted" }>
								{ daysWithExercises.length === 0
									? "Sin días cargados"
									: `${ finishedDays } de ${ daysWithExercises.length } ${ daysWithExercises.length === 1 ? "día terminado" : "días terminados" }` }
							</p>
						</Card.Header>
						<Card.Content className={ "flex flex-col gap-2 px-3 pb-3" }>
							{ routineWeek.routineDays.length === 0 ? (
								<p className={ "py-3 text-center text-sm text-muted" }>Esta semana no tiene días de entrenamiento.</p>
							) : routineWeek.routineDays.map( ( day ) => (
								<DayRow key={ day.id } day={ day } isNext={ day.id === nextDayId }/>
							) ) }
						</Card.Content>
					</Card>
				);
			} ) }
		</div>
	);
}
