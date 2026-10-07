"use client";

import { useEffect, useState } from "react";

import { REST_TIMER_STEP_SECONDS, useRestTimerStore } from "@/features/role/student/routine/stores/use-rest-timer-store";

const TICK_MS = 250;

// Estado del descanso entre series para mostrar en pantalla. El reloj en si vive
// en el store; aca solo se refresca "ahora" mientras hay un descanso en curso.
export function useRestTimer() {
	const durationSeconds = useRestTimerStore( ( state ) => state.durationSeconds );
	const endsAt = useRestTimerStore( ( state ) => state.endsAt );
	const adjust = useRestTimerStore( ( state ) => state.adjust );
	const finish = useRestTimerStore( ( state ) => state.finish );
	const skip = useRestTimerStore( ( state ) => state.skip );
	const start = useRestTimerStore( ( state ) => state.start );
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

	const isRunning = endsAt !== null;
	// Nunca mas que la duracion: "ahora" puede venir atrasado hasta el primer intervalo.
	const remainingSeconds = isRunning
		? Math.min( durationSeconds, Math.max( 0, Math.ceil( ( endsAt - now ) / 1000 ) ) )
		: 0;

	return {
		addTime: () => adjust( REST_TIMER_STEP_SECONDS ),
		durationSeconds,
		isRunning,
		progress: isRunning && durationSeconds > 0 ? remainingSeconds / durationSeconds : 0,
		remainingSeconds,
		removeTime: () => adjust( -REST_TIMER_STEP_SECONDS ),
		skip,
		start,
	};
}
