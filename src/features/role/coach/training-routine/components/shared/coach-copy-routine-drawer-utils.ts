import { monthYearLabel, padMonth } from "@/constants/months";
import { getAppCurrentYear } from "@/lib/app-date";

export function buildYearOptions() {
	const currentYear = getAppCurrentYear();

	return Array.from( { length: 8 }, ( _, i ) => ( {
		label: ( currentYear - 3 + i ).toString(),
		value: ( currentYear - 3 + i ).toString(),
	} ) );
}

export function weekListLabel( weeks: string[] ) {
	if (weeks.length === 0) return "-";

	return weeks.map( ( week ) => `Semana ${ week }` ).join( ", " );
}

export { monthYearLabel, padMonth };

