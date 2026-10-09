"use client";

import type { StudentListItem } from "@/features/students/actions/get-students";

import { useState } from "react";
import { Button } from "@heroui/react";
import { CircleSlash } from "lucide-react";

import { DeactivateConfirmModal } from "@/features/shared/components/deactivate-confirm-modal";
import { useStudentStatusAction } from "@/features/students/hooks/use-student-status-action";

type StudentDrawerDeactivateSectionProps = {
	// Se llama cuando el estudiante quedo desactivado, para cerrar el formulario.
	onDeactivatedAction: () => void;
	student: StudentListItem;
};

// Desactivar vive al final del formulario de edicion y no en la lista: se usa
// poco y le corta el acceso a una persona, asi que no hace falta tenerlo a un
// toque en cada fila.
export function StudentDrawerDeactivateSection( { onDeactivatedAction, student }: StudentDrawerDeactivateSectionProps ) {
	const [ isConfirmOpen, setIsConfirmOpen ] = useState( false );
	const { changeStatus, isPending } = useStudentStatusAction( { student } );

	if (!student.active) return null;

	return (
		<section className={ "space-y-2 rounded-xl border border-danger/30 p-3" }>
			<div>
				<h3 className={ "text-sm font-semibold text-foreground" }>Desactivar estudiante</h3>
				<p className={ "mt-0.5 text-xs leading-5 text-muted" }>
					Deja de poder entrar a la app. Su rutina, su plan y su historial se conservan, y lo podés restaurar desde la lista.
				</p>
			</div>
			<Button
				className={ "border border-danger/40 text-danger" }
				size={ "sm" }
				variant={ "ghost" }
				onPress={ () => setIsConfirmOpen( true ) }
			>
				<CircleSlash className={ "size-4" }/>
				Desactivar a { student.name }
			</Button>

			<DeactivateConfirmModal
				description={ "No va a poder entrar a la app hasta que lo restaures. Su rutina, su plan y su historial no se borran." }
				isOpen={ isConfirmOpen }
				isPending={ isPending }
				title={ `Desactivar a ${ student.name }` }
				onConfirmAction={ async () => {
					await changeStatus();
					onDeactivatedAction();
				} }
				onOpenChangeAction={ setIsConfirmOpen }
			/>
		</section>
	);
}
