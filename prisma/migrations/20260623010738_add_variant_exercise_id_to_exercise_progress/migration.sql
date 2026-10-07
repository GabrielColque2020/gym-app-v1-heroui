-- AlterTable
ALTER TABLE "ExerciseProgress" ADD COLUMN     "variantExerciseId" TEXT;

-- AlterTable
ALTER TABLE "routine_exercise_variants" RENAME CONSTRAINT "routine_exercise_variants_new_pkey" TO "routine_exercise_variants_pkey";

-- CreateIndex
CREATE INDEX "ExerciseProgress_studentId_variantExerciseId_date_idx" ON "ExerciseProgress"("studentId", "variantExerciseId", "date");

-- CreateIndex
CREATE INDEX "ExerciseProgress_studentId_exerciseId_date_idx" ON "ExerciseProgress"("studentId", "exerciseId", "date");

-- RenameForeignKey
ALTER TABLE "routine_exercise_variants" RENAME CONSTRAINT "routine_exercise_variants_new_routineId_fkey" TO "routine_exercise_variants_routineId_fkey";

-- RenameForeignKey
ALTER TABLE "routine_exercise_variants" RENAME CONSTRAINT "routine_exercise_variants_new_variantExerciseId_fkey" TO "routine_exercise_variants_variantExerciseId_fkey";

-- AddForeignKey
ALTER TABLE "ExerciseProgress" ADD CONSTRAINT "ExerciseProgress_variantExerciseId_fkey" FOREIGN KEY ("variantExerciseId") REFERENCES "Exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- RenameIndex
ALTER INDEX "routine_exercise_variants_new_routineId_idx" RENAME TO "routine_exercise_variants_routineId_idx";

-- RenameIndex
ALTER INDEX "routine_exercise_variants_new_routineId_variantExerciseId_key" RENAME TO "routine_exercise_variants_routineId_variantExerciseId_key";

-- RenameIndex
ALTER INDEX "routine_exercise_variants_new_variantExerciseId_idx" RENAME TO "routine_exercise_variants_variantExerciseId_idx";
