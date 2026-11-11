// Repeticiones en reserva (RIR) que el entrenador pide para un ejercicio. Es
// texto libre ("2", "1-2", "0-1") y corto: va en una etiqueta. Vacio es "sin RIR".
export const RIR_MAX_LENGTH = 10;

export function normalizeRir( value: unknown ): string | null {
	if (typeof value !== "string" && typeof value !== "number") return null;

	const text = String( value ).trim().slice( 0, RIR_MAX_LENGTH ).trim();

	return text || null;
}
