"use client";

import { Calendar, CircleFill, Gear } from "@gravity-ui/icons";
import { Button, Card } from "@heroui/react";
import { useRouter } from "next/navigation";

import { STUDENT_DASHBOARD_QUICK_ACTIONS } from "@/features/role/student/dashboard/services/student-dashboard-links";

export function StudentDashboardQuickActions() {
	const router = useRouter();
	const actionIcons = {
		"history-routines": Calendar,
		"meal-plans": CircleFill,
		"training-routine": Gear,
	} as const;

	return (
		<Card className={ "border border-border bg-surface" } variant={ "default" }>
			<Card.Content className={ "space-y-4 px-5 py-4 sm:px-6" }>
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
