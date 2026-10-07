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
