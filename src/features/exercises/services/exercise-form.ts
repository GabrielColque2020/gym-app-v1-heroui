import {
	ALL_BODY_PARTS,
	BODY_PART_OPTIONS,
	type BodyPartFilter,
	type BodyPartValue,
	formatBodyPart,
	isBodyPartValue,
} from "@/features/exercises/services/exercise-formatters";

export type ExerciseFormValues = {
	active: boolean;
	bodyPart: BodyPartValue;
	name: string;
	tips: string;
};

export type CreateExerciseInput = ExerciseFormValues;

export type UpdateExerciseInput = ExerciseFormValues & {
	id: string;
};

export function normalizeSearchName( value: string ) {
	return value
		.normalize( "NFD" )
		.replace( /[\u0300-\u036f]/g, "" )
		.toLowerCase()
		.trim()
		.replace( /\s+/g, " " );
}

export function emptyToNull( value: string ) {
	const trimmedValue = value.trim();

	return trimmedValue.length > 0 ? trimmedValue : null;
}

export {
	ALL_BODY_PARTS,
	BODY_PART_OPTIONS,
	formatBodyPart,
	isBodyPartValue,
};

export type {
	BodyPartFilter,
	BodyPartValue,
};
