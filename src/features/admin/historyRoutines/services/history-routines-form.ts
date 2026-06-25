export const MONTH_OPTIONS = [
	{ value: "1", label: "Enero" },
	{ value: "2", label: "Febrero" },
	{ value: "3", label: "Marzo" },
	{ value: "4", label: "Abril" },
	{ value: "5", label: "Mayo" },
	{ value: "6", label: "Junio" },
	{ value: "7", label: "Julio" },
	{ value: "8", label: "Agosto" },
	{ value: "9", label: "Septiembre" },
	{ value: "10", label: "Octubre" },
	{ value: "11", label: "Noviembre" },
	{ value: "12", label: "Diciembre" },
] as const;

export function buildYearOptions() {
	const currentYear = new Date().getFullYear();

	return Array.from( { length: 8 }, ( _, index ) => {
		const optionYear = currentYear - 3 + index;

		return {
			label: String( optionYear ),
			value: String( optionYear ),
		};
	} );
}

export function getCurrentMonth() {
	return new Date().getMonth() + 1;
}

export function getCurrentYear() {
	return new Date().getFullYear();
}

export function formatHistoryDate( date: string | Date ) {
	return new Intl.DateTimeFormat( "es-AR", {
		dateStyle: "medium",
		timeZone: "America/Argentina/Buenos_Aires",
	} ).format( new Date( date ) );
}
