-- Rebuild routine_exercise_variants so variants belong to Routine instead of Exercise.

CREATE TABLE "routine_exercise_variants_new" (
    "id" TEXT NOT NULL,
    "routineId" TEXT NOT NULL,
    "variantExerciseId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "routine_exercise_variants_new_pkey" PRIMARY KEY ("id")
);

INSERT INTO "routine_exercise_variants_new" ("id", "routineId", "variantExerciseId", "createdAt")
SELECT
    (
        substr(md5(rev."id" || r."id" || rev."variantExerciseId"), 1, 8) || '-' ||
        substr(md5(rev."id" || r."id" || rev."variantExerciseId"), 9, 4) || '-' ||
        substr(md5(rev."id" || r."id" || rev."variantExerciseId"), 13, 4) || '-' ||
        substr(md5(rev."id" || r."id" || rev."variantExerciseId"), 17, 4) || '-' ||
        substr(md5(rev."id" || r."id" || rev."variantExerciseId"), 21, 12)
    )::uuid::text AS "id",
    r."id" AS "routineId",
    rev."variantExerciseId",
    rev."createdAt"
FROM "routine_exercise_variants" rev
INNER JOIN "Routine" r
    ON r."exerciseId" = rev."baseExerciseId";

CREATE UNIQUE INDEX "routine_exercise_variants_new_routineId_variantExerciseId_key"
    ON "routine_exercise_variants_new"("routineId", "variantExerciseId");

CREATE INDEX "routine_exercise_variants_new_routineId_idx"
    ON "routine_exercise_variants_new"("routineId");

CREATE INDEX "routine_exercise_variants_new_variantExerciseId_idx"
    ON "routine_exercise_variants_new"("variantExerciseId");

ALTER TABLE "routine_exercise_variants_new"
    ADD CONSTRAINT "routine_exercise_variants_new_routineId_fkey"
    FOREIGN KEY ("routineId") REFERENCES "Routine"("id")
    ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "routine_exercise_variants_new"
    ADD CONSTRAINT "routine_exercise_variants_new_variantExerciseId_fkey"
    FOREIGN KEY ("variantExerciseId") REFERENCES "Exercise"("id")
    ON DELETE CASCADE ON UPDATE CASCADE;

DROP TABLE "routine_exercise_variants";

ALTER TABLE "routine_exercise_variants_new" RENAME TO "routine_exercise_variants";
