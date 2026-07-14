"use client";

import type { CoachTrainingRoutine } from "@/features/role/coach/training-routine/actions/get-training-routines-by-student";
import { Description, Typography } from "@heroui/react";
import { CoachOptionRoutineDrawer } from "@/features/role/coach/training-routine/components/shared/coach-option-routine-drawer";
import { CoachTrainingRoutineDaysAccordion } from "@/features/role/coach/training-routine/components/shared/coach-training-routine-days-accordion";

type CoachTrainingRoutineSelectedRoutinePanelMobileProps = {
	month: number;
	routineObjective: string | null;
	routineWeeks: CoachTrainingRoutine[];
	selectedRoutine: CoachTrainingRoutine | null;
	studentId: string;
	studentName: string;
	year: number;
};

export function CoachTrainingRoutineSelectedRoutinePanelMobile( {
	month,
	routineObjective,
	routineWeeks,
	selectedRoutine,
	studentId,
	studentName,
	year,
}: CoachTrainingRoutineSelectedRoutinePanelMobileProps ) {
	return (
		<div className={ "grid gap-2 pt-4" }>
			<div className={ "flex items-center justify-between gap-3" }>
				<div className={ "min-w-0" }>
					<Typography className={ "truncate text-sm font-semibold" }>
						{ selectedRoutine
							? `Semana ${ selectedRoutine.week }`
							: "Sin semana seleccionada" }
					</Typography>
					<Description className={ "truncate text-xs" }>
						{ selectedRoutine?.name || "Dias de entrenamiento" }
					</Description>
				</div>
				{ routineWeeks.length > 0 ? (
					<CoachOptionRoutineDrawer
						month={ month }
						routineObjective={ routineObjective }
						routineWeeks={ routineWeeks }
						studentId={ studentId }
						studentName={ studentName }
						year={ year }
					/>
				) : null }
			</div>
			<CoachTrainingRoutineDaysAccordion
				days={ selectedRoutine?.routineDays ?? [] }
				month={ month }
				studentId={ studentId }
				year={ year }
			/>
		</div>
	);
}
