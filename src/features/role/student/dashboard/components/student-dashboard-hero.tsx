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
			<Card.Content className={ "flex flex-row items-start justify-between gap-3 p-3" }>
				<PageHeader
					description={ "Tu rutina y tu progreso, de un vistazo." }
					title={ `Hola, ${ studentName }` }
				/>
				{ /* En el telefono queda solo el icono: no le saca un renglon a la proxima sesion. */ }
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
