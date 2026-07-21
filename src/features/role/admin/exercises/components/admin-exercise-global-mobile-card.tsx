"use client";

import type { Key } from "@heroui/react";

import { useState } from "react";

import { Button, Card, Chip, Dropdown, Header, Label } from "@heroui/react";
import { EllipsisVertical, PencilLine } from "lucide-react";

import { AsyncMedia } from "@/components/common";
import { AdminExerciseGlobalDrawer } from "@/features/role/admin/exercises/components/shared/admin-exercise-global-drawer";
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
	const [ isEditOpen, setIsEditOpen ] = useState( false );

	function handleAction( key: Key ) {
		if (key === "edit") {
			setIsEditOpen( true );
		}
	}

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
					<Dropdown>
						<Button
							isIconOnly
							aria-label={ `Opciones de ${ exercise.name }` }
							className={ "size-8 shrink-0 text-foreground" }
							size={ "sm" }
							variant={ "ghost" }
						>
							<EllipsisVertical className={ "size-4" }/>
						</Button>
						<Dropdown.Popover placement={ "bottom end" }>
							<Dropdown.Menu onAction={ handleAction }>
								<Header>Opciones</Header>
								<Dropdown.Item id={ "edit" } textValue={ "Editar ejercicio global" }>
									<PencilLine className={ "size-4 shrink-0 text-warning" }/>
									<Label className={ "text-warning" }>Editar</Label>
								</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown.Popover>
					</Dropdown>
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
			<AdminExerciseGlobalDrawer
				hideTrigger
				exercise={ exercise }
				isOpen={ isEditOpen }
				onOpenChangeAction={ setIsEditOpen }
			/>
		</Card>
	);
}
