"use client";

import type { RoutineTemplateListItem } from "@/features/training-routine/services/routine-template";

import { Button, Modal, Spinner, toast } from "@heroui/react";
import { Trash2 } from "lucide-react";

import { useDeleteRoutineTemplate } from "@/features/role/coach/training-routine/hooks/use-routine-templates";

type RoutineTemplateDeleteModalProps = {
	isOpen: boolean;
	onOpenChangeAction: ( isOpen: boolean ) => void;
	template: RoutineTemplateListItem;
};

// Borrar una plantilla no se puede deshacer, asi que pide confirmar. Aclara lo
// que mas preocupa: las rutinas armadas con ella no se tocan.
export function RoutineTemplateDeleteModal( { isOpen, onOpenChangeAction, template }: RoutineTemplateDeleteModalProps ) {
	const deleteTemplate = useDeleteRoutineTemplate();

	async function handleDelete() {
		try {
			await deleteTemplate.mutateAsync( template.id );
			toast.success( "Plantilla eliminada", { description: `"${ template.name }" ya no está en tu lista.` } );
			onOpenChangeAction( false );
		} catch {
			toast.danger( "No se pudo eliminar la plantilla", { description: "Quedó como estaba. Probá de nuevo." } );
		}
	}

	return (
		<Modal.Backdrop
			isDismissable={ false }
			isOpen={ isOpen }
			variant={ "blur" }
			onOpenChange={ onOpenChangeAction }
		>
			<Modal.Container size={ "sm" }>
				<Modal.Dialog className={ "sm:max-w-md" }>
					<Modal.Header>
						<Modal.Heading>¿Eliminar &quot;{ template.name }&quot;?</Modal.Heading>
					</Modal.Header>
					<Modal.Body>
						<p className={ "text-sm leading-6 text-muted" }>
							La plantilla se borra y no se puede recuperar. Las rutinas de tus estudiantes que armaste con ella quedan como están.
						</p>
					</Modal.Body>
					<Modal.Footer className={ "gap-2" }>
						<Button isDisabled={ deleteTemplate.isPending } variant={ "secondary" } onPress={ () => onOpenChangeAction( false ) }>
							Cancelar
						</Button>
						<Button
							className={ "bg-danger text-danger-foreground" }
							isDisabled={ deleteTemplate.isPending }
							isPending={ deleteTemplate.isPending }
							onPress={ () => void handleDelete() }
						>
							{ deleteTemplate.isPending ? <Spinner color={ "current" } size={ "sm" }/> : <Trash2 className={ "size-4" }/> }
							{ deleteTemplate.isPending ? "Eliminando..." : "Eliminar" }
						</Button>
					</Modal.Footer>
				</Modal.Dialog>
			</Modal.Container>
		</Modal.Backdrop>
	);
}
