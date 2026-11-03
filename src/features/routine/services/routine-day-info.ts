// Titulo y nota de un dia de rutina: lo que se trabaja ("Pecho + espalda +
// brazos") y las indicaciones para el estudiante ("La banca tiene prioridad").
export const ROUTINE_DAY_TITLE_MAX_LENGTH = 60;
export const ROUTINE_DAY_NOTE_MAX_LENGTH = 600;

// Vacios quedan en `null`: un titulo de espacios no es un titulo.
export function normalizeRoutineDayInfo( input: { note?: string | null; title?: string | null } ) {
	const title = input.title?.trim() || null;
	const note = input.note?.trim() || null;

	if (title && title.length > ROUTINE_DAY_TITLE_MAX_LENGTH) {
		throw new Error( `El título del día puede tener hasta ${ ROUTINE_DAY_TITLE_MAX_LENGTH } caracteres.` );
	}

	if (note && note.length > ROUTINE_DAY_NOTE_MAX_LENGTH) {
		throw new Error( `La nota del día puede tener hasta ${ ROUTINE_DAY_NOTE_MAX_LENGTH } caracteres.` );
	}

	return { note, title };
}
