"use client";

import type { FormEvent } from "react";
import { useEffect, useRef, useState } from "react";

import { Button, Description, Drawer, Label, ListBox, Spinner, Select, toast } from "@heroui/react";
import { CheckCircle2, Users } from "lucide-react";
import type { Key } from "@heroui/react";

import type { AdminUserListItem } from "@/features/role/admin/users/actions/get-admin-users";
import { useAdminCoaches } from "@/features/role/admin/users/hooks/use-admin-coaches";
import { useAssignCoachToStudent } from "@/features/role/admin/users/hooks/use-admin-users";
import { FeatureDrawerLayout } from "@/features/shared/components/feature-drawer-layout";

type AdminAssignCoachDrawerProps = {
	hideTrigger?: boolean;
	isOpen?: boolean;
	onOpenChangeAction?: ( isOpen: boolean ) => void;
	student: AdminUserListItem;
};

export function AdminAssignCoachDrawer( {
	hideTrigger = false,
	isOpen: controlledIsOpen,
	onOpenChangeAction,
	student,
}: AdminAssignCoachDrawerProps ) {
	const [ isOpen, setIsOpen ] = useState( false );
	const [ coachId, setCoachId ] = useState<string | null>( student.coachId ?? null );
	const mutation = useAssignCoachToStudent();
	const { data: coaches = [] } = useAdminCoaches();
	const wasOpenRef = useRef( false );
	const open = controlledIsOpen ?? isOpen;
	const setOpen = onOpenChangeAction ?? setIsOpen;

	useEffect( () => {
		if (!open) {
			wasOpenRef.current = false;
			return;
		}

		if (wasOpenRef.current) return;

		setCoachId( student.coachId ?? null );
		mutation.reset();
		wasOpenRef.current = true;
	}, [ mutation, open, student.coachId ] );

	function handleOpenChange( nextIsOpen: boolean ) {
		if (!nextIsOpen) {
			setCoachId( student.coachId ?? null );
			mutation.reset();
			wasOpenRef.current = false;
		}

		setOpen( nextIsOpen );
	}

	async function handleSubmit( event: FormEvent<HTMLFormElement> ) {
		event.preventDefault();

		try {
			await mutation.mutateAsync( {
				coachId,
				studentId: student.id,
			} );
			toast.success( "Coach asignado", {
				description: "La relacion quedo actualizada.",
			} );
			handleOpenChange( false );
		} catch {
			toast.danger( "Error al asignar coach", {
				description: "No se pudo actualizar la relacion del estudiante.",
			} );
		}
	}

	return (
		<>
			{ hideTrigger ? null : (
				<Button isIconOnly aria-label={ "Asignar coach" } size={ "sm" } variant={ "ghost" } onPress={ () => setOpen( true ) }>
					<Users className={ "size-4" }/>
				</Button>
			) }
			<FeatureDrawerLayout
				isDismissable={ false }
				isOpen={ open }
				placement={ "right" }
				rightContentClassName={ "w-120 px-5 pt-5 pb-4" }
				onOpenChangeAction={ handleOpenChange }
			>
				<Drawer.Header className={ "border-default-100 relative border-b pb-4" }>
					<div className={ "flex gap-3" }>
						<div className={ "flex size-10 shrink-0 items-center justify-center rounded-xl border border-accent-soft bg-accent-soft/60 text-accent" }>
							<Users className={ "size-5" }/>
						</div>
						<div>
							<Drawer.Heading>Asignar coach</Drawer.Heading>
							<Description className={ "mt-1 text-sm" }>
								{ student.name } solo puede tener un coach asignado a la vez.
							</Description>
						</div>
					</div>
				</Drawer.Header>

				<form className={ "flex min-h-0 flex-1 flex-col" } onSubmit={ handleSubmit }>
					<Drawer.Body className={ "min-h-0 flex-1 space-y-5 overflow-y-auto py-3" }>
						<div className={ "rounded-xl border border-border bg-surface-secondary p-3 text-sm text-muted" }>
							<p className={ "font-medium text-foreground" }>Coach actual</p>
							<p>{ student.coach?.name ?? "Sin coach asignado" }</p>
						</div>

						{ coaches.length === 0 ? (
							<div className={ "rounded-xl border border-warning/20 bg-warning/10 p-3 text-sm text-warning-foreground" }>
								No hay coaches disponibles para asignar.
							</div>
						) : null }

						<Select
							fullWidth
							name={ "coachId" }
							value={ coachId ?? "" }
							onChange={ ( value ) => setCoachId( value ? String( value as Key ) : null ) }
						>
							<Label>Coach</Label>
							<Select.Trigger>
								<Select.Value/>
								<Select.Indicator/>
							</Select.Trigger>
							<Select.Popover>
								<ListBox>
									<ListBox.Item id={ "" } textValue={ "Sin coach" }>
										Sin coach
									</ListBox.Item>
									{ coaches.map( ( coach ) => (
										<ListBox.Item key={ coach.id } id={ coach.id } textValue={ coach.name }>
											<div className={ "flex items-center justify-between gap-2" }>
												<span>{ coach.name }</span>
												<span className={ "text-xs text-muted" }>{ coach.active ? "Activo" : "Inactivo" }</span>
											</div>
										</ListBox.Item>
									) ) }
								</ListBox>
							</Select.Popover>
						</Select>
					</Drawer.Body>

					<Drawer.Footer className={ "border-default-100 shrink-0 justify-end gap-2 border-t pt-4" }>
						<Button slot={ "close" } isDisabled={ mutation.isPending } variant={ "secondary" }>
							Cancelar
						</Button>
						<Button isDisabled={ mutation.isPending } isPending={ mutation.isPending } type={ "submit" }>
							{ ( { isPending } ) => (
								<>
									{ isPending ? <Spinner color={ "current" } size={ "sm" }/> : <CheckCircle2 className={ "size-4" }/> }
									{ isPending ? "Guardando..." : "Guardar coach" }
								</>
							) }
						</Button>
					</Drawer.Footer>
				</form>
			</FeatureDrawerLayout>
		</>
	);
}
