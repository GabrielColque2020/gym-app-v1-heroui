import { describe, expect, it } from "vitest";

import type { ExerciseListItem } from "@/features/exercises/types/exercise-list-item";
import { createDraftRoutineExercise } from "@/features/routine/services/routine-day-editor";
import { appendDraftExercise, removeDraftExercise } from "@/features/routine/stores/routine-day-draft-store.utils";

function exercise( id: string ) {
	return { id, name: id } as ExerciseListItem;
}

function day( ...ids: string[] ) {
	return ids.map( ( id, index ) => createDraftRoutineExercise( exercise( id ), index + 1 ) );
}

function names( draft: { exerciseId: string; order: number }[] ) {
	return draft.map( ( routine ) => `${ routine.order }:${ routine.exerciseId }` );
}

describe( "orden de los ejercicios del día", () => {
	it( "un orden ocupado mete el ejercicio ahí y baja a los de abajo", () => {
		const result = appendDraftExercise( day( "a", "b", "c" ), exercise( "x" ), 2 );

		expect( result.error ).toBeUndefined();
		expect( names( result.draft ?? [] ) ).toEqual( [ "1:a", "2:x", "3:b", "4:c" ] );
		expect( result.routine?.order ).toBe( 2 );
	} );

	it( "un orden pasado el último lo deja al final, sin huecos", () => {
		const result = appendDraftExercise( day( "a", "b" ), exercise( "x" ), 9 );

		expect( names( result.draft ?? [] ) ).toEqual( [ "1:a", "2:b", "3:x" ] );
	} );

	it( "quitar uno no deja huecos", () => {
		const draft = day( "a", "b", "c" );

		expect( names( removeDraftExercise( draft, draft[ 1 ].clientId ) ) ).toEqual( [ "1:a", "2:c" ] );
	} );

	it( "no deja repetir un ejercicio", () => {
		expect( appendDraftExercise( day( "a" ), exercise( "a" ), 1 ).error ).toBeDefined();
	} );
} );
