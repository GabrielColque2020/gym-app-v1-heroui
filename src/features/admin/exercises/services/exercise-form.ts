export const BODY_PART_OPTIONS = [
    {label: "Pecho", value: "CHEST"},
    {label: "Espalda", value: "BACK"},
    {label: "Piernas", value: "LEGS"},
    {label: "Triceps", value: "TRICEPS"},
    {label: "Biceps", value: "BICEPS"},
    {label: "Hombros", value: "SHOULDERS"},
] as const;

export type BodyPartValue = (typeof BODY_PART_OPTIONS)[ number ][ "value" ];

export const ALL_BODY_PARTS = "ALL";

export type BodyPartFilter = BodyPartValue | typeof ALL_BODY_PARTS;

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

const BODY_PART_VALUES = BODY_PART_OPTIONS.map((option) => option.value);

export function isBodyPartValue(value: string): value is BodyPartValue {
    return BODY_PART_VALUES.includes(value as BodyPartValue);
}

export function formatBodyPart(bodyPart: BodyPartValue) {
    return BODY_PART_OPTIONS.find((option) => option.value === bodyPart)?.label ?? bodyPart;
}

export function normalizeSearchName(value: string) {
    return value
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim()
        .replace(/\s+/g, " ");
}

export function emptyToNull(value: string) {
    const trimmedValue = value.trim();

    return trimmedValue.length > 0 ? trimmedValue : null;
}
