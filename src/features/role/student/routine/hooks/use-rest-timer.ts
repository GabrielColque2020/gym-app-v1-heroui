"use client";

import { useEffect, useState } from "react";

import { REST_TIMER_STEP_SECONDS, useRestTimerStore } from "@/features/role/student/routine/stores/use-rest-timer-store";

const TICK_MS = 250;

// Estado del descanso entre series para mostrar en pantalla. El reloj en si vive
// en el store; aca solo se refresca "ahora" mientras hay un descanso corriendo.
export function useRestTimer() {
	const defaultSeconds = useRestTimerStore( ( state ) => state.defaultSeconds );
	const endsAt = useRestTimerStore( ( state ) => state.endsAt );
	const pausedRemainingMs = useRestTimerStore( ( state ) => state.pausedRemainingMs );
	const runSeconds = useRestTimerStore( ( state ) => state.runSeconds );
	const adjust = useRestTimerStore( ( state ) => state.adjust );
	const finish = useRestTimerStore( ( state ) => state.finish );
	const pause = useRestTimerStore( ( state ) => state.pause );
	const restart = useRestTimerStore( ( state ) => state.restart );
	const resume = useRestTimerStore( ( state ) => state.resume );
	const start = useRestTimerStore( ( state ) => state.start );
	const stop = useRestTimerStore( ( state ) => state.stop );
	const [ now, setNow ] = useState( () => Date.now() );

	useEffect( () => {
		if (endsAt === null) return;

		const tick = () => {
			const current = Date.now();

			if (current >= endsAt) {
				finish();
				return;
			}

			setNow( current );
		};
		const intervalId = window.setInterval( tick, TICK_MS );

		// Al volver a la app despues de bloquear el telefono, el reloj se pone al dia
		// en el momento, sin esperar al proximo intervalo.
		document.addEventListener( "visibilitychange", tick );

		return () => {
			window.clearInterval( intervalId );
			document.removeEventListener( "visibilitychange", tick );
		};
	}, [ endsAt, finish ] );

	const isPaused = pausedRemainingMs !== null;
	const isActive = endsAt !== null || isPaused;
	const remainingMs = isPaused ? pausedRemainingMs : endsAt !== null ? endsAt - now : 0;
	// Nunca mas que la duracion: "ahora" puede venir atrasado hasta el primer intervalo.
	const remainingSeconds = isActive
		? Math.min( runSeconds, Math.max( 0, Math.ceil( remainingMs / 1000 ) ) )
		: 0;

	return {
		addTime: () => adjust( REST_TIMER_STEP_SECONDS ),
		defaultSeconds,
		isActive,
		isPaused,
		pause,
		progress: isActive && runSeconds > 0 ? remainingSeconds / runSeconds : 0,
		remainingSeconds,
		removeTime: () => adjust( -REST_TIMER_STEP_SECONDS ),
		restart,
		resume,
		start,
		stop,
	};
}
