"use client";

import type { CoachTrainingRoutine } from "@/features/role/coach/training-routine/actions/get-training-routines-by-student";
import { Card } from "@heroui/react";
import { useTrainingRoutineSelection } from "@/features/training-routine/hooks/use-training-routine-selection";
import { CoachTrainingRoutineCardMobileHeader } from "@/features/role/coach/training-routine/components/mobile/coach-training-routine-card-mobile-header";
import { CoachTrainingRoutineSelectedRoutinePanelMobile } from "@/features/role/coach/training-routine/components/mobile/coach-training-routine-selected-routine-panel-mobile";
import { CoachTrainingRoutineWeekSelectorMobile } from "@/features/role/coach/training-routine/components/mobile/coach-training-routine-week-selector-mobile";

type CoachTrainingRoutineCardMobileProps = {
	month: number;
	routines: CoachTrainingRoutine[];
	studentId: string;
	year: number;
};

export function CoachTrainingRoutineCardMobile( {
	month,
	routines,
	studentId,
	year,
}: CoachTrainingRoutineCardMobileProps ) {
	const { selectedRoutine, selectedRoutineId, setSelectedRoutineId } =
		useTrainingRoutineSelection( routines );

	return (
		<Card className={ "w-full overflow-hidden" }>
			<CoachTrainingRoutineCardMobileHeader routineCount={ routines.length }/>
			<Card.Content className={ "flex flex-col gap-4 pb-4" }>
				<CoachTrainingRoutineWeekSelectorMobile
					onSelectedRoutineIdChange={ setSelectedRoutineId }
					routines={ routines }
					selectedRoutineId={ selectedRoutineId }
				/>
				<CoachTrainingRoutineSelectedRoutinePanelMobile
					month={ month }
					selectedRoutine={ selectedRoutine }
					studentId={ studentId }
					year={ year }
				/>
			</Card.Content>
		</Card>
	);
}
