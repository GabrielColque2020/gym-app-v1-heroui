"use client";

import { createContext, useContext } from "react";

// Un dia terminado se muestra como registro: los campos quedan bloqueados hasta
// que el estudiante toca "Corregir". Con el guardado automatico, un toque de mas
// sobre un dia viejo cambiaria lo que ya quedo registrado.
const RoutineSessionLockContext = createContext( false );

export const RoutineSessionLockProvider = RoutineSessionLockContext.Provider;

export function useIsRoutineSessionLocked() {
	return useContext( RoutineSessionLockContext );
}
