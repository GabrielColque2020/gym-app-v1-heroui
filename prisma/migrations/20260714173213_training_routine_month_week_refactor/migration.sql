/*
  Warnings:

  - You are about to drop the column `trainingRoutineId` on the `RoutineDay` table. All the data in the column will be lost.
  - You are about to drop the `TrainingRoutine` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `trainingRoutineWeekId` to the `RoutineDay` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "RoutineDay" DROP CONSTRAINT "RoutineDay_trainingRoutineId_fkey";

-- DropForeignKey
ALTER TABLE "TrainingRoutine" DROP CONSTRAINT "TrainingRoutine_studentId_fkey";

-- AlterTable
ALTER TABLE "RoutineDay" DROP COLUMN "trainingRoutineId",
ADD COLUMN     "trainingRoutineWeekId" TEXT NOT NULL;

-- DropTable
DROP TABLE "TrainingRoutine";

-- CreateTable
CREATE TABLE "TrainingRoutineMonth" (
    "id" TEXT NOT NULL,
    "month" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "objective" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "studentId" TEXT NOT NULL,

    CONSTRAINT "TrainingRoutineMonth_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrainingRoutineWeek" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "week" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "trainingRoutineMonthId" TEXT NOT NULL,

    CONSTRAINT "TrainingRoutineWeek_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "TrainingRoutineMonth_studentId_year_month_idx" ON "TrainingRoutineMonth"("studentId", "year", "month");

-- CreateIndex
CREATE UNIQUE INDEX "TrainingRoutineMonth_studentId_month_year_key" ON "TrainingRoutineMonth"("studentId", "month", "year");

-- CreateIndex
CREATE INDEX "TrainingRoutineWeek_trainingRoutineMonthId_idx" ON "TrainingRoutineWeek"("trainingRoutineMonthId");

-- CreateIndex
CREATE UNIQUE INDEX "TrainingRoutineWeek_trainingRoutineMonthId_week_key" ON "TrainingRoutineWeek"("trainingRoutineMonthId", "week");

-- AddForeignKey
ALTER TABLE "TrainingRoutineMonth" ADD CONSTRAINT "TrainingRoutineMonth_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainingRoutineWeek" ADD CONSTRAINT "TrainingRoutineWeek_trainingRoutineMonthId_fkey" FOREIGN KEY ("trainingRoutineMonthId") REFERENCES "TrainingRoutineMonth"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoutineDay" ADD CONSTRAINT "RoutineDay_trainingRoutineWeekId_fkey" FOREIGN KEY ("trainingRoutineWeekId") REFERENCES "TrainingRoutineWeek"("id") ON DELETE CASCADE ON UPDATE CASCADE;
