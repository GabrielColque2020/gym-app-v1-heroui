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
		birthDate: formatDateInputValue( student.birthDate ),
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

// `showAllErrors`: despues de intentar guardar se marcan tambien los obligatorios
// vacios. Antes de eso, solo lo que ya se escribio mal: un formulario nuevo no
// arranca lleno de rojo.
export function getStudentDrawerValidationState( values: StudentFormValues, isEditMode: boolean, showAllErrors: boolean ) {
	const isNameWrong = values.name.trim().length < 2;
	const isEmailWrong = !isValidEmail( values.email );
	const isDniWrong = !/^\d+$/.test( values.dni.trim() ) || Number( values.dni ) <= 0;
	// Al editar, vacia es "no cambiarla".
	const isPasswordWrong = values.password.trim().length > 0
		? values.password.trim().length < 6
		: !isEditMode;
	const isHeightInvalid = !isNonNegativeNumberInput( values.height );
	const isWeightInvalid = !isNonNegativeNumberInput( values.weight );
	const shows = ( isWrong: boolean, value: string ) => isWrong && ( showAllErrors || value.trim().length > 0 );

	return {
		isDniInvalid: shows( isDniWrong, values.dni ),
		isEmailInvalid: shows( isEmailWrong, values.email ),
		isFormValid: !isNameWrong && !isEmailWrong && !isDniWrong && !isPasswordWrong && !isHeightInvalid && !isWeightInvalid,
		isHeightInvalid,
		isNameInvalid: shows( isNameWrong, values.name ),
		isPasswordInvalid: shows( isPasswordWrong, values.password ),
		isWeightInvalid,
	};
}
