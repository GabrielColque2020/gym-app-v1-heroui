export type TrainingRoutineCopySourceInput = {
	month: number;
	studentId: string;
	year: number;
};

export type CopyTrainingRoutineMonthInput = {
	destinationMonth: number;
	destinationYear: number;
	sourceMonth: number;
	sourceYear: number;
	studentId: string;
};

export type WeekMapping = {
	destinationWeek: number;
	sourceWeek: number;
};

export type CopyTrainingRoutineWeeksInput = CopyTrainingRoutineMonthInput & {
	weekMappings: WeekMapping[];
};

export function validateCopySourceInput( input: TrainingRoutineCopySourceInput ) {
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

export function validateCopyMonthInput( input: CopyTrainingRoutineMonthInput ) {
	validateCopySourceInput( {
		month: input.sourceMonth,
		studentId: input.studentId,
		year: input.sourceYear,
	} );
	validateCopySourceInput( {
		month: input.destinationMonth,
		studentId: input.studentId,
		year: input.destinationYear,
	} );

	if (input.sourceMonth === input.destinationMonth && input.sourceYear === input.destinationYear) {
		throw new Error( "No podes copiar desde el mismo mes destino." );
	}
}

export function validateCopyWeeksInput( input: CopyTrainingRoutineWeeksInput ) {
	validateCopySourceInput( {
		month: input.sourceMonth,
		studentId: input.studentId,
		year: input.sourceYear,
	} );
	validateCopySourceInput( {
		month: input.destinationMonth,
		studentId: input.studentId,
		year: input.destinationYear,
	} );

	if (input.weekMappings.length === 0) {
		throw new Error( "Seleccioná al menos una semana para copiar." );
	}

	const destinationWeeks = new Set<number>();

	for (const mapping of input.weekMappings) {
		if (!Number.isInteger( mapping.sourceWeek ) || mapping.sourceWeek < 1 || mapping.sourceWeek > 4) {
			throw new Error( "Las semanas de origen deben estar entre 1 y 4." );
		}

		if (!Number.isInteger( mapping.destinationWeek ) || mapping.destinationWeek < 1 || mapping.destinationWeek > 4) {
			throw new Error( "Las semanas de destino deben estar entre 1 y 4." );
		}

		if (destinationWeeks.has( mapping.destinationWeek )) {
			throw new Error( "No puede haber semanas destino duplicadas." );
		}

		destinationWeeks.add( mapping.destinationWeek );
	}
}

export const trainingRoutineCopySourceQueryKey = ( studentId: string, month: number, year: number ) =>
	[ "coach-training-routine-copy-source", studentId, month, year ] as const;
