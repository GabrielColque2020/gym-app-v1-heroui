"use client";

import type { StudentListItem } from "@/features/students/actions/get-students";
import type { StudentFormValues } from "@/features/students/services/student-form";

import {
	NO_GENDER,
	formatDateInputValue,
	isValidEmail,
} from "@/features/students/services/student-form";

export const DEFAULT_STUDENT_FORM_VALUES: StudentFormValues = {
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

export function getDefaultStudentFormValues(): StudentFormValues {
	return { ...DEFAULT_STUDENT_FORM_VALUES };
}

export function getInitialStudentFormValues( student?: StudentListItem ): StudentFormValues {
	if (!student) return getDefaultStudentFormValues();

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

export function getStudentSheetValidationState( values: StudentFormValues, isEditMode: boolean, isPending: boolean ) {
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
		|| isPending;

	return {
		isDniInvalid,
		isEmailInvalid,
		isHeightInvalid,
		isNameInvalid,
		isPasswordInvalid,
		isSubmitDisabled,
		isWeightInvalid,
	};
}
