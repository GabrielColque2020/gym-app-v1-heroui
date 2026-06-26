export const MEAL_TIME_OPTIONS = [
	{ label: "Desayuno", value: "BREAKFAST" },
	{ label: "Almuerzo", value: "LUNCH" },
	{ label: "Merienda", value: "SNACK" },
	{ label: "Cena", value: "DINNER" },
	{ label: "Opcion verde", value: "OPTIONGREEN" },
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

export function formatMealPlanDescriptionLines( description: string ) {
	return description
		.split( /\r?\n/ )
		.map( ( line ) => line.trim().replace( /^\*\s*/, "" ) )
		.filter( Boolean );
}
