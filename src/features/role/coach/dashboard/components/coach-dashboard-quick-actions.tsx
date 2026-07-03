"use client";

import { Button, Card } from "@heroui/react";
import { useRouter } from "next/navigation";
import { CalendarClock, Clock3, Dumbbell, UtensilsCrossed, Users } from "lucide-react";

import { COACH_DASHBOARD_QUICK_ACTIONS } from "@/features/role/coach/dashboard/services/coach-dashboard-links";

export function CoachDashboardQuickActions() {
	const router = useRouter();
	const actionIcons = {
		exercises: Dumbbell,
		"history-routines": Clock3,
		"meal-plans": UtensilsCrossed,
		students: Users,
		"training-routines": CalendarClock,
	} as const;

	return (
		<Card className={ "border border-border bg-surface" } variant={ "default" }>
			<Card.Content className={ "space-y-4 px-5 py-4 sm:px-6" }>
				<div className={ "space-y-1" }>
					<p className={ "text-base font-semibold text-foreground" }>Accesos rapidos</p>
					<p className={ "text-sm text-muted" }>Entradas directas a los modulos que mas usa el coach.</p>
				</div>
				<div className={ "flex flex-wrap gap-2 xl:flex-nowrap" }>
					{ COACH_DASHBOARD_QUICK_ACTIONS.map( ( action ) => {
						const Icon = actionIcons[ action.id ];

						return (
							<Button
								key={ action.id }
								aria-label={ action.label }
								className={ "h-10 shrink-0 px-3 xl:flex-1" }
								variant={ "secondary" }
								onPress={ () => router.push( action.href ) }
							>
								<Icon className={ "size-4" }/>
								<span className={ "truncate text-sm font-medium" }>{ action.compactLabel }</span>
							</Button>
						);
					} ) }
				</div>
			</Card.Content>
		</Card>
	);
}
