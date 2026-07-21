import { formatBodyPart, normalizeSearchName, type BodyPartValue } from "@/features/exercises/services/exercise-form";

export type CoachExerciseFormValues = {
	active: boolean;
	bodyPart: BodyPartValue;
	category: string;
	equipment: string;
	imageUrl: string;
	instructions: string;
	muscleGroup: string;
	name: string;
	target: string;
	videoUrl: string;
};

export type CoachExerciseSourceType = "coach" | "global";

export const COACH_EXERCISE_BODY_PART_OPTIONS = [
	{ label: "Pecho", value: "Pecho" },
	{ label: "Espalda", value: "Espalda" },
	{ label: "Piernas", value: "Piernas" },
	{ label: "Triceps", value: "Triceps" },
	{ label: "Biceps", value: "Biceps" },
	{ label: "Hombros", value: "Hombros" },
] as const;

export const COACH_EXERCISE_EQUIPMENT_OPTIONS = [
	{ label: "Peso corporal", value: "Peso corporal" },
	{ label: "Mancuerna", value: "Mancuerna" },
	{ label: "Barra", value: "Barra" },
	{ label: "Barra EZ", value: "Barra EZ" },
	{ label: "Polea", value: "Polea" },
	{ label: "Maquina", value: "Maquina" },
	{ label: "Kettlebell", value: "Kettlebell" },
	{ label: "Banda elastica", value: "Banda elastica" },
	{ label: "Balon medicinal", value: "Balon medicinal" },
	{ label: "Pelota de estabilidad", value: "Pelota de estabilidad" },
	{ label: "Pelota suiza", value: "Pelota suiza" },
	{ label: "Con peso", value: "Con peso" },
	{ label: "Asistido", value: "Asistido" },
] as const;

export const COACH_EXERCISE_TARGET_OPTIONS = [
	{ label: "Abdomen", value: "Abdomen" },
	{ label: "Antebrazos", value: "Antebrazos" },
	{ label: "Biceps", value: "Biceps" },
	{ label: "Brazos", value: "Brazos" },
	{ label: "Espalda", value: "Espalda" },
	{ label: "Gluteos", value: "Gluteos" },
	{ label: "Hombros", value: "Hombros" },
	{ label: "Pecho", value: "Pecho" },
	{ label: "Piernas", value: "Piernas" },
	{ label: "Triceps", value: "Triceps" },
	{ label: "Core", value: "Core" },
	{ label: "Cardio", value: "Cardio" },
	{ label: "Cuello", value: "Cuello" },
] as const;

export const COACH_EXERCISE_MUSCLE_GROUP_OPTIONS = [
	{ label: "Abdomen", value: "Abdomen" },
	{ label: "Antebrazos", value: "Antebrazos" },
	{ label: "Biceps", value: "Biceps" },
	{ label: "Brazos", value: "Brazos" },
	{ label: "Espalda", value: "Espalda" },
	{ label: "Gluteos", value: "Gluteos" },
	{ label: "Hombros", value: "Hombros" },
	{ label: "Pecho", value: "Pecho" },
	{ label: "Piernas", value: "Piernas" },
	{ label: "Triceps", value: "Triceps" },
	{ label: "Core", value: "Core" },
	{ label: "Cuello", value: "Cuello" },
	{ label: "Cardio", value: "Cardio" },
] as const;

const CATEGORY_TO_BODY_PART: Array<{ bodyPart: BodyPartValue; patterns: string[] }> = [
	{ bodyPart: "CHEST", patterns: [ "chest", "pectoral", "pecho" ] },
	{ bodyPart: "BACK", patterns: [ "back", "espalda" ] },
	{ bodyPart: "LEGS", patterns: [ "leg", "legs", "pierna", "waist", "cardio", "neck" ] },
	{ bodyPart: "TRICEPS", patterns: [ "triceps", "tricep" ] },
	{ bodyPart: "BICEPS", patterns: [ "biceps", "arm", "arms", "lower arm", "upper arm" ] },
	{ bodyPart: "SHOULDERS", patterns: [ "shoulder", "shoulders", "hombro" ] },
];

export function mapCategoryToBodyPart( value: string ): BodyPartValue {
	const normalizedValue = normalizeSearchName( value );
	const matchedBodyPart = CATEGORY_TO_BODY_PART.find( ( entry ) =>
		entry.patterns.some( ( pattern ) => normalizedValue.includes( pattern ) )
	);

	return matchedBodyPart?.bodyPart ?? "CHEST";
}

export function buildCoachExerciseSearchName( values: Pick<CoachExerciseFormValues, "category" | "equipment" | "instructions" | "muscleGroup" | "name" | "target"> ) {
	return normalizeSearchName( [
		values.name,
		values.category,
		values.equipment,
		values.target,
		values.muscleGroup,
		values.instructions,
	].join( " " ) );
}

export function createCoachExerciseDefaultValues(): CoachExerciseFormValues {
	return {
		active: true,
		bodyPart: "CHEST",
		category: formatBodyPart( "CHEST" ),
		equipment: "",
		imageUrl: "",
		instructions: "",
		muscleGroup: "",
		name: "",
		target: "",
		videoUrl: "",
	};
}
