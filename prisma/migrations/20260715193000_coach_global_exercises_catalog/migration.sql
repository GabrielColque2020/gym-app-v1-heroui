-- Rename the existing coach exercise table so the Prisma model can map to it as ExerciseCoach.
ALTER TABLE "Exercise" RENAME TO "ExerciseCoach";

-- Add the new catalog and override metadata to the coach table.
ALTER TABLE "ExerciseCoach"
ADD COLUMN "externalId" TEXT,
ADD COLUMN "category" TEXT,
ADD COLUMN "target" TEXT,
ADD COLUMN "muscleGroup" TEXT,
ADD COLUMN "equipment" TEXT,
ADD COLUMN "instructions" TEXT,
ADD COLUMN "isOverride" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN "globalExerciseId" TEXT;

-- Create the global exercise catalog.
CREATE TABLE "ExerciseGlobal" (
    "id" TEXT NOT NULL,
    "externalId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "searchName" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "target" TEXT NOT NULL,
    "muscleGroup" TEXT NOT NULL,
    "equipment" TEXT NOT NULL,
    "instructions" TEXT,
    "imageUrl" TEXT,
    "videoUrl" TEXT,
    "attribution" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ExerciseGlobal_pkey" PRIMARY KEY ("id")
);

-- Indexes for the new catalog and override lookup.
CREATE UNIQUE INDEX "ExerciseGlobal_externalId_key" ON "ExerciseGlobal"("externalId");
CREATE INDEX "ExerciseGlobal_searchName_idx" ON "ExerciseGlobal"("searchName");
CREATE INDEX "ExerciseCoach_coachId_idx" ON "ExerciseCoach"("coachId");
CREATE INDEX "ExerciseCoach_globalExerciseId_idx" ON "ExerciseCoach"("globalExerciseId");
CREATE UNIQUE INDEX "ExerciseCoach_coachId_globalExerciseId_key" ON "ExerciseCoach"("coachId", "globalExerciseId");

-- Add the foreign key from the coach override table to the global catalog.
ALTER TABLE "ExerciseCoach"
ADD CONSTRAINT "ExerciseCoach_globalExerciseId_fkey"
FOREIGN KEY ("globalExerciseId") REFERENCES "ExerciseGlobal"("id") ON DELETE SET NULL ON UPDATE CASCADE;

