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
	objective: string;
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
		throw new Error( "Seleccioná un estudiante valido." );
	}

	if (!Number.isInteger( input.month ) || input.month < 1 || input.month > 12) {
		throw new Error( "El mes seleccionado no es valido." );
	}

	if (!Number.isInteger( input.year ) || input.year < 2000 || input.year > 2100) {
		throw new Error( "El año seleccionado no es valido." );
	}
}

export function validateRoutineStructureInput( input: RoutineStructureInput ) {
	validateRoutineStructureScopeInput( input );
	if (input.objective.trim().length > 180) {
		throw new Error( "El objetivo mensual no puede superar los 180 caracteres." );
	}

	if (input.weeks.length === 0 || input.weeks.length > MAX_ROUTINE_WEEKS) {
		throw new Error( `Seleccioná entre 1 y ${ MAX_ROUTINE_WEEKS } semanas.` );
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

type RoutineStructureWeek = TrainingRoutinesByStudent["routineMonth"]["weeks"][number];

export function buildSelectedWeeks( routineWeeks: RoutineStructureWeek[] ) {
	return routineWeeks
		.map( ( routineWeek ) => String( routineWeek.week ) )
		.sort( ( a, b ) => Number( a ) - Number( b ) );
}

export function buildSelectedDays( routineWeeks: RoutineStructureWeek[] ) {
	const dayNumbers = new Set<string>();

	for (const routineWeek of routineWeeks) {
		for (const day of routineWeek.routineDays) {
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
	objective: string,
): RoutineStructureInput {
	const days = selectedDays.map( Number ).sort( ( a, b ) => a - b );

	return {
		month,
		objective: objective.trim(),
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
	routineWeeks: RoutineStructureWeek[],
	selectedWeeks: string[],
	selectedDays: string[],
) {
	const selectedWeekSet = new Set( selectedWeeks );
	const selectedDaySet = new Set( selectedDays );

	return routineWeeks.some( ( routineWeek ) => {
		const weekStillSelected = selectedWeekSet.has( String( routineWeek.week ) );

		if (!weekStillSelected) {
			return routineWeek.routineDays.some( ( day ) => day.routines.length > 0 );
		}

		return routineWeek.routineDays.some( ( day ) => {
			const dayStillSelected = selectedDaySet.has( String( day.dayNumber ) );

			return !dayStillSelected && day.routines.length > 0;
		} );
	} );
}
