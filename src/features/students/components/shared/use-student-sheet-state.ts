"use client";

import type { StudentListItem } from "@/features/students/actions/get-students";
import type { StudentFormValues } from "@/features/students/services/student-form";
import type { StudentFormSheetProps } from "@/features/students/components/shared/student-sheet.types";

import { toast } from "@heroui/react";
import { useCallback, useEffect, useRef, useState } from "react";

import {
	useCreateStudent,
	useUpdateStudent,
} from "@/features/students/hooks/use-students";
import {
	NO_GENDER,
	formatDateInputValue,
	isValidEmail,
} from "@/features/students/services/student-form";

const DEFAULT_VALUES: StudentFormValues = {
	active: true,
	birthDate: "",
	dni: "",
	email: "",
	gender: NO_GENDER,
	height: "0",
	name: "",
	objective: "",
	observations: "",
	password: "",
	weight: "0",
};

function getDefaultValues(): StudentFormValues {
	return { ...DEFAULT_VALUES };
}

function getInitialValues( student?: StudentListItem ): StudentFormValues {
	if (!student) return getDefaultValues();

	return {
		active: student.active,
		birthDate: formatDateInputValue( student.DescriptionStudent?.birthDate ),
		dni: String( student.dni ),
		email: student.email,
		gender: student.gender ?? NO_GENDER,
		height: String( student.DescriptionStudent?.height ?? 0 ),
		name: student.name,
		objective: student.DescriptionStudent?.objective ?? "",
		observations: student.DescriptionStudent?.observations ?? "",
		password: "",
		weight: String( student.DescriptionStudent?.weight ?? 0 ),
	};
}

function isNonNegativeNumberInput( value: string ) {
	if (value.trim().length === 0) return true;

	const normalizedValue = value.trim().replace( ",", "." );

	return Number.isFinite( Number( normalizedValue ) ) && Number( normalizedValue ) >= 0;
}

export function useStudentSheetState( props: StudentFormSheetProps ) {
	const [ internalIsOpen, setInternalIsOpen ] = useState( false );
	const [ values, setValues ] = useState<StudentFormValues>( () => getInitialValues( props.student ) );
	const createStudent = useCreateStudent();
	const updateStudent = useUpdateStudent();
	const wasOpenRef = useRef( false );

	const isEditMode = props.mode === "edit";
	const activeMutation = isEditMode ? updateStudent : createStudent;
	const isOpen = props.isOpen ?? internalIsOpen;
	const setIsOpen = props.onOpenChange ?? setInternalIsOpen;
	const placement = props.placement ?? "right";
	const title = isEditMode ? "Editar estudiante" : "Nuevo estudiante";
	const description = isEditMode
		? "Actualiza el perfil, estado y objetivos del estudiante."
		: "Carga un estudiante disponible para seguimiento del coach.";
	const submitLabel = isEditMode ? "Guardar cambios" : "Crear estudiante";
	const showEditTriggerLabel = props.triggerVariant === "button";
	const isNameInvalid = values.name.trim().length > 0 && values.name.trim().length < 2;
	const isEmailInvalid = values.email.trim().length > 0 && !isValidEmail( values.email );
	const isDniInvalid = values.dni.trim().length > 0 && !/^\d+$/.test( values.dni.trim() );
	const isPasswordInvalid = !isEditMode && values.password.trim().length === 0;
	const isHeightInvalid = !isNonNegativeNumberInput( values.height );
	const isWeightInvalid = !isNonNegativeNumberInput( values.weight );
	const isSubmitDisabled = values.name.trim().length < 2
		|| !isValidEmail( values.email )
		|| !/^\d+$/.test( values.dni.trim() )
		|| Number( values.dni ) <= 0
		|| isPasswordInvalid
		|| isHeightInvalid
		|| isWeightInvalid
		|| activeMutation.isPending;

	const resetFormState = useCallback( () => {
		setValues( getInitialValues( props.student ) );
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

	function openSheet() {
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
				setValues( getDefaultValues() );
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
		openSheet,
		placement,
		setIsOpen,
		showEditTriggerLabel,
		submitLabel,
		title,
		updateValue,
		values,
	};
}
