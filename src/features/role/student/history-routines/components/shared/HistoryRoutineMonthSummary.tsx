"use client";

import { Card, Chip, Typography } from "@heroui/react";

import type { HistoryRoutineMonthSummary as HistoryRoutineMonthSummaryType } from "@/features/history-routines/services/history-routines-view";

type HistoryRoutineMonthSummaryProps = {
	summary: HistoryRoutineMonthSummaryType;
};

const summaryCards = [
	{
		key: "weeks",
		label: "Semanas activas",
		subtitle: "Con rutina o progreso registrado",
	},
	{
		key: "days",
		label: "Dias con registro",
		subtitle: "Dias entrenados dentro del mes",
	},
	{
		key: "exercises",
		label: "Ejercicios",
		subtitle: "Ejercicios registrados en el periodo",
	},
	{
		key: "sets",
		label: "Series",
		subtitle: "Series totales cargadas",
	},
] as const;

function getStatusLabel( status: HistoryRoutineMonthSummaryType["status"] ) {
	switch (status) {
		case "complete":
			return "Completo";
		case "partial":
			return "Parcial";
		default:
			return "Sin datos";
	}
}

export function HistoryRoutineMonthSummary( { summary }: HistoryRoutineMonthSummaryProps ) {
	return (
		<div className={ "grid gap-3" }>
			<Card className={ "border border-border bg-surface" } variant={ "default" }>
				<Card.Content className={ "flex items-center justify-between gap-3 p-4" }>
					<div className={ "space-y-1" }>
						<Typography className={ "text-sm font-semibold text-foreground" }>Estado del mes</Typography>
						<Typography className={ "text-sm text-muted" }>
							Resumen general de tu progreso mensual.
						</Typography>
					</div>
					<Chip
						color={ summary.status === "complete" ? "success" : summary.status === "partial" ? "warning" : "default" }
						variant={ "soft" }
					>
						{ getStatusLabel( summary.status ) }
					</Chip>
				</Card.Content>
			</Card>

			<div className={ "grid gap-2 grid-cols-[repeat(auto-fit,minmax(12rem,1fr))]" }>
				{ summaryCards.map( ( card ) => (
					<Card key={ card.key } className={ "border border-border bg-surface" } variant={ "default" }>
						<Card.Content className={ "p-3.5" }>
							<div className={ "flex flex-col gap-2.5" }>
								<Chip color={ "accent" } size={ "sm" } variant={ "soft" }>
									{ card.label }
								</Chip>
								<div className={ "space-y-1" }>
									<Typography className={ "text-xl font-black text-foreground" }>
										{ summary[ card.key ] }
									</Typography>
									<Typography className={ "text-sm text-muted" }>
										{ card.subtitle }
									</Typography>
								</div>
							</div>
						</Card.Content>
					</Card>
				) ) }
			</div>
		</div>
	);
}
