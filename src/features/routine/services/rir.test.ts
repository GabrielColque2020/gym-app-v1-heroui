import { describe, expect, it } from "vitest";

import type { ExerciseListItem } from "@/features/exercises/types/exercise-list-item";
import { getRoutineExerciseFieldPatch } from "@/features/routine/hooks/use-routine-day-draft.utils";
import {
	createDraftRoutineExercise,
	isRoutineDayDraftDirty,
	mapDraftToSaveInput,
} from "@/features/routine/services/routine-day-editor";
import { normalizeRir, RIR_MAX_LENGTH } from "@/features/routine/services/rir";
import { patchDraftExercise } from "@/features/routine/stores/routine-day-draft-store.utils";

function draftRow( rir: string | null ) {
	return {
		...createDraftRoutineExercise( { id: "banca", name: "Press de banca" } as ExerciseListItem, 1 ),
		reps: "4",
		rir,
		sets: "3",
	};
}

const savedRow = { exerciseId: "banca", observation: null, order: 1, reps: "4", restSeconds: null, sets: "3" };

describe( "RIR de un ejercicio", () => {
	it( "se guarda recortado, y vacío queda sin RIR", () => {
		expect( normalizeRir( " 1-2 " ) ).toBe( "1-2" );
		expect( normalizeRir( 2 ) ).toBe( "2" );
		expect( normalizeRir( "   " ) ).toBeNull();
		expect( normalizeRir( null ) ).toBeNull();
		expect( normalizeRir( "x".repeat( 30 ) ) ).toHaveLength( RIR_MAX_LENGTH );
	} );

	it( "mientras se escribe conserva los espacios para no comerse el \"1 - 2\"", () => {
		expect( getRoutineExerciseFieldPatch( "rir", "1 " ) ).toEqual( { rir: "1 " } );
		expect( getRoutineExerciseFieldPatch( "rir", null ) ).toEqual( { rir: null } );
	} );

	it( "viaja al guardado del día ya recortado", () => {
		const [ input ] = mapDraftToSaveInput( [ draftRow( " 2 " ) ] );

		expect( input.rir ).toBe( "2" );
		expect( mapDraftToSaveInput( [ draftRow( "" ) ] )[ 0 ].rir ).toBeNull();
	} );

	it( "cambiar el RIR deja el día con cambios sin guardar", () => {
		expect( isRoutineDayDraftDirty( [ draftRow( "2" ) ], [ { ...savedRow, rir: "2" } ] ) ).toBe( false );
		expect( isRoutineDayDraftDirty( [ draftRow( "1-2" ) ], [ { ...savedRow, rir: "2" } ] ) ).toBe( true );
		// Un espacio de más no es un cambio.
		expect( isRoutineDayDraftDirty( [ draftRow( "2 " ) ], [ { ...savedRow, rir: "2" } ] ) ).toBe( false );
	} );

	it( "editar otro campo no borra el RIR, y borrarlo a propósito sí", () => {
		const draft = [ draftRow( "2" ) ];
		const clientId = draft[ 0 ].clientId;

		expect( patchDraftExercise( draft, clientId, { reps: "5" } )[ 0 ].rir ).toBe( "2" );
		expect( patchDraftExercise( draft, clientId, { rir: null } )[ 0 ].rir ).toBeNull();
	} );
} );
