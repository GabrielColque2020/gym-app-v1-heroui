-- CreateTable
CREATE TABLE "routine_exercise_variants" (
    "id" TEXT NOT NULL,
    "baseExerciseId" TEXT NOT NULL,
    "variantExerciseId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "routine_exercise_variants_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "routine_exercise_variants_baseExerciseId_variantExerciseId_key" ON "routine_exercise_variants"("baseExerciseId", "variantExerciseId");

-- CreateIndex
CREATE INDEX "routine_exercise_variants_baseExerciseId_idx" ON "routine_exercise_variants"("baseExerciseId");

-- CreateIndex
CREATE INDEX "routine_exercise_variants_variantExerciseId_idx" ON "routine_exercise_variants"("variantExerciseId");

-- AddForeignKey
ALTER TABLE "routine_exercise_variants" ADD CONSTRAINT "routine_exercise_variants_baseExerciseId_fkey" FOREIGN KEY ("baseExerciseId") REFERENCES "Exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "routine_exercise_variants" ADD CONSTRAINT "routine_exercise_variants_variantExerciseId_fkey" FOREIGN KEY ("variantExerciseId") REFERENCES "Exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;
