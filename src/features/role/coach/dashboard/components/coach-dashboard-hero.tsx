import { Button, Card } from "@heroui/react";
import { RotateCw } from "lucide-react";

import { PageHeader } from "@/components/common";

type CoachDashboardHeroProps = {
	isRefreshing: boolean;
	onRefresh: () => void;
};

export function CoachDashboardHero( {
										isRefreshing,
										onRefresh,
									}: CoachDashboardHeroProps ) {
	return (
		<Card className={ "border border-border py-2" } variant={ "default" }>
			<Card.Content className={ "flex flex-row items-start justify-between gap-3 p-3" }>
				<PageHeader
					description={ "Lo pendiente de tus estudiantes y el acceso a cada uno." }
					title={ "Inicio" }
				/>
				<Button
					aria-label={ "Actualizar" }
					className={ "shrink-0" }
					isDisabled={ isRefreshing }
					variant={ "secondary" }
					onPress={ onRefresh }
				>
					<RotateCw className={ isRefreshing ? "size-4 animate-spin" : "size-4" }/>
					<span className={ "hidden sm:inline" }>{ isRefreshing ? "Actualizando..." : "Actualizar" }</span>
				</Button>
			</Card.Content>
		</Card>
	);
}
