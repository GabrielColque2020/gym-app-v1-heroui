import { MONTH_OPTIONS } from "@/constants/months";

export { MONTH_OPTIONS };

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
