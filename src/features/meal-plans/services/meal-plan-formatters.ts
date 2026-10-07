export const MEAL_TIME_OPTIONS = [
	{ label: "Desayuno", value: "BREAKFAST" },
	{ label: "Almuerzo", value: "LUNCH" },
	{ label: "Merienda", value: "SNACK" },
	{ label: "Cena", value: "DINNER" },
	{ label: "Opción verde", value: "OPTIONGREEN" },
	{ label: "Varios", value: "SEVERAL" },
] as const;

export type MealTimeValue = ( typeof MEAL_TIME_OPTIONS )[ number ][ "value" ];

const MEAL_TIME_VALUES = MEAL_TIME_OPTIONS.map( ( option ) => option.value );

export function isMealTimeValue( value: string ): value is MealTimeValue {
	return MEAL_TIME_VALUES.includes( value as MealTimeValue );
}

export function formatMealTime( mealTime: MealTimeValue ) {
	return MEAL_TIME_OPTIONS.find( ( option ) => option.value === mealTime )?.label ?? mealTime;
}

// Las comidas se muestran como transcurre el dia, sin importar en que orden se
// cargaron. MEAL_TIME_OPTIONS ya esta en ese orden: desayuno, almuerzo,
// merienda, cena y, al final, opcion verde y varios. Dos comidas del mismo tipo
// conservan entre si el orden de carga.
export function sortMealPlansByMealTime<TMealPlan extends { order: number; title: string }>( mealPlans: TMealPlan[] ) {
	const getMealTimeRank = ( title: string ) => {
		const rank = MEAL_TIME_VALUES.indexOf( title as MealTimeValue );

		return rank === -1 ? MEAL_TIME_VALUES.length : rank;
	};

	return [ ...mealPlans ].sort( ( left, right ) =>
		getMealTimeRank( left.title ) - getMealTimeRank( right.title ) || left.order - right.order
	);
}

export function formatMealPlanDescriptionLines( description: string ) {
	return description
		.split( /\r?\n/ )
		.map( ( line ) => line.trim().replace( /^\*\s*/, "" ) )
		.filter( Boolean );
}
