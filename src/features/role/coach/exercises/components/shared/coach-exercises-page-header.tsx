import { Button, Card } from "@heroui/react";
import { RotateCw } from "lucide-react";

import { PageHeader } from "@/components/common";
import { ExerciseDrawer } from "@/features/role/coach/exercises/components/shared/exercise-drawer";

type CoachExercisesPageHeaderProps = {
	isRefreshing: boolean;
	onRefreshAction: () => void;
};

export function CoachExercisesPageHeader( {
	isRefreshing,
	onRefreshAction,
}: CoachExercisesPageHeaderProps ) {
	return (
		<Card.Header className={ "flex flex-row items-start justify-between gap-3 border-b border-border p-3 sm:items-center" }>
			<div className={ "min-w-0" }>
				<PageHeader
					title={ "Ejercicios" }
					description={ "Los del catálogo general y los que creaste vos." }
				/>
			</div>
			{ /* En el telefono las dos acciones van como iconos junto al titulo, para
			     que la lista empiece mas arriba. */ }
			<div className={ "flex shrink-0 items-center gap-2 md:hidden" }>
				<Button
					isIconOnly
					aria-label={ isRefreshing ? "Actualizando" : "Actualizar" }
					isDisabled={ isRefreshing }
					variant={ "secondary" }
					onPress={ onRefreshAction }
				>
					<RotateCw className={ isRefreshing ? "size-4 animate-spin" : "size-4" }/>
				</Button>
				<ExerciseDrawer
					mode={ "create" }
					placement={ "bottom" }
					triggerClassName={ "bg-accent text-accent-foreground" }
					triggerVariant={ "icon" }
				/>
			</div>
			<div className={ "hidden items-center gap-2 md:flex" }>
				<Button
					isDisabled={ isRefreshing }
					variant={ "secondary" }
					onPress={ onRefreshAction }
				>
					<RotateCw className={ isRefreshing ? "size-4 animate-spin" : "size-4" }/>
					{ isRefreshing ? "Actualizando..." : "Actualizar" }
				</Button>
				<ExerciseDrawer
					mode={ "create" }
					placement={ "right" }
					triggerClassName={ "bg-accent text-accent-foreground" }
				/>
			</div>
		</Card.Header>
	);
}
