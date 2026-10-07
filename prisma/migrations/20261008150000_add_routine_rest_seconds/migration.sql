-- Descanso entre series que el entrenador le fija a cada ejercicio de un dia.
-- Es opcional: las filas que ya existen quedan sin valor.
ALTER TABLE "Routine" ADD COLUMN "restSeconds" INTEGER;
