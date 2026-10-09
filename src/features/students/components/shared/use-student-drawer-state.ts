"use client";

import { getErrorMessage } from "@/lib/action-result";
import type { StudentFormDrawerProps } from "@/features/students/components/shared/student-drawer.types";
import type { StudentFormValues } from "@/features/students/services/student-form";

import { toast } from "@heroui/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { focusFirstInvalidField } from "@/lib/focus-first-invalid-field";

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
	// Se intento guardar con algo mal: desde ahi se marcan tambien los vacios.
	const [ hasTriedSubmit, setHasTriedSubmit ] = useState( false );
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
		? "Actualizá el perfil, el estado y los objetivos del estudiante."
		: "Cargá un estudiante para hacerle el seguimiento.";
	const submitLabel = isEditMode ? "Guardar cambios" : "Crear estudiante";
	const showEditTriggerLabel = props.triggerVariant === "button";
	const {
		isDniInvalid,
		isEmailInvalid,
		isFormValid,
		isHeightInvalid,
		isNameInvalid,
		isPasswordInvalid,
		isWeightInvalid,
	} = getStudentDrawerValidationState( values, isEditMode, hasTriedSubmit );
	// Solo mientras guarda: con algo mal, tocarlo muestra que falta.
	const isSubmitDisabled = activeMutation.isPending;
	const initialValues = useMemo( () => getInitialStudentFormValues( props.student ), [ props.student ] );
	const hasUnsavedChanges = !activeMutation.isPending && JSON.stringify( values ) !== JSON.stringify( initialValues );

	const resetFormState = useCallback( () => {
		setValues( getInitialStudentFormValues( props.student ) );
		setHasTriedSubmit( false );
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

	async function handleSubmit( form?: HTMLFormElement | null ) {
		if (isSubmitDisabled) return false;

		if (!isFormValid) {
			setHasTriedSubmit( true );
			focusFirstInvalidField( form ?? null );

			return false;
		}

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
					description: "Se agregó al listado.",
				} );
			}

			setIsOpen( false );
			return true;
		} catch (error) {
			toast.danger( isEditMode ? "Error al actualizar" : "Error al crear", {
				description: getErrorMessage( error, isEditMode
					? "No se pudieron guardar los cambios."
					: "No se pudo crear el estudiante." ),
			} );

			return false;
		}
	}

	return {
		activeMutation,
		description,
		handleOpenChange,
		handleSubmit,
		hasUnsavedChanges,
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
