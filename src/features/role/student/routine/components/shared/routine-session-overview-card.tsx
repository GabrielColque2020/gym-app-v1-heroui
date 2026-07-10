import type { ReactNode } from "react";
import { Card } from "@heroui/react";

type RoutineSessionOverviewCardProps = {
	description: string;
	icon: ReactNode;
	iconClassName: string;
	title: string;
};

export function RoutineSessionOverviewCard( {
												description,
												icon,
												iconClassName,
												title,
											}: RoutineSessionOverviewCardProps ) {
	return (
		<Card className={ "border border-border py-2 shadow-sm" } variant={ "default" }>
			<Card.Content className={ "flex h-full items-start justify-center p-3" }>
				<div className={ "flex items-center gap-3" }>
					<div className={ iconClassName }>
						{ icon }
					</div>
					<div className={ "min-w-0" }>
						<p className={ "text-sm font-semibold text-foreground" }>{ title }</p>
						<p className={ "text-sm text-muted" }>{ description }</p>
					</div>
				</div>
			</Card.Content>
		</Card>
	);
}

