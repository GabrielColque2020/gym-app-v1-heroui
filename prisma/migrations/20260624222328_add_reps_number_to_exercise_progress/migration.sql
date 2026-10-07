-- AlterTable
ALTER TABLE "ExerciseProgress" ADD COLUMN     "repsNumber" INTEGER;

-- CreateIndex
CREATE INDEX "ExerciseProgress_studentId_year_month_week_dayNumber_exerci_idx" ON "ExerciseProgress"("studentId", "year", "month", "week", "dayNumber", "exerciseId", "repsNumber");
