"use client";

import { toast } from "@heroui/react";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { formatRestSeconds, REST_SECONDS_MAX, REST_SECONDS_MIN } from "@/features/routine/services/rest-seconds";

export const REST_TIMER_DEFAULT_SECONDS = 90;
export const REST_TIMER_STEP_SECONDS = 15;

// Un descanso que termino hace menos que esto se avisa como siempre: el reloj
// estaba a la vista y llego a tiempo.
const ON_TIME_FINISH_MS = 5000;
// Uno que termino mientras la app no estaba a la vista (el telefono se bloqueo o
// se cambio de app) se avisa igual al volver, si no paso mas que esto. Mas viejo
// quedo de otra visita y se cierra sin avisar.
const LATE_FINISH_MS = 10 * 60 * 1000;

type StartOptions = {
	// Descanso que el entrenador fijo para el ejercicio en pantalla, si lo hay.
	prescribedSeconds?: number | null;
};

type RestTimerState = {
	// El descanso elegido en este telefono. Se usa cuando el entrenador no fijo uno.
	defaultSeconds: number;
	// Momento en que termina el descanso en curso. Se guarda la hora de fin y no
	// los segundos que faltan, para que el reloj siga bien aunque el telefono se
	// bloquee o la pestaña quede en segundo plano.
	endsAt: number | null;
	// Si el descanso en curso arranco con el tiempo del entrenador. Ajustarlo no
	// cambia entonces el descanso elegido en el telefono.
	isPrescribedRun: boolean;
	// Lo que faltaba al pausar. Con valor, el descanso esta en pausa.
	pausedRemainingMs: number | null;
	// Lo que dura el descanso en curso, con los ajustes que se le hayan hecho.
	runSeconds: number;
	adjust: ( deltaSeconds: number ) => void;
	finish: () => void;
	pause: () => void;
	restart: () => void;
	resume: () => void;
	start: ( options?: StartOptions ) => void;
	stop: () => void;
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

function formatElapsed( ms: number ) {
	const seconds = Math.round( ms / 1000 );

	if (seconds < 60) return `hace ${ seconds } segundos`;

	const minutes = Math.round( seconds / 60 );

	return minutes === 1 ? "hace 1 minuto" : `hace ${ minutes } minutos`;
}

function clampSeconds( seconds: number ) {
	return Math.min( REST_SECONDS_MAX, Math.max( REST_SECONDS_MIN, Math.round( seconds ) ) );
}

const IDLE = { endsAt: null, pausedRemainingMs: null } as const;

export const useRestTimerStore = create<RestTimerState>()(
	persist(
		( set, get ) => ( {
			defaultSeconds: REST_TIMER_DEFAULT_SECONDS,
			endsAt: null,
			isPrescribedRun: false,
			pausedRemainingMs: null,
			runSeconds: REST_TIMER_DEFAULT_SECONDS,
			// Sumar o restar tiempo sirve en curso y en pausa. Si el descanso salio del
			// telefono, el ajuste queda para el proximo: quien siempre agrega 30
			// segundos necesita mas descanso.
			adjust: ( deltaSeconds ) => {
				const { defaultSeconds, endsAt, isPrescribedRun, pausedRemainingMs, runSeconds } = get();
				const nextRunSeconds = clampSeconds( runSeconds + deltaSeconds );
				const appliedMs = ( nextRunSeconds - runSeconds ) * 1000;

				if (appliedMs === 0) return;

				set( {
					defaultSeconds: isPrescribedRun ? defaultSeconds : nextRunSeconds,
					endsAt: endsAt === null ? null : endsAt + appliedMs,
					pausedRemainingMs: pausedRemainingMs === null ? null : Math.max( 1000, pausedRemainingMs + appliedMs ),
					runSeconds: nextRunSeconds,
				} );
			},
			// La llaman todas las pantallas que muestran el reloj; solo la primera avisa.
			finish: () => {
				const { endsAt } = get();

				if (endsAt === null) return;

				set( IDLE );

				const lateMs = Date.now() - endsAt;

				if (lateMs > LATE_FINISH_MS) return;

				// El sonido puede haber quedado en pausa con la app en segundo plano.
				void audioContext?.resume().catch( () => undefined );
				notifyRestFinished();

				// Volvio tarde: el reloj ya no esta en pantalla y el aviso solo no dice
				// cuanto hace. Con esto sabe si ya se paso del descanso.
				if (lateMs > ON_TIME_FINISH_MS) {
					toast( "Terminó el descanso", { description: `Terminó ${ formatElapsed( lateMs ) }. Seguí con la próxima serie.` } );
				}
			},
			pause: () => {
				const { endsAt } = get();

				if (endsAt === null) return;

				set( { endsAt: null, pausedRemainingMs: Math.max( 1000, endsAt - Date.now() ) } );
			},
			// Vuelve a empezar el mismo descanso desde el principio.
			restart: () => {
				prepareSound();
				set( { endsAt: Date.now() + get().runSeconds * 1000, pausedRemainingMs: null } );
			},
			resume: () => {
				const { pausedRemainingMs } = get();

				if (pausedRemainingMs === null) return;

				prepareSound();
				set( { endsAt: Date.now() + pausedRemainingMs, pausedRemainingMs: null } );
			},
			start: ( options ) => {
				const prescribedSeconds = options?.prescribedSeconds ?? null;
				const runSeconds = clampSeconds( prescribedSeconds ?? get().defaultSeconds );

				prepareSound();
				set( {
					endsAt: Date.now() + runSeconds * 1000,
					isPrescribedRun: prescribedSeconds !== null,
					pausedRemainingMs: null,
					runSeconds,
				} );
			},
			stop: () => set( IDLE ),
		} ),
		{
			name: "gym-app-rest-timer",
			partialize: ( state ) => ( {
				defaultSeconds: state.defaultSeconds,
				endsAt: state.endsAt,
				isPrescribedRun: state.isPrescribedRun,
				pausedRemainingMs: state.pausedRemainingMs,
				runSeconds: state.runSeconds,
			} ),
			storage: createJSONStorage( () => localStorage ),
		},
	),
);

export const formatRestTime = formatRestSeconds;
