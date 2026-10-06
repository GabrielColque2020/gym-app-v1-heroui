import { Calendar, ChartLine } from "lucide-react";

import { formatDateLabel } from "@/features/role/student/routine/views/routine-page-content.utils";
import { RoutineSessionOverviewCard } from "@/features/role/student/routine/components/shared/routine-session-overview-card";

type RoutineSessionOverviewCardsProps = {
	latestProgressDate: Date | null;
	routineStatusDescription: string;
};

export function RoutineSessionOverviewCards( {
												 latestProgressDate,
												 routineStatusDescription,
											 }: RoutineSessionOverviewCardsProps ) {
	return (
		<>
			<RoutineSessionOverviewCard
				icon={ <ChartLine className={ "size-5" }/> }
				iconClassName={ "flex size-10 items-center justify-center rounded-full bg-accent/10 text-accent" }
				title={ "Resumen de la sesión" }
				description={ routineStatusDescription }
			/>
			<RoutineSessionOverviewCard
				icon={ <Calendar className={ "size-5" }/> }
				iconClassName={ "flex size-10 items-center justify-center rounded-full bg-accent/10 text-accent" }
				title={ "Última sesión completa" }
				description={ formatDateLabel( latestProgressDate ) }
			/>
		</>
	);
}
