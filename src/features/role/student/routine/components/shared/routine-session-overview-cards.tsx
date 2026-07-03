"use client";

import { Bulb, Calendar, ChartLine } from "@gravity-ui/icons";

import { formatDateLabel } from "@/features/role/student/routine/views/routine-page-content.utils";
import type { Exercise } from "@/features/routine/types/routine-exercise.types";
import { RoutineSessionOverviewCard } from "@/features/role/student/routine/components/shared/routine-session-overview-card";

type RoutineSessionOverviewCardsProps = {
	exercises: Exercise[];
	latestProgressDate: Date | null;
	routineStatusDescription: string;
};

export function RoutineSessionOverviewCards( {
	exercises,
	latestProgressDate,
	routineStatusDescription,
}: RoutineSessionOverviewCardsProps ) {
	return (
		<>
			<RoutineSessionOverviewCard
				icon={ <Bulb className={ "size-5" }/> }
				iconClassName={ "flex size-10 items-center justify-center rounded-full bg-warning/10 text-warning" }
				title={ "Consejo del entrenador" }
				description={ exercises[ 0 ]?.notes ?? "Manten una buena tecnica durante todo el ejercicio. Controla el movimiento y respira correctamente." }
			/>
			<RoutineSessionOverviewCard
				icon={ <ChartLine className={ "size-5" }/> }
				iconClassName={ "flex size-10 items-center justify-center rounded-full bg-accent/10 text-accent" }
				title={ "Resumen de la sesion" }
				description={ routineStatusDescription }
			/>
			<RoutineSessionOverviewCard
				icon={ <Calendar className={ "size-5" }/> }
				iconClassName={ "flex size-10 items-center justify-center rounded-full bg-accent/10 text-accent" }
				title={ "Ultima sesion completa" }
				description={ formatDateLabel( latestProgressDate ) }
			/>
		</>
	);
}
