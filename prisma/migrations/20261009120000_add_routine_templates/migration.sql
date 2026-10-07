-- Plantillas de rutina del entrenador. La plantilla es una tabla nueva; sus
-- semanas, dias y ejercicios usan las tablas que ya existen. Por eso una semana
-- pasa a poder colgar de un mes de un estudiante o de una plantilla.

-- AlterTable
ALTER TABLE "TrainingRoutineWeek" ADD COLUMN     "routineTemplateId" TEXT,
ALTER COLUMN "trainingRoutineMonthId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "RoutineTemplate" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "objective" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "coachId" TEXT NOT NULL,

    CONSTRAINT "RoutineTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RoutineTemplate_coachId_name_key" ON "RoutineTemplate"("coachId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "TrainingRoutineWeek_routineTemplateId_week_key" ON "TrainingRoutineWeek"("routineTemplateId", "week");

-- AddForeignKey
ALTER TABLE "RoutineTemplate" ADD CONSTRAINT "RoutineTemplate_coachId_fkey" FOREIGN KEY ("coachId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainingRoutineWeek" ADD CONSTRAINT "TrainingRoutineWeek_routineTemplateId_fkey" FOREIGN KEY ("routineTemplateId") REFERENCES "RoutineTemplate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Una semana es de un mes o de una plantilla: ni de los dos, ni de ninguno.
-- Las semanas que ya existen cumplen, porque todas tienen mes.
ALTER TABLE "TrainingRoutineWeek" ADD CONSTRAINT "TrainingRoutineWeek_single_parent_check" CHECK (num_nonnulls("trainingRoutineMonthId", "routineTemplateId") = 1);
