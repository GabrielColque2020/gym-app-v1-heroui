import type { Exercise } from "@/generated/prisma/client";

export type ExerciseListItem = Pick<
	Exercise,
	"active" | "bodyPart" | "createdAt" | "id" | "imageUrl" | "name" | "tips" | "videoUrl"
>;
