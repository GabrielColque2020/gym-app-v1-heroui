import { Button, Card } from "@heroui/react";
import { RotateCw } from "lucide-react";

import { PageHeader } from "@/components/common";
import { ExerciseSheet } from "@/features/role/coach/exercises/components/shared/exercise-sheet";

type CoachExercisesPageHeaderProps = {
	isRefreshing: boolean;
	onRefreshAction: () => void;
};

export function CoachExercisesPageHeader( {
											  isRefreshing,
											  onRefreshAction,
										  }: CoachExercisesPageHeaderProps ) {
	return (
		<Card.Header className={ "flex flex-col gap-3 border-b border-border p-3 sm:flex-row sm:items-center sm:justify-between " }>
			<PageHeader
				title={ "Ejercicios" }
				description={ "Listado de ejercicios con estado, grupo muscular y fecha de alta." }
			/>
			<div className={ "flex w-full flex-col gap-2 md:hidden" }>
				<Button
					className={ "w-full" }
					isDisabled={ isRefreshing }
					variant={ "secondary" }
					onPress={ onRefreshAction }
				>
					<RotateCw className={ isRefreshing ? "size-4 animate-spin" : "size-4" }/>
					{ isRefreshing ? "Actualizando..." : "Actualizar" }
				</Button>
				<ExerciseSheet
					mode={ "create" }
					placement={ "bottom" }
					triggerClassName={ "w-full bg-accent text-accent-foreground" }
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
				<ExerciseSheet
					mode={ "create" }
					placement={ "right" }
					triggerClassName={ "bg-accent text-accent-foreground" }
				/>
			</div>
		</Card.Header>
	);
}
