"use client";

import { Button, Chip, Description, Drawer } from "@heroui/react";
import { PencilLine } from "lucide-react";

import { AsyncMedia } from "@/components/common";
import { formatBodyPart } from "@/features/exercises/services/exercise-formatters";
import { formatCoachExerciseSource } from "@/features/role/coach/exercises/services/coach-exercise-formatters";
import type { CoachExerciseListItem } from "@/features/role/coach/exercises/types/coach-exercise-list-item";
import { FeatureDrawerLayout } from "@/features/shared/components/feature-drawer-layout";
import { useResponsiveDrawerPlacement } from "@/features/shared/hooks/use-responsive-drawer-placement";

type ExerciseDetailDrawerProps = {
	exercise: CoachExerciseListItem;
	isOpen: boolean;
	onEditAction: () => void;
	onOpenChangeAction: ( isOpen: boolean ) => void;
};

// Ficha del ejercicio para mirarlo sin entrar a editarlo: como se hace, que
// trabaja y con que. Es solo lectura, asi que se cierra tocando afuera.
export function ExerciseDetailDrawer( {
	exercise,
	isOpen,
	onEditAction,
	onOpenChangeAction,
}: ExerciseDetailDrawerProps ) {
	const placement = useResponsiveDrawerPlacement();
	const details = [
		{ label: "Equipamiento", value: exercise.equipment },
		{ label: "Músculo objetivo", value: exercise.target },
		{ label: "Músculo secundario", value: exercise.muscleGroup },
	].filter( ( detail ) => detail.value.trim().length > 0 );
	const instructions = exercise.instructions?.trim() ?? "";

	return (
		<FeatureDrawerLayout
			isDismissable
			isOpen={ isOpen }
			placement={ placement }
			rightContentClassName={ "w-[34rem]" }
			onOpenChangeAction={ onOpenChangeAction }
		>
			<Drawer.Header className={ "border-default-100 relative border-b pb-4" }>
				<div className={ "min-w-0 pe-10" }>
					<Drawer.Heading>{ exercise.name }</Drawer.Heading>
					<Description className={ "mt-1 text-sm" }>
						{ formatBodyPart( exercise.bodyPart ) } · { formatCoachExerciseSource( exercise ) }
					</Description>
				</div>
			</Drawer.Header>

			{ /* Solo se monta abierto: asi la lista no descarga el video de cada fila. */ }
			{ isOpen ? (
				<Drawer.Body className={ "min-h-0 flex-1 space-y-4 overflow-y-auto py-3" }>
					<AsyncMedia
						alt={ `Cómo se hace ${ exercise.name }` }
						className={ "h-64 w-full rounded-2xl border border-border" }
						emptyLabel={ "Este ejercicio no tiene imagen ni video." }
						spinnerLabel={ `Cargando ${ exercise.name }` }
						src={ exercise.videoUrl?.trim() || exercise.imageUrl }
					/>

					{ !exercise.active ? (
						<Chip color={ "danger" } size={ "sm" } variant={ "soft" }>
							Inactivo: no aparece al armar rutinas
						</Chip>
					) : null }

					{ details.length > 0 ? (
						<dl className={ "grid gap-2 text-sm" }>
							{ details.map( ( detail ) => (
								<div key={ detail.label } className={ "flex items-baseline justify-between gap-3" }>
									<dt className={ "text-muted" }>{ detail.label }</dt>
									<dd className={ "text-right font-medium text-foreground" }>{ detail.value }</dd>
								</div>
							) ) }
						</dl>
					) : null }

					<div className={ "space-y-1" }>
						<p className={ "text-sm font-semibold text-foreground" }>Instrucciones</p>
						<p className={ "whitespace-pre-line text-sm text-muted" }>
							{ instructions || "Todavía no tiene instrucciones cargadas." }
						</p>
					</div>
				</Drawer.Body>
			) : null }

			<Drawer.Footer className={ "border-default-100 shrink-0 justify-end gap-2 border-t pt-4" }>
				<Button slot={ "close" } variant={ "secondary" }>
					Cerrar
				</Button>
				<Button onPress={ onEditAction }>
					<PencilLine className={ "size-4" }/>
					Editar
				</Button>
			</Drawer.Footer>
		</FeatureDrawerLayout>
	);
}
