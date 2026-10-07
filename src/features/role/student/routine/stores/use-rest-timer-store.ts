"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const REST_TIMER_DEFAULT_SECONDS = 90;
export const REST_TIMER_STEP_SECONDS = 15;

const REST_TIMER_MIN_SECONDS = 15;
const REST_TIMER_MAX_SECONDS = 600;
// Un descanso que termino hace mas que esto ya no se avisa: quedo de otra visita.
const STALE_FINISH_MS = 5000;

type RestTimerState = {
	// Lo que dura el descanso. Se recuerda en el telefono entre un dia y otro.
	durationSeconds: number;
	// Momento en que termina el descanso en curso. Se guarda la hora de fin y no
	// los segundos que faltan, para que el reloj siga bien aunque el telefono se
	// bloquee o la pestaña quede en segundo plano.
	endsAt: number | null;
	adjust: ( deltaSeconds: number ) => void;
	finish: () => void;
	skip: () => void;
	start: ( seconds?: number ) => void;
};

let audioContext: AudioContext | null = null;

// El navegador solo deja sonar despues de un toque del usuario: el contexto de
// audio se prepara al arrancar el descanso, que siempre es un toque.
function prepareSound() {
	try {
		audioContext ??= new AudioContext();
		void audioContext.resume();
	} catch {
		audioContext = null;
	}
}

function playTone( context: AudioContext, startAt: number ) {
	const oscillator = context.createOscillator();
	const gain = context.createGain();

	oscillator.type = "sine";
	oscillator.frequency.value = 880;
	gain.gain.setValueAtTime( 0.0001, startAt );
	gain.gain.exponentialRampToValueAtTime( 0.3, startAt + 0.02 );
	gain.gain.exponentialRampToValueAtTime( 0.0001, startAt + 0.25 );
	oscillator.connect( gain ).connect( context.destination );
	oscillator.start( startAt );
	oscillator.stop( startAt + 0.3 );
}

// Aviso de fin de descanso: vibracion (no existe en iPhone) y dos tonos cortos.
function notifyRestFinished() {
	try {
		navigator.vibrate?.( [ 200, 100, 200 ] );
	} catch {
		// Sin vibracion queda el sonido.
	}

	if (!audioContext) return;

	try {
		playTone( audioContext, audioContext.currentTime );
		playTone( audioContext, audioContext.currentTime + 0.35 );
	} catch {
		// Sin sonido queda el aviso en pantalla.
	}
}

function clampSeconds( seconds: number ) {
	return Math.min( REST_TIMER_MAX_SECONDS, Math.max( REST_TIMER_MIN_SECONDS, Math.round( seconds ) ) );
}

export const useRestTimerStore = create<RestTimerState>()(
	persist(
		( set, get ) => ( {
			durationSeconds: REST_TIMER_DEFAULT_SECONDS,
			endsAt: null,
			// Sumar o restar tiempo con el descanso en curso tambien cambia lo que dura
			// el proximo: si alguien siempre agrega 30 segundos, es que necesita mas.
			adjust: ( deltaSeconds ) => {
				const { durationSeconds, endsAt } = get();
				const nextDuration = clampSeconds( durationSeconds + deltaSeconds );
				const appliedDelta = nextDuration - durationSeconds;

				if (appliedDelta === 0) return;

				set( {
					durationSeconds: nextDuration,
					endsAt: endsAt === null ? null : endsAt + appliedDelta * 1000,
				} );
			},
			// La llaman todas las pantallas que muestran el reloj; solo la primera avisa.
			finish: () => {
				const { endsAt } = get();

				if (endsAt === null) return;

				set( { endsAt: null } );

				if (Date.now() - endsAt <= STALE_FINISH_MS) notifyRestFinished();
			},
			skip: () => set( { endsAt: null } ),
			start: ( seconds ) => {
				const durationSeconds = clampSeconds( seconds ?? get().durationSeconds );

				prepareSound();
				set( { durationSeconds, endsAt: Date.now() + durationSeconds * 1000 } );
			},
		} ),
		{
			name: "gym-app-rest-timer",
			partialize: ( state ) => ( { durationSeconds: state.durationSeconds, endsAt: state.endsAt } ),
			storage: createJSONStorage( () => localStorage ),
		},
	),
);

export function formatRestTime( totalSeconds: number ) {
	const minutes = Math.floor( totalSeconds / 60 );
	const seconds = totalSeconds % 60;

	return `${ minutes }:${ String( seconds ).padStart( 2, "0" ) }`;
}
