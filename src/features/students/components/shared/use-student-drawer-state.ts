"use client";

import type { StudentFormDrawerProps } from "@/features/students/components/shared/student-drawer.types";
import type { StudentFormValues } from "@/features/students/services/student-form";

import { toast } from "@heroui/react";
import { useCallback, useEffect, useRef, useState } from "react";

import {
	useCreateStudent,
	useUpdateStudent,
} from "@/features/students/hooks/use-students";
import {
	getDefaultStudentFormValues,
	getInitialStudentFormValues,
	getStudentDrawerValidationState,
} from "@/features/students/components/shared/use-student-drawer-state.utils";

export function useStudentDrawerState( props: StudentFormDrawerProps ) {
	const [ internalIsOpen, setInternalIsOpen ] = useState( false );
	const [ values, setValues ] = useState<StudentFormValues>( () => getInitialStudentFormValues( props.student ) );
	const createStudent = useCreateStudent();
	const updateStudent = useUpdateStudent();
	const wasOpenRef = useRef( false );

	const isEditMode = props.mode === "edit";
	const activeMutation = isEditMode ? updateStudent : createStudent;
	const isOpen = props.isOpen ?? internalIsOpen;
	const setIsOpen = props.onOpenChangeAction ?? setInternalIsOpen;
	const placement = props.placement ?? "right";
	const title = isEditMode ? "Editar estudiante" : "Nuevo estudiante";
	const description = isEditMode
		? "Actualiza el perfil, estado y objetivos del estudiante."
		: "Carga un estudiante disponible para seguimiento del coach.";
	const submitLabel = isEditMode ? "Guardar cambios" : "Crear estudiante";
	const showEditTriggerLabel = props.triggerVariant === "button";
	const {
		isDniInvalid,
		isEmailInvalid,
		isHeightInvalid,
		isNameInvalid,
		isPasswordInvalid,
		isSubmitDisabled,
		isWeightInvalid,
	} = getStudentDrawerValidationState( values, isEditMode, activeMutation.isPending );

	const resetFormState = useCallback( () => {
		setValues( getInitialStudentFormValues( props.student ) );
		createStudent.reset();
		updateStudent.reset();
	}, [ createStudent, props.student, updateStudent ] );

	useEffect( () => {
		if (!isOpen) {
			wasOpenRef.current = false;

			return;
		}

		if (wasOpenRef.current) return;

		resetFormState();
		wasOpenRef.current = true;
	}, [ isOpen, resetFormState ] );

	function openDrawer() {
		resetFormState();
		setIsOpen( true );
	}

	function handleOpenChange( nextIsOpen: boolean ) {
		if (!nextIsOpen) {
			resetFormState();
			wasOpenRef.current = false;
		}

		setIsOpen( nextIsOpen );
	}

	function updateValue<Key extends keyof StudentFormValues>( key: Key, value: StudentFormValues[ Key ] ) {
		setValues( ( currentValues ) => ( {
			...currentValues,
			[ key ]: value,
		} ) );
	}

	async function handleSubmit() {
		if (isSubmitDisabled) return false;

		try {
			if (isEditMode) {
				await updateStudent.mutateAsync( {
					...values,
					id: props.student.id,
				} );
				toast.success( "Estudiante actualizado", {
					description: "Los cambios se guardaron correctamente.",
				} );
			} else {
				await createStudent.mutateAsync( values );
				setValues( getDefaultStudentFormValues() );
				toast.success( "Estudiante creado", {
					description: "Se agrego al listado.",
				} );
			}

			setIsOpen( false );
			return true;
		} catch {
			toast.danger( isEditMode ? "Error al actualizar" : "Error al crear", {
				description: isEditMode
					? "No se pudieron guardar los cambios."
					: "No se pudo crear el estudiante.",
			} );

			return false;
		}
	}

	return {
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
		setIsOpen,
		showEditTriggerLabel,
		submitLabel,
		title,
		updateValue,
		values,
	};
}
