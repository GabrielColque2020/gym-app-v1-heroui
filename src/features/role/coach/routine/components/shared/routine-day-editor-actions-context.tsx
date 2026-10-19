"use client";

import { createContext, useContext } from "react";

export type RoutineDayCopyOption = {
	exerciseCount: number;
	id: string;
	label: string;
};

// Un dia de la rutina, para elegir en cuales agregar un ejercicio.
export type RoutineDaySummary = {
	dayNumber: number;
	exerciseIds: string[];
	id: string;
	isFinalized: boolean;
	week: number;
};

type RoutineDayEditorActions = {
	// El dia que se esta editando.
	currentDay: { dayNumber: number; id: string; week: number };
	// Todos los dias de la rutina (mes o plantilla), este incluido.
	routineDays: RoutineDaySummary[];
	// Otros dias del mes con ejercicios, para arrancar un dia vacio copiando uno.
	copyOptions: RoutineDayCopyOption[];
	onCopyFromDay: ( routineDayId: string ) => void;
	onMoveExercise: ( clientId: string, direction: -1 | 1 ) => void;
	// Abre el cambio de ejercicio de una fila del dia.
	onRequestReplace: ( clientId: string ) => void;
	// Abre las variantes de una fila del dia.
	onRequestVariants: ( clientId: string ) => void;
	// Cuantas variantes tiene cada ejercicio guardado del dia, por id de fila.
	variantCountByRoutineId: ReadonlyMap<string, number>;
};

// Acciones del editor del dia que usan las filas y el estado vacio. Van por
// contexto y no por props porque entre quien las define y quien las usa hay
// cuatro componentes que solo las pasarian de mano.
const RoutineDayEditorActionsContext = createContext<RoutineDayEditorActions | null>( null );

export const RoutineDayEditorActionsProvider = RoutineDayEditorActionsContext.Provider;

export function useRoutineDayEditorActions() {
	const actions = useContext( RoutineDayEditorActionsContext );

	if (!actions) {
		throw new Error( "useRoutineDayEditorActions debe usarse dentro del editor del día." );
	}

	return actions;
}
