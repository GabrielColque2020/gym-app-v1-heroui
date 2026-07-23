import type { GenderFormValue, GenderValue } from "@/features/students/services/student-form";
import {
	formatDateInputValue,
	isGenderValue,
	isValidEmail as isValidStudentEmail,
	NO_GENDER,
	parseBirthDate,
} from "@/features/students/services/student-form";

export type AdminUserFormValues = {
	active: boolean;
	birthDate: string;
	dni: string;
	email: string;
	gender: GenderFormValue;
	name: string;
	password: string;
};

export type CreateCoachInput = AdminUserFormValues;

export type UpdateAdminUserInput = AdminUserFormValues & {
	id: string;
};

export type AssignCoachInput = {
	coachId: string | null;
	studentId: string;
};

export type AdminUserInitialValues = {
	active: boolean;
	birthDate?: Date | string | null;
	dni: number | string;
	email: string;
	gender?: GenderValue | null;
	name: string;
};

export type ToggleUserStatusInput = {
	active: boolean;
	id: string;
};

export type DeleteAdminUserInput = {
	id: string;
};

export function isValidEmail( value: string ) {
	return isValidStudentEmail( value );
}

function normalizeGender( value: GenderFormValue ) {
	return isGenderValue( value ) ? value : null;
}

export function parsePositiveInteger( value: string, fieldLabel: string ) {
	const normalizedValue = value.trim();

	if (!/^\d+$/.test( normalizedValue )) {
		throw new Error( `${ fieldLabel } debe ser numerico.` );
	}

	const parsedValue = Number( normalizedValue );

	if (!Number.isSafeInteger( parsedValue ) || parsedValue <= 0) {
		throw new Error( `${ fieldLabel } debe ser mayor a 0.` );
	}

	return parsedValue;
}

export function getDefaultAdminUserFormValues(): AdminUserFormValues {
	return {
		active: true,
		birthDate: "",
		dni: "",
		email: "",
		gender: NO_GENDER,
		name: "",
		password: "",
	};
}

export function getInitialAdminUserFormValues( user?: AdminUserInitialValues ): AdminUserFormValues {
	return {
		...getDefaultAdminUserFormValues(),
		active: user?.active ?? true,
		birthDate: formatDateInputValue( user?.birthDate ),
		dni: user?.dni === undefined || user?.dni === null ? "" : String( user.dni ),
		email: user?.email ?? "",
		gender: user?.gender ?? NO_GENDER,
		name: user?.name ?? "",
		password: "",
	};
}

export function validateCreateCoachInput( input: CreateCoachInput ) {
	const name = input.name.trim();
	const email = input.email.trim().toLowerCase();
	const password = input.password.trim();

	if (name.length < 2) {
		throw new Error( "El nombre del coach debe tener al menos 2 caracteres." );
	}

	if (!isValidEmail( email )) {
		throw new Error( "Ingresa un email valido." );
	}

	if (password.length < 6) {
		throw new Error( "La contrasenia debe tener al menos 6 caracteres." );
	}

	return {
		birthDate: parseBirthDate( input.birthDate ),
		email,
		gender: normalizeGender( input.gender ),
		name,
		password,
		userData: {
			active: input.active,
			dni: parsePositiveInteger( input.dni, "El DNI" ),
			role: "COACH" as const,
		},
	};
}

export function validateUpdateAdminUserInput( input: UpdateAdminUserInput ) {
	const name = input.name.trim();
	const email = input.email.trim().toLowerCase();
	const password = input.password.trim();

	if (name.length < 2) {
		throw new Error( "El nombre del usuario debe tener al menos 2 caracteres." );
	}

	if (!isValidEmail( email )) {
		throw new Error( "Ingresa un email valido." );
	}

	return {
		birthDate: parseBirthDate( input.birthDate ),
		id: input.id,
		password,
		userData: {
			active: input.active,
			gender: normalizeGender( input.gender ),
			dni: parsePositiveInteger( input.dni, "El DNI" ),
			email,
			name,
		},
	};
}
