import { ArrowsRotateLeft } from "@gravity-ui/icons";
import { Button } from "@heroui/react";

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
		<div className={ "flex flex-col gap-3 rounded-xl border border-border bg-surface px-5 py-4 sm:px-6 lg:flex-row lg:items-start lg:justify-between" }>
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
				<ArrowsRotateLeft className={ isRefreshing ? "size-4 animate-spin" : "size-4" }/>
				{ isRefreshing ? "Actualizando..." : "Actualizar" }
			</Button>
		</div>
	);
}
