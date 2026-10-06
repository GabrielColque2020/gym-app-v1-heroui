"use client";

import { createContext, useContext } from "react";

export type RoutineDayCopyOption = {
	exerciseCount: number;
	id: string;
	label: string;
};

type RoutineDayEditorActions = {
	// Otros dias del mes con ejercicios, para arrancar un dia vacio copiando uno.
	copyOptions: RoutineDayCopyOption[];
	onCopyFromDay: ( routineDayId: string ) => void;
	onMoveExercise: ( clientId: string, direction: -1 | 1 ) => void;
	// Guarda el dia y abre las variantes del ejercicio, que recien existen una vez guardado.
	onRequestVariants: ( clientId: string ) => void;
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
