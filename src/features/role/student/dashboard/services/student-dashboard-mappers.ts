const MONTH_LABELS = [
	"Enero",
	"Febrero",
	"Marzo",
	"Abril",
	"Mayo",
	"Junio",
	"Julio",
	"Agosto",
	"Septiembre",
	"Octubre",
	"Noviembre",
	"Diciembre",
] as const;

type DashboardRoutineDayInput = {
	dayNumber: number;
	exerciseCount: number;
	hasProgress: boolean;
	id: string;
	isFinalized: boolean;
	title: string;
	week: number;
};

export function buildMonthYearLabel( month: number, year: number ) {
	return `${ MONTH_LABELS[ month - 1 ] ?? String( month ).padStart( 2, "0" ) } ${ year }`;
}

export function formatDateLabel( date: string | null ) {
	if (!date) {
		return "Sin registros";
	}

	return new Intl.DateTimeFormat( "es-AR", {
		dateStyle: "medium",
		timeZone: "UTC",
	} ).format( new Date( date ) );
}

export function formatLastProgressLabel( date: string | null ) {
	return date ? formatDateLabel( date ) : "Sin progreso guardado";
}

export function formatLastRecordedMonthLabel(
	monthYear: { month: number; year: number } | null,
) {
	if (!monthYear) {
		return "Sin historial";
	}

	return buildMonthYearLabel( monthYear.month, monthYear.year );
}

export function selectNextRoutineDay( days: DashboardRoutineDayInput[] ) {
	if (days.length === 0) {
		return null;
	}

	// Primero el dia que dejo empezado; si no hay, el primero que todavia no hizo.
	// Un dia sin ejercicios no es una sesion: se saltea.
	const trainableDays = days.filter( ( day ) => day.exerciseCount > 0 );

	return trainableDays.find( ( day ) => !day.isFinalized && day.hasProgress )
		?? trainableDays.find( ( day ) => !day.isFinalized )
		?? trainableDays[ 0 ]
		?? days[ 0 ];
}
