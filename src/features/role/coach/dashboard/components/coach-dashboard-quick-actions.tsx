"use client";

import { Button, Card } from "@heroui/react";
import { useRouter } from "next/navigation";
import { Dumbbell, Users } from "lucide-react";

import { COACH_DASHBOARD_QUICK_ACTIONS } from "@/features/role/coach/dashboard/services/coach-dashboard-links";

export function CoachDashboardQuickActions() {
	const router = useRouter();
	const actionIcons = {
		exercises: Dumbbell,
		students: Users,
	} as const;

	return (
		<Card className={ "border border-border py-2" } variant={ "default" }>
			<Card.Content className={ "space-y-4 p-3" }>
				<div className={ "space-y-1" }>
					<p className={ "text-base font-semibold text-foreground" }>Accesos rápidos</p>
					<p className={ "text-sm text-muted" }>Entradas directas a los módulos que más usa el coach.</p>
				</div>
				<div className={ "flex flex-wrap gap-2 xl:flex-nowrap" }>
					{ COACH_DASHBOARD_QUICK_ACTIONS.map( ( action ) => {
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
