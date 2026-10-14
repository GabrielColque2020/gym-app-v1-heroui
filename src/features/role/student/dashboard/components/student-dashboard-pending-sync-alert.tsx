"use client";

import { Alert, Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useShallow } from "zustand/react/shallow";

import { buildRoutineDayHref } from "@/features/role/student/dashboard/services/student-dashboard-links";
import { useRoutineSessionStore } from "@/features/routine/stores/use-routine-session-store";

// Series que quedaron en este telefono sin llegar al servidor: se corto la señal
// o vencio la sesion antes del guardado automatico. Un borrador solo existe
// mientras difiere de lo guardado, asi que si hay uno, hay algo sin subir.
//
// Los de otra visita no se suben solos (podrian ser mas viejos que lo que se
// cargo desde otro dispositivo): en el dia aparecen con un boton "Guardar", o
// como "Falta completar" si son series a medias, que todavia no se pueden
// subir. Sin este aviso, habia que entrar justo a ese dia para enterarse.
export function StudentDashboardPendingSyncAlert() {
	const router = useRouter();
	const hasHydrated = useRoutineSessionStore( ( state ) => state.hasHydrated );
	const pendingDayIds = useRoutineSessionStore( useShallow( ( state ) => Object.keys( state.drafts ) ) );
	const firstDraft = useRoutineSessionStore( ( state ) => state.drafts[ pendingDayIds[ 0 ] ?? "" ] ?? null );

	if (!hasHydrated || pendingDayIds.length === 0) return null;

	// "Día 2 · Semana 2": el titulo suele ser el nombre de la semana.
	const dayName = firstDraft ? [ `Día ${ firstDraft.dayNumber }`, firstDraft.title ].filter( Boolean ).join( " · " ) : "";
	const description = pendingDayIds.length === 1
		? `Quedaron en este teléfono${ dayName ? ` (${ dayName })` : "" } y todavía no se subieron. Abrí el día para revisarlas.`
		: `Quedaron en este teléfono, en ${ pendingDayIds.length } días, y todavía no se subieron. Abrí cada día para revisarlas.`;

	return (
		<Alert className={ "border border-warning/20" } status={ "warning" }>
			<Alert.Content>
				<Alert.Title>Tenés series sin subir</Alert.Title>
				<Alert.Description>{ description }</Alert.Description>
			</Alert.Content>
			<Button size={ "sm" } variant={ "secondary" } onPress={ () => router.push( buildRoutineDayHref( pendingDayIds[ 0 ] ) ) }>
				Abrir el día
			</Button>
		</Alert>
	);
}
