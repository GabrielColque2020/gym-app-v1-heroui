-- Con mancuernas en plural donde el ejercicio usa dos, y nombres largos acortados.
-- Cada ejercicio se identifica por su codigo (externalId), que no se repite.
--
-- El texto de busqueda (searchName) empieza con el nombre sin acentos: se
-- reemplaza solo ese comienzo, no las apariciones dentro de las instrucciones.
--
-- La copia de cada entrenador se renombra solo si conserva el nombre original;
-- si el entrenador le puso un nombre propio, no se toca.

UPDATE "ExerciseCoach" SET "name" = 'Abdominal completo con brazos sobre la cabeza', "searchName" = CASE WHEN "searchName" LIKE 'abdominal completo con brazos por encima de la cabeza%' THEN 'abdominal completo con brazos sobre la cabeza' || substr( "searchName", 54 ) ELSE "searchName" END
WHERE "name" = 'Abdominal completo con brazos por encima de la cabeza' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '3204' );
UPDATE "ExerciseGlobal" SET "name" = 'Abdominal completo con brazos sobre la cabeza', "searchName" = CASE WHEN "searchName" LIKE 'abdominal completo con brazos por encima de la cabeza%' THEN 'abdominal completo con brazos sobre la cabeza' || substr( "searchName", 54 ) ELSE "searchName" END
WHERE "externalId" = '3204' AND "name" = 'Abdominal completo con brazos por encima de la cabeza';

UPDATE "ExerciseCoach" SET "name" = 'Abrazo en pelota suiza', "searchName" = CASE WHEN "searchName" LIKE 'abrazo sobre pelota suiza%' THEN 'abrazo en pelota suiza' || substr( "searchName", 26 ) ELSE "searchName" END
WHERE "name" = 'Abrazo sobre pelota suiza' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1338' );
UPDATE "ExerciseGlobal" SET "name" = 'Abrazo en pelota suiza', "searchName" = CASE WHEN "searchName" LIKE 'abrazo sobre pelota suiza%' THEN 'abrazo en pelota suiza' || substr( "searchName", 26 ) ELSE "searchName" END
WHERE "externalId" = '1338' AND "name" = 'Abrazo sobre pelota suiza';

UPDATE "ExerciseCoach" SET "name" = 'Apertura a una pierna en pelota suiza con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'apertura a una pierna sobre pelota suiza con mancuerna%' THEN 'apertura a una pierna en pelota suiza con mancuernas' || substr( "searchName", 55 ) ELSE "searchName" END
WHERE "name" = 'Apertura a una pierna sobre pelota suiza con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1292' );
UPDATE "ExerciseGlobal" SET "name" = 'Apertura a una pierna en pelota suiza con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'apertura a una pierna sobre pelota suiza con mancuerna%' THEN 'apertura a una pierna en pelota suiza con mancuernas' || substr( "searchName", 55 ) ELSE "searchName" END
WHERE "externalId" = '1292' AND "name" = 'Apertura a una pierna sobre pelota suiza con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Apertura con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'apertura con mancuerna%' THEN 'apertura con mancuernas' || substr( "searchName", 23 ) ELSE "searchName" END
WHERE "name" = 'Apertura con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0308' );
UPDATE "ExerciseGlobal" SET "name" = 'Apertura con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'apertura con mancuerna%' THEN 'apertura con mancuernas' || substr( "searchName", 23 ) ELSE "searchName" END
WHERE "externalId" = '0308' AND "name" = 'Apertura con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Apertura declinada con giro con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'apertura declinada con giro con mancuerna%' THEN 'apertura declinada con giro con mancuernas' || substr( "searchName", 42 ) ELSE "searchName" END
WHERE "name" = 'Apertura declinada con giro con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0307' );
UPDATE "ExerciseGlobal" SET "name" = 'Apertura declinada con giro con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'apertura declinada con giro con mancuerna%' THEN 'apertura declinada con giro con mancuernas' || substr( "searchName", 42 ) ELSE "searchName" END
WHERE "externalId" = '0307' AND "name" = 'Apertura declinada con giro con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Apertura declinada con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'apertura declinada con mancuerna%' THEN 'apertura declinada con mancuernas' || substr( "searchName", 33 ) ELSE "searchName" END
WHERE "name" = 'Apertura declinada con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0302' );
UPDATE "ExerciseGlobal" SET "name" = 'Apertura declinada con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'apertura declinada con mancuerna%' THEN 'apertura declinada con mancuernas' || substr( "searchName", 33 ) ELSE "searchName" END
WHERE "externalId" = '0302' AND "name" = 'Apertura declinada con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Apertura de pecho en pelota suiza a una mano con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'apertura de pecho sobre pelota suiza a una mano con mancuerna%' THEN 'apertura de pecho en pelota suiza a una mano con mancuerna' || substr( "searchName", 62 ) ELSE "searchName" END
WHERE "name" = 'Apertura de pecho sobre pelota suiza a una mano con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1286' );
UPDATE "ExerciseGlobal" SET "name" = 'Apertura de pecho en pelota suiza a una mano con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'apertura de pecho sobre pelota suiza a una mano con mancuerna%' THEN 'apertura de pecho en pelota suiza a una mano con mancuerna' || substr( "searchName", 62 ) ELSE "searchName" END
WHERE "externalId" = '1286' AND "name" = 'Apertura de pecho sobre pelota suiza a una mano con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Apertura Hyght con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'apertura hyght con mancuerna%' THEN 'apertura hyght con mancuernas' || substr( "searchName", 29 ) ELSE "searchName" END
WHERE "name" = 'Apertura Hyght con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '3234' );
UPDATE "ExerciseGlobal" SET "name" = 'Apertura Hyght con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'apertura hyght con mancuerna%' THEN 'apertura hyght con mancuernas' || substr( "searchName", 29 ) ELSE "searchName" END
WHERE "externalId" = '3234' AND "name" = 'Apertura Hyght con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Apertura inclinada con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'apertura inclinada con mancuerna%' THEN 'apertura inclinada con mancuernas' || substr( "searchName", 33 ) ELSE "searchName" END
WHERE "name" = 'Apertura inclinada con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0319' );
UPDATE "ExerciseGlobal" SET "name" = 'Apertura inclinada con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'apertura inclinada con mancuerna%' THEN 'apertura inclinada con mancuernas' || substr( "searchName", 33 ) ELSE "searchName" END
WHERE "externalId" = '0319' AND "name" = 'Apertura inclinada con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Apertura inclinada con rotación con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'apertura inclinada con rotacion con mancuerna%' THEN 'apertura inclinada con rotacion con mancuernas' || substr( "searchName", 46 ) ELSE "searchName" END
WHERE "name" = 'Apertura inclinada con rotación con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0331' );
UPDATE "ExerciseGlobal" SET "name" = 'Apertura inclinada con rotación con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'apertura inclinada con rotacion con mancuerna%' THEN 'apertura inclinada con rotacion con mancuernas' || substr( "searchName", 46 ) ELSE "searchName" END
WHERE "externalId" = '0331' AND "name" = 'Apertura inclinada con rotación con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Apertura inclinada en pelota suiza a una mano en polea', "searchName" = CASE WHEN "searchName" LIKE 'apertura inclinada sobre pelota suiza a una mano en polea%' THEN 'apertura inclinada en pelota suiza a una mano en polea' || substr( "searchName", 58 ) ELSE "searchName" END
WHERE "name" = 'Apertura inclinada sobre pelota suiza a una mano en polea' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1264' );
UPDATE "ExerciseGlobal" SET "name" = 'Apertura inclinada en pelota suiza a una mano en polea', "searchName" = CASE WHEN "searchName" LIKE 'apertura inclinada sobre pelota suiza a una mano en polea%' THEN 'apertura inclinada en pelota suiza a una mano en polea' || substr( "searchName", 58 ) ELSE "searchName" END
WHERE "externalId" = '1264' AND "name" = 'Apertura inclinada sobre pelota suiza a una mano en polea';

UPDATE "ExerciseCoach" SET "name" = 'Apertura inclinada en pelota suiza con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'apertura inclinada sobre pelota suiza con mancuerna%' THEN 'apertura inclinada en pelota suiza con mancuernas' || substr( "searchName", 52 ) ELSE "searchName" END
WHERE "name" = 'Apertura inclinada sobre pelota suiza con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1278' );
UPDATE "ExerciseGlobal" SET "name" = 'Apertura inclinada en pelota suiza con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'apertura inclinada sobre pelota suiza con mancuerna%' THEN 'apertura inclinada en pelota suiza con mancuernas' || substr( "searchName", 52 ) ELSE "searchName" END
WHERE "externalId" = '1278' AND "name" = 'Apertura inclinada sobre pelota suiza con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Apertura inclinada en pelota suiza en polea', "searchName" = CASE WHEN "searchName" LIKE 'apertura inclinada sobre pelota suiza en polea%' THEN 'apertura inclinada en pelota suiza en polea' || substr( "searchName", 47 ) ELSE "searchName" END
WHERE "name" = 'Apertura inclinada sobre pelota suiza en polea' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0170' );
UPDATE "ExerciseGlobal" SET "name" = 'Apertura inclinada en pelota suiza en polea', "searchName" = CASE WHEN "searchName" LIKE 'apertura inclinada sobre pelota suiza en polea%' THEN 'apertura inclinada en pelota suiza en polea' || substr( "searchName", 47 ) ELSE "searchName" END
WHERE "externalId" = '0170' AND "name" = 'Apertura inclinada sobre pelota suiza en polea';

UPDATE "ExerciseCoach" SET "name" = 'Apertura inclinada (variante 2) con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'apertura inclinada (variante 2) con mancuerna%' THEN 'apertura inclinada (variante 2) con mancuernas' || substr( "searchName", 46 ) ELSE "searchName" END
WHERE "name" = 'Apertura inclinada (variante 2) con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0316' );
UPDATE "ExerciseGlobal" SET "name" = 'Apertura inclinada (variante 2) con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'apertura inclinada (variante 2) con mancuerna%' THEN 'apertura inclinada (variante 2) con mancuernas' || substr( "searchName", 46 ) ELSE "searchName" END
WHERE "externalId" = '0316' AND "name" = 'Apertura inclinada (variante 2) con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Apertura inversa con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'apertura inversa con mancuerna%' THEN 'apertura inversa con mancuernas' || substr( "searchName", 31 ) ELSE "searchName" END
WHERE "name" = 'Apertura inversa con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0383' );
UPDATE "ExerciseGlobal" SET "name" = 'Apertura inversa con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'apertura inversa con mancuerna%' THEN 'apertura inversa con mancuernas' || substr( "searchName", 31 ) ELSE "searchName" END
WHERE "externalId" = '0383' AND "name" = 'Apertura inversa con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Apertura inversa con rotación con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'apertura inversa con rotacion con mancuerna%' THEN 'apertura inversa con rotacion con mancuernas' || substr( "searchName", 44 ) ELSE "searchName" END
WHERE "name" = 'Apertura inversa con rotación con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0386' );
UPDATE "ExerciseGlobal" SET "name" = 'Apertura inversa con rotación con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'apertura inversa con rotacion con mancuerna%' THEN 'apertura inversa con rotacion con mancuernas' || substr( "searchName", 44 ) ELSE "searchName" END
WHERE "externalId" = '0386' AND "name" = 'Apertura inversa con rotación con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Apertura en pelota suiza a una mano con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'apertura sobre pelota suiza a una mano con mancuerna%' THEN 'apertura en pelota suiza a una mano con mancuerna' || substr( "searchName", 53 ) ELSE "searchName" END
WHERE "name" = 'Apertura sobre pelota suiza a una mano con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1288' );
UPDATE "ExerciseGlobal" SET "name" = 'Apertura en pelota suiza a una mano con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'apertura sobre pelota suiza a una mano con mancuerna%' THEN 'apertura en pelota suiza a una mano con mancuerna' || substr( "searchName", 53 ) ELSE "searchName" END
WHERE "externalId" = '1288' AND "name" = 'Apertura sobre pelota suiza a una mano con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Apertura en pelota suiza a una mano en polea', "searchName" = CASE WHEN "searchName" LIKE 'apertura sobre pelota suiza a una mano en polea%' THEN 'apertura en pelota suiza a una mano en polea' || substr( "searchName", 48 ) ELSE "searchName" END
WHERE "name" = 'Apertura sobre pelota suiza a una mano en polea' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1263' );
UPDATE "ExerciseGlobal" SET "name" = 'Apertura en pelota suiza a una mano en polea', "searchName" = CASE WHEN "searchName" LIKE 'apertura sobre pelota suiza a una mano en polea%' THEN 'apertura en pelota suiza a una mano en polea' || substr( "searchName", 48 ) ELSE "searchName" END
WHERE "externalId" = '1263' AND "name" = 'Apertura sobre pelota suiza a una mano en polea';

UPDATE "ExerciseCoach" SET "name" = 'Apertura en pelota suiza con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'apertura sobre pelota suiza con mancuerna%' THEN 'apertura en pelota suiza con mancuernas' || substr( "searchName", 42 ) ELSE "searchName" END
WHERE "name" = 'Apertura sobre pelota suiza con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1277' );
UPDATE "ExerciseGlobal" SET "name" = 'Apertura en pelota suiza con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'apertura sobre pelota suiza con mancuerna%' THEN 'apertura en pelota suiza con mancuernas' || substr( "searchName", 42 ) ELSE "searchName" END
WHERE "externalId" = '1277' AND "name" = 'Apertura sobre pelota suiza con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Apertura en pelota suiza inclinado a una mano con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'apertura sobre pelota suiza inclinado a una mano con mancuerna%' THEN 'apertura en pelota suiza inclinado a una mano con mancuerna' || substr( "searchName", 63 ) ELSE "searchName" END
WHERE "name" = 'Apertura sobre pelota suiza inclinado a una mano con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1280' );
UPDATE "ExerciseGlobal" SET "name" = 'Apertura en pelota suiza inclinado a una mano con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'apertura sobre pelota suiza inclinado a una mano con mancuerna%' THEN 'apertura en pelota suiza inclinado a una mano con mancuerna' || substr( "searchName", 63 ) ELSE "searchName" END
WHERE "externalId" = '1280' AND "name" = 'Apertura sobre pelota suiza inclinado a una mano con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Arnold press con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'arnold press con mancuerna%' THEN 'arnold press con mancuernas' || substr( "searchName", 27 ) ELSE "searchName" END
WHERE "name" = 'Arnold press con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '2137' );
UPDATE "ExerciseGlobal" SET "name" = 'Arnold press con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'arnold press con mancuerna%' THEN 'arnold press con mancuernas' || substr( "searchName", 27 ) ELSE "searchName" END
WHERE "externalId" = '2137' AND "name" = 'Arnold press con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Arnold press (variante 2) con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'arnold press (variante 2) con mancuerna%' THEN 'arnold press (variante 2) con mancuernas' || substr( "searchName", 40 ) ELSE "searchName" END
WHERE "name" = 'Arnold press (variante 2) con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0287' );
UPDATE "ExerciseGlobal" SET "name" = 'Arnold press (variante 2) con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'arnold press (variante 2) con mancuerna%' THEN 'arnold press (variante 2) con mancuernas' || substr( "searchName", 40 ) ELSE "searchName" END
WHERE "externalId" = '0287' AND "name" = 'Arnold press (variante 2) con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Buenos días con rodillas flexionadas en Smith', "searchName" = CASE WHEN "searchName" LIKE 'buenos dias con rodillas flexionadas en maquina smith%' THEN 'buenos dias con rodillas flexionadas en smith' || substr( "searchName", 54 ) ELSE "searchName" END
WHERE "name" = 'Buenos días con rodillas flexionadas en máquina Smith' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0749' );
UPDATE "ExerciseGlobal" SET "name" = 'Buenos días con rodillas flexionadas en Smith', "searchName" = CASE WHEN "searchName" LIKE 'buenos dias con rodillas flexionadas en maquina smith%' THEN 'buenos dias con rodillas flexionadas en smith' || substr( "searchName", 54 ) ELSE "searchName" END
WHERE "externalId" = '0749' AND "name" = 'Buenos días con rodillas flexionadas en máquina Smith';

UPDATE "ExerciseCoach" SET "name" = 'Burpee con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'burpee con mancuerna%' THEN 'burpee con mancuernas' || substr( "searchName", 21 ) ELSE "searchName" END
WHERE "name" = 'Burpee con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1201' );
UPDATE "ExerciseGlobal" SET "name" = 'Burpee con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'burpee con mancuerna%' THEN 'burpee con mancuernas' || substr( "searchName", 21 ) ELSE "searchName" END
WHERE "externalId" = '1201' AND "name" = 'Burpee con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Caminata con mancuerna sobre la cabeza a una mano', "searchName" = CASE WHEN "searchName" LIKE 'caminata con mancuerna por encima de la cabeza a una mano%' THEN 'caminata con mancuerna sobre la cabeza a una mano' || substr( "searchName", 58 ) ELSE "searchName" END
WHERE "name" = 'Caminata con mancuerna por encima de la cabeza a una mano' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '3548' );
UPDATE "ExerciseGlobal" SET "name" = 'Caminata con mancuerna sobre la cabeza a una mano', "searchName" = CASE WHEN "searchName" LIKE 'caminata con mancuerna por encima de la cabeza a una mano%' THEN 'caminata con mancuerna sobre la cabeza a una mano' || substr( "searchName", 58 ) ELSE "searchName" END
WHERE "externalId" = '3548' AND "name" = 'Caminata con mancuerna por encima de la cabeza a una mano';

UPDATE "ExerciseCoach" SET "name" = 'Cargada con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'cargada con mancuerna%' THEN 'cargada con mancuernas' || substr( "searchName", 22 ) ELSE "searchName" END
WHERE "name" = 'Cargada con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0295' );
UPDATE "ExerciseGlobal" SET "name" = 'Cargada con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'cargada con mancuerna%' THEN 'cargada con mancuernas' || substr( "searchName", 22 ) ELSE "searchName" END
WHERE "externalId" = '0295' AND "name" = 'Cargada con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Crunch (manos sobre la cabeza)', "searchName" = CASE WHEN "searchName" LIKE 'crunch (manos por encima de la cabeza)%' THEN 'crunch (manos sobre la cabeza)' || substr( "searchName", 39 ) ELSE "searchName" END
WHERE "name" = 'Crunch (manos por encima de la cabeza)' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0267' );
UPDATE "ExerciseGlobal" SET "name" = 'Crunch (manos sobre la cabeza)', "searchName" = CASE WHEN "searchName" LIKE 'crunch (manos por encima de la cabeza)%' THEN 'crunch (manos sobre la cabeza)' || substr( "searchName", 39 ) ELSE "searchName" END
WHERE "externalId" = '0267' AND "name" = 'Crunch (manos por encima de la cabeza)';

UPDATE "ExerciseCoach" SET "name" = 'Crunch sobre la cabeza en pelota suiza con peso', "searchName" = CASE WHEN "searchName" LIKE 'crunch por encima de la cabeza sobre pelota suiza con peso%' THEN 'crunch sobre la cabeza en pelota suiza con peso' || substr( "searchName", 59 ) ELSE "searchName" END
WHERE "name" = 'Crunch por encima de la cabeza sobre pelota suiza con peso' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0840' );
UPDATE "ExerciseGlobal" SET "name" = 'Crunch sobre la cabeza en pelota suiza con peso', "searchName" = CASE WHEN "searchName" LIKE 'crunch por encima de la cabeza sobre pelota suiza con peso%' THEN 'crunch sobre la cabeza en pelota suiza con peso' || substr( "searchName", 59 ) ELSE "searchName" END
WHERE "externalId" = '0840' AND "name" = 'Crunch por encima de la cabeza sobre pelota suiza con peso';

UPDATE "ExerciseCoach" SET "name" = 'Crunch con pelota suiza (rango completo, manos tras la cabeza)', "searchName" = CASE WHEN "searchName" LIKE 'crunch (rango completo manos detras de la cabeza) con pelota suiza%' THEN 'crunch con pelota suiza (rango completo, manos tras la cabeza)' || substr( "searchName", 67 ) ELSE "searchName" END
WHERE "name" = 'Crunch (rango completo manos detrás de la cabeza) con pelota suiza' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '2297' );
UPDATE "ExerciseGlobal" SET "name" = 'Crunch con pelota suiza (rango completo, manos tras la cabeza)', "searchName" = CASE WHEN "searchName" LIKE 'crunch (rango completo manos detras de la cabeza) con pelota suiza%' THEN 'crunch con pelota suiza (rango completo, manos tras la cabeza)' || substr( "searchName", 67 ) ELSE "searchName" END
WHERE "externalId" = '2297' AND "name" = 'Crunch (rango completo manos detrás de la cabeza) con pelota suiza';

UPDATE "ExerciseCoach" SET "name" = 'Crunch en pelota suiza', "searchName" = CASE WHEN "searchName" LIKE 'crunch sobre pelota suiza%' THEN 'crunch en pelota suiza' || substr( "searchName", 26 ) ELSE "searchName" END
WHERE "name" = 'Crunch sobre pelota suiza' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0271' );
UPDATE "ExerciseGlobal" SET "name" = 'Crunch en pelota suiza', "searchName" = CASE WHEN "searchName" LIKE 'crunch sobre pelota suiza%' THEN 'crunch en pelota suiza' || substr( "searchName", 26 ) ELSE "searchName" END
WHERE "externalId" = '0271' AND "name" = 'Crunch sobre pelota suiza';

UPDATE "ExerciseCoach" SET "name" = 'Crunch (en pelota suiza, brazos rectos)', "searchName" = CASE WHEN "searchName" LIKE 'crunch (sobre pelota suiza, brazos rectos)%' THEN 'crunch (en pelota suiza, brazos rectos)' || substr( "searchName", 43 ) ELSE "searchName" END
WHERE "name" = 'Crunch (sobre pelota suiza, brazos rectos)' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0272' );
UPDATE "ExerciseGlobal" SET "name" = 'Crunch (en pelota suiza, brazos rectos)', "searchName" = CASE WHEN "searchName" LIKE 'crunch (sobre pelota suiza, brazos rectos)%' THEN 'crunch (en pelota suiza, brazos rectos)' || substr( "searchName", 43 ) ELSE "searchName" END
WHERE "externalId" = '0272' AND "name" = 'Crunch (sobre pelota suiza, brazos rectos)';

UPDATE "ExerciseCoach" SET "name" = 'Cruz de hierro con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'cruz de hierro con mancuerna%' THEN 'cruz de hierro con mancuernas' || substr( "searchName", 29 ) ELSE "searchName" END
WHERE "name" = 'Cruz de hierro con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0332' );
UPDATE "ExerciseGlobal" SET "name" = 'Cruz de hierro con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'cruz de hierro con mancuerna%' THEN 'cruz de hierro con mancuernas' || substr( "searchName", 29 ) ELSE "searchName" END
WHERE "externalId" = '0332' AND "name" = 'Cruz de hierro con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Cuban press con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'cuban press con mancuerna%' THEN 'cuban press con mancuernas' || substr( "searchName", 26 ) ELSE "searchName" END
WHERE "name" = 'Cuban press con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0299' );
UPDATE "ExerciseGlobal" SET "name" = 'Cuban press con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'cuban press con mancuerna%' THEN 'cuban press con mancuernas' || substr( "searchName", 26 ) ELSE "searchName" END
WHERE "externalId" = '0299' AND "name" = 'Cuban press con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Cuban press (variante 2) con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'cuban press (variante 2) con mancuerna%' THEN 'cuban press (variante 2) con mancuernas' || substr( "searchName", 39 ) ELSE "searchName" END
WHERE "name" = 'Cuban press (variante 2) con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '2136' );
UPDATE "ExerciseGlobal" SET "name" = 'Cuban press (variante 2) con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'cuban press (variante 2) con mancuerna%' THEN 'cuban press (variante 2) con mancuernas' || substr( "searchName", 39 ) ELSE "searchName" END
WHERE "externalId" = '2136' AND "name" = 'Cuban press (variante 2) con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Curl alto con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'curl alto con mancuerna%' THEN 'curl alto con mancuernas' || substr( "searchName", 24 ) ELSE "searchName" END
WHERE "name" = 'Curl alto con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1664' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl alto con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'curl alto con mancuerna%' THEN 'curl alto con mancuernas' || substr( "searchName", 24 ) ELSE "searchName" END
WHERE "externalId" = '1664' AND "name" = 'Curl alto con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Curl con agarre amplio acostado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'curl con agarre amplio acostado con mancuerna%' THEN 'curl con agarre amplio acostado con mancuernas' || substr( "searchName", 46 ) ELSE "searchName" END
WHERE "name" = 'Curl con agarre amplio acostado con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1662' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl con agarre amplio acostado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'curl con agarre amplio acostado con mancuerna%' THEN 'curl con agarre amplio acostado con mancuernas' || substr( "searchName", 46 ) ELSE "searchName" END
WHERE "externalId" = '1662' AND "name" = 'Curl con agarre amplio acostado con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Curl de bíceps alternado (con arm blaster) con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'curl de biceps alternado (con arm blaster) con mancuerna%' THEN 'curl de biceps alternado (con arm blaster) con mancuernas' || substr( "searchName", 57 ) ELSE "searchName" END
WHERE "name" = 'Curl de bíceps alternado (con arm blaster) con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '2403' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl de bíceps alternado (con arm blaster) con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'curl de biceps alternado (con arm blaster) con mancuerna%' THEN 'curl de biceps alternado (con arm blaster) con mancuernas' || substr( "searchName", 57 ) ELSE "searchName" END
WHERE "externalId" = '2403' AND "name" = 'Curl de bíceps alternado (con arm blaster) con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Curl de bíceps alternado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'curl de biceps alternado con mancuerna%' THEN 'curl de biceps alternado con mancuernas' || substr( "searchName", 39 ) ELSE "searchName" END
WHERE "name" = 'Curl de bíceps alternado con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0285' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl de bíceps alternado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'curl de biceps alternado con mancuerna%' THEN 'curl de biceps alternado con mancuernas' || substr( "searchName", 39 ) ELSE "searchName" END
WHERE "externalId" = '0285' AND "name" = 'Curl de bíceps alternado con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Curl de bíceps alternado en pelota suiza con piernas elevadas', "searchName" = CASE WHEN "searchName" LIKE 'curl de biceps alternado con piernas elevadas sobre pelota suiza con mancuerna%' THEN 'curl de biceps alternado en pelota suiza con piernas elevadas' || substr( "searchName", 79 ) ELSE "searchName" END
WHERE "name" = 'Curl de bíceps alternado con piernas elevadas sobre pelota suiza con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1649' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl de bíceps alternado en pelota suiza con piernas elevadas', "searchName" = CASE WHEN "searchName" LIKE 'curl de biceps alternado con piernas elevadas sobre pelota suiza con mancuerna%' THEN 'curl de biceps alternado en pelota suiza con piernas elevadas' || substr( "searchName", 79 ) ELSE "searchName" END
WHERE "externalId" = '1649' AND "name" = 'Curl de bíceps alternado con piernas elevadas sobre pelota suiza con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Curl de bíceps a press de hombros sentado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'curl de biceps a press de hombros sentado con mancuerna%' THEN 'curl de biceps a press de hombros sentado con mancuernas' || substr( "searchName", 56 ) ELSE "searchName" END
WHERE "name" = 'Curl de bíceps a press de hombros sentado con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '3547' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl de bíceps a press de hombros sentado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'curl de biceps a press de hombros sentado con mancuerna%' THEN 'curl de biceps a press de hombros sentado con mancuernas' || substr( "searchName", 56 ) ELSE "searchName" END
WHERE "externalId" = '3547' AND "name" = 'Curl de bíceps a press de hombros sentado con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Curl de bíceps a una mano sobre la cabeza con banda', "searchName" = CASE WHEN "searchName" LIKE 'curl de biceps a una mano por encima de la cabeza con banda%' THEN 'curl de biceps a una mano sobre la cabeza con banda' || substr( "searchName", 60 ) ELSE "searchName" END
WHERE "name" = 'Curl de bíceps a una mano por encima de la cabeza con banda' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0986' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl de bíceps a una mano sobre la cabeza con banda', "searchName" = CASE WHEN "searchName" LIKE 'curl de biceps a una mano por encima de la cabeza con banda%' THEN 'curl de biceps a una mano sobre la cabeza con banda' || substr( "searchName", 60 ) ELSE "searchName" END
WHERE "externalId" = '0986' AND "name" = 'Curl de bíceps a una mano por encima de la cabeza con banda';

UPDATE "ExerciseCoach" SET "name" = 'Curl de bíceps con agarre inverso con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'curl de biceps con agarre inverso con mancuerna%' THEN 'curl de biceps con agarre inverso con mancuernas' || substr( "searchName", 48 ) ELSE "searchName" END
WHERE "name" = 'Curl de bíceps con agarre inverso con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0382' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl de bíceps con agarre inverso con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'curl de biceps con agarre inverso con mancuerna%' THEN 'curl de biceps con agarre inverso con mancuernas' || substr( "searchName", 48 ) ELSE "searchName" END
WHERE "externalId" = '0382' AND "name" = 'Curl de bíceps con agarre inverso con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Curl de bíceps (con arm blaster) con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'curl de biceps (con arm blaster) con mancuerna%' THEN 'curl de biceps (con arm blaster) con mancuernas' || substr( "searchName", 47 ) ELSE "searchName" END
WHERE "name" = 'Curl de bíceps (con arm blaster) con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '2401' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl de bíceps (con arm blaster) con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'curl de biceps (con arm blaster) con mancuerna%' THEN 'curl de biceps (con arm blaster) con mancuernas' || substr( "searchName", 47 ) ELSE "searchName" END
WHERE "externalId" = '2401' AND "name" = 'Curl de bíceps (con arm blaster) con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Curl de bíceps con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'curl de biceps con mancuerna%' THEN 'curl de biceps con mancuernas' || substr( "searchName", 29 ) ELSE "searchName" END
WHERE "name" = 'Curl de bíceps con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0294' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl de bíceps con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'curl de biceps con mancuerna%' THEN 'curl de biceps con mancuernas' || substr( "searchName", 29 ) ELSE "searchName" END
WHERE "externalId" = '0294' AND "name" = 'Curl de bíceps con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Curl de bíceps de pie con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'curl de biceps de pie con mancuerna%' THEN 'curl de biceps de pie con mancuernas' || substr( "searchName", 36 ) ELSE "searchName" END
WHERE "name" = 'Curl de bíceps de pie con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0416' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl de bíceps de pie con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'curl de biceps de pie con mancuerna%' THEN 'curl de biceps de pie con mancuernas' || substr( "searchName", 36 ) ELSE "searchName" END
WHERE "externalId" = '0416' AND "name" = 'Curl de bíceps de pie con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Curl de bíceps de rodillas en pelota suiza con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'curl de biceps de rodillas sobre pelota suiza con mancuerna%' THEN 'curl de biceps de rodillas en pelota suiza con mancuernas' || substr( "searchName", 60 ) ELSE "searchName" END
WHERE "name" = 'Curl de bíceps de rodillas sobre pelota suiza con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1660' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl de bíceps de rodillas en pelota suiza con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'curl de biceps de rodillas sobre pelota suiza con mancuerna%' THEN 'curl de biceps de rodillas en pelota suiza con mancuernas' || substr( "searchName", 60 ) ELSE "searchName" END
WHERE "externalId" = '1660' AND "name" = 'Curl de bíceps de rodillas sobre pelota suiza con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Curl de bíceps en estocada con movimiento de bolos con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'curl de biceps en estocada con movimiento de bolos con mancuerna%' THEN 'curl de biceps en estocada con movimiento de bolos con mancuernas' || substr( "searchName", 65 ) ELSE "searchName" END
WHERE "name" = 'Curl de bíceps en estocada con movimiento de bolos con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1651' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl de bíceps en estocada con movimiento de bolos con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'curl de biceps en estocada con movimiento de bolos con mancuerna%' THEN 'curl de biceps en estocada con movimiento de bolos con mancuernas' || substr( "searchName", 65 ) ELSE "searchName" END
WHERE "externalId" = '1651' AND "name" = 'Curl de bíceps en estocada con movimiento de bolos con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Curl de bíceps en Smith', "searchName" = CASE WHEN "searchName" LIKE 'curl de biceps en maquina smith%' THEN 'curl de biceps en smith' || substr( "searchName", 32 ) ELSE "searchName" END
WHERE "name" = 'Curl de bíceps en máquina Smith' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1683' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl de bíceps en Smith', "searchName" = CASE WHEN "searchName" LIKE 'curl de biceps en maquina smith%' THEN 'curl de biceps en smith' || substr( "searchName", 32 ) ELSE "searchName" END
WHERE "externalId" = '1683' AND "name" = 'Curl de bíceps en máquina Smith';

UPDATE "ExerciseCoach" SET "name" = 'Curl de bíceps en posición de cigüeña con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'curl de biceps en posicion de ciguena con mancuerna%' THEN 'curl de biceps en posicion de ciguena con mancuernas' || substr( "searchName", 52 ) ELSE "searchName" END
WHERE "name" = 'Curl de bíceps en posición de cigüeña con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1653' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl de bíceps en posición de cigüeña con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'curl de biceps en posicion de ciguena con mancuerna%' THEN 'curl de biceps en posicion de ciguena con mancuernas' || substr( "searchName", 52 ) ELSE "searchName" END
WHERE "externalId" = '1653' AND "name" = 'Curl de bíceps en posición de cigüeña con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Curl de bíceps en sentadilla con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'curl de biceps en sentadilla con mancuerna%' THEN 'curl de biceps en sentadilla con mancuernas' || substr( "searchName", 43 ) ELSE "searchName" END
WHERE "name" = 'Curl de bíceps en sentadilla con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1655' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl de bíceps en sentadilla con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'curl de biceps en sentadilla con mancuerna%' THEN 'curl de biceps en sentadilla con mancuernas' || substr( "searchName", 43 ) ELSE "searchName" END
WHERE "externalId" = '1655' AND "name" = 'Curl de bíceps en sentadilla con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Curl de bíceps en V-sit sobre BOSU con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'curl de biceps en v-sit sobre bosu con mancuerna%' THEN 'curl de biceps en v-sit sobre bosu con mancuernas' || substr( "searchName", 49 ) ELSE "searchName" END
WHERE "name" = 'Curl de bíceps en V-sit sobre BOSU con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1656' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl de bíceps en V-sit sobre BOSU con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'curl de biceps en v-sit sobre bosu con mancuerna%' THEN 'curl de biceps en v-sit sobre bosu con mancuernas' || substr( "searchName", 49 ) ELSE "searchName" END
WHERE "externalId" = '1656' AND "name" = 'Curl de bíceps en V-sit sobre BOSU con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Curl de bíceps inclinado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'curl de biceps inclinado con mancuerna%' THEN 'curl de biceps inclinado con mancuernas' || substr( "searchName", 39 ) ELSE "searchName" END
WHERE "name" = 'Curl de bíceps inclinado con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0315' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl de bíceps inclinado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'curl de biceps inclinado con mancuerna%' THEN 'curl de biceps inclinado con mancuernas' || substr( "searchName", 39 ) ELSE "searchName" END
WHERE "externalId" = '0315' AND "name" = 'Curl de bíceps inclinado con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Curl de bíceps inverso con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'curl de biceps inverso con mancuerna%' THEN 'curl de biceps inverso con mancuernas' || substr( "searchName", 37 ) ELSE "searchName" END
WHERE "name" = 'Curl de bíceps inverso con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1654' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl de bíceps inverso con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'curl de biceps inverso con mancuerna%' THEN 'curl de biceps inverso con mancuernas' || substr( "searchName", 37 ) ELSE "searchName" END
WHERE "externalId" = '1654' AND "name" = 'Curl de bíceps inverso con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Curl de bíceps sentado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'curl de biceps sentado con mancuerna%' THEN 'curl de biceps sentado con mancuernas' || substr( "searchName", 37 ) ELSE "searchName" END
WHERE "name" = 'Curl de bíceps sentado con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1677' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl de bíceps sentado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'curl de biceps sentado con mancuerna%' THEN 'curl de biceps sentado con mancuernas' || substr( "searchName", 37 ) ELSE "searchName" END
WHERE "externalId" = '1677' AND "name" = 'Curl de bíceps sentado con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Curl de bíceps en pelota suiza alternado sentado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'curl de biceps sobre pelota suiza alternado sentado con mancuerna%' THEN 'curl de biceps en pelota suiza alternado sentado con mancuernas' || substr( "searchName", 66 ) ELSE "searchName" END
WHERE "name" = 'Curl de bíceps sobre pelota suiza alternado sentado con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1650' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl de bíceps en pelota suiza alternado sentado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'curl de biceps sobre pelota suiza alternado sentado con mancuerna%' THEN 'curl de biceps en pelota suiza alternado sentado con mancuernas' || substr( "searchName", 66 ) ELSE "searchName" END
WHERE "externalId" = '1650' AND "name" = 'Curl de bíceps sobre pelota suiza alternado sentado con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Curl de bíceps en pelota suiza con piernas elevadas', "searchName" = CASE WHEN "searchName" LIKE 'curl de biceps sobre pelota suiza con piernas elevadas con mancuerna%' THEN 'curl de biceps en pelota suiza con piernas elevadas' || substr( "searchName", 69 ) ELSE "searchName" END
WHERE "name" = 'Curl de bíceps sobre pelota suiza con piernas elevadas con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1652' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl de bíceps en pelota suiza con piernas elevadas', "searchName" = CASE WHEN "searchName" LIKE 'curl de biceps sobre pelota suiza con piernas elevadas con mancuerna%' THEN 'curl de biceps en pelota suiza con piernas elevadas' || substr( "searchName", 69 ) ELSE "searchName" END
WHERE "externalId" = '1652' AND "name" = 'Curl de bíceps sobre pelota suiza con piernas elevadas con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Curl de bíceps en pelota suiza sentado a una mano con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'curl de biceps sobre pelota suiza sentado a una mano con mancuerna%' THEN 'curl de biceps en pelota suiza sentado a una mano con mancuerna' || substr( "searchName", 67 ) ELSE "searchName" END
WHERE "name" = 'Curl de bíceps sobre pelota suiza sentado a una mano con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1668' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl de bíceps en pelota suiza sentado a una mano con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'curl de biceps sobre pelota suiza sentado a una mano con mancuerna%' THEN 'curl de biceps en pelota suiza sentado a una mano con mancuerna' || substr( "searchName", 67 ) ELSE "searchName" END
WHERE "externalId" = '1668' AND "name" = 'Curl de bíceps sobre pelota suiza sentado a una mano con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Curl de bíceps sentado en pelota suiza a una mano con piernas elevadas', "searchName" = CASE WHEN "searchName" LIKE 'curl de biceps sobre pelota suiza sentado a una mano con piernas elevadas con mancuerna%' THEN 'curl de biceps sentado en pelota suiza a una mano con piernas elevadas' || substr( "searchName", 88 ) ELSE "searchName" END
WHERE "name" = 'Curl de bíceps sobre pelota suiza sentado a una mano con piernas elevadas con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1679' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl de bíceps sentado en pelota suiza a una mano con piernas elevadas', "searchName" = CASE WHEN "searchName" LIKE 'curl de biceps sobre pelota suiza sentado a una mano con piernas elevadas con mancuerna%' THEN 'curl de biceps sentado en pelota suiza a una mano con piernas elevadas' || substr( "searchName", 88 ) ELSE "searchName" END
WHERE "externalId" = '1679' AND "name" = 'Curl de bíceps sobre pelota suiza sentado a una mano con piernas elevadas con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Curl de bíceps en pelota suiza sentado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'curl de biceps sobre pelota suiza sentado con mancuerna%' THEN 'curl de biceps en pelota suiza sentado con mancuernas' || substr( "searchName", 56 ) ELSE "searchName" END
WHERE "name" = 'Curl de bíceps sobre pelota suiza sentado con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0390' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl de bíceps en pelota suiza sentado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'curl de biceps sobre pelota suiza sentado con mancuerna%' THEN 'curl de biceps en pelota suiza sentado con mancuernas' || substr( "searchName", 56 ) ELSE "searchName" END
WHERE "externalId" = '0390' AND "name" = 'Curl de bíceps sobre pelota suiza sentado con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Curl de bíceps en pelota suiza sentado con peso', "searchName" = CASE WHEN "searchName" LIKE 'curl de biceps sobre pelota suiza sentado con peso%' THEN 'curl de biceps en pelota suiza sentado con peso' || substr( "searchName", 51 ) ELSE "searchName" END
WHERE "name" = 'Curl de bíceps sobre pelota suiza sentado con peso' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0847' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl de bíceps en pelota suiza sentado con peso', "searchName" = CASE WHEN "searchName" LIKE 'curl de biceps sobre pelota suiza sentado con peso%' THEN 'curl de biceps en pelota suiza sentado con peso' || substr( "searchName", 51 ) ELSE "searchName" END
WHERE "externalId" = '0847' AND "name" = 'Curl de bíceps sobre pelota suiza sentado con peso';

UPDATE "ExerciseCoach" SET "name" = 'Curl de bíceps supino acostado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'curl de biceps supino acostado con mancuerna%' THEN 'curl de biceps supino acostado con mancuernas' || substr( "searchName", 45 ) ELSE "searchName" END
WHERE "name" = 'Curl de bíceps supino acostado con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1661' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl de bíceps supino acostado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'curl de biceps supino acostado con mancuerna%' THEN 'curl de biceps supino acostado con mancuernas' || substr( "searchName", 45 ) ELSE "searchName" END
WHERE "externalId" = '1661' AND "name" = 'Curl de bíceps supino acostado con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Curl de concentración en pelota suiza a una mano con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'curl de concentracion sobre pelota suiza a una mano con mancuerna%' THEN 'curl de concentracion en pelota suiza a una mano con mancuerna' || substr( "searchName", 66 ) ELSE "searchName" END
WHERE "name" = 'Curl de concentración sobre pelota suiza a una mano con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0353' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl de concentración en pelota suiza a una mano con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'curl de concentracion sobre pelota suiza a una mano con mancuerna%' THEN 'curl de concentracion en pelota suiza a una mano con mancuerna' || substr( "searchName", 66 ) ELSE "searchName" END
WHERE "externalId" = '0353' AND "name" = 'Curl de concentración sobre pelota suiza a una mano con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Curl de dedos con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'curl de dedos con mancuerna%' THEN 'curl de dedos con mancuernas' || substr( "searchName", 28 ) ELSE "searchName" END
WHERE "name" = 'Curl de dedos con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1437' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl de dedos con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'curl de dedos con mancuerna%' THEN 'curl de dedos con mancuernas' || substr( "searchName", 28 ) ELSE "searchName" END
WHERE "externalId" = '1437' AND "name" = 'Curl de dedos con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Curl femoral a una pierna con patada diagonal en pelota suiza', "searchName" = CASE WHEN "searchName" LIKE 'curl de isquiotibiales con patada diagonal a una pierna sobre pelota suiza%' THEN 'curl femoral a una pierna con patada diagonal en pelota suiza' || substr( "searchName", 75 ) ELSE "searchName" END
WHERE "name" = 'Curl de isquiotibiales con patada diagonal a una pierna sobre pelota suiza' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1417' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl femoral a una pierna con patada diagonal en pelota suiza', "searchName" = CASE WHEN "searchName" LIKE 'curl de isquiotibiales con patada diagonal a una pierna sobre pelota suiza%' THEN 'curl femoral a una pierna con patada diagonal en pelota suiza' || substr( "searchName", 75 ) ELSE "searchName" END
WHERE "externalId" = '1417' AND "name" = 'Curl de isquiotibiales con patada diagonal a una pierna sobre pelota suiza';

UPDATE "ExerciseCoach" SET "name" = 'Curl de muñeca de pie detrás de la espalda en Smith', "searchName" = CASE WHEN "searchName" LIKE 'curl de muneca de pie detras de la espalda en maquina smith%' THEN 'curl de muneca de pie detras de la espalda en smith' || substr( "searchName", 60 ) ELSE "searchName" END
WHERE "name" = 'Curl de muñeca de pie detrás de la espalda en máquina Smith' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0771' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl de muñeca de pie detrás de la espalda en Smith', "searchName" = CASE WHEN "searchName" LIKE 'curl de muneca de pie detras de la espalda en maquina smith%' THEN 'curl de muneca de pie detras de la espalda en smith' || substr( "searchName", 60 ) ELSE "searchName" END
WHERE "externalId" = '0771' AND "name" = 'Curl de muñeca de pie detrás de la espalda en máquina Smith';

UPDATE "ExerciseCoach" SET "name" = 'Curl de muñeca sentado en Smith', "searchName" = CASE WHEN "searchName" LIKE 'curl de muneca sentado en maquina smith%' THEN 'curl de muneca sentado en smith' || substr( "searchName", 40 ) ELSE "searchName" END
WHERE "name" = 'Curl de muñeca sentado en máquina Smith' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1426' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl de muñeca sentado en Smith', "searchName" = CASE WHEN "searchName" LIKE 'curl de muneca sentado en maquina smith%' THEN 'curl de muneca sentado en smith' || substr( "searchName", 40 ) ELSE "searchName" END
WHERE "externalId" = '1426' AND "name" = 'Curl de muñeca sentado en máquina Smith';

UPDATE "ExerciseCoach" SET "name" = 'Curl de muñeca sobre banco con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'curl de muneca sobre banco con mancuerna%' THEN 'curl de muneca sobre banco con mancuernas' || substr( "searchName", 41 ) ELSE "searchName" END
WHERE "name" = 'Curl de muñeca sobre banco con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0369' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl de muñeca sobre banco con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'curl de muneca sobre banco con mancuerna%' THEN 'curl de muneca sobre banco con mancuernas' || substr( "searchName", 41 ) ELSE "searchName" END
WHERE "externalId" = '0369' AND "name" = 'Curl de muñeca sobre banco con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Curl de muñeca supino sentado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'curl de muneca supino sentado con mancuerna%' THEN 'curl de muneca supino sentado con mancuernas' || substr( "searchName", 44 ) ELSE "searchName" END
WHERE "name" = 'Curl de muñeca supino sentado con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0401' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl de muñeca supino sentado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'curl de muneca supino sentado con mancuerna%' THEN 'curl de muneca supino sentado con mancuernas' || substr( "searchName", 44 ) ELSE "searchName" END
WHERE "externalId" = '0401' AND "name" = 'Curl de muñeca supino sentado con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Curl en banco Scott alternado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'curl en banco scott alternado con mancuerna%' THEN 'curl en banco scott alternado con mancuernas' || substr( "searchName", 44 ) ELSE "searchName" END
WHERE "name" = 'Curl en banco Scott alternado con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1647' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl en banco Scott alternado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'curl en banco scott alternado con mancuerna%' THEN 'curl en banco scott alternado con mancuernas' || substr( "searchName", 44 ) ELSE "searchName" END
WHERE "externalId" = '1647' AND "name" = 'Curl en banco Scott alternado con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Curl en banco Scott con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'curl en banco scott con mancuerna%' THEN 'curl en banco scott con mancuernas' || substr( "searchName", 34 ) ELSE "searchName" END
WHERE "name" = 'Curl en banco Scott con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0372' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl en banco Scott con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'curl en banco scott con mancuerna%' THEN 'curl en banco scott con mancuernas' || substr( "searchName", 34 ) ELSE "searchName" END
WHERE "externalId" = '0372' AND "name" = 'Curl en banco Scott con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Curl en banco Scott de pie con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'curl en banco scott de pie con mancuerna%' THEN 'curl en banco scott de pie con mancuernas' || substr( "searchName", 41 ) ELSE "searchName" END
WHERE "name" = 'Curl en banco Scott de pie con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0428' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl en banco Scott de pie con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'curl en banco scott de pie con mancuerna%' THEN 'curl en banco scott de pie con mancuernas' || substr( "searchName", 41 ) ELSE "searchName" END
WHERE "externalId" = '0428' AND "name" = 'Curl en banco Scott de pie con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Curl en banco Scott sentado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'curl en banco scott sentado con mancuerna%' THEN 'curl en banco scott sentado con mancuernas' || substr( "searchName", 42 ) ELSE "searchName" END
WHERE "name" = 'Curl en banco Scott sentado con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0402' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl en banco Scott sentado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'curl en banco scott sentado con mancuerna%' THEN 'curl en banco scott sentado con mancuernas' || substr( "searchName", 42 ) ELSE "searchName" END
WHERE "externalId" = '0402' AND "name" = 'Curl en banco Scott sentado con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Curl en banco Scott en pelota suiza con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'curl en banco scott sobre pelota suiza con mancuerna%' THEN 'curl en banco scott en pelota suiza con mancuernas' || substr( "searchName", 53 ) ELSE "searchName" END
WHERE "name" = 'Curl en banco Scott sobre pelota suiza con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1673' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl en banco Scott en pelota suiza con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'curl en banco scott sobre pelota suiza con mancuerna%' THEN 'curl en banco scott en pelota suiza con mancuernas' || substr( "searchName", 53 ) ELSE "searchName" END
WHERE "externalId" = '1673' AND "name" = 'Curl en banco Scott sobre pelota suiza con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Curl inclinado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'curl inclinado con mancuerna%' THEN 'curl inclinado con mancuernas' || substr( "searchName", 29 ) ELSE "searchName" END
WHERE "name" = 'Curl inclinado con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0318' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl inclinado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'curl inclinado con mancuerna%' THEN 'curl inclinado con mancuernas' || substr( "searchName", 29 ) ELSE "searchName" END
WHERE "externalId" = '0318' AND "name" = 'Curl inclinado con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Curl interior de bíceps de pie (variante 2) con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'curl interior de biceps de pie (variante 2) con mancuerna%' THEN 'curl interior de biceps de pie (variante 2) con mancuernas' || substr( "searchName", 58 ) ELSE "searchName" END
WHERE "name" = 'Curl interior de bíceps de pie (variante 2) con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '2321' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl interior de bíceps de pie (variante 2) con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'curl interior de biceps de pie (variante 2) con mancuerna%' THEN 'curl interior de biceps de pie (variante 2) con mancuernas' || substr( "searchName", 58 ) ELSE "searchName" END
WHERE "externalId" = '2321' AND "name" = 'Curl interior de bíceps de pie (variante 2) con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Curl interior de bíceps inclinado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'curl interior de biceps inclinado con mancuerna%' THEN 'curl interior de biceps inclinado con mancuernas' || substr( "searchName", 48 ) ELSE "searchName" END
WHERE "name" = 'Curl interior de bíceps inclinado con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0322' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl interior de bíceps inclinado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'curl interior de biceps inclinado con mancuerna%' THEN 'curl interior de biceps inclinado con mancuernas' || substr( "searchName", 48 ) ELSE "searchName" END
WHERE "externalId" = '0322' AND "name" = 'Curl interior de bíceps inclinado con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Curl interior de bíceps sentado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'curl interior de biceps sentado con mancuerna%' THEN 'curl interior de biceps sentado con mancuernas' || substr( "searchName", 46 ) ELSE "searchName" END
WHERE "name" = 'Curl interior de bíceps sentado con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0393' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl interior de bíceps sentado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'curl interior de biceps sentado con mancuerna%' THEN 'curl interior de biceps sentado con mancuernas' || substr( "searchName", 46 ) ELSE "searchName" END
WHERE "externalId" = '0393' AND "name" = 'Curl interior de bíceps sentado con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Curl inverso de muñeca con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'curl inverso de muneca con mancuerna%' THEN 'curl inverso de muneca con mancuernas' || substr( "searchName", 37 ) ELSE "searchName" END
WHERE "name" = 'Curl inverso de muñeca con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0385' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl inverso de muñeca con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'curl inverso de muneca con mancuerna%' THEN 'curl inverso de muneca con mancuernas' || substr( "searchName", 37 ) ELSE "searchName" END
WHERE "externalId" = '0385' AND "name" = 'Curl inverso de muñeca con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Curl inverso de muñeca sobre banco con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'curl inverso de muneca sobre banco con mancuerna%' THEN 'curl inverso de muneca sobre banco con mancuernas' || substr( "searchName", 49 ) ELSE "searchName" END
WHERE "name" = 'Curl inverso de muñeca sobre banco con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0368' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl inverso de muñeca sobre banco con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'curl inverso de muneca sobre banco con mancuerna%' THEN 'curl inverso de muneca sobre banco con mancuernas' || substr( "searchName", 49 ) ELSE "searchName" END
WHERE "externalId" = '0368' AND "name" = 'Curl inverso de muñeca sobre banco con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Curl inverso de pie con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'curl inverso de pie con mancuerna%' THEN 'curl inverso de pie con mancuernas' || substr( "searchName", 34 ) ELSE "searchName" END
WHERE "name" = 'Curl inverso de pie con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0429' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl inverso de pie con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'curl inverso de pie con mancuerna%' THEN 'curl inverso de pie con mancuernas' || substr( "searchName", 34 ) ELSE "searchName" END
WHERE "externalId" = '0429' AND "name" = 'Curl inverso de pie con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Curl inverso en banco Scott con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'curl inverso en banco scott con mancuerna%' THEN 'curl inverso en banco scott con mancuernas' || substr( "searchName", 42 ) ELSE "searchName" END
WHERE "name" = 'Curl inverso en banco Scott con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0384' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl inverso en banco Scott con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'curl inverso en banco scott con mancuerna%' THEN 'curl inverso en banco scott con mancuernas' || substr( "searchName", 42 ) ELSE "searchName" END
WHERE "externalId" = '0384' AND "name" = 'Curl inverso en banco Scott con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Curl martillo alternado sentado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'curl martillo alternado sentado con mancuerna%' THEN 'curl martillo alternado sentado con mancuernas' || substr( "searchName", 46 ) ELSE "searchName" END
WHERE "name" = 'Curl martillo alternado sentado con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1648' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl martillo alternado sentado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'curl martillo alternado sentado con mancuerna%' THEN 'curl martillo alternado sentado con mancuernas' || substr( "searchName", 46 ) ELSE "searchName" END
WHERE "externalId" = '1648' AND "name" = 'Curl martillo alternado sentado con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Curl martillo (con arm blaster) con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'curl martillo (con arm blaster) con mancuerna%' THEN 'curl martillo (con arm blaster) con mancuernas' || substr( "searchName", 46 ) ELSE "searchName" END
WHERE "name" = 'Curl martillo (con arm blaster) con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '2402' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl martillo (con arm blaster) con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'curl martillo (con arm blaster) con mancuerna%' THEN 'curl martillo (con arm blaster) con mancuernas' || substr( "searchName", 46 ) ELSE "searchName" END
WHERE "externalId" = '2402' AND "name" = 'Curl martillo (con arm blaster) con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Curl martillo con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'curl martillo con mancuerna%' THEN 'curl martillo con mancuernas' || substr( "searchName", 28 ) ELSE "searchName" END
WHERE "name" = 'Curl martillo con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0313' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl martillo con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'curl martillo con mancuerna%' THEN 'curl martillo con mancuernas' || substr( "searchName", 28 ) ELSE "searchName" END
WHERE "externalId" = '0313' AND "name" = 'Curl martillo con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Curl martillo cruzado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'curl martillo cruzado con mancuerna%' THEN 'curl martillo cruzado con mancuernas' || substr( "searchName", 36 ) ELSE "searchName" END
WHERE "name" = 'Curl martillo cruzado con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0298' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl martillo cruzado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'curl martillo cruzado con mancuerna%' THEN 'curl martillo cruzado con mancuernas' || substr( "searchName", 36 ) ELSE "searchName" END
WHERE "externalId" = '0298' AND "name" = 'Curl martillo cruzado con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Curl martillo cruzado (variante 2) con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'curl martillo cruzado (variante 2) con mancuerna%' THEN 'curl martillo cruzado (variante 2) con mancuernas' || substr( "searchName", 49 ) ELSE "searchName" END
WHERE "name" = 'Curl martillo cruzado (variante 2) con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1657' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl martillo cruzado (variante 2) con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'curl martillo cruzado (variante 2) con mancuerna%' THEN 'curl martillo cruzado (variante 2) con mancuernas' || substr( "searchName", 49 ) ELSE "searchName" END
WHERE "externalId" = '1657' AND "name" = 'Curl martillo cruzado (variante 2) con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Curl martillo en banco Scott alternado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'curl martillo en banco scott alternado con mancuerna%' THEN 'curl martillo en banco scott alternado con mancuernas' || substr( "searchName", 53 ) ELSE "searchName" END
WHERE "name" = 'Curl martillo en banco Scott alternado con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1646' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl martillo en banco Scott alternado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'curl martillo en banco scott alternado con mancuerna%' THEN 'curl martillo en banco scott alternado con mancuernas' || substr( "searchName", 53 ) ELSE "searchName" END
WHERE "externalId" = '1646' AND "name" = 'Curl martillo en banco Scott alternado con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Curl martillo en banco Scott con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'curl martillo en banco scott con mancuerna%' THEN 'curl martillo en banco scott con mancuernas' || substr( "searchName", 43 ) ELSE "searchName" END
WHERE "name" = 'Curl martillo en banco Scott con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0370' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl martillo en banco Scott con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'curl martillo en banco scott con mancuerna%' THEN 'curl martillo en banco scott con mancuernas' || substr( "searchName", 43 ) ELSE "searchName" END
WHERE "externalId" = '0370' AND "name" = 'Curl martillo en banco Scott con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Curl martillo inclinado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'curl martillo inclinado con mancuerna%' THEN 'curl martillo inclinado con mancuernas' || substr( "searchName", 38 ) ELSE "searchName" END
WHERE "name" = 'Curl martillo inclinado con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0320' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl martillo inclinado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'curl martillo inclinado con mancuerna%' THEN 'curl martillo inclinado con mancuernas' || substr( "searchName", 38 ) ELSE "searchName" END
WHERE "externalId" = '0320' AND "name" = 'Curl martillo inclinado con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Curl martillo prono inclinado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'curl martillo prono inclinado con mancuerna%' THEN 'curl martillo prono inclinado con mancuernas' || substr( "searchName", 44 ) ELSE "searchName" END
WHERE "name" = 'Curl martillo prono inclinado con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1674' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl martillo prono inclinado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'curl martillo prono inclinado con mancuerna%' THEN 'curl martillo prono inclinado con mancuernas' || substr( "searchName", 44 ) ELSE "searchName" END
WHERE "externalId" = '1674' AND "name" = 'Curl martillo prono inclinado con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Curl martillo sentado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'curl martillo sentado con mancuerna%' THEN 'curl martillo sentado con mancuernas' || substr( "searchName", 36 ) ELSE "searchName" END
WHERE "name" = 'Curl martillo sentado con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1678' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl martillo sentado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'curl martillo sentado con mancuerna%' THEN 'curl martillo sentado con mancuernas' || substr( "searchName", 36 ) ELSE "searchName" END
WHERE "externalId" = '1678' AND "name" = 'Curl martillo sentado con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Curl martillo en pelota suiza con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'curl martillo sobre pelota suiza con mancuerna%' THEN 'curl martillo en pelota suiza con mancuernas' || substr( "searchName", 47 ) ELSE "searchName" END
WHERE "name" = 'Curl martillo sobre pelota suiza con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1659' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl martillo en pelota suiza con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'curl martillo sobre pelota suiza con mancuerna%' THEN 'curl martillo en pelota suiza con mancuernas' || substr( "searchName", 47 ) ELSE "searchName" END
WHERE "externalId" = '1659' AND "name" = 'Curl martillo sobre pelota suiza con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Curl martillo en pelota suiza sentado alternado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'curl martillo sobre pelota suiza sentado alternado con mancuerna%' THEN 'curl martillo en pelota suiza sentado alternado con mancuernas' || substr( "searchName", 65 ) ELSE "searchName" END
WHERE "name" = 'Curl martillo sobre pelota suiza sentado alternado con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1676' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl martillo en pelota suiza sentado alternado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'curl martillo sobre pelota suiza sentado alternado con mancuerna%' THEN 'curl martillo en pelota suiza sentado alternado con mancuernas' || substr( "searchName", 65 ) ELSE "searchName" END
WHERE "externalId" = '1676' AND "name" = 'Curl martillo sobre pelota suiza sentado alternado con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Curl martillo (variante 2) con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'curl martillo (variante 2) con mancuerna%' THEN 'curl martillo (variante 2) con mancuernas' || substr( "searchName", 41 ) ELSE "searchName" END
WHERE "name" = 'Curl martillo (variante 2) con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0312' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl martillo (variante 2) con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'curl martillo (variante 2) con mancuerna%' THEN 'curl martillo (variante 2) con mancuernas' || substr( "searchName", 41 ) ELSE "searchName" END
WHERE "externalId" = '0312' AND "name" = 'Curl martillo (variante 2) con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Curl martillo y press de pie alternado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'curl martillo y press de pie alternado con mancuerna%' THEN 'curl martillo y press de pie alternado con mancuernas' || substr( "searchName", 53 ) ELSE "searchName" END
WHERE "name" = 'Curl martillo y press de pie alternado con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '3560' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl martillo y press de pie alternado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'curl martillo y press de pie alternado con mancuerna%' THEN 'curl martillo y press de pie alternado con mancuernas' || substr( "searchName", 53 ) ELSE "searchName" END
WHERE "externalId" = '3560' AND "name" = 'Curl martillo y press de pie alternado con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Curl neutro de muñeca sentado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'curl neutro de muneca sentado con mancuerna%' THEN 'curl neutro de muneca sentado con mancuernas' || substr( "searchName", 44 ) ELSE "searchName" END
WHERE "name" = 'Curl neutro de muñeca sentado con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0397' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl neutro de muñeca sentado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'curl neutro de muneca sentado con mancuerna%' THEN 'curl neutro de muneca sentado con mancuernas' || substr( "searchName", 44 ) ELSE "searchName" END
WHERE "externalId" = '0397' AND "name" = 'Curl neutro de muñeca sentado con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Curl neutro de muñeca sobre banco con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'curl neutro de muneca sobre banco con mancuerna%' THEN 'curl neutro de muneca sobre banco con mancuernas' || substr( "searchName", 48 ) ELSE "searchName" END
WHERE "name" = 'Curl neutro de muñeca sobre banco con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0365' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl neutro de muñeca sobre banco con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'curl neutro de muneca sobre banco con mancuerna%' THEN 'curl neutro de muneca sobre banco con mancuernas' || substr( "searchName", 48 ) ELSE "searchName" END
WHERE "externalId" = '0365' AND "name" = 'Curl neutro de muñeca sobre banco con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Curl sobre la cabeza en polea', "searchName" = CASE WHEN "searchName" LIKE 'curl por encima de la cabeza en polea%' THEN 'curl sobre la cabeza en polea' || substr( "searchName", 38 ) ELSE "searchName" END
WHERE "name" = 'Curl por encima de la cabeza en polea' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1636' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl sobre la cabeza en polea', "searchName" = CASE WHEN "searchName" LIKE 'curl por encima de la cabeza en polea%' THEN 'curl sobre la cabeza en polea' || substr( "searchName", 38 ) ELSE "searchName" END
WHERE "externalId" = '1636' AND "name" = 'Curl por encima de la cabeza en polea';

UPDATE "ExerciseCoach" SET "name" = 'Curl sobre la cabeza sentado en polea', "searchName" = CASE WHEN "searchName" LIKE 'curl por encima de la cabeza sentado en polea%' THEN 'curl sobre la cabeza sentado en polea' || substr( "searchName", 46 ) ELSE "searchName" END
WHERE "name" = 'Curl por encima de la cabeza sentado en polea' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1643' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl sobre la cabeza sentado en polea', "searchName" = CASE WHEN "searchName" LIKE 'curl por encima de la cabeza sentado en polea%' THEN 'curl sobre la cabeza sentado en polea' || substr( "searchName", 46 ) ELSE "searchName" END
WHERE "externalId" = '1643' AND "name" = 'Curl por encima de la cabeza sentado en polea';

UPDATE "ExerciseCoach" SET "name" = 'Curl sobre la cabeza en pelota suiza en polea', "searchName" = CASE WHEN "searchName" LIKE 'curl por encima de la cabeza sobre pelota suiza en polea%' THEN 'curl sobre la cabeza en pelota suiza en polea' || substr( "searchName", 57 ) ELSE "searchName" END
WHERE "name" = 'Curl por encima de la cabeza sobre pelota suiza en polea' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1637' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl sobre la cabeza en pelota suiza en polea', "searchName" = CASE WHEN "searchName" LIKE 'curl por encima de la cabeza sobre pelota suiza en polea%' THEN 'curl sobre la cabeza en pelota suiza en polea' || substr( "searchName", 57 ) ELSE "searchName" END
WHERE "externalId" = '1637' AND "name" = 'Curl por encima de la cabeza sobre pelota suiza en polea';

UPDATE "ExerciseCoach" SET "name" = 'Curl prono inclinado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'curl prono inclinado con mancuerna%' THEN 'curl prono inclinado con mancuernas' || substr( "searchName", 35 ) ELSE "searchName" END
WHERE "name" = 'Curl prono inclinado con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0374' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl prono inclinado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'curl prono inclinado con mancuerna%' THEN 'curl prono inclinado con mancuernas' || substr( "searchName", 35 ) ELSE "searchName" END
WHERE "externalId" = '0374' AND "name" = 'Curl prono inclinado con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Curl sentado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'curl sentado con mancuerna%' THEN 'curl sentado con mancuernas' || substr( "searchName", 27 ) ELSE "searchName" END
WHERE "name" = 'Curl sentado con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0391' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl sentado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'curl sentado con mancuerna%' THEN 'curl sentado con mancuernas' || substr( "searchName", 27 ) ELSE "searchName" END
WHERE "externalId" = '0391' AND "name" = 'Curl sentado con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Curl spider inverso con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'curl spider inverso con mancuerna%' THEN 'curl spider inverso con mancuernas' || substr( "searchName", 34 ) ELSE "searchName" END
WHERE "name" = 'Curl spider inverso con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1675' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl spider inverso con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'curl spider inverso con mancuerna%' THEN 'curl spider inverso con mancuernas' || substr( "searchName", 34 ) ELSE "searchName" END
WHERE "externalId" = '1675' AND "name" = 'Curl spider inverso con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Curl supino acostado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'curl supino acostado con mancuerna%' THEN 'curl supino acostado con mancuernas' || substr( "searchName", 35 ) ELSE "searchName" END
WHERE "name" = 'Curl supino acostado con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0350' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl supino acostado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'curl supino acostado con mancuerna%' THEN 'curl supino acostado con mancuernas' || substr( "searchName", 35 ) ELSE "searchName" END
WHERE "externalId" = '0350' AND "name" = 'Curl supino acostado con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Curl (variante 2) inclinado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'curl (variante 2) inclinado con mancuerna%' THEN 'curl (variante 2) inclinado con mancuernas' || substr( "searchName", 42 ) ELSE "searchName" END
WHERE "name" = 'Curl (variante 2) inclinado con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0317' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl (variante 2) inclinado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'curl (variante 2) inclinado con mancuerna%' THEN 'curl (variante 2) inclinado con mancuernas' || substr( "searchName", 42 ) ELSE "searchName" END
WHERE "externalId" = '0317' AND "name" = 'Curl (variante 2) inclinado con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Curl Zottman con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'curl zottman con mancuerna%' THEN 'curl zottman con mancuernas' || substr( "searchName", 27 ) ELSE "searchName" END
WHERE "name" = 'Curl Zottman con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0439' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl Zottman con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'curl zottman con mancuerna%' THEN 'curl zottman con mancuernas' || substr( "searchName", 27 ) ELSE "searchName" END
WHERE "externalId" = '0439' AND "name" = 'Curl Zottman con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Curl Zottman en banco Scott con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'curl zottman en banco scott con mancuerna%' THEN 'curl zottman en banco scott con mancuernas' || substr( "searchName", 42 ) ELSE "searchName" END
WHERE "name" = 'Curl Zottman en banco Scott con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '2294' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl Zottman en banco Scott con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'curl zottman en banco scott con mancuerna%' THEN 'curl zottman en banco scott con mancuernas' || substr( "searchName", 42 ) ELSE "searchName" END
WHERE "externalId" = '2294' AND "name" = 'Curl Zottman en banco Scott con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Curl Zottman en banco Scott de pie con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'curl zottman en banco scott de pie con mancuerna%' THEN 'curl zottman en banco scott de pie con mancuernas' || substr( "searchName", 49 ) ELSE "searchName" END
WHERE "name" = 'Curl Zottman en banco Scott de pie con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '2293' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl Zottman en banco Scott de pie con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'curl zottman en banco scott de pie con mancuerna%' THEN 'curl zottman en banco scott de pie con mancuernas' || substr( "searchName", 49 ) ELSE "searchName" END
WHERE "externalId" = '2293' AND "name" = 'Curl Zottman en banco Scott de pie con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Elevación alternada de pie con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'elevacion alternada de pie con mancuerna%' THEN 'elevacion alternada de pie con mancuernas' || substr( "searchName", 41 ) ELSE "searchName" END
WHERE "name" = 'Elevación alternada de pie con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0415' );
UPDATE "ExerciseGlobal" SET "name" = 'Elevación alternada de pie con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'elevacion alternada de pie con mancuerna%' THEN 'elevacion alternada de pie con mancuernas' || substr( "searchName", 41 ) ELSE "searchName" END
WHERE "externalId" = '0415' AND "name" = 'Elevación alternada de pie con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Elevación con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'elevacion con mancuerna%' THEN 'elevacion con mancuernas' || substr( "searchName", 24 ) ELSE "searchName" END
WHERE "name" = 'Elevación con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0376' );
UPDATE "ExerciseGlobal" SET "name" = 'Elevación con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'elevacion con mancuerna%' THEN 'elevacion con mancuernas' || substr( "searchName", 24 ) ELSE "searchName" END
WHERE "externalId" = '0376' AND "name" = 'Elevación con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Elevación de cadera en Smith', "searchName" = CASE WHEN "searchName" LIKE 'elevacion de cadera en maquina smith%' THEN 'elevacion de cadera en smith' || substr( "searchName", 37 ) ELSE "searchName" END
WHERE "name" = 'Elevación de cadera en máquina Smith' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0756' );
UPDATE "ExerciseGlobal" SET "name" = 'Elevación de cadera en Smith', "searchName" = CASE WHEN "searchName" LIKE 'elevacion de cadera en maquina smith%' THEN 'elevacion de cadera en smith' || substr( "searchName", 37 ) ELSE "searchName" END
WHERE "externalId" = '0756' AND "name" = 'Elevación de cadera en máquina Smith';

UPDATE "ExerciseCoach" SET "name" = 'Elevación de gemelos sentado a una pierna con mancuerna (agarre martillo)', "searchName" = CASE WHEN "searchName" LIKE 'elevacion de gemelos a una pierna con agarre martillo sentado con mancuerna%' THEN 'elevacion de gemelos sentado a una pierna con mancuerna (agarre martillo)' || substr( "searchName", 76 ) ELSE "searchName" END
WHERE "name" = 'Elevación de gemelos a una pierna con agarre martillo sentado con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1380' );
UPDATE "ExerciseGlobal" SET "name" = 'Elevación de gemelos sentado a una pierna con mancuerna (agarre martillo)', "searchName" = CASE WHEN "searchName" LIKE 'elevacion de gemelos a una pierna con agarre martillo sentado con mancuerna%' THEN 'elevacion de gemelos sentado a una pierna con mancuerna (agarre martillo)' || substr( "searchName", 76 ) ELSE "searchName" END
WHERE "externalId" = '1380' AND "name" = 'Elevación de gemelos a una pierna con agarre martillo sentado con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Elevación de gemelos sentado a una pierna con mancuerna (palma arriba)', "searchName" = CASE WHEN "searchName" LIKE 'elevacion de gemelos a una pierna palma arriba sentado con mancuerna%' THEN 'elevacion de gemelos sentado a una pierna con mancuerna (palma arriba)' || substr( "searchName", 69 ) ELSE "searchName" END
WHERE "name" = 'Elevación de gemelos a una pierna palma arriba sentado con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1381' );
UPDATE "ExerciseGlobal" SET "name" = 'Elevación de gemelos sentado a una pierna con mancuerna (palma arriba)', "searchName" = CASE WHEN "searchName" LIKE 'elevacion de gemelos a una pierna palma arriba sentado con mancuerna%' THEN 'elevacion de gemelos sentado a una pierna con mancuerna (palma arriba)' || substr( "searchName", 69 ) ELSE "searchName" END
WHERE "externalId" = '1381' AND "name" = 'Elevación de gemelos a una pierna palma arriba sentado con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Elevación de gemelos contra la pared en pelota suiza (pelota entre rodillas)', "searchName" = CASE WHEN "searchName" LIKE 'elevacion de gemelos contra la pared (pelota de tenis entre rodillas) sobre pelota suiza%' THEN 'elevacion de gemelos contra la pared en pelota suiza (pelota entre rodillas)' || substr( "searchName", 89 ) ELSE "searchName" END
WHERE "name" = 'Elevación de gemelos contra la pared (pelota de tenis entre rodillas) sobre pelota suiza' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '3240' );
UPDATE "ExerciseGlobal" SET "name" = 'Elevación de gemelos contra la pared en pelota suiza (pelota entre rodillas)', "searchName" = CASE WHEN "searchName" LIKE 'elevacion de gemelos contra la pared (pelota de tenis entre rodillas) sobre pelota suiza%' THEN 'elevacion de gemelos contra la pared en pelota suiza (pelota entre rodillas)' || substr( "searchName", 89 ) ELSE "searchName" END
WHERE "externalId" = '3240' AND "name" = 'Elevación de gemelos contra la pared (pelota de tenis entre rodillas) sobre pelota suiza';

UPDATE "ExerciseCoach" SET "name" = 'Elevación de gemelos contra la pared en pelota suiza (pelota entre tobillos)', "searchName" = CASE WHEN "searchName" LIKE 'elevacion de gemelos contra la pared (pelota de tenis entre tobillos) sobre pelota suiza%' THEN 'elevacion de gemelos contra la pared en pelota suiza (pelota entre tobillos)' || substr( "searchName", 89 ) ELSE "searchName" END
WHERE "name" = 'Elevación de gemelos contra la pared (pelota de tenis entre tobillos) sobre pelota suiza' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '3241' );
UPDATE "ExerciseGlobal" SET "name" = 'Elevación de gemelos contra la pared en pelota suiza (pelota entre tobillos)', "searchName" = CASE WHEN "searchName" LIKE 'elevacion de gemelos contra la pared (pelota de tenis entre tobillos) sobre pelota suiza%' THEN 'elevacion de gemelos contra la pared en pelota suiza (pelota entre tobillos)' || substr( "searchName", 89 ) ELSE "searchName" END
WHERE "externalId" = '3241' AND "name" = 'Elevación de gemelos contra la pared (pelota de tenis entre tobillos) sobre pelota suiza';

UPDATE "ExerciseCoach" SET "name" = 'Elevación de gemelos contra la pared en pelota suiza', "searchName" = CASE WHEN "searchName" LIKE 'elevacion de gemelos contra la pared sobre pelota suiza%' THEN 'elevacion de gemelos contra la pared en pelota suiza' || substr( "searchName", 56 ) ELSE "searchName" END
WHERE "name" = 'Elevación de gemelos contra la pared sobre pelota suiza' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1382' );
UPDATE "ExerciseGlobal" SET "name" = 'Elevación de gemelos contra la pared en pelota suiza', "searchName" = CASE WHEN "searchName" LIKE 'elevacion de gemelos contra la pared sobre pelota suiza%' THEN 'elevacion de gemelos contra la pared en pelota suiza' || substr( "searchName", 56 ) ELSE "searchName" END
WHERE "externalId" = '1382' AND "name" = 'Elevación de gemelos contra la pared sobre pelota suiza';

UPDATE "ExerciseCoach" SET "name" = 'Elevación de gemelos de pie en Smith', "searchName" = CASE WHEN "searchName" LIKE 'elevacion de gemelos de pie en maquina smith%' THEN 'elevacion de gemelos de pie en smith' || substr( "searchName", 45 ) ELSE "searchName" END
WHERE "name" = 'Elevación de gemelos de pie en máquina Smith' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0773' );
UPDATE "ExerciseGlobal" SET "name" = 'Elevación de gemelos de pie en Smith', "searchName" = CASE WHEN "searchName" LIKE 'elevacion de gemelos de pie en maquina smith%' THEN 'elevacion de gemelos de pie en smith' || substr( "searchName", 45 ) ELSE "searchName" END
WHERE "externalId" = '0773' AND "name" = 'Elevación de gemelos de pie en máquina Smith';

UPDATE "ExerciseCoach" SET "name" = 'Elevación de hombros inclinado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'elevacion de hombros inclinado con mancuerna%' THEN 'elevacion de hombros inclinado con mancuernas' || substr( "searchName", 45 ) ELSE "searchName" END
WHERE "name" = 'Elevación de hombros inclinado con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0328' );
UPDATE "ExerciseGlobal" SET "name" = 'Elevación de hombros inclinado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'elevacion de hombros inclinado con mancuerna%' THEN 'elevacion de hombros inclinado con mancuernas' || substr( "searchName", 45 ) ELSE "searchName" END
WHERE "externalId" = '0328' AND "name" = 'Elevación de hombros inclinado con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Elevación de piernas acostado con empuje asistido', "searchName" = CASE WHEN "searchName" LIKE 'elevacion de piernas acostado con empuje hacia abajo y asistencia%' THEN 'elevacion de piernas acostado con empuje asistido' || substr( "searchName", 66 ) ELSE "searchName" END
WHERE "name" = 'Elevación de piernas acostado con empuje hacia abajo y asistencia' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0013' );
UPDATE "ExerciseGlobal" SET "name" = 'Elevación de piernas acostado con empuje asistido', "searchName" = CASE WHEN "searchName" LIKE 'elevacion de piernas acostado con empuje hacia abajo y asistencia%' THEN 'elevacion de piernas acostado con empuje asistido' || substr( "searchName", 66 ) ELSE "searchName" END
WHERE "externalId" = '0013' AND "name" = 'Elevación de piernas acostado con empuje hacia abajo y asistencia';

UPDATE "ExerciseCoach" SET "name" = 'Elevación de piernas acostado con empuje lateral asistido', "searchName" = CASE WHEN "searchName" LIKE 'elevacion de piernas acostado con empuje lateral hacia abajo y asistencia%' THEN 'elevacion de piernas acostado con empuje lateral asistido' || substr( "searchName", 74 ) ELSE "searchName" END
WHERE "name" = 'Elevación de piernas acostado con empuje lateral hacia abajo y asistencia' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0012' );
UPDATE "ExerciseGlobal" SET "name" = 'Elevación de piernas acostado con empuje lateral asistido', "searchName" = CASE WHEN "searchName" LIKE 'elevacion de piernas acostado con empuje lateral hacia abajo y asistencia%' THEN 'elevacion de piernas acostado con empuje lateral asistido' || substr( "searchName", 74 ) ELSE "searchName" END
WHERE "externalId" = '0012' AND "name" = 'Elevación de piernas acostado con empuje lateral hacia abajo y asistencia';

UPDATE "ExerciseCoach" SET "name" = 'Elevación de piernas prono en pelota suiza', "searchName" = CASE WHEN "searchName" LIKE 'elevacion de piernas prono sobre pelota suiza%' THEN 'elevacion de piernas prono en pelota suiza' || substr( "searchName", 46 ) ELSE "searchName" END
WHERE "name" = 'Elevación de piernas prono sobre pelota suiza' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1343' );
UPDATE "ExerciseGlobal" SET "name" = 'Elevación de piernas prono en pelota suiza', "searchName" = CASE WHEN "searchName" LIKE 'elevacion de piernas prono sobre pelota suiza%' THEN 'elevacion de piernas prono en pelota suiza' || substr( "searchName", 46 ) ELSE "searchName" END
WHERE "externalId" = '1343' AND "name" = 'Elevación de piernas prono sobre pelota suiza';

UPDATE "ExerciseCoach" SET "name" = 'Elevación de puntas en Smith', "searchName" = CASE WHEN "searchName" LIKE 'elevacion de puntas en maquina smith%' THEN 'elevacion de puntas en smith' || substr( "searchName", 37 ) ELSE "searchName" END
WHERE "name" = 'Elevación de puntas en máquina Smith' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1396' );
UPDATE "ExerciseGlobal" SET "name" = 'Elevación de puntas en Smith', "searchName" = CASE WHEN "searchName" LIKE 'elevacion de puntas en maquina smith%' THEN 'elevacion de puntas en smith' || substr( "searchName", 37 ) ELSE "searchName" END
WHERE "externalId" = '1396' AND "name" = 'Elevación de puntas en máquina Smith';

UPDATE "ExerciseCoach" SET "name" = 'Elevación de rodillas colgado con empuje asistido', "searchName" = CASE WHEN "searchName" LIKE 'elevacion de rodillas colgado con empuje hacia abajo y asistencia%' THEN 'elevacion de rodillas colgado con empuje asistido' || substr( "searchName", 66 ) ELSE "searchName" END
WHERE "name" = 'Elevación de rodillas colgado con empuje hacia abajo y asistencia' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0010' );
UPDATE "ExerciseGlobal" SET "name" = 'Elevación de rodillas colgado con empuje asistido', "searchName" = CASE WHEN "searchName" LIKE 'elevacion de rodillas colgado con empuje hacia abajo y asistencia%' THEN 'elevacion de rodillas colgado con empuje asistido' || substr( "searchName", 66 ) ELSE "searchName" END
WHERE "externalId" = '0010' AND "name" = 'Elevación de rodillas colgado con empuje hacia abajo y asistencia';

UPDATE "ExerciseCoach" SET "name" = 'Elevación de talones con banda bajo ambos pies (variante 2)', "searchName" = CASE WHEN "searchName" LIKE 'elevacion de talones a dos piernas con banda bajo ambas piernas (variante 2) con banda%' THEN 'elevacion de talones con banda bajo ambos pies (variante 2)' || substr( "searchName", 87 ) ELSE "searchName" END
WHERE "name" = 'Elevación de talones a dos piernas con banda bajo ambas piernas (variante 2) con banda' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1369' );
UPDATE "ExerciseGlobal" SET "name" = 'Elevación de talones con banda bajo ambos pies (variante 2)', "searchName" = CASE WHEN "searchName" LIKE 'elevacion de talones a dos piernas con banda bajo ambas piernas (variante 2) con banda%' THEN 'elevacion de talones con banda bajo ambos pies (variante 2)' || substr( "searchName", 87 ) ELSE "searchName" END
WHERE "externalId" = '1369' AND "name" = 'Elevación de talones a dos piernas con banda bajo ambas piernas (variante 2) con banda';

UPDATE "ExerciseCoach" SET "name" = 'Elevación de talones a una pierna en el piso en Smith', "searchName" = CASE WHEN "searchName" LIKE 'elevacion de talones a una pierna en el piso en maquina smith%' THEN 'elevacion de talones a una pierna en el piso en smith' || substr( "searchName", 62 ) ELSE "searchName" END
WHERE "name" = 'Elevación de talones a una pierna en el piso en máquina Smith' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1393' );
UPDATE "ExerciseGlobal" SET "name" = 'Elevación de talones a una pierna en el piso en Smith', "searchName" = CASE WHEN "searchName" LIKE 'elevacion de talones a una pierna en el piso en maquina smith%' THEN 'elevacion de talones a una pierna en el piso en smith' || substr( "searchName", 62 ) ELSE "searchName" END
WHERE "externalId" = '1393' AND "name" = 'Elevación de talones a una pierna en el piso en máquina Smith';

UPDATE "ExerciseCoach" SET "name" = 'Elevación de talones a una pierna sentado en Smith', "searchName" = CASE WHEN "searchName" LIKE 'elevacion de talones a una pierna sentado en maquina smith%' THEN 'elevacion de talones a una pierna sentado en smith' || substr( "searchName", 59 ) ELSE "searchName" END
WHERE "name" = 'Elevación de talones a una pierna sentado en máquina Smith' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1395' );
UPDATE "ExerciseGlobal" SET "name" = 'Elevación de talones a una pierna sentado en Smith', "searchName" = CASE WHEN "searchName" LIKE 'elevacion de talones a una pierna sentado en maquina smith%' THEN 'elevacion de talones a una pierna sentado en smith' || substr( "searchName", 59 ) ELSE "searchName" END
WHERE "externalId" = '1395' AND "name" = 'Elevación de talones a una pierna sentado en máquina Smith';

UPDATE "ExerciseCoach" SET "name" = 'Elevación de talones de pie con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'elevacion de talones de pie con mancuerna%' THEN 'elevacion de talones de pie con mancuernas' || substr( "searchName", 42 ) ELSE "searchName" END
WHERE "name" = 'Elevación de talones de pie con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0417' );
UPDATE "ExerciseGlobal" SET "name" = 'Elevación de talones de pie con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'elevacion de talones de pie con mancuerna%' THEN 'elevacion de talones de pie con mancuernas' || substr( "searchName", 42 ) ELSE "searchName" END
WHERE "externalId" = '0417' AND "name" = 'Elevación de talones de pie con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Elevación de talones sentado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'elevacion de talones sentado con mancuerna%' THEN 'elevacion de talones sentado con mancuernas' || substr( "searchName", 43 ) ELSE "searchName" END
WHERE "name" = 'Elevación de talones sentado con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1379' );
UPDATE "ExerciseGlobal" SET "name" = 'Elevación de talones sentado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'elevacion de talones sentado con mancuerna%' THEN 'elevacion de talones sentado con mancuernas' || substr( "searchName", 43 ) ELSE "searchName" END
WHERE "externalId" = '1379' AND "name" = 'Elevación de talones sentado con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Elevación en T inclinada con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'elevacion en t inclinada con mancuerna%' THEN 'elevacion en t inclinada con mancuernas' || substr( "searchName", 39 ) ELSE "searchName" END
WHERE "name" = 'Elevación en T inclinada con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '3542' );
UPDATE "ExerciseGlobal" SET "name" = 'Elevación en T inclinada con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'elevacion en t inclinada con mancuerna%' THEN 'elevacion en t inclinada con mancuernas' || substr( "searchName", 39 ) ELSE "searchName" END
WHERE "externalId" = '3542' AND "name" = 'Elevación en T inclinada con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Elevación en Y inclinada con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'elevacion en y inclinada con mancuerna%' THEN 'elevacion en y inclinada con mancuernas' || substr( "searchName", 39 ) ELSE "searchName" END
WHERE "name" = 'Elevación en Y inclinada con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '3541' );
UPDATE "ExerciseGlobal" SET "name" = 'Elevación en Y inclinada con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'elevacion en y inclinada con mancuerna%' THEN 'elevacion en y inclinada con mancuernas' || substr( "searchName", 39 ) ELSE "searchName" END
WHERE "externalId" = '3541' AND "name" = 'Elevación en Y inclinada con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Elevaciones de brazos alternadas en pelota suiza', "searchName" = CASE WHEN "searchName" LIKE 'elevaciones de brazos alternadas sobre pelota suiza%' THEN 'elevaciones de brazos alternadas en pelota suiza' || substr( "searchName", 52 ) ELSE "searchName" END
WHERE "name" = 'Elevaciones de brazos alternadas sobre pelota suiza' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1332' );
UPDATE "ExerciseGlobal" SET "name" = 'Elevaciones de brazos alternadas en pelota suiza', "searchName" = CASE WHEN "searchName" LIKE 'elevaciones de brazos alternadas sobre pelota suiza%' THEN 'elevaciones de brazos alternadas en pelota suiza' || substr( "searchName", 52 ) ELSE "searchName" END
WHERE "externalId" = '1332' AND "name" = 'Elevaciones de brazos alternadas sobre pelota suiza';

UPDATE "ExerciseCoach" SET "name" = 'Elevaciones de gemelo anterior en Smith (barra por detrás)', "searchName" = CASE WHEN "searchName" LIKE 'elevaciones de gemelo anterior en maquina smith (barra por detras)%' THEN 'elevaciones de gemelo anterior en smith (barra por detras)' || substr( "searchName", 67 ) ELSE "searchName" END
WHERE "name" = 'Elevaciones de gemelo anterior en máquina Smith (barra por detrás)' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1394' );
UPDATE "ExerciseGlobal" SET "name" = 'Elevaciones de gemelo anterior en Smith (barra por detrás)', "searchName" = CASE WHEN "searchName" LIKE 'elevaciones de gemelo anterior en maquina smith (barra por detras)%' THEN 'elevaciones de gemelo anterior en smith (barra por detras)' || substr( "searchName", 67 ) ELSE "searchName" END
WHERE "externalId" = '1394' AND "name" = 'Elevaciones de gemelo anterior en máquina Smith (barra por detrás)';

UPDATE "ExerciseCoach" SET "name" = 'Elevaciones de gemelo anterior en Smith (sobre escalón)', "searchName" = CASE WHEN "searchName" LIKE 'elevaciones de gemelo anterior en maquina smith (sobre escalon)%' THEN 'elevaciones de gemelo anterior en smith (sobre escalon)' || substr( "searchName", 64 ) ELSE "searchName" END
WHERE "name" = 'Elevaciones de gemelo anterior en máquina Smith (sobre escalón)' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0763' );
UPDATE "ExerciseGlobal" SET "name" = 'Elevaciones de gemelo anterior en Smith (sobre escalón)', "searchName" = CASE WHEN "searchName" LIKE 'elevaciones de gemelo anterior en maquina smith (sobre escalon)%' THEN 'elevaciones de gemelo anterior en smith (sobre escalon)' || substr( "searchName", 64 ) ELSE "searchName" END
WHERE "externalId" = '0763' AND "name" = 'Elevaciones de gemelo anterior en máquina Smith (sobre escalón)';

UPDATE "ExerciseCoach" SET "name" = 'Elevaciones de hombros inclinado en Smith', "searchName" = CASE WHEN "searchName" LIKE 'elevaciones de hombros inclinado en maquina smith%' THEN 'elevaciones de hombros inclinado en smith' || substr( "searchName", 50 ) ELSE "searchName" END
WHERE "name" = 'Elevaciones de hombros inclinado en máquina Smith' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0759' );
UPDATE "ExerciseGlobal" SET "name" = 'Elevaciones de hombros inclinado en Smith', "searchName" = CASE WHEN "searchName" LIKE 'elevaciones de hombros inclinado en maquina smith%' THEN 'elevaciones de hombros inclinado en smith' || substr( "searchName", 50 ) ELSE "searchName" END
WHERE "externalId" = '0759' AND "name" = 'Elevaciones de hombros inclinado en máquina Smith';

UPDATE "ExerciseCoach" SET "name" = 'Elevación frontal alternada sentado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'elevacion frontal alternada sentado con mancuerna%' THEN 'elevacion frontal alternada sentado con mancuernas' || substr( "searchName", 50 ) ELSE "searchName" END
WHERE "name" = 'Elevación frontal alternada sentado con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0387' );
UPDATE "ExerciseGlobal" SET "name" = 'Elevación frontal alternada sentado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'elevacion frontal alternada sentado con mancuerna%' THEN 'elevacion frontal alternada sentado con mancuernas' || substr( "searchName", 50 ) ELSE "searchName" END
WHERE "externalId" = '0387' AND "name" = 'Elevación frontal alternada sentado con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Elevación frontal con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'elevacion frontal con mancuerna%' THEN 'elevacion frontal con mancuernas' || substr( "searchName", 32 ) ELSE "searchName" END
WHERE "name" = 'Elevación frontal con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0310' );
UPDATE "ExerciseGlobal" SET "name" = 'Elevación frontal con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'elevacion frontal con mancuerna%' THEN 'elevacion frontal con mancuernas' || substr( "searchName", 32 ) ELSE "searchName" END
WHERE "externalId" = '0310' AND "name" = 'Elevación frontal con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Elevación frontal lateral con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'elevacion frontal lateral con mancuerna%' THEN 'elevacion frontal lateral con mancuernas' || substr( "searchName", 40 ) ELSE "searchName" END
WHERE "name" = 'Elevación frontal lateral con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0335' );
UPDATE "ExerciseGlobal" SET "name" = 'Elevación frontal lateral con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'elevacion frontal lateral con mancuerna%' THEN 'elevacion frontal lateral con mancuernas' || substr( "searchName", 40 ) ELSE "searchName" END
WHERE "externalId" = '0335' AND "name" = 'Elevación frontal lateral con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Elevación frontal sobre la cabeza de pie con barra', "searchName" = CASE WHEN "searchName" LIKE 'elevacion frontal por encima de la cabeza de pie con barra%' THEN 'elevacion frontal sobre la cabeza de pie con barra' || substr( "searchName", 59 ) ELSE "searchName" END
WHERE "name" = 'Elevación frontal por encima de la cabeza de pie con barra' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0107' );
UPDATE "ExerciseGlobal" SET "name" = 'Elevación frontal sobre la cabeza de pie con barra', "searchName" = CASE WHEN "searchName" LIKE 'elevacion frontal por encima de la cabeza de pie con barra%' THEN 'elevacion frontal sobre la cabeza de pie con barra' || substr( "searchName", 59 ) ELSE "searchName" END
WHERE "externalId" = '0107' AND "name" = 'Elevación frontal por encima de la cabeza de pie con barra';

UPDATE "ExerciseCoach" SET "name" = 'Elevación frontal sobre la cabeza de pie con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'elevacion frontal por encima de la cabeza de pie con mancuerna%' THEN 'elevacion frontal sobre la cabeza de pie con mancuernas' || substr( "searchName", 63 ) ELSE "searchName" END
WHERE "name" = 'Elevación frontal por encima de la cabeza de pie con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0419' );
UPDATE "ExerciseGlobal" SET "name" = 'Elevación frontal sobre la cabeza de pie con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'elevacion frontal por encima de la cabeza de pie con mancuerna%' THEN 'elevacion frontal sobre la cabeza de pie con mancuernas' || substr( "searchName", 63 ) ELSE "searchName" END
WHERE "externalId" = '0419' AND "name" = 'Elevación frontal por encima de la cabeza de pie con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Elevación frontal sentado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'elevacion frontal sentado con mancuerna%' THEN 'elevacion frontal sentado con mancuernas' || substr( "searchName", 40 ) ELSE "searchName" END
WHERE "name" = 'Elevación frontal sentado con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0392' );
UPDATE "ExerciseGlobal" SET "name" = 'Elevación frontal sentado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'elevacion frontal sentado con mancuerna%' THEN 'elevacion frontal sentado con mancuernas' || substr( "searchName", 40 ) ELSE "searchName" END
WHERE "externalId" = '0392' AND "name" = 'Elevación frontal sentado con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Elevación frontal (variante 2) con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'elevacion frontal (variante 2) con mancuerna%' THEN 'elevacion frontal (variante 2) con mancuernas' || substr( "searchName", 45 ) ELSE "searchName" END
WHERE "name" = 'Elevación frontal (variante 2) con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0309' );
UPDATE "ExerciseGlobal" SET "name" = 'Elevación frontal (variante 2) con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'elevacion frontal (variante 2) con mancuerna%' THEN 'elevacion frontal (variante 2) con mancuernas' || substr( "searchName", 45 ) ELSE "searchName" END
WHERE "externalId" = '0309' AND "name" = 'Elevación frontal (variante 2) con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Elevación inclinada con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'elevacion inclinada con mancuerna%' THEN 'elevacion inclinada con mancuernas' || substr( "searchName", 34 ) ELSE "searchName" END
WHERE "name" = 'Elevación inclinada con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0325' );
UPDATE "ExerciseGlobal" SET "name" = 'Elevación inclinada con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'elevacion inclinada con mancuerna%' THEN 'elevacion inclinada con mancuernas' || substr( "searchName", 34 ) ELSE "searchName" END
WHERE "externalId" = '0325' AND "name" = 'Elevación inclinada con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Elevación lateral acostado posterior con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'elevacion lateral acostado posterior con mancuerna%' THEN 'elevacion lateral acostado posterior con mancuernas' || substr( "searchName", 51 ) ELSE "searchName" END
WHERE "name" = 'Elevación lateral acostado posterior con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0348' );
UPDATE "ExerciseGlobal" SET "name" = 'Elevación lateral acostado posterior con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'elevacion lateral acostado posterior con mancuerna%' THEN 'elevacion lateral acostado posterior con mancuernas' || substr( "searchName", 51 ) ELSE "searchName" END
WHERE "externalId" = '0348' AND "name" = 'Elevación lateral acostado posterior con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Elevación lateral con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'elevacion lateral con mancuerna%' THEN 'elevacion lateral con mancuernas' || substr( "searchName", 32 ) ELSE "searchName" END
WHERE "name" = 'Elevación lateral con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0334' );
UPDATE "ExerciseGlobal" SET "name" = 'Elevación lateral con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'elevacion lateral con mancuerna%' THEN 'elevacion lateral con mancuernas' || substr( "searchName", 32 ) ELSE "searchName" END
WHERE "externalId" = '0334' AND "name" = 'Elevación lateral con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Elevación lateral con pulgares arriba con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'elevacion lateral con pulgares arriba con mancuerna%' THEN 'elevacion lateral con pulgares arriba con mancuernas' || substr( "searchName", 52 ) ELSE "searchName" END
WHERE "name" = 'Elevación lateral con pulgares arriba con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0311' );
UPDATE "ExerciseGlobal" SET "name" = 'Elevación lateral con pulgares arriba con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'elevacion lateral con pulgares arriba con mancuerna%' THEN 'elevacion lateral con pulgares arriba con mancuernas' || substr( "searchName", 52 ) ELSE "searchName" END
WHERE "externalId" = '0311' AND "name" = 'Elevación lateral con pulgares arriba con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Elevación lateral inclinado posterior con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'elevacion lateral inclinado posterior con mancuerna%' THEN 'elevacion lateral inclinado posterior con mancuernas' || substr( "searchName", 52 ) ELSE "searchName" END
WHERE "name" = 'Elevación lateral inclinado posterior con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0326' );
UPDATE "ExerciseGlobal" SET "name" = 'Elevación lateral inclinado posterior con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'elevacion lateral inclinado posterior con mancuerna%' THEN 'elevacion lateral inclinado posterior con mancuernas' || substr( "searchName", 52 ) ELSE "searchName" END
WHERE "externalId" = '0326' AND "name" = 'Elevación lateral inclinado posterior con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Elevación lateral posterior (apoyo en la cabeza) con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'elevacion lateral posterior (apoyo en la cabeza) con mancuerna%' THEN 'elevacion lateral posterior (apoyo en la cabeza) con mancuernas' || substr( "searchName", 63 ) ELSE "searchName" END
WHERE "name" = 'Elevación lateral posterior (apoyo en la cabeza) con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0379' );
UPDATE "ExerciseGlobal" SET "name" = 'Elevación lateral posterior (apoyo en la cabeza) con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'elevacion lateral posterior (apoyo en la cabeza) con mancuerna%' THEN 'elevacion lateral posterior (apoyo en la cabeza) con mancuernas' || substr( "searchName", 63 ) ELSE "searchName" END
WHERE "externalId" = '0379' AND "name" = 'Elevación lateral posterior (apoyo en la cabeza) con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Elevación lateral posterior con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'elevacion lateral posterior con mancuerna%' THEN 'elevacion lateral posterior con mancuernas' || substr( "searchName", 42 ) ELSE "searchName" END
WHERE "name" = 'Elevación lateral posterior con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0380' );
UPDATE "ExerciseGlobal" SET "name" = 'Elevación lateral posterior con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'elevacion lateral posterior con mancuerna%' THEN 'elevacion lateral posterior con mancuernas' || substr( "searchName", 42 ) ELSE "searchName" END
WHERE "externalId" = '0380' AND "name" = 'Elevación lateral posterior con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Elevación lateral sentado con brazos flexionados con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'elevacion lateral sentado con brazos flexionados con mancuerna%' THEN 'elevacion lateral sentado con brazos flexionados con mancuernas' || substr( "searchName", 63 ) ELSE "searchName" END
WHERE "name" = 'Elevación lateral sentado con brazos flexionados con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '2317' );
UPDATE "ExerciseGlobal" SET "name" = 'Elevación lateral sentado con brazos flexionados con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'elevacion lateral sentado con brazos flexionados con mancuerna%' THEN 'elevacion lateral sentado con brazos flexionados con mancuernas' || substr( "searchName", 63 ) ELSE "searchName" END
WHERE "externalId" = '2317' AND "name" = 'Elevación lateral sentado con brazos flexionados con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Elevación lateral sentado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'elevacion lateral sentado con mancuerna%' THEN 'elevacion lateral sentado con mancuernas' || substr( "searchName", 40 ) ELSE "searchName" END
WHERE "name" = 'Elevación lateral sentado con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0396' );
UPDATE "ExerciseGlobal" SET "name" = 'Elevación lateral sentado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'elevacion lateral sentado con mancuerna%' THEN 'elevacion lateral sentado con mancuernas' || substr( "searchName", 40 ) ELSE "searchName" END
WHERE "externalId" = '0396' AND "name" = 'Elevación lateral sentado con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Elevación lateral (variante 2) sentado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'elevacion lateral (variante 2) sentado con mancuerna%' THEN 'elevacion lateral (variante 2) sentado con mancuernas' || substr( "searchName", 53 ) ELSE "searchName" END
WHERE "name" = 'Elevación lateral (variante 2) sentado con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0395' );
UPDATE "ExerciseGlobal" SET "name" = 'Elevación lateral (variante 2) sentado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'elevacion lateral (variante 2) sentado con mancuerna%' THEN 'elevacion lateral (variante 2) sentado con mancuernas' || substr( "searchName", 53 ) ELSE "searchName" END
WHERE "externalId" = '0395' AND "name" = 'Elevación lateral (variante 2) sentado con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Elevación posterior con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'elevacion posterior con mancuerna%' THEN 'elevacion posterior con mancuernas' || substr( "searchName", 34 ) ELSE "searchName" END
WHERE "name" = 'Elevación posterior con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '2292' );
UPDATE "ExerciseGlobal" SET "name" = 'Elevación posterior con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'elevacion posterior con mancuerna%' THEN 'elevacion posterior con mancuernas' || substr( "searchName", 34 ) ELSE "searchName" END
WHERE "externalId" = '2292' AND "name" = 'Elevación posterior con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Encogimiento de hombros con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'encogimiento de hombros con mancuerna%' THEN 'encogimiento de hombros con mancuernas' || substr( "searchName", 38 ) ELSE "searchName" END
WHERE "name" = 'Encogimiento de hombros con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0406' );
UPDATE "ExerciseGlobal" SET "name" = 'Encogimiento de hombros con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'encogimiento de hombros con mancuerna%' THEN 'encogimiento de hombros con mancuernas' || substr( "searchName", 38 ) ELSE "searchName" END
WHERE "externalId" = '0406' AND "name" = 'Encogimiento de hombros con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Encogimiento de hombros declinado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'encogimiento de hombros declinado con mancuerna%' THEN 'encogimiento de hombros declinado con mancuernas' || substr( "searchName", 48 ) ELSE "searchName" END
WHERE "name" = 'Encogimiento de hombros declinado con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0305' );
UPDATE "ExerciseGlobal" SET "name" = 'Encogimiento de hombros declinado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'encogimiento de hombros declinado con mancuerna%' THEN 'encogimiento de hombros declinado con mancuernas' || substr( "searchName", 48 ) ELSE "searchName" END
WHERE "externalId" = '0305' AND "name" = 'Encogimiento de hombros declinado con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Encogimiento de hombros en Smith', "searchName" = CASE WHEN "searchName" LIKE 'encogimiento de hombros en maquina smith%' THEN 'encogimiento de hombros en smith' || substr( "searchName", 41 ) ELSE "searchName" END
WHERE "name" = 'Encogimiento de hombros en máquina Smith' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0767' );
UPDATE "ExerciseGlobal" SET "name" = 'Encogimiento de hombros en Smith', "searchName" = CASE WHEN "searchName" LIKE 'encogimiento de hombros en maquina smith%' THEN 'encogimiento de hombros en smith' || substr( "searchName", 41 ) ELSE "searchName" END
WHERE "externalId" = '0767' AND "name" = 'Encogimiento de hombros en máquina Smith';

UPDATE "ExerciseCoach" SET "name" = 'Encogimiento de hombros inclinado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'encogimiento de hombros inclinado con mancuerna%' THEN 'encogimiento de hombros inclinado con mancuernas' || substr( "searchName", 48 ) ELSE "searchName" END
WHERE "name" = 'Encogimiento de hombros inclinado con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0329' );
UPDATE "ExerciseGlobal" SET "name" = 'Encogimiento de hombros inclinado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'encogimiento de hombros inclinado con mancuerna%' THEN 'encogimiento de hombros inclinado con mancuernas' || substr( "searchName", 48 ) ELSE "searchName" END
WHERE "externalId" = '0329' AND "name" = 'Encogimiento de hombros inclinado con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Encogimiento de hombros por detrás en Smith', "searchName" = CASE WHEN "searchName" LIKE 'encogimiento de hombros por detras en maquina smith%' THEN 'encogimiento de hombros por detras en smith' || substr( "searchName", 52 ) ELSE "searchName" END
WHERE "name" = 'Encogimiento de hombros por detrás en máquina Smith' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0746' );
UPDATE "ExerciseGlobal" SET "name" = 'Encogimiento de hombros por detrás en Smith', "searchName" = CASE WHEN "searchName" LIKE 'encogimiento de hombros por detras en maquina smith%' THEN 'encogimiento de hombros por detras en smith' || substr( "searchName", 52 ) ELSE "searchName" END
WHERE "externalId" = '0746' AND "name" = 'Encogimiento de hombros por detrás en máquina Smith';

UPDATE "ExerciseCoach" SET "name" = 'Encogimiento de hombros (variante 2) declinado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'encogimiento de hombros (variante 2) declinado con mancuerna%' THEN 'encogimiento de hombros (variante 2) declinado con mancuernas' || substr( "searchName", 61 ) ELSE "searchName" END
WHERE "name" = 'Encogimiento de hombros (variante 2) declinado con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0304' );
UPDATE "ExerciseGlobal" SET "name" = 'Encogimiento de hombros (variante 2) declinado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'encogimiento de hombros (variante 2) declinado con mancuerna%' THEN 'encogimiento de hombros (variante 2) declinado con mancuernas' || substr( "searchName", 61 ) ELSE "searchName" END
WHERE "externalId" = '0304' AND "name" = 'Encogimiento de hombros (variante 2) declinado con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Estiramiento de dorsales lateral en pelota suiza acostado', "searchName" = CASE WHEN "searchName" LIKE 'estiramiento de dorsales lateral sobre pelota suiza acostado%' THEN 'estiramiento de dorsales lateral en pelota suiza acostado' || substr( "searchName", 61 ) ELSE "searchName" END
WHERE "name" = 'Estiramiento de dorsales lateral sobre pelota suiza acostado' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1342' );
UPDATE "ExerciseGlobal" SET "name" = 'Estiramiento de dorsales lateral en pelota suiza acostado', "searchName" = CASE WHEN "searchName" LIKE 'estiramiento de dorsales lateral sobre pelota suiza acostado%' THEN 'estiramiento de dorsales lateral en pelota suiza acostado' || substr( "searchName", 61 ) ELSE "searchName" END
WHERE "externalId" = '1342' AND "name" = 'Estiramiento de dorsales lateral sobre pelota suiza acostado';

UPDATE "ExerciseCoach" SET "name" = 'Estiramiento de dorsales en pelota suiza', "searchName" = CASE WHEN "searchName" LIKE 'estiramiento de dorsales sobre pelota suiza%' THEN 'estiramiento de dorsales en pelota suiza' || substr( "searchName", 44 ) ELSE "searchName" END
WHERE "name" = 'Estiramiento de dorsales sobre pelota suiza' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1339' );
UPDATE "ExerciseGlobal" SET "name" = 'Estiramiento de dorsales en pelota suiza', "searchName" = CASE WHEN "searchName" LIKE 'estiramiento de dorsales sobre pelota suiza%' THEN 'estiramiento de dorsales en pelota suiza' || substr( "searchName", 44 ) ELSE "searchName" END
WHERE "externalId" = '1339' AND "name" = 'Estiramiento de dorsales sobre pelota suiza';

UPDATE "ExerciseCoach" SET "name" = 'Estiramiento de flexores de cadera en pelota suiza', "searchName" = CASE WHEN "searchName" LIKE 'estiramiento de flexores de cadera sobre pelota suiza%' THEN 'estiramiento de flexores de cadera en pelota suiza' || substr( "searchName", 54 ) ELSE "searchName" END
WHERE "name" = 'Estiramiento de flexores de cadera sobre pelota suiza' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1559' );
UPDATE "ExerciseGlobal" SET "name" = 'Estiramiento de flexores de cadera en pelota suiza', "searchName" = CASE WHEN "searchName" LIKE 'estiramiento de flexores de cadera sobre pelota suiza%' THEN 'estiramiento de flexores de cadera en pelota suiza' || substr( "searchName", 54 ) ELSE "searchName" END
WHERE "externalId" = '1559' AND "name" = 'Estiramiento de flexores de cadera sobre pelota suiza';

UPDATE "ExerciseCoach" SET "name" = 'Estiramiento de isquiotibiales en pelota suiza sentado', "searchName" = CASE WHEN "searchName" LIKE 'estiramiento de isquiotibiales sobre pelota suiza sentado%' THEN 'estiramiento de isquiotibiales en pelota suiza sentado' || substr( "searchName", 58 ) ELSE "searchName" END
WHERE "name" = 'Estiramiento de isquiotibiales sobre pelota suiza sentado' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1560' );
UPDATE "ExerciseGlobal" SET "name" = 'Estiramiento de isquiotibiales en pelota suiza sentado', "searchName" = CASE WHEN "searchName" LIKE 'estiramiento de isquiotibiales sobre pelota suiza sentado%' THEN 'estiramiento de isquiotibiales en pelota suiza sentado' || substr( "searchName", 58 ) ELSE "searchName" END
WHERE "externalId" = '1560' AND "name" = 'Estiramiento de isquiotibiales sobre pelota suiza sentado';

UPDATE "ExerciseCoach" SET "name" = 'Estiramiento de tríceps sobre la cabeza', "searchName" = CASE WHEN "searchName" LIKE 'estiramiento de triceps por encima de la cabeza%' THEN 'estiramiento de triceps sobre la cabeza' || substr( "searchName", 48 ) ELSE "searchName" END
WHERE "name" = 'Estiramiento de tríceps por encima de la cabeza' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0643' );
UPDATE "ExerciseGlobal" SET "name" = 'Estiramiento de tríceps sobre la cabeza', "searchName" = CASE WHEN "searchName" LIKE 'estiramiento de triceps por encima de la cabeza%' THEN 'estiramiento de triceps sobre la cabeza' || substr( "searchName", 48 ) ELSE "searchName" END
WHERE "externalId" = '0643' AND "name" = 'Estiramiento de tríceps por encima de la cabeza';

UPDATE "ExerciseCoach" SET "name" = 'Estiramiento de tríceps en pelota suiza sentado', "searchName" = CASE WHEN "searchName" LIKE 'estiramiento de triceps sobre pelota suiza sentado%' THEN 'estiramiento de triceps en pelota suiza sentado' || substr( "searchName", 51 ) ELSE "searchName" END
WHERE "name" = 'Estiramiento de tríceps sobre pelota suiza sentado' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1745' );
UPDATE "ExerciseGlobal" SET "name" = 'Estiramiento de tríceps en pelota suiza sentado', "searchName" = CASE WHEN "searchName" LIKE 'estiramiento de triceps sobre pelota suiza sentado%' THEN 'estiramiento de triceps en pelota suiza sentado' || substr( "searchName", 51 ) ELSE "searchName" END
WHERE "externalId" = '1745' AND "name" = 'Estiramiento de tríceps sobre pelota suiza sentado';

UPDATE "ExerciseCoach" SET "name" = 'Estiramiento de zona lumbar (pirámide) en pelota suiza', "searchName" = CASE WHEN "searchName" LIKE 'estiramiento de zona lumbar (piramide) sobre pelota suiza%' THEN 'estiramiento de zona lumbar (piramide) en pelota suiza' || substr( "searchName", 58 ) ELSE "searchName" END
WHERE "name" = 'Estiramiento de zona lumbar (pirámide) sobre pelota suiza' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1341' );
UPDATE "ExerciseGlobal" SET "name" = 'Estiramiento de zona lumbar (pirámide) en pelota suiza', "searchName" = CASE WHEN "searchName" LIKE 'estiramiento de zona lumbar (piramide) sobre pelota suiza%' THEN 'estiramiento de zona lumbar (piramide) en pelota suiza' || substr( "searchName", 58 ) ELSE "searchName" END
WHERE "externalId" = '1341' AND "name" = 'Estiramiento de zona lumbar (pirámide) sobre pelota suiza';

UPDATE "ExerciseCoach" SET "name" = 'Estiramiento asistido de pectoral mayor sentado con pelota suiza', "searchName" = CASE WHEN "searchName" LIKE 'estiramiento sentado de pectoral mayor con pelota suiza y asistencia%' THEN 'estiramiento asistido de pectoral mayor sentado con pelota suiza' || substr( "searchName", 69 ) ELSE "searchName" END
WHERE "name" = 'Estiramiento sentado de pectoral mayor con pelota suiza y asistencia' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1716' );
UPDATE "ExerciseGlobal" SET "name" = 'Estiramiento asistido de pectoral mayor sentado con pelota suiza', "searchName" = CASE WHEN "searchName" LIKE 'estiramiento sentado de pectoral mayor con pelota suiza y asistencia%' THEN 'estiramiento asistido de pectoral mayor sentado con pelota suiza' || substr( "searchName", 69 ) ELSE "searchName" END
WHERE "externalId" = '1716' AND "name" = 'Estiramiento sentado de pectoral mayor con pelota suiza y asistencia';

UPDATE "ExerciseCoach" SET "name" = 'Estocada con curl de bíceps con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'estocada con curl de biceps con mancuerna%' THEN 'estocada con curl de biceps con mancuernas' || substr( "searchName", 42 ) ELSE "searchName" END
WHERE "name" = 'Estocada con curl de bíceps con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1658' );
UPDATE "ExerciseGlobal" SET "name" = 'Estocada con curl de bíceps con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'estocada con curl de biceps con mancuerna%' THEN 'estocada con curl de biceps con mancuernas' || substr( "searchName", 42 ) ELSE "searchName" END
WHERE "externalId" = '1658' AND "name" = 'Estocada con curl de bíceps con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Estocada con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'estocada con mancuerna%' THEN 'estocada con mancuernas' || substr( "searchName", 23 ) ELSE "searchName" END
WHERE "name" = 'Estocada con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0336' );
UPDATE "ExerciseGlobal" SET "name" = 'Estocada con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'estocada con mancuerna%' THEN 'estocada con mancuernas' || substr( "searchName", 23 ) ELSE "searchName" END
WHERE "externalId" = '0336' AND "name" = 'Estocada con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Estocada en sprint en Smith', "searchName" = CASE WHEN "searchName" LIKE 'estocada en sprint en maquina smith%' THEN 'estocada en sprint en smith' || substr( "searchName", 36 ) ELSE "searchName" END
WHERE "name" = 'Estocada en sprint en máquina Smith' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0769' );
UPDATE "ExerciseGlobal" SET "name" = 'Estocada en sprint en Smith', "searchName" = CASE WHEN "searchName" LIKE 'estocada en sprint en maquina smith%' THEN 'estocada en sprint en smith' || substr( "searchName", 36 ) ELSE "searchName" END
WHERE "externalId" = '0769' AND "name" = 'Estocada en sprint en máquina Smith';

UPDATE "ExerciseCoach" SET "name" = 'Estocada hacia adelante contralateral con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'estocada hacia adelante contralateral con mancuerna%' THEN 'estocada hacia adelante contralateral con mancuernas' || substr( "searchName", 52 ) ELSE "searchName" END
WHERE "name" = 'Estocada hacia adelante contralateral con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '3635' );
UPDATE "ExerciseGlobal" SET "name" = 'Estocada hacia adelante contralateral con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'estocada hacia adelante contralateral con mancuerna%' THEN 'estocada hacia adelante contralateral con mancuernas' || substr( "searchName", 52 ) ELSE "searchName" END
WHERE "externalId" = '3635' AND "name" = 'Estocada hacia adelante contralateral con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Estocada hacia atrás con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'estocada hacia atras con mancuerna%' THEN 'estocada hacia atras con mancuernas' || substr( "searchName", 35 ) ELSE "searchName" END
WHERE "name" = 'Estocada hacia atrás con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0381' );
UPDATE "ExerciseGlobal" SET "name" = 'Estocada hacia atrás con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'estocada hacia atras con mancuerna%' THEN 'estocada hacia atras con mancuernas' || substr( "searchName", 35 ) ELSE "searchName" END
WHERE "externalId" = '0381' AND "name" = 'Estocada hacia atrás con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Extensión acostado alternado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'extension acostado alternado con mancuerna%' THEN 'extension acostado alternado con mancuernas' || substr( "searchName", 43 ) ELSE "searchName" END
WHERE "name" = 'Extensión acostado alternado con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1729' );
UPDATE "ExerciseGlobal" SET "name" = 'Extensión acostado alternado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'extension acostado alternado con mancuerna%' THEN 'extension acostado alternado con mancuernas' || substr( "searchName", 43 ) ELSE "searchName" END
WHERE "externalId" = '1729' AND "name" = 'Extensión acostado alternado con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Extensión a una pierna acostado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'extension a una pierna acostado con mancuerna%' THEN 'extension a una pierna acostado con mancuernas' || substr( "searchName", 46 ) ELSE "searchName" END
WHERE "name" = 'Extensión a una pierna acostado con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1735' );
UPDATE "ExerciseGlobal" SET "name" = 'Extensión a una pierna acostado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'extension a una pierna acostado con mancuerna%' THEN 'extension a una pierna acostado con mancuernas' || substr( "searchName", 46 ) ELSE "searchName" END
WHERE "externalId" = '1735' AND "name" = 'Extensión a una pierna acostado con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Extensión de tríceps acostado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'extension de triceps acostado con mancuerna%' THEN 'extension de triceps acostado con mancuernas' || substr( "searchName", 44 ) ELSE "searchName" END
WHERE "name" = 'Extensión de tríceps acostado con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0351' );
UPDATE "ExerciseGlobal" SET "name" = 'Extensión de tríceps acostado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'extension de triceps acostado con mancuerna%' THEN 'extension de triceps acostado con mancuernas' || substr( "searchName", 44 ) ELSE "searchName" END
WHERE "externalId" = '0351' AND "name" = 'Extensión de tríceps acostado con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Extensión de tríceps tras la cabeza con agarre cerrado acostado con barra EZ', "searchName" = CASE WHEN "searchName" LIKE 'extension de triceps con agarre cerrado detras de la cabeza acostado con barra ez%' THEN 'extension de triceps tras la cabeza con agarre cerrado acostado con barra ez' || substr( "searchName", 82 ) ELSE "searchName" END
WHERE "name" = 'Extensión de tríceps con agarre cerrado detrás de la cabeza acostado con barra EZ' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1748' );
UPDATE "ExerciseGlobal" SET "name" = 'Extensión de tríceps tras la cabeza con agarre cerrado acostado con barra EZ', "searchName" = CASE WHEN "searchName" LIKE 'extension de triceps con agarre cerrado detras de la cabeza acostado con barra ez%' THEN 'extension de triceps tras la cabeza con agarre cerrado acostado con barra ez' || substr( "searchName", 82 ) ELSE "searchName" END
WHERE "externalId" = '1748' AND "name" = 'Extensión de tríceps con agarre cerrado detrás de la cabeza acostado con barra EZ';

UPDATE "ExerciseCoach" SET "name" = 'Extensión de tríceps con agarre prono con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'extension de triceps con agarre prono con mancuerna%' THEN 'extension de triceps con agarre prono con mancuernas' || substr( "searchName", 52 ) ELSE "searchName" END
WHERE "name" = 'Extensión de tríceps con agarre prono con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0373' );
UPDATE "ExerciseGlobal" SET "name" = 'Extensión de tríceps con agarre prono con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'extension de triceps con agarre prono con mancuerna%' THEN 'extension de triceps con agarre prono con mancuernas' || substr( "searchName", 52 ) ELSE "searchName" END
WHERE "externalId" = '0373' AND "name" = 'Extensión de tríceps con agarre prono con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Extensión de tríceps cruzada acostado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'extension de triceps cruzada sobre la cara acostado con mancuerna%' THEN 'extension de triceps cruzada acostado con mancuernas' || substr( "searchName", 66 ) ELSE "searchName" END
WHERE "name" = 'Extensión de tríceps cruzada sobre la cara acostado con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0337' );
UPDATE "ExerciseGlobal" SET "name" = 'Extensión de tríceps cruzada acostado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'extension de triceps cruzada sobre la cara acostado con mancuerna%' THEN 'extension de triceps cruzada acostado con mancuernas' || substr( "searchName", 66 ) ELSE "searchName" END
WHERE "externalId" = '0337' AND "name" = 'Extensión de tríceps cruzada sobre la cara acostado con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Extensión de tríceps declinado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'extension de triceps declinado con mancuerna%' THEN 'extension de triceps declinado con mancuernas' || substr( "searchName", 45 ) ELSE "searchName" END
WHERE "name" = 'Extensión de tríceps declinado con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0306' );
UPDATE "ExerciseGlobal" SET "name" = 'Extensión de tríceps declinado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'extension de triceps declinado con mancuerna%' THEN 'extension de triceps declinado con mancuernas' || substr( "searchName", 45 ) ELSE "searchName" END
WHERE "externalId" = '0306' AND "name" = 'Extensión de tríceps declinado con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Extensión de tríceps de pie inclinado a dos manos con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'extension de triceps de pie inclinado a dos manos con mancuerna%' THEN 'extension de triceps de pie inclinado a dos manos con mancuernas' || substr( "searchName", 64 ) ELSE "searchName" END
WHERE "name" = 'Extensión de tríceps de pie inclinado a dos manos con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1741' );
UPDATE "ExerciseGlobal" SET "name" = 'Extensión de tríceps de pie inclinado a dos manos con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'extension de triceps de pie inclinado a dos manos con mancuerna%' THEN 'extension de triceps de pie inclinado a dos manos con mancuernas' || substr( "searchName", 64 ) ELSE "searchName" END
WHERE "externalId" = '1741' AND "name" = 'Extensión de tríceps de pie inclinado a dos manos con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Extensión de tríceps de pie sobre la cabeza con barra', "searchName" = CASE WHEN "searchName" LIKE 'extension de triceps de pie por encima de la cabeza con barra%' THEN 'extension de triceps de pie sobre la cabeza con barra' || substr( "searchName", 62 ) ELSE "searchName" END
WHERE "name" = 'Extensión de tríceps de pie por encima de la cabeza con barra' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0109' );
UPDATE "ExerciseGlobal" SET "name" = 'Extensión de tríceps de pie sobre la cabeza con barra', "searchName" = CASE WHEN "searchName" LIKE 'extension de triceps de pie por encima de la cabeza con barra%' THEN 'extension de triceps de pie sobre la cabeza con barra' || substr( "searchName", 62 ) ELSE "searchName" END
WHERE "externalId" = '0109' AND "name" = 'Extensión de tríceps de pie por encima de la cabeza con barra';

UPDATE "ExerciseCoach" SET "name" = 'Extensión de tríceps (barra V y arm blaster) en polea', "searchName" = CASE WHEN "searchName" LIKE 'extension de triceps hacia abajo (barra v) (con arm blaster) en polea%' THEN 'extension de triceps (barra v y arm blaster) en polea' || substr( "searchName", 70 ) ELSE "searchName" END
WHERE "name" = 'Extensión de tríceps hacia abajo (Barra V) (con arm blaster) en polea' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '2405' );
UPDATE "ExerciseGlobal" SET "name" = 'Extensión de tríceps (barra V y arm blaster) en polea', "searchName" = CASE WHEN "searchName" LIKE 'extension de triceps hacia abajo (barra v) (con arm blaster) en polea%' THEN 'extension de triceps (barra v y arm blaster) en polea' || substr( "searchName", 70 ) ELSE "searchName" END
WHERE "externalId" = '2405' AND "name" = 'Extensión de tríceps hacia abajo (Barra V) (con arm blaster) en polea';

UPDATE "ExerciseCoach" SET "name" = 'Extensión de tríceps con agarre inverso (barra SZ y arm blaster) en polea', "searchName" = CASE WHEN "searchName" LIKE 'extension de triceps hacia abajo con agarre inverso (barra sz) (con arm blaster) en polea%' THEN 'extension de triceps con agarre inverso (barra sz y arm blaster) en polea' || substr( "searchName", 90 ) ELSE "searchName" END
WHERE "name" = 'Extensión de tríceps hacia abajo con agarre inverso (barra SZ) (con arm blaster) en polea' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '2406' );
UPDATE "ExerciseGlobal" SET "name" = 'Extensión de tríceps con agarre inverso (barra SZ y arm blaster) en polea', "searchName" = CASE WHEN "searchName" LIKE 'extension de triceps hacia abajo con agarre inverso (barra sz) (con arm blaster) en polea%' THEN 'extension de triceps con agarre inverso (barra sz y arm blaster) en polea' || substr( "searchName", 90 ) ELSE "searchName" END
WHERE "externalId" = '2406' AND "name" = 'Extensión de tríceps hacia abajo con agarre inverso (barra SZ) (con arm blaster) en polea';

UPDATE "ExerciseCoach" SET "name" = 'Extensión de tríceps inclinado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'extension de triceps inclinado con mancuerna%' THEN 'extension de triceps inclinado con mancuernas' || substr( "searchName", 45 ) ELSE "searchName" END
WHERE "name" = 'Extensión de tríceps inclinado con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0330' );
UPDATE "ExerciseGlobal" SET "name" = 'Extensión de tríceps inclinado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'extension de triceps inclinado con mancuerna%' THEN 'extension de triceps inclinado con mancuernas' || substr( "searchName", 45 ) ELSE "searchName" END
WHERE "externalId" = '0330' AND "name" = 'Extensión de tríceps inclinado con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Extensión de tríceps inclinado en Smith', "searchName" = CASE WHEN "searchName" LIKE 'extension de triceps inclinado en maquina smith%' THEN 'extension de triceps inclinado en smith' || substr( "searchName", 48 ) ELSE "searchName" END
WHERE "name" = 'Extensión de tríceps inclinado en máquina Smith' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1752' );
UPDATE "ExerciseGlobal" SET "name" = 'Extensión de tríceps inclinado en Smith', "searchName" = CASE WHEN "searchName" LIKE 'extension de triceps inclinado en maquina smith%' THEN 'extension de triceps inclinado en smith' || substr( "searchName", 48 ) ELSE "searchName" END
WHERE "externalId" = '1752' AND "name" = 'Extensión de tríceps inclinado en máquina Smith';

UPDATE "ExerciseCoach" SET "name" = 'Extensión de tríceps sobre la cabeza con cuerda en polea', "searchName" = CASE WHEN "searchName" LIKE 'extension de triceps por encima de la cabeza con cuerda en polea%' THEN 'extension de triceps sobre la cabeza con cuerda en polea' || substr( "searchName", 65 ) ELSE "searchName" END
WHERE "name" = 'Extensión de tríceps por encima de la cabeza con cuerda en polea' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0194' );
UPDATE "ExerciseGlobal" SET "name" = 'Extensión de tríceps sobre la cabeza con cuerda en polea', "searchName" = CASE WHEN "searchName" LIKE 'extension de triceps por encima de la cabeza con cuerda en polea%' THEN 'extension de triceps sobre la cabeza con cuerda en polea' || substr( "searchName", 65 ) ELSE "searchName" END
WHERE "externalId" = '0194' AND "name" = 'Extensión de tríceps por encima de la cabeza con cuerda en polea';

UPDATE "ExerciseCoach" SET "name" = 'Extensión de tríceps sobre la cabeza con cuerda en polea alta', "searchName" = CASE WHEN "searchName" LIKE 'extension de triceps por encima de la cabeza con cuerda en polea alta%' THEN 'extension de triceps sobre la cabeza con cuerda en polea alta' || substr( "searchName", 70 ) ELSE "searchName" END
WHERE "name" = 'Extensión de tríceps por encima de la cabeza con cuerda en polea alta' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1724' );
UPDATE "ExerciseGlobal" SET "name" = 'Extensión de tríceps sobre la cabeza con cuerda en polea alta', "searchName" = CASE WHEN "searchName" LIKE 'extension de triceps por encima de la cabeza con cuerda en polea alta%' THEN 'extension de triceps sobre la cabeza con cuerda en polea alta' || substr( "searchName", 70 ) ELSE "searchName" END
WHERE "externalId" = '1724' AND "name" = 'Extensión de tríceps por encima de la cabeza con cuerda en polea alta';

UPDATE "ExerciseCoach" SET "name" = 'Extensión de tríceps sobre la cabeza con agarre inverso a una mano en polea', "searchName" = CASE WHEN "searchName" LIKE 'extension de triceps por encima de la cabeza de pie a una mano con agarre inverso en polea%' THEN 'extension de triceps sobre la cabeza con agarre inverso a una mano en polea' || substr( "searchName", 91 ) ELSE "searchName" END
WHERE "name" = 'Extensión de tríceps por encima de la cabeza de pie a una mano con agarre inverso en polea' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1727' );
UPDATE "ExerciseGlobal" SET "name" = 'Extensión de tríceps sobre la cabeza con agarre inverso a una mano en polea', "searchName" = CASE WHEN "searchName" LIKE 'extension de triceps por encima de la cabeza de pie a una mano con agarre inverso en polea%' THEN 'extension de triceps sobre la cabeza con agarre inverso a una mano en polea' || substr( "searchName", 91 ) ELSE "searchName" END
WHERE "externalId" = '1727' AND "name" = 'Extensión de tríceps por encima de la cabeza de pie a una mano con agarre inverso en polea';

UPDATE "ExerciseCoach" SET "name" = 'Extensión de tríceps sobre la cabeza en polea alta', "searchName" = CASE WHEN "searchName" LIKE 'extension de triceps por encima de la cabeza en polea alta%' THEN 'extension de triceps sobre la cabeza en polea alta' || substr( "searchName", 59 ) ELSE "searchName" END
WHERE "name" = 'Extensión de tríceps por encima de la cabeza en polea alta' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1722' );
UPDATE "ExerciseGlobal" SET "name" = 'Extensión de tríceps sobre la cabeza en polea alta', "searchName" = CASE WHEN "searchName" LIKE 'extension de triceps por encima de la cabeza en polea alta%' THEN 'extension de triceps sobre la cabeza en polea alta' || substr( "searchName", 59 ) ELSE "searchName" END
WHERE "externalId" = '1722' AND "name" = 'Extensión de tríceps por encima de la cabeza en polea alta';

UPDATE "ExerciseCoach" SET "name" = 'Extensión de tríceps sobre la cabeza con agarre inverso sentado a una mano', "searchName" = CASE WHEN "searchName" LIKE 'extension de triceps por encima de la cabeza sentado a una mano con agarre inverso con mancuerna%' THEN 'extension de triceps sobre la cabeza con agarre inverso sentado a una mano' || substr( "searchName", 97 ) ELSE "searchName" END
WHERE "name" = 'Extensión de tríceps por encima de la cabeza sentado a una mano con agarre inverso con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1738' );
UPDATE "ExerciseGlobal" SET "name" = 'Extensión de tríceps sobre la cabeza con agarre inverso sentado a una mano', "searchName" = CASE WHEN "searchName" LIKE 'extension de triceps por encima de la cabeza sentado a una mano con agarre inverso con mancuerna%' THEN 'extension de triceps sobre la cabeza con agarre inverso sentado a una mano' || substr( "searchName", 97 ) ELSE "searchName" END
WHERE "externalId" = '1738' AND "name" = 'Extensión de tríceps por encima de la cabeza sentado a una mano con agarre inverso con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Extensión de tríceps sentado sobre la cabeza con barra', "searchName" = CASE WHEN "searchName" LIKE 'extension de triceps sentado por encima de la cabeza con barra%' THEN 'extension de triceps sentado sobre la cabeza con barra' || substr( "searchName", 63 ) ELSE "searchName" END
WHERE "name" = 'Extensión de tríceps sentado por encima de la cabeza con barra' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0092' );
UPDATE "ExerciseGlobal" SET "name" = 'Extensión de tríceps sentado sobre la cabeza con barra', "searchName" = CASE WHEN "searchName" LIKE 'extension de triceps sentado por encima de la cabeza con barra%' THEN 'extension de triceps sentado sobre la cabeza con barra' || substr( "searchName", 63 ) ELSE "searchName" END
WHERE "externalId" = '0092' AND "name" = 'Extensión de tríceps sentado por encima de la cabeza con barra';

UPDATE "ExerciseCoach" SET "name" = 'Extensión de tríceps supino en pelota suiza', "searchName" = CASE WHEN "searchName" LIKE 'extension de triceps supino sobre pelota suiza%' THEN 'extension de triceps supino en pelota suiza' || substr( "searchName", 47 ) ELSE "searchName" END
WHERE "name" = 'Extensión de tríceps supino sobre pelota suiza' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1746' );
UPDATE "ExerciseGlobal" SET "name" = 'Extensión de tríceps supino en pelota suiza', "searchName" = CASE WHEN "searchName" LIKE 'extension de triceps supino sobre pelota suiza%' THEN 'extension de triceps supino en pelota suiza' || substr( "searchName", 47 ) ELSE "searchName" END
WHERE "externalId" = '1746' AND "name" = 'Extensión de tríceps supino sobre pelota suiza';

UPDATE "ExerciseCoach" SET "name" = 'Extensión lumbar con brazos extendidos en pelota suiza', "searchName" = CASE WHEN "searchName" LIKE 'extension lumbar con brazos extendidos sobre pelota suiza%' THEN 'extension lumbar con brazos extendidos en pelota suiza' || substr( "searchName", 58 ) ELSE "searchName" END
WHERE "name" = 'Extensión lumbar con brazos extendidos sobre pelota suiza' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1333' );
UPDATE "ExerciseGlobal" SET "name" = 'Extensión lumbar con brazos extendidos en pelota suiza', "searchName" = CASE WHEN "searchName" LIKE 'extension lumbar con brazos extendidos sobre pelota suiza%' THEN 'extension lumbar con brazos extendidos en pelota suiza' || substr( "searchName", 58 ) ELSE "searchName" END
WHERE "externalId" = '1333' AND "name" = 'Extensión lumbar con brazos extendidos sobre pelota suiza';

UPDATE "ExerciseCoach" SET "name" = 'Extensión lumbar con manos detrás de la cabeza en pelota suiza', "searchName" = CASE WHEN "searchName" LIKE 'extension lumbar con manos detras de la cabeza sobre pelota suiza%' THEN 'extension lumbar con manos detras de la cabeza en pelota suiza' || substr( "searchName", 66 ) ELSE "searchName" END
WHERE "name" = 'Extensión lumbar con manos detrás de la cabeza sobre pelota suiza' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1334' );
UPDATE "ExerciseGlobal" SET "name" = 'Extensión lumbar con manos detrás de la cabeza en pelota suiza', "searchName" = CASE WHEN "searchName" LIKE 'extension lumbar con manos detras de la cabeza sobre pelota suiza%' THEN 'extension lumbar con manos detras de la cabeza en pelota suiza' || substr( "searchName", 66 ) ELSE "searchName" END
WHERE "externalId" = '1334' AND "name" = 'Extensión lumbar con manos detrás de la cabeza sobre pelota suiza';

UPDATE "ExerciseCoach" SET "name" = 'Extensión lumbar con rodillas fuera del suelo en pelota suiza', "searchName" = CASE WHEN "searchName" LIKE 'extension lumbar con rodillas fuera del suelo sobre pelota suiza%' THEN 'extension lumbar con rodillas fuera del suelo en pelota suiza' || substr( "searchName", 65 ) ELSE "searchName" END
WHERE "name" = 'Extensión lumbar con rodillas fuera del suelo sobre pelota suiza' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1335' );
UPDATE "ExerciseGlobal" SET "name" = 'Extensión lumbar con rodillas fuera del suelo en pelota suiza', "searchName" = CASE WHEN "searchName" LIKE 'extension lumbar con rodillas fuera del suelo sobre pelota suiza%' THEN 'extension lumbar con rodillas fuera del suelo en pelota suiza' || substr( "searchName", 65 ) ELSE "searchName" END
WHERE "externalId" = '1335' AND "name" = 'Extensión lumbar con rodillas fuera del suelo sobre pelota suiza';

UPDATE "ExerciseCoach" SET "name" = 'Extensión lumbar con rotación en pelota suiza', "searchName" = CASE WHEN "searchName" LIKE 'extension lumbar con rotacion sobre pelota suiza%' THEN 'extension lumbar con rotacion en pelota suiza' || substr( "searchName", 49 ) ELSE "searchName" END
WHERE "name" = 'Extensión lumbar con rotación sobre pelota suiza' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1336' );
UPDATE "ExerciseGlobal" SET "name" = 'Extensión lumbar con rotación en pelota suiza', "searchName" = CASE WHEN "searchName" LIKE 'extension lumbar con rotacion sobre pelota suiza%' THEN 'extension lumbar con rotacion en pelota suiza' || substr( "searchName", 49 ) ELSE "searchName" END
WHERE "externalId" = '1336' AND "name" = 'Extensión lumbar con rotación sobre pelota suiza';

UPDATE "ExerciseCoach" SET "name" = 'Extensión lumbar en pelota suiza', "searchName" = CASE WHEN "searchName" LIKE 'extension lumbar sobre pelota suiza%' THEN 'extension lumbar en pelota suiza' || substr( "searchName", 36 ) ELSE "searchName" END
WHERE "name" = 'Extensión lumbar sobre pelota suiza' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1314' );
UPDATE "ExerciseGlobal" SET "name" = 'Extensión lumbar en pelota suiza', "searchName" = CASE WHEN "searchName" LIKE 'extension lumbar sobre pelota suiza%' THEN 'extension lumbar en pelota suiza' || substr( "searchName", 36 ) ELSE "searchName" END
WHERE "externalId" = '1314' AND "name" = 'Extensión lumbar sobre pelota suiza';

UPDATE "ExerciseCoach" SET "name" = 'Flexión de brazos con agarre cerrado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'flexion de brazos con agarre cerrado con mancuerna%' THEN 'flexion de brazos con agarre cerrado con mancuernas' || substr( "searchName", 51 ) ELSE "searchName" END
WHERE "name" = 'Flexión de brazos con agarre cerrado con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0660' );
UPDATE "ExerciseGlobal" SET "name" = 'Flexión de brazos con agarre cerrado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'flexion de brazos con agarre cerrado con mancuerna%' THEN 'flexion de brazos con agarre cerrado con mancuernas' || substr( "searchName", 51 ) ELSE "searchName" END
WHERE "externalId" = '0660' AND "name" = 'Flexión de brazos con agarre cerrado con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Flexión de brazos con agarre estrecho en pelota suiza', "searchName" = CASE WHEN "searchName" LIKE 'flexion de brazos con agarre estrecho sobre pelota suiza%' THEN 'flexion de brazos con agarre estrecho en pelota suiza' || substr( "searchName", 57 ) ELSE "searchName" END
WHERE "name" = 'Flexión de brazos con agarre estrecho sobre pelota suiza' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '2328' );
UPDATE "ExerciseGlobal" SET "name" = 'Flexión de brazos con agarre estrecho en pelota suiza', "searchName" = CASE WHEN "searchName" LIKE 'flexion de brazos con agarre estrecho sobre pelota suiza%' THEN 'flexion de brazos con agarre estrecho en pelota suiza' || substr( "searchName", 57 ) ELSE "searchName" END
WHERE "externalId" = '2328' AND "name" = 'Flexión de brazos con agarre estrecho sobre pelota suiza';

UPDATE "ExerciseCoach" SET "name" = 'Flexión de brazos con manos en pelota suiza', "searchName" = CASE WHEN "searchName" LIKE 'flexion de brazos con manos sobre pelota suiza%' THEN 'flexion de brazos con manos en pelota suiza' || substr( "searchName", 47 ) ELSE "searchName" END
WHERE "name" = 'Flexión de brazos con manos sobre pelota suiza' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0655' );
UPDATE "ExerciseGlobal" SET "name" = 'Flexión de brazos con manos en pelota suiza', "searchName" = CASE WHEN "searchName" LIKE 'flexion de brazos con manos sobre pelota suiza%' THEN 'flexion de brazos con manos en pelota suiza' || substr( "searchName", 47 ) ELSE "searchName" END
WHERE "externalId" = '0655' AND "name" = 'Flexión de brazos con manos sobre pelota suiza';

UPDATE "ExerciseCoach" SET "name" = 'Flexión de brazos con pies en pelota suiza', "searchName" = CASE WHEN "searchName" LIKE 'flexion de brazos con pies sobre pelota suiza%' THEN 'flexion de brazos con pies en pelota suiza' || substr( "searchName", 46 ) ELSE "searchName" END
WHERE "name" = 'Flexión de brazos con pies sobre pelota suiza' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0656' );
UPDATE "ExerciseGlobal" SET "name" = 'Flexión de brazos con pies en pelota suiza', "searchName" = CASE WHEN "searchName" LIKE 'flexion de brazos con pies sobre pelota suiza%' THEN 'flexion de brazos con pies en pelota suiza' || substr( "searchName", 46 ) ELSE "searchName" END
WHERE "externalId" = '0656' AND "name" = 'Flexión de brazos con pies sobre pelota suiza';

UPDATE "ExerciseCoach" SET "name" = 'Flexión de brazos pike en pelota suiza', "searchName" = CASE WHEN "searchName" LIKE 'flexion de brazos pike sobre pelota suiza%' THEN 'flexion de brazos pike en pelota suiza' || substr( "searchName", 42 ) ELSE "searchName" END
WHERE "name" = 'Flexión de brazos pike sobre pelota suiza' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1296' );
UPDATE "ExerciseGlobal" SET "name" = 'Flexión de brazos pike en pelota suiza', "searchName" = CASE WHEN "searchName" LIKE 'flexion de brazos pike sobre pelota suiza%' THEN 'flexion de brazos pike en pelota suiza' || substr( "searchName", 42 ) ELSE "searchName" END
WHERE "externalId" = '1296' AND "name" = 'Flexión de brazos pike sobre pelota suiza';

UPDATE "ExerciseCoach" SET "name" = 'Flexión lateral en pelota suiza con peso', "searchName" = CASE WHEN "searchName" LIKE 'flexion lateral sobre pelota suiza con peso%' THEN 'flexion lateral en pelota suiza con peso' || substr( "searchName", 44 ) ELSE "searchName" END
WHERE "name" = 'Flexión lateral sobre pelota suiza con peso' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0850' );
UPDATE "ExerciseGlobal" SET "name" = 'Flexión lateral en pelota suiza con peso', "searchName" = CASE WHEN "searchName" LIKE 'flexion lateral sobre pelota suiza con peso%' THEN 'flexion lateral en pelota suiza con peso' || substr( "searchName", 44 ) ELSE "searchName" END
WHERE "externalId" = '0850' AND "name" = 'Flexión lateral sobre pelota suiza con peso';

UPDATE "ExerciseCoach" SET "name" = 'Fondos en pelota suiza', "searchName" = CASE WHEN "searchName" LIKE 'fondos sobre pelota suiza%' THEN 'fondos en pelota suiza' || substr( "searchName", 26 ) ELSE "searchName" END
WHERE "name" = 'Fondos sobre pelota suiza' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1744' );
UPDATE "ExerciseGlobal" SET "name" = 'Fondos en pelota suiza', "searchName" = CASE WHEN "searchName" LIKE 'fondos sobre pelota suiza%' THEN 'fondos en pelota suiza' || substr( "searchName", 26 ) ELSE "searchName" END
WHERE "externalId" = '1744' AND "name" = 'Fondos sobre pelota suiza';

UPDATE "ExerciseCoach" SET "name" = 'Giro ruso en pelota suiza en polea', "searchName" = CASE WHEN "searchName" LIKE 'giro ruso sobre pelota suiza en polea%' THEN 'giro ruso en pelota suiza en polea' || substr( "searchName", 38 ) ELSE "searchName" END
WHERE "name" = 'Giro ruso sobre pelota suiza en polea' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0211' );
UPDATE "ExerciseGlobal" SET "name" = 'Giro ruso en pelota suiza en polea', "searchName" = CASE WHEN "searchName" LIKE 'giro ruso sobre pelota suiza en polea%' THEN 'giro ruso en pelota suiza en polea' || substr( "searchName", 38 ) ELSE "searchName" END
WHERE "externalId" = '0211' AND "name" = 'Giro ruso sobre pelota suiza en polea';

UPDATE "ExerciseCoach" SET "name" = 'Giro sentado en pelota suiza con peso', "searchName" = CASE WHEN "searchName" LIKE 'giro sentado sobre pelota suiza con peso%' THEN 'giro sentado en pelota suiza con peso' || substr( "searchName", 41 ) ELSE "searchName" END
WHERE "name" = 'Giro sentado sobre pelota suiza con peso' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0849' );
UPDATE "ExerciseGlobal" SET "name" = 'Giro sentado en pelota suiza con peso', "searchName" = CASE WHEN "searchName" LIKE 'giro sentado sobre pelota suiza con peso%' THEN 'giro sentado en pelota suiza con peso' || substr( "searchName", 41 ) ELSE "searchName" END
WHERE "externalId" = '0849' AND "name" = 'Giro sentado sobre pelota suiza con peso';

UPDATE "ExerciseCoach" SET "name" = 'Hiperextensión inversa en pelota suiza', "searchName" = CASE WHEN "searchName" LIKE 'hiperextension inversa sobre pelota suiza%' THEN 'hiperextension inversa en pelota suiza' || substr( "searchName", 42 ) ELSE "searchName" END
WHERE "name" = 'Hiperextensión inversa sobre pelota suiza' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0675' );
UPDATE "ExerciseGlobal" SET "name" = 'Hiperextensión inversa en pelota suiza', "searchName" = CASE WHEN "searchName" LIKE 'hiperextension inversa sobre pelota suiza%' THEN 'hiperextension inversa en pelota suiza' || substr( "searchName", 42 ) ELSE "searchName" END
WHERE "externalId" = '0675' AND "name" = 'Hiperextensión inversa sobre pelota suiza';

UPDATE "ExerciseCoach" SET "name" = 'Hiperextensión en pelota suiza con peso', "searchName" = CASE WHEN "searchName" LIKE 'hiperextension sobre pelota suiza con peso%' THEN 'hiperextension en pelota suiza con peso' || substr( "searchName", 43 ) ELSE "searchName" END
WHERE "name" = 'Hiperextensión sobre pelota suiza con peso' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0835' );
UPDATE "ExerciseGlobal" SET "name" = 'Hiperextensión en pelota suiza con peso', "searchName" = CASE WHEN "searchName" LIKE 'hiperextension sobre pelota suiza con peso%' THEN 'hiperextension en pelota suiza con peso' || substr( "searchName", 43 ) ELSE "searchName" END
WHERE "externalId" = '0835' AND "name" = 'Hiperextensión sobre pelota suiza con peso';

UPDATE "ExerciseCoach" SET "name" = 'Jalón interno en pelota suiza', "searchName" = CASE WHEN "searchName" LIKE 'jalon interno sobre pelota suiza%' THEN 'jalon interno en pelota suiza' || substr( "searchName", 33 ) ELSE "searchName" END
WHERE "name" = 'Jalón interno sobre pelota suiza' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0650' );
UPDATE "ExerciseGlobal" SET "name" = 'Jalón interno en pelota suiza', "searchName" = CASE WHEN "searchName" LIKE 'jalon interno sobre pelota suiza%' THEN 'jalon interno en pelota suiza' || substr( "searchName", 33 ) ELSE "searchName" END
WHERE "externalId" = '0650' AND "name" = 'Jalón interno sobre pelota suiza';

UPDATE "ExerciseCoach" SET "name" = 'Paso atrás con alcance sobre la cabeza', "searchName" = CASE WHEN "searchName" LIKE 'paso atras con alcance por encima de la cabeza%' THEN 'paso atras con alcance sobre la cabeza' || substr( "searchName", 47 ) ELSE "searchName" END
WHERE "name" = 'Paso atrás con alcance por encima de la cabeza' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1687' );
UPDATE "ExerciseGlobal" SET "name" = 'Paso atrás con alcance sobre la cabeza', "searchName" = CASE WHEN "searchName" LIKE 'paso atras con alcance por encima de la cabeza%' THEN 'paso atras con alcance sobre la cabeza' || substr( "searchName", 47 ) ELSE "searchName" END
WHERE "externalId" = '1687' AND "name" = 'Paso atrás con alcance por encima de la cabeza';

UPDATE "ExerciseCoach" SET "name" = 'Patada de tríceps de pie alternado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'patada de triceps de pie alternado con mancuerna%' THEN 'patada de triceps de pie alternado con mancuernas' || substr( "searchName", 49 ) ELSE "searchName" END
WHERE "name" = 'Patada de tríceps de pie alternado con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1739' );
UPDATE "ExerciseGlobal" SET "name" = 'Patada de tríceps de pie alternado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'patada de triceps de pie alternado con mancuerna%' THEN 'patada de triceps de pie alternado con mancuernas' || substr( "searchName", 49 ) ELSE "searchName" END
WHERE "externalId" = '1739' AND "name" = 'Patada de tríceps de pie alternado con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Patada de tríceps de pie con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'patada de triceps de pie con mancuerna%' THEN 'patada de triceps de pie con mancuernas' || substr( "searchName", 39 ) ELSE "searchName" END
WHERE "name" = 'Patada de tríceps de pie con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0420' );
UPDATE "ExerciseGlobal" SET "name" = 'Patada de tríceps de pie con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'patada de triceps de pie con mancuerna%' THEN 'patada de triceps de pie con mancuernas' || substr( "searchName", 39 ) ELSE "searchName" END
WHERE "externalId" = '0420' AND "name" = 'Patada de tríceps de pie con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Patada de tríceps en posición de cigüeña con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'patada de triceps en posicion de ciguena con mancuerna%' THEN 'patada de triceps en posicion de ciguena con mancuernas' || substr( "searchName", 55 ) ELSE "searchName" END
WHERE "name" = 'Patada de tríceps en posición de cigüeña con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1742' );
UPDATE "ExerciseGlobal" SET "name" = 'Patada de tríceps en posición de cigüeña con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'patada de triceps en posicion de ciguena con mancuerna%' THEN 'patada de triceps en posicion de ciguena con mancuernas' || substr( "searchName", 55 ) ELSE "searchName" END
WHERE "externalId" = '1742' AND "name" = 'Patada de tríceps en posición de cigüeña con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Patada de tríceps sentado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'patada de triceps sentado con mancuerna%' THEN 'patada de triceps sentado con mancuernas' || substr( "searchName", 40 ) ELSE "searchName" END
WHERE "name" = 'Patada de tríceps sentado con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0394' );
UPDATE "ExerciseGlobal" SET "name" = 'Patada de tríceps sentado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'patada de triceps sentado con mancuerna%' THEN 'patada de triceps sentado con mancuernas' || substr( "searchName", 40 ) ELSE "searchName" END
WHERE "externalId" = '0394' AND "name" = 'Patada de tríceps sentado con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Patada de tríceps sentado inclinado alternado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'patada de triceps sentado inclinado alternado con mancuerna%' THEN 'patada de triceps sentado inclinado alternado con mancuernas' || substr( "searchName", 60 ) ELSE "searchName" END
WHERE "name" = 'Patada de tríceps sentado inclinado alternado con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1730' );
UPDATE "ExerciseGlobal" SET "name" = 'Patada de tríceps sentado inclinado alternado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'patada de triceps sentado inclinado alternado con mancuerna%' THEN 'patada de triceps sentado inclinado alternado con mancuernas' || substr( "searchName", 60 ) ELSE "searchName" END
WHERE "externalId" = '1730' AND "name" = 'Patada de tríceps sentado inclinado alternado con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Patada de tríceps en pelota suiza con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'patada de triceps sobre pelota suiza con mancuerna%' THEN 'patada de triceps en pelota suiza con mancuernas' || substr( "searchName", 51 ) ELSE "searchName" END
WHERE "name" = 'Patada de tríceps sobre pelota suiza con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1734' );
UPDATE "ExerciseGlobal" SET "name" = 'Patada de tríceps en pelota suiza con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'patada de triceps sobre pelota suiza con mancuerna%' THEN 'patada de triceps en pelota suiza con mancuernas' || substr( "searchName", 51 ) ELSE "searchName" END
WHERE "externalId" = '1734' AND "name" = 'Patada de tríceps sobre pelota suiza con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Peso muerto con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'peso muerto con mancuerna%' THEN 'peso muerto con mancuernas' || substr( "searchName", 26 ) ELSE "searchName" END
WHERE "name" = 'Peso muerto con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0300' );
UPDATE "ExerciseGlobal" SET "name" = 'Peso muerto con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'peso muerto con mancuerna%' THEN 'peso muerto con mancuernas' || substr( "searchName", 26 ) ELSE "searchName" END
WHERE "externalId" = '0300' AND "name" = 'Peso muerto con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Peso muerto con piernas rectas con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'peso muerto con piernas rectas con mancuerna%' THEN 'peso muerto con piernas rectas con mancuernas' || substr( "searchName", 45 ) ELSE "searchName" END
WHERE "name" = 'Peso muerto con piernas rectas con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0434' );
UPDATE "ExerciseGlobal" SET "name" = 'Peso muerto con piernas rectas con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'peso muerto con piernas rectas con mancuerna%' THEN 'peso muerto con piernas rectas con mancuernas' || substr( "searchName", 45 ) ELSE "searchName" END
WHERE "externalId" = '0434' AND "name" = 'Peso muerto con piernas rectas con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Peso muerto con piernas rígidas con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'peso muerto con piernas rigidas con mancuerna%' THEN 'peso muerto con piernas rigidas con mancuernas' || substr( "searchName", 46 ) ELSE "searchName" END
WHERE "name" = 'Peso muerto con piernas rígidas con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0432' );
UPDATE "ExerciseGlobal" SET "name" = 'Peso muerto con piernas rígidas con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'peso muerto con piernas rigidas con mancuerna%' THEN 'peso muerto con piernas rigidas con mancuernas' || substr( "searchName", 46 ) ELSE "searchName" END
WHERE "externalId" = '0432' AND "name" = 'Peso muerto con piernas rígidas con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Peso muerto en Smith', "searchName" = CASE WHEN "searchName" LIKE 'peso muerto en maquina smith%' THEN 'peso muerto en smith' || substr( "searchName", 29 ) ELSE "searchName" END
WHERE "name" = 'Peso muerto en máquina Smith' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0752' );
UPDATE "ExerciseGlobal" SET "name" = 'Peso muerto en Smith', "searchName" = CASE WHEN "searchName" LIKE 'peso muerto en maquina smith%' THEN 'peso muerto en smith' || substr( "searchName", 29 ) ELSE "searchName" END
WHERE "externalId" = '0752' AND "name" = 'Peso muerto en máquina Smith';

UPDATE "ExerciseCoach" SET "name" = 'Peso muerto rumano con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'peso muerto rumano con mancuerna%' THEN 'peso muerto rumano con mancuernas' || substr( "searchName", 33 ) ELSE "searchName" END
WHERE "name" = 'Peso muerto rumano con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1459' );
UPDATE "ExerciseGlobal" SET "name" = 'Peso muerto rumano con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'peso muerto rumano con mancuerna%' THEN 'peso muerto rumano con mancuernas' || substr( "searchName", 33 ) ELSE "searchName" END
WHERE "externalId" = '1459' AND "name" = 'Peso muerto rumano con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Plancha lateral con apertura posterior con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'plancha lateral con apertura posterior con mancuerna%' THEN 'plancha lateral con apertura posterior con mancuernas' || substr( "searchName", 53 ) ELSE "searchName" END
WHERE "name" = 'Plancha lateral con apertura posterior con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '3664' );
UPDATE "ExerciseGlobal" SET "name" = 'Plancha lateral con apertura posterior con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'plancha lateral con apertura posterior con mancuerna%' THEN 'plancha lateral con apertura posterior con mancuernas' || substr( "searchName", 53 ) ELSE "searchName" END
WHERE "externalId" = '3664' AND "name" = 'Plancha lateral con apertura posterior con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Prensa de piernas en Smith', "searchName" = CASE WHEN "searchName" LIKE 'prensa de piernas en maquina smith%' THEN 'prensa de piernas en smith' || substr( "searchName", 35 ) ELSE "searchName" END
WHERE "name" = 'Prensa de piernas en máquina Smith' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0760' );
UPDATE "ExerciseGlobal" SET "name" = 'Prensa de piernas en Smith', "searchName" = CASE WHEN "searchName" LIKE 'prensa de piernas en maquina smith%' THEN 'prensa de piernas en smith' || substr( "searchName", 35 ) ELSE "searchName" END
WHERE "externalId" = '0760' AND "name" = 'Prensa de piernas en máquina Smith';

UPDATE "ExerciseCoach" SET "name" = 'Press con agarre cerrado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'press con agarre cerrado con mancuerna%' THEN 'press con agarre cerrado con mancuernas' || substr( "searchName", 39 ) ELSE "searchName" END
WHERE "name" = 'Press con agarre cerrado con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0296' );
UPDATE "ExerciseGlobal" SET "name" = 'Press con agarre cerrado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'press con agarre cerrado con mancuerna%' THEN 'press con agarre cerrado con mancuernas' || substr( "searchName", 39 ) ELSE "searchName" END
WHERE "externalId" = '0296' AND "name" = 'Press con agarre cerrado con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Press con agarre cerrado con mancuernas (variante 2)', "searchName" = CASE WHEN "searchName" LIKE 'press con agarre cerrado con mancuerna (variante 2)%' THEN 'press con agarre cerrado con mancuernas (variante 2)' || substr( "searchName", 52 ) ELSE "searchName" END
WHERE "name" = 'Press con agarre cerrado con mancuerna (variante 2)' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1731' );
UPDATE "ExerciseGlobal" SET "name" = 'Press con agarre cerrado con mancuernas (variante 2)', "searchName" = CASE WHEN "searchName" LIKE 'press con agarre cerrado con mancuerna (variante 2)%' THEN 'press con agarre cerrado con mancuernas (variante 2)' || substr( "searchName", 52 ) ELSE "searchName" END
WHERE "externalId" = '1731' AND "name" = 'Press con agarre cerrado con mancuerna (variante 2)';

UPDATE "ExerciseCoach" SET "name" = 'Press con agarre inverso declinado en Smith', "searchName" = CASE WHEN "searchName" LIKE 'press con agarre inverso declinado en maquina smith%' THEN 'press con agarre inverso declinado en smith' || substr( "searchName", 52 ) ELSE "searchName" END
WHERE "name" = 'Press con agarre inverso declinado en máquina Smith' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0754' );
UPDATE "ExerciseGlobal" SET "name" = 'Press con agarre inverso declinado en Smith', "searchName" = CASE WHEN "searchName" LIKE 'press con agarre inverso declinado en maquina smith%' THEN 'press con agarre inverso declinado en smith' || substr( "searchName", 52 ) ELSE "searchName" END
WHERE "externalId" = '0754' AND "name" = 'Press con agarre inverso declinado en máquina Smith';

UPDATE "ExerciseCoach" SET "name" = 'Press con agarre inverso en Smith', "searchName" = CASE WHEN "searchName" LIKE 'press con agarre inverso en maquina smith%' THEN 'press con agarre inverso en smith' || substr( "searchName", 42 ) ELSE "searchName" END
WHERE "name" = 'Press con agarre inverso en máquina Smith' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0764' );
UPDATE "ExerciseGlobal" SET "name" = 'Press con agarre inverso en Smith', "searchName" = CASE WHEN "searchName" LIKE 'press con agarre inverso en maquina smith%' THEN 'press con agarre inverso en smith' || substr( "searchName", 42 ) ELSE "searchName" END
WHERE "externalId" = '0764' AND "name" = 'Press con agarre inverso en máquina Smith';

UPDATE "ExerciseCoach" SET "name" = 'Press con agarre inverso inclinado en Smith', "searchName" = CASE WHEN "searchName" LIKE 'press con agarre inverso inclinado en maquina smith%' THEN 'press con agarre inverso inclinado en smith' || substr( "searchName", 52 ) ELSE "searchName" END
WHERE "name" = 'Press con agarre inverso inclinado en máquina Smith' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0758' );
UPDATE "ExerciseGlobal" SET "name" = 'Press con agarre inverso inclinado en Smith', "searchName" = CASE WHEN "searchName" LIKE 'press con agarre inverso inclinado en maquina smith%' THEN 'press con agarre inverso inclinado en smith' || substr( "searchName", 52 ) ELSE "searchName" END
WHERE "externalId" = '0758' AND "name" = 'Press con agarre inverso inclinado en máquina Smith';

UPDATE "ExerciseCoach" SET "name" = 'Press con agarre neutro inclinado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'press con agarre neutro inclinado con mancuerna%' THEN 'press con agarre neutro inclinado con mancuernas' || substr( "searchName", 48 ) ELSE "searchName" END
WHERE "name" = 'Press con agarre neutro inclinado con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0324' );
UPDATE "ExerciseGlobal" SET "name" = 'Press con agarre neutro inclinado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'press con agarre neutro inclinado con mancuerna%' THEN 'press con agarre neutro inclinado con mancuernas' || substr( "searchName", 48 ) ELSE "searchName" END
WHERE "externalId" = '0324' AND "name" = 'Press con agarre neutro inclinado con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Press de banca con agarre amplio en Smith', "searchName" = CASE WHEN "searchName" LIKE 'press de banca con agarre amplio en maquina smith%' THEN 'press de banca con agarre amplio en smith' || substr( "searchName", 50 ) ELSE "searchName" END
WHERE "name" = 'Press de banca con agarre amplio en máquina Smith' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1308' );
UPDATE "ExerciseGlobal" SET "name" = 'Press de banca con agarre amplio en Smith', "searchName" = CASE WHEN "searchName" LIKE 'press de banca con agarre amplio en maquina smith%' THEN 'press de banca con agarre amplio en smith' || substr( "searchName", 50 ) ELSE "searchName" END
WHERE "externalId" = '1308' AND "name" = 'Press de banca con agarre amplio en máquina Smith';

UPDATE "ExerciseCoach" SET "name" = 'Press de banca con agarre cerrado en Smith', "searchName" = CASE WHEN "searchName" LIKE 'press de banca con agarre cerrado en maquina smith%' THEN 'press de banca con agarre cerrado en smith' || substr( "searchName", 51 ) ELSE "searchName" END
WHERE "name" = 'Press de banca con agarre cerrado en máquina Smith' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0751' );
UPDATE "ExerciseGlobal" SET "name" = 'Press de banca con agarre cerrado en Smith', "searchName" = CASE WHEN "searchName" LIKE 'press de banca con agarre cerrado en maquina smith%' THEN 'press de banca con agarre cerrado en smith' || substr( "searchName", 51 ) ELSE "searchName" END
WHERE "externalId" = '0751' AND "name" = 'Press de banca con agarre cerrado en máquina Smith';

UPDATE "ExerciseCoach" SET "name" = 'Press de banca con agarre neutro con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'press de banca con agarre neutro con mancuerna%' THEN 'press de banca con agarre neutro con mancuernas' || substr( "searchName", 47 ) ELSE "searchName" END
WHERE "name" = 'Press de banca con agarre neutro con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0352' );
UPDATE "ExerciseGlobal" SET "name" = 'Press de banca con agarre neutro con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'press de banca con agarre neutro con mancuerna%' THEN 'press de banca con agarre neutro con mancuernas' || substr( "searchName", 47 ) ELSE "searchName" END
WHERE "externalId" = '0352' AND "name" = 'Press de banca con agarre neutro con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Press de banca con giro con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'press de banca con giro con mancuerna%' THEN 'press de banca con giro con mancuernas' || substr( "searchName", 38 ) ELSE "searchName" END
WHERE "name" = 'Press de banca con giro con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1743' );
UPDATE "ExerciseGlobal" SET "name" = 'Press de banca con giro con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'press de banca con giro con mancuerna%' THEN 'press de banca con giro con mancuernas' || substr( "searchName", 38 ) ELSE "searchName" END
WHERE "externalId" = '1743' AND "name" = 'Press de banca con giro con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Press de banca con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'press de banca con mancuerna%' THEN 'press de banca con mancuernas' || substr( "searchName", 29 ) ELSE "searchName" END
WHERE "name" = 'Press de banca con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0289' );
UPDATE "ExerciseGlobal" SET "name" = 'Press de banca con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'press de banca con mancuerna%' THEN 'press de banca con mancuernas' || substr( "searchName", 29 ) ELSE "searchName" END
WHERE "externalId" = '0289' AND "name" = 'Press de banca con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Press de banca declinado con agarre amplio en Smith', "searchName" = CASE WHEN "searchName" LIKE 'press de banca declinado con agarre amplio en maquina smith%' THEN 'press de banca declinado con agarre amplio en smith' || substr( "searchName", 60 ) ELSE "searchName" END
WHERE "name" = 'Press de banca declinado con agarre amplio en máquina Smith' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1309' );
UPDATE "ExerciseGlobal" SET "name" = 'Press de banca declinado con agarre amplio en Smith', "searchName" = CASE WHEN "searchName" LIKE 'press de banca declinado con agarre amplio en maquina smith%' THEN 'press de banca declinado con agarre amplio en smith' || substr( "searchName", 60 ) ELSE "searchName" END
WHERE "externalId" = '1309' AND "name" = 'Press de banca declinado con agarre amplio en máquina Smith';

UPDATE "ExerciseCoach" SET "name" = 'Press de banca declinado con agarre cerrado en Smith', "searchName" = CASE WHEN "searchName" LIKE 'press de banca declinado con agarre cerrado en maquina smith%' THEN 'press de banca declinado con agarre cerrado en smith' || substr( "searchName", 61 ) ELSE "searchName" END
WHERE "name" = 'Press de banca declinado con agarre cerrado en máquina Smith' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1625' );
UPDATE "ExerciseGlobal" SET "name" = 'Press de banca declinado con agarre cerrado en Smith', "searchName" = CASE WHEN "searchName" LIKE 'press de banca declinado con agarre cerrado en maquina smith%' THEN 'press de banca declinado con agarre cerrado en smith' || substr( "searchName", 61 ) ELSE "searchName" END
WHERE "externalId" = '1625' AND "name" = 'Press de banca declinado con agarre cerrado en máquina Smith';

UPDATE "ExerciseCoach" SET "name" = 'Press de banca declinado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'press de banca declinado con mancuerna%' THEN 'press de banca declinado con mancuernas' || substr( "searchName", 39 ) ELSE "searchName" END
WHERE "name" = 'Press de banca declinado con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0301' );
UPDATE "ExerciseGlobal" SET "name" = 'Press de banca declinado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'press de banca declinado con mancuerna%' THEN 'press de banca declinado con mancuernas' || substr( "searchName", 39 ) ELSE "searchName" END
WHERE "externalId" = '0301' AND "name" = 'Press de banca declinado con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Press de banca declinado en Smith', "searchName" = CASE WHEN "searchName" LIKE 'press de banca declinado en maquina smith%' THEN 'press de banca declinado en smith' || substr( "searchName", 42 ) ELSE "searchName" END
WHERE "name" = 'Press de banca declinado en máquina Smith' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0753' );
UPDATE "ExerciseGlobal" SET "name" = 'Press de banca declinado en Smith', "searchName" = CASE WHEN "searchName" LIKE 'press de banca declinado en maquina smith%' THEN 'press de banca declinado en smith' || substr( "searchName", 42 ) ELSE "searchName" END
WHERE "externalId" = '0753' AND "name" = 'Press de banca declinado en máquina Smith';

UPDATE "ExerciseCoach" SET "name" = 'Press de banca declinado inverso con agarre cerrado en Smith', "searchName" = CASE WHEN "searchName" LIKE 'press de banca declinado inverso con agarre cerrado en maquina smith%' THEN 'press de banca declinado inverso con agarre cerrado en smith' || substr( "searchName", 69 ) ELSE "searchName" END
WHERE "name" = 'Press de banca declinado inverso con agarre cerrado en máquina Smith' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1626' );
UPDATE "ExerciseGlobal" SET "name" = 'Press de banca declinado inverso con agarre cerrado en Smith', "searchName" = CASE WHEN "searchName" LIKE 'press de banca declinado inverso con agarre cerrado en maquina smith%' THEN 'press de banca declinado inverso con agarre cerrado en smith' || substr( "searchName", 69 ) ELSE "searchName" END
WHERE "externalId" = '1626' AND "name" = 'Press de banca declinado inverso con agarre cerrado en máquina Smith';

UPDATE "ExerciseCoach" SET "name" = 'Press de banca en Smith', "searchName" = CASE WHEN "searchName" LIKE 'press de banca en maquina smith%' THEN 'press de banca en smith' || substr( "searchName", 32 ) ELSE "searchName" END
WHERE "name" = 'Press de banca en máquina Smith' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0748' );
UPDATE "ExerciseGlobal" SET "name" = 'Press de banca en Smith', "searchName" = CASE WHEN "searchName" LIKE 'press de banca en maquina smith%' THEN 'press de banca en smith' || substr( "searchName", 32 ) ELSE "searchName" END
WHERE "externalId" = '0748' AND "name" = 'Press de banca en máquina Smith';

UPDATE "ExerciseCoach" SET "name" = 'Press de banca inclinado con agarre neutro con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'press de banca inclinado con agarre neutro con mancuerna%' THEN 'press de banca inclinado con agarre neutro con mancuernas' || substr( "searchName", 57 ) ELSE "searchName" END
WHERE "name" = 'Press de banca inclinado con agarre neutro con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1623' );
UPDATE "ExerciseGlobal" SET "name" = 'Press de banca inclinado con agarre neutro con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'press de banca inclinado con agarre neutro con mancuerna%' THEN 'press de banca inclinado con agarre neutro con mancuernas' || substr( "searchName", 57 ) ELSE "searchName" END
WHERE "externalId" = '1623' AND "name" = 'Press de banca inclinado con agarre neutro con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Press de banca inclinado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'press de banca inclinado con mancuerna%' THEN 'press de banca inclinado con mancuernas' || substr( "searchName", 39 ) ELSE "searchName" END
WHERE "name" = 'Press de banca inclinado con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0314' );
UPDATE "ExerciseGlobal" SET "name" = 'Press de banca inclinado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'press de banca inclinado con mancuerna%' THEN 'press de banca inclinado con mancuernas' || substr( "searchName", 39 ) ELSE "searchName" END
WHERE "externalId" = '0314' AND "name" = 'Press de banca inclinado con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Press de banca inclinado en Smith', "searchName" = CASE WHEN "searchName" LIKE 'press de banca inclinado en maquina smith%' THEN 'press de banca inclinado en smith' || substr( "searchName", 42 ) ELSE "searchName" END
WHERE "name" = 'Press de banca inclinado en máquina Smith' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0757' );
UPDATE "ExerciseGlobal" SET "name" = 'Press de banca inclinado en Smith', "searchName" = CASE WHEN "searchName" LIKE 'press de banca inclinado en maquina smith%' THEN 'press de banca inclinado en smith' || substr( "searchName", 42 ) ELSE "searchName" END
WHERE "externalId" = '0757' AND "name" = 'Press de banca inclinado en máquina Smith';

UPDATE "ExerciseCoach" SET "name" = 'Press de banca inverso con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'press de banca inverso con mancuerna%' THEN 'press de banca inverso con mancuernas' || substr( "searchName", 37 ) ELSE "searchName" END
WHERE "name" = 'Press de banca inverso con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1624' );
UPDATE "ExerciseGlobal" SET "name" = 'Press de banca inverso con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'press de banca inverso con mancuerna%' THEN 'press de banca inverso con mancuernas' || substr( "searchName", 37 ) ELSE "searchName" END
WHERE "externalId" = '1624' AND "name" = 'Press de banca inverso con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Press de codo acostado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'press de codo acostado con mancuerna%' THEN 'press de codo acostado con mancuernas' || substr( "searchName", 37 ) ELSE "searchName" END
WHERE "name" = 'Press de codo acostado con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0338' );
UPDATE "ExerciseGlobal" SET "name" = 'Press de codo acostado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'press de codo acostado con mancuerna%' THEN 'press de codo acostado con mancuernas' || substr( "searchName", 37 ) ELSE "searchName" END
WHERE "externalId" = '0338' AND "name" = 'Press de codo acostado con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Press de hombro alternado sentado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'press de hombro alternado sentado con mancuerna%' THEN 'press de hombro alternado sentado con mancuernas' || substr( "searchName", 48 ) ELSE "searchName" END
WHERE "name" = 'Press de hombro alternado sentado con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '3546' );
UPDATE "ExerciseGlobal" SET "name" = 'Press de hombro alternado sentado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'press de hombro alternado sentado con mancuerna%' THEN 'press de hombro alternado sentado con mancuernas' || substr( "searchName", 48 ) ELSE "searchName" END
WHERE "externalId" = '3546' AND "name" = 'Press de hombro alternado sentado con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Press de hombros (agarre en paralelas) sentado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'press de hombros (agarre en paralelas) sentado con mancuerna%' THEN 'press de hombros (agarre en paralelas) sentado con mancuernas' || substr( "searchName", 61 ) ELSE "searchName" END
WHERE "name" = 'Press de hombros (agarre en paralelas) sentado con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0404' );
UPDATE "ExerciseGlobal" SET "name" = 'Press de hombros (agarre en paralelas) sentado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'press de hombros (agarre en paralelas) sentado con mancuerna%' THEN 'press de hombros (agarre en paralelas) sentado con mancuernas' || substr( "searchName", 61 ) ELSE "searchName" END
WHERE "externalId" = '0404' AND "name" = 'Press de hombros (agarre en paralelas) sentado con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Press de hombros en Smith', "searchName" = CASE WHEN "searchName" LIKE 'press de hombros en maquina smith%' THEN 'press de hombros en smith' || substr( "searchName", 34 ) ELSE "searchName" END
WHERE "name" = 'Press de hombros en máquina Smith' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0766' );
UPDATE "ExerciseGlobal" SET "name" = 'Press de hombros en Smith', "searchName" = CASE WHEN "searchName" LIKE 'press de hombros en maquina smith%' THEN 'press de hombros en smith' || substr( "searchName", 34 ) ELSE "searchName" END
WHERE "externalId" = '0766' AND "name" = 'Press de hombros en máquina Smith';

UPDATE "ExerciseCoach" SET "name" = 'Press de hombros sentado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'press de hombros sentado con mancuerna%' THEN 'press de hombros sentado con mancuernas' || substr( "searchName", 39 ) ELSE "searchName" END
WHERE "name" = 'Press de hombros sentado con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0405' );
UPDATE "ExerciseGlobal" SET "name" = 'Press de hombros sentado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'press de hombros sentado con mancuerna%' THEN 'press de hombros sentado con mancuernas' || substr( "searchName", 39 ) ELSE "searchName" END
WHERE "externalId" = '0405' AND "name" = 'Press de hombros sentado con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Press de hombros sentado en Smith', "searchName" = CASE WHEN "searchName" LIKE 'press de hombros sentado en maquina smith%' THEN 'press de hombros sentado en smith' || substr( "searchName", 42 ) ELSE "searchName" END
WHERE "name" = 'Press de hombros sentado en máquina Smith' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0765' );
UPDATE "ExerciseGlobal" SET "name" = 'Press de hombros sentado en Smith', "searchName" = CASE WHEN "searchName" LIKE 'press de hombros sentado en maquina smith%' THEN 'press de hombros sentado en smith' || substr( "searchName", 42 ) ELSE "searchName" END
WHERE "externalId" = '0765' AND "name" = 'Press de hombros sentado en máquina Smith';

UPDATE "ExerciseCoach" SET "name" = 'Press de pie con agarre neutro con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'press de pie con agarre neutro con mancuerna%' THEN 'press de pie con agarre neutro con mancuernas' || substr( "searchName", 45 ) ELSE "searchName" END
WHERE "name" = 'Press de pie con agarre neutro con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0427' );
UPDATE "ExerciseGlobal" SET "name" = 'Press de pie con agarre neutro con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'press de pie con agarre neutro con mancuerna%' THEN 'press de pie con agarre neutro con mancuernas' || substr( "searchName", 45 ) ELSE "searchName" END
WHERE "externalId" = '0427' AND "name" = 'Press de pie con agarre neutro con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Press francés en pelota suiza a una mano con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'press frances sobre pelota suiza a una mano con mancuerna%' THEN 'press frances en pelota suiza a una mano con mancuerna' || substr( "searchName", 58 ) ELSE "searchName" END
WHERE "name" = 'Press francés sobre pelota suiza a una mano con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1736' );
UPDATE "ExerciseGlobal" SET "name" = 'Press francés en pelota suiza a una mano con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'press frances sobre pelota suiza a una mano con mancuerna%' THEN 'press frances en pelota suiza a una mano con mancuerna' || substr( "searchName", 58 ) ELSE "searchName" END
WHERE "externalId" = '1736' AND "name" = 'Press francés sobre pelota suiza a una mano con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Press francés en pelota suiza con barra EZ', "searchName" = CASE WHEN "searchName" LIKE 'press frances sobre pelota suiza con barra ez%' THEN 'press frances en pelota suiza con barra ez' || substr( "searchName", 46 ) ELSE "searchName" END
WHERE "name" = 'Press francés sobre pelota suiza con barra EZ' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1747' );
UPDATE "ExerciseGlobal" SET "name" = 'Press francés en pelota suiza con barra EZ', "searchName" = CASE WHEN "searchName" LIKE 'press frances sobre pelota suiza con barra ez%' THEN 'press frances en pelota suiza con barra ez' || substr( "searchName", 46 ) ELSE "searchName" END
WHERE "externalId" = '1747' AND "name" = 'Press francés sobre pelota suiza con barra EZ';

UPDATE "ExerciseCoach" SET "name" = 'Press inclinado alternado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'press inclinado alternado con mancuerna%' THEN 'press inclinado alternado con mancuernas' || substr( "searchName", 40 ) ELSE "searchName" END
WHERE "name" = 'Press inclinado alternado con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '3545' );
UPDATE "ExerciseGlobal" SET "name" = 'Press inclinado alternado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'press inclinado alternado con mancuerna%' THEN 'press inclinado alternado con mancuernas' || substr( "searchName", 40 ) ELSE "searchName" END
WHERE "externalId" = '3545' AND "name" = 'Press inclinado alternado con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Press inclinado en pelota suiza a una mano en polea', "searchName" = CASE WHEN "searchName" LIKE 'press inclinado sobre pelota suiza a una mano en polea%' THEN 'press inclinado en pelota suiza a una mano en polea' || substr( "searchName", 55 ) ELSE "searchName" END
WHERE "name" = 'Press inclinado sobre pelota suiza a una mano en polea' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1266' );
UPDATE "ExerciseGlobal" SET "name" = 'Press inclinado en pelota suiza a una mano en polea', "searchName" = CASE WHEN "searchName" LIKE 'press inclinado sobre pelota suiza a una mano en polea%' THEN 'press inclinado en pelota suiza a una mano en polea' || substr( "searchName", 55 ) ELSE "searchName" END
WHERE "externalId" = '1266' AND "name" = 'Press inclinado sobre pelota suiza a una mano en polea';

UPDATE "ExerciseCoach" SET "name" = 'Press inclinado en pelota suiza con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'press inclinado sobre pelota suiza con mancuerna%' THEN 'press inclinado en pelota suiza con mancuernas' || substr( "searchName", 49 ) ELSE "searchName" END
WHERE "name" = 'Press inclinado sobre pelota suiza con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1283' );
UPDATE "ExerciseGlobal" SET "name" = 'Press inclinado en pelota suiza con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'press inclinado sobre pelota suiza con mancuerna%' THEN 'press inclinado en pelota suiza con mancuernas' || substr( "searchName", 49 ) ELSE "searchName" END
WHERE "externalId" = '1283' AND "name" = 'Press inclinado sobre pelota suiza con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Press lateral alternado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'press lateral alternado con mancuerna%' THEN 'press lateral alternado con mancuernas' || substr( "searchName", 38 ) ELSE "searchName" END
WHERE "name" = 'Press lateral alternado con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0286' );
UPDATE "ExerciseGlobal" SET "name" = 'Press lateral alternado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'press lateral alternado con mancuerna%' THEN 'press lateral alternado con mancuernas' || substr( "searchName", 38 ) ELSE "searchName" END
WHERE "externalId" = '0286' AND "name" = 'Press lateral alternado con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Press martillo acostado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'press martillo acostado con mancuerna%' THEN 'press martillo acostado con mancuernas' || substr( "searchName", 38 ) ELSE "searchName" END
WHERE "name" = 'Press martillo acostado con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0340' );
UPDATE "ExerciseGlobal" SET "name" = 'Press martillo acostado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'press martillo acostado con mancuerna%' THEN 'press martillo acostado con mancuernas' || substr( "searchName", 38 ) ELSE "searchName" END
WHERE "externalId" = '0340' AND "name" = 'Press martillo acostado con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Press martillo declinado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'press martillo declinado con mancuerna%' THEN 'press martillo declinado con mancuernas' || substr( "searchName", 39 ) ELSE "searchName" END
WHERE "name" = 'Press martillo declinado con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0303' );
UPDATE "ExerciseGlobal" SET "name" = 'Press martillo declinado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'press martillo declinado con mancuerna%' THEN 'press martillo declinado con mancuernas' || substr( "searchName", 39 ) ELSE "searchName" END
WHERE "externalId" = '0303' AND "name" = 'Press martillo declinado con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Press martillo inclinado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'press martillo inclinado con mancuerna%' THEN 'press martillo inclinado con mancuernas' || substr( "searchName", 39 ) ELSE "searchName" END
WHERE "name" = 'Press martillo inclinado con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0321' );
UPDATE "ExerciseGlobal" SET "name" = 'Press martillo inclinado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'press martillo inclinado con mancuerna%' THEN 'press martillo inclinado con mancuernas' || substr( "searchName", 39 ) ELSE "searchName" END
WHERE "externalId" = '0321' AND "name" = 'Press martillo inclinado con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Press martillo en pelota suiza a una mano con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'press martillo sobre pelota suiza a una mano con mancuerna%' THEN 'press martillo en pelota suiza a una mano con mancuerna' || substr( "searchName", 59 ) ELSE "searchName" END
WHERE "name" = 'Press martillo sobre pelota suiza a una mano con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1621' );
UPDATE "ExerciseGlobal" SET "name" = 'Press martillo en pelota suiza a una mano con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'press martillo sobre pelota suiza a una mano con mancuerna%' THEN 'press martillo en pelota suiza a una mano con mancuerna' || substr( "searchName", 59 ) ELSE "searchName" END
WHERE "externalId" = '1621' AND "name" = 'Press martillo sobre pelota suiza a una mano con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Press martillo en pelota suiza inclinado a una mano con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'press martillo sobre pelota suiza inclinado a una mano con mancuerna%' THEN 'press martillo en pelota suiza inclinado a una mano con mancuerna' || substr( "searchName", 69 ) ELSE "searchName" END
WHERE "name" = 'Press martillo sobre pelota suiza inclinado a una mano con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1620' );
UPDATE "ExerciseGlobal" SET "name" = 'Press martillo en pelota suiza inclinado a una mano con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'press martillo sobre pelota suiza inclinado a una mano con mancuerna%' THEN 'press martillo en pelota suiza inclinado a una mano con mancuerna' || substr( "searchName", 69 ) ELSE "searchName" END
WHERE "externalId" = '1620' AND "name" = 'Press martillo sobre pelota suiza inclinado a una mano con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Press martillo en pelota suiza inclinado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'press martillo sobre pelota suiza inclinado con mancuerna%' THEN 'press martillo en pelota suiza inclinado con mancuernas' || substr( "searchName", 58 ) ELSE "searchName" END
WHERE "name" = 'Press martillo sobre pelota suiza inclinado con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1618' );
UPDATE "ExerciseGlobal" SET "name" = 'Press martillo en pelota suiza inclinado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'press martillo sobre pelota suiza inclinado con mancuerna%' THEN 'press martillo en pelota suiza inclinado con mancuernas' || substr( "searchName", 58 ) ELSE "searchName" END
WHERE "externalId" = '1618' AND "name" = 'Press martillo sobre pelota suiza inclinado con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Press militar de pie en Smith', "searchName" = CASE WHEN "searchName" LIKE 'press militar de pie en maquina smith%' THEN 'press militar de pie en smith' || substr( "searchName", 38 ) ELSE "searchName" END
WHERE "name" = 'Press militar de pie en máquina Smith' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0774' );
UPDATE "ExerciseGlobal" SET "name" = 'Press militar de pie en Smith', "searchName" = CASE WHEN "searchName" LIKE 'press militar de pie en maquina smith%' THEN 'press militar de pie en smith' || substr( "searchName", 38 ) ELSE "searchName" END
WHERE "externalId" = '0774' AND "name" = 'Press militar de pie en máquina Smith';

UPDATE "ExerciseCoach" SET "name" = 'Press sobre la cabeza con giro con banda', "searchName" = CASE WHEN "searchName" LIKE 'press por encima de la cabeza con giro con banda%' THEN 'press sobre la cabeza con giro con banda' || substr( "searchName", 49 ) ELSE "searchName" END
WHERE "name" = 'Press por encima de la cabeza con giro con banda' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1012' );
UPDATE "ExerciseGlobal" SET "name" = 'Press sobre la cabeza con giro con banda', "searchName" = CASE WHEN "searchName" LIKE 'press por encima de la cabeza con giro con banda%' THEN 'press sobre la cabeza con giro con banda' || substr( "searchName", 49 ) ELSE "searchName" END
WHERE "externalId" = '1012' AND "name" = 'Press por encima de la cabeza con giro con banda';

UPDATE "ExerciseCoach" SET "name" = 'Press sobre la cabeza de pie alternado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'press por encima de la cabeza de pie alternado con mancuerna%' THEN 'press sobre la cabeza de pie alternado con mancuernas' || substr( "searchName", 61 ) ELSE "searchName" END
WHERE "name" = 'Press por encima de la cabeza de pie alternado con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0414' );
UPDATE "ExerciseGlobal" SET "name" = 'Press sobre la cabeza de pie alternado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'press por encima de la cabeza de pie alternado con mancuerna%' THEN 'press sobre la cabeza de pie alternado con mancuernas' || substr( "searchName", 61 ) ELSE "searchName" END
WHERE "externalId" = '0414' AND "name" = 'Press por encima de la cabeza de pie alternado con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Press sobre la cabeza de pie con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'press por encima de la cabeza de pie con mancuerna%' THEN 'press sobre la cabeza de pie con mancuernas' || substr( "searchName", 51 ) ELSE "searchName" END
WHERE "name" = 'Press por encima de la cabeza de pie con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0426' );
UPDATE "ExerciseGlobal" SET "name" = 'Press sobre la cabeza de pie con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'press por encima de la cabeza de pie con mancuerna%' THEN 'press sobre la cabeza de pie con mancuernas' || substr( "searchName", 51 ) ELSE "searchName" END
WHERE "externalId" = '0426' AND "name" = 'Press por encima de la cabeza de pie con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Press sobre la cabeza sentado con barra', "searchName" = CASE WHEN "searchName" LIKE 'press por encima de la cabeza sentado con barra%' THEN 'press sobre la cabeza sentado con barra' || substr( "searchName", 48 ) ELSE "searchName" END
WHERE "name" = 'Press por encima de la cabeza sentado con barra' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0091' );
UPDATE "ExerciseGlobal" SET "name" = 'Press sobre la cabeza sentado con barra', "searchName" = CASE WHEN "searchName" LIKE 'press por encima de la cabeza sentado con barra%' THEN 'press sobre la cabeza sentado con barra' || substr( "searchName", 48 ) ELSE "searchName" END
WHERE "externalId" = '0091' AND "name" = 'Press por encima de la cabeza sentado con barra';

UPDATE "ExerciseCoach" SET "name" = 'Press sentado alternado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'press sentado alternado con mancuerna%' THEN 'press sentado alternado con mancuernas' || substr( "searchName", 38 ) ELSE "searchName" END
WHERE "name" = 'Press sentado alternado con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0388' );
UPDATE "ExerciseGlobal" SET "name" = 'Press sentado alternado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'press sentado alternado con mancuerna%' THEN 'press sentado alternado con mancuernas' || substr( "searchName", 38 ) ELSE "searchName" END
WHERE "externalId" = '0388' AND "name" = 'Press sentado alternado con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Press sentado en banco con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'press sentado en banco con mancuerna%' THEN 'press sentado en banco con mancuernas' || substr( "searchName", 37 ) ELSE "searchName" END
WHERE "name" = 'Press sentado en banco con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0290' );
UPDATE "ExerciseGlobal" SET "name" = 'Press sentado en banco con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'press sentado en banco con mancuerna%' THEN 'press sentado en banco con mancuernas' || substr( "searchName", 37 ) ELSE "searchName" END
WHERE "externalId" = '0290' AND "name" = 'Press sentado en banco con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Press en pelota suiza a una mano con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'press sobre pelota suiza a una mano con mancuerna%' THEN 'press en pelota suiza a una mano con mancuerna' || substr( "searchName", 50 ) ELSE "searchName" END
WHERE "name" = 'Press sobre pelota suiza a una mano con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1290' );
UPDATE "ExerciseGlobal" SET "name" = 'Press en pelota suiza a una mano con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'press sobre pelota suiza a una mano con mancuerna%' THEN 'press en pelota suiza a una mano con mancuerna' || substr( "searchName", 50 ) ELSE "searchName" END
WHERE "externalId" = '1290' AND "name" = 'Press sobre pelota suiza a una mano con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Press en pelota suiza a una mano en polea', "searchName" = CASE WHEN "searchName" LIKE 'press sobre pelota suiza a una mano en polea%' THEN 'press en pelota suiza a una mano en polea' || substr( "searchName", 45 ) ELSE "searchName" END
WHERE "name" = 'Press sobre pelota suiza a una mano en polea' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1267' );
UPDATE "ExerciseGlobal" SET "name" = 'Press en pelota suiza a una mano en polea', "searchName" = CASE WHEN "searchName" LIKE 'press sobre pelota suiza a una mano en polea%' THEN 'press en pelota suiza a una mano en polea' || substr( "searchName", 45 ) ELSE "searchName" END
WHERE "externalId" = '1267' AND "name" = 'Press sobre pelota suiza a una mano en polea';

UPDATE "ExerciseCoach" SET "name" = 'Press en pelota suiza con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'press sobre pelota suiza con mancuerna%' THEN 'press en pelota suiza con mancuernas' || substr( "searchName", 39 ) ELSE "searchName" END
WHERE "name" = 'Press sobre pelota suiza con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1293' );
UPDATE "ExerciseGlobal" SET "name" = 'Press en pelota suiza con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'press sobre pelota suiza con mancuerna%' THEN 'press en pelota suiza con mancuernas' || substr( "searchName", 39 ) ELSE "searchName" END
WHERE "externalId" = '1293' AND "name" = 'Press sobre pelota suiza con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Press en pelota suiza en polea', "searchName" = CASE WHEN "searchName" LIKE 'press sobre pelota suiza en polea%' THEN 'press en pelota suiza en polea' || substr( "searchName", 34 ) ELSE "searchName" END
WHERE "name" = 'Press sobre pelota suiza en polea' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1268' );
UPDATE "ExerciseGlobal" SET "name" = 'Press en pelota suiza en polea', "searchName" = CASE WHEN "searchName" LIKE 'press sobre pelota suiza en polea%' THEN 'press en pelota suiza en polea' || substr( "searchName", 34 ) ELSE "searchName" END
WHERE "externalId" = '1268' AND "name" = 'Press sobre pelota suiza en polea';

UPDATE "ExerciseCoach" SET "name" = 'Press en pelota suiza inclinado a una mano con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'press sobre pelota suiza inclinado a una mano con mancuerna%' THEN 'press en pelota suiza inclinado a una mano con mancuerna' || substr( "searchName", 60 ) ELSE "searchName" END
WHERE "name" = 'Press sobre pelota suiza inclinado a una mano con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1282' );
UPDATE "ExerciseGlobal" SET "name" = 'Press en pelota suiza inclinado a una mano con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'press sobre pelota suiza inclinado a una mano con mancuerna%' THEN 'press en pelota suiza inclinado a una mano con mancuerna' || substr( "searchName", 60 ) ELSE "searchName" END
WHERE "externalId" = '1282' AND "name" = 'Press sobre pelota suiza inclinado a una mano con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Press tras nuca en Smith', "searchName" = CASE WHEN "searchName" LIKE 'press tras nuca en maquina smith%' THEN 'press tras nuca en smith' || substr( "searchName", 33 ) ELSE "searchName" END
WHERE "name" = 'Press tras nuca en máquina Smith' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0747' );
UPDATE "ExerciseGlobal" SET "name" = 'Press tras nuca en Smith', "searchName" = CASE WHEN "searchName" LIKE 'press tras nuca en maquina smith%' THEN 'press tras nuca en smith' || substr( "searchName", 33 ) ELSE "searchName" END
WHERE "externalId" = '0747' AND "name" = 'Press tras nuca en máquina Smith';

UPDATE "ExerciseCoach" SET "name" = 'Press tras nuca militar de pie en Smith', "searchName" = CASE WHEN "searchName" LIKE 'press tras nuca militar de pie en maquina smith%' THEN 'press tras nuca militar de pie en smith' || substr( "searchName", 48 ) ELSE "searchName" END
WHERE "name" = 'Press tras nuca militar de pie en máquina Smith' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0772' );
UPDATE "ExerciseGlobal" SET "name" = 'Press tras nuca militar de pie en Smith', "searchName" = CASE WHEN "searchName" LIKE 'press tras nuca militar de pie en maquina smith%' THEN 'press tras nuca militar de pie en smith' || substr( "searchName", 48 ) ELSE "searchName" END
WHERE "externalId" = '0772' AND "name" = 'Press tras nuca militar de pie en máquina Smith';

UPDATE "ExerciseCoach" SET "name" = 'Prono giro en pelota suiza', "searchName" = CASE WHEN "searchName" LIKE 'prono giro sobre pelota suiza%' THEN 'prono giro en pelota suiza' || substr( "searchName", 30 ) ELSE "searchName" END
WHERE "name" = 'Prono giro sobre pelota suiza' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1707' );
UPDATE "ExerciseGlobal" SET "name" = 'Prono giro en pelota suiza', "searchName" = CASE WHEN "searchName" LIKE 'prono giro sobre pelota suiza%' THEN 'prono giro en pelota suiza' || substr( "searchName", 30 ) ELSE "searchName" END
WHERE "externalId" = '1707' AND "name" = 'Prono giro sobre pelota suiza';

UPDATE "ExerciseCoach" SET "name" = 'Pullover extensión de cadera en pelota suiza con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'pullover extension de cadera sobre pelota suiza con mancuerna%' THEN 'pullover extension de cadera en pelota suiza con mancuerna' || substr( "searchName", 62 ) ELSE "searchName" END
WHERE "name" = 'Pullover extensión de cadera sobre pelota suiza con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1294' );
UPDATE "ExerciseGlobal" SET "name" = 'Pullover extensión de cadera en pelota suiza con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'pullover extension de cadera sobre pelota suiza con mancuerna%' THEN 'pullover extension de cadera en pelota suiza con mancuerna' || substr( "searchName", 62 ) ELSE "searchName" END
WHERE "externalId" = '1294' AND "name" = 'Pullover extensión de cadera sobre pelota suiza con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Pullover en pelota suiza acostado con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'pullover sobre pelota suiza acostado con mancuerna%' THEN 'pullover en pelota suiza acostado con mancuerna' || substr( "searchName", 51 ) ELSE "searchName" END
WHERE "name" = 'Pullover sobre pelota suiza acostado con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1284' );
UPDATE "ExerciseGlobal" SET "name" = 'Pullover en pelota suiza acostado con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'pullover sobre pelota suiza acostado con mancuerna%' THEN 'pullover en pelota suiza acostado con mancuerna' || substr( "searchName", 51 ) ELSE "searchName" END
WHERE "externalId" = '1284' AND "name" = 'Pullover sobre pelota suiza acostado con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Pullover en pelota suiza a una mano con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'pullover sobre pelota suiza a una mano con mancuerna%' THEN 'pullover en pelota suiza a una mano con mancuerna' || substr( "searchName", 53 ) ELSE "searchName" END
WHERE "name" = 'Pullover sobre pelota suiza a una mano con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1291' );
UPDATE "ExerciseGlobal" SET "name" = 'Pullover en pelota suiza a una mano con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'pullover sobre pelota suiza a una mano con mancuerna%' THEN 'pullover en pelota suiza a una mano con mancuerna' || substr( "searchName", 53 ) ELSE "searchName" END
WHERE "externalId" = '1291' AND "name" = 'Pullover sobre pelota suiza a una mano con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Pullover en pelota suiza con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'pullover sobre pelota suiza con mancuerna%' THEN 'pullover en pelota suiza con mancuerna' || substr( "searchName", 42 ) ELSE "searchName" END
WHERE "name" = 'Pullover sobre pelota suiza con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1295' );
UPDATE "ExerciseGlobal" SET "name" = 'Pullover en pelota suiza con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'pullover sobre pelota suiza con mancuerna%' THEN 'pullover en pelota suiza con mancuerna' || substr( "searchName", 42 ) ELSE "searchName" END
WHERE "externalId" = '1295' AND "name" = 'Pullover sobre pelota suiza con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Push press con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'push press con mancuerna%' THEN 'push press con mancuernas' || substr( "searchName", 25 ) ELSE "searchName" END
WHERE "name" = 'Push press con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1700' );
UPDATE "ExerciseGlobal" SET "name" = 'Push press con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'push press con mancuerna%' THEN 'push press con mancuernas' || substr( "searchName", 25 ) ELSE "searchName" END
WHERE "externalId" = '1700' AND "name" = 'Push press con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Recepción y lanzamiento sobre la cabeza con pelota medicinal', "searchName" = CASE WHEN "searchName" LIKE 'recepcion y lanzamiento por encima de la cabeza con pelota medicinal%' THEN 'recepcion y lanzamiento sobre la cabeza con pelota medicinal' || substr( "searchName", 69 ) ELSE "searchName" END
WHERE "name" = 'Recepción y lanzamiento por encima de la cabeza con pelota medicinal' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1353' );
UPDATE "ExerciseGlobal" SET "name" = 'Recepción y lanzamiento sobre la cabeza con pelota medicinal', "searchName" = CASE WHEN "searchName" LIKE 'recepcion y lanzamiento por encima de la cabeza con pelota medicinal%' THEN 'recepcion y lanzamiento sobre la cabeza con pelota medicinal' || substr( "searchName", 69 ) ELSE "searchName" END
WHERE "externalId" = '1353' AND "name" = 'Recepción y lanzamiento por encima de la cabeza con pelota medicinal';

UPDATE "ExerciseCoach" SET "name" = 'Remo al mentón con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'remo al menton con mancuerna%' THEN 'remo al menton con mancuernas' || substr( "searchName", 29 ) ELSE "searchName" END
WHERE "name" = 'Remo al mentón con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0437' );
UPDATE "ExerciseGlobal" SET "name" = 'Remo al mentón con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'remo al menton con mancuerna%' THEN 'remo al menton con mancuernas' || substr( "searchName", 29 ) ELSE "searchName" END
WHERE "externalId" = '0437' AND "name" = 'Remo al mentón con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Remo al mentón con mancuernas (vista trasera)', "searchName" = CASE WHEN "searchName" LIKE 'remo al menton con mancuerna (vista trasera)%' THEN 'remo al menton con mancuernas (vista trasera)' || substr( "searchName", 45 ) ELSE "searchName" END
WHERE "name" = 'Remo al mentón con mancuerna (vista trasera)' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1765' );
UPDATE "ExerciseGlobal" SET "name" = 'Remo al mentón con mancuernas (vista trasera)', "searchName" = CASE WHEN "searchName" LIKE 'remo al menton con mancuerna (vista trasera)%' THEN 'remo al menton con mancuernas (vista trasera)' || substr( "searchName", 45 ) ELSE "searchName" END
WHERE "externalId" = '1765' AND "name" = 'Remo al mentón con mancuerna (vista trasera)';

UPDATE "ExerciseCoach" SET "name" = 'Remo al mentón en Smith', "searchName" = CASE WHEN "searchName" LIKE 'remo al menton en maquina smith%' THEN 'remo al menton en smith' || substr( "searchName", 32 ) ELSE "searchName" END
WHERE "name" = 'Remo al mentón en máquina Smith' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0775' );
UPDATE "ExerciseGlobal" SET "name" = 'Remo al mentón en Smith', "searchName" = CASE WHEN "searchName" LIKE 'remo al menton en maquina smith%' THEN 'remo al menton en smith' || substr( "searchName", 32 ) ELSE "searchName" END
WHERE "externalId" = '0775' AND "name" = 'Remo al mentón en máquina Smith';

UPDATE "ExerciseCoach" SET "name" = 'Remo a una mano en Smith', "searchName" = CASE WHEN "searchName" LIKE 'remo a una mano en maquina smith%' THEN 'remo a una mano en smith' || substr( "searchName", 33 ) ELSE "searchName" END
WHERE "name" = 'Remo a una mano en máquina Smith' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1360' );
UPDATE "ExerciseGlobal" SET "name" = 'Remo a una mano en Smith', "searchName" = CASE WHEN "searchName" LIKE 'remo a una mano en maquina smith%' THEN 'remo a una mano en smith' || substr( "searchName", 33 ) ELSE "searchName" END
WHERE "externalId" = '1360' AND "name" = 'Remo a una mano en máquina Smith';

UPDATE "ExerciseCoach" SET "name" = 'Remo con agarre estrecho en Smith', "searchName" = CASE WHEN "searchName" LIKE 'remo con agarre estrecho en maquina smith%' THEN 'remo con agarre estrecho en smith' || substr( "searchName", 42 ) ELSE "searchName" END
WHERE "name" = 'Remo con agarre estrecho en máquina Smith' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0761' );
UPDATE "ExerciseGlobal" SET "name" = 'Remo con agarre estrecho en Smith', "searchName" = CASE WHEN "searchName" LIKE 'remo con agarre estrecho en maquina smith%' THEN 'remo con agarre estrecho en smith' || substr( "searchName", 42 ) ELSE "searchName" END
WHERE "externalId" = '0761' AND "name" = 'Remo con agarre estrecho en máquina Smith';

UPDATE "ExerciseCoach" SET "name" = 'Remo con agarre inverso con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'remo con agarre inverso con mancuerna%' THEN 'remo con agarre inverso con mancuernas' || substr( "searchName", 38 ) ELSE "searchName" END
WHERE "name" = 'Remo con agarre inverso con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '2327' );
UPDATE "ExerciseGlobal" SET "name" = 'Remo con agarre inverso con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'remo con agarre inverso con mancuerna%' THEN 'remo con agarre inverso con mancuernas' || substr( "searchName", 38 ) ELSE "searchName" END
WHERE "externalId" = '2327' AND "name" = 'Remo con agarre inverso con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Remo en banco inclinado con agarre inverso con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'remo en banco inclinado con agarre inverso a dos manos con mancuerna%' THEN 'remo en banco inclinado con agarre inverso con mancuernas' || substr( "searchName", 69 ) ELSE "searchName" END
WHERE "name" = 'Remo en banco inclinado con agarre inverso a dos manos con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1331' );
UPDATE "ExerciseGlobal" SET "name" = 'Remo en banco inclinado con agarre inverso con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'remo en banco inclinado con agarre inverso a dos manos con mancuerna%' THEN 'remo en banco inclinado con agarre inverso con mancuernas' || substr( "searchName", 69 ) ELSE "searchName" END
WHERE "externalId" = '1331' AND "name" = 'Remo en banco inclinado con agarre inverso a dos manos con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Remo inclinado con agarre inverso en Smith', "searchName" = CASE WHEN "searchName" LIKE 'remo inclinado con agarre inverso en maquina smith%' THEN 'remo inclinado con agarre inverso en smith' || substr( "searchName", 51 ) ELSE "searchName" END
WHERE "name" = 'Remo inclinado con agarre inverso en máquina Smith' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1361' );
UPDATE "ExerciseGlobal" SET "name" = 'Remo inclinado con agarre inverso en Smith', "searchName" = CASE WHEN "searchName" LIKE 'remo inclinado con agarre inverso en maquina smith%' THEN 'remo inclinado con agarre inverso en smith' || substr( "searchName", 51 ) ELSE "searchName" END
WHERE "externalId" = '1361' AND "name" = 'Remo inclinado con agarre inverso en máquina Smith';

UPDATE "ExerciseCoach" SET "name" = 'Remo inclinado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'remo inclinado con mancuerna%' THEN 'remo inclinado con mancuernas' || substr( "searchName", 29 ) ELSE "searchName" END
WHERE "name" = 'Remo inclinado con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0293' );
UPDATE "ExerciseGlobal" SET "name" = 'Remo inclinado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'remo inclinado con mancuerna%' THEN 'remo inclinado con mancuernas' || substr( "searchName", 29 ) ELSE "searchName" END
WHERE "externalId" = '0293' AND "name" = 'Remo inclinado con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Remo inclinado en Smith', "searchName" = CASE WHEN "searchName" LIKE 'remo inclinado en maquina smith%' THEN 'remo inclinado en smith' || substr( "searchName", 32 ) ELSE "searchName" END
WHERE "name" = 'Remo inclinado en máquina Smith' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1359' );
UPDATE "ExerciseGlobal" SET "name" = 'Remo inclinado en Smith', "searchName" = CASE WHEN "searchName" LIKE 'remo inclinado en maquina smith%' THEN 'remo inclinado en smith' || substr( "searchName", 32 ) ELSE "searchName" END
WHERE "externalId" = '1359' AND "name" = 'Remo inclinado en máquina Smith';

UPDATE "ExerciseCoach" SET "name" = 'Remo para deltoides posterior acostado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'remo para deltoides posterior acostado con mancuerna%' THEN 'remo para deltoides posterior acostado con mancuernas' || substr( "searchName", 53 ) ELSE "searchName" END
WHERE "name" = 'Remo para deltoides posterior acostado con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1328' );
UPDATE "ExerciseGlobal" SET "name" = 'Remo para deltoides posterior acostado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'remo para deltoides posterior acostado con mancuerna%' THEN 'remo para deltoides posterior acostado con mancuernas' || substr( "searchName", 53 ) ELSE "searchName" END
WHERE "externalId" = '1328' AND "name" = 'Remo para deltoides posterior acostado con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Remo para deltoides posterior en Smith', "searchName" = CASE WHEN "searchName" LIKE 'remo para deltoides posterior en maquina smith%' THEN 'remo para deltoides posterior en smith' || substr( "searchName", 47 ) ELSE "searchName" END
WHERE "name" = 'Remo para deltoides posterior en máquina Smith' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0762' );
UPDATE "ExerciseGlobal" SET "name" = 'Remo para deltoides posterior en Smith', "searchName" = CASE WHEN "searchName" LIKE 'remo para deltoides posterior en maquina smith%' THEN 'remo para deltoides posterior en smith' || substr( "searchName", 47 ) ELSE "searchName" END
WHERE "externalId" = '0762' AND "name" = 'Remo para deltoides posterior en máquina Smith';

UPDATE "ExerciseCoach" SET "name" = 'Remo rotacional de palma inclinado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'remo rotacional de palma inclinado con mancuerna%' THEN 'remo rotacional de palma inclinado con mancuernas' || substr( "searchName", 49 ) ELSE "searchName" END
WHERE "name" = 'Remo rotacional de palma inclinado con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1329' );
UPDATE "ExerciseGlobal" SET "name" = 'Remo rotacional de palma inclinado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'remo rotacional de palma inclinado con mancuerna%' THEN 'remo rotacional de palma inclinado con mancuernas' || substr( "searchName", 49 ) ELSE "searchName" END
WHERE "externalId" = '1329' AND "name" = 'Remo rotacional de palma inclinado con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Rodillo a una pierna para hombro (flexores, depresores y retractores)', "searchName" = CASE WHEN "searchName" LIKE 'rodillo a una pierna para flexores, depresores y retractores del hombro sentado%' THEN 'rodillo a una pierna para hombro (flexores, depresores y retractores)' || substr( "searchName", 80 ) ELSE "searchName" END
WHERE "name" = 'Rodillo a una pierna para flexores, depresores y retractores del hombro sentado' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '2209' );
UPDATE "ExerciseGlobal" SET "name" = 'Rodillo a una pierna para hombro (flexores, depresores y retractores)', "searchName" = CASE WHEN "searchName" LIKE 'rodillo a una pierna para flexores, depresores y retractores del hombro sentado%' THEN 'rodillo a una pierna para hombro (flexores, depresores y retractores)' || substr( "searchName", 80 ) ELSE "searchName" END
WHERE "externalId" = '2209' AND "name" = 'Rodillo a una pierna para flexores, depresores y retractores del hombro sentado';

UPDATE "ExerciseCoach" SET "name" = 'Rodillo para hombro (flexores, depresores y retractores)', "searchName" = CASE WHEN "searchName" LIKE 'rodillo para flexores, depresores y retractores del hombro sentado%' THEN 'rodillo para hombro (flexores, depresores y retractores)' || substr( "searchName", 67 ) ELSE "searchName" END
WHERE "name" = 'Rodillo para flexores, depresores y retractores del hombro sentado' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '2203' );
UPDATE "ExerciseGlobal" SET "name" = 'Rodillo para hombro (flexores, depresores y retractores)', "searchName" = CASE WHEN "searchName" LIKE 'rodillo para flexores, depresores y retractores del hombro sentado%' THEN 'rodillo para hombro (flexores, depresores y retractores)' || substr( "searchName", 67 ) ELSE "searchName" END
WHERE "externalId" = '2203' AND "name" = 'Rodillo para flexores, depresores y retractores del hombro sentado';

UPDATE "ExerciseCoach" SET "name" = 'Rotación de tren inferior prono a una pierna en pelota suiza', "searchName" = CASE WHEN "searchName" LIKE 'rotacion de tren inferior prono a una pierna sobre pelota suiza%' THEN 'rotacion de tren inferior prono a una pierna en pelota suiza' || substr( "searchName", 64 ) ELSE "searchName" END
WHERE "name" = 'Rotación de tren inferior prono a una pierna sobre pelota suiza' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1416' );
UPDATE "ExerciseGlobal" SET "name" = 'Rotación de tren inferior prono a una pierna en pelota suiza', "searchName" = CASE WHEN "searchName" LIKE 'rotacion de tren inferior prono a una pierna sobre pelota suiza%' THEN 'rotacion de tren inferior prono a una pierna en pelota suiza' || substr( "searchName", 64 ) ELSE "searchName" END
WHERE "externalId" = '1416' AND "name" = 'Rotación de tren inferior prono a una pierna sobre pelota suiza';

UPDATE "ExerciseCoach" SET "name" = 'Scott press con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'scott press con mancuerna%' THEN 'scott press con mancuernas' || substr( "searchName", 26 ) ELSE "searchName" END
WHERE "name" = 'Scott press con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '2397' );
UPDATE "ExerciseGlobal" SET "name" = 'Scott press con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'scott press con mancuerna%' THEN 'scott press con mancuernas' || substr( "searchName", 26 ) ELSE "searchName" END
WHERE "externalId" = '2397' AND "name" = 'Scott press con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Sentadilla a banco con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'sentadilla a banco con mancuerna%' THEN 'sentadilla a banco con mancuernas' || substr( "searchName", 33 ) ELSE "searchName" END
WHERE "name" = 'Sentadilla a banco con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0291' );
UPDATE "ExerciseGlobal" SET "name" = 'Sentadilla a banco con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'sentadilla a banco con mancuerna%' THEN 'sentadilla a banco con mancuernas' || substr( "searchName", 33 ) ELSE "searchName" END
WHERE "externalId" = '0291' AND "name" = 'Sentadilla a banco con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Sentadilla al banco en Smith', "searchName" = CASE WHEN "searchName" LIKE 'sentadilla al banco en maquina smith%' THEN 'sentadilla al banco en smith' || substr( "searchName", 37 ) ELSE "searchName" END
WHERE "name" = 'Sentadilla al banco en máquina Smith' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0750' );
UPDATE "ExerciseGlobal" SET "name" = 'Sentadilla al banco en Smith', "searchName" = CASE WHEN "searchName" LIKE 'sentadilla al banco en maquina smith%' THEN 'sentadilla al banco en smith' || substr( "searchName", 37 ) ELSE "searchName" END
WHERE "externalId" = '0750' AND "name" = 'Sentadilla al banco en máquina Smith';

UPDATE "ExerciseCoach" SET "name" = 'Sentadilla a una pierna con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'sentadilla a una pierna con mancuerna%' THEN 'sentadilla a una pierna con mancuernas' || substr( "searchName", 38 ) ELSE "searchName" END
WHERE "name" = 'Sentadilla a una pierna con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0411' );
UPDATE "ExerciseGlobal" SET "name" = 'Sentadilla a una pierna con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'sentadilla a una pierna con mancuerna%' THEN 'sentadilla a una pierna con mancuernas' || substr( "searchName", 38 ) ELSE "searchName" END
WHERE "externalId" = '0411' AND "name" = 'Sentadilla a una pierna con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Sentadilla completa en Smith', "searchName" = CASE WHEN "searchName" LIKE 'sentadilla completa en maquina smith%' THEN 'sentadilla completa en smith' || substr( "searchName", 37 ) ELSE "searchName" END
WHERE "name" = 'Sentadilla completa en máquina Smith' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '3281' );
UPDATE "ExerciseGlobal" SET "name" = 'Sentadilla completa en Smith', "searchName" = CASE WHEN "searchName" LIKE 'sentadilla completa en maquina smith%' THEN 'sentadilla completa en smith' || substr( "searchName", 37 ) ELSE "searchName" END
WHERE "externalId" = '3281' AND "name" = 'Sentadilla completa en máquina Smith';

UPDATE "ExerciseCoach" SET "name" = 'Sentadilla con alcance sobre la cabeza', "searchName" = CASE WHEN "searchName" LIKE 'sentadilla con alcance por encima de la cabeza%' THEN 'sentadilla con alcance sobre la cabeza' || substr( "searchName", 47 ) ELSE "searchName" END
WHERE "name" = 'Sentadilla con alcance por encima de la cabeza' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1685' );
UPDATE "ExerciseGlobal" SET "name" = 'Sentadilla con alcance sobre la cabeza', "searchName" = CASE WHEN "searchName" LIKE 'sentadilla con alcance por encima de la cabeza%' THEN 'sentadilla con alcance sobre la cabeza' || substr( "searchName", 47 ) ELSE "searchName" END
WHERE "externalId" = '1685' AND "name" = 'Sentadilla con alcance por encima de la cabeza';

UPDATE "ExerciseCoach" SET "name" = 'Sentadilla con alcance sobre la cabeza y giro', "searchName" = CASE WHEN "searchName" LIKE 'sentadilla con alcance por encima de la cabeza y giro%' THEN 'sentadilla con alcance sobre la cabeza y giro' || substr( "searchName", 54 ) ELSE "searchName" END
WHERE "name" = 'Sentadilla con alcance por encima de la cabeza y giro' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1686' );
UPDATE "ExerciseGlobal" SET "name" = 'Sentadilla con alcance sobre la cabeza y giro', "searchName" = CASE WHEN "searchName" LIKE 'sentadilla con alcance por encima de la cabeza y giro%' THEN 'sentadilla con alcance sobre la cabeza y giro' || substr( "searchName", 54 ) ELSE "searchName" END
WHERE "externalId" = '1686' AND "name" = 'Sentadilla con alcance por encima de la cabeza y giro';

UPDATE "ExerciseCoach" SET "name" = 'Sentadilla con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'sentadilla con mancuerna%' THEN 'sentadilla con mancuernas' || substr( "searchName", 25 ) ELSE "searchName" END
WHERE "name" = 'Sentadilla con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0413' );
UPDATE "ExerciseGlobal" SET "name" = 'Sentadilla con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'sentadilla con mancuerna%' THEN 'sentadilla con mancuernas' || substr( "searchName", 25 ) ELSE "searchName" END
WHERE "externalId" = '0413' AND "name" = 'Sentadilla con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Sentadilla dividida a una pierna con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'sentadilla dividida a una pierna con mancuerna%' THEN 'sentadilla dividida a una pierna con mancuernas' || substr( "searchName", 47 ) ELSE "searchName" END
WHERE "name" = 'Sentadilla dividida a una pierna con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0410' );
UPDATE "ExerciseGlobal" SET "name" = 'Sentadilla dividida a una pierna con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'sentadilla dividida a una pierna con mancuerna%' THEN 'sentadilla dividida a una pierna con mancuernas' || substr( "searchName", 47 ) ELSE "searchName" END
WHERE "externalId" = '0410' AND "name" = 'Sentadilla dividida a una pierna con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Sentadilla dividida a una pierna en Smith', "searchName" = CASE WHEN "searchName" LIKE 'sentadilla dividida a una pierna en maquina smith%' THEN 'sentadilla dividida a una pierna en smith' || substr( "searchName", 50 ) ELSE "searchName" END
WHERE "name" = 'Sentadilla dividida a una pierna en máquina Smith' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0768' );
UPDATE "ExerciseGlobal" SET "name" = 'Sentadilla dividida a una pierna en Smith', "searchName" = CASE WHEN "searchName" LIKE 'sentadilla dividida a una pierna en maquina smith%' THEN 'sentadilla dividida a una pierna en smith' || substr( "searchName", 50 ) ELSE "searchName" END
WHERE "externalId" = '0768' AND "name" = 'Sentadilla dividida a una pierna en máquina Smith';

UPDATE "ExerciseCoach" SET "name" = 'Sentadilla en Smith', "searchName" = CASE WHEN "searchName" LIKE 'sentadilla en maquina smith%' THEN 'sentadilla en smith' || substr( "searchName", 28 ) ELSE "searchName" END
WHERE "name" = 'Sentadilla en máquina Smith' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0770' );
UPDATE "ExerciseGlobal" SET "name" = 'Sentadilla en Smith', "searchName" = CASE WHEN "searchName" LIKE 'sentadilla en maquina smith%' THEN 'sentadilla en smith' || substr( "searchName", 28 ) ELSE "searchName" END
WHERE "externalId" = '0770' AND "name" = 'Sentadilla en máquina Smith';

UPDATE "ExerciseCoach" SET "name" = 'Sentadilla frontal (agarre de cargada) en Smith', "searchName" = CASE WHEN "searchName" LIKE 'sentadilla frontal (agarre de cargada) en maquina smith%' THEN 'sentadilla frontal (agarre de cargada) en smith' || substr( "searchName", 56 ) ELSE "searchName" END
WHERE "name" = 'Sentadilla frontal (agarre de cargada) en máquina Smith' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1433' );
UPDATE "ExerciseGlobal" SET "name" = 'Sentadilla frontal (agarre de cargada) en Smith', "searchName" = CASE WHEN "searchName" LIKE 'sentadilla frontal (agarre de cargada) en maquina smith%' THEN 'sentadilla frontal (agarre de cargada) en smith' || substr( "searchName", 56 ) ELSE "searchName" END
WHERE "externalId" = '1433' AND "name" = 'Sentadilla frontal (agarre de cargada) en máquina Smith';

UPDATE "ExerciseCoach" SET "name" = 'Sentadilla hack en Smith', "searchName" = CASE WHEN "searchName" LIKE 'sentadilla hack en maquina smith%' THEN 'sentadilla hack en smith' || substr( "searchName", 33 ) ELSE "searchName" END
WHERE "name" = 'Sentadilla hack en máquina Smith' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0755' );
UPDATE "ExerciseGlobal" SET "name" = 'Sentadilla hack en Smith', "searchName" = CASE WHEN "searchName" LIKE 'sentadilla hack en maquina smith%' THEN 'sentadilla hack en smith' || substr( "searchName", 33 ) ELSE "searchName" END
WHERE "externalId" = '0755' AND "name" = 'Sentadilla hack en máquina Smith';

UPDATE "ExerciseCoach" SET "name" = 'Sentadilla low bar en Smith', "searchName" = CASE WHEN "searchName" LIKE 'sentadilla low bar en maquina smith%' THEN 'sentadilla low bar en smith' || substr( "searchName", 36 ) ELSE "searchName" END
WHERE "name" = 'Sentadilla low bar en máquina Smith' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1434' );
UPDATE "ExerciseGlobal" SET "name" = 'Sentadilla low bar en Smith', "searchName" = CASE WHEN "searchName" LIKE 'sentadilla low bar en maquina smith%' THEN 'sentadilla low bar en smith' || substr( "searchName", 36 ) ELSE "searchName" END
WHERE "externalId" = '1434' AND "name" = 'Sentadilla low bar en máquina Smith';

UPDATE "ExerciseCoach" SET "name" = 'Sentadilla sobre la cabeza con barra', "searchName" = CASE WHEN "searchName" LIKE 'sentadilla por encima de la cabeza con barra%' THEN 'sentadilla sobre la cabeza con barra' || substr( "searchName", 45 ) ELSE "searchName" END
WHERE "name" = 'Sentadilla por encima de la cabeza con barra' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0069' );
UPDATE "ExerciseGlobal" SET "name" = 'Sentadilla sobre la cabeza con barra', "searchName" = CASE WHEN "searchName" LIKE 'sentadilla por encima de la cabeza con barra%' THEN 'sentadilla sobre la cabeza con barra' || substr( "searchName", 45 ) ELSE "searchName" END
WHERE "externalId" = '0069' AND "name" = 'Sentadilla por encima de la cabeza con barra';

UPDATE "ExerciseCoach" SET "name" = 'Sentadilla sumo en Smith', "searchName" = CASE WHEN "searchName" LIKE 'sentadilla sumo en maquina smith%' THEN 'sentadilla sumo en smith' || substr( "searchName", 33 ) ELSE "searchName" END
WHERE "name" = 'Sentadilla sumo en máquina Smith' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '3142' );
UPDATE "ExerciseGlobal" SET "name" = 'Sentadilla sumo en Smith', "searchName" = CASE WHEN "searchName" LIKE 'sentadilla sumo en maquina smith%' THEN 'sentadilla sumo en smith' || substr( "searchName", 33 ) ELSE "searchName" END
WHERE "externalId" = '3142' AND "name" = 'Sentadilla sumo en máquina Smith';

UPDATE "ExerciseCoach" SET "name" = 'Slam sobre la cabeza con pelota medicinal', "searchName" = CASE WHEN "searchName" LIKE 'slam por encima de la cabeza con pelota medicinal%' THEN 'slam sobre la cabeza con pelota medicinal' || substr( "searchName", 50 ) ELSE "searchName" END
WHERE "name" = 'Slam por encima de la cabeza con pelota medicinal' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1354' );
UPDATE "ExerciseGlobal" SET "name" = 'Slam sobre la cabeza con pelota medicinal', "searchName" = CASE WHEN "searchName" LIKE 'slam por encima de la cabeza con pelota medicinal%' THEN 'slam sobre la cabeza con pelota medicinal' || substr( "searchName", 50 ) ELSE "searchName" END
WHERE "externalId" = '1354' AND "name" = 'Slam por encima de la cabeza con pelota medicinal';

UPDATE "ExerciseCoach" SET "name" = 'Subida a escalón con balanceo y curl de bíceps con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'subida a escalon con balanceo y curl de biceps con mancuerna%' THEN 'subida a escalon con balanceo y curl de biceps con mancuernas' || substr( "searchName", 61 ) ELSE "searchName" END
WHERE "name" = 'Subida a escalón con balanceo y curl de bíceps con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1684' );
UPDATE "ExerciseGlobal" SET "name" = 'Subida a escalón con balanceo y curl de bíceps con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'subida a escalon con balanceo y curl de biceps con mancuerna%' THEN 'subida a escalon con balanceo y curl de biceps con mancuernas' || substr( "searchName", 61 ) ELSE "searchName" END
WHERE "externalId" = '1684' AND "name" = 'Subida a escalón con balanceo y curl de bíceps con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Subida al banco con estocada con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'subida al banco con estocada con mancuerna%' THEN 'subida al banco con estocada con mancuernas' || substr( "searchName", 43 ) ELSE "searchName" END
WHERE "name" = 'Subida al banco con estocada con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '2796' );
UPDATE "ExerciseGlobal" SET "name" = 'Subida al banco con estocada con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'subida al banco con estocada con mancuerna%' THEN 'subida al banco con estocada con mancuernas' || substr( "searchName", 43 ) ELSE "searchName" END
WHERE "externalId" = '2796' AND "name" = 'Subida al banco con estocada con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Subida al banco con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'subida al banco con mancuerna%' THEN 'subida al banco con mancuernas' || substr( "searchName", 30 ) ELSE "searchName" END
WHERE "name" = 'Subida al banco con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0431' );
UPDATE "ExerciseGlobal" SET "name" = 'Subida al banco con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'subida al banco con mancuerna%' THEN 'subida al banco con mancuernas' || substr( "searchName", 30 ) ELSE "searchName" END
WHERE "externalId" = '0431' AND "name" = 'Subida al banco con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Subida al banco con sentadilla dividida con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'subida al banco con sentadilla dividida con mancuerna%' THEN 'subida al banco con sentadilla dividida con mancuernas' || substr( "searchName", 54 ) ELSE "searchName" END
WHERE "name" = 'Subida al banco con sentadilla dividida con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '2812' );
UPDATE "ExerciseGlobal" SET "name" = 'Subida al banco con sentadilla dividida con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'subida al banco con sentadilla dividida con mancuerna%' THEN 'subida al banco con sentadilla dividida con mancuernas' || substr( "searchName", 54 ) ELSE "searchName" END
WHERE "externalId" = '2812' AND "name" = 'Subida al banco con sentadilla dividida con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Supinación acostado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'supinacion acostado con mancuerna%' THEN 'supinacion acostado con mancuernas' || substr( "searchName", 34 ) ELSE "searchName" END
WHERE "name" = 'Supinación acostado con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0349' );
UPDATE "ExerciseGlobal" SET "name" = 'Supinación acostado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'supinacion acostado con mancuerna%' THEN 'supinacion acostado con mancuernas' || substr( "searchName", 34 ) ELSE "searchName" END
WHERE "externalId" = '0349' AND "name" = 'Supinación acostado con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Supinación acostado sobre piso con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'supinacion acostado sobre piso con mancuerna%' THEN 'supinacion acostado sobre piso con mancuernas' || substr( "searchName", 45 ) ELSE "searchName" END
WHERE "name" = 'Supinación acostado sobre piso con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '2706' );
UPDATE "ExerciseGlobal" SET "name" = 'Supinación acostado sobre piso con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'supinacion acostado sobre piso con mancuerna%' THEN 'supinacion acostado sobre piso con mancuernas' || substr( "searchName", 45 ) ELSE "searchName" END
WHERE "externalId" = '2706' AND "name" = 'Supinación acostado sobre piso con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Tate press con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'tate press con mancuerna%' THEN 'tate press con mancuernas' || substr( "searchName", 25 ) ELSE "searchName" END
WHERE "name" = 'Tate press con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0436' );
UPDATE "ExerciseGlobal" SET "name" = 'Tate press con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'tate press con mancuerna%' THEN 'tate press con mancuernas' || substr( "searchName", 25 ) ELSE "searchName" END
WHERE "externalId" = '0436' AND "name" = 'Tate press con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Vuelta al mundo de pie con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'vuelta al mundo de pie con mancuerna%' THEN 'vuelta al mundo de pie con mancuernas' || substr( "searchName", 37 ) ELSE "searchName" END
WHERE "name" = 'Vuelta al mundo de pie con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '2143' );
UPDATE "ExerciseGlobal" SET "name" = 'Vuelta al mundo de pie con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'vuelta al mundo de pie con mancuerna%' THEN 'vuelta al mundo de pie con mancuernas' || substr( "searchName", 37 ) ELSE "searchName" END
WHERE "externalId" = '2143' AND "name" = 'Vuelta al mundo de pie con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'W-press con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'w-press con mancuerna%' THEN 'w-press con mancuernas' || substr( "searchName", 22 ) ELSE "searchName" END
WHERE "name" = 'W-press con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0438' );
UPDATE "ExerciseGlobal" SET "name" = 'W-press con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'w-press con mancuerna%' THEN 'w-press con mancuernas' || substr( "searchName", 22 ) ELSE "searchName" END
WHERE "externalId" = '0438' AND "name" = 'W-press con mancuerna';
