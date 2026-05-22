/**
 * Demo rutinas: clave `YYYY-MM` → cuántas semanas (1–4) tienen contenido en ese mes.
 * Claves ausentes = sin rutina (vacío en el drawer).
 *
 * Historia Mayo: destino Mayo 2026 con rutina parcial (ver filter `destinationWeeksOccupied`);
 * origen típico Abril 2026 (4 semanas) para probar “Copiar mes” y “Copiar semanas”.
 */
export const DEMO_ROUTINE_WEEKS_BY_MONTH: Record<string, number> = {
	"2026-01": 4,
	"2026-02": 3,
	"2026-03": 4,
	/** Abril → buen origen hacia Mayo (misma intensidad, 4 semanas). */
	"2026-04": 4,
	/** Mayo: rutina completa de ejemplo (cuatro semanas cargadas). */
	"2026-05": 4,
	"2026-06": 2,
};

/**
 * Días de entrenamiento por semana (índice 0 = Semana 1 …) solo para la demo UI.
 */
export const DEMO_DAYS_PER_WEEK: Record<string, readonly number[]> = {
	"2026-03": [ 4, 4, 5, 5 ],
	"2026-04": [ 4, 5, 4, 5 ],
	/** Mayo 2026: variación visible al copiar por semana. */
	"2026-05": [ 5, 4, 6, 4 ],
	"2026-06": [ 5, 5, 0, 0 ],
};

export const MONTH_OPTIONS = [
	{ value: "01", label: "Enero" },
	{ value: "02", label: "Febrero" },
	{ value: "03", label: "Marzo" },
	{ value: "04", label: "Abril" },
	{ value: "05", label: "Mayo" },
	{ value: "06", label: "Junio" },
	{ value: "07", label: "Julio" },
	{ value: "08", label: "Agosto" },
	{ value: "09", label: "Septiembre" },
	{ value: "10", label: "Octubre" },
	{ value: "11", label: "Noviembre" },
	{ value: "12", label: "Diciembre" },
] as const;

export function padMonth( month: string ) {
	const m = month.replace( /^0+/, "" ) || month;
	const n = Number( m );
	if (!n || n < 1 || n > 12) return "";
	return n.toString().padStart( 2, "0" );
}

export function monthYearLabel( month: string, year: string ) {
	const p = padMonth( month );
	const opt = MONTH_OPTIONS.find( ( o ) => o.value === p );
	if (!opt || !year) return "";
	return `${ opt.label } ${ year }`;
}

export function ymKey( year: string, month: string ) {
	const p = padMonth( month );
	if (!year || !p) return "";
	return `${ year }-${ p }`;
}

export type WeekSlot = {
	slot: 1 | 2 | 3 | 4;
	rangeLabel: string;
};

export function buildWeekSlots( yearStr: string, monthStr: string ): WeekSlot[] | null {
	const y = Number( yearStr );
	const m = Number( padMonth( monthStr ) );
	if (!y || m < 1 || m > 12) return null;
	const lastDay = new Date( y, m, 0 ).getDate();
	const monthLabel = MONTH_OPTIONS[ m - 1 ]?.label ?? "";
	const ranges: [ number, number ][] = [
		[ 1, Math.min( 7, lastDay ) ],
		[ 8, Math.min( 14, lastDay ) ],
		[ 15, Math.min( 21, lastDay ) ],
		[ 22, lastDay ],
	];
	return ranges.map( ( [], i ) => ( {
		slot: ( i + 1 ) as 1 | 2 | 3 | 4,
		rangeLabel: `${ monthLabel }`,
	} ) );
}

/** Días de entrenamiento demo por semana (solo UI). */
export function demoDaysForWeek( ym: string, weekSlot: number ) {
	const row = DEMO_DAYS_PER_WEEK[ ym ];
	const i = weekSlot - 1;
	if (row && i >= 0 && i < row.length && row[ i ] > 0) return row[ i ];
	return 3 + ( weekSlot % 3 );
}
