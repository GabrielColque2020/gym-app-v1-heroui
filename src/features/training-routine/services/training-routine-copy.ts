export type TrainingRoutineCopySourceInput = {
	month: number;
	studentId: string;
	year: number;
};

export type CopyTrainingRoutineMonthInput = {
	destinationMonth: number;
	destinationYear: number;
	sourceMonth: number;
	// De quien se copia. Sin indicar, el origen es el mismo estudiante destino.
	sourceStudentId?: string;
	sourceYear: number;
	studentId: string;
};

export type LatestTrainingRoutineMonthInput = TrainingRoutineCopySourceInput & {
	// Incluye el propio mes indicado, no solo los anteriores.
	inclusive?: boolean;
};

export function getCopySourceStudentId( input: CopyTrainingRoutineMonthInput ) {
	return input.sourceStudentId?.trim() || input.studentId;
}

export type WeekMapping = {
	destinationWeek: number;
	sourceWeek: number;
};

export type CopyTrainingRoutineWeeksInput = CopyTrainingRoutineMonthInput & {
	weekMappings: WeekMapping[];
};

export function validateCopySourceInput( input: TrainingRoutineCopySourceInput ) {
	if (!input.studentId.trim()) {
		throw new Error( "Seleccioná un estudiante válido." );
	}

	if (!Number.isInteger( input.month ) || input.month < 1 || input.month > 12) {
		throw new Error( "El mes seleccionado no es válido." );
	}

	if (!Number.isInteger( input.year ) || input.year < 2000 || input.year > 2100) {
		throw new Error( "El año seleccionado no es válido." );
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

	// Entre estudiantes distintos el mismo mes es un origen valido.
	const isSameStudent = getCopySourceStudentId( input ) === input.studentId;

	if (isSameStudent && input.sourceMonth === input.destinationMonth && input.sourceYear === input.destinationYear) {
		throw new Error( "No podés copiar desde el mismo mes destino." );
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
