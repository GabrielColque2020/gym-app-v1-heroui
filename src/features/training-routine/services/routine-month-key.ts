// Clave de un mes de rutina ("2026-10"). Va en un archivo aparte porque la usan
// la consulta del servidor y el selector de mes del navegador.
export function routineMonthKey( month: number, year: number ) {
	return `${ year }-${ month }`;
}
