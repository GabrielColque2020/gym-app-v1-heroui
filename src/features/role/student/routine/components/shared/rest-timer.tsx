"use client";

import { Button } from "@heroui/react";
import { Pause, Play, SkipBack, Square, Timer } from "lucide-react";

import { useRestTimer } from "@/features/role/student/routine/hooks/use-rest-timer";
import { formatRestTime, REST_TIMER_STEP_SECONDS } from "@/features/role/student/routine/stores/use-rest-timer-store";

type RestTimerStartButtonProps = {
	className?: string;
	// Descanso que el entrenador fijo para el ejercicio en pantalla. Sin valor se
	// usa el elegido en este telefono.
	prescribedSeconds?: number | null;
};

// Arranca el descanso entre series. Es manual: en la vista simple no hay un
// momento claro de "termine la serie" del que colgar un arranque automatico.
export function RestTimerStartButton( { className, prescribedSeconds = null }: RestTimerStartButtonProps ) {
	const { defaultSeconds, start } = useRestTimer();
	const seconds = prescribedSeconds ?? defaultSeconds;

	return (
		<Button
			aria-label={ `Empezar un descanso de ${ formatRestTime( seconds ) }` }
			className={ className }
			variant={ "secondary" }
			onPress={ () => start( { prescribedSeconds } ) }
		>
			<Timer className={ "size-4 shrink-0" }/>
			<span className={ "truncate" }>Descanso { formatRestTime( seconds ) }</span>
		</Button>
	);
}

type RestTimerPanelProps = {
	className?: string;
};

// La cuenta regresiva del descanso, con sus controles. Arriba, el tiempo y lo
// que se hace con el reloj (pausar, reiniciar, detener); abajo, el avance con
// los ajustes de tiempo a los lados.
export function RestTimerPanel( { className = "" }: RestTimerPanelProps ) {
	const { addTime, isPaused, pause, progress, remainingSeconds, removeTime, restart, resume, stop } = useRestTimer();

	return (
		<div className={ `space-y-2 rounded-2xl border border-accent/40 bg-accent-soft/50 p-2.5 ${ className }` }>
			<div className={ "flex items-center gap-1.5" }>
				<div className={ "min-w-0 flex-1" }>
					<p className={ "text-xs font-medium text-accent" }>{ isPaused ? "Descanso en pausa" : "Descanso" }</p>
					{ /* Lo lee un lector de pantalla como temporizador, sin anunciar cada segundo. */ }
					<p
						aria-live={ "off" }
						className={ `text-3xl font-black leading-none tabular-nums ${ isPaused ? "text-muted" : "text-foreground" }` }
						role={ "timer" }
					>
						{ formatRestTime( remainingSeconds ) }
					</p>
				</div>
				<Button
					isIconOnly
					aria-label={ isPaused ? "Continuar el descanso" : "Pausar el descanso" }
					className={ "size-10 shrink-0" }
					variant={ "secondary" }
					onPress={ isPaused ? resume : pause }
				>
					{ isPaused ? <Play className={ "size-4" }/> : <Pause className={ "size-4" }/> }
				</Button>
				{ /* "Volver al principio", no una flecha circular: esa es la de "Actualizar"
				     la pantalla y se confundirian. */ }
				<Button
					isIconOnly
					aria-label={ "Reiniciar el descanso desde el principio" }
					className={ "size-10 shrink-0" }
					variant={ "secondary" }
					onPress={ restart }
				>
					<SkipBack className={ "size-4" }/>
				</Button>
				<Button
					isIconOnly
					aria-label={ "Detener el descanso" }
					className={ "size-10 shrink-0 text-danger" }
					variant={ "secondary" }
					onPress={ stop }
				>
					<Square className={ "size-4" }/>
				</Button>
			</div>
			<div className={ "flex items-center gap-2" }>
				<Button
					aria-label={ `Restar ${ REST_TIMER_STEP_SECONDS } segundos` }
					className={ "h-8 min-w-0 shrink-0 px-2.5 tabular-nums" }
					size={ "sm" }
					variant={ "ghost" }
					onPress={ removeTime }
				>
					−{ REST_TIMER_STEP_SECONDS } s
				</Button>
				<div aria-hidden className={ "h-1.5 min-w-0 flex-1 overflow-hidden rounded-full bg-border" }>
					<div
						className={ `h-full rounded-full transition-[width] duration-300 ease-linear ${ isPaused ? "bg-muted" : "bg-accent" }` }
						style={ { width: `${ Math.round( progress * 100 ) }%` } }
					/>
				</div>
				<Button
					aria-label={ `Sumar ${ REST_TIMER_STEP_SECONDS } segundos` }
					className={ "h-8 min-w-0 shrink-0 px-2.5 tabular-nums" }
					size={ "sm" }
					variant={ "ghost" }
					onPress={ addTime }
				>
					+{ REST_TIMER_STEP_SECONDS } s
				</Button>
			</div>
		</div>
	);
}
