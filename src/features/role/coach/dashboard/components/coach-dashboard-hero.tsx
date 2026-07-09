import { Button, Card } from "@heroui/react";
import { RotateCw } from "lucide-react";

import { PageHeader } from "@/components/common";

type CoachDashboardHeroProps = {
	currentPeriodLabel: string;
	isRefreshing: boolean;
	onRefresh: () => void;
};

export function CoachDashboardHero( {
										currentPeriodLabel,
										isRefreshing,
										onRefresh,
									}: CoachDashboardHeroProps ) {
	return (
		<Card className={ "border border-border py-2" } variant={ "default" }>
			<Card.Content className={ "flex flex-col gap-3 p-3 lg:flex-row lg:items-start lg:justify-between" }>
				<PageHeader
					description={ `Vista operativa para revisar pendientes, entrar rapido a cada estudiante y corregir el trabajo de ${ currentPeriodLabel }.` }
					title={ "Dashboard coach" }
				/>
				<div className={ "flex w-full flex-col gap-2 sm:w-auto sm:flex-row" }>
					<Button
						className={ "w-full sm:w-auto" }
						isDisabled={ isRefreshing }
						variant={ "secondary" }
						onPress={ onRefresh }
					>
						<RotateCw className={ isRefreshing ? "size-4 animate-spin" : "size-4" }/>
						{ isRefreshing ? "Actualizando..." : "Actualizar" }
					</Button>
				</div>
			</Card.Content>
		</Card>
	);
}
