import { describe, expect, it } from "vitest";

import { type UpdateOwnProfileInput, validateProfileInput } from "@/features/profile/services/profile-form";
import { NO_GENDER } from "@/features/students/services/student-form";

function input( overrides: Partial<UpdateOwnProfileInput> = {} ): UpdateOwnProfileInput {
	return {
		birthDate: "",
		currentPassword: "",
		dni: "30123456",
		email: "Alumno@Mail.com ",
		gender: NO_GENDER,
		height: "",
		name: " Ana Pérez ",
		objective: "",
		weight: "",
		...overrides,
	};
}

describe( "validateProfileInput", () => {
	it( "normaliza el email (es el login) y el nombre", () => {
		const { userData } = validateProfileInput( input() );

		expect( userData.email ).toBe( "alumno@mail.com" );
		expect( userData.name ).toBe( "Ana Pérez" );
		expect( userData.dni ).toBe( 30123456 );
		expect( userData.gender ).toBeNull();
	} );

	it( "rechaza un email o un DNI invalidos", () => {
		expect( () => validateProfileInput( input( { email: "sin-arroba" } ) ) ).toThrow( "Ingresá un email válido." );
		expect( () => validateProfileInput( input( { dni: "abc" } ) ) ).toThrow();
		expect( () => validateProfileInput( input( { dni: "-5" } ) ) ).toThrow();
	} );

	it( "pide un nombre de al menos 2 letras", () => {
		expect( () => validateProfileInput( input( { name: " a " } ) ) ).toThrow( "al menos 2 caracteres" );
	} );

	it( "las medidas vacias quedan en 0 (sin cargar), y negativas no", () => {
		// En la base altura y peso no aceptan vacio: 0 es "sin cargar", y la ficha
		// del estudiante no lo muestra.
		expect( validateProfileInput( input() ).bodyData ).toEqual( { height: 0, objective: null, weight: 0 } );
		expect( validateProfileInput( input( { height: "170", weight: "70.5" } ) ).bodyData ).toMatchObject( { height: 170, weight: 70.5 } );
		expect( () => validateProfileInput( input( { weight: "-1" } ) ) ).toThrow();
	} );
} );
