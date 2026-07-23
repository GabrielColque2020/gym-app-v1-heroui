"use client";

import { Card, Chip } from "@heroui/react";

import { AsyncMedia } from "@/components/common";
import { AdminExerciseGlobalActionMenu } from "@/features/role/admin/exercises/components/admin-exercise-global-action-menu";
import type { AdminExerciseGlobalListItem } from "@/features/role/admin/exercises/types/admin-exercise-global-list-item";

type AdminExerciseGlobalMobileCardProps = {
	exercise: AdminExerciseGlobalListItem;
};

function getStatusLabel( exercise: AdminExerciseGlobalListItem ) {
	return exercise.active ? "Activo" : "Inactivo";
}

export function AdminExerciseGlobalMobileCard( {
	exercise,
}: AdminExerciseGlobalMobileCardProps ) {
	return (
		<Card className={ "border border-border" } variant={ "default" }>
			<Card.Content className={ "space-y-3 py-2 pl-2" }>
				<div className={ "flex items-start justify-between gap-3" }>
					<div className={ "flex min-w-0 items-center gap-3" }>
						<AsyncMedia
							alt={ `Imagen de ${ exercise.name }` }
							className={ "size-16 shrink-0 rounded-2xl border border-border" }
							emptyLabel={ "Sin imagen" }
							spinnerLabel={ `Cargando imagen de ${ exercise.name }` }
							src={ exercise.imageUrl }
						/>
						<div className={ "min-w-0 space-y-1" }>
							<p className={ "truncate font-semibold text-foreground" }>{ exercise.name }</p>
						</div>
					</div>
					<AdminExerciseGlobalActionMenu exercise={ exercise }/>
				</div>

				<div className={ "flex flex-wrap gap-2" }>
					<Chip size={ "sm" } variant={ "soft" }>{ exercise.category }</Chip>
					<Chip size={ "sm" } variant={ "soft" }>{ exercise.target }</Chip>
					<Chip color={ exercise.active ? "success" : "danger" } size={ "sm" } variant={ "soft" }>
						{ getStatusLabel( exercise ) }
					</Chip>
				</div>

				<div className={ "grid gap-2 text-sm text-muted" }>
					<div className={ "flex items-center gap-2" }>
						<span className={ "truncate font-medium text-foreground/80" }>Equipamiento</span>
						<span className={ "truncate" }>{ exercise.equipment }</span>
					</div>
				</div>
			</Card.Content>
		</Card>
	);
}
