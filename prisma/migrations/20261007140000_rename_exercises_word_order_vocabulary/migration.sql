-- Nombres del catalogo con el orden de palabras calcado del ingles o con terminos que en Argentina se dicen distinto.
-- Cada ejercicio se identifica por su codigo (externalId), que no se repite.
--
-- El texto de busqueda (searchName) empieza con el nombre sin acentos: se
-- reemplaza solo ese comienzo, no las apariciones dentro de las instrucciones.
--
-- La copia de cada entrenador se renombra solo si conserva el nombre original;
-- si el entrenador le puso un nombre propio, no se toca.

UPDATE "ExerciseCoach" SET "name" = 'Prensa de gemelos a 45°', "searchName" = CASE WHEN "searchName" LIKE '45° prensa de gemelos con trineo%' THEN 'prensa de gemelos a 45°' || substr( "searchName", 33 ) ELSE "searchName" END
WHERE "name" = '45° prensa de gemelos con trineo' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0738' );
UPDATE "ExerciseGlobal" SET "name" = 'Prensa de gemelos a 45°', "searchName" = CASE WHEN "searchName" LIKE '45° prensa de gemelos con trineo%' THEN 'prensa de gemelos a 45°' || substr( "searchName", 33 ) ELSE "searchName" END
WHERE "externalId" = '0738' AND "name" = '45° prensa de gemelos con trineo';

UPDATE "ExerciseCoach" SET "name" = 'Prensa de piernas abierta a 45°', "searchName" = CASE WHEN "searchName" LIKE '45° prensa de piernas abierta con trineo%' THEN 'prensa de piernas abierta a 45°' || substr( "searchName", 41 ) ELSE "searchName" END
WHERE "name" = '45° prensa de piernas abierta con trineo' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0740' );
UPDATE "ExerciseGlobal" SET "name" = 'Prensa de piernas abierta a 45°', "searchName" = CASE WHEN "searchName" LIKE '45° prensa de piernas abierta con trineo%' THEN 'prensa de piernas abierta a 45°' || substr( "searchName", 41 ) ELSE "searchName" END
WHERE "externalId" = '0740' AND "name" = '45° prensa de piernas abierta con trineo';

UPDATE "ExerciseCoach" SET "name" = 'Prensa de piernas a 45°', "searchName" = CASE WHEN "searchName" LIKE '45° prensa de piernas con trineo%' THEN 'prensa de piernas a 45°' || substr( "searchName", 33 ) ELSE "searchName" END
WHERE "name" = '45° prensa de piernas con trineo' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0739' );
UPDATE "ExerciseGlobal" SET "name" = 'Prensa de piernas a 45°', "searchName" = CASE WHEN "searchName" LIKE '45° prensa de piernas con trineo%' THEN 'prensa de piernas a 45°' || substr( "searchName", 33 ) ELSE "searchName" END
WHERE "externalId" = '0739' AND "name" = '45° prensa de piernas con trineo';

UPDATE "ExerciseCoach" SET "name" = 'Prensa de piernas a 45° (vista lateral)', "searchName" = CASE WHEN "searchName" LIKE '45° prensa de piernas con trineo (vista lateral)%' THEN 'prensa de piernas a 45° (vista lateral)' || substr( "searchName", 49 ) ELSE "searchName" END
WHERE "name" = '45° prensa de piernas con trineo (vista lateral)' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1463' );
UPDATE "ExerciseGlobal" SET "name" = 'Prensa de piernas a 45° (vista lateral)', "searchName" = CASE WHEN "searchName" LIKE '45° prensa de piernas con trineo (vista lateral)%' THEN 'prensa de piernas a 45° (vista lateral)' || substr( "searchName", 49 ) ELSE "searchName" END
WHERE "externalId" = '1463' AND "name" = '45° prensa de piernas con trineo (vista lateral)';

UPDATE "ExerciseCoach" SET "name" = 'Prensa de piernas a 45° (vista trasera)', "searchName" = CASE WHEN "searchName" LIKE '45° prensa de piernas con trineo (vista trasera)%' THEN 'prensa de piernas a 45° (vista trasera)' || substr( "searchName", 49 ) ELSE "searchName" END
WHERE "name" = '45° prensa de piernas con trineo (vista trasera)' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1464' );
UPDATE "ExerciseGlobal" SET "name" = 'Prensa de piernas a 45° (vista trasera)', "searchName" = CASE WHEN "searchName" LIKE '45° prensa de piernas con trineo (vista trasera)%' THEN 'prensa de piernas a 45° (vista trasera)' || substr( "searchName", 49 ) ELSE "searchName" END
WHERE "externalId" = '1464' AND "name" = '45° prensa de piernas con trineo (vista trasera)';

UPDATE "ExerciseCoach" SET "name" = 'Abducción de cadera sentado en máquina', "searchName" = CASE WHEN "searchName" LIKE 'abduccion de cadera sentado en maquina de palanca%' THEN 'abduccion de cadera sentado en maquina' || substr( "searchName", 50 ) ELSE "searchName" END
WHERE "name" = 'Abducción de cadera sentado en máquina de palanca' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0597' );
UPDATE "ExerciseGlobal" SET "name" = 'Abducción de cadera sentado en máquina', "searchName" = CASE WHEN "searchName" LIKE 'abduccion de cadera sentado en maquina de palanca%' THEN 'abduccion de cadera sentado en maquina' || substr( "searchName", 50 ) ELSE "searchName" END
WHERE "externalId" = '0597' AND "name" = 'Abducción de cadera sentado en máquina de palanca';

UPDATE "ExerciseCoach" SET "name" = 'Extensión de tríceps acostado sobre piso con cuerda en polea', "searchName" = CASE WHEN "searchName" LIKE 'acostado sobre piso extension de triceps con cuerda en polea%' THEN 'extension de triceps acostado sobre piso con cuerda en polea' || substr( "searchName", 61 ) ELSE "searchName" END
WHERE "name" = 'Acostado sobre piso extensión de tríceps con cuerda en polea' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1726' );
UPDATE "ExerciseGlobal" SET "name" = 'Extensión de tríceps acostado sobre piso con cuerda en polea', "searchName" = CASE WHEN "searchName" LIKE 'acostado sobre piso extension de triceps con cuerda en polea%' THEN 'extension de triceps acostado sobre piso con cuerda en polea' || substr( "searchName", 61 ) ELSE "searchName" END
WHERE "externalId" = '1726' AND "name" = 'Acostado sobre piso extensión de tríceps con cuerda en polea';

UPDATE "ExerciseCoach" SET "name" = 'Aducción de cadera en polea', "searchName" = CASE WHEN "searchName" LIKE 'adduccion de cadera en polea%' THEN 'aduccion de cadera en polea' || substr( "searchName", 29 ) ELSE "searchName" END
WHERE "name" = 'Adducción de cadera en polea' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0168' );
UPDATE "ExerciseGlobal" SET "name" = 'Aducción de cadera en polea', "searchName" = CASE WHEN "searchName" LIKE 'adduccion de cadera en polea%' THEN 'aduccion de cadera en polea' || substr( "searchName", 29 ) ELSE "searchName" END
WHERE "externalId" = '0168' AND "name" = 'Adducción de cadera en polea';

UPDATE "ExerciseCoach" SET "name" = 'Aducción de cadera sentado en máquina', "searchName" = CASE WHEN "searchName" LIKE 'adduccion de cadera sentado en maquina de palanca%' THEN 'aduccion de cadera sentado en maquina' || substr( "searchName", 50 ) ELSE "searchName" END
WHERE "name" = 'Adducción de cadera sentado en máquina de palanca' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0598' );
UPDATE "ExerciseGlobal" SET "name" = 'Aducción de cadera sentado en máquina', "searchName" = CASE WHEN "searchName" LIKE 'adduccion de cadera sentado en maquina de palanca%' THEN 'aduccion de cadera sentado en maquina' || substr( "searchName", 50 ) ELSE "searchName" END
WHERE "externalId" = '0598' AND "name" = 'Adducción de cadera sentado en máquina de palanca';

UPDATE "ExerciseCoach" SET "name" = 'Curl de bíceps con agarre amplio de pie con barra', "searchName" = CASE WHEN "searchName" LIKE 'agarre amplio curl de biceps de pie con barra%' THEN 'curl de biceps con agarre amplio de pie con barra' || substr( "searchName", 46 ) ELSE "searchName" END
WHERE "name" = 'Agarre amplio curl de bíceps de pie con barra' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1629' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl de bíceps con agarre amplio de pie con barra', "searchName" = CASE WHEN "searchName" LIKE 'agarre amplio curl de biceps de pie con barra%' THEN 'curl de biceps con agarre amplio de pie con barra' || substr( "searchName", 46 ) ELSE "searchName" END
WHERE "externalId" = '1629' AND "name" = 'Agarre amplio curl de bíceps de pie con barra';

UPDATE "ExerciseCoach" SET "name" = 'Curl con agarre amplio de pie con barra', "searchName" = CASE WHEN "searchName" LIKE 'agarre amplio curl de pie con barra%' THEN 'curl con agarre amplio de pie con barra' || substr( "searchName", 36 ) ELSE "searchName" END
WHERE "name" = 'Agarre amplio curl de pie con barra' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0113' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl con agarre amplio de pie con barra', "searchName" = CASE WHEN "searchName" LIKE 'agarre amplio curl de pie con barra%' THEN 'curl con agarre amplio de pie con barra' || substr( "searchName", 36 ) ELSE "searchName" END
WHERE "externalId" = '0113' AND "name" = 'Agarre amplio curl de pie con barra';

UPDATE "ExerciseCoach" SET "name" = 'Dominada con agarre amplio', "searchName" = CASE WHEN "searchName" LIKE 'agarre amplio dominada%' THEN 'dominada con agarre amplio' || substr( "searchName", 23 ) ELSE "searchName" END
WHERE "name" = 'Agarre amplio dominada' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1429' );
UPDATE "ExerciseGlobal" SET "name" = 'Dominada con agarre amplio', "searchName" = CASE WHEN "searchName" LIKE 'agarre amplio dominada%' THEN 'dominada con agarre amplio' || substr( "searchName", 23 ) ELSE "searchName" END
WHERE "externalId" = '1429' AND "name" = 'Agarre amplio dominada';

UPDATE "ExerciseCoach" SET "name" = 'Dominada posterior con agarre amplio', "searchName" = CASE WHEN "searchName" LIKE 'agarre amplio dominada posterior%' THEN 'dominada posterior con agarre amplio' || substr( "searchName", 33 ) ELSE "searchName" END
WHERE "name" = 'Agarre amplio dominada posterior' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1367' );
UPDATE "ExerciseGlobal" SET "name" = 'Dominada posterior con agarre amplio', "searchName" = CASE WHEN "searchName" LIKE 'agarre amplio dominada posterior%' THEN 'dominada posterior con agarre amplio' || substr( "searchName", 33 ) ELSE "searchName" END
WHERE "externalId" = '1367' AND "name" = 'Agarre amplio dominada posterior';

UPDATE "ExerciseCoach" SET "name" = 'Fondos de pecho con agarre amplio sobre paralelas altas', "searchName" = CASE WHEN "searchName" LIKE 'agarre amplio fondos de pecho sobre paralelas altas%' THEN 'fondos de pecho con agarre amplio sobre paralelas altas' || substr( "searchName", 52 ) ELSE "searchName" END
WHERE "name" = 'Agarre amplio fondos de pecho sobre paralelas altas' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '2363' );
UPDATE "ExerciseGlobal" SET "name" = 'Fondos de pecho con agarre amplio sobre paralelas altas', "searchName" = CASE WHEN "searchName" LIKE 'agarre amplio fondos de pecho sobre paralelas altas%' THEN 'fondos de pecho con agarre amplio sobre paralelas altas' || substr( "searchName", 52 ) ELSE "searchName" END
WHERE "externalId" = '2363' AND "name" = 'Agarre amplio fondos de pecho sobre paralelas altas';

UPDATE "ExerciseCoach" SET "name" = 'Jalón posterior tras nuca con agarre amplio en polea', "searchName" = CASE WHEN "searchName" LIKE 'agarre amplio jalon posterior tras nuca en polea%' THEN 'jalon posterior tras nuca con agarre amplio en polea' || substr( "searchName", 49 ) ELSE "searchName" END
WHERE "name" = 'Agarre amplio jalón posterior tras nuca en polea' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1325' );
UPDATE "ExerciseGlobal" SET "name" = 'Jalón posterior tras nuca con agarre amplio en polea', "searchName" = CASE WHEN "searchName" LIKE 'agarre amplio jalon posterior tras nuca en polea%' THEN 'jalon posterior tras nuca con agarre amplio en polea' || substr( "searchName", 49 ) ELSE "searchName" END
WHERE "externalId" = '1325' AND "name" = 'Agarre amplio jalón posterior tras nuca en polea';

UPDATE "ExerciseCoach" SET "name" = 'Press de banca declinado con agarre amplio en máquina Smith', "searchName" = CASE WHEN "searchName" LIKE 'agarre amplio press de banca declinado en maquina smith%' THEN 'press de banca declinado con agarre amplio en maquina smith' || substr( "searchName", 56 ) ELSE "searchName" END
WHERE "name" = 'Agarre amplio press de banca declinado en máquina Smith' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1309' );
UPDATE "ExerciseGlobal" SET "name" = 'Press de banca declinado con agarre amplio en máquina Smith', "searchName" = CASE WHEN "searchName" LIKE 'agarre amplio press de banca declinado en maquina smith%' THEN 'press de banca declinado con agarre amplio en maquina smith' || substr( "searchName", 56 ) ELSE "searchName" END
WHERE "externalId" = '1309' AND "name" = 'Agarre amplio press de banca declinado en máquina Smith';

UPDATE "ExerciseCoach" SET "name" = 'Press de banca con agarre amplio en máquina Smith', "searchName" = CASE WHEN "searchName" LIKE 'agarre amplio press de banca en maquina smith%' THEN 'press de banca con agarre amplio en maquina smith' || substr( "searchName", 46 ) ELSE "searchName" END
WHERE "name" = 'Agarre amplio press de banca en máquina Smith' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1308' );
UPDATE "ExerciseGlobal" SET "name" = 'Press de banca con agarre amplio en máquina Smith', "searchName" = CASE WHEN "searchName" LIKE 'agarre amplio press de banca en maquina smith%' THEN 'press de banca con agarre amplio en maquina smith' || substr( "searchName", 46 ) ELSE "searchName" END
WHERE "externalId" = '1308' AND "name" = 'Agarre amplio press de banca en máquina Smith';

UPDATE "ExerciseCoach" SET "name" = 'Remo al mentón con agarre amplio con barra', "searchName" = CASE WHEN "searchName" LIKE 'agarre amplio remo al menton con barra%' THEN 'remo al menton con agarre amplio con barra' || substr( "searchName", 39 ) ELSE "searchName" END
WHERE "name" = 'Agarre amplio remo al mentón con barra' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0123' );
UPDATE "ExerciseGlobal" SET "name" = 'Remo al mentón con agarre amplio con barra', "searchName" = CASE WHEN "searchName" LIKE 'agarre amplio remo al menton con barra%' THEN 'remo al menton con agarre amplio con barra' || substr( "searchName", 39 ) ELSE "searchName" END
WHERE "externalId" = '0123' AND "name" = 'Agarre amplio remo al mentón con barra';

UPDATE "ExerciseCoach" SET "name" = 'Remo con agarre amplio declinado sentado en polea', "searchName" = CASE WHEN "searchName" LIKE 'agarre amplio remo declinado sentado en polea%' THEN 'remo con agarre amplio declinado sentado en polea' || substr( "searchName", 46 ) ELSE "searchName" END
WHERE "name" = 'Agarre amplio remo declinado sentado en polea' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0159' );
UPDATE "ExerciseGlobal" SET "name" = 'Remo con agarre amplio declinado sentado en polea', "searchName" = CASE WHEN "searchName" LIKE 'agarre amplio remo declinado sentado en polea%' THEN 'remo con agarre amplio declinado sentado en polea' || substr( "searchName", 46 ) ELSE "searchName" END
WHERE "externalId" = '0159' AND "name" = 'Agarre amplio remo declinado sentado en polea';

UPDATE "ExerciseCoach" SET "name" = 'Remo con agarre amplio sentado en polea', "searchName" = CASE WHEN "searchName" LIKE 'agarre amplio remo sentado en polea%' THEN 'remo con agarre amplio sentado en polea' || substr( "searchName", 36 ) ELSE "searchName" END
WHERE "name" = 'Agarre amplio remo sentado en polea' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0218' );
UPDATE "ExerciseGlobal" SET "name" = 'Remo con agarre amplio sentado en polea', "searchName" = CASE WHEN "searchName" LIKE 'agarre amplio remo sentado en polea%' THEN 'remo con agarre amplio sentado en polea' || substr( "searchName", 36 ) ELSE "searchName" END
WHERE "externalId" = '0218' AND "name" = 'Agarre amplio remo sentado en polea';

UPDATE "ExerciseCoach" SET "name" = 'Curl con agarre cerrado acostado en polea', "searchName" = CASE WHEN "searchName" LIKE 'agarre cerrado curl acostado en polea%' THEN 'curl con agarre cerrado acostado en polea' || substr( "searchName", 38 ) ELSE "searchName" END
WHERE "name" = 'Agarre cerrado curl acostado en polea' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0182' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl con agarre cerrado acostado en polea', "searchName" = CASE WHEN "searchName" LIKE 'agarre cerrado curl acostado en polea%' THEN 'curl con agarre cerrado acostado en polea' || substr( "searchName", 38 ) ELSE "searchName" END
WHERE "externalId" = '0182' AND "name" = 'Agarre cerrado curl acostado en polea';

UPDATE "ExerciseCoach" SET "name" = 'Curl de concentración con agarre cerrado sentado con barra', "searchName" = CASE WHEN "searchName" LIKE 'agarre cerrado curl de concentracion sentado con barra%' THEN 'curl de concentracion con agarre cerrado sentado con barra' || substr( "searchName", 55 ) ELSE "searchName" END
WHERE "name" = 'Agarre cerrado curl de concentración sentado con barra' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0089' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl de concentración con agarre cerrado sentado con barra', "searchName" = CASE WHEN "searchName" LIKE 'agarre cerrado curl de concentracion sentado con barra%' THEN 'curl de concentracion con agarre cerrado sentado con barra' || substr( "searchName", 55 ) ELSE "searchName" END
WHERE "externalId" = '0089' AND "name" = 'Agarre cerrado curl de concentración sentado con barra';

UPDATE "ExerciseCoach" SET "name" = 'Curl de concentración con agarre cerrado sentado con barra EZ', "searchName" = CASE WHEN "searchName" LIKE 'agarre cerrado curl de concentracion sentado con barra ez%' THEN 'curl de concentracion con agarre cerrado sentado con barra ez' || substr( "searchName", 58 ) ELSE "searchName" END
WHERE "name" = 'Agarre cerrado curl de concentración sentado con barra EZ' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1682' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl de concentración con agarre cerrado sentado con barra EZ', "searchName" = CASE WHEN "searchName" LIKE 'agarre cerrado curl de concentracion sentado con barra ez%' THEN 'curl de concentracion con agarre cerrado sentado con barra ez' || substr( "searchName", 58 ) ELSE "searchName" END
WHERE "externalId" = '1682' AND "name" = 'Agarre cerrado curl de concentración sentado con barra EZ';

UPDATE "ExerciseCoach" SET "name" = 'Curl con agarre cerrado de pie con barra', "searchName" = CASE WHEN "searchName" LIKE 'agarre cerrado curl de pie con barra%' THEN 'curl con agarre cerrado de pie con barra' || substr( "searchName", 37 ) ELSE "searchName" END
WHERE "name" = 'Agarre cerrado curl de pie con barra' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0106' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl con agarre cerrado de pie con barra', "searchName" = CASE WHEN "searchName" LIKE 'agarre cerrado curl de pie con barra%' THEN 'curl con agarre cerrado de pie con barra' || substr( "searchName", 37 ) ELSE "searchName" END
WHERE "externalId" = '0106' AND "name" = 'Agarre cerrado curl de pie con barra';

UPDATE "ExerciseCoach" SET "name" = 'Curl con agarre cerrado en polea', "searchName" = CASE WHEN "searchName" LIKE 'agarre cerrado curl en polea%' THEN 'curl con agarre cerrado en polea' || substr( "searchName", 29 ) ELSE "searchName" END
WHERE "name" = 'Agarre cerrado curl en polea' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1630' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl con agarre cerrado en polea', "searchName" = CASE WHEN "searchName" LIKE 'agarre cerrado curl en polea%' THEN 'curl con agarre cerrado en polea' || substr( "searchName", 29 ) ELSE "searchName" END
WHERE "externalId" = '1630' AND "name" = 'Agarre cerrado curl en polea';

UPDATE "ExerciseCoach" SET "name" = 'Dominada supina con agarre cerrado', "searchName" = CASE WHEN "searchName" LIKE 'agarre cerrado dominada supina%' THEN 'dominada supina con agarre cerrado' || substr( "searchName", 31 ) ELSE "searchName" END
WHERE "name" = 'Agarre cerrado dominada supina' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1327' );
UPDATE "ExerciseGlobal" SET "name" = 'Dominada supina con agarre cerrado', "searchName" = CASE WHEN "searchName" LIKE 'agarre cerrado dominada supina%' THEN 'dominada supina con agarre cerrado' || substr( "searchName", 31 ) ELSE "searchName" END
WHERE "externalId" = '1327' AND "name" = 'Agarre cerrado dominada supina';

UPDATE "ExerciseCoach" SET "name" = 'Dominada supina con agarre cerrado sobre jaula de fondos con peso', "searchName" = CASE WHEN "searchName" LIKE 'agarre cerrado dominada supina sobre jaula de fondos con peso%' THEN 'dominada supina con agarre cerrado sobre jaula de fondos con peso' || substr( "searchName", 62 ) ELSE "searchName" END
WHERE "name" = 'Agarre cerrado dominada supina sobre jaula de fondos con peso' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '2987' );
UPDATE "ExerciseGlobal" SET "name" = 'Dominada supina con agarre cerrado sobre jaula de fondos con peso', "searchName" = CASE WHEN "searchName" LIKE 'agarre cerrado dominada supina sobre jaula de fondos con peso%' THEN 'dominada supina con agarre cerrado sobre jaula de fondos con peso' || substr( "searchName", 62 ) ELSE "searchName" END
WHERE "externalId" = '2987' AND "name" = 'Agarre cerrado dominada supina sobre jaula de fondos con peso';

UPDATE "ExerciseCoach" SET "name" = 'Extensión de tríceps con agarre cerrado acostado con barra', "searchName" = CASE WHEN "searchName" LIKE 'agarre cerrado extension de triceps acostado con barra%' THEN 'extension de triceps con agarre cerrado acostado con barra' || substr( "searchName", 55 ) ELSE "searchName" END
WHERE "name" = 'Agarre cerrado extensión de tríceps acostado con barra' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0056' );
UPDATE "ExerciseGlobal" SET "name" = 'Extensión de tríceps con agarre cerrado acostado con barra', "searchName" = CASE WHEN "searchName" LIKE 'agarre cerrado extension de triceps acostado con barra%' THEN 'extension de triceps con agarre cerrado acostado con barra' || substr( "searchName", 55 ) ELSE "searchName" END
WHERE "externalId" = '0056' AND "name" = 'Agarre cerrado extensión de tríceps acostado con barra';

UPDATE "ExerciseCoach" SET "name" = 'Extensión de tríceps con agarre cerrado detrás de la cabeza acostado con barra EZ', "searchName" = CASE WHEN "searchName" LIKE 'agarre cerrado extension de triceps detras de la cabeza acostado con barra ez%' THEN 'extension de triceps con agarre cerrado detras de la cabeza acostado con barra ez' || substr( "searchName", 78 ) ELSE "searchName" END
WHERE "name" = 'Agarre cerrado extensión de tríceps detrás de la cabeza acostado con barra EZ' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1748' );
UPDATE "ExerciseGlobal" SET "name" = 'Extensión de tríceps con agarre cerrado detrás de la cabeza acostado con barra EZ', "searchName" = CASE WHEN "searchName" LIKE 'agarre cerrado extension de triceps detras de la cabeza acostado con barra ez%' THEN 'extension de triceps con agarre cerrado detras de la cabeza acostado con barra ez' || substr( "searchName", 78 ) ELSE "searchName" END
WHERE "externalId" = '1748' AND "name" = 'Agarre cerrado extensión de tríceps detrás de la cabeza acostado con barra EZ';

UPDATE "ExerciseCoach" SET "name" = 'Flexión de brazos con agarre cerrado', "searchName" = CASE WHEN "searchName" LIKE 'agarre cerrado flexion%' THEN 'flexion de brazos con agarre cerrado' || substr( "searchName", 23 ) ELSE "searchName" END
WHERE "name" = 'Agarre cerrado flexión' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0259' );
UPDATE "ExerciseGlobal" SET "name" = 'Flexión de brazos con agarre cerrado', "searchName" = CASE WHEN "searchName" LIKE 'agarre cerrado flexion%' THEN 'flexion de brazos con agarre cerrado' || substr( "searchName", 23 ) ELSE "searchName" END
WHERE "externalId" = '0259' AND "name" = 'Agarre cerrado flexión';

UPDATE "ExerciseCoach" SET "name" = 'Flexión de brazos con agarre cerrado con banda', "searchName" = CASE WHEN "searchName" LIKE 'agarre cerrado flexion con banda%' THEN 'flexion de brazos con agarre cerrado con banda' || substr( "searchName", 33 ) ELSE "searchName" END
WHERE "name" = 'Agarre cerrado flexión con banda' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0975' );
UPDATE "ExerciseGlobal" SET "name" = 'Flexión de brazos con agarre cerrado con banda', "searchName" = CASE WHEN "searchName" LIKE 'agarre cerrado flexion con banda%' THEN 'flexion de brazos con agarre cerrado con banda' || substr( "searchName", 33 ) ELSE "searchName" END
WHERE "externalId" = '0975' AND "name" = 'Agarre cerrado flexión con banda';

UPDATE "ExerciseCoach" SET "name" = 'Flexión de brazos con agarre cerrado con pelota medicinal', "searchName" = CASE WHEN "searchName" LIKE 'agarre cerrado flexion con pelota medicinal%' THEN 'flexion de brazos con agarre cerrado con pelota medicinal' || substr( "searchName", 44 ) ELSE "searchName" END
WHERE "name" = 'Agarre cerrado flexión con pelota medicinal' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1701' );
UPDATE "ExerciseGlobal" SET "name" = 'Flexión de brazos con agarre cerrado con pelota medicinal', "searchName" = CASE WHEN "searchName" LIKE 'agarre cerrado flexion con pelota medicinal%' THEN 'flexion de brazos con agarre cerrado con pelota medicinal' || substr( "searchName", 44 ) ELSE "searchName" END
WHERE "externalId" = '1701' AND "name" = 'Agarre cerrado flexión con pelota medicinal';

UPDATE "ExerciseCoach" SET "name" = 'Flexión de brazos con agarre cerrado inclinado', "searchName" = CASE WHEN "searchName" LIKE 'agarre cerrado flexion inclinado%' THEN 'flexion de brazos con agarre cerrado inclinado' || substr( "searchName", 33 ) ELSE "searchName" END
WHERE "name" = 'Agarre cerrado flexión inclinado' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0490' );
UPDATE "ExerciseGlobal" SET "name" = 'Flexión de brazos con agarre cerrado inclinado', "searchName" = CASE WHEN "searchName" LIKE 'agarre cerrado flexion inclinado%' THEN 'flexion de brazos con agarre cerrado inclinado' || substr( "searchName", 33 ) ELSE "searchName" END
WHERE "externalId" = '0490' AND "name" = 'Agarre cerrado flexión inclinado';

UPDATE "ExerciseCoach" SET "name" = 'Flexión de brazos con agarre cerrado (sobre rodillas)', "searchName" = CASE WHEN "searchName" LIKE 'agarre cerrado flexion (sobre rodillas)%' THEN 'flexion de brazos con agarre cerrado (sobre rodillas)' || substr( "searchName", 40 ) ELSE "searchName" END
WHERE "name" = 'Agarre cerrado flexión (sobre rodillas)' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '2398' );
UPDATE "ExerciseGlobal" SET "name" = 'Flexión de brazos con agarre cerrado (sobre rodillas)', "searchName" = CASE WHEN "searchName" LIKE 'agarre cerrado flexion (sobre rodillas)%' THEN 'flexion de brazos con agarre cerrado (sobre rodillas)' || substr( "searchName", 40 ) ELSE "searchName" END
WHERE "externalId" = '2398' AND "name" = 'Agarre cerrado flexión (sobre rodillas)';

UPDATE "ExerciseCoach" SET "name" = 'Jalón con agarre cerrado con banda', "searchName" = CASE WHEN "searchName" LIKE 'agarre cerrado jalon con banda%' THEN 'jalon con agarre cerrado con banda' || substr( "searchName", 31 ) ELSE "searchName" END
WHERE "name" = 'Agarre cerrado jalón con banda' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0974' );
UPDATE "ExerciseGlobal" SET "name" = 'Jalón con agarre cerrado con banda', "searchName" = CASE WHEN "searchName" LIKE 'agarre cerrado jalon con banda%' THEN 'jalon con agarre cerrado con banda' || substr( "searchName", 31 ) ELSE "searchName" END
WHERE "externalId" = '0974' AND "name" = 'Agarre cerrado jalón con banda';

UPDATE "ExerciseCoach" SET "name" = 'Press con agarre cerrado acostado con barra', "searchName" = CASE WHEN "searchName" LIKE 'agarre cerrado press acostado con barra%' THEN 'press con agarre cerrado acostado con barra' || substr( "searchName", 40 ) ELSE "searchName" END
WHERE "name" = 'Agarre cerrado press acostado con barra' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0055' );
UPDATE "ExerciseGlobal" SET "name" = 'Press con agarre cerrado acostado con barra', "searchName" = CASE WHEN "searchName" LIKE 'agarre cerrado press acostado con barra%' THEN 'press con agarre cerrado acostado con barra' || substr( "searchName", 40 ) ELSE "searchName" END
WHERE "externalId" = '0055' AND "name" = 'Agarre cerrado press acostado con barra';

UPDATE "ExerciseCoach" SET "name" = 'Press con agarre cerrado con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'agarre cerrado press con mancuerna%' THEN 'press con agarre cerrado con mancuerna' || substr( "searchName", 35 ) ELSE "searchName" END
WHERE "name" = 'Agarre cerrado press con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0296' );
UPDATE "ExerciseGlobal" SET "name" = 'Press con agarre cerrado con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'agarre cerrado press con mancuerna%' THEN 'press con agarre cerrado con mancuerna' || substr( "searchName", 35 ) ELSE "searchName" END
WHERE "externalId" = '0296' AND "name" = 'Agarre cerrado press con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Press con agarre cerrado con mancuerna (variante 2)', "searchName" = CASE WHEN "searchName" LIKE 'agarre cerrado press con mancuerna (variante 2)%' THEN 'press con agarre cerrado con mancuerna (variante 2)' || substr( "searchName", 48 ) ELSE "searchName" END
WHERE "name" = 'Agarre cerrado press con mancuerna (variante 2)' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1731' );
UPDATE "ExerciseGlobal" SET "name" = 'Press con agarre cerrado con mancuerna (variante 2)', "searchName" = CASE WHEN "searchName" LIKE 'agarre cerrado press con mancuerna (variante 2)%' THEN 'press con agarre cerrado con mancuerna (variante 2)' || substr( "searchName", 48 ) ELSE "searchName" END
WHERE "externalId" = '1731' AND "name" = 'Agarre cerrado press con mancuerna (variante 2)';

UPDATE "ExerciseCoach" SET "name" = 'Press militar con agarre cerrado de pie con barra', "searchName" = CASE WHEN "searchName" LIKE 'agarre cerrado press militar de pie con barra%' THEN 'press militar con agarre cerrado de pie con barra' || substr( "searchName", 46 ) ELSE "searchName" END
WHERE "name" = 'Agarre cerrado press militar de pie con barra' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1456' );
UPDATE "ExerciseGlobal" SET "name" = 'Press militar con agarre cerrado de pie con barra', "searchName" = CASE WHEN "searchName" LIKE 'agarre cerrado press militar de pie con barra%' THEN 'press militar con agarre cerrado de pie con barra' || substr( "searchName", 46 ) ELSE "searchName" END
WHERE "externalId" = '1456' AND "name" = 'Agarre cerrado press militar de pie con barra';

UPDATE "ExerciseCoach" SET "name" = 'Remo con agarre cerrado de pie', "searchName" = CASE WHEN "searchName" LIKE 'agarre cerrado remo de pie%' THEN 'remo con agarre cerrado de pie' || substr( "searchName", 27 ) ELSE "searchName" END
WHERE "name" = 'Agarre cerrado remo de pie' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '3158' );
UPDATE "ExerciseGlobal" SET "name" = 'Remo con agarre cerrado de pie', "searchName" = CASE WHEN "searchName" LIKE 'agarre cerrado remo de pie%' THEN 'remo con agarre cerrado de pie' || substr( "searchName", 27 ) ELSE "searchName" END
WHERE "externalId" = '3158' AND "name" = 'Agarre cerrado remo de pie';

UPDATE "ExerciseCoach" SET "name" = 'Extensión de tríceps tras nuca con agarre cerrado sentado con barra', "searchName" = CASE WHEN "searchName" LIKE 'agarre cerrado tras nuca extension de triceps sentado con barra%' THEN 'extension de triceps tras nuca con agarre cerrado sentado con barra' || substr( "searchName", 64 ) ELSE "searchName" END
WHERE "name" = 'Agarre cerrado tras nuca extensión de tríceps sentado con barra' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1718' );
UPDATE "ExerciseGlobal" SET "name" = 'Extensión de tríceps tras nuca con agarre cerrado sentado con barra', "searchName" = CASE WHEN "searchName" LIKE 'agarre cerrado tras nuca extension de triceps sentado con barra%' THEN 'extension de triceps tras nuca con agarre cerrado sentado con barra' || substr( "searchName", 64 ) ELSE "searchName" END
WHERE "externalId" = '1718' AND "name" = 'Agarre cerrado tras nuca extensión de tríceps sentado con barra';

UPDATE "ExerciseCoach" SET "name" = 'Remo con agarre estrecho alternado sentado en máquina', "searchName" = CASE WHEN "searchName" LIKE 'agarre estrecho remo alternado sentado en maquina de palanca%' THEN 'remo con agarre estrecho alternado sentado en maquina' || substr( "searchName", 61 ) ELSE "searchName" END
WHERE "name" = 'Agarre estrecho remo alternado sentado en máquina de palanca' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0571' );
UPDATE "ExerciseGlobal" SET "name" = 'Remo con agarre estrecho alternado sentado en máquina', "searchName" = CASE WHEN "searchName" LIKE 'agarre estrecho remo alternado sentado en maquina de palanca%' THEN 'remo con agarre estrecho alternado sentado en maquina' || substr( "searchName", 61 ) ELSE "searchName" END
WHERE "externalId" = '0571' AND "name" = 'Agarre estrecho remo alternado sentado en máquina de palanca';

UPDATE "ExerciseCoach" SET "name" = 'Remo con agarre estrecho sentado en máquina', "searchName" = CASE WHEN "searchName" LIKE 'agarre estrecho remo sentado en maquina de palanca%' THEN 'remo con agarre estrecho sentado en maquina' || substr( "searchName", 51 ) ELSE "searchName" END
WHERE "name" = 'Agarre estrecho remo sentado en máquina de palanca' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0588' );
UPDATE "ExerciseGlobal" SET "name" = 'Remo con agarre estrecho sentado en máquina', "searchName" = CASE WHEN "searchName" LIKE 'agarre estrecho remo sentado en maquina de palanca%' THEN 'remo con agarre estrecho sentado en maquina' || substr( "searchName", 51 ) ELSE "searchName" END
WHERE "externalId" = '0588' AND "name" = 'Agarre estrecho remo sentado en máquina de palanca';

UPDATE "ExerciseCoach" SET "name" = 'Curl de bíceps con agarre inverso con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'agarre inverso curl de biceps con mancuerna%' THEN 'curl de biceps con agarre inverso con mancuerna' || substr( "searchName", 44 ) ELSE "searchName" END
WHERE "name" = 'Agarre inverso curl de bíceps con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0382' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl de bíceps con agarre inverso con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'agarre inverso curl de biceps con mancuerna%' THEN 'curl de biceps con agarre inverso con mancuerna' || substr( "searchName", 44 ) ELSE "searchName" END
WHERE "externalId" = '0382' AND "name" = 'Agarre inverso curl de bíceps con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Curl de concentración con agarre inverso sentado con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'agarre inverso curl de concentracion sentado con mancuerna%' THEN 'curl de concentracion con agarre inverso sentado con mancuerna' || substr( "searchName", 59 ) ELSE "searchName" END
WHERE "name" = 'Agarre inverso curl de concentración sentado con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0403' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl de concentración con agarre inverso sentado con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'agarre inverso curl de concentracion sentado con mancuerna%' THEN 'curl de concentracion con agarre inverso sentado con mancuerna' || substr( "searchName", 59 ) ELSE "searchName" END
WHERE "externalId" = '0403' AND "name" = 'Agarre inverso curl de concentración sentado con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Curl con agarre inverso de pie con barra', "searchName" = CASE WHEN "searchName" LIKE 'agarre inverso curl de pie con barra%' THEN 'curl con agarre inverso de pie con barra' || substr( "searchName", 37 ) ELSE "searchName" END
WHERE "name" = 'Agarre inverso curl de pie con barra' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0110' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl con agarre inverso de pie con barra', "searchName" = CASE WHEN "searchName" LIKE 'agarre inverso curl de pie con barra%' THEN 'curl con agarre inverso de pie con barra' || substr( "searchName", 37 ) ELSE "searchName" END
WHERE "externalId" = '0110' AND "name" = 'Agarre inverso curl de pie con barra';

UPDATE "ExerciseCoach" SET "name" = 'Curl en banco Scott con agarre inverso en máquina', "searchName" = CASE WHEN "searchName" LIKE 'agarre inverso curl predicador en maquina de palanca%' THEN 'curl en banco scott con agarre inverso en maquina' || substr( "searchName", 53 ) ELSE "searchName" END
WHERE "name" = 'Agarre inverso curl predicador en máquina de palanca' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1616' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl en banco Scott con agarre inverso en máquina', "searchName" = CASE WHEN "searchName" LIKE 'agarre inverso curl predicador en maquina de palanca%' THEN 'curl en banco scott con agarre inverso en maquina' || substr( "searchName", 53 ) ELSE "searchName" END
WHERE "externalId" = '1616' AND "name" = 'Agarre inverso curl predicador en máquina de palanca';

UPDATE "ExerciseCoach" SET "name" = 'Dominada con agarre inverso', "searchName" = CASE WHEN "searchName" LIKE 'agarre inverso dominada%' THEN 'dominada con agarre inverso' || substr( "searchName", 24 ) ELSE "searchName" END
WHERE "name" = 'Agarre inverso dominada' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0674' );
UPDATE "ExerciseGlobal" SET "name" = 'Dominada con agarre inverso', "searchName" = CASE WHEN "searchName" LIKE 'agarre inverso dominada%' THEN 'dominada con agarre inverso' || substr( "searchName", 24 ) ELSE "searchName" END
WHERE "externalId" = '0674' AND "name" = 'Agarre inverso dominada';

UPDATE "ExerciseCoach" SET "name" = 'Extensión de tríceps hacia abajo con agarre inverso (barra SZ) (con arm blaster) en polea', "searchName" = CASE WHEN "searchName" LIKE 'agarre inverso empuje de triceps hacia abajo (barra sz) (con arm blaster) en polea%' THEN 'extension de triceps hacia abajo con agarre inverso (barra sz) (con arm blaster) en polea' || substr( "searchName", 83 ) ELSE "searchName" END
WHERE "name" = 'Agarre inverso empuje de tríceps hacia abajo (barra SZ) (con arm blaster) en polea' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '2406' );
UPDATE "ExerciseGlobal" SET "name" = 'Extensión de tríceps hacia abajo con agarre inverso (barra SZ) (con arm blaster) en polea', "searchName" = CASE WHEN "searchName" LIKE 'agarre inverso empuje de triceps hacia abajo (barra sz) (con arm blaster) en polea%' THEN 'extension de triceps hacia abajo con agarre inverso (barra sz) (con arm blaster) en polea' || substr( "searchName", 83 ) ELSE "searchName" END
WHERE "externalId" = '2406' AND "name" = 'Agarre inverso empuje de tríceps hacia abajo (barra SZ) (con arm blaster) en polea';

UPDATE "ExerciseCoach" SET "name" = 'Extensión de tríceps hacia abajo con agarre inverso en polea', "searchName" = CASE WHEN "searchName" LIKE 'agarre inverso empuje hacia abajo en polea%' THEN 'extension de triceps hacia abajo con agarre inverso en polea' || substr( "searchName", 43 ) ELSE "searchName" END
WHERE "name" = 'Agarre inverso empuje hacia abajo en polea' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0207' );
UPDATE "ExerciseGlobal" SET "name" = 'Extensión de tríceps hacia abajo con agarre inverso en polea', "searchName" = CASE WHEN "searchName" LIKE 'agarre inverso empuje hacia abajo en polea%' THEN 'extension de triceps hacia abajo con agarre inverso en polea' || substr( "searchName", 43 ) ELSE "searchName" END
WHERE "externalId" = '0207' AND "name" = 'Agarre inverso empuje hacia abajo en polea';

UPDATE "ExerciseCoach" SET "name" = 'Remo alto sentado con espalda recta y agarre inverso en polea', "searchName" = CASE WHEN "searchName" LIKE 'agarre inverso espalda recta sentado remo alto en polea%' THEN 'remo alto sentado con espalda recta y agarre inverso en polea' || substr( "searchName", 56 ) ELSE "searchName" END
WHERE "name" = 'Agarre inverso espalda recta sentado remo alto en polea' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0208' );
UPDATE "ExerciseGlobal" SET "name" = 'Remo alto sentado con espalda recta y agarre inverso en polea', "searchName" = CASE WHEN "searchName" LIKE 'agarre inverso espalda recta sentado remo alto en polea%' THEN 'remo alto sentado con espalda recta y agarre inverso en polea' || substr( "searchName", 56 ) ELSE "searchName" END
WHERE "externalId" = '0208' AND "name" = 'Agarre inverso espalda recta sentado remo alto en polea';

UPDATE "ExerciseCoach" SET "name" = 'Flexión de brazos con agarre inverso inclinado', "searchName" = CASE WHEN "searchName" LIKE 'agarre inverso flexion inclinado%' THEN 'flexion de brazos con agarre inverso inclinado' || substr( "searchName", 33 ) ELSE "searchName" END
WHERE "name" = 'Agarre inverso flexión inclinado' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0494' );
UPDATE "ExerciseGlobal" SET "name" = 'Flexión de brazos con agarre inverso inclinado', "searchName" = CASE WHEN "searchName" LIKE 'agarre inverso flexion inclinado%' THEN 'flexion de brazos con agarre inverso inclinado' || substr( "searchName", 33 ) ELSE "searchName" END
WHERE "externalId" = '0494' AND "name" = 'Agarre inverso flexión inclinado';

UPDATE "ExerciseCoach" SET "name" = 'Jalón lateral con agarre inverso en máquina', "searchName" = CASE WHEN "searchName" LIKE 'agarre inverso lateral jalon en maquina de palanca%' THEN 'jalon lateral con agarre inverso en maquina' || substr( "searchName", 51 ) ELSE "searchName" END
WHERE "name" = 'Agarre inverso lateral jalón en máquina de palanca' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '2736' );
UPDATE "ExerciseGlobal" SET "name" = 'Jalón lateral con agarre inverso en máquina', "searchName" = CASE WHEN "searchName" LIKE 'agarre inverso lateral jalon en maquina de palanca%' THEN 'jalon lateral con agarre inverso en maquina' || substr( "searchName", 51 ) ELSE "searchName" END
WHERE "externalId" = '2736' AND "name" = 'Agarre inverso lateral jalón en máquina de palanca';

UPDATE "ExerciseCoach" SET "name" = 'Remo con agarre inverso con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'agarre inverso remo con mancuerna%' THEN 'remo con agarre inverso con mancuerna' || substr( "searchName", 34 ) ELSE "searchName" END
WHERE "name" = 'Agarre inverso remo con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '2327' );
UPDATE "ExerciseGlobal" SET "name" = 'Remo con agarre inverso con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'agarre inverso remo con mancuerna%' THEN 'remo con agarre inverso con mancuerna' || substr( "searchName", 34 ) ELSE "searchName" END
WHERE "externalId" = '2327' AND "name" = 'Agarre inverso remo con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Remo vertical con agarre inverso en máquina', "searchName" = CASE WHEN "searchName" LIKE 'agarre inverso vertical remo en maquina de palanca%' THEN 'remo vertical con agarre inverso en maquina' || substr( "searchName", 51 ) ELSE "searchName" END
WHERE "name" = 'Agarre inverso vertical remo en máquina de palanca' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1348' );
UPDATE "ExerciseGlobal" SET "name" = 'Remo vertical con agarre inverso en máquina', "searchName" = CASE WHEN "searchName" LIKE 'agarre inverso vertical remo en maquina de palanca%' THEN 'remo vertical con agarre inverso en maquina' || substr( "searchName", 51 ) ELSE "searchName" END
WHERE "externalId" = '1348' AND "name" = 'Agarre inverso vertical remo en máquina de palanca';

UPDATE "ExerciseCoach" SET "name" = 'Curl en banco Scott con agarre martillo en máquina', "searchName" = CASE WHEN "searchName" LIKE 'agarre martillo curl predicador en maquina de palanca%' THEN 'curl en banco scott con agarre martillo en maquina' || substr( "searchName", 54 ) ELSE "searchName" END
WHERE "name" = 'Agarre martillo curl predicador en máquina de palanca' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1615' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl en banco Scott con agarre martillo en máquina', "searchName" = CASE WHEN "searchName" LIKE 'agarre martillo curl predicador en maquina de palanca%' THEN 'curl en banco scott con agarre martillo en maquina' || substr( "searchName", 54 ) ELSE "searchName" END
WHERE "externalId" = '1615' AND "name" = 'Agarre martillo curl predicador en máquina de palanca';

UPDATE "ExerciseCoach" SET "name" = 'Dominada supina con agarre mixto', "searchName" = CASE WHEN "searchName" LIKE 'agarre mixto dominada supina%' THEN 'dominada supina con agarre mixto' || substr( "searchName", 29 ) ELSE "searchName" END
WHERE "name" = 'Agarre mixto dominada supina' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0627' );
UPDATE "ExerciseGlobal" SET "name" = 'Dominada supina con agarre mixto', "searchName" = CASE WHEN "searchName" LIKE 'agarre mixto dominada supina%' THEN 'dominada supina con agarre mixto' || substr( "searchName", 29 ) ELSE "searchName" END
WHERE "externalId" = '0627' AND "name" = 'Agarre mixto dominada supina';

UPDATE "ExerciseCoach" SET "name" = 'Press de banca con agarre neutro con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'agarre neutro press de banca con mancuerna%' THEN 'press de banca con agarre neutro con mancuerna' || substr( "searchName", 43 ) ELSE "searchName" END
WHERE "name" = 'Agarre neutro press de banca con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0352' );
UPDATE "ExerciseGlobal" SET "name" = 'Press de banca con agarre neutro con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'agarre neutro press de banca con mancuerna%' THEN 'press de banca con agarre neutro con mancuerna' || substr( "searchName", 43 ) ELSE "searchName" END
WHERE "externalId" = '0352' AND "name" = 'Agarre neutro press de banca con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Extensión de tríceps con agarre prono con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'agarre prono extension de triceps con mancuerna%' THEN 'extension de triceps con agarre prono con mancuerna' || substr( "searchName", 48 ) ELSE "searchName" END
WHERE "name" = 'Agarre prono extensión de tríceps con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0373' );
UPDATE "ExerciseGlobal" SET "name" = 'Extensión de tríceps con agarre prono con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'agarre prono extension de triceps con mancuerna%' THEN 'extension de triceps con agarre prono con mancuerna' || substr( "searchName", 48 ) ELSE "searchName" END
WHERE "externalId" = '0373' AND "name" = 'Agarre prono extensión de tríceps con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Apertura inversa (agarre en paralelas) sentado en máquina', "searchName" = CASE WHEN "searchName" LIKE 'apertura inversa (agarre en paralelas) sentado en maquina de palanca%' THEN 'apertura inversa (agarre en paralelas) sentado en maquina' || substr( "searchName", 69 ) ELSE "searchName" END
WHERE "name" = 'Apertura inversa (agarre en paralelas) sentado en máquina de palanca' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0601' );
UPDATE "ExerciseGlobal" SET "name" = 'Apertura inversa (agarre en paralelas) sentado en máquina', "searchName" = CASE WHEN "searchName" LIKE 'apertura inversa (agarre en paralelas) sentado en maquina de palanca%' THEN 'apertura inversa (agarre en paralelas) sentado en maquina' || substr( "searchName", 69 ) ELSE "searchName" END
WHERE "externalId" = '0601' AND "name" = 'Apertura inversa (agarre en paralelas) sentado en máquina de palanca';

UPDATE "ExerciseCoach" SET "name" = 'Apertura inversa sentado en máquina', "searchName" = CASE WHEN "searchName" LIKE 'apertura inversa sentado en maquina de palanca%' THEN 'apertura inversa sentado en maquina' || substr( "searchName", 47 ) ELSE "searchName" END
WHERE "name" = 'Apertura inversa sentado en máquina de palanca' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0602' );
UPDATE "ExerciseGlobal" SET "name" = 'Apertura inversa sentado en máquina', "searchName" = CASE WHEN "searchName" LIKE 'apertura inversa sentado en maquina de palanca%' THEN 'apertura inversa sentado en maquina' || substr( "searchName", 47 ) ELSE "searchName" END
WHERE "externalId" = '0602' AND "name" = 'Apertura inversa sentado en máquina de palanca';

UPDATE "ExerciseCoach" SET "name" = 'Apertura sentado en máquina', "searchName" = CASE WHEN "searchName" LIKE 'apertura sentado en maquina de palanca%' THEN 'apertura sentado en maquina' || substr( "searchName", 39 ) ELSE "searchName" END
WHERE "name" = 'Apertura sentado en máquina de palanca' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0596' );
UPDATE "ExerciseGlobal" SET "name" = 'Apertura sentado en máquina', "searchName" = CASE WHEN "searchName" LIKE 'apertura sentado en maquina de palanca%' THEN 'apertura sentado en maquina' || substr( "searchName", 39 ) ELSE "searchName" END
WHERE "externalId" = '0596' AND "name" = 'Apertura sentado en máquina de palanca';

UPDATE "ExerciseCoach" SET "name" = 'Apretón de manos en máquina', "searchName" = CASE WHEN "searchName" LIKE 'apreton de manos en maquina de palanca%' THEN 'apreton de manos en maquina' || substr( "searchName", 39 ) ELSE "searchName" END
WHERE "name" = 'Apretón de manos en máquina de palanca' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '2288' );
UPDATE "ExerciseGlobal" SET "name" = 'Apretón de manos en máquina', "searchName" = CASE WHEN "searchName" LIKE 'apreton de manos en maquina de palanca%' THEN 'apreton de manos en maquina' || substr( "searchName", 39 ) ELSE "searchName" END
WHERE "externalId" = '2288' AND "name" = 'Apretón de manos en máquina de palanca';

UPDATE "ExerciseCoach" SET "name" = 'Apertura a una pierna sobre pelota suiza con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'a una pierna apertura sobre pelota suiza con mancuerna%' THEN 'apertura a una pierna sobre pelota suiza con mancuerna' || substr( "searchName", 55 ) ELSE "searchName" END
WHERE "name" = 'A una pierna apertura sobre pelota suiza con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1292' );
UPDATE "ExerciseGlobal" SET "name" = 'Apertura a una pierna sobre pelota suiza con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'a una pierna apertura sobre pelota suiza con mancuerna%' THEN 'apertura a una pierna sobre pelota suiza con mancuerna' || substr( "searchName", 55 ) ELSE "searchName" END
WHERE "externalId" = '1292' AND "name" = 'A una pierna apertura sobre pelota suiza con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Curl a una pierna acostado en máquina', "searchName" = CASE WHEN "searchName" LIKE 'a una pierna curl acostado en maquina de palanca%' THEN 'curl a una pierna acostado en maquina' || substr( "searchName", 49 ) ELSE "searchName" END
WHERE "name" = 'A una pierna curl acostado en máquina de palanca' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '3195' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl a una pierna acostado en máquina', "searchName" = CASE WHEN "searchName" LIKE 'a una pierna curl acostado en maquina de palanca%' THEN 'curl a una pierna acostado en maquina' || substr( "searchName", 49 ) ELSE "searchName" END
WHERE "externalId" = '3195' AND "name" = 'A una pierna curl acostado en máquina de palanca';

UPDATE "ExerciseCoach" SET "name" = 'Curl a una pierna de pie', "searchName" = CASE WHEN "searchName" LIKE 'a una pierna curl de pie%' THEN 'curl a una pierna de pie' || substr( "searchName", 25 ) ELSE "searchName" END
WHERE "name" = 'A una pierna curl de pie' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0795' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl a una pierna de pie', "searchName" = CASE WHEN "searchName" LIKE 'a una pierna curl de pie%' THEN 'curl a una pierna de pie' || substr( "searchName", 25 ) ELSE "searchName" END
WHERE "externalId" = '0795' AND "name" = 'A una pierna curl de pie';

UPDATE "ExerciseCoach" SET "name" = 'Elevación de talones a una pierna con banda', "searchName" = CASE WHEN "searchName" LIKE 'a una pierna elevacion de talones con banda%' THEN 'elevacion de talones a una pierna con banda' || substr( "searchName", 44 ) ELSE "searchName" END
WHERE "name" = 'A una pierna elevación de talones con banda' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0999' );
UPDATE "ExerciseGlobal" SET "name" = 'Elevación de talones a una pierna con banda', "searchName" = CASE WHEN "searchName" LIKE 'a una pierna elevacion de talones con banda%' THEN 'elevacion de talones a una pierna con banda' || substr( "searchName", 44 ) ELSE "searchName" END
WHERE "externalId" = '0999' AND "name" = 'A una pierna elevación de talones con banda';

UPDATE "ExerciseCoach" SET "name" = 'Elevación de talones a una pierna (con el pie sobre una mancuerna)', "searchName" = CASE WHEN "searchName" LIKE 'a una pierna elevacion de talones (con el pie sobre una mancuerna)%' THEN 'elevacion de talones a una pierna (con el pie sobre una mancuerna)' || substr( "searchName", 67 ) ELSE "searchName" END
WHERE "name" = 'A una pierna elevación de talones (con el pie sobre una mancuerna)' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0727' );
UPDATE "ExerciseGlobal" SET "name" = 'Elevación de talones a una pierna (con el pie sobre una mancuerna)', "searchName" = CASE WHEN "searchName" LIKE 'a una pierna elevacion de talones (con el pie sobre una mancuerna)%' THEN 'elevacion de talones a una pierna (con el pie sobre una mancuerna)' || substr( "searchName", 67 ) ELSE "searchName" END
WHERE "externalId" = '0727' AND "name" = 'A una pierna elevación de talones (con el pie sobre una mancuerna)';

UPDATE "ExerciseCoach" SET "name" = 'Elevación de talones a una pierna con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'a una pierna elevacion de talones con mancuerna%' THEN 'elevacion de talones a una pierna con mancuerna' || substr( "searchName", 48 ) ELSE "searchName" END
WHERE "name" = 'A una pierna elevación de talones con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0409' );
UPDATE "ExerciseGlobal" SET "name" = 'Elevación de talones a una pierna con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'a una pierna elevacion de talones con mancuerna%' THEN 'elevacion de talones a una pierna con mancuerna' || substr( "searchName", 48 ) ELSE "searchName" END
WHERE "externalId" = '0409' AND "name" = 'A una pierna elevación de talones con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Elevación de talones a una pierna de pie en polea', "searchName" = CASE WHEN "searchName" LIKE 'a una pierna elevacion de talones de pie en polea%' THEN 'elevacion de talones a una pierna de pie en polea' || substr( "searchName", 50 ) ELSE "searchName" END
WHERE "name" = 'A una pierna elevación de talones de pie en polea' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1376' );
UPDATE "ExerciseGlobal" SET "name" = 'Elevación de talones a una pierna de pie en polea', "searchName" = CASE WHEN "searchName" LIKE 'a una pierna elevacion de talones de pie en polea%' THEN 'elevacion de talones a una pierna de pie en polea' || substr( "searchName", 50 ) ELSE "searchName" END
WHERE "externalId" = '1376' AND "name" = 'A una pierna elevación de talones de pie en polea';

UPDATE "ExerciseCoach" SET "name" = 'Elevación de talones a una pierna en el piso', "searchName" = CASE WHEN "searchName" LIKE 'a una pierna elevacion de talones en el piso%' THEN 'elevacion de talones a una pierna en el piso' || substr( "searchName", 45 ) ELSE "searchName" END
WHERE "name" = 'A una pierna elevación de talones en el piso' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1387' );
UPDATE "ExerciseGlobal" SET "name" = 'Elevación de talones a una pierna en el piso', "searchName" = CASE WHEN "searchName" LIKE 'a una pierna elevacion de talones en el piso%' THEN 'elevacion de talones a una pierna en el piso' || substr( "searchName", 45 ) ELSE "searchName" END
WHERE "externalId" = '1387' AND "name" = 'A una pierna elevación de talones en el piso';

UPDATE "ExerciseCoach" SET "name" = 'Elevación de talones a una pierna en el piso en máquina Smith', "searchName" = CASE WHEN "searchName" LIKE 'a una pierna elevacion de talones en el piso en maquina smith%' THEN 'elevacion de talones a una pierna en el piso en maquina smith' || substr( "searchName", 62 ) ELSE "searchName" END
WHERE "name" = 'A una pierna elevación de talones en el piso en máquina Smith' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1393' );
UPDATE "ExerciseGlobal" SET "name" = 'Elevación de talones a una pierna en el piso en máquina Smith', "searchName" = CASE WHEN "searchName" LIKE 'a una pierna elevacion de talones en el piso en maquina smith%' THEN 'elevacion de talones a una pierna en el piso en maquina smith' || substr( "searchName", 62 ) ELSE "searchName" END
WHERE "externalId" = '1393' AND "name" = 'A una pierna elevación de talones en el piso en máquina Smith';

UPDATE "ExerciseCoach" SET "name" = 'Elevación de talones a una pierna sentado con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'a una pierna elevacion de talones sentado con mancuerna%' THEN 'elevacion de talones a una pierna sentado con mancuerna' || substr( "searchName", 56 ) ELSE "searchName" END
WHERE "name" = 'A una pierna elevación de talones sentado con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0400' );
UPDATE "ExerciseGlobal" SET "name" = 'Elevación de talones a una pierna sentado con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'a una pierna elevacion de talones sentado con mancuerna%' THEN 'elevacion de talones a una pierna sentado con mancuerna' || substr( "searchName", 56 ) ELSE "searchName" END
WHERE "externalId" = '0400' AND "name" = 'A una pierna elevación de talones sentado con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Elevación de talones a una pierna sentado en máquina Smith', "searchName" = CASE WHEN "searchName" LIKE 'a una pierna elevacion de talones sentado en maquina smith%' THEN 'elevacion de talones a una pierna sentado en maquina smith' || substr( "searchName", 59 ) ELSE "searchName" END
WHERE "name" = 'A una pierna elevación de talones sentado en máquina Smith' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1395' );
UPDATE "ExerciseGlobal" SET "name" = 'Elevación de talones a una pierna sentado en máquina Smith', "searchName" = CASE WHEN "searchName" LIKE 'a una pierna elevacion de talones sentado en maquina smith%' THEN 'elevacion de talones a una pierna sentado en maquina smith' || substr( "searchName", 59 ) ELSE "searchName" END
WHERE "externalId" = '1395' AND "name" = 'A una pierna elevación de talones sentado en máquina Smith';

UPDATE "ExerciseCoach" SET "name" = 'Elevación tibial a una pierna con banda', "searchName" = CASE WHEN "searchName" LIKE 'a una pierna elevacion tibial con banda%' THEN 'elevacion tibial a una pierna con banda' || substr( "searchName", 40 ) ELSE "searchName" END
WHERE "name" = 'A una pierna elevación tibial con banda' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1000' );
UPDATE "ExerciseGlobal" SET "name" = 'Elevación tibial a una pierna con banda', "searchName" = CASE WHEN "searchName" LIKE 'a una pierna elevacion tibial con banda%' THEN 'elevacion tibial a una pierna con banda' || substr( "searchName", 40 ) ELSE "searchName" END
WHERE "externalId" = '1000' AND "name" = 'A una pierna elevación tibial con banda';

UPDATE "ExerciseCoach" SET "name" = 'Peso muerto a una pierna con barra', "searchName" = CASE WHEN "searchName" LIKE 'a una pierna peso muerto con barra%' THEN 'peso muerto a una pierna con barra' || substr( "searchName", 35 ) ELSE "searchName" END
WHERE "name" = 'A una pierna peso muerto con barra' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1756' );
UPDATE "ExerciseGlobal" SET "name" = 'Peso muerto a una pierna con barra', "searchName" = CASE WHEN "searchName" LIKE 'a una pierna peso muerto con barra%' THEN 'peso muerto a una pierna con barra' || substr( "searchName", 35 ) ELSE "searchName" END
WHERE "externalId" = '1756' AND "name" = 'A una pierna peso muerto con barra';

UPDATE "ExerciseCoach" SET "name" = 'Peso muerto a una pierna con cajón de apoyo con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'a una pierna peso muerto con cajon de apoyo con mancuerna%' THEN 'peso muerto a una pierna con cajon de apoyo con mancuerna' || substr( "searchName", 58 ) ELSE "searchName" END
WHERE "name" = 'A una pierna peso muerto con cajón de apoyo con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '2805' );
UPDATE "ExerciseGlobal" SET "name" = 'Peso muerto a una pierna con cajón de apoyo con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'a una pierna peso muerto con cajon de apoyo con mancuerna%' THEN 'peso muerto a una pierna con cajon de apoyo con mancuerna' || substr( "searchName", 58 ) ELSE "searchName" END
WHERE "externalId" = '2805' AND "name" = 'A una pierna peso muerto con cajón de apoyo con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Peso muerto a una pierna con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'a una pierna peso muerto con mancuerna%' THEN 'peso muerto a una pierna con mancuerna' || substr( "searchName", 39 ) ELSE "searchName" END
WHERE "name" = 'A una pierna peso muerto con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1757' );
UPDATE "ExerciseGlobal" SET "name" = 'Peso muerto a una pierna con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'a una pierna peso muerto con mancuerna%' THEN 'peso muerto a una pierna con mancuerna' || substr( "searchName", 39 ) ELSE "searchName" END
WHERE "externalId" = '1757' AND "name" = 'A una pierna peso muerto con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Prensa de gemelos a una pierna sobre prensa de piernas', "searchName" = CASE WHEN "searchName" LIKE 'a una pierna prensa de gemelos sobre prensa de piernas con trineo%' THEN 'prensa de gemelos a una pierna sobre prensa de piernas' || substr( "searchName", 66 ) ELSE "searchName" END
WHERE "name" = 'A una pierna prensa de gemelos sobre prensa de piernas con trineo' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1392' );
UPDATE "ExerciseGlobal" SET "name" = 'Prensa de gemelos a una pierna sobre prensa de piernas', "searchName" = CASE WHEN "searchName" LIKE 'a una pierna prensa de gemelos sobre prensa de piernas con trineo%' THEN 'prensa de gemelos a una pierna sobre prensa de piernas' || substr( "searchName", 66 ) ELSE "searchName" END
WHERE "externalId" = '1392' AND "name" = 'A una pierna prensa de gemelos sobre prensa de piernas con trineo';

UPDATE "ExerciseCoach" SET "name" = 'Sentadilla a una pierna', "searchName" = CASE WHEN "searchName" LIKE 'a una pierna sentadilla%' THEN 'sentadilla a una pierna' || substr( "searchName", 24 ) ELSE "searchName" END
WHERE "name" = 'A una pierna sentadilla' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1476' );
UPDATE "ExerciseGlobal" SET "name" = 'Sentadilla a una pierna', "searchName" = CASE WHEN "searchName" LIKE 'a una pierna sentadilla%' THEN 'sentadilla a una pierna' || substr( "searchName", 24 ) ELSE "searchName" END
WHERE "externalId" = '1476' AND "name" = 'A una pierna sentadilla';

UPDATE "ExerciseCoach" SET "name" = 'Sentadilla a una pierna con barra', "searchName" = CASE WHEN "searchName" LIKE 'a una pierna sentadilla con barra%' THEN 'sentadilla a una pierna con barra' || substr( "searchName", 34 ) ELSE "searchName" END
WHERE "name" = 'A una pierna sentadilla con barra' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0068' );
UPDATE "ExerciseGlobal" SET "name" = 'Sentadilla a una pierna con barra', "searchName" = CASE WHEN "searchName" LIKE 'a una pierna sentadilla con barra%' THEN 'sentadilla a una pierna con barra' || substr( "searchName", 34 ) ELSE "searchName" END
WHERE "externalId" = '0068' AND "name" = 'A una pierna sentadilla con barra';

UPDATE "ExerciseCoach" SET "name" = 'Sentadilla a una pierna con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'a una pierna sentadilla con mancuerna%' THEN 'sentadilla a una pierna con mancuerna' || substr( "searchName", 38 ) ELSE "searchName" END
WHERE "name" = 'A una pierna sentadilla con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0411' );
UPDATE "ExerciseGlobal" SET "name" = 'Sentadilla a una pierna con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'a una pierna sentadilla con mancuerna%' THEN 'sentadilla a una pierna con mancuerna' || substr( "searchName", 38 ) ELSE "searchName" END
WHERE "externalId" = '0411' AND "name" = 'A una pierna sentadilla con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Sentadilla dividida a una pierna a una mano con banda', "searchName" = CASE WHEN "searchName" LIKE 'a una pierna sentadilla dividida a una mano con banda%' THEN 'sentadilla dividida a una pierna a una mano con banda' || substr( "searchName", 54 ) ELSE "searchName" END
WHERE "name" = 'A una pierna sentadilla dividida a una mano con banda' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0987' );
UPDATE "ExerciseGlobal" SET "name" = 'Sentadilla dividida a una pierna a una mano con banda', "searchName" = CASE WHEN "searchName" LIKE 'a una pierna sentadilla dividida a una mano con banda%' THEN 'sentadilla dividida a una pierna a una mano con banda' || substr( "searchName", 54 ) ELSE "searchName" END
WHERE "externalId" = '0987' AND "name" = 'A una pierna sentadilla dividida a una mano con banda';

UPDATE "ExerciseCoach" SET "name" = 'Sentadilla dividida a una pierna con banda', "searchName" = CASE WHEN "searchName" LIKE 'a una pierna sentadilla dividida con banda%' THEN 'sentadilla dividida a una pierna con banda' || substr( "searchName", 43 ) ELSE "searchName" END
WHERE "name" = 'A una pierna sentadilla dividida con banda' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1001' );
UPDATE "ExerciseGlobal" SET "name" = 'Sentadilla dividida a una pierna con banda', "searchName" = CASE WHEN "searchName" LIKE 'a una pierna sentadilla dividida con banda%' THEN 'sentadilla dividida a una pierna con banda' || substr( "searchName", 43 ) ELSE "searchName" END
WHERE "externalId" = '1001' AND "name" = 'A una pierna sentadilla dividida con banda';

UPDATE "ExerciseCoach" SET "name" = 'Sentadilla dividida a una pierna con barra', "searchName" = CASE WHEN "searchName" LIKE 'a una pierna sentadilla dividida con barra%' THEN 'sentadilla dividida a una pierna con barra' || substr( "searchName", 43 ) ELSE "searchName" END
WHERE "name" = 'A una pierna sentadilla dividida con barra' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0099' );
UPDATE "ExerciseGlobal" SET "name" = 'Sentadilla dividida a una pierna con barra', "searchName" = CASE WHEN "searchName" LIKE 'a una pierna sentadilla dividida con barra%' THEN 'sentadilla dividida a una pierna con barra' || substr( "searchName", 43 ) ELSE "searchName" END
WHERE "externalId" = '0099' AND "name" = 'A una pierna sentadilla dividida con barra';

UPDATE "ExerciseCoach" SET "name" = 'Sentadilla dividida a una pierna con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'a una pierna sentadilla dividida con mancuerna%' THEN 'sentadilla dividida a una pierna con mancuerna' || substr( "searchName", 47 ) ELSE "searchName" END
WHERE "name" = 'A una pierna sentadilla dividida con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0410' );
UPDATE "ExerciseGlobal" SET "name" = 'Sentadilla dividida a una pierna con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'a una pierna sentadilla dividida con mancuerna%' THEN 'sentadilla dividida a una pierna con mancuerna' || substr( "searchName", 47 ) ELSE "searchName" END
WHERE "externalId" = '0410' AND "name" = 'A una pierna sentadilla dividida con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Sentadilla dividida a una pierna en máquina Smith', "searchName" = CASE WHEN "searchName" LIKE 'a una pierna sentadilla dividida en maquina smith%' THEN 'sentadilla dividida a una pierna en maquina smith' || substr( "searchName", 50 ) ELSE "searchName" END
WHERE "name" = 'A una pierna sentadilla dividida en máquina Smith' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0768' );
UPDATE "ExerciseGlobal" SET "name" = 'Sentadilla dividida a una pierna en máquina Smith', "searchName" = CASE WHEN "searchName" LIKE 'a una pierna sentadilla dividida en maquina smith%' THEN 'sentadilla dividida a una pierna en maquina smith' || substr( "searchName", 50 ) ELSE "searchName" END
WHERE "externalId" = '0768' AND "name" = 'A una pierna sentadilla dividida en máquina Smith';

UPDATE "ExerciseCoach" SET "name" = 'Sentadilla a una pierna (pistol)', "searchName" = CASE WHEN "searchName" LIKE 'a una pierna sentadilla (pistol) male%' THEN 'sentadilla a una pierna (pistol)' || substr( "searchName", 38 ) ELSE "searchName" END
WHERE "name" = 'A una pierna sentadilla (pistol) male' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1759' );
UPDATE "ExerciseGlobal" SET "name" = 'Sentadilla a una pierna (pistol)', "searchName" = CASE WHEN "searchName" LIKE 'a una pierna sentadilla (pistol) male%' THEN 'sentadilla a una pierna (pistol)' || substr( "searchName", 38 ) ELSE "searchName" END
WHERE "externalId" = '1759' AND "name" = 'A una pierna sentadilla (pistol) male';

UPDATE "ExerciseCoach" SET "name" = 'Flexión de brazos a una mano', "searchName" = CASE WHEN "searchName" LIKE 'a un brazo flexion%' THEN 'flexion de brazos a una mano' || substr( "searchName", 19 ) ELSE "searchName" END
WHERE "name" = 'A un brazo flexión' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0725' );
UPDATE "ExerciseGlobal" SET "name" = 'Flexión de brazos a una mano', "searchName" = CASE WHEN "searchName" LIKE 'a un brazo flexion%' THEN 'flexion de brazos a una mano' || substr( "searchName", 19 ) ELSE "searchName" END
WHERE "externalId" = '0725' AND "name" = 'A un brazo flexión';

UPDATE "ExerciseCoach" SET "name" = 'Bicicleta fija v. 3', "searchName" = CASE WHEN "searchName" LIKE 'bici estatica v. 3%' THEN 'bicicleta fija v. 3' || substr( "searchName", 19 ) ELSE "searchName" END
WHERE "name" = 'Bici estática v. 3' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '2138' );
UPDATE "ExerciseGlobal" SET "name" = 'Bicicleta fija v. 3', "searchName" = CASE WHEN "searchName" LIKE 'bici estatica v. 3%' THEN 'bicicleta fija v. 3' || substr( "searchName", 19 ) ELSE "searchName" END
WHERE "externalId" = '2138' AND "name" = 'Bici estática v. 3';

UPDATE "ExerciseCoach" SET "name" = 'Pullover con brazos flexionados acostado con barra EZ', "searchName" = CASE WHEN "searchName" LIKE 'brazos flexionados pullover acostado con barra ez%' THEN 'pullover con brazos flexionados acostado con barra ez' || substr( "searchName", 50 ) ELSE "searchName" END
WHERE "name" = 'Brazos flexionados pullover acostado con barra EZ' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '3010' );
UPDATE "ExerciseGlobal" SET "name" = 'Pullover con brazos flexionados acostado con barra EZ', "searchName" = CASE WHEN "searchName" LIKE 'brazos flexionados pullover acostado con barra ez%' THEN 'pullover con brazos flexionados acostado con barra ez' || substr( "searchName", 50 ) ELSE "searchName" END
WHERE "externalId" = '3010' AND "name" = 'Brazos flexionados pullover acostado con barra EZ';

UPDATE "ExerciseCoach" SET "name" = 'Jalón con brazos rectos con cuerda en polea', "searchName" = CASE WHEN "searchName" LIKE 'brazos rectos jalon con cuerda en polea%' THEN 'jalon con brazos rectos con cuerda en polea' || substr( "searchName", 40 ) ELSE "searchName" END
WHERE "name" = 'Brazos rectos jalón con cuerda en polea' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0237' );
UPDATE "ExerciseGlobal" SET "name" = 'Jalón con brazos rectos con cuerda en polea', "searchName" = CASE WHEN "searchName" LIKE 'brazos rectos jalon con cuerda en polea%' THEN 'jalon con brazos rectos con cuerda en polea' || substr( "searchName", 40 ) ELSE "searchName" END
WHERE "externalId" = '0237' AND "name" = 'Brazos rectos jalón con cuerda en polea';

UPDATE "ExerciseCoach" SET "name" = 'Jalón con brazos rectos en polea', "searchName" = CASE WHEN "searchName" LIKE 'brazos rectos jalon en polea%' THEN 'jalon con brazos rectos en polea' || substr( "searchName", 29 ) ELSE "searchName" END
WHERE "name" = 'Brazos rectos jalón en polea' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0238' );
UPDATE "ExerciseGlobal" SET "name" = 'Jalón con brazos rectos en polea', "searchName" = CASE WHEN "searchName" LIKE 'brazos rectos jalon en polea%' THEN 'jalon con brazos rectos en polea' || substr( "searchName", 29 ) ELSE "searchName" END
WHERE "externalId" = '0238' AND "name" = 'Brazos rectos jalón en polea';

UPDATE "ExerciseCoach" SET "name" = 'Pullover con brazos rectos con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'brazos rectos pullover con mancuerna%' THEN 'pullover con brazos rectos con mancuerna' || substr( "searchName", 37 ) ELSE "searchName" END
WHERE "name" = 'Brazos rectos pullover con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0433' );
UPDATE "ExerciseGlobal" SET "name" = 'Pullover con brazos rectos con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'brazos rectos pullover con mancuerna%' THEN 'pullover con brazos rectos con mancuerna' || substr( "searchName", 37 ) ELSE "searchName" END
WHERE "externalId" = '0433' AND "name" = 'Brazos rectos pullover con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Buenos días sentado en máquina', "searchName" = CASE WHEN "searchName" LIKE 'buenos dias sentado en maquina de palanca%' THEN 'buenos dias sentado en maquina' || substr( "searchName", 42 ) ELSE "searchName" END
WHERE "name" = 'Buenos días sentado en máquina de palanca' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '3759' );
UPDATE "ExerciseGlobal" SET "name" = 'Buenos días sentado en máquina', "searchName" = CASE WHEN "searchName" LIKE 'buenos dias sentado en maquina de palanca%' THEN 'buenos dias sentado en maquina' || substr( "searchName", 42 ) ELSE "searchName" END
WHERE "externalId" = '3759' AND "name" = 'Buenos días sentado en máquina de palanca';

UPDATE "ExerciseCoach" SET "name" = 'Caminata en bicicleta fija', "searchName" = CASE WHEN "searchName" LIKE 'caminata en bici estatica%' THEN 'caminata en bicicleta fija' || substr( "searchName", 26 ) ELSE "searchName" END
WHERE "name" = 'Caminata en bici estática' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0798' );
UPDATE "ExerciseGlobal" SET "name" = 'Caminata en bicicleta fija', "searchName" = CASE WHEN "searchName" LIKE 'caminata en bici estatica%' THEN 'caminata en bicicleta fija' || substr( "searchName", 26 ) ELSE "searchName" END
WHERE "externalId" = '0798' AND "name" = 'Caminata en bici estática';

UPDATE "ExerciseCoach" SET "name" = 'Flexión de brazos con aplauso', "searchName" = CASE WHEN "searchName" LIKE 'clap flexion%' THEN 'flexion de brazos con aplauso' || substr( "searchName", 13 ) ELSE "searchName" END
WHERE "name" = 'Clap flexión' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1273' );
UPDATE "ExerciseGlobal" SET "name" = 'Flexión de brazos con aplauso', "searchName" = CASE WHEN "searchName" LIKE 'clap flexion%' THEN 'flexion de brazos con aplauso' || substr( "searchName", 13 ) ELSE "searchName" END
WHERE "externalId" = '1273' AND "name" = 'Clap flexión';

UPDATE "ExerciseCoach" SET "name" = 'Flexión de brazos reloj', "searchName" = CASE WHEN "searchName" LIKE 'clock flexion%' THEN 'flexion de brazos reloj' || substr( "searchName", 14 ) ELSE "searchName" END
WHERE "name" = 'Clock flexión' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0258' );
UPDATE "ExerciseGlobal" SET "name" = 'Flexión de brazos reloj', "searchName" = CASE WHEN "searchName" LIKE 'clock flexion%' THEN 'flexion de brazos reloj' || substr( "searchName", 14 ) ELSE "searchName" END
WHERE "externalId" = '0258' AND "name" = 'Clock flexión';

UPDATE "ExerciseCoach" SET "name" = 'Elevación de piernas colgado', "searchName" = CASE WHEN "searchName" LIKE 'colgado elevacion de piernas%' THEN 'elevacion de piernas colgado' || substr( "searchName", 29 ) ELSE "searchName" END
WHERE "name" = 'Colgado elevación de piernas' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0472' );
UPDATE "ExerciseGlobal" SET "name" = 'Elevación de piernas colgado', "searchName" = CASE WHEN "searchName" LIKE 'colgado elevacion de piernas%' THEN 'elevacion de piernas colgado' || substr( "searchName", 29 ) ELSE "searchName" END
WHERE "externalId" = '0472' AND "name" = 'Colgado elevación de piernas';

UPDATE "ExerciseCoach" SET "name" = 'Elevación de piernas y cadera colgado con peso', "searchName" = CASE WHEN "searchName" LIKE 'colgado elevacion de piernas y cadera con peso%' THEN 'elevacion de piernas y cadera colgado con peso' || substr( "searchName", 47 ) ELSE "searchName" END
WHERE "name" = 'Colgado elevación de piernas y cadera con peso' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0866' );
UPDATE "ExerciseGlobal" SET "name" = 'Elevación de piernas y cadera colgado con peso', "searchName" = CASE WHEN "searchName" LIKE 'colgado elevacion de piernas y cadera con peso%' THEN 'elevacion de piernas y cadera colgado con peso' || substr( "searchName", 47 ) ELSE "searchName" END
WHERE "externalId" = '0866' AND "name" = 'Colgado elevación de piernas y cadera con peso';

UPDATE "ExerciseCoach" SET "name" = 'Crunch sentado en máquina', "searchName" = CASE WHEN "searchName" LIKE 'crunch sentado en maquina de palanca%' THEN 'crunch sentado en maquina' || substr( "searchName", 37 ) ELSE "searchName" END
WHERE "name" = 'Crunch sentado en máquina de palanca' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1452' );
UPDATE "ExerciseGlobal" SET "name" = 'Crunch sentado en máquina', "searchName" = CASE WHEN "searchName" LIKE 'crunch sentado en maquina de palanca%' THEN 'crunch sentado en maquina' || substr( "searchName", 37 ) ELSE "searchName" END
WHERE "externalId" = '1452' AND "name" = 'Crunch sentado en máquina de palanca';

UPDATE "ExerciseCoach" SET "name" = 'Crunch sentado en máquina (variante 2)', "searchName" = CASE WHEN "searchName" LIKE 'crunch sentado en maquina de palanca (variante 2)%' THEN 'crunch sentado en maquina (variante 2)' || substr( "searchName", 50 ) ELSE "searchName" END
WHERE "name" = 'Crunch sentado en máquina de palanca (variante 2)' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0595' );
UPDATE "ExerciseGlobal" SET "name" = 'Crunch sentado en máquina (variante 2)', "searchName" = CASE WHEN "searchName" LIKE 'crunch sentado en maquina de palanca (variante 2)%' THEN 'crunch sentado en maquina (variante 2)' || substr( "searchName", 50 ) ELSE "searchName" END
WHERE "externalId" = '0595' AND "name" = 'Crunch sentado en máquina de palanca (variante 2)';

UPDATE "ExerciseCoach" SET "name" = 'Crunch (variante 2) sentado en máquina', "searchName" = CASE WHEN "searchName" LIKE 'crunch (variante 2) sentado en maquina de palanca%' THEN 'crunch (variante 2) sentado en maquina' || substr( "searchName", 50 ) ELSE "searchName" END
WHERE "name" = 'Crunch (variante 2) sentado en máquina de palanca' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '3760' );
UPDATE "ExerciseGlobal" SET "name" = 'Crunch (variante 2) sentado en máquina', "searchName" = CASE WHEN "searchName" LIKE 'crunch (variante 2) sentado en maquina de palanca%' THEN 'crunch (variante 2) sentado en maquina' || substr( "searchName", 50 ) ELSE "searchName" END
WHERE "externalId" = '3760' AND "name" = 'Crunch (variante 2) sentado en máquina de palanca';

UPDATE "ExerciseCoach" SET "name" = 'Curl de bíceps en máquina', "searchName" = CASE WHEN "searchName" LIKE 'curl de biceps en maquina de palanca%' THEN 'curl de biceps en maquina' || substr( "searchName", 37 ) ELSE "searchName" END
WHERE "name" = 'Curl de bíceps en máquina de palanca' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0575' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl de bíceps en máquina', "searchName" = CASE WHEN "searchName" LIKE 'curl de biceps en maquina de palanca%' THEN 'curl de biceps en maquina' || substr( "searchName", 37 ) ELSE "searchName" END
WHERE "externalId" = '0575' AND "name" = 'Curl de bíceps en máquina de palanca';

UPDATE "ExerciseCoach" SET "name" = 'Curl de bíceps en estocada con movimiento de bolos con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'curl de biceps en zancada con movimiento de bolos con mancuerna%' THEN 'curl de biceps en estocada con movimiento de bolos con mancuerna' || substr( "searchName", 64 ) ELSE "searchName" END
WHERE "name" = 'Curl de bíceps en zancada con movimiento de bolos con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1651' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl de bíceps en estocada con movimiento de bolos con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'curl de biceps en zancada con movimiento de bolos con mancuerna%' THEN 'curl de biceps en estocada con movimiento de bolos con mancuerna' || substr( "searchName", 64 ) ELSE "searchName" END
WHERE "externalId" = '1651' AND "name" = 'Curl de bíceps en zancada con movimiento de bolos con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Curl femoral acostado en máquina', "searchName" = CASE WHEN "searchName" LIKE 'curl femoral acostado en maquina de palanca%' THEN 'curl femoral acostado en maquina' || substr( "searchName", 44 ) ELSE "searchName" END
WHERE "name" = 'Curl femoral acostado en máquina de palanca' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0586' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl femoral acostado en máquina', "searchName" = CASE WHEN "searchName" LIKE 'curl femoral acostado en maquina de palanca%' THEN 'curl femoral acostado en maquina' || substr( "searchName", 44 ) ELSE "searchName" END
WHERE "externalId" = '0586' AND "name" = 'Curl femoral acostado en máquina de palanca';

UPDATE "ExerciseCoach" SET "name" = 'Curl femoral de rodillas en máquina', "searchName" = CASE WHEN "searchName" LIKE 'curl femoral de rodillas en maquina de palanca%' THEN 'curl femoral de rodillas en maquina' || substr( "searchName", 47 ) ELSE "searchName" END
WHERE "name" = 'Curl femoral de rodillas en máquina de palanca' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0582' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl femoral de rodillas en máquina', "searchName" = CASE WHEN "searchName" LIKE 'curl femoral de rodillas en maquina de palanca%' THEN 'curl femoral de rodillas en maquina' || substr( "searchName", 47 ) ELSE "searchName" END
WHERE "externalId" = '0582' AND "name" = 'Curl femoral de rodillas en máquina de palanca';

UPDATE "ExerciseCoach" SET "name" = 'Curl femoral sentado en máquina', "searchName" = CASE WHEN "searchName" LIKE 'curl femoral sentado en maquina de palanca%' THEN 'curl femoral sentado en maquina' || substr( "searchName", 43 ) ELSE "searchName" END
WHERE "name" = 'Curl femoral sentado en máquina de palanca' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0599' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl femoral sentado en máquina', "searchName" = CASE WHEN "searchName" LIKE 'curl femoral sentado en maquina de palanca%' THEN 'curl femoral sentado en maquina' || substr( "searchName", 43 ) ELSE "searchName" END
WHERE "externalId" = '0599' AND "name" = 'Curl femoral sentado en máquina de palanca';

UPDATE "ExerciseCoach" SET "name" = 'Curl inverso en banco Scott a una mano con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'curl inverso predicador a una mano con mancuerna%' THEN 'curl inverso en banco scott a una mano con mancuerna' || substr( "searchName", 49 ) ELSE "searchName" END
WHERE "name" = 'Curl inverso predicador a una mano con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1414' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl inverso en banco Scott a una mano con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'curl inverso predicador a una mano con mancuerna%' THEN 'curl inverso en banco scott a una mano con mancuerna' || substr( "searchName", 49 ) ELSE "searchName" END
WHERE "externalId" = '1414' AND "name" = 'Curl inverso predicador a una mano con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Curl inverso en banco Scott a una mano en polea', "searchName" = CASE WHEN "searchName" LIKE 'curl inverso predicador a una mano en polea%' THEN 'curl inverso en banco scott a una mano en polea' || substr( "searchName", 44 ) ELSE "searchName" END
WHERE "name" = 'Curl inverso predicador a una mano en polea' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1635' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl inverso en banco Scott a una mano en polea', "searchName" = CASE WHEN "searchName" LIKE 'curl inverso predicador a una mano en polea%' THEN 'curl inverso en banco scott a una mano en polea' || substr( "searchName", 44 ) ELSE "searchName" END
WHERE "externalId" = '1635' AND "name" = 'Curl inverso predicador a una mano en polea';

UPDATE "ExerciseCoach" SET "name" = 'Curl inverso en banco Scott con barra', "searchName" = CASE WHEN "searchName" LIKE 'curl inverso predicador con barra%' THEN 'curl inverso en banco scott con barra' || substr( "searchName", 34 ) ELSE "searchName" END
WHERE "name" = 'Curl inverso predicador con barra' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0081' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl inverso en banco Scott con barra', "searchName" = CASE WHEN "searchName" LIKE 'curl inverso predicador con barra%' THEN 'curl inverso en banco scott con barra' || substr( "searchName", 34 ) ELSE "searchName" END
WHERE "externalId" = '0081' AND "name" = 'Curl inverso predicador con barra';

UPDATE "ExerciseCoach" SET "name" = 'Curl inverso en banco Scott con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'curl inverso predicador con mancuerna%' THEN 'curl inverso en banco scott con mancuerna' || substr( "searchName", 38 ) ELSE "searchName" END
WHERE "name" = 'Curl inverso predicador con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0384' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl inverso en banco Scott con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'curl inverso predicador con mancuerna%' THEN 'curl inverso en banco scott con mancuerna' || substr( "searchName", 38 ) ELSE "searchName" END
WHERE "externalId" = '0384' AND "name" = 'Curl inverso predicador con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Curl inverso en banco Scott en polea', "searchName" = CASE WHEN "searchName" LIKE 'curl inverso predicador en polea%' THEN 'curl inverso en banco scott en polea' || substr( "searchName", 33 ) ELSE "searchName" END
WHERE "name" = 'Curl inverso predicador en polea' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0209' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl inverso en banco Scott en polea', "searchName" = CASE WHEN "searchName" LIKE 'curl inverso predicador en polea%' THEN 'curl inverso en banco scott en polea' || substr( "searchName", 33 ) ELSE "searchName" END
WHERE "externalId" = '0209' AND "name" = 'Curl inverso predicador en polea';

UPDATE "ExerciseCoach" SET "name" = 'Curl martillo en banco Scott alternado con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'curl martillo predicador alternado con mancuerna%' THEN 'curl martillo en banco scott alternado con mancuerna' || substr( "searchName", 49 ) ELSE "searchName" END
WHERE "name" = 'Curl martillo predicador alternado con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1646' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl martillo en banco Scott alternado con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'curl martillo predicador alternado con mancuerna%' THEN 'curl martillo en banco scott alternado con mancuerna' || substr( "searchName", 49 ) ELSE "searchName" END
WHERE "externalId" = '1646' AND "name" = 'Curl martillo predicador alternado con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Curl martillo en banco Scott a una mano con cuerda en polea', "searchName" = CASE WHEN "searchName" LIKE 'curl martillo predicador a una mano con cuerda en polea%' THEN 'curl martillo en banco scott a una mano con cuerda en polea' || substr( "searchName", 56 ) ELSE "searchName" END
WHERE "name" = 'Curl martillo predicador a una mano con cuerda en polea' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1640' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl martillo en banco Scott a una mano con cuerda en polea', "searchName" = CASE WHEN "searchName" LIKE 'curl martillo predicador a una mano con cuerda en polea%' THEN 'curl martillo en banco scott a una mano con cuerda en polea' || substr( "searchName", 56 ) ELSE "searchName" END
WHERE "externalId" = '1640' AND "name" = 'Curl martillo predicador a una mano con cuerda en polea';

UPDATE "ExerciseCoach" SET "name" = 'Curl martillo en banco Scott a una mano con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'curl martillo predicador a una mano con mancuerna%' THEN 'curl martillo en banco scott a una mano con mancuerna' || substr( "searchName", 50 ) ELSE "searchName" END
WHERE "name" = 'Curl martillo predicador a una mano con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1663' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl martillo en banco Scott a una mano con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'curl martillo predicador a una mano con mancuerna%' THEN 'curl martillo en banco scott a una mano con mancuerna' || substr( "searchName", 50 ) ELSE "searchName" END
WHERE "externalId" = '1663' AND "name" = 'Curl martillo predicador a una mano con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Curl martillo en banco Scott con cuerda en polea', "searchName" = CASE WHEN "searchName" LIKE 'curl martillo predicador con cuerda en polea%' THEN 'curl martillo en banco scott con cuerda en polea' || substr( "searchName", 45 ) ELSE "searchName" END
WHERE "name" = 'Curl martillo predicador con cuerda en polea' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1639' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl martillo en banco Scott con cuerda en polea', "searchName" = CASE WHEN "searchName" LIKE 'curl martillo predicador con cuerda en polea%' THEN 'curl martillo en banco scott con cuerda en polea' || substr( "searchName", 45 ) ELSE "searchName" END
WHERE "externalId" = '1639' AND "name" = 'Curl martillo predicador con cuerda en polea';

UPDATE "ExerciseCoach" SET "name" = 'Curl en banco Scott acostado con barra', "searchName" = CASE WHEN "searchName" LIKE 'curl predicador acostado con barra%' THEN 'curl en banco scott acostado con barra' || substr( "searchName", 35 ) ELSE "searchName" END
WHERE "name" = 'Curl predicador acostado con barra' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0059' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl en banco Scott acostado con barra', "searchName" = CASE WHEN "searchName" LIKE 'curl predicador acostado con barra%' THEN 'curl en banco scott acostado con barra' || substr( "searchName", 35 ) ELSE "searchName" END
WHERE "externalId" = '0059' AND "name" = 'Curl predicador acostado con barra';

UPDATE "ExerciseCoach" SET "name" = 'Curl en banco Scott agarre cerrado con barra EZ', "searchName" = CASE WHEN "searchName" LIKE 'curl predicador agarre cerrado con barra ez%' THEN 'curl en banco scott agarre cerrado con barra ez' || substr( "searchName", 44 ) ELSE "searchName" END
WHERE "name" = 'Curl predicador agarre cerrado con barra EZ' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1627' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl en banco Scott agarre cerrado con barra EZ', "searchName" = CASE WHEN "searchName" LIKE 'curl predicador agarre cerrado con barra ez%' THEN 'curl en banco scott agarre cerrado con barra ez' || substr( "searchName", 44 ) ELSE "searchName" END
WHERE "externalId" = '1627' AND "name" = 'Curl predicador agarre cerrado con barra EZ';

UPDATE "ExerciseCoach" SET "name" = 'Curl en banco Scott agarre inverso con barra EZ', "searchName" = CASE WHEN "searchName" LIKE 'curl predicador agarre inverso con barra ez%' THEN 'curl en banco scott agarre inverso con barra ez' || substr( "searchName", 44 ) ELSE "searchName" END
WHERE "name" = 'Curl predicador agarre inverso con barra EZ' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0452' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl en banco Scott agarre inverso con barra EZ', "searchName" = CASE WHEN "searchName" LIKE 'curl predicador agarre inverso con barra ez%' THEN 'curl en banco scott agarre inverso con barra ez' || substr( "searchName", 44 ) ELSE "searchName" END
WHERE "externalId" = '0452' AND "name" = 'Curl predicador agarre inverso con barra EZ';

UPDATE "ExerciseCoach" SET "name" = 'Curl en banco Scott alternado con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'curl predicador alternado con mancuerna%' THEN 'curl en banco scott alternado con mancuerna' || substr( "searchName", 40 ) ELSE "searchName" END
WHERE "name" = 'Curl predicador alternado con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1647' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl en banco Scott alternado con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'curl predicador alternado con mancuerna%' THEN 'curl en banco scott alternado con mancuerna' || substr( "searchName", 40 ) ELSE "searchName" END
WHERE "externalId" = '1647' AND "name" = 'Curl predicador alternado con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Curl en banco Scott a una mano en polea', "searchName" = CASE WHEN "searchName" LIKE 'curl predicador a una mano en polea%' THEN 'curl en banco scott a una mano en polea' || substr( "searchName", 36 ) ELSE "searchName" END
WHERE "name" = 'Curl predicador a una mano en polea' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1633' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl en banco Scott a una mano en polea', "searchName" = CASE WHEN "searchName" LIKE 'curl predicador a una mano en polea%' THEN 'curl en banco scott a una mano en polea' || substr( "searchName", 36 ) ELSE "searchName" END
WHERE "externalId" = '1633' AND "name" = 'Curl predicador a una mano en polea';

UPDATE "ExerciseCoach" SET "name" = 'Curl en banco Scott con barra', "searchName" = CASE WHEN "searchName" LIKE 'curl predicador con barra%' THEN 'curl en banco scott con barra' || substr( "searchName", 26 ) ELSE "searchName" END
WHERE "name" = 'Curl predicador con barra' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0070' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl en banco Scott con barra', "searchName" = CASE WHEN "searchName" LIKE 'curl predicador con barra%' THEN 'curl en banco scott con barra' || substr( "searchName", 26 ) ELSE "searchName" END
WHERE "externalId" = '0070' AND "name" = 'Curl predicador con barra';

UPDATE "ExerciseCoach" SET "name" = 'Curl en banco Scott con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'curl predicador con mancuerna%' THEN 'curl en banco scott con mancuerna' || substr( "searchName", 30 ) ELSE "searchName" END
WHERE "name" = 'Curl predicador con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0372' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl en banco Scott con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'curl predicador con mancuerna%' THEN 'curl en banco scott con mancuerna' || substr( "searchName", 30 ) ELSE "searchName" END
WHERE "externalId" = '0372' AND "name" = 'Curl predicador con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Curl en banco Scott de pie con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'curl predicador de pie con mancuerna%' THEN 'curl en banco scott de pie con mancuerna' || substr( "searchName", 37 ) ELSE "searchName" END
WHERE "name" = 'Curl predicador de pie con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0428' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl en banco Scott de pie con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'curl predicador de pie con mancuerna%' THEN 'curl en banco scott de pie con mancuerna' || substr( "searchName", 37 ) ELSE "searchName" END
WHERE "externalId" = '0428' AND "name" = 'Curl predicador de pie con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Curl en banco Scott en máquina', "searchName" = CASE WHEN "searchName" LIKE 'curl predicador en maquina de palanca%' THEN 'curl en banco scott en maquina' || substr( "searchName", 38 ) ELSE "searchName" END
WHERE "name" = 'Curl predicador en máquina de palanca' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0592' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl en banco Scott en máquina', "searchName" = CASE WHEN "searchName" LIKE 'curl predicador en maquina de palanca%' THEN 'curl en banco scott en maquina' || substr( "searchName", 38 ) ELSE "searchName" END
WHERE "externalId" = '0592' AND "name" = 'Curl predicador en máquina de palanca';

UPDATE "ExerciseCoach" SET "name" = 'Curl en banco Scott en polea', "searchName" = CASE WHEN "searchName" LIKE 'curl predicador en polea%' THEN 'curl en banco scott en polea' || substr( "searchName", 25 ) ELSE "searchName" END
WHERE "name" = 'Curl predicador en polea' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0195' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl en banco Scott en polea', "searchName" = CASE WHEN "searchName" LIKE 'curl predicador en polea%' THEN 'curl en banco scott en polea' || substr( "searchName", 25 ) ELSE "searchName" END
WHERE "externalId" = '0195' AND "name" = 'Curl predicador en polea';

UPDATE "ExerciseCoach" SET "name" = 'Curl martillo en banco Scott con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'curl predicador martillo con mancuerna%' THEN 'curl martillo en banco scott con mancuerna' || substr( "searchName", 39 ) ELSE "searchName" END
WHERE "name" = 'Curl predicador martillo con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0370' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl martillo en banco Scott con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'curl predicador martillo con mancuerna%' THEN 'curl martillo en banco scott con mancuerna' || substr( "searchName", 39 ) ELSE "searchName" END
WHERE "externalId" = '0370' AND "name" = 'Curl predicador martillo con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Curl en banco Scott sentado con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'curl predicador sentado con mancuerna%' THEN 'curl en banco scott sentado con mancuerna' || substr( "searchName", 38 ) ELSE "searchName" END
WHERE "name" = 'Curl predicador sentado con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0402' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl en banco Scott sentado con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'curl predicador sentado con mancuerna%' THEN 'curl en banco scott sentado con mancuerna' || substr( "searchName", 38 ) ELSE "searchName" END
WHERE "externalId" = '0402' AND "name" = 'Curl predicador sentado con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Curl en banco Scott sobre pelota suiza con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'curl predicador sobre pelota suiza con mancuerna%' THEN 'curl en banco scott sobre pelota suiza con mancuerna' || substr( "searchName", 49 ) ELSE "searchName" END
WHERE "name" = 'Curl predicador sobre pelota suiza con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1673' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl en banco Scott sobre pelota suiza con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'curl predicador sobre pelota suiza con mancuerna%' THEN 'curl en banco scott sobre pelota suiza con mancuerna' || substr( "searchName", 49 ) ELSE "searchName" END
WHERE "externalId" = '1673' AND "name" = 'Curl predicador sobre pelota suiza con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Curl en banco Scott (variante 2) en máquina', "searchName" = CASE WHEN "searchName" LIKE 'curl predicador (variante 2) en maquina de palanca%' THEN 'curl en banco scott (variante 2) en maquina' || substr( "searchName", 51 ) ELSE "searchName" END
WHERE "name" = 'Curl predicador (variante 2) en máquina de palanca' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1614' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl en banco Scott (variante 2) en máquina', "searchName" = CASE WHEN "searchName" LIKE 'curl predicador (variante 2) en maquina de palanca%' THEN 'curl en banco scott (variante 2) en maquina' || substr( "searchName", 51 ) ELSE "searchName" END
WHERE "externalId" = '1614' AND "name" = 'Curl predicador (variante 2) en máquina de palanca';

UPDATE "ExerciseCoach" SET "name" = 'Curl Zottman en banco Scott a una mano con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'curl zottman predicador a una mano con mancuerna%' THEN 'curl zottman en banco scott a una mano con mancuerna' || substr( "searchName", 49 ) ELSE "searchName" END
WHERE "name" = 'Curl Zottman predicador a una mano con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1672' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl Zottman en banco Scott a una mano con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'curl zottman predicador a una mano con mancuerna%' THEN 'curl zottman en banco scott a una mano con mancuerna' || substr( "searchName", 49 ) ELSE "searchName" END
WHERE "externalId" = '1672' AND "name" = 'Curl Zottman predicador a una mano con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Curl Zottman en banco Scott con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'curl zottman predicador con mancuerna%' THEN 'curl zottman en banco scott con mancuerna' || substr( "searchName", 38 ) ELSE "searchName" END
WHERE "name" = 'Curl Zottman predicador con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '2294' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl Zottman en banco Scott con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'curl zottman predicador con mancuerna%' THEN 'curl zottman en banco scott con mancuerna' || substr( "searchName", 38 ) ELSE "searchName" END
WHERE "externalId" = '2294' AND "name" = 'Curl Zottman predicador con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Curl Zottman en banco Scott de pie con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'curl zottman predicador de pie con mancuerna%' THEN 'curl zottman en banco scott de pie con mancuerna' || substr( "searchName", 45 ) ELSE "searchName" END
WHERE "name" = 'Curl Zottman predicador de pie con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '2293' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl Zottman en banco Scott de pie con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'curl zottman predicador de pie con mancuerna%' THEN 'curl zottman en banco scott de pie con mancuerna' || substr( "searchName", 45 ) ELSE "searchName" END
WHERE "externalId" = '2293' AND "name" = 'Curl Zottman predicador de pie con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Sentadilla curtsey', "searchName" = CASE WHEN "searchName" LIKE 'curtsey sentadilla%' THEN 'sentadilla curtsey' || substr( "searchName", 19 ) ELSE "searchName" END
WHERE "name" = 'Curtsey sentadilla' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '3769' );
UPDATE "ExerciseGlobal" SET "name" = 'Sentadilla curtsey', "searchName" = CASE WHEN "searchName" LIKE 'curtsey sentadilla%' THEN 'sentadilla curtsey' || substr( "searchName", 19 ) ELSE "searchName" END
WHERE "externalId" = '3769' AND "name" = 'Curtsey sentadilla';

UPDATE "ExerciseCoach" SET "name" = 'Elevación de deltoides posterior acostado a una mano con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'deltoides acostado posterior a una mano con mancuerna%' THEN 'elevacion de deltoides posterior acostado a una mano con mancuerna' || substr( "searchName", 54 ) ELSE "searchName" END
WHERE "name" = 'Deltoides acostado posterior a una mano con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0341' );
UPDATE "ExerciseGlobal" SET "name" = 'Elevación de deltoides posterior acostado a una mano con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'deltoides acostado posterior a una mano con mancuerna%' THEN 'elevacion de deltoides posterior acostado a una mano con mancuerna' || substr( "searchName", 54 ) ELSE "searchName" END
WHERE "externalId" = '0341' AND "name" = 'Deltoides acostado posterior a una mano con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Flexión de brazos diamante', "searchName" = CASE WHEN "searchName" LIKE 'diamond flexion%' THEN 'flexion de brazos diamante' || substr( "searchName", 16 ) ELSE "searchName" END
WHERE "name" = 'Diamond flexión' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0283' );
UPDATE "ExerciseGlobal" SET "name" = 'Flexión de brazos diamante', "searchName" = CASE WHEN "searchName" LIKE 'diamond flexion%' THEN 'flexion de brazos diamante' || substr( "searchName", 16 ) ELSE "searchName" END
WHERE "externalId" = '0283' AND "name" = 'Diamond flexión';

UPDATE "ExerciseCoach" SET "name" = 'Dominada con asistencia supina en máquina', "searchName" = CASE WHEN "searchName" LIKE 'dominada con asistencia supina en maquina de palanca%' THEN 'dominada con asistencia supina en maquina' || substr( "searchName", 53 ) ELSE "searchName" END
WHERE "name" = 'Dominada con asistencia supina en máquina de palanca' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0572' );
UPDATE "ExerciseGlobal" SET "name" = 'Dominada con asistencia supina en máquina', "searchName" = CASE WHEN "searchName" LIKE 'dominada con asistencia supina en maquina de palanca%' THEN 'dominada con asistencia supina en maquina' || substr( "searchName", 53 ) ELSE "searchName" END
WHERE "externalId" = '0572' AND "name" = 'Dominada con asistencia supina en máquina de palanca';

UPDATE "ExerciseCoach" SET "name" = 'Elevación de gemelos en prensa de piernas sentado en máquina', "searchName" = CASE WHEN "searchName" LIKE 'elevacion de gemelos en prensa de piernas sentado en maquina de palanca%' THEN 'elevacion de gemelos en prensa de piernas sentado en maquina' || substr( "searchName", 72 ) ELSE "searchName" END
WHERE "name" = 'Elevación de gemelos en prensa de piernas sentado en máquina de palanca' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1385' );
UPDATE "ExerciseGlobal" SET "name" = 'Elevación de gemelos en prensa de piernas sentado en máquina', "searchName" = CASE WHEN "searchName" LIKE 'elevacion de gemelos en prensa de piernas sentado en maquina de palanca%' THEN 'elevacion de gemelos en prensa de piernas sentado en maquina' || substr( "searchName", 72 ) ELSE "searchName" END
WHERE "externalId" = '1385' AND "name" = 'Elevación de gemelos en prensa de piernas sentado en máquina de palanca';

UPDATE "ExerciseCoach" SET "name" = 'Elevación de gemelos estilo burro en máquina', "searchName" = CASE WHEN "searchName" LIKE 'elevacion de gemelos estilo burro en maquina de palanca%' THEN 'elevacion de gemelos estilo burro en maquina' || substr( "searchName", 56 ) ELSE "searchName" END
WHERE "name" = 'Elevación de gemelos estilo burro en máquina de palanca' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1253' );
UPDATE "ExerciseGlobal" SET "name" = 'Elevación de gemelos estilo burro en máquina', "searchName" = CASE WHEN "searchName" LIKE 'elevacion de gemelos estilo burro en maquina de palanca%' THEN 'elevacion de gemelos estilo burro en maquina' || substr( "searchName", 56 ) ELSE "searchName" END
WHERE "externalId" = '1253' AND "name" = 'Elevación de gemelos estilo burro en máquina de palanca';

UPDATE "ExerciseCoach" SET "name" = 'Elevación de gemelos inclinada hacia adelante en máquina', "searchName" = CASE WHEN "searchName" LIKE 'elevacion de gemelos inclinada hacia adelante con trineo%' THEN 'elevacion de gemelos inclinada hacia adelante en maquina' || substr( "searchName", 57 ) ELSE "searchName" END
WHERE "name" = 'Elevación de gemelos inclinada hacia adelante con trineo' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0742' );
UPDATE "ExerciseGlobal" SET "name" = 'Elevación de gemelos inclinada hacia adelante en máquina', "searchName" = CASE WHEN "searchName" LIKE 'elevacion de gemelos inclinada hacia adelante con trineo%' THEN 'elevacion de gemelos inclinada hacia adelante en maquina' || substr( "searchName", 57 ) ELSE "searchName" END
WHERE "externalId" = '0742' AND "name" = 'Elevación de gemelos inclinada hacia adelante con trineo';

UPDATE "ExerciseCoach" SET "name" = 'Elevación de piernas crunch sentado en máquina', "searchName" = CASE WHEN "searchName" LIKE 'elevacion de piernas crunch sentado en maquina de palanca%' THEN 'elevacion de piernas crunch sentado en maquina' || substr( "searchName", 58 ) ELSE "searchName" END
WHERE "name" = 'Elevación de piernas crunch sentado en máquina de palanca' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0600' );
UPDATE "ExerciseGlobal" SET "name" = 'Elevación de piernas crunch sentado en máquina', "searchName" = CASE WHEN "searchName" LIKE 'elevacion de piernas crunch sentado en maquina de palanca%' THEN 'elevacion de piernas crunch sentado en maquina' || substr( "searchName", 58 ) ELSE "searchName" END
WHERE "externalId" = '0600' AND "name" = 'Elevación de piernas crunch sentado en máquina de palanca';

UPDATE "ExerciseCoach" SET "name" = 'Elevación de talones de pie en máquina', "searchName" = CASE WHEN "searchName" LIKE 'elevacion de talones de pie en maquina de palanca%' THEN 'elevacion de talones de pie en maquina' || substr( "searchName", 50 ) ELSE "searchName" END
WHERE "name" = 'Elevación de talones de pie en máquina de palanca' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0605' );
UPDATE "ExerciseGlobal" SET "name" = 'Elevación de talones de pie en máquina', "searchName" = CASE WHEN "searchName" LIKE 'elevacion de talones de pie en maquina de palanca%' THEN 'elevacion de talones de pie en maquina' || substr( "searchName", 50 ) ELSE "searchName" END
WHERE "externalId" = '0605' AND "name" = 'Elevación de talones de pie en máquina de palanca';

UPDATE "ExerciseCoach" SET "name" = 'Elevación de talones sentado en máquina', "searchName" = CASE WHEN "searchName" LIKE 'elevacion de talones sentado en maquina de palanca%' THEN 'elevacion de talones sentado en maquina' || substr( "searchName", 51 ) ELSE "searchName" END
WHERE "name" = 'Elevación de talones sentado en máquina de palanca' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0594' );
UPDATE "ExerciseGlobal" SET "name" = 'Elevación de talones sentado en máquina', "searchName" = CASE WHEN "searchName" LIKE 'elevacion de talones sentado en maquina de palanca%' THEN 'elevacion de talones sentado en maquina' || substr( "searchName", 51 ) ELSE "searchName" END
WHERE "externalId" = '0594' AND "name" = 'Elevación de talones sentado en máquina de palanca';

UPDATE "ExerciseCoach" SET "name" = 'Elevación lateral en máquina', "searchName" = CASE WHEN "searchName" LIKE 'elevacion lateral en maquina de palanca%' THEN 'elevacion lateral en maquina' || substr( "searchName", 40 ) ELSE "searchName" END
WHERE "name" = 'Elevación lateral en máquina de palanca' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0584' );
UPDATE "ExerciseGlobal" SET "name" = 'Elevación lateral en máquina', "searchName" = CASE WHEN "searchName" LIKE 'elevacion lateral en maquina de palanca%' THEN 'elevacion lateral en maquina' || substr( "searchName", 40 ) ELSE "searchName" END
WHERE "externalId" = '0584' AND "name" = 'Elevación lateral en máquina de palanca';

UPDATE "ExerciseCoach" SET "name" = 'Remo elevado sentado con cuerda en polea', "searchName" = CASE WHEN "searchName" LIKE 'elevado remo sentado con cuerda en polea%' THEN 'remo elevado sentado con cuerda en polea' || substr( "searchName", 41 ) ELSE "searchName" END
WHERE "name" = 'Elevado remo sentado con cuerda en polea' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1321' );
UPDATE "ExerciseGlobal" SET "name" = 'Remo elevado sentado con cuerda en polea', "searchName" = CASE WHEN "searchName" LIKE 'elevado remo sentado con cuerda en polea%' THEN 'remo elevado sentado con cuerda en polea' || substr( "searchName", 41 ) ELSE "searchName" END
WHERE "externalId" = '1321' AND "name" = 'Elevado remo sentado con cuerda en polea';

UPDATE "ExerciseCoach" SET "name" = 'Extensión de tríceps hacia abajo (Barra V) (con arm blaster) en polea', "searchName" = CASE WHEN "searchName" LIKE 'empuje de triceps hacia abajo (barra v) (con arm blaster) en polea%' THEN 'extension de triceps hacia abajo (barra v) (con arm blaster) en polea' || substr( "searchName", 67 ) ELSE "searchName" END
WHERE "name" = 'Empuje de tríceps hacia abajo (Barra V) (con arm blaster) en polea' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '2405' );
UPDATE "ExerciseGlobal" SET "name" = 'Extensión de tríceps hacia abajo (Barra V) (con arm blaster) en polea', "searchName" = CASE WHEN "searchName" LIKE 'empuje de triceps hacia abajo (barra v) (con arm blaster) en polea%' THEN 'extension de triceps hacia abajo (barra v) (con arm blaster) en polea' || substr( "searchName", 67 ) ELSE "searchName" END
WHERE "externalId" = '2405' AND "name" = 'Empuje de tríceps hacia abajo (Barra V) (con arm blaster) en polea';

UPDATE "ExerciseCoach" SET "name" = 'Extensión de tríceps hacia abajo (Barra V) en polea', "searchName" = CASE WHEN "searchName" LIKE 'empuje de triceps hacia abajo (barra v) en polea%' THEN 'extension de triceps hacia abajo (barra v) en polea' || substr( "searchName", 49 ) ELSE "searchName" END
WHERE "name" = 'Empuje de tríceps hacia abajo (Barra V) en polea' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0241' );
UPDATE "ExerciseGlobal" SET "name" = 'Extensión de tríceps hacia abajo (Barra V) en polea', "searchName" = CASE WHEN "searchName" LIKE 'empuje de triceps hacia abajo (barra v) en polea%' THEN 'extension de triceps hacia abajo (barra v) en polea' || substr( "searchName", 49 ) ELSE "searchName" END
WHERE "externalId" = '0241' AND "name" = 'Empuje de tríceps hacia abajo (Barra V) en polea';

UPDATE "ExerciseCoach" SET "name" = 'Jalón con brazos rectos (variante 2) en polea', "searchName" = CASE WHEN "searchName" LIKE 'empuje hacia abajo (brazos rectos) (variante 2) en polea%' THEN 'jalon con brazos rectos (variante 2) en polea' || substr( "searchName", 57 ) ELSE "searchName" END
WHERE "name" = 'Empuje hacia abajo (brazos rectos) (variante 2) en polea' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0199' );
UPDATE "ExerciseGlobal" SET "name" = 'Jalón con brazos rectos (variante 2) en polea', "searchName" = CASE WHEN "searchName" LIKE 'empuje hacia abajo (brazos rectos) (variante 2) en polea%' THEN 'jalon con brazos rectos (variante 2) en polea' || substr( "searchName", 57 ) ELSE "searchName" END
WHERE "externalId" = '0199' AND "name" = 'Empuje hacia abajo (brazos rectos) (variante 2) en polea';

UPDATE "ExerciseCoach" SET "name" = 'Extensión de tríceps hacia abajo con cuerda en polea', "searchName" = CASE WHEN "searchName" LIKE 'empuje hacia abajo con cuerda en polea%' THEN 'extension de triceps hacia abajo con cuerda en polea' || substr( "searchName", 39 ) ELSE "searchName" END
WHERE "name" = 'Empuje hacia abajo con cuerda en polea' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0200' );
UPDATE "ExerciseGlobal" SET "name" = 'Extensión de tríceps hacia abajo con cuerda en polea', "searchName" = CASE WHEN "searchName" LIKE 'empuje hacia abajo con cuerda en polea%' THEN 'extension de triceps hacia abajo con cuerda en polea' || substr( "searchName", 39 ) ELSE "searchName" END
WHERE "externalId" = '0200' AND "name" = 'Empuje hacia abajo con cuerda en polea';

UPDATE "ExerciseCoach" SET "name" = 'Extensión de tríceps hacia abajo en polea', "searchName" = CASE WHEN "searchName" LIKE 'empuje hacia abajo en polea%' THEN 'extension de triceps hacia abajo en polea' || substr( "searchName", 28 ) ELSE "searchName" END
WHERE "name" = 'Empuje hacia abajo en polea' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0201' );
UPDATE "ExerciseGlobal" SET "name" = 'Extensión de tríceps hacia abajo en polea', "searchName" = CASE WHEN "searchName" LIKE 'empuje hacia abajo en polea%' THEN 'extension de triceps hacia abajo en polea' || substr( "searchName", 28 ) ELSE "searchName" END
WHERE "externalId" = '0201' AND "name" = 'Empuje hacia abajo en polea';

UPDATE "ExerciseCoach" SET "name" = 'Extensión de tríceps hacia abajo inclinado en polea', "searchName" = CASE WHEN "searchName" LIKE 'empuje hacia abajo inclinado en polea%' THEN 'extension de triceps hacia abajo inclinado en polea' || substr( "searchName", 38 ) ELSE "searchName" END
WHERE "name" = 'Empuje hacia abajo inclinado en polea' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0172' );
UPDATE "ExerciseGlobal" SET "name" = 'Extensión de tríceps hacia abajo inclinado en polea', "searchName" = CASE WHEN "searchName" LIKE 'empuje hacia abajo inclinado en polea%' THEN 'extension de triceps hacia abajo inclinado en polea' || substr( "searchName", 38 ) ELSE "searchName" END
WHERE "externalId" = '0172' AND "name" = 'Empuje hacia abajo inclinado en polea';

UPDATE "ExerciseCoach" SET "name" = 'Encogimiento de hombros en máquina', "searchName" = CASE WHEN "searchName" LIKE 'encogimiento de hombros en maquina de palanca%' THEN 'encogimiento de hombros en maquina' || substr( "searchName", 46 ) ELSE "searchName" END
WHERE "name" = 'Encogimiento de hombros en máquina de palanca' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0604' );
UPDATE "ExerciseGlobal" SET "name" = 'Encogimiento de hombros en máquina', "searchName" = CASE WHEN "searchName" LIKE 'encogimiento de hombros en maquina de palanca%' THEN 'encogimiento de hombros en maquina' || substr( "searchName", 46 ) ELSE "searchName" END
WHERE "externalId" = '0604' AND "name" = 'Encogimiento de hombros en máquina de palanca';

UPDATE "ExerciseCoach" SET "name" = 'Peso muerto con espalda recta con piernas rígidas con banda', "searchName" = CASE WHEN "searchName" LIKE 'espalda recta peso muerto con piernas rigidas con banda%' THEN 'peso muerto con espalda recta con piernas rigidas con banda' || substr( "searchName", 56 ) ELSE "searchName" END
WHERE "name" = 'Espalda recta peso muerto con piernas rígidas con banda' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1023' );
UPDATE "ExerciseGlobal" SET "name" = 'Peso muerto con espalda recta con piernas rígidas con banda', "searchName" = CASE WHEN "searchName" LIKE 'espalda recta peso muerto con piernas rigidas con banda%' THEN 'peso muerto con espalda recta con piernas rigidas con banda' || substr( "searchName", 56 ) ELSE "searchName" END
WHERE "externalId" = '1023' AND "name" = 'Espalda recta peso muerto con piernas rígidas con banda';

UPDATE "ExerciseCoach" SET "name" = 'Remo alto con espalda recta (de rodillas) a una mano en polea', "searchName" = CASE WHEN "searchName" LIKE 'espalda recta remo alto (de rodillas) a una mano en polea%' THEN 'remo alto con espalda recta (de rodillas) a una mano en polea' || substr( "searchName", 58 ) ELSE "searchName" END
WHERE "name" = 'Espalda recta remo alto (de rodillas) a una mano en polea' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0193' );
UPDATE "ExerciseGlobal" SET "name" = 'Remo alto con espalda recta (de rodillas) a una mano en polea', "searchName" = CASE WHEN "searchName" LIKE 'espalda recta remo alto (de rodillas) a una mano en polea%' THEN 'remo alto con espalda recta (de rodillas) a una mano en polea' || substr( "searchName", 58 ) ELSE "searchName" END
WHERE "externalId" = '0193' AND "name" = 'Espalda recta remo alto (de rodillas) a una mano en polea';

UPDATE "ExerciseCoach" SET "name" = 'Remo con espalda recta sentado con banda', "searchName" = CASE WHEN "searchName" LIKE 'espalda recta remo sentado con banda%' THEN 'remo con espalda recta sentado con banda' || substr( "searchName", 37 ) ELSE "searchName" END
WHERE "name" = 'Espalda recta remo sentado con banda' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '3144' );
UPDATE "ExerciseGlobal" SET "name" = 'Remo con espalda recta sentado con banda', "searchName" = CASE WHEN "searchName" LIKE 'espalda recta remo sentado con banda%' THEN 'remo con espalda recta sentado con banda' || substr( "searchName", 37 ) ELSE "searchName" END
WHERE "externalId" = '3144' AND "name" = 'Espalda recta remo sentado con banda';

UPDATE "ExerciseCoach" SET "name" = 'Remo con espalda recta sentado en polea', "searchName" = CASE WHEN "searchName" LIKE 'espalda recta remo sentado en polea%' THEN 'remo con espalda recta sentado en polea' || substr( "searchName", 36 ) ELSE "searchName" END
WHERE "name" = 'Espalda recta remo sentado en polea' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0239' );
UPDATE "ExerciseGlobal" SET "name" = 'Remo con espalda recta sentado en polea', "searchName" = CASE WHEN "searchName" LIKE 'espalda recta remo sentado en polea%' THEN 'remo con espalda recta sentado en polea' || substr( "searchName", 36 ) ELSE "searchName" END
WHERE "externalId" = '0239' AND "name" = 'Espalda recta remo sentado en polea';

UPDATE "ExerciseCoach" SET "name" = 'Estiramiento en estocada con peso', "searchName" = CASE WHEN "searchName" LIKE 'estiramiento zancada con peso%' THEN 'estiramiento en estocada con peso' || substr( "searchName", 30 ) ELSE "searchName" END
WHERE "name" = 'Estiramiento zancada con peso' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '3642' );
UPDATE "ExerciseGlobal" SET "name" = 'Estiramiento en estocada con peso', "searchName" = CASE WHEN "searchName" LIKE 'estiramiento zancada con peso%' THEN 'estiramiento en estocada con peso' || substr( "searchName", 30 ) ELSE "searchName" END
WHERE "externalId" = '3642' AND "name" = 'Estiramiento zancada con peso';

UPDATE "ExerciseCoach" SET "name" = 'Extensión de cadera (variante 2) en máquina', "searchName" = CASE WHEN "searchName" LIKE 'extension de cadera (variante 2) en maquina de palanca%' THEN 'extension de cadera (variante 2) en maquina' || substr( "searchName", 55 ) ELSE "searchName" END
WHERE "name" = 'Extensión de cadera (variante 2) en máquina de palanca' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '2286' );
UPDATE "ExerciseGlobal" SET "name" = 'Extensión de cadera (variante 2) en máquina', "searchName" = CASE WHEN "searchName" LIKE 'extension de cadera (variante 2) en maquina de palanca%' THEN 'extension de cadera (variante 2) en maquina' || substr( "searchName", 55 ) ELSE "searchName" END
WHERE "externalId" = '2286' AND "name" = 'Extensión de cadera (variante 2) en máquina de palanca';

UPDATE "ExerciseCoach" SET "name" = 'Extensión de piernas en máquina', "searchName" = CASE WHEN "searchName" LIKE 'extension de piernas en maquina de palanca%' THEN 'extension de piernas en maquina' || substr( "searchName", 43 ) ELSE "searchName" END
WHERE "name" = 'Extensión de piernas en máquina de palanca' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0585' );
UPDATE "ExerciseGlobal" SET "name" = 'Extensión de piernas en máquina', "searchName" = CASE WHEN "searchName" LIKE 'extension de piernas en maquina de palanca%' THEN 'extension de piernas en maquina' || substr( "searchName", 43 ) ELSE "searchName" END
WHERE "externalId" = '0585' AND "name" = 'Extensión de piernas en máquina de palanca';

UPDATE "ExerciseCoach" SET "name" = 'Extensión de tríceps en máquina', "searchName" = CASE WHEN "searchName" LIKE 'extension de triceps en maquina de palanca%' THEN 'extension de triceps en maquina' || substr( "searchName", 43 ) ELSE "searchName" END
WHERE "name" = 'Extensión de tríceps en máquina de palanca' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0607' );
UPDATE "ExerciseGlobal" SET "name" = 'Extensión de tríceps en máquina', "searchName" = CASE WHEN "searchName" LIKE 'extension de triceps en maquina de palanca%' THEN 'extension de triceps en maquina' || substr( "searchName", 43 ) ELSE "searchName" END
WHERE "externalId" = '0607' AND "name" = 'Extensión de tríceps en máquina de palanca';

UPDATE "ExerciseCoach" SET "name" = 'Extensión lumbar en máquina', "searchName" = CASE WHEN "searchName" LIKE 'extension lumbar en maquina de palanca%' THEN 'extension lumbar en maquina' || substr( "searchName", 39 ) ELSE "searchName" END
WHERE "name" = 'Extensión lumbar en máquina de palanca' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0573' );
UPDATE "ExerciseGlobal" SET "name" = 'Extensión lumbar en máquina', "searchName" = CASE WHEN "searchName" LIKE 'extension lumbar en maquina de palanca%' THEN 'extension lumbar en maquina' || substr( "searchName", 39 ) ELSE "searchName" END
WHERE "externalId" = '0573' AND "name" = 'Extensión lumbar en máquina de palanca';

UPDATE "ExerciseCoach" SET "name" = 'Flexión de brazos', "searchName" = CASE WHEN "searchName" LIKE 'flexion%' THEN 'flexion de brazos' || substr( "searchName", 8 ) ELSE "searchName" END
WHERE "name" = 'Flexión' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0662' );
UPDATE "ExerciseGlobal" SET "name" = 'Flexión de brazos', "searchName" = CASE WHEN "searchName" LIKE 'flexion%' THEN 'flexion de brazos' || substr( "searchName", 8 ) ELSE "searchName" END
WHERE "externalId" = '0662' AND "name" = 'Flexión';

UPDATE "ExerciseCoach" SET "name" = 'Flexión de brazos agarre cerrado con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'flexion agarre cerrado con mancuerna%' THEN 'flexion de brazos agarre cerrado con mancuerna' || substr( "searchName", 37 ) ELSE "searchName" END
WHERE "name" = 'Flexión agarre cerrado con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0660' );
UPDATE "ExerciseGlobal" SET "name" = 'Flexión de brazos agarre cerrado con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'flexion agarre cerrado con mancuerna%' THEN 'flexion de brazos agarre cerrado con mancuerna' || substr( "searchName", 37 ) ELSE "searchName" END
WHERE "externalId" = '0660' AND "name" = 'Flexión agarre cerrado con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Flexión de brazos agarre estrecho sobre pelota suiza', "searchName" = CASE WHEN "searchName" LIKE 'flexion agarre estrecho sobre pelota suiza%' THEN 'flexion de brazos agarre estrecho sobre pelota suiza' || substr( "searchName", 43 ) ELSE "searchName" END
WHERE "name" = 'Flexión agarre estrecho sobre pelota suiza' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '2328' );
UPDATE "ExerciseGlobal" SET "name" = 'Flexión de brazos agarre estrecho sobre pelota suiza', "searchName" = CASE WHEN "searchName" LIKE 'flexion agarre estrecho sobre pelota suiza%' THEN 'flexion de brazos agarre estrecho sobre pelota suiza' || substr( "searchName", 43 ) ELSE "searchName" END
WHERE "externalId" = '2328' AND "name" = 'Flexión agarre estrecho sobre pelota suiza';

UPDATE "ExerciseCoach" SET "name" = 'Flexión de brazos a plancha lateral', "searchName" = CASE WHEN "searchName" LIKE 'flexion a plancha lateral%' THEN 'flexion de brazos a plancha lateral' || substr( "searchName", 26 ) ELSE "searchName" END
WHERE "name" = 'Flexión a plancha lateral' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0664' );
UPDATE "ExerciseGlobal" SET "name" = 'Flexión de brazos a plancha lateral', "searchName" = CASE WHEN "searchName" LIKE 'flexion a plancha lateral%' THEN 'flexion de brazos a plancha lateral' || substr( "searchName", 26 ) ELSE "searchName" END
WHERE "externalId" = '0664' AND "name" = 'Flexión a plancha lateral';

UPDATE "ExerciseCoach" SET "name" = 'Flexión de brazos araña', "searchName" = CASE WHEN "searchName" LIKE 'flexion arana%' THEN 'flexion de brazos arana' || substr( "searchName", 14 ) ELSE "searchName" END
WHERE "name" = 'Flexión araña' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0778' );
UPDATE "ExerciseGlobal" SET "name" = 'Flexión de brazos araña', "searchName" = CASE WHEN "searchName" LIKE 'flexion arana%' THEN 'flexion de brazos arana' || substr( "searchName", 14 ) ELSE "searchName" END
WHERE "externalId" = '0778' AND "name" = 'Flexión araña';

UPDATE "ExerciseCoach" SET "name" = 'Flexión de brazos con caída', "searchName" = CASE WHEN "searchName" LIKE 'flexion con caida%' THEN 'flexion de brazos con caida' || substr( "searchName", 18 ) ELSE "searchName" END
WHERE "name" = 'Flexión con caída' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1275' );
UPDATE "ExerciseGlobal" SET "name" = 'Flexión de brazos con caída', "searchName" = CASE WHEN "searchName" LIKE 'flexion con caida%' THEN 'flexion de brazos con caida' || substr( "searchName", 18 ) ELSE "searchName" END
WHERE "externalId" = '1275' AND "name" = 'Flexión con caída';

UPDATE "ExerciseCoach" SET "name" = 'Flexión de brazos con caída con peso', "searchName" = CASE WHEN "searchName" LIKE 'flexion con caida con peso%' THEN 'flexion de brazos con caida con peso' || substr( "searchName", 27 ) ELSE "searchName" END
WHERE "name" = 'Flexión con caída con peso' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1310' );
UPDATE "ExerciseGlobal" SET "name" = 'Flexión de brazos con caída con peso', "searchName" = CASE WHEN "searchName" LIKE 'flexion con caida con peso%' THEN 'flexion de brazos con caida con peso' || substr( "searchName", 27 ) ELSE "searchName" END
WHERE "externalId" = '1310' AND "name" = 'Flexión con caída con peso';

UPDATE "ExerciseCoach" SET "name" = 'Flexión de brazos con elevación a un brazo', "searchName" = CASE WHEN "searchName" LIKE 'flexion con elevacion a un brazo%' THEN 'flexion de brazos con elevacion a un brazo' || substr( "searchName", 33 ) ELSE "searchName" END
WHERE "name" = 'Flexión con elevación a un brazo' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0666' );
UPDATE "ExerciseGlobal" SET "name" = 'Flexión de brazos con elevación a un brazo', "searchName" = CASE WHEN "searchName" LIKE 'flexion con elevacion a un brazo%' THEN 'flexion de brazos con elevacion a un brazo' || substr( "searchName", 33 ) ELSE "searchName" END
WHERE "externalId" = '0666' AND "name" = 'Flexión con elevación a un brazo';

UPDATE "ExerciseCoach" SET "name" = 'Flexión de brazos con manos sobre pelota suiza', "searchName" = CASE WHEN "searchName" LIKE 'flexion con manos sobre pelota suiza%' THEN 'flexion de brazos con manos sobre pelota suiza' || substr( "searchName", 37 ) ELSE "searchName" END
WHERE "name" = 'Flexión con manos sobre pelota suiza' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0655' );
UPDATE "ExerciseGlobal" SET "name" = 'Flexión de brazos con manos sobre pelota suiza', "searchName" = CASE WHEN "searchName" LIKE 'flexion con manos sobre pelota suiza%' THEN 'flexion de brazos con manos sobre pelota suiza' || substr( "searchName", 37 ) ELSE "searchName" END
WHERE "externalId" = '0655' AND "name" = 'Flexión con manos sobre pelota suiza';

UPDATE "ExerciseCoach" SET "name" = 'Flexión de brazos con patada de pierna exterior', "searchName" = CASE WHEN "searchName" LIKE 'flexion con patada de pierna exterior%' THEN 'flexion de brazos con patada de pierna exterior' || substr( "searchName", 38 ) ELSE "searchName" END
WHERE "name" = 'Flexión con patada de pierna exterior' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0642' );
UPDATE "ExerciseGlobal" SET "name" = 'Flexión de brazos con patada de pierna exterior', "searchName" = CASE WHEN "searchName" LIKE 'flexion con patada de pierna exterior%' THEN 'flexion de brazos con patada de pierna exterior' || substr( "searchName", 38 ) ELSE "searchName" END
WHERE "externalId" = '0642' AND "name" = 'Flexión con patada de pierna exterior';

UPDATE "ExerciseCoach" SET "name" = 'Flexión de brazos con patada de pierna interior', "searchName" = CASE WHEN "searchName" LIKE 'flexion con patada de pierna interior%' THEN 'flexion de brazos con patada de pierna interior' || substr( "searchName", 38 ) ELSE "searchName" END
WHERE "name" = 'Flexión con patada de pierna interior' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0661' );
UPDATE "ExerciseGlobal" SET "name" = 'Flexión de brazos con patada de pierna interior', "searchName" = CASE WHEN "searchName" LIKE 'flexion con patada de pierna interior%' THEN 'flexion de brazos con patada de pierna interior' || substr( "searchName", 38 ) ELSE "searchName" END
WHERE "externalId" = '0661' AND "name" = 'Flexión con patada de pierna interior';

UPDATE "ExerciseCoach" SET "name" = 'Flexión de brazos con pies sobre pelota suiza', "searchName" = CASE WHEN "searchName" LIKE 'flexion con pies sobre pelota suiza%' THEN 'flexion de brazos con pies sobre pelota suiza' || substr( "searchName", 36 ) ELSE "searchName" END
WHERE "name" = 'Flexión con pies sobre pelota suiza' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0656' );
UPDATE "ExerciseGlobal" SET "name" = 'Flexión de brazos con pies sobre pelota suiza', "searchName" = CASE WHEN "searchName" LIKE 'flexion con pies sobre pelota suiza%' THEN 'flexion de brazos con pies sobre pelota suiza' || substr( "searchName", 36 ) ELSE "searchName" END
WHERE "externalId" = '0656' AND "name" = 'Flexión con pies sobre pelota suiza';

UPDATE "ExerciseCoach" SET "name" = 'Flexión de brazos con toque de hombro', "searchName" = CASE WHEN "searchName" LIKE 'flexion con toque de hombro%' THEN 'flexion de brazos con toque de hombro' || substr( "searchName", 28 ) ELSE "searchName" END
WHERE "name" = 'Flexión con toque de hombro' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0699' );
UPDATE "ExerciseGlobal" SET "name" = 'Flexión de brazos con toque de hombro', "searchName" = CASE WHEN "searchName" LIKE 'flexion con toque de hombro%' THEN 'flexion de brazos con toque de hombro' || substr( "searchName", 28 ) ELSE "searchName" END
WHERE "externalId" = '0699' AND "name" = 'Flexión con toque de hombro';

UPDATE "ExerciseCoach" SET "name" = 'Flexión de brazos con toque de pecho', "searchName" = CASE WHEN "searchName" LIKE 'flexion con toque de pecho%' THEN 'flexion de brazos con toque de pecho' || substr( "searchName", 27 ) ELSE "searchName" END
WHERE "name" = 'Flexión con toque de pecho' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '3216' );
UPDATE "ExerciseGlobal" SET "name" = 'Flexión de brazos con toque de pecho', "searchName" = CASE WHEN "searchName" LIKE 'flexion con toque de pecho%' THEN 'flexion de brazos con toque de pecho' || substr( "searchName", 27 ) ELSE "searchName" END
WHERE "externalId" = '3216' AND "name" = 'Flexión con toque de pecho';

UPDATE "ExerciseCoach" SET "name" = 'Flexión de brazos de arquero', "searchName" = CASE WHEN "searchName" LIKE 'flexion de arquero%' THEN 'flexion de brazos de arquero' || substr( "searchName", 19 ) ELSE "searchName" END
WHERE "name" = 'Flexión de arquero' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '3294' );
UPDATE "ExerciseGlobal" SET "name" = 'Flexión de brazos de arquero', "searchName" = CASE WHEN "searchName" LIKE 'flexion de arquero%' THEN 'flexion de brazos de arquero' || substr( "searchName", 19 ) ELSE "searchName" END
WHERE "externalId" = '3294' AND "name" = 'Flexión de arquero';

UPDATE "ExerciseCoach" SET "name" = 'Flexión de brazos declinado', "searchName" = CASE WHEN "searchName" LIKE 'flexion declinado%' THEN 'flexion de brazos declinado' || substr( "searchName", 18 ) ELSE "searchName" END
WHERE "name" = 'Flexión declinado' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0279' );
UPDATE "ExerciseGlobal" SET "name" = 'Flexión de brazos declinado', "searchName" = CASE WHEN "searchName" LIKE 'flexion declinado%' THEN 'flexion de brazos declinado' || substr( "searchName", 18 ) ELSE "searchName" END
WHERE "externalId" = '0279' AND "name" = 'Flexión declinado';

UPDATE "ExerciseCoach" SET "name" = 'Flexión de brazos depth salto inclinado', "searchName" = CASE WHEN "searchName" LIKE 'flexion depth salto inclinado%' THEN 'flexion de brazos depth salto inclinado' || substr( "searchName", 30 ) ELSE "searchName" END
WHERE "name" = 'Flexión depth salto inclinado' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0492' );
UPDATE "ExerciseGlobal" SET "name" = 'Flexión de brazos depth salto inclinado', "searchName" = CASE WHEN "searchName" LIKE 'flexion depth salto inclinado%' THEN 'flexion de brazos depth salto inclinado' || substr( "searchName", 30 ) ELSE "searchName" END
WHERE "externalId" = '0492' AND "name" = 'Flexión depth salto inclinado';

UPDATE "ExerciseCoach" SET "name" = 'Flexión de brazos de rodillas', "searchName" = CASE WHEN "searchName" LIKE 'flexion de rodillas%' THEN 'flexion de brazos de rodillas' || substr( "searchName", 20 ) ELSE "searchName" END
WHERE "name" = 'Flexión de rodillas' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '3211' );
UPDATE "ExerciseGlobal" SET "name" = 'Flexión de brazos de rodillas', "searchName" = CASE WHEN "searchName" LIKE 'flexion de rodillas%' THEN 'flexion de brazos de rodillas' || substr( "searchName", 20 ) ELSE "searchName" END
WHERE "externalId" = '3211' AND "name" = 'Flexión de rodillas';

UPDATE "ExerciseCoach" SET "name" = 'Flexión de brazos en parada de manos', "searchName" = CASE WHEN "searchName" LIKE 'flexion en parada de manos%' THEN 'flexion de brazos en parada de manos' || substr( "searchName", 27 ) ELSE "searchName" END
WHERE "name" = 'Flexión en parada de manos' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0471' );
UPDATE "ExerciseGlobal" SET "name" = 'Flexión de brazos en parada de manos', "searchName" = CASE WHEN "searchName" LIKE 'flexion en parada de manos%' THEN 'flexion de brazos en parada de manos' || substr( "searchName", 27 ) ELSE "searchName" END
WHERE "externalId" = '0471' AND "name" = 'Flexión en parada de manos';

UPDATE "ExerciseCoach" SET "name" = 'Flexión de brazos en planche completo', "searchName" = CASE WHEN "searchName" LIKE 'flexion en planche completo%' THEN 'flexion de brazos en planche completo' || substr( "searchName", 28 ) ELSE "searchName" END
WHERE "name" = 'Flexión en planche completo' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '3327' );
UPDATE "ExerciseGlobal" SET "name" = 'Flexión de brazos en planche completo', "searchName" = CASE WHEN "searchName" LIKE 'flexion en planche completo%' THEN 'flexion de brazos en planche completo' || substr( "searchName", 28 ) ELSE "searchName" END
WHERE "externalId" = '3327' AND "name" = 'Flexión en planche completo';

UPDATE "ExerciseCoach" SET "name" = 'Flexión de brazos hindú modificada', "searchName" = CASE WHEN "searchName" LIKE 'flexion hindu modificada%' THEN 'flexion de brazos hindu modificada' || substr( "searchName", 25 ) ELSE "searchName" END
WHERE "name" = 'Flexión hindú modificada' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '3217' );
UPDATE "ExerciseGlobal" SET "name" = 'Flexión de brazos hindú modificada', "searchName" = CASE WHEN "searchName" LIKE 'flexion hindu modificada%' THEN 'flexion de brazos hindu modificada' || substr( "searchName", 25 ) ELSE "searchName" END
WHERE "externalId" = '3217' AND "name" = 'Flexión hindú modificada';

UPDATE "ExerciseCoach" SET "name" = 'Flexión de brazos inclinado', "searchName" = CASE WHEN "searchName" LIKE 'flexion inclinado%' THEN 'flexion de brazos inclinado' || substr( "searchName", 18 ) ELSE "searchName" END
WHERE "name" = 'Flexión inclinado' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0493' );
UPDATE "ExerciseGlobal" SET "name" = 'Flexión de brazos inclinado', "searchName" = CASE WHEN "searchName" LIKE 'flexion inclinado%' THEN 'flexion de brazos inclinado' || substr( "searchName", 18 ) ELSE "searchName" END
WHERE "externalId" = '0493' AND "name" = 'Flexión inclinado';

UPDATE "ExerciseCoach" SET "name" = 'Flexión de brazos manos amplias', "searchName" = CASE WHEN "searchName" LIKE 'flexion manos amplias%' THEN 'flexion de brazos manos amplias' || substr( "searchName", 22 ) ELSE "searchName" END
WHERE "name" = 'Flexión manos amplias' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1311' );
UPDATE "ExerciseGlobal" SET "name" = 'Flexión de brazos manos amplias', "searchName" = CASE WHEN "searchName" LIKE 'flexion manos amplias%' THEN 'flexion de brazos manos amplias' || substr( "searchName", 22 ) ELSE "searchName" END
WHERE "externalId" = '1311' AND "name" = 'Flexión manos amplias';

UPDATE "ExerciseCoach" SET "name" = 'Flexión de brazos modificada a antebrazos bajos', "searchName" = CASE WHEN "searchName" LIKE 'flexion modificada a antebrazos bajos%' THEN 'flexion de brazos modificada a antebrazos bajos' || substr( "searchName", 38 ) ELSE "searchName" END
WHERE "name" = 'Flexión modificada a antebrazos bajos' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1421' );
UPDATE "ExerciseGlobal" SET "name" = 'Flexión de brazos modificada a antebrazos bajos', "searchName" = CASE WHEN "searchName" LIKE 'flexion modificada a antebrazos bajos%' THEN 'flexion de brazos modificada a antebrazos bajos' || substr( "searchName", 38 ) ELSE "searchName" END
WHERE "externalId" = '1421' AND "name" = 'Flexión modificada a antebrazos bajos';

UPDATE "ExerciseCoach" SET "name" = 'Flexión de brazos (pared)', "searchName" = CASE WHEN "searchName" LIKE 'flexion (pared)%' THEN 'flexion de brazos (pared)' || substr( "searchName", 16 ) ELSE "searchName" END
WHERE "name" = 'Flexión (pared)' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0659' );
UPDATE "ExerciseGlobal" SET "name" = 'Flexión de brazos (pared)', "searchName" = CASE WHEN "searchName" LIKE 'flexion (pared)%' THEN 'flexion de brazos (pared)' || substr( "searchName", 16 ) ELSE "searchName" END
WHERE "externalId" = '0659' AND "name" = 'Flexión (pared)';

UPDATE "ExerciseCoach" SET "name" = 'Flexión de brazos (pared) (variante 2)', "searchName" = CASE WHEN "searchName" LIKE 'flexion (pared) (variante 2)%' THEN 'flexion de brazos (pared) (variante 2)' || substr( "searchName", 29 ) ELSE "searchName" END
WHERE "name" = 'Flexión (pared) (variante 2)' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0658' );
UPDATE "ExerciseGlobal" SET "name" = 'Flexión de brazos (pared) (variante 2)', "searchName" = CASE WHEN "searchName" LIKE 'flexion (pared) (variante 2)%' THEN 'flexion de brazos (pared) (variante 2)' || substr( "searchName", 29 ) ELSE "searchName" END
WHERE "externalId" = '0658' AND "name" = 'Flexión (pared) (variante 2)';

UPDATE "ExerciseCoach" SET "name" = 'Flexión de brazos pelota medicinal', "searchName" = CASE WHEN "searchName" LIKE 'flexion pelota medicinal%' THEN 'flexion de brazos pelota medicinal' || substr( "searchName", 25 ) ELSE "searchName" END
WHERE "name" = 'Flexión pelota medicinal' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0663' );
UPDATE "ExerciseGlobal" SET "name" = 'Flexión de brazos pelota medicinal', "searchName" = CASE WHEN "searchName" LIKE 'flexion pelota medicinal%' THEN 'flexion de brazos pelota medicinal' || substr( "searchName", 25 ) ELSE "searchName" END
WHERE "externalId" = '0663' AND "name" = 'Flexión pelota medicinal';

UPDATE "ExerciseCoach" SET "name" = 'Flexión de brazos pike a cobra', "searchName" = CASE WHEN "searchName" LIKE 'flexion pike a cobra%' THEN 'flexion de brazos pike a cobra' || substr( "searchName", 21 ) ELSE "searchName" END
WHERE "name" = 'Flexión pike a cobra' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '3662' );
UPDATE "ExerciseGlobal" SET "name" = 'Flexión de brazos pike a cobra', "searchName" = CASE WHEN "searchName" LIKE 'flexion pike a cobra%' THEN 'flexion de brazos pike a cobra' || substr( "searchName", 21 ) ELSE "searchName" END
WHERE "externalId" = '3662' AND "name" = 'Flexión pike a cobra';

UPDATE "ExerciseCoach" SET "name" = 'Flexión de brazos pike sobre pelota suiza', "searchName" = CASE WHEN "searchName" LIKE 'flexion pike sobre pelota suiza%' THEN 'flexion de brazos pike sobre pelota suiza' || substr( "searchName", 32 ) ELSE "searchName" END
WHERE "name" = 'Flexión pike sobre pelota suiza' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1296' );
UPDATE "ExerciseGlobal" SET "name" = 'Flexión de brazos pike sobre pelota suiza', "searchName" = CASE WHEN "searchName" LIKE 'flexion pike sobre pelota suiza%' THEN 'flexion de brazos pike sobre pelota suiza' || substr( "searchName", 32 ) ELSE "searchName" END
WHERE "externalId" = '1296' AND "name" = 'Flexión pike sobre pelota suiza';

UPDATE "ExerciseCoach" SET "name" = 'Flexión de brazos plus', "searchName" = CASE WHEN "searchName" LIKE 'flexion plus%' THEN 'flexion de brazos plus' || substr( "searchName", 13 ) ELSE "searchName" END
WHERE "name" = 'Flexión plus' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '3145' );
UPDATE "ExerciseGlobal" SET "name" = 'Flexión de brazos plus', "searchName" = CASE WHEN "searchName" LIKE 'flexion plus%' THEN 'flexion de brazos plus' || substr( "searchName", 13 ) ELSE "searchName" END
WHERE "externalId" = '3145' AND "name" = 'Flexión plus';

UPDATE "ExerciseCoach" SET "name" = 'Flexión de brazos profunda', "searchName" = CASE WHEN "searchName" LIKE 'flexion profunda%' THEN 'flexion de brazos profunda' || substr( "searchName", 17 ) ELSE "searchName" END
WHERE "name" = 'Flexión profunda' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1274' );
UPDATE "ExerciseGlobal" SET "name" = 'Flexión de brazos profunda', "searchName" = CASE WHEN "searchName" LIKE 'flexion profunda%' THEN 'flexion de brazos profunda' || substr( "searchName", 17 ) ELSE "searchName" END
WHERE "externalId" = '1274' AND "name" = 'Flexión profunda';

UPDATE "ExerciseCoach" SET "name" = 'Flexión de brazos sobre antebrazos', "searchName" = CASE WHEN "searchName" LIKE 'flexion sobre antebrazos%' THEN 'flexion de brazos sobre antebrazos' || substr( "searchName", 25 ) ELSE "searchName" END
WHERE "name" = 'Flexión sobre antebrazos' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1467' );
UPDATE "ExerciseGlobal" SET "name" = 'Flexión de brazos sobre antebrazos', "searchName" = CASE WHEN "searchName" LIKE 'flexion sobre antebrazos%' THEN 'flexion de brazos sobre antebrazos' || substr( "searchName", 25 ) ELSE "searchName" END
WHERE "externalId" = '1467' AND "name" = 'Flexión sobre antebrazos';

UPDATE "ExerciseCoach" SET "name" = 'Flexión de brazos sobre BOSU', "searchName" = CASE WHEN "searchName" LIKE 'flexion sobre bosu%' THEN 'flexion de brazos sobre bosu' || substr( "searchName", 19 ) ELSE "searchName" END
WHERE "name" = 'Flexión sobre BOSU' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1307' );
UPDATE "ExerciseGlobal" SET "name" = 'Flexión de brazos sobre BOSU', "searchName" = CASE WHEN "searchName" LIKE 'flexion sobre bosu%' THEN 'flexion de brazos sobre bosu' || substr( "searchName", 19 ) ELSE "searchName" END
WHERE "externalId" = '1307' AND "name" = 'Flexión sobre BOSU';

UPDATE "ExerciseCoach" SET "name" = 'Flexión de brazos sobre bosu invertido', "searchName" = CASE WHEN "searchName" LIKE 'flexion sobre bosu invertido%' THEN 'flexion de brazos sobre bosu invertido' || substr( "searchName", 29 ) ELSE "searchName" END
WHERE "name" = 'Flexión sobre bosu invertido' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0653' );
UPDATE "ExerciseGlobal" SET "name" = 'Flexión de brazos sobre bosu invertido', "searchName" = CASE WHEN "searchName" LIKE 'flexion sobre bosu invertido%' THEN 'flexion de brazos sobre bosu invertido' || substr( "searchName", 29 ) ELSE "searchName" END
WHERE "externalId" = '0653' AND "name" = 'Flexión sobre bosu invertido';

UPDATE "ExerciseCoach" SET "name" = 'Flexión de brazos (sobre box) inclinado', "searchName" = CASE WHEN "searchName" LIKE 'flexion (sobre box) inclinado%' THEN 'flexion de brazos (sobre box) inclinado' || substr( "searchName", 30 ) ELSE "searchName" END
WHERE "name" = 'Flexión (sobre box) inclinado' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '3785' );
UPDATE "ExerciseGlobal" SET "name" = 'Flexión de brazos (sobre box) inclinado', "searchName" = CASE WHEN "searchName" LIKE 'flexion (sobre box) inclinado%' THEN 'flexion de brazos (sobre box) inclinado' || substr( "searchName", 30 ) ELSE "searchName" END
WHERE "externalId" = '3785' AND "name" = 'Flexión (sobre box) inclinado';

UPDATE "ExerciseCoach" SET "name" = 'Flexión de brazos superman', "searchName" = CASE WHEN "searchName" LIKE 'flexion superman%' THEN 'flexion de brazos superman' || substr( "searchName", 17 ) ELSE "searchName" END
WHERE "name" = 'Flexión superman' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0803' );
UPDATE "ExerciseGlobal" SET "name" = 'Flexión de brazos superman', "searchName" = CASE WHEN "searchName" LIKE 'flexion superman%' THEN 'flexion de brazos superman' || substr( "searchName", 17 ) ELSE "searchName" END
WHERE "externalId" = '0803' AND "name" = 'Flexión superman';

UPDATE "ExerciseCoach" SET "name" = 'Fondos sentado en máquina', "searchName" = CASE WHEN "searchName" LIKE 'fondos sentado en maquina de palanca%' THEN 'fondos sentado en maquina' || substr( "searchName", 37 ) ELSE "searchName" END
WHERE "name" = 'Fondos sentado en máquina de palanca' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1451' );
UPDATE "ExerciseGlobal" SET "name" = 'Fondos sentado en máquina', "searchName" = CASE WHEN "searchName" LIKE 'fondos sentado en maquina de palanca%' THEN 'fondos sentado en maquina' || substr( "searchName", 37 ) ELSE "searchName" END
WHERE "externalId" = '1451' AND "name" = 'Fondos sentado en máquina de palanca';

UPDATE "ExerciseCoach" SET "name" = 'Sentadilla Frankenstein', "searchName" = CASE WHEN "searchName" LIKE 'frankenstein sentadilla%' THEN 'sentadilla frankenstein' || substr( "searchName", 24 ) ELSE "searchName" END
WHERE "name" = 'Frankenstein sentadilla' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '3194' );
UPDATE "ExerciseGlobal" SET "name" = 'Sentadilla Frankenstein', "searchName" = CASE WHEN "searchName" LIKE 'frankenstein sentadilla%' THEN 'sentadilla frankenstein' || substr( "searchName", 24 ) ELSE "searchName" END
WHERE "externalId" = '3194' AND "name" = 'Frankenstein sentadilla';

UPDATE "ExerciseCoach" SET "name" = 'Apertura declinada con giro con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'giro apertura declinada con mancuerna%' THEN 'apertura declinada con giro con mancuerna' || substr( "searchName", 38 ) ELSE "searchName" END
WHERE "name" = 'Giro apertura declinada con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0307' );
UPDATE "ExerciseGlobal" SET "name" = 'Apertura declinada con giro con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'giro apertura declinada con mancuerna%' THEN 'apertura declinada con giro con mancuerna' || substr( "searchName", 38 ) ELSE "searchName" END
WHERE "externalId" = '0307' AND "name" = 'Giro apertura declinada con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Giro de rodillas en máquina', "searchName" = CASE WHEN "searchName" LIKE 'giro de rodillas en maquina de palanca%' THEN 'giro de rodillas en maquina' || substr( "searchName", 39 ) ELSE "searchName" END
WHERE "name" = 'Giro de rodillas en máquina de palanca' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0583' );
UPDATE "ExerciseGlobal" SET "name" = 'Giro de rodillas en máquina', "searchName" = CASE WHEN "searchName" LIKE 'giro de rodillas en maquina de palanca%' THEN 'giro de rodillas en maquina' || substr( "searchName", 39 ) ELSE "searchName" END
WHERE "externalId" = '0583' AND "name" = 'Giro de rodillas en máquina de palanca';

UPDATE "ExerciseCoach" SET "name" = 'Remo con giro (Barra V) de pie en polea', "searchName" = CASE WHEN "searchName" LIKE 'giro remo (barra v) de pie en polea%' THEN 'remo con giro (barra v) de pie en polea' || substr( "searchName", 36 ) ELSE "searchName" END
WHERE "name" = 'Giro remo (Barra V) de pie en polea' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0236' );
UPDATE "ExerciseGlobal" SET "name" = 'Remo con giro (Barra V) de pie en polea', "searchName" = CASE WHEN "searchName" LIKE 'giro remo (barra v) de pie en polea%' THEN 'remo con giro (barra v) de pie en polea' || substr( "searchName", 36 ) ELSE "searchName" END
WHERE "externalId" = '0236' AND "name" = 'Giro remo (Barra V) de pie en polea';

UPDATE "ExerciseCoach" SET "name" = 'Sentadilla goblet con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'goblet sentadilla con mancuerna%' THEN 'sentadilla goblet con mancuerna' || substr( "searchName", 32 ) ELSE "searchName" END
WHERE "name" = 'Goblet sentadilla con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1760' );
UPDATE "ExerciseGlobal" SET "name" = 'Sentadilla goblet con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'goblet sentadilla con mancuerna%' THEN 'sentadilla goblet con mancuerna' || substr( "searchName", 32 ) ELSE "searchName" END
WHERE "externalId" = '1760' AND "name" = 'Goblet sentadilla con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Sentadilla goblet con pesa rusa', "searchName" = CASE WHEN "searchName" LIKE 'goblet sentadilla con pesa rusa%' THEN 'sentadilla goblet con pesa rusa' || substr( "searchName", 32 ) ELSE "searchName" END
WHERE "name" = 'Goblet sentadilla con pesa rusa' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0534' );
UPDATE "ExerciseGlobal" SET "name" = 'Sentadilla goblet con pesa rusa', "searchName" = CASE WHEN "searchName" LIKE 'goblet sentadilla con pesa rusa%' THEN 'sentadilla goblet con pesa rusa' || substr( "searchName", 32 ) ELSE "searchName" END
WHERE "externalId" = '0534' AND "name" = 'Goblet sentadilla con pesa rusa';

UPDATE "ExerciseCoach" SET "name" = 'Sentadilla hack con barra', "searchName" = CASE WHEN "searchName" LIKE 'hack sentadilla con barra%' THEN 'sentadilla hack con barra' || substr( "searchName", 26 ) ELSE "searchName" END
WHERE "name" = 'Hack sentadilla con barra' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0046' );
UPDATE "ExerciseGlobal" SET "name" = 'Sentadilla hack con barra', "searchName" = CASE WHEN "searchName" LIKE 'hack sentadilla con barra%' THEN 'sentadilla hack con barra' || substr( "searchName", 26 ) ELSE "searchName" END
WHERE "externalId" = '0046' AND "name" = 'Hack sentadilla con barra';

UPDATE "ExerciseCoach" SET "name" = 'Sentadilla hack en máquina', "searchName" = CASE WHEN "searchName" LIKE 'hack sentadilla con trineo%' THEN 'sentadilla hack en maquina' || substr( "searchName", 27 ) ELSE "searchName" END
WHERE "name" = 'Hack sentadilla con trineo' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0743' );
UPDATE "ExerciseGlobal" SET "name" = 'Sentadilla hack en máquina', "searchName" = CASE WHEN "searchName" LIKE 'hack sentadilla con trineo%' THEN 'sentadilla hack en maquina' || substr( "searchName", 27 ) ELSE "searchName" END
WHERE "externalId" = '0743' AND "name" = 'Hack sentadilla con trineo';

UPDATE "ExerciseCoach" SET "name" = 'Sentadilla hack en máquina Smith', "searchName" = CASE WHEN "searchName" LIKE 'hack sentadilla en maquina smith%' THEN 'sentadilla hack en maquina smith' || substr( "searchName", 33 ) ELSE "searchName" END
WHERE "name" = 'Hack sentadilla en máquina Smith' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0755' );
UPDATE "ExerciseGlobal" SET "name" = 'Sentadilla hack en máquina Smith', "searchName" = CASE WHEN "searchName" LIKE 'hack sentadilla en maquina smith%' THEN 'sentadilla hack en maquina smith' || substr( "searchName", 33 ) ELSE "searchName" END
WHERE "externalId" = '0755' AND "name" = 'Hack sentadilla en máquina Smith';

UPDATE "ExerciseCoach" SET "name" = 'Hiperextensión inversa en máquina', "searchName" = CASE WHEN "searchName" LIKE 'hiperextension inversa en maquina de palanca%' THEN 'hiperextension inversa en maquina' || substr( "searchName", 45 ) ELSE "searchName" END
WHERE "name" = 'Hiperextensión inversa en máquina de palanca' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0593' );
UPDATE "ExerciseGlobal" SET "name" = 'Hiperextensión inversa en máquina', "searchName" = CASE WHEN "searchName" LIKE 'hiperextension inversa en maquina de palanca%' THEN 'hiperextension inversa en maquina' || substr( "searchName", 45 ) ELSE "searchName" END
WHERE "externalId" = '0593' AND "name" = 'Hiperextensión inversa en máquina de palanca';

UPDATE "ExerciseCoach" SET "name" = 'Curl inverso de muñeca (variante 2) con barra', "searchName" = CASE WHEN "searchName" LIKE 'inverso curl de muneca (variante 2) con barra%' THEN 'curl inverso de muneca (variante 2) con barra' || substr( "searchName", 46 ) ELSE "searchName" END
WHERE "name" = 'Inverso curl de muñeca (variante 2) con barra' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0079' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl inverso de muñeca (variante 2) con barra', "searchName" = CASE WHEN "searchName" LIKE 'inverso curl de muneca (variante 2) con barra%' THEN 'curl inverso de muneca (variante 2) con barra' || substr( "searchName", 46 ) ELSE "searchName" END
WHERE "externalId" = '0079' AND "name" = 'Inverso curl de muñeca (variante 2) con barra';

UPDATE "ExerciseCoach" SET "name" = 'Jalón agarre amplio lateral a una mano en máquina', "searchName" = CASE WHEN "searchName" LIKE 'jalon agarre amplio lateral a una mano en maquina de palanca%' THEN 'jalon agarre amplio lateral a una mano en maquina' || substr( "searchName", 61 ) ELSE "searchName" END
WHERE "name" = 'Jalón agarre amplio lateral a una mano en máquina de palanca' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1347' );
UPDATE "ExerciseGlobal" SET "name" = 'Jalón agarre amplio lateral a una mano en máquina', "searchName" = CASE WHEN "searchName" LIKE 'jalon agarre amplio lateral a una mano en maquina de palanca%' THEN 'jalon agarre amplio lateral a una mano en maquina' || substr( "searchName", 61 ) ELSE "searchName" END
WHERE "externalId" = '1347' AND "name" = 'Jalón agarre amplio lateral a una mano en máquina de palanca';

UPDATE "ExerciseCoach" SET "name" = 'Jalón frontal en máquina', "searchName" = CASE WHEN "searchName" LIKE 'jalon frontal en maquina de palanca%' THEN 'jalon frontal en maquina' || substr( "searchName", 36 ) ELSE "searchName" END
WHERE "name" = 'Jalón frontal en máquina de palanca' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0579' );
UPDATE "ExerciseGlobal" SET "name" = 'Jalón frontal en máquina', "searchName" = CASE WHEN "searchName" LIKE 'jalon frontal en maquina de palanca%' THEN 'jalon frontal en maquina' || substr( "searchName", 36 ) ELSE "searchName" END
WHERE "externalId" = '0579' AND "name" = 'Jalón frontal en máquina de palanca';

UPDATE "ExerciseCoach" SET "name" = 'Peso muerto en máquina', "searchName" = CASE WHEN "searchName" LIKE 'peso muerto en maquina de palanca%' THEN 'peso muerto en maquina' || substr( "searchName", 34 ) ELSE "searchName" END
WHERE "name" = 'Peso muerto en máquina de palanca' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0578' );
UPDATE "ExerciseGlobal" SET "name" = 'Peso muerto en máquina', "searchName" = CASE WHEN "searchName" LIKE 'peso muerto en maquina de palanca%' THEN 'peso muerto en maquina' || substr( "searchName", 34 ) ELSE "searchName" END
WHERE "externalId" = '0578' AND "name" = 'Peso muerto en máquina de palanca';

UPDATE "ExerciseCoach" SET "name" = 'Remo con agarre amplio sentado en el piso en polea', "searchName" = CASE WHEN "searchName" LIKE 'piso sentado agarre amplio remo en polea%' THEN 'remo con agarre amplio sentado en el piso en polea' || substr( "searchName", 41 ) ELSE "searchName" END
WHERE "name" = 'Piso sentado agarre amplio remo en polea' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0160' );
UPDATE "ExerciseGlobal" SET "name" = 'Remo con agarre amplio sentado en el piso en polea', "searchName" = CASE WHEN "searchName" LIKE 'piso sentado agarre amplio remo en polea%' THEN 'remo con agarre amplio sentado en el piso en polea' || substr( "searchName", 41 ) ELSE "searchName" END
WHERE "externalId" = '0160' AND "name" = 'Piso sentado agarre amplio remo en polea';

UPDATE "ExerciseCoach" SET "name" = 'Sentadilla pistol con pesa rusa', "searchName" = CASE WHEN "searchName" LIKE 'pistol sentadilla con pesa rusa%' THEN 'sentadilla pistol con pesa rusa' || substr( "searchName", 32 ) ELSE "searchName" END
WHERE "name" = 'Pistol sentadilla con pesa rusa' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0544' );
UPDATE "ExerciseGlobal" SET "name" = 'Sentadilla pistol con pesa rusa', "searchName" = CASE WHEN "searchName" LIKE 'pistol sentadilla con pesa rusa%' THEN 'sentadilla pistol con pesa rusa' || substr( "searchName", 32 ) ELSE "searchName" END
WHERE "externalId" = '0544' AND "name" = 'Pistol sentadilla con pesa rusa';

UPDATE "ExerciseCoach" SET "name" = 'Plancha lateral aducción de cadera', "searchName" = CASE WHEN "searchName" LIKE 'plancha lateral adduccion de cadera%' THEN 'plancha lateral aduccion de cadera' || substr( "searchName", 36 ) ELSE "searchName" END
WHERE "name" = 'Plancha lateral adducción de cadera' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1775' );
UPDATE "ExerciseGlobal" SET "name" = 'Plancha lateral aducción de cadera', "searchName" = CASE WHEN "searchName" LIKE 'plancha lateral adduccion de cadera%' THEN 'plancha lateral aduccion de cadera' || substr( "searchName", 36 ) ELSE "searchName" END
WHERE "externalId" = '1775' AND "name" = 'Plancha lateral adducción de cadera';

UPDATE "ExerciseCoach" SET "name" = 'Flexión de brazos pliométrica', "searchName" = CASE WHEN "searchName" LIKE 'plyo flexion%' THEN 'flexion de brazos pliometrica' || substr( "searchName", 13 ) ELSE "searchName" END
WHERE "name" = 'Plyo flexión' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1306' );
UPDATE "ExerciseGlobal" SET "name" = 'Flexión de brazos pliométrica', "searchName" = CASE WHEN "searchName" LIKE 'plyo flexion%' THEN 'flexion de brazos pliometrica' || substr( "searchName", 13 ) ELSE "searchName" END
WHERE "externalId" = '1306' AND "name" = 'Plyo flexión';

UPDATE "ExerciseCoach" SET "name" = 'Flexión de brazos pliométrica con pesa rusa', "searchName" = CASE WHEN "searchName" LIKE 'plyo flexion con pesa rusa%' THEN 'flexion de brazos pliometrica con pesa rusa' || substr( "searchName", 27 ) ELSE "searchName" END
WHERE "name" = 'Plyo flexión con pesa rusa' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0545' );
UPDATE "ExerciseGlobal" SET "name" = 'Flexión de brazos pliométrica con pesa rusa', "searchName" = CASE WHEN "searchName" LIKE 'plyo flexion con pesa rusa%' THEN 'flexion de brazos pliometrica con pesa rusa' || substr( "searchName", 27 ) ELSE "searchName" END
WHERE "externalId" = '0545' AND "name" = 'Plyo flexión con pesa rusa';

UPDATE "ExerciseCoach" SET "name" = 'Extensión de tríceps por encima de la cabeza con cuerda en polea alta', "searchName" = CASE WHEN "searchName" LIKE 'polea alta por encima de la cabeza extension de triceps con cuerda en polea%' THEN 'extension de triceps por encima de la cabeza con cuerda en polea alta' || substr( "searchName", 76 ) ELSE "searchName" END
WHERE "name" = 'Polea alta por encima de la cabeza extensión de tríceps con cuerda en polea' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1724' );
UPDATE "ExerciseGlobal" SET "name" = 'Extensión de tríceps por encima de la cabeza con cuerda en polea alta', "searchName" = CASE WHEN "searchName" LIKE 'polea alta por encima de la cabeza extension de triceps con cuerda en polea%' THEN 'extension de triceps por encima de la cabeza con cuerda en polea alta' || substr( "searchName", 76 ) ELSE "searchName" END
WHERE "externalId" = '1724' AND "name" = 'Polea alta por encima de la cabeza extensión de tríceps con cuerda en polea';

UPDATE "ExerciseCoach" SET "name" = 'Extensión de tríceps por encima de la cabeza en polea alta', "searchName" = CASE WHEN "searchName" LIKE 'polea alta por encima de la cabeza extension de triceps en polea%' THEN 'extension de triceps por encima de la cabeza en polea alta' || substr( "searchName", 65 ) ELSE "searchName" END
WHERE "name" = 'Polea alta por encima de la cabeza extensión de tríceps en polea' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1722' );
UPDATE "ExerciseGlobal" SET "name" = 'Extensión de tríceps por encima de la cabeza en polea alta', "searchName" = CASE WHEN "searchName" LIKE 'polea alta por encima de la cabeza extension de triceps en polea%' THEN 'extension de triceps por encima de la cabeza en polea alta' || substr( "searchName", 65 ) ELSE "searchName" END
WHERE "externalId" = '1722' AND "name" = 'Polea alta por encima de la cabeza extensión de tríceps en polea';

UPDATE "ExerciseCoach" SET "name" = 'Crunch por encima de la cabeza sobre pelota suiza con peso', "searchName" = CASE WHEN "searchName" LIKE 'por encima de la cabeza crunch sobre pelota suiza con peso%' THEN 'crunch por encima de la cabeza sobre pelota suiza con peso' || substr( "searchName", 59 ) ELSE "searchName" END
WHERE "name" = 'Por encima de la cabeza crunch sobre pelota suiza con peso' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0840' );
UPDATE "ExerciseGlobal" SET "name" = 'Crunch por encima de la cabeza sobre pelota suiza con peso', "searchName" = CASE WHEN "searchName" LIKE 'por encima de la cabeza crunch sobre pelota suiza con peso%' THEN 'crunch por encima de la cabeza sobre pelota suiza con peso' || substr( "searchName", 59 ) ELSE "searchName" END
WHERE "externalId" = '0840' AND "name" = 'Por encima de la cabeza crunch sobre pelota suiza con peso';

UPDATE "ExerciseCoach" SET "name" = 'Extensión de tríceps por encima de la cabeza con cuerda en polea', "searchName" = CASE WHEN "searchName" LIKE 'por encima de la cabeza extension de triceps con cuerda en polea%' THEN 'extension de triceps por encima de la cabeza con cuerda en polea' || substr( "searchName", 65 ) ELSE "searchName" END
WHERE "name" = 'Por encima de la cabeza extensión de tríceps con cuerda en polea' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0194' );
UPDATE "ExerciseGlobal" SET "name" = 'Extensión de tríceps por encima de la cabeza con cuerda en polea', "searchName" = CASE WHEN "searchName" LIKE 'por encima de la cabeza extension de triceps con cuerda en polea%' THEN 'extension de triceps por encima de la cabeza con cuerda en polea' || substr( "searchName", 65 ) ELSE "searchName" END
WHERE "externalId" = '0194' AND "name" = 'Por encima de la cabeza extensión de tríceps con cuerda en polea';

UPDATE "ExerciseCoach" SET "name" = 'Sentadilla por encima de la cabeza con barra', "searchName" = CASE WHEN "searchName" LIKE 'por encima de la cabeza sentadilla con barra%' THEN 'sentadilla por encima de la cabeza con barra' || substr( "searchName", 45 ) ELSE "searchName" END
WHERE "name" = 'Por encima de la cabeza sentadilla con barra' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0069' );
UPDATE "ExerciseGlobal" SET "name" = 'Sentadilla por encima de la cabeza con barra', "searchName" = CASE WHEN "searchName" LIKE 'por encima de la cabeza sentadilla con barra%' THEN 'sentadilla por encima de la cabeza con barra' || substr( "searchName", 45 ) ELSE "searchName" END
WHERE "externalId" = '0069' AND "name" = 'Por encima de la cabeza sentadilla con barra';

UPDATE "ExerciseCoach" SET "name" = 'Slam por encima de la cabeza con pelota medicinal', "searchName" = CASE WHEN "searchName" LIKE 'por encima de la cabeza slam con pelota medicinal%' THEN 'slam por encima de la cabeza con pelota medicinal' || substr( "searchName", 50 ) ELSE "searchName" END
WHERE "name" = 'Por encima de la cabeza slam con pelota medicinal' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1354' );
UPDATE "ExerciseGlobal" SET "name" = 'Slam por encima de la cabeza con pelota medicinal', "searchName" = CASE WHEN "searchName" LIKE 'por encima de la cabeza slam con pelota medicinal%' THEN 'slam por encima de la cabeza con pelota medicinal' || substr( "searchName", 50 ) ELSE "searchName" END
WHERE "externalId" = '1354' AND "name" = 'Por encima de la cabeza slam con pelota medicinal';

UPDATE "ExerciseCoach" SET "name" = 'Sentadilla con postura estrecha con barra', "searchName" = CASE WHEN "searchName" LIKE 'postura estrecha sentadilla con barra%' THEN 'sentadilla con postura estrecha con barra' || substr( "searchName", 38 ) ELSE "searchName" END
WHERE "name" = 'Postura estrecha sentadilla con barra' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0063' );
UPDATE "ExerciseGlobal" SET "name" = 'Sentadilla con postura estrecha con barra', "searchName" = CASE WHEN "searchName" LIKE 'postura estrecha sentadilla con barra%' THEN 'sentadilla con postura estrecha con barra' || substr( "searchName", 38 ) ELSE "searchName" END
WHERE "externalId" = '0063' AND "name" = 'Postura estrecha sentadilla con barra';

UPDATE "ExerciseCoach" SET "name" = 'Sentadilla potty', "searchName" = CASE WHEN "searchName" LIKE 'potty sentadilla%' THEN 'sentadilla potty' || substr( "searchName", 17 ) ELSE "searchName" END
WHERE "name" = 'Potty sentadilla' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '3119' );
UPDATE "ExerciseGlobal" SET "name" = 'Sentadilla potty', "searchName" = CASE WHEN "searchName" LIKE 'potty sentadilla%' THEN 'sentadilla potty' || substr( "searchName", 17 ) ELSE "searchName" END
WHERE "externalId" = '3119' AND "name" = 'Potty sentadilla';

UPDATE "ExerciseCoach" SET "name" = 'Sentadilla potty con apoyo', "searchName" = CASE WHEN "searchName" LIKE 'potty sentadilla con apoyo%' THEN 'sentadilla potty con apoyo' || substr( "searchName", 27 ) ELSE "searchName" END
WHERE "name" = 'Potty sentadilla con apoyo' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '3132' );
UPDATE "ExerciseGlobal" SET "name" = 'Sentadilla potty con apoyo', "searchName" = CASE WHEN "searchName" LIKE 'potty sentadilla con apoyo%' THEN 'sentadilla potty con apoyo' || substr( "searchName", 27 ) ELSE "searchName" END
WHERE "externalId" = '3132' AND "name" = 'Potty sentadilla con apoyo';

UPDATE "ExerciseCoach" SET "name" = 'Prensa a una pierna a 45°', "searchName" = CASE WHEN "searchName" LIKE 'prensa a una pierna a 45° con trineo%' THEN 'prensa a una pierna a 45°' || substr( "searchName", 37 ) ELSE "searchName" END
WHERE "name" = 'Prensa a una pierna a 45° con trineo' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1425' );
UPDATE "ExerciseGlobal" SET "name" = 'Prensa a una pierna a 45°', "searchName" = CASE WHEN "searchName" LIKE 'prensa a una pierna a 45° con trineo%' THEN 'prensa a una pierna a 45°' || substr( "searchName", 37 ) ELSE "searchName" END
WHERE "externalId" = '1425' AND "name" = 'Prensa a una pierna a 45° con trineo';

UPDATE "ExerciseCoach" SET "name" = 'Prensa de gemelos acostado en máquina', "searchName" = CASE WHEN "searchName" LIKE 'prensa de gemelos acostado con trineo%' THEN 'prensa de gemelos acostado en maquina' || substr( "searchName", 38 ) ELSE "searchName" END
WHERE "name" = 'Prensa de gemelos acostado con trineo' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '2334' );
UPDATE "ExerciseGlobal" SET "name" = 'Prensa de gemelos acostado en máquina', "searchName" = CASE WHEN "searchName" LIKE 'prensa de gemelos acostado con trineo%' THEN 'prensa de gemelos acostado en maquina' || substr( "searchName", 38 ) ELSE "searchName" END
WHERE "externalId" = '2334' AND "name" = 'Prensa de gemelos acostado con trineo';

UPDATE "ExerciseCoach" SET "name" = 'Prensa de gemelos en máquina', "searchName" = CASE WHEN "searchName" LIKE 'prensa de gemelos en maquina de palanca%' THEN 'prensa de gemelos en maquina' || substr( "searchName", 40 ) ELSE "searchName" END
WHERE "name" = 'Prensa de gemelos en máquina de palanca' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '2289' );
UPDATE "ExerciseGlobal" SET "name" = 'Prensa de gemelos en máquina', "searchName" = CASE WHEN "searchName" LIKE 'prensa de gemelos en maquina de palanca%' THEN 'prensa de gemelos en maquina' || substr( "searchName", 40 ) ELSE "searchName" END
WHERE "externalId" = '2289' AND "name" = 'Prensa de gemelos en máquina de palanca';

UPDATE "ExerciseCoach" SET "name" = 'Prensa de gemelos sentado en máquina', "searchName" = CASE WHEN "searchName" LIKE 'prensa de gemelos sentado en maquina de palanca%' THEN 'prensa de gemelos sentado en maquina' || substr( "searchName", 48 ) ELSE "searchName" END
WHERE "name" = 'Prensa de gemelos sentado en máquina de palanca' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '2335' );
UPDATE "ExerciseGlobal" SET "name" = 'Prensa de gemelos sentado en máquina', "searchName" = CASE WHEN "searchName" LIKE 'prensa de gemelos sentado en maquina de palanca%' THEN 'prensa de gemelos sentado en maquina' || substr( "searchName", 48 ) ELSE "searchName" END
WHERE "externalId" = '2335' AND "name" = 'Prensa de gemelos sentado en máquina de palanca';

UPDATE "ExerciseCoach" SET "name" = 'Prensa de gemelos sobre prensa de piernas', "searchName" = CASE WHEN "searchName" LIKE 'prensa de gemelos sobre prensa de piernas con trineo%' THEN 'prensa de gemelos sobre prensa de piernas' || substr( "searchName", 53 ) ELSE "searchName" END
WHERE "name" = 'Prensa de gemelos sobre prensa de piernas con trineo' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1391' );
UPDATE "ExerciseGlobal" SET "name" = 'Prensa de gemelos sobre prensa de piernas', "searchName" = CASE WHEN "searchName" LIKE 'prensa de gemelos sobre prensa de piernas con trineo%' THEN 'prensa de gemelos sobre prensa de piernas' || substr( "searchName", 53 ) ELSE "searchName" END
WHERE "externalId" = '1391' AND "name" = 'Prensa de gemelos sobre prensa de piernas con trineo';

UPDATE "ExerciseCoach" SET "name" = 'Prensa de piernas alternado en máquina', "searchName" = CASE WHEN "searchName" LIKE 'prensa de piernas alternado en maquina de palanca%' THEN 'prensa de piernas alternado en maquina' || substr( "searchName", 50 ) ELSE "searchName" END
WHERE "name" = 'Prensa de piernas alternado en máquina de palanca' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '2287' );
UPDATE "ExerciseGlobal" SET "name" = 'Prensa de piernas alternado en máquina', "searchName" = CASE WHEN "searchName" LIKE 'prensa de piernas alternado en maquina de palanca%' THEN 'prensa de piernas alternado en maquina' || substr( "searchName", 50 ) ELSE "searchName" END
WHERE "externalId" = '2287' AND "name" = 'Prensa de piernas alternado en máquina de palanca';

UPDATE "ExerciseCoach" SET "name" = 'Press de hombros a una mano en máquina', "searchName" = CASE WHEN "searchName" LIKE 'press de hombros a una mano en maquina de palanca%' THEN 'press de hombros a una mano en maquina' || substr( "searchName", 50 ) ELSE "searchName" END
WHERE "name" = 'Press de hombros a una mano en máquina de palanca' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0590' );
UPDATE "ExerciseGlobal" SET "name" = 'Press de hombros a una mano en máquina', "searchName" = CASE WHEN "searchName" LIKE 'press de hombros a una mano en maquina de palanca%' THEN 'press de hombros a una mano en maquina' || substr( "searchName", 50 ) ELSE "searchName" END
WHERE "externalId" = '0590' AND "name" = 'Press de hombros a una mano en máquina de palanca';

UPDATE "ExerciseCoach" SET "name" = 'Press de hombros en máquina', "searchName" = CASE WHEN "searchName" LIKE 'press de hombros en maquina de palanca%' THEN 'press de hombros en maquina' || substr( "searchName", 39 ) ELSE "searchName" END
WHERE "name" = 'Press de hombros en máquina de palanca' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0603' );
UPDATE "ExerciseGlobal" SET "name" = 'Press de hombros en máquina', "searchName" = CASE WHEN "searchName" LIKE 'press de hombros en maquina de palanca%' THEN 'press de hombros en maquina' || substr( "searchName", 39 ) ELSE "searchName" END
WHERE "externalId" = '0603' AND "name" = 'Press de hombros en máquina de palanca';

UPDATE "ExerciseCoach" SET "name" = 'Press de hombros v. 3 en máquina', "searchName" = CASE WHEN "searchName" LIKE 'press de hombros v. 3 en maquina de palanca%' THEN 'press de hombros v. 3 en maquina' || substr( "searchName", 44 ) ELSE "searchName" END
WHERE "name" = 'Press de hombros v. 3 en máquina de palanca' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '2318' );
UPDATE "ExerciseGlobal" SET "name" = 'Press de hombros v. 3 en máquina', "searchName" = CASE WHEN "searchName" LIKE 'press de hombros v. 3 en maquina de palanca%' THEN 'press de hombros v. 3 en maquina' || substr( "searchName", 44 ) ELSE "searchName" END
WHERE "externalId" = '2318' AND "name" = 'Press de hombros v. 3 en máquina de palanca';

UPDATE "ExerciseCoach" SET "name" = 'Press de hombros (variante 2) en máquina', "searchName" = CASE WHEN "searchName" LIKE 'press de hombros (variante 2) en maquina de palanca%' THEN 'press de hombros (variante 2) en maquina' || substr( "searchName", 52 ) ELSE "searchName" END
WHERE "name" = 'Press de hombros (variante 2) en máquina de palanca' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0869' );
UPDATE "ExerciseGlobal" SET "name" = 'Press de hombros (variante 2) en máquina', "searchName" = CASE WHEN "searchName" LIKE 'press de hombros (variante 2) en maquina de palanca%' THEN 'press de hombros (variante 2) en maquina' || substr( "searchName", 52 ) ELSE "searchName" END
WHERE "externalId" = '0869' AND "name" = 'Press de hombros (variante 2) en máquina de palanca';

UPDATE "ExerciseCoach" SET "name" = 'Press de pecho declinado en máquina', "searchName" = CASE WHEN "searchName" LIKE 'press de pecho declinado en maquina de palanca%' THEN 'press de pecho declinado en maquina' || substr( "searchName", 47 ) ELSE "searchName" END
WHERE "name" = 'Press de pecho declinado en máquina de palanca' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1300' );
UPDATE "ExerciseGlobal" SET "name" = 'Press de pecho declinado en máquina', "searchName" = CASE WHEN "searchName" LIKE 'press de pecho declinado en maquina de palanca%' THEN 'press de pecho declinado en maquina' || substr( "searchName", 47 ) ELSE "searchName" END
WHERE "externalId" = '1300' AND "name" = 'Press de pecho declinado en máquina de palanca';

UPDATE "ExerciseCoach" SET "name" = 'Press de pecho de pie en máquina', "searchName" = CASE WHEN "searchName" LIKE 'press de pecho de pie en maquina de palanca%' THEN 'press de pecho de pie en maquina' || substr( "searchName", 44 ) ELSE "searchName" END
WHERE "name" = 'Press de pecho de pie en máquina de palanca' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '3758' );
UPDATE "ExerciseGlobal" SET "name" = 'Press de pecho de pie en máquina', "searchName" = CASE WHEN "searchName" LIKE 'press de pecho de pie en maquina de palanca%' THEN 'press de pecho de pie en maquina' || substr( "searchName", 44 ) ELSE "searchName" END
WHERE "externalId" = '3758' AND "name" = 'Press de pecho de pie en máquina de palanca';

UPDATE "ExerciseCoach" SET "name" = 'Press de pecho en máquina (con discos)', "searchName" = CASE WHEN "searchName" LIKE 'press de pecho en maquina de palanca (con discos)%' THEN 'press de pecho en maquina (con discos)' || substr( "searchName", 50 ) ELSE "searchName" END
WHERE "name" = 'Press de pecho en máquina de palanca (con discos)' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0576' );
UPDATE "ExerciseGlobal" SET "name" = 'Press de pecho en máquina (con discos)', "searchName" = CASE WHEN "searchName" LIKE 'press de pecho en maquina de palanca (con discos)%' THEN 'press de pecho en maquina (con discos)' || substr( "searchName", 50 ) ELSE "searchName" END
WHERE "externalId" = '0576' AND "name" = 'Press de pecho en máquina de palanca (con discos)';

UPDATE "ExerciseCoach" SET "name" = 'Press de pecho en máquina (con placas)', "searchName" = CASE WHEN "searchName" LIKE 'press de pecho en maquina de palanca (con placas)%' THEN 'press de pecho en maquina (con placas)' || substr( "searchName", 50 ) ELSE "searchName" END
WHERE "name" = 'Press de pecho en máquina de palanca (con placas)' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0577' );
UPDATE "ExerciseGlobal" SET "name" = 'Press de pecho en máquina (con placas)', "searchName" = CASE WHEN "searchName" LIKE 'press de pecho en maquina de palanca (con placas)%' THEN 'press de pecho en maquina (con placas)' || substr( "searchName", 50 ) ELSE "searchName" END
WHERE "externalId" = '0577' AND "name" = 'Press de pecho en máquina de palanca (con placas)';

UPDATE "ExerciseCoach" SET "name" = 'Press de pecho inclinado en máquina', "searchName" = CASE WHEN "searchName" LIKE 'press de pecho inclinado en maquina de palanca%' THEN 'press de pecho inclinado en maquina' || substr( "searchName", 47 ) ELSE "searchName" END
WHERE "name" = 'Press de pecho inclinado en máquina de palanca' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1299' );
UPDATE "ExerciseGlobal" SET "name" = 'Press de pecho inclinado en máquina', "searchName" = CASE WHEN "searchName" LIKE 'press de pecho inclinado en maquina de palanca%' THEN 'press de pecho inclinado en maquina' || substr( "searchName", 47 ) ELSE "searchName" END
WHERE "externalId" = '1299' AND "name" = 'Press de pecho inclinado en máquina de palanca';

UPDATE "ExerciseCoach" SET "name" = 'Press de pecho (variante 2) inclinado en máquina', "searchName" = CASE WHEN "searchName" LIKE 'press de pecho (variante 2) inclinado en maquina de palanca%' THEN 'press de pecho (variante 2) inclinado en maquina' || substr( "searchName", 60 ) ELSE "searchName" END
WHERE "name" = 'Press de pecho (variante 2) inclinado en máquina de palanca' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1479' );
UPDATE "ExerciseGlobal" SET "name" = 'Press de pecho (variante 2) inclinado en máquina', "searchName" = CASE WHEN "searchName" LIKE 'press de pecho (variante 2) inclinado en maquina de palanca%' THEN 'press de pecho (variante 2) inclinado en maquina' || substr( "searchName", 60 ) ELSE "searchName" END
WHERE "externalId" = '1479' AND "name" = 'Press de pecho (variante 2) inclinado en máquina de palanca';

UPDATE "ExerciseCoach" SET "name" = 'Press horizontal a una pierna en máquina', "searchName" = CASE WHEN "searchName" LIKE 'press horizontal a una pierna en maquina de palanca%' THEN 'press horizontal a una pierna en maquina' || substr( "searchName", 52 ) ELSE "searchName" END
WHERE "name" = 'Press horizontal a una pierna en máquina de palanca' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '2611' );
UPDATE "ExerciseGlobal" SET "name" = 'Press horizontal a una pierna en máquina', "searchName" = CASE WHEN "searchName" LIKE 'press horizontal a una pierna en maquina de palanca%' THEN 'press horizontal a una pierna en maquina' || substr( "searchName", 52 ) ELSE "searchName" END
WHERE "externalId" = '2611' AND "name" = 'Press horizontal a una pierna en máquina de palanca';

UPDATE "ExerciseCoach" SET "name" = 'Press militar en máquina', "searchName" = CASE WHEN "searchName" LIKE 'press militar en maquina de palanca%' THEN 'press militar en maquina' || substr( "searchName", 36 ) ELSE "searchName" END
WHERE "name" = 'Press militar en máquina de palanca' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0587' );
UPDATE "ExerciseGlobal" SET "name" = 'Press militar en máquina', "searchName" = CASE WHEN "searchName" LIKE 'press militar en maquina de palanca%' THEN 'press militar en maquina' || substr( "searchName", 36 ) ELSE "searchName" END
WHERE "externalId" = '0587' AND "name" = 'Press militar en máquina de palanca';

UPDATE "ExerciseCoach" SET "name" = 'Elevación de piernas prono sobre pelota suiza', "searchName" = CASE WHEN "searchName" LIKE 'prono elevacion de piernas sobre pelota suiza%' THEN 'elevacion de piernas prono sobre pelota suiza' || substr( "searchName", 46 ) ELSE "searchName" END
WHERE "name" = 'Prono elevación de piernas sobre pelota suiza' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1343' );
UPDATE "ExerciseGlobal" SET "name" = 'Elevación de piernas prono sobre pelota suiza', "searchName" = CASE WHEN "searchName" LIKE 'prono elevacion de piernas sobre pelota suiza%' THEN 'elevacion de piernas prono sobre pelota suiza' || substr( "searchName", 46 ) ELSE "searchName" END
WHERE "externalId" = '1343' AND "name" = 'Prono elevación de piernas sobre pelota suiza';

UPDATE "ExerciseCoach" SET "name" = 'Extensión de tríceps prono acostado a una mano con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'prono extension de triceps acostado a una mano con mancuerna%' THEN 'extension de triceps prono acostado a una mano con mancuerna' || substr( "searchName", 61 ) ELSE "searchName" END
WHERE "name" = 'Prono extensión de tríceps acostado a una mano con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0344' );
UPDATE "ExerciseGlobal" SET "name" = 'Extensión de tríceps prono acostado a una mano con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'prono extension de triceps acostado a una mano con mancuerna%' THEN 'extension de triceps prono acostado a una mano con mancuerna' || substr( "searchName", 61 ) ELSE "searchName" END
WHERE "externalId" = '0344' AND "name" = 'Prono extensión de tríceps acostado a una mano con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Fondos de tríceps prono en máquina', "searchName" = CASE WHEN "searchName" LIKE 'prono fondos de triceps en maquina de palanca%' THEN 'fondos de triceps prono en maquina' || substr( "searchName", 46 ) ELSE "searchName" END
WHERE "name" = 'Prono fondos de tríceps en máquina de palanca' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0591' );
UPDATE "ExerciseGlobal" SET "name" = 'Fondos de tríceps prono en máquina', "searchName" = CASE WHEN "searchName" LIKE 'prono fondos de triceps en maquina de palanca%' THEN 'fondos de triceps prono en maquina' || substr( "searchName", 46 ) ELSE "searchName" END
WHERE "externalId" = '0591' AND "name" = 'Prono fondos de tríceps en máquina de palanca';

UPDATE "ExerciseCoach" SET "name" = 'Pullover en máquina', "searchName" = CASE WHEN "searchName" LIKE 'pullover en maquina de palanca%' THEN 'pullover en maquina' || substr( "searchName", 31 ) ELSE "searchName" END
WHERE "name" = 'Pullover en máquina de palanca' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '2285' );
UPDATE "ExerciseGlobal" SET "name" = 'Pullover en máquina', "searchName" = CASE WHEN "searchName" LIKE 'pullover en maquina de palanca%' THEN 'pullover en maquina' || substr( "searchName", 31 ) ELSE "searchName" END
WHERE "externalId" = '2285' AND "name" = 'Pullover en máquina de palanca';

UPDATE "ExerciseCoach" SET "name" = 'Remo alto en máquina', "searchName" = CASE WHEN "searchName" LIKE 'remo alto en maquina de palanca%' THEN 'remo alto en maquina' || substr( "searchName", 32 ) ELSE "searchName" END
WHERE "name" = 'Remo alto en máquina de palanca' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0581' );
UPDATE "ExerciseGlobal" SET "name" = 'Remo alto en máquina', "searchName" = CASE WHEN "searchName" LIKE 'remo alto en maquina de palanca%' THEN 'remo alto en maquina' || substr( "searchName", 32 ) ELSE "searchName" END
WHERE "externalId" = '0581' AND "name" = 'Remo alto en máquina de palanca';

UPDATE "ExerciseCoach" SET "name" = 'Remo alto lateral a una mano en máquina', "searchName" = CASE WHEN "searchName" LIKE 'remo alto lateral a una mano en maquina de palanca%' THEN 'remo alto lateral a una mano en maquina' || substr( "searchName", 51 ) ELSE "searchName" END
WHERE "name" = 'Remo alto lateral a una mano en máquina de palanca' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1356' );
UPDATE "ExerciseGlobal" SET "name" = 'Remo alto lateral a una mano en máquina', "searchName" = CASE WHEN "searchName" LIKE 'remo alto lateral a una mano en maquina de palanca%' THEN 'remo alto lateral a una mano en maquina' || substr( "searchName", 51 ) ELSE "searchName" END
WHERE "externalId" = '1356' AND "name" = 'Remo alto lateral a una mano en máquina de palanca';

UPDATE "ExerciseCoach" SET "name" = 'Remo inclinado a una mano en máquina', "searchName" = CASE WHEN "searchName" LIKE 'remo inclinado a una mano en maquina de palanca%' THEN 'remo inclinado a una mano en maquina' || substr( "searchName", 48 ) ELSE "searchName" END
WHERE "name" = 'Remo inclinado a una mano en máquina de palanca' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0589' );
UPDATE "ExerciseGlobal" SET "name" = 'Remo inclinado a una mano en máquina', "searchName" = CASE WHEN "searchName" LIKE 'remo inclinado a una mano en maquina de palanca%' THEN 'remo inclinado a una mano en maquina' || substr( "searchName", 48 ) ELSE "searchName" END
WHERE "externalId" = '0589' AND "name" = 'Remo inclinado a una mano en máquina de palanca';

UPDATE "ExerciseCoach" SET "name" = 'Remo inclinado con Barra V en máquina', "searchName" = CASE WHEN "searchName" LIKE 'remo inclinado con barra v en maquina de palanca%' THEN 'remo inclinado con barra v en maquina' || substr( "searchName", 49 ) ELSE "searchName" END
WHERE "name" = 'Remo inclinado con Barra V en máquina de palanca' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '3200' );
UPDATE "ExerciseGlobal" SET "name" = 'Remo inclinado con Barra V en máquina', "searchName" = CASE WHEN "searchName" LIKE 'remo inclinado con barra v en maquina de palanca%' THEN 'remo inclinado con barra v en maquina' || substr( "searchName", 49 ) ELSE "searchName" END
WHERE "externalId" = '3200' AND "name" = 'Remo inclinado con Barra V en máquina de palanca';

UPDATE "ExerciseCoach" SET "name" = 'Remo inclinado en máquina', "searchName" = CASE WHEN "searchName" LIKE 'remo inclinado en maquina de palanca%' THEN 'remo inclinado en maquina' || substr( "searchName", 37 ) ELSE "searchName" END
WHERE "name" = 'Remo inclinado en máquina de palanca' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0574' );
UPDATE "ExerciseGlobal" SET "name" = 'Remo inclinado en máquina', "searchName" = CASE WHEN "searchName" LIKE 'remo inclinado en maquina de palanca%' THEN 'remo inclinado en maquina' || substr( "searchName", 37 ) ELSE "searchName" END
WHERE "externalId" = '0574' AND "name" = 'Remo inclinado en máquina de palanca';

UPDATE "ExerciseCoach" SET "name" = 'Remo sentado en máquina', "searchName" = CASE WHEN "searchName" LIKE 'remo sentado en maquina de palanca%' THEN 'remo sentado en maquina' || substr( "searchName", 35 ) ELSE "searchName" END
WHERE "name" = 'Remo sentado en máquina de palanca' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1350' );
UPDATE "ExerciseGlobal" SET "name" = 'Remo sentado en máquina', "searchName" = CASE WHEN "searchName" LIKE 'remo sentado en maquina de palanca%' THEN 'remo sentado en maquina' || substr( "searchName", 35 ) ELSE "searchName" END
WHERE "externalId" = '1350' AND "name" = 'Remo sentado en máquina de palanca';

UPDATE "ExerciseCoach" SET "name" = 'Remo T-bar agarre inverso en máquina', "searchName" = CASE WHEN "searchName" LIKE 'remo t-bar agarre inverso en maquina de palanca%' THEN 'remo t-bar agarre inverso en maquina' || substr( "searchName", 48 ) ELSE "searchName" END
WHERE "name" = 'Remo T-bar agarre inverso en máquina de palanca' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1351' );
UPDATE "ExerciseGlobal" SET "name" = 'Remo T-bar agarre inverso en máquina', "searchName" = CASE WHEN "searchName" LIKE 'remo t-bar agarre inverso en maquina de palanca%' THEN 'remo t-bar agarre inverso en maquina' || substr( "searchName", 48 ) ELSE "searchName" END
WHERE "externalId" = '1351' AND "name" = 'Remo T-bar agarre inverso en máquina de palanca';

UPDATE "ExerciseCoach" SET "name" = 'Remo T inverso en máquina', "searchName" = CASE WHEN "searchName" LIKE 'remo t inverso en maquina de palanca%' THEN 'remo t inverso en maquina' || substr( "searchName", 37 ) ELSE "searchName" END
WHERE "name" = 'Remo T inverso en máquina de palanca' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1349' );
UPDATE "ExerciseGlobal" SET "name" = 'Remo T inverso en máquina', "searchName" = CASE WHEN "searchName" LIKE 'remo t inverso en maquina de palanca%' THEN 'remo t inverso en maquina' || substr( "searchName", 37 ) ELSE "searchName" END
WHERE "externalId" = '1349' AND "name" = 'Remo T inverso en máquina de palanca';

UPDATE "ExerciseCoach" SET "name" = 'Remo unilateral en máquina', "searchName" = CASE WHEN "searchName" LIKE 'remo unilateral en maquina de palanca%' THEN 'remo unilateral en maquina' || substr( "searchName", 38 ) ELSE "searchName" END
WHERE "name" = 'Remo unilateral en máquina de palanca' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1313' );
UPDATE "ExerciseGlobal" SET "name" = 'Remo unilateral en máquina', "searchName" = CASE WHEN "searchName" LIKE 'remo unilateral en maquina de palanca%' THEN 'remo unilateral en maquina' || substr( "searchName", 38 ) ELSE "searchName" END
WHERE "externalId" = '1313' AND "name" = 'Remo unilateral en máquina de palanca';

UPDATE "ExerciseCoach" SET "name" = 'Remo renegado alternado con pesa rusa', "searchName" = CASE WHEN "searchName" LIKE 'renegade remo alternado con pesa rusa%' THEN 'remo renegado alternado con pesa rusa' || substr( "searchName", 38 ) ELSE "searchName" END
WHERE "name" = 'Renegade remo alternado con pesa rusa' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0521' );
UPDATE "ExerciseGlobal" SET "name" = 'Remo renegado alternado con pesa rusa', "searchName" = CASE WHEN "searchName" LIKE 'renegade remo alternado con pesa rusa%' THEN 'remo renegado alternado con pesa rusa' || substr( "searchName", 38 ) ELSE "searchName" END
WHERE "externalId" = '0521' AND "name" = 'Renegade remo alternado con pesa rusa';

UPDATE "ExerciseCoach" SET "name" = 'Buenos días con rodillas flexionadas en máquina Smith', "searchName" = CASE WHEN "searchName" LIKE 'rodillas flexionadas buenos dias en maquina smith%' THEN 'buenos dias con rodillas flexionadas en maquina smith' || substr( "searchName", 50 ) ELSE "searchName" END
WHERE "name" = 'Rodillas flexionadas buenos días en máquina Smith' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0749' );
UPDATE "ExerciseGlobal" SET "name" = 'Buenos días con rodillas flexionadas en máquina Smith', "searchName" = CASE WHEN "searchName" LIKE 'rodillas flexionadas buenos dias en maquina smith%' THEN 'buenos dias con rodillas flexionadas en maquina smith' || substr( "searchName", 50 ) ELSE "searchName" END
WHERE "externalId" = '0749' AND "name" = 'Rodillas flexionadas buenos días en máquina Smith';

UPDATE "ExerciseCoach" SET "name" = 'Rotary calf en máquina', "searchName" = CASE WHEN "searchName" LIKE 'rotary calf en maquina de palanca%' THEN 'rotary calf en maquina' || substr( "searchName", 34 ) ELSE "searchName" END
WHERE "name" = 'Rotary calf en máquina de palanca' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '2315' );
UPDATE "ExerciseGlobal" SET "name" = 'Rotary calf en máquina', "searchName" = CASE WHEN "searchName" LIKE 'rotary calf en maquina de palanca%' THEN 'rotary calf en maquina' || substr( "searchName", 34 ) ELSE "searchName" END
WHERE "externalId" = '2315' AND "name" = 'Rotary calf en máquina de palanca';

UPDATE "ExerciseCoach" SET "name" = 'Salto con soga', "searchName" = CASE WHEN "searchName" LIKE 'salto a la cuerda%' THEN 'salto con soga' || substr( "searchName", 18 ) ELSE "searchName" END
WHERE "name" = 'Salto a la cuerda' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '2612' );
UPDATE "ExerciseGlobal" SET "name" = 'Salto con soga', "searchName" = CASE WHEN "searchName" LIKE 'salto a la cuerda%' THEN 'salto con soga' || substr( "searchName", 18 ) ELSE "searchName" END
WHERE "externalId" = '2612' AND "name" = 'Salto a la cuerda';

UPDATE "ExerciseCoach" SET "name" = 'Flexión de brazos escapular', "searchName" = CASE WHEN "searchName" LIKE 'scapula flexion%' THEN 'flexion de brazos escapular' || substr( "searchName", 16 ) ELSE "searchName" END
WHERE "name" = 'Scapula flexión' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '3021' );
UPDATE "ExerciseGlobal" SET "name" = 'Flexión de brazos escapular', "searchName" = CASE WHEN "searchName" LIKE 'scapula flexion%' THEN 'flexion de brazos escapular' || substr( "searchName", 16 ) ELSE "searchName" END
WHERE "externalId" = '3021' AND "name" = 'Scapula flexión';

UPDATE "ExerciseCoach" SET "name" = 'Flexión de brazos escapular inclinado', "searchName" = CASE WHEN "searchName" LIKE 'scapula flexion inclinado%' THEN 'flexion de brazos escapular inclinado' || substr( "searchName", 26 ) ELSE "searchName" END
WHERE "name" = 'Scapula flexión inclinado' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '3011' );
UPDATE "ExerciseGlobal" SET "name" = 'Flexión de brazos escapular inclinado', "searchName" = CASE WHEN "searchName" LIKE 'scapula flexion inclinado%' THEN 'flexion de brazos escapular inclinado' || substr( "searchName", 26 ) ELSE "searchName" END
WHERE "externalId" = '3011' AND "name" = 'Scapula flexión inclinado';

UPDATE "ExerciseCoach" SET "name" = 'Sentadilla acostado en máquina', "searchName" = CASE WHEN "searchName" LIKE 'sentadilla acostado con trineo%' THEN 'sentadilla acostado en maquina' || substr( "searchName", 31 ) ELSE "searchName" END
WHERE "name" = 'Sentadilla acostado con trineo' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0744' );
UPDATE "ExerciseGlobal" SET "name" = 'Sentadilla acostado en máquina', "searchName" = CASE WHEN "searchName" LIKE 'sentadilla acostado con trineo%' THEN 'sentadilla acostado en maquina' || substr( "searchName", 31 ) ELSE "searchName" END
WHERE "externalId" = '0744' AND "name" = 'Sentadilla acostado con trineo';

UPDATE "ExerciseCoach" SET "name" = 'Sentadilla hack cerrada en máquina', "searchName" = CASE WHEN "searchName" LIKE 'sentadilla hack cerrada con trineo%' THEN 'sentadilla hack cerrada en maquina' || substr( "searchName", 35 ) ELSE "searchName" END
WHERE "name" = 'Sentadilla hack cerrada con trineo' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0741' );
UPDATE "ExerciseGlobal" SET "name" = 'Sentadilla hack cerrada en máquina', "searchName" = CASE WHEN "searchName" LIKE 'sentadilla hack cerrada con trineo%' THEN 'sentadilla hack cerrada en maquina' || substr( "searchName", 35 ) ELSE "searchName" END
WHERE "externalId" = '0741' AND "name" = 'Sentadilla hack cerrada con trineo';

UPDATE "ExerciseCoach" SET "name" = 'Sentadilla salto paso estocada hacia atrás con barra', "searchName" = CASE WHEN "searchName" LIKE 'sentadilla salto paso zancada hacia atras con barra%' THEN 'sentadilla salto paso estocada hacia atras con barra' || substr( "searchName", 52 ) ELSE "searchName" END
WHERE "name" = 'Sentadilla salto paso zancada hacia atrás con barra' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '2798' );
UPDATE "ExerciseGlobal" SET "name" = 'Sentadilla salto paso estocada hacia atrás con barra', "searchName" = CASE WHEN "searchName" LIKE 'sentadilla salto paso zancada hacia atras con barra%' THEN 'sentadilla salto paso estocada hacia atras con barra' || substr( "searchName", 52 ) ELSE "searchName" END
WHERE "externalId" = '2798' AND "name" = 'Sentadilla salto paso zancada hacia atrás con barra';

UPDATE "ExerciseCoach" SET "name" = 'Encogimiento de hombros sin agarre en máquina', "searchName" = CASE WHEN "searchName" LIKE 'sin agarre encogimiento de hombros en maquina de palanca%' THEN 'encogimiento de hombros sin agarre en maquina' || substr( "searchName", 57 ) ELSE "searchName" END
WHERE "name" = 'Sin agarre encogimiento de hombros en máquina de palanca' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0580' );
UPDATE "ExerciseGlobal" SET "name" = 'Encogimiento de hombros sin agarre en máquina', "searchName" = CASE WHEN "searchName" LIKE 'sin agarre encogimiento de hombros en maquina de palanca%' THEN 'encogimiento de hombros sin agarre en maquina' || substr( "searchName", 57 ) ELSE "searchName" END
WHERE "externalId" = '0580' AND "name" = 'Sin agarre encogimiento de hombros en máquina de palanca';

UPDATE "ExerciseCoach" SET "name" = 'Encogimiento de hombros sin agarre (variante 2) en máquina', "searchName" = CASE WHEN "searchName" LIKE 'sin agarre encogimiento de hombros (variante 2) en maquina de palanca%' THEN 'encogimiento de hombros sin agarre (variante 2) en maquina' || substr( "searchName", 70 ) ELSE "searchName" END
WHERE "name" = 'Sin agarre encogimiento de hombros (variante 2) en máquina de palanca' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1439' );
UPDATE "ExerciseGlobal" SET "name" = 'Encogimiento de hombros sin agarre (variante 2) en máquina', "searchName" = CASE WHEN "searchName" LIKE 'sin agarre encogimiento de hombros (variante 2) en maquina de palanca%' THEN 'encogimiento de hombros sin agarre (variante 2) en maquina' || substr( "searchName", 70 ) ELSE "searchName" END
WHERE "externalId" = '1439' AND "name" = 'Sin agarre encogimiento de hombros (variante 2) en máquina de palanca';

UPDATE "ExerciseCoach" SET "name" = 'Subida al banco con estocada con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'subida al banco zancada con mancuerna%' THEN 'subida al banco con estocada con mancuerna' || substr( "searchName", 38 ) ELSE "searchName" END
WHERE "name" = 'Subida al banco zancada con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '2796' );
UPDATE "ExerciseGlobal" SET "name" = 'Subida al banco con estocada con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'subida al banco zancada con mancuerna%' THEN 'subida al banco con estocada con mancuerna' || substr( "searchName", 38 ) ELSE "searchName" END
WHERE "externalId" = '2796' AND "name" = 'Subida al banco zancada con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Peso muerto sumo con barra', "searchName" = CASE WHEN "searchName" LIKE 'sumo peso muerto con barra%' THEN 'peso muerto sumo con barra' || substr( "searchName", 27 ) ELSE "searchName" END
WHERE "name" = 'Sumo peso muerto con barra' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0117' );
UPDATE "ExerciseGlobal" SET "name" = 'Peso muerto sumo con barra', "searchName" = CASE WHEN "searchName" LIKE 'sumo peso muerto con barra%' THEN 'peso muerto sumo con barra' || substr( "searchName", 27 ) ELSE "searchName" END
WHERE "externalId" = '0117' AND "name" = 'Sumo peso muerto con barra';

UPDATE "ExerciseCoach" SET "name" = 'Sentadilla sumo en máquina Smith', "searchName" = CASE WHEN "searchName" LIKE 'sumo sentadilla en maquina smith%' THEN 'sentadilla sumo en maquina smith' || substr( "searchName", 33 ) ELSE "searchName" END
WHERE "name" = 'Sumo sentadilla en máquina Smith' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '3142' );
UPDATE "ExerciseGlobal" SET "name" = 'Sentadilla sumo en máquina Smith', "searchName" = CASE WHEN "searchName" LIKE 'sumo sentadilla en maquina smith%' THEN 'sentadilla sumo en maquina smith' || substr( "searchName", 33 ) ELSE "searchName" END
WHERE "externalId" = '3142' AND "name" = 'Sumo sentadilla en máquina Smith';

UPDATE "ExerciseCoach" SET "name" = 'Apertura inversa supino en polea', "searchName" = CASE WHEN "searchName" LIKE 'supino apertura inversa en polea%' THEN 'apertura inversa supino en polea' || substr( "searchName", 33 ) ELSE "searchName" END
WHERE "name" = 'Supino apertura inversa en polea' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0240' );
UPDATE "ExerciseGlobal" SET "name" = 'Apertura inversa supino en polea', "searchName" = CASE WHEN "searchName" LIKE 'supino apertura inversa en polea%' THEN 'apertura inversa supino en polea' || substr( "searchName", 33 ) ELSE "searchName" END
WHERE "externalId" = '0240' AND "name" = 'Supino apertura inversa en polea';

UPDATE "ExerciseCoach" SET "name" = 'Curl supino acostado con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'supino curl acostado con mancuerna%' THEN 'curl supino acostado con mancuerna' || substr( "searchName", 35 ) ELSE "searchName" END
WHERE "name" = 'Supino curl acostado con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0350' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl supino acostado con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'supino curl acostado con mancuerna%' THEN 'curl supino acostado con mancuerna' || substr( "searchName", 35 ) ELSE "searchName" END
WHERE "externalId" = '0350' AND "name" = 'Supino curl acostado con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Curl de bíceps supino acostado con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'supino curl de biceps acostado con mancuerna%' THEN 'curl de biceps supino acostado con mancuerna' || substr( "searchName", 45 ) ELSE "searchName" END
WHERE "name" = 'Supino curl de bíceps acostado con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1661' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl de bíceps supino acostado con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'supino curl de biceps acostado con mancuerna%' THEN 'curl de biceps supino acostado con mancuerna' || substr( "searchName", 45 ) ELSE "searchName" END
WHERE "externalId" = '1661' AND "name" = 'Supino curl de bíceps acostado con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Extensión de tríceps supino acostado a una mano con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'supino extension de triceps acostado a una mano con mancuerna%' THEN 'extension de triceps supino acostado a una mano con mancuerna' || substr( "searchName", 62 ) ELSE "searchName" END
WHERE "name" = 'Supino extensión de tríceps acostado a una mano con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0346' );
UPDATE "ExerciseGlobal" SET "name" = 'Extensión de tríceps supino acostado a una mano con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'supino extension de triceps acostado a una mano con mancuerna%' THEN 'extension de triceps supino acostado a una mano con mancuerna' || substr( "searchName", 62 ) ELSE "searchName" END
WHERE "externalId" = '0346' AND "name" = 'Supino extensión de tríceps acostado a una mano con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Extensión de tríceps supino sobre pelota suiza', "searchName" = CASE WHEN "searchName" LIKE 'supino extension de triceps sobre pelota suiza%' THEN 'extension de triceps supino sobre pelota suiza' || substr( "searchName", 47 ) ELSE "searchName" END
WHERE "name" = 'Supino extensión de tríceps sobre pelota suiza' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1746' );
UPDATE "ExerciseGlobal" SET "name" = 'Extensión de tríceps supino sobre pelota suiza', "searchName" = CASE WHEN "searchName" LIKE 'supino extension de triceps sobre pelota suiza%' THEN 'extension de triceps supino sobre pelota suiza' || substr( "searchName", 47 ) ELSE "searchName" END
WHERE "externalId" = '1746' AND "name" = 'Supino extensión de tríceps sobre pelota suiza';

UPDATE "ExerciseCoach" SET "name" = 'Jalón supino con banda', "searchName" = CASE WHEN "searchName" LIKE 'supino jalon con banda%' THEN 'jalon supino con banda' || substr( "searchName", 23 ) ELSE "searchName" END
WHERE "name" = 'Supino jalón con banda' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1013' );
UPDATE "ExerciseGlobal" SET "name" = 'Jalón supino con banda', "searchName" = CASE WHEN "searchName" LIKE 'supino jalon con banda%' THEN 'jalon supino con banda' || substr( "searchName", 23 ) ELSE "searchName" END
WHERE "externalId" = '1013' AND "name" = 'Supino jalón con banda';

UPDATE "ExerciseCoach" SET "name" = 'Jalón supino en polea', "searchName" = CASE WHEN "searchName" LIKE 'supino jalon en polea%' THEN 'jalon supino en polea' || substr( "searchName", 22 ) ELSE "searchName" END
WHERE "name" = 'Supino jalón en polea' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0245' );
UPDATE "ExerciseGlobal" SET "name" = 'Jalón supino en polea', "searchName" = CASE WHEN "searchName" LIKE 'supino jalon en polea%' THEN 'jalon supino en polea' || substr( "searchName", 22 ) ELSE "searchName" END
WHERE "externalId" = '0245' AND "name" = 'Supino jalón en polea';

UPDATE "ExerciseCoach" SET "name" = 'Flexión de brazos en suspensión', "searchName" = CASE WHEN "searchName" LIKE 'suspended flexion%' THEN 'flexion de brazos en suspension' || substr( "searchName", 18 ) ELSE "searchName" END
WHERE "name" = 'Suspended flexión' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0806' );
UPDATE "ExerciseGlobal" SET "name" = 'Flexión de brazos en suspensión', "searchName" = CASE WHEN "searchName" LIKE 'suspended flexion%' THEN 'flexion de brazos en suspension' || substr( "searchName", 18 ) ELSE "searchName" END
WHERE "externalId" = '0806' AND "name" = 'Suspended flexión';

UPDATE "ExerciseCoach" SET "name" = 'Remo en barra T en máquina', "searchName" = CASE WHEN "searchName" LIKE 't bar remo en maquina de palanca%' THEN 'remo en barra t en maquina' || substr( "searchName", 33 ) ELSE "searchName" END
WHERE "name" = 'T bar remo en máquina de palanca' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0606' );
UPDATE "ExerciseGlobal" SET "name" = 'Remo en barra T en máquina', "searchName" = CASE WHEN "searchName" LIKE 't bar remo en maquina de palanca%' THEN 'remo en barra t en maquina' || substr( "searchName", 33 ) ELSE "searchName" END
WHERE "externalId" = '0606' AND "name" = 'T bar remo en máquina de palanca';

UPDATE "ExerciseCoach" SET "name" = 'Remo a una mano con toalla', "searchName" = CASE WHEN "searchName" LIKE 'toalla remo a una mano%' THEN 'remo a una mano con toalla' || substr( "searchName", 23 ) ELSE "searchName" END
WHERE "name" = 'Toalla remo a una mano' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1773' );
UPDATE "ExerciseGlobal" SET "name" = 'Remo a una mano con toalla', "searchName" = CASE WHEN "searchName" LIKE 'toalla remo a una mano%' THEN 'remo a una mano con toalla' || substr( "searchName", 23 ) ELSE "searchName" END
WHERE "externalId" = '1773' AND "name" = 'Toalla remo a una mano';

UPDATE "ExerciseCoach" SET "name" = 'Peso muerto con barra hexagonal', "searchName" = CASE WHEN "searchName" LIKE 'trap bar peso muerto%' THEN 'peso muerto con barra hexagonal' || substr( "searchName", 21 ) ELSE "searchName" END
WHERE "name" = 'Trap bar peso muerto' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0811' );
UPDATE "ExerciseGlobal" SET "name" = 'Peso muerto con barra hexagonal', "searchName" = CASE WHEN "searchName" LIKE 'trap bar peso muerto%' THEN 'peso muerto con barra hexagonal' || substr( "searchName", 21 ) ELSE "searchName" END
WHERE "externalId" = '0811' AND "name" = 'Trap bar peso muerto';

UPDATE "ExerciseCoach" SET "name" = 'Press tras nuca de pie', "searchName" = CASE WHEN "searchName" LIKE 'tras nuca press de pie%' THEN 'press tras nuca de pie' || substr( "searchName", 23 ) ELSE "searchName" END
WHERE "name" = 'Tras nuca press de pie' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0788' );
UPDATE "ExerciseGlobal" SET "name" = 'Press tras nuca de pie', "searchName" = CASE WHEN "searchName" LIKE 'tras nuca press de pie%' THEN 'press tras nuca de pie' || substr( "searchName", 23 ) ELSE "searchName" END
WHERE "externalId" = '0788' AND "name" = 'Tras nuca press de pie';

UPDATE "ExerciseCoach" SET "name" = 'Press tras nuca en máquina Smith', "searchName" = CASE WHEN "searchName" LIKE 'tras nuca press en maquina smith%' THEN 'press tras nuca en maquina smith' || substr( "searchName", 33 ) ELSE "searchName" END
WHERE "name" = 'Tras nuca press en máquina Smith' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0747' );
UPDATE "ExerciseGlobal" SET "name" = 'Press tras nuca en máquina Smith', "searchName" = CASE WHEN "searchName" LIKE 'tras nuca press en maquina smith%' THEN 'press tras nuca en maquina smith' || substr( "searchName", 33 ) ELSE "searchName" END
WHERE "externalId" = '0747' AND "name" = 'Tras nuca press en máquina Smith';

UPDATE "ExerciseCoach" SET "name" = 'Extensión de tríceps hacia abajo a una mano en polea', "searchName" = CASE WHEN "searchName" LIKE 'triceps empuje hacia abajo a una mano en polea%' THEN 'extension de triceps hacia abajo a una mano en polea' || substr( "searchName", 47 ) ELSE "searchName" END
WHERE "name" = 'Tríceps empuje hacia abajo a una mano en polea' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1723' );
UPDATE "ExerciseGlobal" SET "name" = 'Extensión de tríceps hacia abajo a una mano en polea', "searchName" = CASE WHEN "searchName" LIKE 'triceps empuje hacia abajo a una mano en polea%' THEN 'extension de triceps hacia abajo a una mano en polea' || substr( "searchName", 47 ) ELSE "searchName" END
WHERE "externalId" = '1723' AND "name" = 'Tríceps empuje hacia abajo a una mano en polea';

UPDATE "ExerciseCoach" SET "name" = 'Elevación de piernas vertical (sobre paralelas)', "searchName" = CASE WHEN "searchName" LIKE 'vertical elevacion de piernas (sobre paralelas)%' THEN 'elevacion de piernas vertical (sobre paralelas)' || substr( "searchName", 48 ) ELSE "searchName" END
WHERE "name" = 'Vertical elevación de piernas (sobre paralelas)' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0826' );
UPDATE "ExerciseGlobal" SET "name" = 'Elevación de piernas vertical (sobre paralelas)', "searchName" = CASE WHEN "searchName" LIKE 'vertical elevacion de piernas (sobre paralelas)%' THEN 'elevacion de piernas vertical (sobre paralelas)' || substr( "searchName", 48 ) ELSE "searchName" END
WHERE "externalId" = '0826' AND "name" = 'Vertical elevación de piernas (sobre paralelas)';

UPDATE "ExerciseCoach" SET "name" = 'Estocada caminando', "searchName" = CASE WHEN "searchName" LIKE 'zancada caminando%' THEN 'estocada caminando' || substr( "searchName", 18 ) ELSE "searchName" END
WHERE "name" = 'Zancada caminando' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1460' );
UPDATE "ExerciseGlobal" SET "name" = 'Estocada caminando', "searchName" = CASE WHEN "searchName" LIKE 'zancada caminando%' THEN 'estocada caminando' || substr( "searchName", 18 ) ELSE "searchName" END
WHERE "externalId" = '1460' AND "name" = 'Zancada caminando';

UPDATE "ExerciseCoach" SET "name" = 'Estocada caminando con rodillas altas', "searchName" = CASE WHEN "searchName" LIKE 'zancada caminando con rodillas altas%' THEN 'estocada caminando con rodillas altas' || substr( "searchName", 37 ) ELSE "searchName" END
WHERE "name" = 'Zancada caminando con rodillas altas' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '3655' );
UPDATE "ExerciseGlobal" SET "name" = 'Estocada caminando con rodillas altas', "searchName" = CASE WHEN "searchName" LIKE 'zancada caminando con rodillas altas%' THEN 'estocada caminando con rodillas altas' || substr( "searchName", 37 ) ELSE "searchName" END
WHERE "externalId" = '3655' AND "name" = 'Zancada caminando con rodillas altas';

UPDATE "ExerciseCoach" SET "name" = 'Estocada con barra', "searchName" = CASE WHEN "searchName" LIKE 'zancada con barra%' THEN 'estocada con barra' || substr( "searchName", 18 ) ELSE "searchName" END
WHERE "name" = 'Zancada con barra' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0054' );
UPDATE "ExerciseGlobal" SET "name" = 'Estocada con barra', "searchName" = CASE WHEN "searchName" LIKE 'zancada con barra%' THEN 'estocada con barra' || substr( "searchName", 18 ) ELSE "searchName" END
WHERE "externalId" = '0054' AND "name" = 'Zancada con barra';

UPDATE "ExerciseCoach" SET "name" = 'Estocada con curl de bíceps con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'zancada con curl de biceps con mancuerna%' THEN 'estocada con curl de biceps con mancuerna' || substr( "searchName", 41 ) ELSE "searchName" END
WHERE "name" = 'Zancada con curl de bíceps con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1658' );
UPDATE "ExerciseGlobal" SET "name" = 'Estocada con curl de bíceps con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'zancada con curl de biceps con mancuerna%' THEN 'estocada con curl de biceps con mancuerna' || substr( "searchName", 41 ) ELSE "searchName" END
WHERE "externalId" = '1658' AND "name" = 'Zancada con curl de bíceps con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Estocada con giro', "searchName" = CASE WHEN "searchName" LIKE 'zancada con giro%' THEN 'estocada con giro' || substr( "searchName", 17 ) ELSE "searchName" END
WHERE "name" = 'Zancada con giro' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1688' );
UPDATE "ExerciseGlobal" SET "name" = 'Estocada con giro', "searchName" = CASE WHEN "searchName" LIKE 'zancada con giro%' THEN 'estocada con giro' || substr( "searchName", 17 ) ELSE "searchName" END
WHERE "externalId" = '1688' AND "name" = 'Zancada con giro';

UPDATE "ExerciseCoach" SET "name" = 'Estocada con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'zancada con mancuerna%' THEN 'estocada con mancuerna' || substr( "searchName", 22 ) ELSE "searchName" END
WHERE "name" = 'Zancada con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0336' );
UPDATE "ExerciseGlobal" SET "name" = 'Estocada con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'zancada con mancuerna%' THEN 'estocada con mancuerna' || substr( "searchName", 22 ) ELSE "searchName" END
WHERE "externalId" = '0336' AND "name" = 'Zancada con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Estocada con salto', "searchName" = CASE WHEN "searchName" LIKE 'zancada con salto%' THEN 'estocada con salto' || substr( "searchName", 18 ) ELSE "searchName" END
WHERE "name" = 'Zancada con salto' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '3582' );
UPDATE "ExerciseGlobal" SET "name" = 'Estocada con salto', "searchName" = CASE WHEN "searchName" LIKE 'zancada con salto%' THEN 'estocada con salto' || substr( "searchName", 18 ) ELSE "searchName" END
WHERE "externalId" = '3582' AND "name" = 'Zancada con salto';

UPDATE "ExerciseCoach" SET "name" = 'Estocada con swing con peso', "searchName" = CASE WHEN "searchName" LIKE 'zancada con swing con peso%' THEN 'estocada con swing con peso' || substr( "searchName", 27 ) ELSE "searchName" END
WHERE "name" = 'Zancada con swing con peso' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '3644' );
UPDATE "ExerciseGlobal" SET "name" = 'Estocada con swing con peso', "searchName" = CASE WHEN "searchName" LIKE 'zancada con swing con peso%' THEN 'estocada con swing con peso' || substr( "searchName", 27 ) ELSE "searchName" END
WHERE "externalId" = '3644' AND "name" = 'Zancada con swing con peso';

UPDATE "ExerciseCoach" SET "name" = 'Estocada en sprint en máquina Smith', "searchName" = CASE WHEN "searchName" LIKE 'zancada en sprint en maquina smith%' THEN 'estocada en sprint en maquina smith' || substr( "searchName", 35 ) ELSE "searchName" END
WHERE "name" = 'Zancada en sprint en máquina Smith' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0769' );
UPDATE "ExerciseGlobal" SET "name" = 'Estocada en sprint en máquina Smith', "searchName" = CASE WHEN "searchName" LIKE 'zancada en sprint en maquina smith%' THEN 'estocada en sprint en maquina smith' || substr( "searchName", 35 ) ELSE "searchName" END
WHERE "externalId" = '0769' AND "name" = 'Zancada en sprint en máquina Smith';

UPDATE "ExerciseCoach" SET "name" = 'Estocada hacia adelante', "searchName" = CASE WHEN "searchName" LIKE 'zancada hacia adelante%' THEN 'estocada hacia adelante' || substr( "searchName", 23 ) ELSE "searchName" END
WHERE "name" = 'Zancada hacia adelante' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '3470' );
UPDATE "ExerciseGlobal" SET "name" = 'Estocada hacia adelante', "searchName" = CASE WHEN "searchName" LIKE 'zancada hacia adelante%' THEN 'estocada hacia adelante' || substr( "searchName", 23 ) ELSE "searchName" END
WHERE "externalId" = '3470' AND "name" = 'Zancada hacia adelante';

UPDATE "ExerciseCoach" SET "name" = 'Estocada hacia adelante con extensión de tríceps con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'zancada hacia adelante con extension de triceps con mancuerna%' THEN 'estocada hacia adelante con extension de triceps con mancuerna' || substr( "searchName", 62 ) ELSE "searchName" END
WHERE "name" = 'Zancada hacia adelante con extensión de tríceps con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1732' );
UPDATE "ExerciseGlobal" SET "name" = 'Estocada hacia adelante con extensión de tríceps con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'zancada hacia adelante con extension de triceps con mancuerna%' THEN 'estocada hacia adelante con extension de triceps con mancuerna' || substr( "searchName", 62 ) ELSE "searchName" END
WHERE "externalId" = '1732' AND "name" = 'Zancada hacia adelante con extensión de tríceps con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Estocada hacia adelante contralateral con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'zancada hacia adelante contralateral con mancuerna%' THEN 'estocada hacia adelante contralateral con mancuerna' || substr( "searchName", 51 ) ELSE "searchName" END
WHERE "name" = 'Zancada hacia adelante contralateral con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '3635' );
UPDATE "ExerciseGlobal" SET "name" = 'Estocada hacia adelante contralateral con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'zancada hacia adelante contralateral con mancuerna%' THEN 'estocada hacia adelante contralateral con mancuerna' || substr( "searchName", 51 ) ELSE "searchName" END
WHERE "externalId" = '3635' AND "name" = 'Zancada hacia adelante contralateral con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Estocada hacia atrás con barra', "searchName" = CASE WHEN "searchName" LIKE 'zancada hacia atras con barra%' THEN 'estocada hacia atras con barra' || substr( "searchName", 30 ) ELSE "searchName" END
WHERE "name" = 'Zancada hacia atrás con barra' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0078' );
UPDATE "ExerciseGlobal" SET "name" = 'Estocada hacia atrás con barra', "searchName" = CASE WHEN "searchName" LIKE 'zancada hacia atras con barra%' THEN 'estocada hacia atras con barra' || substr( "searchName", 30 ) ELSE "searchName" END
WHERE "externalId" = '0078' AND "name" = 'Zancada hacia atrás con barra';

UPDATE "ExerciseCoach" SET "name" = 'Estocada hacia atrás con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'zancada hacia atras con mancuerna%' THEN 'estocada hacia atras con mancuerna' || substr( "searchName", 34 ) ELSE "searchName" END
WHERE "name" = 'Zancada hacia atrás con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0381' );
UPDATE "ExerciseGlobal" SET "name" = 'Estocada hacia atrás con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'zancada hacia atras con mancuerna%' THEN 'estocada hacia atras con mancuerna' || substr( "searchName", 34 ) ELSE "searchName" END
WHERE "externalId" = '0381' AND "name" = 'Zancada hacia atrás con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Estocada hacia atrás (variante 2) con barra', "searchName" = CASE WHEN "searchName" LIKE 'zancada hacia atras (variante 2) con barra%' THEN 'estocada hacia atras (variante 2) con barra' || substr( "searchName", 43 ) ELSE "searchName" END
WHERE "name" = 'Zancada hacia atrás (variante 2) con barra' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0077' );
UPDATE "ExerciseGlobal" SET "name" = 'Estocada hacia atrás (variante 2) con barra', "searchName" = CASE WHEN "searchName" LIKE 'zancada hacia atras (variante 2) con barra%' THEN 'estocada hacia atras (variante 2) con barra' || substr( "searchName", 43 ) ELSE "searchName" END
WHERE "externalId" = '0077' AND "name" = 'Zancada hacia atrás (variante 2) con barra';

UPDATE "ExerciseCoach" SET "name" = 'Estocada lateral con barra', "searchName" = CASE WHEN "searchName" LIKE 'zancada lateral con barra%' THEN 'estocada lateral con barra' || substr( "searchName", 26 ) ELSE "searchName" END
WHERE "name" = 'Zancada lateral con barra' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1410' );
UPDATE "ExerciseGlobal" SET "name" = 'Estocada lateral con barra', "searchName" = CASE WHEN "searchName" LIKE 'zancada lateral con barra%' THEN 'estocada lateral con barra' || substr( "searchName", 26 ) ELSE "searchName" END
WHERE "externalId" = '1410' AND "name" = 'Zancada lateral con barra';

UPDATE "ExerciseCoach" SET "name" = 'Estocada pass-through con pesa rusa', "searchName" = CASE WHEN "searchName" LIKE 'zancada pass-through con pesa rusa%' THEN 'estocada pass-through con pesa rusa' || substr( "searchName", 35 ) ELSE "searchName" END
WHERE "name" = 'Zancada pass-through con pesa rusa' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0536' );
UPDATE "ExerciseGlobal" SET "name" = 'Estocada pass-through con pesa rusa', "searchName" = CASE WHEN "searchName" LIKE 'zancada pass-through con pesa rusa%' THEN 'estocada pass-through con pesa rusa' || substr( "searchName", 35 ) ELSE "searchName" END
WHERE "externalId" = '0536' AND "name" = 'Zancada pass-through con pesa rusa';
