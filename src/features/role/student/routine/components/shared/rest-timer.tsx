"use client";

import { Button } from "@heroui/react";
import { Timer } from "lucide-react";

import { useRestTimer } from "@/features/role/student/routine/hooks/use-rest-timer";
import { formatRestTime, REST_TIMER_STEP_SECONDS } from "@/features/role/student/routine/stores/use-rest-timer-store";

type RestTimerStartButtonProps = {
	className?: string;
};

// Arranca el descanso entre series. Es manual: en la vista simple no hay un
// momento claro de "termine la serie" del que colgar un arranque automatico.
export function RestTimerStartButton( { className }: RestTimerStartButtonProps ) {
	const { durationSeconds, start } = useRestTimer();

	return (
		<Button
			aria-label={ `Empezar un descanso de ${ formatRestTime( durationSeconds ) }` }
			className={ className }
			variant={ "secondary" }
			onPress={ () => start() }
		>
			<Timer className={ "size-4 shrink-0" }/>
			<span className={ "truncate" }>Descanso { formatRestTime( durationSeconds ) }</span>
		</Button>
	);
}

type RestTimerPanelProps = {
	className?: string;
};

// La cuenta regresiva del descanso en curso, con sus ajustes.
export function RestTimerPanel( { className = "" }: RestTimerPanelProps ) {
	const { addTime, progress, remainingSeconds, removeTime, skip } = useRestTimer();

	return (
		<div className={ `space-y-2 rounded-2xl border border-accent/40 bg-accent-soft/50 p-2.5 ${ className }` }>
			<div className={ "flex items-center gap-2" }>
				<div className={ "min-w-0 flex-1" }>
					<p className={ "text-xs font-medium text-accent" }>Descanso</p>
					{ /* Lo lee un lector de pantalla como temporizador, sin anunciar cada segundo. */ }
					<p aria-live={ "off" } className={ "text-3xl font-black leading-none tabular-nums text-foreground" } role={ "timer" }>
						{ formatRestTime( remainingSeconds ) }
					</p>
				</div>
				<Button
					aria-label={ `Restar ${ REST_TIMER_STEP_SECONDS } segundos` }
					className={ "min-w-0 px-3 tabular-nums" }
					size={ "sm" }
					variant={ "secondary" }
					onPress={ removeTime }
				>
					−{ REST_TIMER_STEP_SECONDS }
				</Button>
				<Button
					aria-label={ `Sumar ${ REST_TIMER_STEP_SECONDS } segundos` }
					className={ "min-w-0 px-3 tabular-nums" }
					size={ "sm" }
					variant={ "secondary" }
					onPress={ addTime }
				>
					+{ REST_TIMER_STEP_SECONDS }
				</Button>
				<Button className={ "min-w-0 px-3" } size={ "sm" } variant={ "secondary" } onPress={ skip }>
					Saltar
				</Button>
			</div>
			<div aria-hidden className={ "h-1 overflow-hidden rounded-full bg-border" }>
				<div className={ "h-full rounded-full bg-accent transition-[width] duration-300 ease-linear" } style={ { width: `${ Math.round( progress * 100 ) }%` } }/>
			</div>
		</div>
	);
}
