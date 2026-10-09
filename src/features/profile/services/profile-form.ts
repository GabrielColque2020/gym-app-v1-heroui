import {
	NO_GENDER,
	emptyToNull,
	isGenderValue,
	isValidEmail,
	parseBirthDate,
	parseNonNegativeNumber,
	parsePositiveInteger,
	type GenderFormValue,
} from "@/features/students/services/student-form";

// El mismo minimo que pide la ficha del estudiante al ponerle una contraseña.
export const MIN_PASSWORD_LENGTH = 6;

export type ProfileFormValues = {
	birthDate: string;
	dni: string;
	email: string;
	gender: GenderFormValue;
	name: string;
	// Medidas y objetivo: solo los manda el estudiante.
	height: string;
	objective: string;
	weight: string;
};

export type UpdateOwnProfileInput = ProfileFormValues & {
	// Se pide solo si cambia el email o el DNI, que son con lo que se entra.
	currentPassword: string;
};

export type ChangeOwnPasswordInput = {
	currentPassword: string;
	newPassword: string;
};

export function validateProfileInput( input: UpdateOwnProfileInput ) {
	const name = input.name.trim();
	const email = input.email.trim().toLowerCase();

	if (name.length < 2) {
		throw new Error( "El nombre debe tener al menos 2 caracteres." );
	}

	if (!isValidEmail( email )) {
		throw new Error( "Ingresá un email válido." );
	}

	const dni = parsePositiveInteger( input.dni, "El DNI" );
	const birthDate = parseBirthDate( input.birthDate );
	const gender = input.gender === NO_GENDER ? null : input.gender;

	if (gender !== null && !isGenderValue( gender )) {
		throw new Error( "Seleccioná un género válido." );
	}

	return {
		bodyData: {
			height: parseNonNegativeNumber( input.height, "La altura" ),
			objective: emptyToNull( input.objective ),
			weight: parseNonNegativeNumber( input.weight, "El peso" ),
		},
		userData: {
			birthDate,
			dni,
			email,
			gender,
			name,
		},
	};
}
