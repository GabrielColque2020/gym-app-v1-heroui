import { Calendar, ChartLine, Lightbulb } from "lucide-react";

import { formatDateLabel } from "@/features/role/student/routine/views/routine-page-content.utils";
import { RoutineSessionOverviewCard } from "@/features/role/student/routine/components/shared/routine-session-overview-card";

type RoutineSessionOverviewCardsProps = {
	latestProgressDate: Date | null;
	routineObservation: string | null;
	routineStatusDescription: string;
};

export function RoutineSessionOverviewCards( {
												 latestProgressDate,
												 routineObservation,
												 routineStatusDescription,
											 }: RoutineSessionOverviewCardsProps ) {
	return (
		<>
			<RoutineSessionOverviewCard
				icon={ <Lightbulb className={ "size-5" }/> }
				iconClassName={ "flex size-10 items-center justify-center rounded-full bg-warning/10 text-warning" }
				title={ "Consejo del entrenador" }
				description={ routineObservation ?? "Mantén una buena técnica durante todo el ejercicio. Controla el movimiento y respira correctamente." }
			/>
			<RoutineSessionOverviewCard
				icon={ <ChartLine className={ "size-5" }/> }
				iconClassName={ "flex size-10 items-center justify-center rounded-full bg-accent/10 text-accent" }
				title={ "Resumen de la sesión" }
				description={ routineStatusDescription }
			/>
			<RoutineSessionOverviewCard
				icon={ <Calendar className={ "size-5" }/> }
				iconClassName={ "flex size-10 items-center justify-center rounded-full bg-accent/10 text-accent" }
				title={ "Ultima sesión completa" }
				description={ formatDateLabel( latestProgressDate ) }
			/>
		</>
	);
}
