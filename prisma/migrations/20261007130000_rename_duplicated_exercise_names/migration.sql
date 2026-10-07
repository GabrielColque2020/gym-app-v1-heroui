-- Ejercicios del catalogo global que compartian nombre con otro: se renombran
-- para que se puedan distinguir al armar una rutina. Se identifican por su
-- codigo (externalId), que no se repite.
--
-- El texto de busqueda (searchName) empieza con el nombre sin acentos: se
-- reemplaza solo ese comienzo, no las apariciones dentro de las instrucciones.
--
-- La copia de cada entrenador se renombra solo si conserva el nombre original;
-- si el entrenador le puso un nombre propio, no se toca.

UPDATE "ExerciseCoach" SET "name" = 'Flexión sobre bosu invertido', "searchName" = CASE WHEN "searchName" LIKE 'flexion%' THEN 'flexion sobre bosu invertido' || substr( "searchName", 8 ) ELSE "searchName" END
WHERE "name" = 'Flexión' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0653' );
UPDATE "ExerciseGlobal" SET "name" = 'Flexión sobre bosu invertido', "searchName" = CASE WHEN "searchName" LIKE 'flexion%' THEN 'flexion sobre bosu invertido' || substr( "searchName", 8 ) ELSE "searchName" END
WHERE "externalId" = '0653' AND "name" = 'Flexión';

UPDATE "ExerciseCoach" SET "name" = 'Flexión con manos sobre pelota suiza', "searchName" = CASE WHEN "searchName" LIKE 'flexion sobre pelota suiza%' THEN 'flexion con manos sobre pelota suiza' || substr( "searchName", 27 ) ELSE "searchName" END
WHERE "name" = 'Flexión sobre pelota suiza' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0655' );
UPDATE "ExerciseGlobal" SET "name" = 'Flexión con manos sobre pelota suiza', "searchName" = CASE WHEN "searchName" LIKE 'flexion sobre pelota suiza%' THEN 'flexion con manos sobre pelota suiza' || substr( "searchName", 27 ) ELSE "searchName" END
WHERE "externalId" = '0655' AND "name" = 'Flexión sobre pelota suiza';

UPDATE "ExerciseCoach" SET "name" = 'Flexión con pies sobre pelota suiza', "searchName" = CASE WHEN "searchName" LIKE 'flexion sobre pelota suiza%' THEN 'flexion con pies sobre pelota suiza' || substr( "searchName", 27 ) ELSE "searchName" END
WHERE "name" = 'Flexión sobre pelota suiza' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0656' );
UPDATE "ExerciseGlobal" SET "name" = 'Flexión con pies sobre pelota suiza', "searchName" = CASE WHEN "searchName" LIKE 'flexion sobre pelota suiza%' THEN 'flexion con pies sobre pelota suiza' || substr( "searchName", 27 ) ELSE "searchName" END
WHERE "externalId" = '0656' AND "name" = 'Flexión sobre pelota suiza';

UPDATE "ExerciseCoach" SET "name" = 'Remo con barra apoyado en banco inclinado', "searchName" = CASE WHEN "searchName" LIKE 'remo inclinado con barra%' THEN 'remo con barra apoyado en banco inclinado' || substr( "searchName", 25 ) ELSE "searchName" END
WHERE "name" = 'Remo inclinado con barra' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0049' );
UPDATE "ExerciseGlobal" SET "name" = 'Remo con barra apoyado en banco inclinado', "searchName" = CASE WHEN "searchName" LIKE 'remo inclinado con barra%' THEN 'remo con barra apoyado en banco inclinado' || substr( "searchName", 25 ) ELSE "searchName" END
WHERE "externalId" = '0049' AND "name" = 'Remo inclinado con barra';

UPDATE "ExerciseCoach" SET "name" = 'Remo con mancuernas apoyado en banco inclinado', "searchName" = CASE WHEN "searchName" LIKE 'remo inclinado con mancuerna%' THEN 'remo con mancuernas apoyado en banco inclinado' || substr( "searchName", 29 ) ELSE "searchName" END
WHERE "name" = 'Remo inclinado con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0327' );
UPDATE "ExerciseGlobal" SET "name" = 'Remo con mancuernas apoyado en banco inclinado', "searchName" = CASE WHEN "searchName" LIKE 'remo inclinado con mancuerna%' THEN 'remo con mancuernas apoyado en banco inclinado' || substr( "searchName", 29 ) ELSE "searchName" END
WHERE "externalId" = '0327' AND "name" = 'Remo inclinado con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Press de pecho en máquina de palanca (con discos)', "searchName" = CASE WHEN "searchName" LIKE 'press de pecho en maquina de palanca%' THEN 'press de pecho en maquina de palanca (con discos)' || substr( "searchName", 37 ) ELSE "searchName" END
WHERE "name" = 'Press de pecho en máquina de palanca' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0576' );
UPDATE "ExerciseGlobal" SET "name" = 'Press de pecho en máquina de palanca (con discos)', "searchName" = CASE WHEN "searchName" LIKE 'press de pecho en maquina de palanca%' THEN 'press de pecho en maquina de palanca (con discos)' || substr( "searchName", 37 ) ELSE "searchName" END
WHERE "externalId" = '0576' AND "name" = 'Press de pecho en máquina de palanca';

UPDATE "ExerciseCoach" SET "name" = 'Press de pecho en máquina de palanca (con placas)', "searchName" = CASE WHEN "searchName" LIKE 'press de pecho en maquina de palanca%' THEN 'press de pecho en maquina de palanca (con placas)' || substr( "searchName", 37 ) ELSE "searchName" END
WHERE "name" = 'Press de pecho en máquina de palanca' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0577' );
UPDATE "ExerciseGlobal" SET "name" = 'Press de pecho en máquina de palanca (con placas)', "searchName" = CASE WHEN "searchName" LIKE 'press de pecho en maquina de palanca%' THEN 'press de pecho en maquina de palanca (con placas)' || substr( "searchName", 37 ) ELSE "searchName" END
WHERE "externalId" = '0577' AND "name" = 'Press de pecho en máquina de palanca';

UPDATE "ExerciseCoach" SET "name" = 'Curl inverso de piernas autoasistido (en máquina)', "searchName" = CASE WHEN "searchName" LIKE 'curl inverso de piernas autoasistido%' THEN 'curl inverso de piernas autoasistido (en maquina)' || substr( "searchName", 37 ) ELSE "searchName" END
WHERE "name" = 'Curl inverso de piernas autoasistido' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0697' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl inverso de piernas autoasistido (en máquina)', "searchName" = CASE WHEN "searchName" LIKE 'curl inverso de piernas autoasistido%' THEN 'curl inverso de piernas autoasistido (en maquina)' || substr( "searchName", 37 ) ELSE "searchName" END
WHERE "externalId" = '0697' AND "name" = 'Curl inverso de piernas autoasistido';

UPDATE "ExerciseCoach" SET "name" = 'Curl inverso de piernas autoasistido (en el suelo)', "searchName" = CASE WHEN "searchName" LIKE 'curl inverso de piernas autoasistido%' THEN 'curl inverso de piernas autoasistido (en el suelo)' || substr( "searchName", 37 ) ELSE "searchName" END
WHERE "name" = 'Curl inverso de piernas autoasistido' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1766' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl inverso de piernas autoasistido (en el suelo)', "searchName" = CASE WHEN "searchName" LIKE 'curl inverso de piernas autoasistido%' THEN 'curl inverso de piernas autoasistido (en el suelo)' || substr( "searchName", 37 ) ELSE "searchName" END
WHERE "externalId" = '1766' AND "name" = 'Curl inverso de piernas autoasistido';

UPDATE "ExerciseCoach" SET "name" = 'Curl spider con barra EZ (apoyado en banco inclinado)', "searchName" = CASE WHEN "searchName" LIKE 'curl spider con barra ez%' THEN 'curl spider con barra ez (apoyado en banco inclinado)' || substr( "searchName", 25 ) ELSE "searchName" END
WHERE "name" = 'Curl spider con barra EZ' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0454' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl spider con barra EZ (apoyado en banco inclinado)', "searchName" = CASE WHEN "searchName" LIKE 'curl spider con barra ez%' THEN 'curl spider con barra ez (apoyado en banco inclinado)' || substr( "searchName", 25 ) ELSE "searchName" END
WHERE "externalId" = '0454' AND "name" = 'Curl spider con barra EZ';

UPDATE "ExerciseCoach" SET "name" = 'Curl spider con barra EZ (de pie)', "searchName" = CASE WHEN "searchName" LIKE 'curl spider con barra ez%' THEN 'curl spider con barra ez (de pie)' || substr( "searchName", 25 ) ELSE "searchName" END
WHERE "name" = 'Curl spider con barra EZ' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1628' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl spider con barra EZ (de pie)', "searchName" = CASE WHEN "searchName" LIKE 'curl spider con barra ez%' THEN 'curl spider con barra ez (de pie)' || substr( "searchName", 25 ) ELSE "searchName" END
WHERE "externalId" = '1628' AND "name" = 'Curl spider con barra EZ';

UPDATE "ExerciseCoach" SET "name" = 'Elevaciones de gemelo anterior en máquina Smith (sobre escalón)', "searchName" = CASE WHEN "searchName" LIKE 'elevaciones de gemelo anterior en maquina smith%' THEN 'elevaciones de gemelo anterior en maquina smith (sobre escalon)' || substr( "searchName", 48 ) ELSE "searchName" END
WHERE "name" = 'Elevaciones de gemelo anterior en máquina Smith' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0763' );
UPDATE "ExerciseGlobal" SET "name" = 'Elevaciones de gemelo anterior en máquina Smith (sobre escalón)', "searchName" = CASE WHEN "searchName" LIKE 'elevaciones de gemelo anterior en maquina smith%' THEN 'elevaciones de gemelo anterior en maquina smith (sobre escalon)' || substr( "searchName", 48 ) ELSE "searchName" END
WHERE "externalId" = '0763' AND "name" = 'Elevaciones de gemelo anterior en máquina Smith';

UPDATE "ExerciseCoach" SET "name" = 'Elevaciones de gemelo anterior en máquina Smith (barra por detrás)', "searchName" = CASE WHEN "searchName" LIKE 'elevaciones de gemelo anterior en maquina smith%' THEN 'elevaciones de gemelo anterior en maquina smith (barra por detras)' || substr( "searchName", 48 ) ELSE "searchName" END
WHERE "name" = 'Elevaciones de gemelo anterior en máquina Smith' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1394' );
UPDATE "ExerciseGlobal" SET "name" = 'Elevaciones de gemelo anterior en máquina Smith (barra por detrás)', "searchName" = CASE WHEN "searchName" LIKE 'elevaciones de gemelo anterior en maquina smith%' THEN 'elevaciones de gemelo anterior en maquina smith (barra por detras)' || substr( "searchName", 48 ) ELSE "searchName" END
WHERE "externalId" = '1394' AND "name" = 'Elevaciones de gemelo anterior en máquina Smith';

UPDATE "ExerciseCoach" SET "name" = '45° prensa de piernas con trineo (vista lateral)', "searchName" = CASE WHEN "searchName" LIKE '45° prensa de piernas con trineo%' THEN '45° prensa de piernas con trineo (vista lateral)' || substr( "searchName", 33 ) ELSE "searchName" END
WHERE "name" = '45° prensa de piernas con trineo' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1463' );
UPDATE "ExerciseGlobal" SET "name" = '45° prensa de piernas con trineo (vista lateral)', "searchName" = CASE WHEN "searchName" LIKE '45° prensa de piernas con trineo%' THEN '45° prensa de piernas con trineo (vista lateral)' || substr( "searchName", 33 ) ELSE "searchName" END
WHERE "externalId" = '1463' AND "name" = '45° prensa de piernas con trineo';

UPDATE "ExerciseCoach" SET "name" = '45° prensa de piernas con trineo (vista trasera)', "searchName" = CASE WHEN "searchName" LIKE '45° prensa de piernas con trineo%' THEN '45° prensa de piernas con trineo (vista trasera)' || substr( "searchName", 33 ) ELSE "searchName" END
WHERE "name" = '45° prensa de piernas con trineo' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1464' );
UPDATE "ExerciseGlobal" SET "name" = '45° prensa de piernas con trineo (vista trasera)', "searchName" = CASE WHEN "searchName" LIKE '45° prensa de piernas con trineo%' THEN '45° prensa de piernas con trineo (vista trasera)' || substr( "searchName", 33 ) ELSE "searchName" END
WHERE "externalId" = '1464' AND "name" = '45° prensa de piernas con trineo';

UPDATE "ExerciseCoach" SET "name" = 'Sentadilla completa con barra (vista lateral)', "searchName" = CASE WHEN "searchName" LIKE 'sentadilla completa con barra%' THEN 'sentadilla completa con barra (vista lateral)' || substr( "searchName", 30 ) ELSE "searchName" END
WHERE "name" = 'Sentadilla completa con barra' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1462' );
UPDATE "ExerciseGlobal" SET "name" = 'Sentadilla completa con barra (vista lateral)', "searchName" = CASE WHEN "searchName" LIKE 'sentadilla completa con barra%' THEN 'sentadilla completa con barra (vista lateral)' || substr( "searchName", 30 ) ELSE "searchName" END
WHERE "externalId" = '1462' AND "name" = 'Sentadilla completa con barra';

UPDATE "ExerciseCoach" SET "name" = 'Sentadilla completa con barra (vista trasera)', "searchName" = CASE WHEN "searchName" LIKE 'sentadilla completa con barra%' THEN 'sentadilla completa con barra (vista trasera)' || substr( "searchName", 30 ) ELSE "searchName" END
WHERE "name" = 'Sentadilla completa con barra' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1461' );
UPDATE "ExerciseGlobal" SET "name" = 'Sentadilla completa con barra (vista trasera)', "searchName" = CASE WHEN "searchName" LIKE 'sentadilla completa con barra%' THEN 'sentadilla completa con barra (vista trasera)' || substr( "searchName", 30 ) ELSE "searchName" END
WHERE "externalId" = '1461' AND "name" = 'Sentadilla completa con barra';

UPDATE "ExerciseCoach" SET "name" = 'Remo al mentón con mancuerna (vista trasera)', "searchName" = CASE WHEN "searchName" LIKE 'remo al menton con mancuerna%' THEN 'remo al menton con mancuerna (vista trasera)' || substr( "searchName", 29 ) ELSE "searchName" END
WHERE "name" = 'Remo al mentón con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1765' );
UPDATE "ExerciseGlobal" SET "name" = 'Remo al mentón con mancuerna (vista trasera)', "searchName" = CASE WHEN "searchName" LIKE 'remo al menton con mancuerna%' THEN 'remo al menton con mancuerna (vista trasera)' || substr( "searchName", 29 ) ELSE "searchName" END
WHERE "externalId" = '1765' AND "name" = 'Remo al mentón con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Elevación de talones sentado con barra (vista frontal)', "searchName" = CASE WHEN "searchName" LIKE 'elevacion de talones sentado con barra%' THEN 'elevacion de talones sentado con barra (vista frontal)' || substr( "searchName", 39 ) ELSE "searchName" END
WHERE "name" = 'Elevación de talones sentado con barra' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1371' );
UPDATE "ExerciseGlobal" SET "name" = 'Elevación de talones sentado con barra (vista frontal)', "searchName" = CASE WHEN "searchName" LIKE 'elevacion de talones sentado con barra%' THEN 'elevacion de talones sentado con barra (vista frontal)' || substr( "searchName", 39 ) ELSE "searchName" END
WHERE "externalId" = '1371' AND "name" = 'Elevación de talones sentado con barra';

UPDATE "ExerciseCoach" SET "name" = 'Elevación de piernas sentado alternado con barra (modelo mujer)', "searchName" = CASE WHEN "searchName" LIKE 'elevacion de piernas sentado alternado con barra%' THEN 'elevacion de piernas sentado alternado con barra (modelo mujer)' || substr( "searchName", 49 ) ELSE "searchName" END
WHERE "name" = 'Elevación de piernas sentado alternado con barra' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '2800' );
UPDATE "ExerciseGlobal" SET "name" = 'Elevación de piernas sentado alternado con barra (modelo mujer)', "searchName" = CASE WHEN "searchName" LIKE 'elevacion de piernas sentado alternado con barra%' THEN 'elevacion de piernas sentado alternado con barra (modelo mujer)' || substr( "searchName", 49 ) ELSE "searchName" END
WHERE "externalId" = '2800' AND "name" = 'Elevación de piernas sentado alternado con barra';

UPDATE "ExerciseCoach" SET "name" = 'Elevación de piernas con giro', "searchName" = CASE WHEN "searchName" LIKE 'twisted elevacion de piernas%' THEN 'elevacion de piernas con giro' || substr( "searchName", 29 ) ELSE "searchName" END
WHERE "name" = 'Twisted elevación de piernas' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '2802' );
UPDATE "ExerciseGlobal" SET "name" = 'Elevación de piernas con giro', "searchName" = CASE WHEN "searchName" LIKE 'twisted elevacion de piernas%' THEN 'elevacion de piernas con giro' || substr( "searchName", 29 ) ELSE "searchName" END
WHERE "externalId" = '2802' AND "name" = 'Twisted elevación de piernas';

UPDATE "ExerciseCoach" SET "name" = 'Elevación de piernas con giro (modelo mujer)', "searchName" = CASE WHEN "searchName" LIKE 'twisted elevacion de piernas%' THEN 'elevacion de piernas con giro (modelo mujer)' || substr( "searchName", 29 ) ELSE "searchName" END
WHERE "name" = 'Twisted elevación de piernas' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '2801' );
UPDATE "ExerciseGlobal" SET "name" = 'Elevación de piernas con giro (modelo mujer)', "searchName" = CASE WHEN "searchName" LIKE 'twisted elevacion de piernas%' THEN 'elevacion de piernas con giro (modelo mujer)' || substr( "searchName", 29 ) ELSE "searchName" END
WHERE "externalId" = '2801' AND "name" = 'Twisted elevación de piernas';

UPDATE "ExerciseCoach" SET "name" = 'Agarre cerrado press con mancuerna (variante 2)', "searchName" = CASE WHEN "searchName" LIKE 'agarre cerrado press con mancuerna%' THEN 'agarre cerrado press con mancuerna (variante 2)' || substr( "searchName", 35 ) ELSE "searchName" END
WHERE "name" = 'Agarre cerrado press con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1731' );
UPDATE "ExerciseGlobal" SET "name" = 'Agarre cerrado press con mancuerna (variante 2)', "searchName" = CASE WHEN "searchName" LIKE 'agarre cerrado press con mancuerna%' THEN 'agarre cerrado press con mancuerna (variante 2)' || substr( "searchName", 35 ) ELSE "searchName" END
WHERE "externalId" = '1731' AND "name" = 'Agarre cerrado press con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Crunch sentado en máquina de palanca (variante 2)', "searchName" = CASE WHEN "searchName" LIKE 'crunch sentado en maquina de palanca%' THEN 'crunch sentado en maquina de palanca (variante 2)' || substr( "searchName", 37 ) ELSE "searchName" END
WHERE "name" = 'Crunch sentado en máquina de palanca' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0595' );
UPDATE "ExerciseGlobal" SET "name" = 'Crunch sentado en máquina de palanca (variante 2)', "searchName" = CASE WHEN "searchName" LIKE 'crunch sentado en maquina de palanca%' THEN 'crunch sentado en maquina de palanca (variante 2)' || substr( "searchName", 37 ) ELSE "searchName" END
WHERE "externalId" = '0595' AND "name" = 'Crunch sentado en máquina de palanca';

UPDATE "ExerciseCoach" SET "name" = 'Curl de pie a una mano sobre banco inclinado con mancuerna (variante 2)', "searchName" = CASE WHEN "searchName" LIKE 'curl de pie a una mano sobre banco inclinado con mancuerna%' THEN 'curl de pie a una mano sobre banco inclinado con mancuerna (variante 2)' || substr( "searchName", 59 ) ELSE "searchName" END
WHERE "name" = 'Curl de pie a una mano sobre banco inclinado con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1680' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl de pie a una mano sobre banco inclinado con mancuerna (variante 2)', "searchName" = CASE WHEN "searchName" LIKE 'curl de pie a una mano sobre banco inclinado con mancuerna%' THEN 'curl de pie a una mano sobre banco inclinado con mancuerna (variante 2)' || substr( "searchName", 59 ) ELSE "searchName" END
WHERE "externalId" = '1680' AND "name" = 'Curl de pie a una mano sobre banco inclinado con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Estiramiento de gemelos con manos contra la pared (variante 2)', "searchName" = CASE WHEN "searchName" LIKE 'estiramiento de gemelos con manos contra la pared%' THEN 'estiramiento de gemelos con manos contra la pared (variante 2)' || substr( "searchName", 50 ) ELSE "searchName" END
WHERE "name" = 'Estiramiento de gemelos con manos contra la pared' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1407' );
UPDATE "ExerciseGlobal" SET "name" = 'Estiramiento de gemelos con manos contra la pared (variante 2)', "searchName" = CASE WHEN "searchName" LIKE 'estiramiento de gemelos con manos contra la pared%' THEN 'estiramiento de gemelos con manos contra la pared (variante 2)' || substr( "searchName", 50 ) ELSE "searchName" END
WHERE "externalId" = '1407' AND "name" = 'Estiramiento de gemelos con manos contra la pared';
