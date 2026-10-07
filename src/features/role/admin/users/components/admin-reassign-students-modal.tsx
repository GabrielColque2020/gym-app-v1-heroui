"use client";

import type { AdminUserListItem } from "@/features/role/admin/users/actions/get-admin-users";

import { Button, Label, ListBox, Modal, Select, Spinner, toast } from "@heroui/react";
import { ArrowRightLeft } from "lucide-react";
import { useState } from "react";

import { useAdminUsers, useReassignCoachStudents } from "@/features/role/admin/users/hooks/use-admin-users";

type AdminReassignStudentsModalProps = {
	coach: AdminUserListItem;
	isOpen: boolean;
	onOpenChangeAction: ( isOpen: boolean ) => void;
};

function pluralizeStudents( count: number ) {
	return count === 1 ? "1 estudiante" : `${ count } estudiantes`;
}

// Pasa todos los estudiantes de un entrenador a otro de una vez. Sirve cuando un
// entrenador deja de trabajar: sin esto habia que editar a cada estudiante.
export function AdminReassignStudentsModal( { coach, isOpen, onOpenChangeAction }: AdminReassignStudentsModalProps ) {
	const { data: users = [] } = useAdminUsers();
	const reassignStudents = useReassignCoachStudents();
	const [ selectedCoachId, setSelectedCoachId ] = useState<string | null>( null );
	const studentCount = users.filter( ( user ) => user.role === "STUDENT" && user.coach?.id === coach.id ).length;
	// Solo se puede pasar a un entrenador que pueda entrar a la app.
	const destinations = users
		.filter( ( user ) => user.role === "COACH" && user.active && user.id !== coach.id )
		.sort( ( left, right ) => left.name.localeCompare( right.name, "es" ) );
	const destination = destinations.find( ( user ) => user.id === selectedCoachId ) ?? null;

	function handleOpenChange( nextIsOpen: boolean ) {
		if (!nextIsOpen) {
			setSelectedCoachId( null );
			reassignStudents.reset();
		}

		onOpenChangeAction( nextIsOpen );
	}

	async function handleConfirm() {
		if (!destination) return;

		try {
			const result = await reassignStudents.mutateAsync( {
				fromCoachId: coach.id,
				toCoachId: destination.id,
			} );
			toast.success( "Estudiantes reasignados", {
				description: `${ pluralizeStudents( result.count ) } de ${ coach.name } ahora ${ result.count === 1 ? "está" : "están" } con ${ destination.name }.`,
			} );
			handleOpenChange( false );
		} catch {
			toast.danger( "No se pudieron reasignar", {
				description: "Los estudiantes quedaron como estaban. Probá de nuevo.",
			} );
		}
	}

	return (
		<Modal.Backdrop
			isDismissable={ false }
			isOpen={ isOpen }
			variant={ "blur" }
			onOpenChange={ handleOpenChange }
		>
			<Modal.Container size={ "sm" }>
				<Modal.Dialog className={ "sm:max-w-md" }>
					<Modal.Header>
						<Modal.Heading>Reasignar estudiantes de { coach.name }</Modal.Heading>
					</Modal.Header>
					<Modal.Body className={ "space-y-4" }>
						{ studentCount === 0 ? (
							<p className={ "text-sm leading-6 text-muted" }>
								{ coach.name } no tiene estudiantes asignados.
							</p>
						) : destinations.length === 0 ? (
							<p className={ "text-sm leading-6 text-muted" }>
								No hay otro entrenador activo al que pasarle { pluralizeStudents( studentCount ) }. Creá o activá uno primero.
							</p>
						) : (
							<>
								<p className={ "text-sm leading-6 text-muted" }>
									{ pluralizeStudents( studentCount ) } { studentCount === 1 ? "pasa" : "pasan" } al entrenador que elijas, con sus rutinas, su plan alimenticio y su historial.
								</p>
								<Select
									placeholder={ "Elegí un entrenador" }
									value={ selectedCoachId }
									onChange={ ( key ) => setSelectedCoachId( key === null ? null : String( key ) ) }
								>
									<Label>Pasarlos a</Label>
									<Select.Trigger className={ "border border-border" }>
										<Select.Value/>
										<Select.Indicator/>
									</Select.Trigger>
									<Select.Popover>
										<ListBox>
											{ destinations.map( ( candidate ) => (
												<ListBox.Item key={ candidate.id } id={ candidate.id } textValue={ candidate.name }>
													{ candidate.name }
													<ListBox.ItemIndicator/>
												</ListBox.Item>
											) ) }
										</ListBox>
									</Select.Popover>
								</Select>
							</>
						) }
					</Modal.Body>
					<Modal.Footer className={ "gap-2" }>
						<Button isDisabled={ reassignStudents.isPending } variant={ "secondary" } onPress={ () => handleOpenChange( false ) }>
							{ studentCount === 0 || destinations.length === 0 ? "Cerrar" : "Cancelar" }
						</Button>
						{ studentCount > 0 && destinations.length > 0 ? (
							<Button
								isDisabled={ !destination || reassignStudents.isPending }
								isPending={ reassignStudents.isPending }
								onPress={ () => void handleConfirm() }
							>
								{ reassignStudents.isPending ? <Spinner color={ "current" } size={ "sm" }/> : <ArrowRightLeft className={ "size-4" }/> }
								{ reassignStudents.isPending ? "Reasignando..." : "Reasignar" }
							</Button>
						) : null }
					</Modal.Footer>
				</Modal.Dialog>
			</Modal.Container>
		</Modal.Backdrop>
	);
}
