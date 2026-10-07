-- AlterTable
ALTER TABLE "ExerciseCoach" RENAME CONSTRAINT "Exercise_pkey" TO "ExerciseCoach_pkey";

-- CreateIndex
CREATE UNIQUE INDEX "ExerciseCoach_externalId_key" ON "ExerciseCoach"("externalId");

-- RenameForeignKey
ALTER TABLE "ExerciseCoach" RENAME CONSTRAINT "Exercise_coachId_fkey" TO "ExerciseCoach_coachId_fkey";

-- RenameIndex
ALTER INDEX "Exercise_searchName_idx" RENAME TO "ExerciseCoach_searchName_idx";

