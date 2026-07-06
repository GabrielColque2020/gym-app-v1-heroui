import { Button, Card } from "@heroui/react";
import { RotateCcw } from "lucide-react";

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
		<Card className={ "flex flex-col gap-3 border border-border px-5 py-4 sm:px-6 lg:flex-row lg:items-start lg:justify-between" }>
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
				<RotateCcw className={ isRefreshing ? "size-4 animate-spin" : "size-4" }/>
				{ isRefreshing ? "Actualizando..." : "Actualizar" }
			</Button>
		</Card>
	);
}
