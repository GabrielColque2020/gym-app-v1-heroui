import {
	NO_GENDER,
	emptyToNull,
	isGenderValue,
	isValidEmail,
	parseBirthDate,
	parseNonNegativeNumber,
	parsePositiveInteger,
	type CreateStudentInput,
	type UpdateStudentInput,
} from "@/features/students/services/student-form";

export function validateStudentInput( input: CreateStudentInput | UpdateStudentInput, mode: "create" | "edit" ) {
	const name = input.name.trim();
	const email = input.email.trim().toLowerCase();
	const password = input.password.trim();

	if (name.length < 2) {
		throw new Error( "El nombre del estudiante debe tener al menos 2 caracteres." );
	}

	if (!isValidEmail( email )) {
		throw new Error( "Ingresa un email valido." );
	}

	if (mode === "create" && password.length < 1) {
		throw new Error( "La contrasenia es obligatoria al crear un estudiante." );
	}

	const dni = parsePositiveInteger( input.dni, "El DNI" );
	const height = parseNonNegativeNumber( input.height, "La altura" );
	const weight = parseNonNegativeNumber( input.weight, "El peso" );
	const birthDate = parseBirthDate( input.birthDate );
	const gender = input.gender === NO_GENDER ? null : input.gender;

	if (gender !== null && !isGenderValue( gender )) {
		throw new Error( "Selecciona un genero valido." );
	}

	return {
		descriptionData: {
			birthDate,
			height,
			objective: emptyToNull( input.objective ),
			observations: emptyToNull( input.observations ),
			weight,
		},
		password,
		userData: {
			active: input.active,
			dni,
			email,
			gender,
			name,
			role: "STUDENT" as const,
		},
	};
}

export function buildStudentStatusUpdateData( active: boolean ) {
	return {
		active,
	};
}
