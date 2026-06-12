export const GENDER_OPTIONS = [
	{ label: "Femenino", value: "F" },
	{ label: "Masculino", value: "M" },
	{ label: "Otro", value: "O" },
] as const;

export const NO_GENDER = "NONE";

export type GenderValue = (typeof GENDER_OPTIONS)[ number ][ "value" ];
export type GenderFormValue = GenderValue | typeof NO_GENDER;

export const ALL_STATUSES = "ALL";
export const ACTIVE_STATUS = "ACTIVE";
export const INACTIVE_STATUS = "INACTIVE";

export type StudentStatusFilter = typeof ALL_STATUSES | typeof ACTIVE_STATUS | typeof INACTIVE_STATUS;

export type StudentFormValues = {
	active: boolean;
	birthDate: string;
	dni: string;
	email: string;
	gender: GenderFormValue;
	height: string;
	name: string;
	objective: string;
	observations: string;
	password: string;
	weight: string;
};

export type CreateStudentInput = StudentFormValues;

export type UpdateStudentInput = StudentFormValues & {
	id: string;
};

const GENDER_VALUES = GENDER_OPTIONS.map( ( option ) => option.value );

export function isGenderValue( value: string ): value is GenderValue {
	return GENDER_VALUES.includes( value as GenderValue );
}

export function formatGender( gender: GenderValue | null ) {
	if (!gender) return "Sin genero";

	return GENDER_OPTIONS.find( ( option ) => option.value === gender )?.label ?? gender;
}

export function normalizeSearchValue( value: string ) {
	return value
		.normalize( "NFD" )
		.replace( /[\u0300-\u036f]/g, "" )
		.toLowerCase()
		.trim()
		.replace( /\s+/g, " " );
}

export function emptyToNull( value: string ) {
	const trimmedValue = value.trim();

	return trimmedValue.length > 0 ? trimmedValue : null;
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

export function parseNonNegativeNumber( value: string, fieldLabel: string ) {
	const normalizedValue = value.trim().replace( ",", "." );

	if (normalizedValue.length === 0) return 0;

	const parsedValue = Number( normalizedValue );

	if (!Number.isFinite( parsedValue ) || parsedValue < 0) {
		throw new Error( `${ fieldLabel } debe ser un numero mayor o igual a 0.` );
	}

	return parsedValue;
}

export function parseBirthDate( value: string ) {
	const normalizedValue = value.trim();

	if (normalizedValue.length === 0) return null;

	const birthDate = new Date( `${ normalizedValue }T00:00:00.000Z` );

	if (Number.isNaN( birthDate.getTime() )) {
		throw new Error( "La fecha de nacimiento no es valida." );
	}

	return birthDate;
}

export function formatDateInputValue( value?: Date | string | null ) {
	if (!value) return "";

	const date = typeof value === "string" ? new Date( value ) : value;

	if (Number.isNaN( date.getTime() )) return "";

	return date.toISOString().slice( 0, 10 );
}

export function isValidEmail( value: string ) {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test( value.trim() );
}
