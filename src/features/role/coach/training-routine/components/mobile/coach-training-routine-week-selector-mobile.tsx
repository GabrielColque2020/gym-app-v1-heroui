"use client";

import type { CoachTrainingRoutine } from "@/features/role/coach/training-routine/actions/get-training-routines-by-student";
import { Description, Label, ScrollShadow } from "@heroui/react";
import { RadioButtonGroup } from "@heroui-pro/react";

type CoachTrainingRoutineWeekSelectorMobileProps = {
	onSelectedRoutineIdChangeAction: ( routineId: string ) => void;
	routines: CoachTrainingRoutine[];
	selectedRoutineId: string;
};

export function CoachTrainingRoutineWeekSelectorMobile( {
	onSelectedRoutineIdChangeAction,
	routines,
	selectedRoutineId,
}: CoachTrainingRoutineWeekSelectorMobileProps ) {
	return (
		<div className={ "grid gap-2" }>
			<div className={ "flex items-center justify-between gap-3" }>
				<Label className={ "text-sm font-semibold" }>Semana</Label>
			</div>
			<ScrollShadow hideScrollBar orientation={ "horizontal" }>
				<RadioButtonGroup
					className={
						"flex w-full gap-2 [--radio-button-group-item-radius:0.75rem] px-0.5 py-1"
					}
					name={ "routine-week-mobile" }
					value={ selectedRoutineId }
					variant={ "secondary" }
					onChange={ ( value ) => onSelectedRoutineIdChangeAction( value as string ) }
				>
					<div className={ "grid grid-cols-2 gap-2" }>
						{ routines.map( ( routine ) => (
							<RadioButtonGroup.Item
								key={ routine.id }
								className={ "w-full gap-2 px-3 py-2.5" }
								value={ routine.id }
							>
								<RadioButtonGroup.Indicator/>
								<RadioButtonGroup.ItemContent>
									<Label className={ "text-sm" }>
										Semana { routine.week }
									</Label>
									<Description className={ "text-xs" }>
										{ routine.routineDays.length } dias
									</Description>
								</RadioButtonGroup.ItemContent>
							</RadioButtonGroup.Item>
						) ) }
					</div>
				</RadioButtonGroup>
			</ScrollShadow>
		</div>
	);
}
