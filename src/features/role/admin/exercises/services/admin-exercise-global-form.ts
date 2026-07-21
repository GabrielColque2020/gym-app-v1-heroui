import { normalizeSearchName } from "@/features/exercises/services/exercise-form";

export type AdminExerciseGlobalFormValues = {
	active: boolean;
	category: string;
	equipment: string;
	imageUrl: string;
	instructions: string;
	muscleGroup: string;
	name: string;
	target: string;
	videoUrl: string;
};

export type AdminExerciseGlobalSourceType = "global";

export const ADMIN_EXERCISE_GLOBAL_CATEGORY_OPTIONS = [
	{ label: "Abdomen", value: "Abdomen" },
	{ label: "Antebrazos", value: "Antebrazos" },
	{ label: "Biceps", value: "Biceps" },
	{ label: "Brazos", value: "Brazos" },
	{ label: "Brazos superiores", value: "Brazos superiores" },
	{ label: "Core", value: "Core" },
	{ label: "Cuello", value: "Cuello" },
	{ label: "Espalda", value: "Espalda" },
	{ label: "Gluteos", value: "Gluteos" },
	{ label: "Hombros", value: "Hombros" },
	{ label: "Pecho", value: "Pecho" },
	{ label: "Piernas", value: "Piernas" },
	{ label: "Piernas inferiores", value: "Piernas inferiores" },
	{ label: "Piernas superiores", value: "Piernas superiores" },
	{ label: "Triceps", value: "Triceps" },
] as const;

export const ADMIN_EXERCISE_GLOBAL_TARGET_OPTIONS = [
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

export const ADMIN_EXERCISE_GLOBAL_MUSCLE_GROUP_OPTIONS = [
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

export const ADMIN_EXERCISE_GLOBAL_EQUIPMENT_OPTIONS = [
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

export function buildAdminExerciseGlobalSearchName( values: Pick<AdminExerciseGlobalFormValues, "category" | "equipment" | "instructions" | "muscleGroup" | "name" | "target"> & { attribution?: string } ) {
	return normalizeSearchName( [
		values.name,
		values.category,
		values.target,
		values.muscleGroup,
		values.equipment,
		values.instructions,
		values.attribution ?? "",
	].join( " " ) );
}

export function createAdminExerciseGlobalDefaultValues(): AdminExerciseGlobalFormValues {
	return {
		active: true,
		category: "",
		equipment: "",
		imageUrl: "",
		instructions: "",
		muscleGroup: "",
		name: "",
		target: "",
		videoUrl: "",
	};
}

export function mapExerciseGlobalToFormValues( exercise: {
	active: boolean;
	category: string;
	equipment: string;
	imageUrl: string | null;
	instructions: string | null;
	muscleGroup: string;
	name: string;
	target: string;
	videoUrl: string | null;
} ): AdminExerciseGlobalFormValues {
	return {
		active: exercise.active,
		category: exercise.category,
		equipment: exercise.equipment,
		imageUrl: exercise.imageUrl ?? "",
		instructions: exercise.instructions ?? "",
		muscleGroup: exercise.muscleGroup,
		name: exercise.name,
		target: exercise.target,
		videoUrl: exercise.videoUrl ?? "",
	};
}
