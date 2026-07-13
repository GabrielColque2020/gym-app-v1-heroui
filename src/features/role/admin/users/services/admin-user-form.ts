export type AdminUserFormValues = {
	active: boolean;
	dni: string;
	email: string;
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
	dni: number | string;
	email: string;
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
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test( value.trim() );
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
		dni: "",
		email: "",
		name: "",
		password: "",
	};
}

export function getInitialAdminUserFormValues( user?: AdminUserInitialValues ) {
	return {
		...getDefaultAdminUserFormValues(),
		active: user?.active ?? true,
		dni: user?.dni === undefined || user?.dni === null ? "" : String( user.dni ),
		email: user?.email ?? "",
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
		email,
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
		id: input.id,
		password,
		userData: {
			active: input.active,
			dni: parsePositiveInteger( input.dni, "El DNI" ),
			email,
			name,
		},
	};
}
