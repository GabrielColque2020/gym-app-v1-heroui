"use client";

import type { CoachTrainingRoutine } from "@/features/role/coach/training-routine/actions/get-training-routines-by-student";
import { Card, Chip, Description, Label, ScrollShadow } from "@heroui/react";
import { RadioButtonGroup } from "@heroui-pro/react";

import { useTrainingRoutineSelection } from "@/features/training-routine/hooks/use-training-routine-selection";
import { CoachTrainingRoutineDaysAccordion } from "@/features/role/coach/training-routine/components/shared/coach-training-routine-days-accordion";

type CoachTrainingRoutineCardDesktopProps = {
	month: number;
	routineWeeks: CoachTrainingRoutine[];
	studentId: string;
	year: number;
};

export function CoachTrainingRoutineCardDesktop( {
													 month,
													 routineWeeks,
													 studentId,
													 year,
												 }: CoachTrainingRoutineCardDesktopProps ) {
	const { selectedRoutine, selectedRoutineId, setSelectedRoutineId } =
		useTrainingRoutineSelection( routineWeeks );

	return (
		<div className={ "grid w-full grid-cols-12 items-start gap-4" }>
			<Card className={ "col-span-4 w-full self-start overflow-hidden" }>
				<Card.Header className={ "gap-3 pt-3 px-3" }>
					<Card.Content className={ "min-w-0" }>
						<Card.Title className={ "text-base font-semibold" }>
							Rutina del mes
						</Card.Title>
						<Card.Description className={ "text-sm" }>
							Gestiona semanas y dias
						</Card.Description>
						<Chip
							className={ "w-fit shrink-0 px-2" }
							color={ "accent" }
							size={ "sm" }
							variant={ "soft" }
						>
							{ routineWeeks.length } semanas
						</Chip>
					</Card.Content>
				</Card.Header>
				<Card.Content className={ "grid gap-3 pb-3 px-3" }>
					<div className={ "flex items-center justify-between gap-3" }>
						<Label className={ "text-sm font-semibold" }>Semana</Label>
					</div>
					<ScrollShadow className={ "max-h-105 pr-1" }>
						<RadioButtonGroup
							className={
								"grid gap-2 [--radio-button-group-item-radius:0.75rem] px-0.5 py-1"
							}
							name={ "routine-week-desktop" }
							value={ selectedRoutineId }
							variant={ "secondary" }
							onChange={ ( value ) => setSelectedRoutineId( value as string ) }
						>
							{ routineWeeks.map( ( routineWeek ) => (
								<RadioButtonGroup.Item
									key={ routineWeek.id }
									className={ "w-full gap-2 px-3 py-2.5" }
									value={ routineWeek.id }
								>
									<RadioButtonGroup.Indicator/>
									<RadioButtonGroup.ItemContent>
										<Label className={ "text-sm" }>
											Semana { routineWeek.week }
										</Label>
										<Description className={ "text-xs" }>
											{ routineWeek.routineDays.length } dias
										</Description>
									</RadioButtonGroup.ItemContent>
								</RadioButtonGroup.Item>
							) ) }
						</RadioButtonGroup>
					</ScrollShadow>
				</Card.Content>
			</Card>
			<Card className={ "col-span-8 w-full overflow-hidden" }>
				<Card.Header className={ "gap-3 pt-3 px-3" }>
					<div className={ "flex w-full items-center justify-between gap-3" }>
						<div className={ "flex min-w-0 flex-col gap-1" }>
							<Card.Title className={ "truncate text-base font-semibold" }>
								{ selectedRoutine
									? `Semana ${ selectedRoutine.week }`
									: "Sin semana seleccionada" }
							</Card.Title>
							<Card.Description className={ "text-sm" }>
								{ selectedRoutine?.name || "Dias de entrenamiento" }
							</Card.Description>
						</div>
					</div>
				</Card.Header>
				<Card.Content className={ "px-3 pb-3" }>
					<CoachTrainingRoutineDaysAccordion
						days={ selectedRoutine?.routineDays ?? [] }
						exerciseGridClassName={
							"grid grid-cols-2 gap-x-8 gap-y-2 p-3"
						}
						month={ month }
						studentId={ studentId }
						year={ year }
					/>
				</Card.Content>
			</Card>
		</div>
	);
}
