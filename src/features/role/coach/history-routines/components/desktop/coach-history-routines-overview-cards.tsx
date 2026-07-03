"use client";

import { Card, Chip, Typography } from "@heroui/react";

import type { HistoryRoutineMonthSummary } from "@/features/history-routines/services/history-routines-view";

type CoachHistoryRoutinesOverviewCardsProps = {
	monthLabel: string;
	summary: HistoryRoutineMonthSummary;
};

function getSummaryStatusLabel( status: HistoryRoutineMonthSummary["status"] ) {
	switch (status) {
		case "complete":
			return "Completo";
		case "partial":
			return "Parcial";
		default:
			return "Sin datos";
	}
}

export function CoachHistoryRoutinesOverviewCards( {
	monthLabel,
	summary,
}: CoachHistoryRoutinesOverviewCardsProps ) {
	return (
		<div className={ "grid gap-3 grid-cols-[repeat(auto-fit,minmax(16rem,1fr))]" }>
			<Card className={ "border border-border bg-surface" } variant={ "default" }>
				<Card.Content className={ "p-4" }>
					<div className={ "space-y-1" }>
						<Typography className={ "text-sm font-semibold text-foreground" }>
							Vision mensual
						</Typography>
						<Typography className={ "text-sm text-muted" }>
							{ `Resumen del mes seleccionado: ${ monthLabel }. Usa las semanas para bajar al detalle.` }
						</Typography>
					</div>
				</Card.Content>
			</Card>

			<Card className={ "border border-border bg-surface" } variant={ "default" }>
				<Card.Content className={ "p-4" }>
					<Typography className={ "text-sm font-semibold text-foreground" }>
						Exploracion
					</Typography>
					<Typography className={ "mt-1 text-sm text-muted" }>
						Selecciona una o varias semanas para comparar el avance sin perder contexto.
					</Typography>
				</Card.Content>
			</Card>

			<Card className={ "border border-border bg-surface" } variant={ "default" }>
				<Card.Content className={ "p-4" }>
					<Typography className={ "text-sm font-semibold text-foreground" }>
						Estado del mes
					</Typography>
					<Typography className={ "mt-1 text-sm text-muted" }>
						Resumen general del progreso mensual del estudiante.
					</Typography>
					<div className={ "mt-3" }>
						<div className={ "inline-flex" }>
							<Chip
								color={
									summary.status === "complete"
										? "success"
										: summary.status === "partial"
											? "warning"
											: "default"
								}
								variant={ "soft" }
							>
								{ getSummaryStatusLabel( summary.status ) }
							</Chip>
						</div>
					</div>
				</Card.Content>
			</Card>
		</div>
	);
}
