"use client";

import { useEffect, useRef, useState } from "react";

import { Button, Chip, Description, Drawer, Label, ListBox, Select, Spinner, toast } from "@heroui/react";
import { CheckCircle2, PencilLine, Plus, Users } from "lucide-react";

import type { AdminUserListItem } from "@/features/role/admin/users/actions/get-admin-users";
import { useAdminCoaches } from "@/features/role/admin/users/hooks/use-admin-coaches";
import { useCreateAdminStudent, useUpdateAdminStudent } from "@/features/role/admin/users/hooks/use-admin-users";
import { FeatureDrawerLayout } from "@/features/shared/components/feature-drawer-layout";
import { useResponsiveDrawerPlacement } from "@/features/shared/hooks/use-responsive-drawer-placement";
import { StudentDrawerDetailsSection } from "@/features/students/components/shared/student-drawer-details-section";
import { StudentDrawerProfileSection } from "@/features/students/components/shared/student-drawer-profile-section";
import {
	getDefaultStudentFormValues,
	getInitialStudentFormValues,
	getStudentDrawerValidationState,
} from "@/features/students/components/shared/use-student-drawer-state.utils";
import type { StudentFormValues } from "@/features/students/services/student-form";

type AdminStudentDrawerProps = {
	hideTrigger?: boolean;
	isOpen?: boolean;
	mode: "create" | "edit";
	onOpenChangeAction?: ( isOpen: boolean ) => void;
	student?: AdminUserListItem;
};

type AdminStudentFormValues = StudentFormValues & {
	coachId: string | null;
};

function getDefaultAdminStudentFormValues(): AdminStudentFormValues {
	return {
		...getDefaultStudentFormValues(),
		coachId: null,
	};
}

function getInitialAdminStudentFormValues( student?: AdminUserListItem ): AdminStudentFormValues {
	if (!student) return getDefaultAdminStudentFormValues();

	return {
		...getInitialStudentFormValues( student ),
		coachId: student.coachId ?? null,
	};
}

export function AdminStudentDrawer( {
										hideTrigger = false,
										isOpen: controlledIsOpen,
										mode,
										onOpenChangeAction,
										student,
									}: AdminStudentDrawerProps ) {
	const [ internalIsOpen, setInternalIsOpen ] = useState( false );
	const [ values, setValues ] = useState<AdminStudentFormValues>( () => getInitialAdminStudentFormValues( student ) );
	const createStudent = useCreateAdminStudent();
	const updateStudent = useUpdateAdminStudent();
	const { data: coaches = [] } = useAdminCoaches();
	const wasOpenRef = useRef( false );
	const isEditMode = mode === "edit";
	const currentStudent = student;
	const activeMutation = isEditMode ? updateStudent : createStudent;
	const open = controlledIsOpen ?? internalIsOpen;
	const setOpen = onOpenChangeAction ?? setInternalIsOpen;
	const placement = useResponsiveDrawerPlacement();
	const title = isEditMode ? "Editar estudiante" : "Nuevo estudiante";
	const description = isEditMode
		? "Actualiza el perfil del estudiante y su coach asignado."
		: "Carga un estudiante y opcionalmente asígnale un coach.";
	const submitLabel = isEditMode ? "Guardar cambios" : "Crear estudiante";
	const showTriggerLabel = true;
	const {
		isDniInvalid,
		isEmailInvalid,
		isHeightInvalid,
		isNameInvalid,
		isPasswordInvalid,
		isSubmitDisabled,
		isWeightInvalid,
	} = getStudentDrawerValidationState( values, isEditMode, activeMutation.isPending );

	useEffect( () => {
		if (!open) {
			wasOpenRef.current = false;
			return;
		}

		if (wasOpenRef.current) return;

		setValues( getInitialAdminStudentFormValues( currentStudent ) );
		createStudent.reset();
		updateStudent.reset();
		wasOpenRef.current = true;
	}, [ createStudent, currentStudent, open, updateStudent ] );

	function resetFormState() {
		setValues( getInitialAdminStudentFormValues( currentStudent ) );
		createStudent.reset();
		updateStudent.reset();
	}

	function openDrawer() {
		resetFormState();
		setOpen( true );
	}

	function handleOpenChange( nextIsOpen: boolean ) {
		if (!nextIsOpen) {
			resetFormState();
			wasOpenRef.current = false;
		}

		setOpen( nextIsOpen );
	}

	function updateValue<Key extends keyof AdminStudentFormValues>( key: Key, value: AdminStudentFormValues[ Key ] ) {
		setValues( ( current ) => ( {
			...current,
			[ key ]: value,
		} ) );
	}

	function updateStudentValue<Key extends keyof StudentFormValues>( key: Key, value: StudentFormValues[ Key ] ) {
		setValues( ( current ) => ( {
			...current,
			[ key ]: value,
		} ) );
	}

	async function handleSubmit( event: React.SubmitEvent<HTMLFormElement> ) {
		event.preventDefault();

		if (isSubmitDisabled) return;

		try {
			if (isEditMode) {
				if (!currentStudent) return;

				await updateStudent.mutateAsync( {
					...values,
					id: currentStudent.id,
				} );
				toast.success( "Estudiante actualizado", {
					description: "Los cambios se guardaron correctamente.",
				} );
			} else {
				await createStudent.mutateAsync( values );
				setValues( getDefaultAdminStudentFormValues() );
				toast.success( "Estudiante creado", {
					description: "Se agrego al listado de usuarios.",
				} );
			}

			handleOpenChange( false );
		} catch {
			toast.danger( isEditMode ? "Error al actualizar" : "Error al crear", {
				description: isEditMode
					? "No se pudieron guardar los cambios."
					: "No se pudo crear el estudiante.",
			} );
		}
	}

	function handleCoachChange( value: string | null ) {
		updateValue( "coachId", value );
	}

	if (isEditMode && !currentStudent) return null;

	return (
		<>
			{ hideTrigger ? null : (
				<Button variant={ "secondary" } onPress={ openDrawer }>
					{ isEditMode ? <PencilLine className={ "size-4" }/> : <Plus className={ "size-4" }/> }
					{ showTriggerLabel ? ( isEditMode ? "Editar estudiante" : "Crear estudiante" ) : null }
				</Button>
			) }
			<FeatureDrawerLayout
				isDismissable={ false }
				isOpen={ open }
				placement={ placement }
				rightContentClassName={ "w-135 px-5 pt-5 pb-4" }
				onOpenChangeAction={ handleOpenChange }
			>
				<Drawer.Header className={ "border-default-100 relative border-b pb-4" }>
					<div className={ "flex gap-3" }>
						<div className={ "flex size-10 shrink-0 items-center justify-center rounded-xl border border-accent-soft bg-accent-soft/60 text-accent" }>
							<Users className={ "size-5" }/>
						</div>
						<div>
							<Drawer.Heading>{ title }</Drawer.Heading>
							<Description className={ "mt-1 text-sm" }>{ description }</Description>
						</div>
					</div>
				</Drawer.Header>

				<form autoComplete={ "off" } className={ "flex min-h-0 flex-1 flex-col" } onSubmit={ handleSubmit }>
					<Drawer.Body className={ "min-h-0 flex-1 space-y-6 overflow-y-auto py-3" }>
						{ activeMutation.isError ? (
							<div className={ "rounded-xl border border-danger/20 bg-danger/10 p-3 text-sm text-danger" }>
								{ activeMutation.error.message }
							</div>
						) : null }

						<StudentDrawerProfileSection
							isDniInvalid={ isDniInvalid }
							isEditMode={ isEditMode }
							isEmailInvalid={ isEmailInvalid }
							isNameInvalid={ isNameInvalid }
							isPasswordInvalid={ isPasswordInvalid }
							updateValue={ updateStudentValue }
							values={ values }
						/>

						<div className={ "grid gap-2" }>
							<Label>Coach asignado</Label>
							<Select
								fullWidth
								name={ "coachId" }
								placeholder={ "Sin coach" }
								value={ values.coachId ?? "" }
								onChange={ ( value ) => handleCoachChange( value ? String( value ) : null ) }
							>
								<Select.Trigger className={ "border border-border" }>
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
													<Chip color={ coach.active ? "success" : "danger" }
													      className={ coach.active ? "bg-success-soft/50" : "bg-danger-soft/50" }>
														{ coach.active ? "Activo" : "Inactivo" }
													</Chip>
												</div>
											</ListBox.Item>
										) ) }
									</ListBox>
								</Select.Popover>
							</Select>
							<Description className={ "text-sm text-muted" }>
								Este coach quedara asociado al estudiante al guardar.
							</Description>
						</div>

						<StudentDrawerDetailsSection
							isHeightInvalid={ isHeightInvalid }
							isWeightInvalid={ isWeightInvalid }
							updateValue={ updateStudentValue }
							values={ values }
						/>
					</Drawer.Body>

					<Drawer.Footer className={ "border-default-100 shrink-0 justify-end gap-2 border-t pt-4" }>
						<Button slot={ "close" } isDisabled={ activeMutation.isPending } variant={ "secondary" }>
							Cancelar
						</Button>
						<Button isDisabled={ isSubmitDisabled } isPending={ activeMutation.isPending } type={ "submit" }>
							{ ( { isPending } ) => (
								<>
									{ isPending ? <Spinner color={ "current" } size={ "sm" }/> : <CheckCircle2 className={ "size-4" }/> }
									{ isPending ? ( isEditMode ? "Actualizando..." : "Guardando..." ) : submitLabel }
								</>
							) }
						</Button>
					</Drawer.Footer>
				</form>
			</FeatureDrawerLayout>
		</>
	);
}
