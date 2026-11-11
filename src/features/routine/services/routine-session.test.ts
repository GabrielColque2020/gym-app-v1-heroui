import { describe, expect, it } from "vitest";

import {
	mapStudentRoutineSessionDetailToSession,
	type StudentRoutineProgressEntry,
	type StudentRoutineSessionDetail,
} from "@/features/routine/services/routine-session";

const EXERCISE_ID = "press-banca";

function entry( overrides: Partial<StudentRoutineProgressEntry> ): StudentRoutineProgressEntry {
	return {
		date: "2026-11-01T10:00:00.000Z",
		dayNumber: 1,
		exerciseId: EXERCISE_ID,
		id: `${ overrides.dayNumber }-${ overrides.week }-${ overrides.repsNumber }`,
		month: 11,
		notes: null,
		repsCompleted: "0",
		repsNumber: 1,
		setsCompleted: "1",
		variantExerciseId: null,
		week: 1,
		weightUsed: "0",
		year: 2026,
		...overrides,
	};
}

function buildDetail( dayNumber: number, progressEntries: StudentRoutineProgressEntry[] ) {
	return {
		dayNumber,
		id: `semana-2-dia-${ dayNumber }`,
		isFinalized: false,
		progressEntries,
		routines: [ {
			exercise: { id: EXERCISE_ID, name: "Press de banca" },
			exerciseId: EXERCISE_ID,
			id: "slot-1",
			observation: null,
			order: 1,
			reps: "4",
			restSeconds: null,
			sets: "1",
			variants: [],
		} ],
		trainingRoutine: { month: 11, name: "Semana 2", objective: null, week: 2, year: 2026 },
	} as unknown as StudentRoutineSessionDetail;
}

// Semana 1: dia 1 pesado (4 reps, 70 kg) y dia 3 liviano (8 reps, 60 kg).
const weekOneEntries = [
	entry( { date: "2026-11-02T10:00:00.000Z", dayNumber: 1, repsCompleted: "4", weightUsed: "70" } ),
	entry( { date: "2026-11-04T10:00:00.000Z", dayNumber: 3, repsCompleted: "8", weightUsed: "60" } ),
];

describe( "sesion anterior de un ejercicio", () => {
	it( "usa el mismo dia de la semana anterior aunque haya una sesion mas reciente en otro dia", () => {
		const session = mapStudentRoutineSessionDetailToSession( buildDetail( 1, weekOneEntries ) );
		const [ exercise ] = session.exercises;

		expect( exercise.lastSession?.dayNumber ).toBe( 1 );
		expect( exercise.lastSession?.isFromOtherDay ).toBe( false );
		expect( exercise.sets[ 0 ] ).toMatchObject( { previousReps: 4, previousWeight: 70 } );
	} );

	it( "usa el dia 3 anterior al entrar al dia 3", () => {
		const session = mapStudentRoutineSessionDetailToSession( buildDetail( 3, weekOneEntries ) );

		expect( session.exercises[ 0 ].sets[ 0 ] ).toMatchObject( { previousReps: 8, previousWeight: 60 } );
	} );

	it( "si el ejercicio nunca se hizo ese dia, usa la ultima vez que se hizo", () => {
		const session = mapStudentRoutineSessionDetailToSession( buildDetail( 5, weekOneEntries ) );

		expect( session.exercises[ 0 ].sets[ 0 ] ).toMatchObject( { previousReps: 8, previousWeight: 60 } );
		expect( session.exercises[ 0 ].lastSession ).toMatchObject( { dayNumber: 3, isFromOtherDay: true, week: 1 } );
	} );
} );
