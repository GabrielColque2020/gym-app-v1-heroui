import { Button, Card } from "@heroui/react";
import { RotateCw } from "lucide-react";

import { PageHeader } from "@/components/common";

type StudentDashboardHeroProps = {
	isRefreshing: boolean;
	onRefresh: () => void;
	studentName: string;
};

export function StudentDashboardHero( {
										  isRefreshing,
										  onRefresh,
										  studentName,
									  }: StudentDashboardHeroProps ) {
	return (
		<Card className={ "border border-border py-2" } variant={ "default" }>
			<Card.Content className={ "flex flex-col gap-3 p-3 lg:flex-row lg:items-start lg:justify-between" }>
				<PageHeader
					description={ "Revisa tu rutina actual, tus accesos principales y el estado de tu progreso reciente." }
					title={ `Hola, ${ studentName }` }
				/>
				<Button
					className={ "w-full sm:w-auto" }
					isDisabled={ isRefreshing }
					variant={ "secondary" }
					onPress={ onRefresh }
				>
					<RotateCw className={ isRefreshing ? "size-4 animate-spin" : "size-4" }/>
					{ isRefreshing ? "Actualizando..." : "Actualizar" }
				</Button>
			</Card.Content>
		</Card>
	);
}
