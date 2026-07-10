"use client";

import React from "react";

import { Alert, Button, Description, Drawer, Spinner } from "@heroui/react";
import { CheckCircle2, PencilLine, Plus } from "lucide-react";
import { StudentDrawerDetailsSection } from "@/features/students/components/shared/student-drawer-details-section";
import { StudentDrawerProfileSection } from "@/features/students/components/shared/student-drawer-profile-section";
import { StudentDrawerTrigger } from "@/features/students/components/shared/student-drawer-trigger";
import type { StudentFormDrawerProps } from "@/features/students/components/shared/student-drawer.types";
import { useStudentDrawerState } from "@/features/students/components/shared/use-student-drawer-state";
import { FeatureDrawerLayout } from "@/features/shared/components/feature-drawer-layout";

export function StudentDrawer( props: StudentFormDrawerProps ) {
	const {
		activeMutation,
		description,
		handleOpenChange,
		handleSubmit,
		isDniInvalid,
		isEditMode,
		isEmailInvalid,
		isHeightInvalid,
		isNameInvalid,
		isOpen,
		isPasswordInvalid,
		isSubmitDisabled,
		isWeightInvalid,
		openDrawer,
		placement,
		showEditTriggerLabel,
		submitLabel,
		title,
		updateValue,
		values,
	} = useStudentDrawerState( props );

	async function handleFormSubmit( event: React.SubmitEvent<HTMLFormElement> ) {
		event.preventDefault();
		await handleSubmit();
	}

	return (
		<>

			<StudentDrawerTrigger
				isEditMode={ isEditMode }
				props={ props }
				showEditTriggerLabel={ showEditTriggerLabel }
				onPress={ openDrawer }
			/>
			<FeatureDrawerLayout
				isDismissable={ false }
				isOpen={ isOpen }
				placement={ placement }
				rightContentClassName={ "w-115 px-5 pt-5 pb-4" }
				onOpenChangeAction={ handleOpenChange }
			>
				<Drawer.Header className={ "border-default-100 relative border-b pb-4" }>
					<div className={ "flex gap-3 " }>
						<div className={ "flex size-10 shrink-0 items-center justify-center rounded-xl border border-accent-soft bg-accent-soft/60 text-accent" }>
							{ isEditMode ? <PencilLine className={ "size-5" }/> : <Plus className={ "size-5" }/> }
						</div>
						<div>
							<Drawer.Heading>{ title }</Drawer.Heading>
							<Description className={ "mt-1 text-sm" }>{ description }</Description>
						</div>
					</div>
				</Drawer.Header>

				<form autoComplete={ "off" } className={ "flex min-h-0 flex-1 flex-col" } onSubmit={ handleFormSubmit }>
					<Drawer.Body className={ "min-h-0 flex-1 space-y-6 overflow-y-auto py-3" }>
						{ activeMutation.isError && (
							<Alert className={ "border border-danger/20" } status={ "danger" }>
								<Alert.Content>
									<Alert.Title>Error al guardar</Alert.Title>
									<Alert.Description>{ activeMutation.error.message }</Alert.Description>
								</Alert.Content>
							</Alert>
						) }

						<StudentDrawerProfileSection
							isDniInvalid={ isDniInvalid }
							isEditMode={ isEditMode }
							isEmailInvalid={ isEmailInvalid }
							isNameInvalid={ isNameInvalid }
							isPasswordInvalid={ isPasswordInvalid }
							updateValue={ updateValue }
							values={ values }
						/>

						<StudentDrawerDetailsSection
							isHeightInvalid={ isHeightInvalid }
							isWeightInvalid={ isWeightInvalid }
							updateValue={ updateValue }
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
