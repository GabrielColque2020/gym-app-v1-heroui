"use client";

import { Card, Chip, Typography } from "@heroui/react";

import type { HistoryRoutineMonthSummary, HistoryRoutineWeekGroup } from "@/features/history-routines/services/history-routines-view";
import { HistoryRoutineWeeksAccordion } from "@/features/role/coach/history-routines/components/desktop/history-routine-weeks-accordion";
import { HistoryRoutineWeeksSelector } from "@/features/role/coach/history-routines/components/desktop/history-routine-weeks-selector";

type CoachHistoryRoutinesDesktopContentProps = {
	monthLabel: string;
	summary: HistoryRoutineMonthSummary;
	selectedWeekGroups: HistoryRoutineWeekGroup[];
	selectedWeeks: number[];
	weekGroups: HistoryRoutineWeekGroup[];
	onWeekToggle: ( week: number ) => void;
};

export function CoachHistoryRoutinesDesktopContent( {
														monthLabel,
														summary,
														selectedWeekGroups,
														selectedWeeks,
														weekGroups,
														onWeekToggle,
													}: CoachHistoryRoutinesDesktopContentProps ) {
	return (
		<div className={ "flex flex-col gap-4" }>
			<div className={ "grid gap-3 grid-cols-[repeat(auto-fit,minmax(16rem,1fr))]" }>
				<Card className={ "border border-border bg-surface" } variant={ "default" }>
					<Card.Content className={ "p-4" }>
						<div className={ "space-y-1" }>
							<Typography className={ "text-sm font-semibold text-foreground" }>Vision mensual</Typography>
							<Typography className={ "text-sm text-muted" }>
								{ `Resumen del mes seleccionado: ${ monthLabel }. Usa las semanas para bajar al detalle.` }
							</Typography>
						</div>
					</Card.Content>
				</Card>

				<Card className={ "border border-border bg-surface" } variant={ "default" }>
					<Card.Content className={ "p-4" }>
						<Typography className={ "text-sm font-semibold text-foreground" }>Exploracion</Typography>
						<Typography className={ "mt-1 text-sm text-muted" }>
							Selecciona una o varias semanas para comparar el avance sin perder contexto.
						</Typography>
					</Card.Content>
				</Card>

				<Card className={ "border border-border bg-surface" } variant={ "default" }>
					<Card.Content className={ "p-4" }>
						<Typography className={ "text-sm font-semibold text-foreground" }>Estado del mes</Typography>
						<Typography className={ "mt-1 text-sm text-muted" }>
							Resumen general del progreso mensual del estudiante.
						</Typography>
						<div className={ "mt-3" }>
							{ summary.status === "complete" ? (
								<div className={ "inline-flex" }>
									<Chip color={ "success" } variant={ "soft" }>Completo</Chip>
								</div>
							) : summary.status === "partial" ? (
								<div className={ "inline-flex" }>
									<Chip color={ "warning" } variant={ "soft" }>Parcial</Chip>
								</div>
							) : (
								<div className={ "inline-flex" }>
									<Chip variant={ "soft" }>Sin datos</Chip>
								</div>
							) }
						</div>
					</Card.Content>
				</Card>
			</div>


			<Card className={ "border border-border bg-surface" } variant={ "default" }>
				<Card.Content className={ "p-4" }>
					<HistoryRoutineWeeksSelector
						weeks={ weekGroups }
						selectedWeeks={ selectedWeeks }
						onWeekToggle={ onWeekToggle }
					/>
				</Card.Content>
			</Card>

			<HistoryRoutineWeeksAccordion weeks={ selectedWeekGroups }/>
		</div>
	);
}
