import type { ExerciseCoach } from "@/generated/prisma/client";

export type ExerciseListItem = Pick<
	ExerciseCoach,
	"active" | "bodyPart" | "createdAt" | "id" | "imageUrl" | "name" | "tips" | "videoUrl"
>;
