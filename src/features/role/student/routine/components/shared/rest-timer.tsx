"use client";

import { Button } from "@heroui/react";
import { Pause, Play, Square, Timer, TimerReset } from "lucide-react";

import { useRestTimer } from "@/features/role/student/routine/hooks/use-rest-timer";
import { formatRestTime, REST_TIMER_STEP_SECONDS } from "@/features/role/student/routine/stores/use-rest-timer-store";
import { useScreenWakeLock } from "@/lib/use-screen-wake-lock";

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

// Cuando faltan estos segundos o menos, el reloj cambia de color: es hora de
// ir preparandose para la serie que sigue.
const ALMOST_DONE_SECONDS = 10;
const RING_RADIUS = 30;
const RING_LENGTH = 2 * Math.PI * RING_RADIUS;

// La cuenta regresiva del descanso, con sus controles. Arriba, el tiempo dentro
// de un anillo que se va vaciando y los ajustes de tiempo; abajo, lo que se
// hace con el reloj, con nombre y no solo con un icono.
export function RestTimerPanel( { className = "" }: RestTimerPanelProps ) {
	const { addTime, isActive, isPaused, pause, progress, remainingSeconds, removeTime, restart, resume, runSeconds, stop } = useRestTimer();
	// Mientras corre, la pantalla no se apaga: con el telefono bloqueado el reloj
	// se congela y el aviso de fin no llega. En pausa se deja apagar.
	useScreenWakeLock( isActive && !isPaused );
	const isAlmostDone = !isPaused && remainingSeconds <= ALMOST_DONE_SECONDS;
	const toneClassName = isPaused ? "text-muted" : isAlmostDone ? "text-warning" : "text-accent";

	return (
		<div className={ `space-y-2.5 rounded-2xl border border-border bg-surface p-3 shadow-sm ${ className }` }>
			<div className={ "flex items-center gap-3" }>
				<div className={ "relative size-[4.5rem] shrink-0" }>
					<svg aria-hidden className={ "size-full -rotate-90" } viewBox={ "0 0 72 72" }>
						<circle className={ "text-border" } cx={ 36 } cy={ 36 } fill={ "none" } r={ RING_RADIUS } stroke={ "currentColor" } strokeWidth={ 6 }/>
						<circle
							className={ `transition-[stroke-dashoffset] duration-300 ease-linear ${ toneClassName }` }
							cx={ 36 }
							cy={ 36 }
							fill={ "none" }
							r={ RING_RADIUS }
							stroke={ "currentColor" }
							strokeDasharray={ RING_LENGTH }
							strokeDashoffset={ RING_LENGTH * ( 1 - progress ) }
							strokeLinecap={ "round" }
							strokeWidth={ 6 }
						/>
					</svg>
					{ /* Lo lee un lector de pantalla como temporizador, sin anunciar cada segundo. */ }
					<p
						aria-live={ "off" }
						className={ `absolute inset-0 flex items-center justify-center text-lg font-black tabular-nums ${ isPaused ? "text-muted" : "text-foreground" }` }
						role={ "timer" }
					>
						{ formatRestTime( remainingSeconds ) }
					</p>
				</div>
				<div className={ "min-w-0 flex-1" }>
					<p className={ `text-sm font-semibold ${ toneClassName }` }>
						{ isPaused ? "Descanso en pausa" : isAlmostDone ? "Ya casi" : "Descansando" }
					</p>
					<p className={ "text-xs text-muted" }>de { formatRestTime( runSeconds ) }</p>
				</div>
				<div className={ "flex shrink-0 items-center gap-1" }>
					<Button
						aria-label={ `Restar ${ REST_TIMER_STEP_SECONDS } segundos` }
						className={ "h-9 min-w-0 px-2.5 tabular-nums" }
						size={ "sm" }
						variant={ "secondary" }
						onPress={ removeTime }
					>
						−{ REST_TIMER_STEP_SECONDS } s
					</Button>
					<Button
						aria-label={ `Sumar ${ REST_TIMER_STEP_SECONDS } segundos` }
						className={ "h-9 min-w-0 px-2.5 tabular-nums" }
						size={ "sm" }
						variant={ "secondary" }
						onPress={ addTime }
					>
						+{ REST_TIMER_STEP_SECONDS } s
					</Button>
				</div>
			</div>
			<div className={ "grid grid-cols-3 gap-2" }>
				<Button className={ "w-full min-w-0 bg-accent px-2 font-semibold text-accent-foreground" } onPress={ isPaused ? resume : pause }>
					{ isPaused ? <Play className={ "size-4 shrink-0" }/> : <Pause className={ "size-4 shrink-0" }/> }
					<span className={ "truncate" }>{ isPaused ? "Seguir" : "Pausar" }</span>
				</Button>
				{ /* Un reloj con flecha, y con su nombre al lado: la flecha circular sola
				     es la de "Actualizar" la pantalla y se confundirian. */ }
				<Button
					aria-label={ "Reiniciar el descanso desde el principio" }
					className={ "w-full min-w-0 px-2" }
					variant={ "secondary" }
					onPress={ restart }
				>
					<TimerReset className={ "size-4 shrink-0" }/>
					<span className={ "truncate" }>Reiniciar</span>
				</Button>
				<Button
					aria-label={ "Terminar el descanso" }
					className={ "w-full min-w-0 px-2 text-danger" }
					variant={ "secondary" }
					onPress={ stop }
				>
					<Square className={ "size-3.5 shrink-0 fill-current" }/>
					<span className={ "truncate" }>Terminar</span>
				</Button>
			</div>
		</div>
	);
}
