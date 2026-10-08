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
