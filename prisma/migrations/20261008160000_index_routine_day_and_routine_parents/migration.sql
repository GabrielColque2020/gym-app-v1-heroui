-- Indices para llegar de una semana a sus dias y de un dia a sus ejercicios.
-- Los usa el selector de mes para saber que meses tienen al menos un ejercicio,
-- y de paso la carga de la rutina del mes, que ya hacia ese recorrido sin indice.
CREATE INDEX "RoutineDay_trainingRoutineWeekId_idx" ON "RoutineDay"("trainingRoutineWeekId");

CREATE INDEX "Routine_routineDayId_idx" ON "Routine"("routineDayId");
