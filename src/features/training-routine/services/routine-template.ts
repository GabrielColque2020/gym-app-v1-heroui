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

export type ApplyRoutineTemplateInput = {
	month: number;
	studentId: string;
	templateId: string;
	year: number;
};

export type ApplyRoutineTemplateResult =
	| { ok: true; templateName: string }
	| { ok: false; reason: "student-not-found" | "template-not-found" };

export function normalizeRoutineTemplateName( name: string ) {
	return name.trim().replace( /\s+/g, " " );
}

export function isRoutineTemplateNameValid( name: string ) {
	const normalizedName = normalizeRoutineTemplateName( name );

	return normalizedName.length > 0 && normalizedName.length <= ROUTINE_TEMPLATE_NAME_MAX_LENGTH;
}
