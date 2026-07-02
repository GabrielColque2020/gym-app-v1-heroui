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

export const RECENT_ACTIVITY_WINDOW_DAYS = 14;

type MapCoachDashboardStudentInput = {
	active: boolean;
	dni: number;
	email: string;
	hasMealPlan: boolean;
	hasRoutineThisMonth: boolean;
	id: string;
	lastMealPlanUpdatedAt: Date | null;
	lastProgressAt: Date | null;
	lastRoutineMonth: {
		month: number;
		year: number;
	} | null;
	name: string;
	recentActivityCutoff: Date;
};

export function buildMonthYearLabel( month: number, year: number ) {
	return `${ MONTH_LABELS[ month - 1 ] ?? String( month ).padStart( 2, "0" ) } ${ year }`;
}

export function isRecentActivityStale( lastProgressAt: Date | null, recentActivityCutoff: Date ) {
	if (!lastProgressAt) {
		return true;
	}

	return lastProgressAt < recentActivityCutoff;
}

export function mapCoachDashboardStudent( {
	active,
	dni,
	email,
	hasMealPlan,
	hasRoutineThisMonth,
	id,
	lastMealPlanUpdatedAt,
	lastProgressAt,
	lastRoutineMonth,
	name,
	recentActivityCutoff,
}: MapCoachDashboardStudentInput ) {
	const needsRecentActivityAttention = active && isRecentActivityStale( lastProgressAt, recentActivityCutoff );

	return {
		active,
		dni,
		email,
		hasMealPlan,
		hasRoutineThisMonth,
		id,
		lastMealPlanUpdatedAt: lastMealPlanUpdatedAt?.toISOString() ?? null,
		lastProgressAt: lastProgressAt?.toISOString() ?? null,
		lastRoutineMonthLabel: lastRoutineMonth ? buildMonthYearLabel( lastRoutineMonth.month, lastRoutineMonth.year ) : null,
		name,
		needsRecentActivityAttention,
	};
}

export function compareStudentsByPriority<
	TStudent extends {
		active: boolean;
		hasMealPlan: boolean;
		hasRoutineThisMonth: boolean;
		name: string;
		needsRecentActivityAttention: boolean;
	}
>( left: TStudent, right: TStudent ) {
	const getPriority = ( student: TStudent ) => {
		if (!student.active) return 4;
		if (!student.hasRoutineThisMonth) return 0;
		if (!student.hasMealPlan) return 1;
		if (student.needsRecentActivityAttention) return 2;

		return 3;
	};

	return getPriority( left ) - getPriority( right ) || left.name.localeCompare( right.name, "es" );
}
