"use client";

import { Button, Card } from "@heroui/react";
import { useRouter } from "next/navigation";
import { CalendarClock, Dumbbell, UtensilsCrossed } from "lucide-react";

import { STUDENT_DASHBOARD_QUICK_ACTIONS } from "@/features/role/student/dashboard/services/student-dashboard-links";

export function StudentDashboardQuickActions() {
	const router = useRouter();
	const actionIcons = {
		"history-routines": CalendarClock,
		"meal-plans": UtensilsCrossed,
		"training-routine": Dumbbell,
	} as const;

	return (
		<Card className={ "border border-border py-2" } variant={ "default" }>
			<Card.Content className={ "space-y-4 p-3" }>
				<div className={ "space-y-1" }>
					<p className={ "text-base font-semibold text-foreground" }>Accesos rapidos</p>
					<p className={ "text-sm text-muted" }>Entradas directas a tus modulos principales.</p>
				</div>
				<div className={ "flex flex-wrap gap-2 xl:flex-nowrap" }>
					{ STUDENT_DASHBOARD_QUICK_ACTIONS.map( ( action ) => {
						const Icon = actionIcons[ action.id ];

						return (
							<Button
								key={ action.id }
								aria-label={ action.label }
								className={ "h-10 shrink-0 px-3 flex-1" }
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
