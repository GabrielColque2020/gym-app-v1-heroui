import { Card } from "@heroui/react";

type QuickStatItem = {
	description: string;
	label: string;
	value: string | number;
};

type StudentDashboardQuickStatsProps = {
	items: QuickStatItem[];
};

export function StudentDashboardQuickStats( { items }: StudentDashboardQuickStatsProps ) {
	return (
		<div className={ "grid gap-3 sm:grid-cols-2 xl:grid-cols-4" }>
			{ items.map( ( item ) => (
				<Card key={ item.label } className={ "border border-border bg-surface" } variant={ "default" }>
					<Card.Content className={ "space-y-2 px-4 py-3" }>
						<p className={ "text-xs font-medium leading-snug text-muted sm:text-sm" }>{ item.label }</p>
						<p className={ "text-2xl font-black leading-none text-foreground sm:text-3xl" }>{ item.value }</p>
						<p className={ "text-xs leading-snug text-muted sm:text-sm" }>{ item.description }</p>
					</Card.Content>
				</Card>
			) ) }
		</div>
	);
}
