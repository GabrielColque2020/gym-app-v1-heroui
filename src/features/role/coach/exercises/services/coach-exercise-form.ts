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

// Las categorias del catalogo global estan en español ("brazos", "core",
// "antebrazos"); las de ejercicios viejos pueden estar en ingles. El orden
// importa: "antebrazos" contiene "brazos" y "lower arm" contiene "arm".
const CATEGORY_TO_BODY_PART: Array<{ bodyPart: BodyPartValue; patterns: string[] }> = [
	{ bodyPart: "ABS", patterns: [ "core", "abdom", "waist" ] },
	{ bodyPart: "FOREARMS", patterns: [ "antebrazo", "forearm", "lower arm" ] },
	{ bodyPart: "CARDIO", patterns: [ "cardio" ] },
	{ bodyPart: "CHEST", patterns: [ "chest", "pectoral", "pecho" ] },
	{ bodyPart: "BACK", patterns: [ "back", "espalda", "neck", "cuello" ] },
	{ bodyPart: "LEGS", patterns: [ "leg", "pierna", "gluteo" ] },
	{ bodyPart: "TRICEPS", patterns: [ "tricep" ] },
	{ bodyPart: "BICEPS", patterns: [ "bicep" ] },
	{ bodyPart: "SHOULDERS", patterns: [ "shoulder", "hombro" ] },
];

const ARM_CATEGORY_PATTERNS = [ "brazo", "arm" ];

// El catalogo global junta biceps y triceps en la categoria "brazos": ahi lo que
// los separa es el musculo objetivo, por eso tambien se recibe el target.
export function mapCategoryToBodyPart( category: string, target = "" ): BodyPartValue {
	const normalizedCategory = normalizeSearchName( category );
	const matchedBodyPart = CATEGORY_TO_BODY_PART.find( ( entry ) =>
		entry.patterns.some( ( pattern ) => normalizedCategory.includes( pattern ) )
	);

	if (matchedBodyPart) return matchedBodyPart.bodyPart;

	if (ARM_CATEGORY_PATTERNS.some( ( pattern ) => normalizedCategory.includes( pattern ) )) {
		return normalizeSearchName( target ).includes( "tricep" ) ? "TRICEPS" : "BICEPS";
	}

	return "CHEST";
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
