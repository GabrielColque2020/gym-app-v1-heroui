"use client";

import React from "react";

import { Sheet } from "@heroui-pro/react";
import {
	Alert,
	Button,
	Spinner,
} from "@heroui/react";
import { CircleCheck } from "@gravity-ui/icons";
import { StudentSheetDetailsSection } from "@/features/students/components/shared/student-sheet-details-section";
import { StudentSheetHeader } from "@/features/students/components/shared/student-sheet-header";
import { StudentSheetProfileSection } from "@/features/students/components/shared/student-sheet-profile-section";
import { StudentSheetTrigger } from "@/features/students/components/shared/student-sheet-trigger";
import type { StudentFormSheetProps } from "@/features/students/components/shared/student-sheet.types";
import { useStudentSheetState } from "@/features/students/components/shared/use-student-sheet-state";
import { FeatureSheetLayout } from "@/features/shared/components/feature-sheet-layout";

export function StudentSheet( props: StudentFormSheetProps ) {
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
		openSheet,
		placement,
		showEditTriggerLabel,
		submitLabel,
		title,
		updateValue,
		values,
	} = useStudentSheetState( props );

	async function handleFormSubmit( event: React.SubmitEvent<HTMLFormElement> ) {
		event.preventDefault();
		await handleSubmit();
	}

	return (
		<>
			<StudentSheetTrigger
				isEditMode={ isEditMode }
				props={ props }
				showEditTriggerLabel={ showEditTriggerLabel }
				onPress={ openSheet }
			/>
			<FeatureSheetLayout isOpen={ isOpen } placement={ placement } onOpenChange={ handleOpenChange }>
				<StudentSheetHeader
					description={ description }
					isEditMode={ isEditMode }
					title={ title }
				/>

				<form className={ "flex min-h-0 flex-1 flex-col" } onSubmit={ handleFormSubmit }>
					<Sheet.Body className={ "min-h-0 flex-1 space-y-6 overflow-y-auto px-6 py-5" }>
						{ activeMutation.isError && (
							<Alert className={ "border border-danger/20" } status={ "danger" }>
								<Alert.Content>
									<Alert.Title>Error al guardar</Alert.Title>
									<Alert.Description>{ activeMutation.error.message }</Alert.Description>
								</Alert.Content>
							</Alert>
						) }

						<StudentSheetProfileSection
							isDniInvalid={ isDniInvalid }
							isEditMode={ isEditMode }
							isEmailInvalid={ isEmailInvalid }
							isNameInvalid={ isNameInvalid }
							isPasswordInvalid={ isPasswordInvalid }
							updateValue={ updateValue }
							values={ values }
						/>

						<StudentSheetDetailsSection
							isHeightInvalid={ isHeightInvalid }
							isWeightInvalid={ isWeightInvalid }
							updateValue={ updateValue }
							values={ values }
						/>
					</Sheet.Body>

					<Sheet.Footer className={ "border-default-100 bg-background flex shrink-0 justify-end gap-2 border-t px-6 py-4" }>
						<Sheet.Close>
							<Button isDisabled={ activeMutation.isPending } variant={ "secondary" }>
								Cancelar
							</Button>
						</Sheet.Close>
						<Button isDisabled={ isSubmitDisabled } isPending={ activeMutation.isPending } type={ "submit" }>
							{ ( { isPending } ) => (
								<>
									{ isPending ? <Spinner color={ "current" } size={ "sm" }/> : <CircleCheck className={ "size-4" }/> }
									{ isPending ? ( isEditMode ? "Actualizando..." : "Guardando..." ) : submitLabel }
								</>
							) }
						</Button>
					</Sheet.Footer>
				</form>
			</FeatureSheetLayout>
		</>
	);
}
