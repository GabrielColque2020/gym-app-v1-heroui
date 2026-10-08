import type { RoutineStructureWeekInput } from "@/features/training-routine/services/routine-structure";
import type { TrainingRoutineWeek } from "@/features/training-routine/services/training-routines-by-student";

export const ROUTINE_TEMPLATE_NAME_MAX_LENGTH = 60;

export type SaveRoutineAsTemplateInput = {
	month: number;
	name: string;
	studentId: string;
	year: number;
};

// Los motivos por los que no se guarda una plantilla van como dato y no como
// error: en produccion el mensaje de un error del servidor no llega a la
// pantalla, y aca hace falta decirle al entrenador que corregir.
export type SaveRoutineAsTemplateResult =
	| { ok: true; template: { dayCount: number; exerciseCount: number; id: string; name: string; weekCount: number } }
	| { ok: false; reason: "duplicate-name" | "empty-routine" | "invalid-name" };

export type RoutineTemplateListItem = {
	dayCount: number;
	exerciseCount: number;
	id: string;
	name: string;
	objective: string | null;
	weekCount: number;
};

export type RoutineTemplateDetail = {
	template: { id: string; name: string; objective: string | null };
	weeks: TrainingRoutineWeek[];
};

export type ApplyRoutineTemplateInput = {
	month: number;
	studentId: string;
	templateId: string;
	year: number;
};

export type CopyRoutineTemplateWeeksInput = ApplyRoutineTemplateInput & {
	// Que semana de la plantilla va a que semana del mes del estudiante.
	weekMappings: Array<{ destinationWeek: number; sourceWeek: number }>;
};

export type ApplyRoutineTemplateResult =
	| { ok: true; templateName: string }
	| { ok: false; reason: "student-not-found" | "template-not-found" };

export type CreateRoutineTemplateInput = {
	name: string;
	objective: string;
	weeks: RoutineStructureWeekInput[];
};

export type CreateRoutineTemplateResult =
	| { id: string; ok: true }
	| { ok: false; reason: "duplicate-name" | "invalid-name" };

export type UpdateRoutineTemplateStructureInput = {
	objective: string;
	templateId: string;
	weeks: RoutineStructureWeekInput[];
};

export type RenameRoutineTemplateResult =
	| { ok: true; name: string }
	| { ok: false; reason: "duplicate-name" | "invalid-name" | "template-not-found" };

export type DuplicateRoutineTemplateResult =
	| { ok: true; name: string }
	| { ok: false; reason: "template-not-found" };

// Nombre para la copia de una plantilla: "X (copia)", "X (copia 2)"... Si no
// entra en el largo maximo, se recorta el nombre original y no el sufijo.
export function buildRoutineTemplateCopyName( name: string, takenNames: string[] ) {
	const taken = new Set( takenNames.map( ( takenName ) => takenName.toLowerCase() ) );

	for (let copyNumber = 1; ; copyNumber++) {
		const suffix = copyNumber === 1 ? " (copia)" : ` (copia ${ copyNumber })`;
		const candidate = `${ name.slice( 0, ROUTINE_TEMPLATE_NAME_MAX_LENGTH - suffix.length ).trimEnd() }${ suffix }`;

		if (!taken.has( candidate.toLowerCase() )) return candidate;
	}
}

export function normalizeRoutineTemplateName( name: string ) {
	return name.trim().replace( /\s+/g, " " );
}

export function isRoutineTemplateNameValid( name: string ) {
	const normalizedName = normalizeRoutineTemplateName( name );

	return normalizedName.length > 0 && normalizedName.length <= ROUTINE_TEMPLATE_NAME_MAX_LENGTH;
}
