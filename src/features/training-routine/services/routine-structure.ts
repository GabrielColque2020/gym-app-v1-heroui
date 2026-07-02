import type { TrainingRoutinesByStudent } from "@/features/training-routine/services/training-routines-query";

export const MAX_ROUTINE_WEEKS = 4;
export const MAX_ROUTINE_DAYS = 6;

export const WEEK_OPTIONS = Array.from( { length: MAX_ROUTINE_WEEKS }, ( _, index ) => {
	const week = index + 1;

	return {
		label: `Semana ${ week }`,
		value: String( week ),
		week,
	};
} );

export const DAY_OPTIONS = Array.from( { length: MAX_ROUTINE_DAYS }, ( _, index ) => {
	const day = index + 1;

	return {
		day,
		label: `Dia ${ day }`,
		value: String( day ),
	};
} );

export type RoutineStructureWeekInput = {
	days: number[];
	week: number;
};

export type RoutineStructureInput = {
	month: number;
	studentId: string;
	weeks: RoutineStructureWeekInput[];
	year: number;
};

export type RoutineStructureScopeInput = {
	month: number;
	studentId: string;
	year: number;
};

export function validateRoutineStructureScopeInput( input: RoutineStructureScopeInput ) {
	if (!input.studentId.trim()) {
		throw new Error( "Selecciona un estudiante valido." );
	}

	if (!Number.isInteger( input.month ) || input.month < 1 || input.month > 12) {
		throw new Error( "El mes seleccionado no es valido." );
	}

	if (!Number.isInteger( input.year ) || input.year < 2000 || input.year > 2100) {
		throw new Error( "El anio seleccionado no es valido." );
	}
}

export function validateRoutineStructureInput( input: RoutineStructureInput ) {
	validateRoutineStructureScopeInput( input );

	if (input.weeks.length === 0 || input.weeks.length > MAX_ROUTINE_WEEKS) {
		throw new Error( `Selecciona entre 1 y ${ MAX_ROUTINE_WEEKS } semanas.` );
	}

	const weekSet = new Set<number>();

	for (const week of input.weeks) {
		if (!Number.isInteger( week.week ) || week.week < 1 || week.week > MAX_ROUTINE_WEEKS) {
			throw new Error( "Las semanas deben estar entre 1 y 4." );
		}

		if (weekSet.has( week.week )) {
			throw new Error( "No puede haber semanas duplicadas." );
		}

		weekSet.add( week.week );

		if (week.days.length === 0 || week.days.length > MAX_ROUTINE_DAYS) {
			throw new Error( `Cada semana debe tener entre 1 y ${ MAX_ROUTINE_DAYS } dias.` );
		}

		const daySet = new Set<number>();

		for (const day of week.days) {
			if (!Number.isInteger( day ) || day < 1 || day > MAX_ROUTINE_DAYS) {
				throw new Error( "Los dias deben estar entre 1 y 6." );
			}

			if (daySet.has( day )) {
				throw new Error( "No puede haber dias duplicados en una semana." );
			}

			daySet.add( day );
		}
	}
}

export function buildSelectedWeeks( routines: TrainingRoutinesByStudent[ "routines" ] ) {
	return routines
		.map( ( routine ) => String( routine.week ) )
		.sort( ( a, b ) => Number( a ) - Number( b ) );
}

export function buildSelectedDays( routines: TrainingRoutinesByStudent[ "routines" ] ) {
	const dayNumbers = new Set<string>();

	for (const routine of routines) {
		for (const day of routine.routineDays) {
			dayNumbers.add( String( day.dayNumber ) );
		}
	}

	return Array.from( dayNumbers ).sort( ( a, b ) => Number( a ) - Number( b ) );
}

export function buildRoutineStructureInput(
	selectedWeeks: string[],
	selectedDays: string[],
	studentId: string,
	month: number,
	year: number,
): RoutineStructureInput {
	const days = selectedDays.map( Number ).sort( ( a, b ) => a - b );

	return {
		month,
		studentId,
		weeks: selectedWeeks
			.map( ( week ) => ( {
				days,
				week: Number( week ),
			} ) )
			.sort( ( a, b ) => a.week - b.week ),
		year,
	};
}

export function getStructureRemovalWarning(
	routines: TrainingRoutinesByStudent[ "routines" ],
	selectedWeeks: string[],
	selectedDays: string[],
) {
	const selectedWeekSet = new Set( selectedWeeks );
	const selectedDaySet = new Set( selectedDays );

	return routines.some( ( routine ) => {
		const weekStillSelected = selectedWeekSet.has( String( routine.week ) );

		if (!weekStillSelected) {
			return routine.routineDays.some( ( day ) => day.routines.length > 0 );
		}

		return routine.routineDays.some( ( day ) => {
			const dayStillSelected = selectedDaySet.has( String( day.dayNumber ) );

			return !dayStillSelected && day.routines.length > 0;
		} );
	} );
}
