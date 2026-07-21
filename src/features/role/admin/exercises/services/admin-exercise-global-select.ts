import type { Prisma } from "@/generated/prisma/client";

export const adminExerciseGlobalSelect = {
	active: true,
	attribution: true,
	category: true,
	createdAt: true,
	equipment: true,
	externalId: true,
	id: true,
	imageUrl: true,
	instructions: true,
	muscleGroup: true,
	name: true,
	searchName: true,
	target: true,
	updatedAt: true,
	videoUrl: true,
} satisfies Prisma.ExerciseGlobalSelect;

