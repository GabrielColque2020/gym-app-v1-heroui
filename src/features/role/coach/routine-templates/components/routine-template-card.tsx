"use client";

import type { RoutineTemplateListItem } from "@/features/training-routine/services/routine-template";

import Link from "next/link";
import { Button, Dropdown, Label, toast } from "@heroui/react";
import { Copy, MoreVertical, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";

import { RoutineTemplateDeleteModal } from "@/features/role/coach/routine-templates/components/routine-template-delete-modal";
import { RoutineTemplateRenameModal } from "@/features/role/coach/routine-templates/components/routine-template-rename-modal";
import { buildRoutineTemplateHref } from "@/features/role/coach/routine/views/edit-routine-day-page-content.utils";
import { useDuplicateRoutineTemplate } from "@/features/role/coach/training-routine/hooks/use-routine-templates";

type RoutineTemplateCardProps = {
	template: RoutineTemplateListItem;
};

function pluralize( count: number, singular: string, plural: string ) {
	return `${ count } ${ count === 1 ? singular : plural }`;
}

export function RoutineTemplateCard( { template }: RoutineTemplateCardProps ) {
	const [ isRenameOpen, setIsRenameOpen ] = useState( false );
	const [ isDeleteOpen, setIsDeleteOpen ] = useState( false );
	const duplicateTemplate = useDuplicateRoutineTemplate();

	async function handleDuplicate() {
		try {
			const result = await duplicateTemplate.mutateAsync( template.id );

			if (result.ok) {
				toast.success( "Plantilla duplicada", { description: `La copia se llama "${ result.name }".` } );

				return;
			}

			toast.danger( "Esa plantilla ya no existe", { description: "La lista se actualizó." } );
		} catch {
			toast.danger( "No se pudo duplicar la plantilla", { description: "Probá de nuevo." } );
		}
	}

	return (
		<div className={ "flex items-start gap-2 rounded-2xl border border-border bg-surface p-3 transition-colors hover:border-accent" }>
			{ /* La tarjeta abre la plantilla; el menu de opciones queda aparte. */ }
			<Link
				aria-label={ `Abrir la plantilla ${ template.name }` }
				className={ "min-w-0 flex-1 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-accent" }
				href={ buildRoutineTemplateHref( template.id ) }
			>
				<p className={ "line-clamp-2 text-sm font-semibold text-foreground" }>{ template.name }</p>
				<p className={ "mt-0.5 text-xs text-muted" }>
					{ pluralize( template.weekCount, "semana", "semanas" ) } · { pluralize( template.dayCount, "día", "días" ) } · { pluralize( template.exerciseCount, "ejercicio", "ejercicios" ) }
				</p>
				{ template.objective?.trim() ? (
					<p className={ "mt-2 line-clamp-2 text-xs leading-5 text-muted" }>
						<span className={ "font-medium text-foreground" }>Objetivo:</span> { template.objective }
					</p>
				) : null }
				<p className={ "mt-2 text-sm font-medium text-accent" }>Ver y editar</p>
			</Link>
			<Dropdown>
				<Button
					isIconOnly
					aria-label={ `Opciones de la plantilla ${ template.name }` }
					className={ "shrink-0" }
					isDisabled={ duplicateTemplate.isPending }
					size={ "sm" }
					variant={ "ghost" }
				>
					<MoreVertical className={ "size-4" }/>
				</Button>
				<Dropdown.Popover placement={ "bottom end" }>
					<Dropdown.Menu
						onAction={ ( key ) => {
							if (key === "rename") setIsRenameOpen( true );
							if (key === "duplicate") void handleDuplicate();
							if (key === "delete") setIsDeleteOpen( true );
						} }
					>
						<Dropdown.Item id={ "rename" } textValue={ "Cambiar el nombre" }>
							<Pencil className={ "size-4 shrink-0" }/>
							<Label>Cambiar el nombre</Label>
						</Dropdown.Item>
						<Dropdown.Item id={ "duplicate" } textValue={ "Duplicar" }>
							<Copy className={ "size-4 shrink-0" }/>
							<Label>Duplicar</Label>
						</Dropdown.Item>
						<Dropdown.Item id={ "delete" } textValue={ "Eliminar" } variant={ "danger" }>
							<Trash2 className={ "size-4 shrink-0 text-danger" }/>
							<Label className={ "text-danger" }>Eliminar</Label>
						</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown.Popover>
			</Dropdown>

			<RoutineTemplateRenameModal isOpen={ isRenameOpen } template={ template } onOpenChangeAction={ setIsRenameOpen }/>
			<RoutineTemplateDeleteModal isOpen={ isDeleteOpen } template={ template } onOpenChangeAction={ setIsDeleteOpen }/>
		</div>
	);
}
