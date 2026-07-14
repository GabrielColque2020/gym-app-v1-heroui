"use client";

import type { CoachTrainingRoutine } from "@/features/role/coach/training-routine/actions/get-training-routines-by-student";
import { Card } from "@heroui/react";
import { useTrainingRoutineSelection } from "@/features/training-routine/hooks/use-training-routine-selection";
import { CoachTrainingRoutineCardMobileHeader } from "@/features/role/coach/training-routine/components/mobile/coach-training-routine-card-mobile-header";
import { CoachTrainingRoutineSelectedRoutinePanelMobile } from "@/features/role/coach/training-routine/components/mobile/coach-training-routine-selected-routine-panel-mobile";
import { CoachTrainingRoutineWeekSelectorMobile } from "@/features/role/coach/training-routine/components/mobile/coach-training-routine-week-selector-mobile";

type CoachTrainingRoutineCardMobileProps = {
	month: number;
	routineObjective: string | null;
	routineWeeks: CoachTrainingRoutine[];
	studentId: string;
	studentName: string;
	year: number;
};

export function CoachTrainingRoutineCardMobile( {
	month,
	routineObjective,
	routineWeeks,
	studentId,
	studentName,
	year,
}: CoachTrainingRoutineCardMobileProps ) {
	const { selectedRoutine, selectedRoutineId, setSelectedRoutineId } =
		useTrainingRoutineSelection( routineWeeks );

	return (
		<Card className={ "w-full overflow-hidden" }>
			<CoachTrainingRoutineCardMobileHeader routineCount={ routineWeeks.length }/>
			<Card.Content className={ "flex flex-col gap-4 pb-4" }>
				<CoachTrainingRoutineWeekSelectorMobile
					onSelectedRoutineIdChangeAction={ setSelectedRoutineId }
					routineWeeks={ routineWeeks }
					selectedRoutineId={ selectedRoutineId }
				/>
				<CoachTrainingRoutineSelectedRoutinePanelMobile
					month={ month }
					routineObjective={ routineObjective }
					routineWeeks={ routineWeeks }
					selectedRoutine={ selectedRoutine }
					studentId={ studentId }
					studentName={ studentName }
					year={ year }
				/>
			</Card.Content>
		</Card>
	);
}
