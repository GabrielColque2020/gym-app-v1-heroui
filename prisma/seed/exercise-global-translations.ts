const CATEGORY_TRANSLATIONS: Record<string, string> = {
	back: "Espalda",
	biceps: "Biceps",
	cardio: "Cardio",
	chest: "Pecho",
	forearms: "Antebrazos",
	glutes: "Gluteos",
	"lower arms": "Antebrazos",
	"lower legs": "Piernas inferiores",
	neck: "Cuello",
	shoulders: "Hombros",
	triceps: "Triceps",
	waist: "Core",
	"upper arms": "Brazos superiores",
	"upper legs": "Piernas superiores",
	abs: "Abdomen",
	abdomen: "Abdomen",
	arms: "Brazos",
	legs: "Piernas",
};

const EQUIPMENT_TRANSLATIONS: Record<string, string> = {
	"body weight": "Peso corporal",
	"barbell": "Barra",
	"bodyweight": "Peso corporal",
	"cable": "Polea",
	"dumbbell": "Mancuerna",
	"ez bar": "Barra EZ",
	"machine": "Maquina",
	"medicine ball": "Balon medicinal",
	"kettlebell": "Kettlebell",
	"resistance band": "Banda elastica",
	"safety bar": "Barra de seguridad",
	"smith machine": "Maquina Smith",
	"stability ball": "Pelota de estabilidad",
	"swiss ball": "Pelota suiza",
	"weighted": "Con peso",
	"assisted": "Asistido",
};

const PHRASE_TRANSLATIONS: Array<[ string, string ]> = [
	[ "bench press", "press de banca" ],
	[ "incline bench press", "press inclinado en banca" ],
	[ "decline bench press", "press declinado en banca" ],
	[ "push up", "flexiones" ],
	[ "push-up", "flexiones" ],
	[ "pull up", "dominadas" ],
	[ "pull-up", "dominadas" ],
	[ "sit up", "abdominales" ],
	[ "sit-up", "abdominales" ],
	[ "leg raise", "elevacion de piernas" ],
	[ "lateral raise", "elevacion lateral" ],
	[ "front raise", "elevacion frontal" ],
	[ "shoulder press", "press militar" ],
	[ "overhead press", "press por encima de la cabeza" ],
	[ "deadlift", "peso muerto" ],
	[ "squat", "sentadilla" ],
	[ "lunges", "zancadas" ],
	[ "lunge", "zancada" ],
	[ "row", "remo" ],
	[ "pulldown", "jalon" ],
	[ "fly", "aperturas" ],
	[ "extension", "extension" ],
	[ "kickback", "patada" ],
	[ "plank", "plancha" ],
	[ "burpee", "burpee" ],
	[ "mountain climber", "escalador" ],
	[ "dip", "fondos" ],
	[ "shrug", "encogimiento" ],
	[ "crunch", "crunch" ],
	[ "curl", "curl" ],
	[ "bridge", "puente" ],
	[ "thrust", "empuje" ],
	[ "machine", "maquina" ],
	[ "dumbbell", "mancuerna" ],
	[ "barbell", "barra" ],
	[ "cable", "polea" ],
	[ "body weight", "peso corporal" ],
	[ "bodyweight", "peso corporal" ],
	[ "seated", "sentado" ],
	[ "standing", "de pie" ],
	[ "lying", "acostado" ],
	[ "incline", "inclinado" ],
	[ "decline", "declinado" ],
	[ "reverse", "inverso" ],
	[ "alternate", "alterno" ],
	[ "alternating", "alterno" ],
	[ "single arm", "un brazo" ],
	[ "single-leg", "una pierna" ],
	[ "single leg", "una pierna" ],
	[ "wide", "abierto" ],
	[ "narrow", "cerrado" ],
	[ "hammer", "martillo" ],
	[ "assisted", "asistido" ],
];

function normalizeSourceText( value: string ) {
	return value
		.normalize( "NFD" )
		.replace( /[\u0300-\u036f]/g, "" )
		.toLowerCase()
		.trim()
		.replace( /\s+/g, " " );
}

function sentenceCase( value: string ) {
	const trimmedValue = value.trim();

	if (!trimmedValue) return trimmedValue;

	return trimmedValue.charAt( 0 ).toUpperCase() + trimmedValue.slice( 1 );
}

function applyPhraseTranslations( value: string ) {
	let translatedValue = normalizeSourceText( value );

	for (const [ source, target ] of PHRASE_TRANSLATIONS) {
		translatedValue = translatedValue.replace( new RegExp( `\\b${ source.replace( /[.*+?^${}()|[\]\\]/g, "\\$&" ) }\\b`, "gi" ), target );
	}

	return sentenceCase( translatedValue );
}

function translateByExactMap( value: string, map: Record<string, string> ) {
	const normalizedValue = normalizeSourceText( value );

	return map[ normalizedValue ] ?? sentenceCase( normalizedValue );
}

export function translateExerciseCategory( value: string ) {
	return translateByExactMap( value, CATEGORY_TRANSLATIONS );
}

export function translateExerciseEquipment( value: string ) {
	return translateByExactMap( value, EQUIPMENT_TRANSLATIONS );
}

export function translateExerciseTarget( value: string ) {
	return applyPhraseTranslations( value );
}

export function translateExerciseMuscleGroup( value: string ) {
	return applyPhraseTranslations( value );
}

export function translateExerciseName( value: string ) {
	return applyPhraseTranslations( value );
}

