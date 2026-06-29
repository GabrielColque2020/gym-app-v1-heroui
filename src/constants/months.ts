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

export const MONTH_OPTIONS = MONTH_LABELS.map( ( label, index ) => ( {
	label,
	value: String( index + 1 ),
} ) );

export const MONTH_OPTIONS_PADDED = MONTH_LABELS.map( ( label, index ) => ( {
	label,
	value: String( index + 1 ).padStart( 2, "0" ),
} ) );

export function padMonth( month: string ) {
	const normalizedMonth = month.replace( /^0+/, "" ) || month;
	const monthNumber = Number( normalizedMonth );

	if (!monthNumber || monthNumber < 1 || monthNumber > 12) return "";

	return monthNumber.toString().padStart( 2, "0" );
}

export function monthYearLabel( month: string, year: string ) {
	const paddedMonth = padMonth( month );
	const option = MONTH_OPTIONS_PADDED.find( ( item ) => item.value === paddedMonth );

	if (!option || !year) return "";

	return `${ option.label } ${ year }`;
}
