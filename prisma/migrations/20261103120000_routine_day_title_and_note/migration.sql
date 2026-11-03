-- Cada dia de rutina puede tener un titulo ("Pecho + espalda + brazos") y una
-- nota para el estudiante ("La banca tiene prioridad..."). Las planificaciones
-- los traen por dia y no habia donde ponerlos. Los dos son opcionales.

-- AlterTable
ALTER TABLE "RoutineDay" ADD COLUMN "title" TEXT,
ADD COLUMN "note" TEXT;
