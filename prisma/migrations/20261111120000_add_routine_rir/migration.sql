-- Repeticiones en reserva (RIR) que el entrenador le pide a cada ejercicio de
-- un dia: "2", "1-2", "0-1". Las planificaciones lo traen por ejercicio y
-- hasta ahora iba escrito en la nota. Es opcional: las filas que ya existen
-- quedan sin valor.
ALTER TABLE "Routine" ADD COLUMN "rir" TEXT;
