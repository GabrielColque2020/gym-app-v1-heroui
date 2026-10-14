import { MONTH_OPTIONS } from "@/constants/months";
import { APP_TIME_ZONE, getAppCurrentMonth, getAppCurrentYear } from "@/lib/app-date";

export { MONTH_OPTIONS };

export function buildYearOptions() {
	const currentYear = getAppCurrentYear();

	return Array.from( { length: 8 }, ( _, index ) => {
		const optionYear = currentYear - 3 + index;

		return {
			label: String( optionYear ),
			value: String( optionYear ),
		};
	} );
}

// En hora argentina, corra donde corra: ver `app-date`.
export const getCurrentMonth = getAppCurrentMonth;
export const getCurrentYear = getAppCurrentYear;

export function formatHistoryDate( date: string | Date ) {
	return new Intl.DateTimeFormat( "es-AR", {
		dateStyle: "medium",
		timeZone: APP_TIME_ZONE,
	} ).format( new Date( date ) );
}
