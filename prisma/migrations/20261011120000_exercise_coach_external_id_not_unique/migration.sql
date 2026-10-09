-- El codigo del catalogo (`externalId`) de las copias de ejercicios de cada
-- entrenador era unico en toda la tabla. Pero cada entrenador que usa un
-- ejercicio global guarda su propia copia con el mismo codigo, asi que el
-- segundo entrenador que elegia ese ejercicio no podia guardar el dia de
-- rutina. Pasa a ser un indice comun: se sigue buscando por el, sin exigir que
-- sea unico.

-- DropIndex
DROP INDEX "ExerciseCoach_externalId_key";

-- CreateIndex
CREATE INDEX "ExerciseCoach_externalId_idx" ON "ExerciseCoach"("externalId");
