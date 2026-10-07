-- El marcador (variante N) va al final del nombre, y adjetivos en femenino cuando describen al ejercicio.
-- Cada ejercicio se identifica por su codigo (externalId), que no se repite.
--
-- El texto de busqueda (searchName) empieza con el nombre sin acentos: se
-- reemplaza solo ese comienzo, no las apariciones dentro de las instrucciones.
--
-- La copia de cada entrenador se renombra solo si conserva el nombre original;
-- si el entrenador le puso un nombre propio, no se toca.

UPDATE "ExerciseCoach" SET "name" = 'Apertura de pecho declinada a una mano en polea', "searchName" = CASE WHEN "searchName" LIKE 'apertura de pecho declinado a una mano en polea%' THEN 'apertura de pecho declinada a una mano en polea' || substr( "searchName", 48 ) ELSE "searchName" END
WHERE "name" = 'Apertura de pecho declinado a una mano en polea' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1262' );
UPDATE "ExerciseGlobal" SET "name" = 'Apertura de pecho declinada a una mano en polea', "searchName" = CASE WHEN "searchName" LIKE 'apertura de pecho declinado a una mano en polea%' THEN 'apertura de pecho declinada a una mano en polea' || substr( "searchName", 48 ) ELSE "searchName" END
WHERE "externalId" = '1262' AND "name" = 'Apertura de pecho declinado a una mano en polea';

UPDATE "ExerciseCoach" SET "name" = 'Apertura inclinada en pelota suiza a una mano con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'apertura en pelota suiza inclinado a una mano con mancuerna%' THEN 'apertura inclinada en pelota suiza a una mano con mancuerna' || substr( "searchName", 60 ) ELSE "searchName" END
WHERE "name" = 'Apertura en pelota suiza inclinado a una mano con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1280' );
UPDATE "ExerciseGlobal" SET "name" = 'Apertura inclinada en pelota suiza a una mano con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'apertura en pelota suiza inclinado a una mano con mancuerna%' THEN 'apertura inclinada en pelota suiza a una mano con mancuerna' || substr( "searchName", 60 ) ELSE "searchName" END
WHERE "externalId" = '1280' AND "name" = 'Apertura en pelota suiza inclinado a una mano con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Apertura inclinada con mancuernas (variante 2)', "searchName" = CASE WHEN "searchName" LIKE 'apertura inclinada (variante 2) con mancuernas%' THEN 'apertura inclinada con mancuernas (variante 2)' || substr( "searchName", 47 ) ELSE "searchName" END
WHERE "name" = 'Apertura inclinada (variante 2) con mancuernas' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0316' );
UPDATE "ExerciseGlobal" SET "name" = 'Apertura inclinada con mancuernas (variante 2)', "searchName" = CASE WHEN "searchName" LIKE 'apertura inclinada (variante 2) con mancuernas%' THEN 'apertura inclinada con mancuernas (variante 2)' || substr( "searchName", 47 ) ELSE "searchName" END
WHERE "externalId" = '0316' AND "name" = 'Apertura inclinada (variante 2) con mancuernas';

UPDATE "ExerciseCoach" SET "name" = 'Arnold press con mancuernas (variante 2)', "searchName" = CASE WHEN "searchName" LIKE 'arnold press (variante 2) con mancuernas%' THEN 'arnold press con mancuernas (variante 2)' || substr( "searchName", 41 ) ELSE "searchName" END
WHERE "name" = 'Arnold press (variante 2) con mancuernas' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0287' );
UPDATE "ExerciseGlobal" SET "name" = 'Arnold press con mancuernas (variante 2)', "searchName" = CASE WHEN "searchName" LIKE 'arnold press (variante 2) con mancuernas%' THEN 'arnold press con mancuernas (variante 2)' || substr( "searchName", 41 ) ELSE "searchName" END
WHERE "externalId" = '0287' AND "name" = 'Arnold press (variante 2) con mancuernas';

UPDATE "ExerciseCoach" SET "name" = 'Crunch sentado en máquina (variante 3)', "searchName" = CASE WHEN "searchName" LIKE 'crunch (variante 2) sentado en maquina%' THEN 'crunch sentado en maquina (variante 3)' || substr( "searchName", 39 ) ELSE "searchName" END
WHERE "name" = 'Crunch (variante 2) sentado en máquina' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '3760' );
UPDATE "ExerciseGlobal" SET "name" = 'Crunch sentado en máquina (variante 3)', "searchName" = CASE WHEN "searchName" LIKE 'crunch (variante 2) sentado en maquina%' THEN 'crunch sentado en maquina (variante 3)' || substr( "searchName", 39 ) ELSE "searchName" END
WHERE "externalId" = '3760' AND "name" = 'Crunch (variante 2) sentado en máquina';

UPDATE "ExerciseCoach" SET "name" = 'Cuban press con mancuernas (variante 2)', "searchName" = CASE WHEN "searchName" LIKE 'cuban press (variante 2) con mancuernas%' THEN 'cuban press con mancuernas (variante 2)' || substr( "searchName", 40 ) ELSE "searchName" END
WHERE "name" = 'Cuban press (variante 2) con mancuernas' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '2136' );
UPDATE "ExerciseGlobal" SET "name" = 'Cuban press con mancuernas (variante 2)', "searchName" = CASE WHEN "searchName" LIKE 'cuban press (variante 2) con mancuernas%' THEN 'cuban press con mancuernas (variante 2)' || substr( "searchName", 40 ) ELSE "searchName" END
WHERE "externalId" = '2136' AND "name" = 'Cuban press (variante 2) con mancuernas';

UPDATE "ExerciseCoach" SET "name" = 'Curl de muñeca con barra (variante 2)', "searchName" = CASE WHEN "searchName" LIKE 'curl de muneca (variante 2) con barra%' THEN 'curl de muneca con barra (variante 2)' || substr( "searchName", 38 ) ELSE "searchName" END
WHERE "name" = 'Curl de muñeca (variante 2) con barra' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0125' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl de muñeca con barra (variante 2)', "searchName" = CASE WHEN "searchName" LIKE 'curl de muneca (variante 2) con barra%' THEN 'curl de muneca con barra (variante 2)' || substr( "searchName", 38 ) ELSE "searchName" END
WHERE "externalId" = '0125' AND "name" = 'Curl de muñeca (variante 2) con barra';

UPDATE "ExerciseCoach" SET "name" = 'Curl en banco Scott en máquina (variante 2)', "searchName" = CASE WHEN "searchName" LIKE 'curl en banco scott (variante 2) en maquina%' THEN 'curl en banco scott en maquina (variante 2)' || substr( "searchName", 44 ) ELSE "searchName" END
WHERE "name" = 'Curl en banco Scott (variante 2) en máquina' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1614' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl en banco Scott en máquina (variante 2)', "searchName" = CASE WHEN "searchName" LIKE 'curl en banco scott (variante 2) en maquina%' THEN 'curl en banco scott en maquina (variante 2)' || substr( "searchName", 44 ) ELSE "searchName" END
WHERE "externalId" = '1614' AND "name" = 'Curl en banco Scott (variante 2) en máquina';

UPDATE "ExerciseCoach" SET "name" = 'Curl interior de bíceps de pie con mancuernas (variante 2)', "searchName" = CASE WHEN "searchName" LIKE 'curl interior de biceps de pie (variante 2) con mancuernas%' THEN 'curl interior de biceps de pie con mancuernas (variante 2)' || substr( "searchName", 59 ) ELSE "searchName" END
WHERE "name" = 'Curl interior de bíceps de pie (variante 2) con mancuernas' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '2321' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl interior de bíceps de pie con mancuernas (variante 2)', "searchName" = CASE WHEN "searchName" LIKE 'curl interior de biceps de pie (variante 2) con mancuernas%' THEN 'curl interior de biceps de pie con mancuernas (variante 2)' || substr( "searchName", 59 ) ELSE "searchName" END
WHERE "externalId" = '2321' AND "name" = 'Curl interior de bíceps de pie (variante 2) con mancuernas';

UPDATE "ExerciseCoach" SET "name" = 'Curl inverso de muñeca con barra (variante 2)', "searchName" = CASE WHEN "searchName" LIKE 'curl inverso de muneca (variante 2) con barra%' THEN 'curl inverso de muneca con barra (variante 2)' || substr( "searchName", 46 ) ELSE "searchName" END
WHERE "name" = 'Curl inverso de muñeca (variante 2) con barra' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0079' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl inverso de muñeca con barra (variante 2)', "searchName" = CASE WHEN "searchName" LIKE 'curl inverso de muneca (variante 2) con barra%' THEN 'curl inverso de muneca con barra (variante 2)' || substr( "searchName", 46 ) ELSE "searchName" END
WHERE "externalId" = '0079' AND "name" = 'Curl inverso de muñeca (variante 2) con barra';

UPDATE "ExerciseCoach" SET "name" = 'Curl martillo cruzado con mancuernas (variante 2)', "searchName" = CASE WHEN "searchName" LIKE 'curl martillo cruzado (variante 2) con mancuernas%' THEN 'curl martillo cruzado con mancuernas (variante 2)' || substr( "searchName", 50 ) ELSE "searchName" END
WHERE "name" = 'Curl martillo cruzado (variante 2) con mancuernas' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1657' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl martillo cruzado con mancuernas (variante 2)', "searchName" = CASE WHEN "searchName" LIKE 'curl martillo cruzado (variante 2) con mancuernas%' THEN 'curl martillo cruzado con mancuernas (variante 2)' || substr( "searchName", 50 ) ELSE "searchName" END
WHERE "externalId" = '1657' AND "name" = 'Curl martillo cruzado (variante 2) con mancuernas';

UPDATE "ExerciseCoach" SET "name" = 'Curl martillo con mancuernas (variante 2)', "searchName" = CASE WHEN "searchName" LIKE 'curl martillo (variante 2) con mancuernas%' THEN 'curl martillo con mancuernas (variante 2)' || substr( "searchName", 42 ) ELSE "searchName" END
WHERE "name" = 'Curl martillo (variante 2) con mancuernas' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0312' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl martillo con mancuernas (variante 2)', "searchName" = CASE WHEN "searchName" LIKE 'curl martillo (variante 2) con mancuernas%' THEN 'curl martillo con mancuernas (variante 2)' || substr( "searchName", 42 ) ELSE "searchName" END
WHERE "externalId" = '0312' AND "name" = 'Curl martillo (variante 2) con mancuernas';

UPDATE "ExerciseCoach" SET "name" = 'Curl inclinado con mancuernas (variante 2)', "searchName" = CASE WHEN "searchName" LIKE 'curl (variante 2) inclinado con mancuernas%' THEN 'curl inclinado con mancuernas (variante 2)' || substr( "searchName", 43 ) ELSE "searchName" END
WHERE "name" = 'Curl (variante 2) inclinado con mancuernas' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0317' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl inclinado con mancuernas (variante 2)', "searchName" = CASE WHEN "searchName" LIKE 'curl (variante 2) inclinado con mancuernas%' THEN 'curl inclinado con mancuernas (variante 2)' || substr( "searchName", 43 ) ELSE "searchName" END
WHERE "externalId" = '0317' AND "name" = 'Curl (variante 2) inclinado con mancuernas';

UPDATE "ExerciseCoach" SET "name" = 'Elevación de hombros inclinada con barra', "searchName" = CASE WHEN "searchName" LIKE 'elevacion de hombros inclinado con barra%' THEN 'elevacion de hombros inclinada con barra' || substr( "searchName", 41 ) ELSE "searchName" END
WHERE "name" = 'Elevación de hombros inclinado con barra' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0050' );
UPDATE "ExerciseGlobal" SET "name" = 'Elevación de hombros inclinada con barra', "searchName" = CASE WHEN "searchName" LIKE 'elevacion de hombros inclinado con barra%' THEN 'elevacion de hombros inclinada con barra' || substr( "searchName", 41 ) ELSE "searchName" END
WHERE "externalId" = '0050' AND "name" = 'Elevación de hombros inclinado con barra';

UPDATE "ExerciseCoach" SET "name" = 'Elevación de hombros inclinada con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'elevacion de hombros inclinado con mancuernas%' THEN 'elevacion de hombros inclinada con mancuernas' || substr( "searchName", 46 ) ELSE "searchName" END
WHERE "name" = 'Elevación de hombros inclinado con mancuernas' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0328' );
UPDATE "ExerciseGlobal" SET "name" = 'Elevación de hombros inclinada con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'elevacion de hombros inclinado con mancuernas%' THEN 'elevacion de hombros inclinada con mancuernas' || substr( "searchName", 46 ) ELSE "searchName" END
WHERE "externalId" = '0328' AND "name" = 'Elevación de hombros inclinado con mancuernas';

UPDATE "ExerciseCoach" SET "name" = 'Elevación de piernas alternada sentado con barra', "searchName" = CASE WHEN "searchName" LIKE 'elevacion de piernas sentado alternado con barra%' THEN 'elevacion de piernas alternada sentado con barra' || substr( "searchName", 49 ) ELSE "searchName" END
WHERE "name" = 'Elevación de piernas sentado alternado con barra' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '2799' );
UPDATE "ExerciseGlobal" SET "name" = 'Elevación de piernas alternada sentado con barra', "searchName" = CASE WHEN "searchName" LIKE 'elevacion de piernas sentado alternado con barra%' THEN 'elevacion de piernas alternada sentado con barra' || substr( "searchName", 49 ) ELSE "searchName" END
WHERE "externalId" = '2799' AND "name" = 'Elevación de piernas sentado alternado con barra';

UPDATE "ExerciseCoach" SET "name" = 'Elevación de piernas alternada sentado con barra (modelo mujer)', "searchName" = CASE WHEN "searchName" LIKE 'elevacion de piernas sentado alternado con barra (modelo mujer)%' THEN 'elevacion de piernas alternada sentado con barra (modelo mujer)' || substr( "searchName", 64 ) ELSE "searchName" END
WHERE "name" = 'Elevación de piernas sentado alternado con barra (modelo mujer)' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '2800' );
UPDATE "ExerciseGlobal" SET "name" = 'Elevación de piernas alternada sentado con barra (modelo mujer)', "searchName" = CASE WHEN "searchName" LIKE 'elevacion de piernas sentado alternado con barra (modelo mujer)%' THEN 'elevacion de piernas alternada sentado con barra (modelo mujer)' || substr( "searchName", 64 ) ELSE "searchName" END
WHERE "externalId" = '2800' AND "name" = 'Elevación de piernas sentado alternado con barra (modelo mujer)';

UPDATE "ExerciseCoach" SET "name" = 'Elevación frontal con mancuernas (variante 2)', "searchName" = CASE WHEN "searchName" LIKE 'elevacion frontal (variante 2) con mancuernas%' THEN 'elevacion frontal con mancuernas (variante 2)' || substr( "searchName", 46 ) ELSE "searchName" END
WHERE "name" = 'Elevación frontal (variante 2) con mancuernas' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0309' );
UPDATE "ExerciseGlobal" SET "name" = 'Elevación frontal con mancuernas (variante 2)', "searchName" = CASE WHEN "searchName" LIKE 'elevacion frontal (variante 2) con mancuernas%' THEN 'elevacion frontal con mancuernas (variante 2)' || substr( "searchName", 46 ) ELSE "searchName" END
WHERE "externalId" = '0309' AND "name" = 'Elevación frontal (variante 2) con mancuernas';

UPDATE "ExerciseCoach" SET "name" = 'Elevación lateral posterior inclinada con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'elevacion lateral inclinado posterior con mancuernas%' THEN 'elevacion lateral posterior inclinada con mancuernas' || substr( "searchName", 53 ) ELSE "searchName" END
WHERE "name" = 'Elevación lateral inclinado posterior con mancuernas' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0326' );
UPDATE "ExerciseGlobal" SET "name" = 'Elevación lateral posterior inclinada con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'elevacion lateral inclinado posterior con mancuernas%' THEN 'elevacion lateral posterior inclinada con mancuernas' || substr( "searchName", 53 ) ELSE "searchName" END
WHERE "externalId" = '0326' AND "name" = 'Elevación lateral inclinado posterior con mancuernas';

UPDATE "ExerciseCoach" SET "name" = 'Elevación lateral sentado con mancuernas (variante 2)', "searchName" = CASE WHEN "searchName" LIKE 'elevacion lateral (variante 2) sentado con mancuernas%' THEN 'elevacion lateral sentado con mancuernas (variante 2)' || substr( "searchName", 54 ) ELSE "searchName" END
WHERE "name" = 'Elevación lateral (variante 2) sentado con mancuernas' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0395' );
UPDATE "ExerciseGlobal" SET "name" = 'Elevación lateral sentado con mancuernas (variante 2)', "searchName" = CASE WHEN "searchName" LIKE 'elevacion lateral (variante 2) sentado con mancuernas%' THEN 'elevacion lateral sentado con mancuernas (variante 2)' || substr( "searchName", 54 ) ELSE "searchName" END
WHERE "externalId" = '0395' AND "name" = 'Elevación lateral (variante 2) sentado con mancuernas';

UPDATE "ExerciseCoach" SET "name" = 'Encogimiento de hombros sin agarre en máquina (variante 2)', "searchName" = CASE WHEN "searchName" LIKE 'encogimiento de hombros sin agarre (variante 2) en maquina%' THEN 'encogimiento de hombros sin agarre en maquina (variante 2)' || substr( "searchName", 59 ) ELSE "searchName" END
WHERE "name" = 'Encogimiento de hombros sin agarre (variante 2) en máquina' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1439' );
UPDATE "ExerciseGlobal" SET "name" = 'Encogimiento de hombros sin agarre en máquina (variante 2)', "searchName" = CASE WHEN "searchName" LIKE 'encogimiento de hombros sin agarre (variante 2) en maquina%' THEN 'encogimiento de hombros sin agarre en maquina (variante 2)' || substr( "searchName", 59 ) ELSE "searchName" END
WHERE "externalId" = '1439' AND "name" = 'Encogimiento de hombros sin agarre (variante 2) en máquina';

UPDATE "ExerciseCoach" SET "name" = 'Encogimiento de hombros declinado con mancuernas (variante 2)', "searchName" = CASE WHEN "searchName" LIKE 'encogimiento de hombros (variante 2) declinado con mancuernas%' THEN 'encogimiento de hombros declinado con mancuernas (variante 2)' || substr( "searchName", 62 ) ELSE "searchName" END
WHERE "name" = 'Encogimiento de hombros (variante 2) declinado con mancuernas' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0304' );
UPDATE "ExerciseGlobal" SET "name" = 'Encogimiento de hombros declinado con mancuernas (variante 2)', "searchName" = CASE WHEN "searchName" LIKE 'encogimiento de hombros (variante 2) declinado con mancuernas%' THEN 'encogimiento de hombros declinado con mancuernas (variante 2)' || substr( "searchName", 62 ) ELSE "searchName" END
WHERE "externalId" = '0304' AND "name" = 'Encogimiento de hombros (variante 2) declinado con mancuernas';

UPDATE "ExerciseCoach" SET "name" = 'Estocada hacia atrás con barra (variante 2)', "searchName" = CASE WHEN "searchName" LIKE 'estocada hacia atras (variante 2) con barra%' THEN 'estocada hacia atras con barra (variante 2)' || substr( "searchName", 44 ) ELSE "searchName" END
WHERE "name" = 'Estocada hacia atrás (variante 2) con barra' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0077' );
UPDATE "ExerciseGlobal" SET "name" = 'Estocada hacia atrás con barra (variante 2)', "searchName" = CASE WHEN "searchName" LIKE 'estocada hacia atras (variante 2) con barra%' THEN 'estocada hacia atras con barra (variante 2)' || substr( "searchName", 44 ) ELSE "searchName" END
WHERE "externalId" = '0077' AND "name" = 'Estocada hacia atrás (variante 2) con barra';

UPDATE "ExerciseCoach" SET "name" = 'Extensión alternada acostado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'extension acostado alternado con mancuernas%' THEN 'extension alternada acostado con mancuernas' || substr( "searchName", 44 ) ELSE "searchName" END
WHERE "name" = 'Extensión acostado alternado con mancuernas' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1729' );
UPDATE "ExerciseGlobal" SET "name" = 'Extensión alternada acostado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'extension acostado alternado con mancuernas%' THEN 'extension alternada acostado con mancuernas' || substr( "searchName", 44 ) ELSE "searchName" END
WHERE "externalId" = '1729' AND "name" = 'Extensión acostado alternado con mancuernas';

UPDATE "ExerciseCoach" SET "name" = 'Extensión de cadera en máquina (variante 2)', "searchName" = CASE WHEN "searchName" LIKE 'extension de cadera (variante 2) en maquina%' THEN 'extension de cadera en maquina (variante 2)' || substr( "searchName", 44 ) ELSE "searchName" END
WHERE "name" = 'Extensión de cadera (variante 2) en máquina' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '2286' );
UPDATE "ExerciseGlobal" SET "name" = 'Extensión de cadera en máquina (variante 2)', "searchName" = CASE WHEN "searchName" LIKE 'extension de cadera (variante 2) en maquina%' THEN 'extension de cadera en maquina (variante 2)' || substr( "searchName", 44 ) ELSE "searchName" END
WHERE "externalId" = '2286' AND "name" = 'Extensión de cadera (variante 2) en máquina';

UPDATE "ExerciseCoach" SET "name" = 'Extensión de tríceps alternada en polea', "searchName" = CASE WHEN "searchName" LIKE 'extension de triceps alternado en polea%' THEN 'extension de triceps alternada en polea' || substr( "searchName", 40 ) ELSE "searchName" END
WHERE "name" = 'Extensión de tríceps alternado en polea' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0149' );
UPDATE "ExerciseGlobal" SET "name" = 'Extensión de tríceps alternada en polea', "searchName" = CASE WHEN "searchName" LIKE 'extension de triceps alternado en polea%' THEN 'extension de triceps alternada en polea' || substr( "searchName", 40 ) ELSE "searchName" END
WHERE "externalId" = '0149' AND "name" = 'Extensión de tríceps alternado en polea';

UPDATE "ExerciseCoach" SET "name" = 'Extensión de tríceps declinada con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'extension de triceps declinado con mancuernas%' THEN 'extension de triceps declinada con mancuernas' || substr( "searchName", 46 ) ELSE "searchName" END
WHERE "name" = 'Extensión de tríceps declinado con mancuernas' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0306' );
UPDATE "ExerciseGlobal" SET "name" = 'Extensión de tríceps declinada con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'extension de triceps declinado con mancuernas%' THEN 'extension de triceps declinada con mancuernas' || substr( "searchName", 46 ) ELSE "searchName" END
WHERE "externalId" = '0306' AND "name" = 'Extensión de tríceps declinado con mancuernas';

UPDATE "ExerciseCoach" SET "name" = 'Extensión de tríceps inclinada con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'extension de triceps inclinado con mancuernas%' THEN 'extension de triceps inclinada con mancuernas' || substr( "searchName", 46 ) ELSE "searchName" END
WHERE "name" = 'Extensión de tríceps inclinado con mancuernas' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0330' );
UPDATE "ExerciseGlobal" SET "name" = 'Extensión de tríceps inclinada con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'extension de triceps inclinado con mancuernas%' THEN 'extension de triceps inclinada con mancuernas' || substr( "searchName", 46 ) ELSE "searchName" END
WHERE "externalId" = '0330' AND "name" = 'Extensión de tríceps inclinado con mancuernas';

UPDATE "ExerciseCoach" SET "name" = 'Extensión de tríceps inclinada en polea', "searchName" = CASE WHEN "searchName" LIKE 'extension de triceps inclinado en polea%' THEN 'extension de triceps inclinada en polea' || substr( "searchName", 40 ) ELSE "searchName" END
WHERE "name" = 'Extensión de tríceps inclinado en polea' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0173' );
UPDATE "ExerciseGlobal" SET "name" = 'Extensión de tríceps inclinada en polea', "searchName" = CASE WHEN "searchName" LIKE 'extension de triceps inclinado en polea%' THEN 'extension de triceps inclinada en polea' || substr( "searchName", 40 ) ELSE "searchName" END
WHERE "externalId" = '0173' AND "name" = 'Extensión de tríceps inclinado en polea';

UPDATE "ExerciseCoach" SET "name" = 'Extensión de tríceps inclinada en Smith', "searchName" = CASE WHEN "searchName" LIKE 'extension de triceps inclinado en smith%' THEN 'extension de triceps inclinada en smith' || substr( "searchName", 40 ) ELSE "searchName" END
WHERE "name" = 'Extensión de tríceps inclinado en Smith' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1752' );
UPDATE "ExerciseGlobal" SET "name" = 'Extensión de tríceps inclinada en Smith', "searchName" = CASE WHEN "searchName" LIKE 'extension de triceps inclinado en smith%' THEN 'extension de triceps inclinada en smith' || substr( "searchName", 40 ) ELSE "searchName" END
WHERE "externalId" = '1752' AND "name" = 'Extensión de tríceps inclinado en Smith';

UPDATE "ExerciseCoach" SET "name" = 'Extensión de tríceps acostado en polea (variante 2)', "searchName" = CASE WHEN "searchName" LIKE 'extension de triceps (variante 2) acostado en polea%' THEN 'extension de triceps acostado en polea (variante 2)' || substr( "searchName", 52 ) ELSE "searchName" END
WHERE "name" = 'Extensión de tríceps (variante 2) acostado en polea' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0186' );
UPDATE "ExerciseGlobal" SET "name" = 'Extensión de tríceps acostado en polea (variante 2)', "searchName" = CASE WHEN "searchName" LIKE 'extension de triceps (variante 2) acostado en polea%' THEN 'extension de triceps acostado en polea (variante 2)' || substr( "searchName", 52 ) ELSE "searchName" END
WHERE "externalId" = '0186' AND "name" = 'Extensión de tríceps (variante 2) acostado en polea';

UPDATE "ExerciseCoach" SET "name" = 'Flexión de brazos inclinada con agarre cerrado', "searchName" = CASE WHEN "searchName" LIKE 'flexion de brazos con agarre cerrado inclinado%' THEN 'flexion de brazos inclinada con agarre cerrado' || substr( "searchName", 47 ) ELSE "searchName" END
WHERE "name" = 'Flexión de brazos con agarre cerrado inclinado' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0490' );
UPDATE "ExerciseGlobal" SET "name" = 'Flexión de brazos inclinada con agarre cerrado', "searchName" = CASE WHEN "searchName" LIKE 'flexion de brazos con agarre cerrado inclinado%' THEN 'flexion de brazos inclinada con agarre cerrado' || substr( "searchName", 47 ) ELSE "searchName" END
WHERE "externalId" = '0490' AND "name" = 'Flexión de brazos con agarre cerrado inclinado';

UPDATE "ExerciseCoach" SET "name" = 'Flexión de brazos inclinada con agarre inverso', "searchName" = CASE WHEN "searchName" LIKE 'flexion de brazos con agarre inverso inclinado%' THEN 'flexion de brazos inclinada con agarre inverso' || substr( "searchName", 47 ) ELSE "searchName" END
WHERE "name" = 'Flexión de brazos con agarre inverso inclinado' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0494' );
UPDATE "ExerciseGlobal" SET "name" = 'Flexión de brazos inclinada con agarre inverso', "searchName" = CASE WHEN "searchName" LIKE 'flexion de brazos con agarre inverso inclinado%' THEN 'flexion de brazos inclinada con agarre inverso' || substr( "searchName", 47 ) ELSE "searchName" END
WHERE "externalId" = '0494' AND "name" = 'Flexión de brazos con agarre inverso inclinado';

UPDATE "ExerciseCoach" SET "name" = 'Flexión de brazos declinada', "searchName" = CASE WHEN "searchName" LIKE 'flexion de brazos declinado%' THEN 'flexion de brazos declinada' || substr( "searchName", 28 ) ELSE "searchName" END
WHERE "name" = 'Flexión de brazos declinado' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0279' );
UPDATE "ExerciseGlobal" SET "name" = 'Flexión de brazos declinada', "searchName" = CASE WHEN "searchName" LIKE 'flexion de brazos declinado%' THEN 'flexion de brazos declinada' || substr( "searchName", 28 ) ELSE "searchName" END
WHERE "externalId" = '0279' AND "name" = 'Flexión de brazos declinado';

UPDATE "ExerciseCoach" SET "name" = 'Flexión de brazos escapular inclinada', "searchName" = CASE WHEN "searchName" LIKE 'flexion de brazos escapular inclinado%' THEN 'flexion de brazos escapular inclinada' || substr( "searchName", 38 ) ELSE "searchName" END
WHERE "name" = 'Flexión de brazos escapular inclinado' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '3011' );
UPDATE "ExerciseGlobal" SET "name" = 'Flexión de brazos escapular inclinada', "searchName" = CASE WHEN "searchName" LIKE 'flexion de brazos escapular inclinado%' THEN 'flexion de brazos escapular inclinada' || substr( "searchName", 38 ) ELSE "searchName" END
WHERE "externalId" = '3011' AND "name" = 'Flexión de brazos escapular inclinado';

UPDATE "ExerciseCoach" SET "name" = 'Flexión de brazos inclinada', "searchName" = CASE WHEN "searchName" LIKE 'flexion de brazos inclinado%' THEN 'flexion de brazos inclinada' || substr( "searchName", 28 ) ELSE "searchName" END
WHERE "name" = 'Flexión de brazos inclinado' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0493' );
UPDATE "ExerciseGlobal" SET "name" = 'Flexión de brazos inclinada', "searchName" = CASE WHEN "searchName" LIKE 'flexion de brazos inclinado%' THEN 'flexion de brazos inclinada' || substr( "searchName", 28 ) ELSE "searchName" END
WHERE "externalId" = '0493' AND "name" = 'Flexión de brazos inclinado';

UPDATE "ExerciseCoach" SET "name" = 'Flexión de brazos inclinada con caída y salto', "searchName" = CASE WHEN "searchName" LIKE 'flexion de brazos inclinado con caida y salto%' THEN 'flexion de brazos inclinada con caida y salto' || substr( "searchName", 46 ) ELSE "searchName" END
WHERE "name" = 'Flexión de brazos inclinado con caída y salto' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0492' );
UPDATE "ExerciseGlobal" SET "name" = 'Flexión de brazos inclinada con caída y salto', "searchName" = CASE WHEN "searchName" LIKE 'flexion de brazos inclinado con caida y salto%' THEN 'flexion de brazos inclinada con caida y salto' || substr( "searchName", 46 ) ELSE "searchName" END
WHERE "externalId" = '0492' AND "name" = 'Flexión de brazos inclinado con caída y salto';

UPDATE "ExerciseCoach" SET "name" = 'Flexión de brazos inclinada (sobre cajón)', "searchName" = CASE WHEN "searchName" LIKE 'flexion de brazos inclinado (sobre cajon)%' THEN 'flexion de brazos inclinada (sobre cajon)' || substr( "searchName", 42 ) ELSE "searchName" END
WHERE "name" = 'Flexión de brazos inclinado (sobre cajón)' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '3785' );
UPDATE "ExerciseGlobal" SET "name" = 'Flexión de brazos inclinada (sobre cajón)', "searchName" = CASE WHEN "searchName" LIKE 'flexion de brazos inclinado (sobre cajon)%' THEN 'flexion de brazos inclinada (sobre cajon)' || substr( "searchName", 42 ) ELSE "searchName" END
WHERE "externalId" = '3785' AND "name" = 'Flexión de brazos inclinado (sobre cajón)';

UPDATE "ExerciseCoach" SET "name" = 'Flexión lateral con barra (variante 2)', "searchName" = CASE WHEN "searchName" LIKE 'flexion lateral (variante 2) con barra%' THEN 'flexion lateral con barra (variante 2)' || substr( "searchName", 39 ) ELSE "searchName" END
WHERE "name" = 'Flexión lateral (variante 2) con barra' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0096' );
UPDATE "ExerciseGlobal" SET "name" = 'Flexión lateral con barra (variante 2)', "searchName" = CASE WHEN "searchName" LIKE 'flexion lateral (variante 2) con barra%' THEN 'flexion lateral con barra (variante 2)' || substr( "searchName", 39 ) ELSE "searchName" END
WHERE "externalId" = '0096' AND "name" = 'Flexión lateral (variante 2) con barra';

UPDATE "ExerciseCoach" SET "name" = 'Giro ruso con peso (variante 2)', "searchName" = CASE WHEN "searchName" LIKE 'giro ruso (variante 2) con peso%' THEN 'giro ruso con peso (variante 2)' || substr( "searchName", 32 ) ELSE "searchName" END
WHERE "name" = 'Giro ruso (variante 2) con peso' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '2371' );
UPDATE "ExerciseGlobal" SET "name" = 'Giro ruso con peso (variante 2)', "searchName" = CASE WHEN "searchName" LIKE 'giro ruso (variante 2) con peso%' THEN 'giro ruso con peso (variante 2)' || substr( "searchName", 32 ) ELSE "searchName" END
WHERE "externalId" = '2371' AND "name" = 'Giro ruso (variante 2) con peso';

UPDATE "ExerciseCoach" SET "name" = 'Jalón con brazos rectos en polea (variante 2)', "searchName" = CASE WHEN "searchName" LIKE 'jalon con brazos rectos (variante 2) en polea%' THEN 'jalon con brazos rectos en polea (variante 2)' || substr( "searchName", 46 ) ELSE "searchName" END
WHERE "name" = 'Jalón con brazos rectos (variante 2) en polea' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0199' );
UPDATE "ExerciseGlobal" SET "name" = 'Jalón con brazos rectos en polea (variante 2)', "searchName" = CASE WHEN "searchName" LIKE 'jalon con brazos rectos (variante 2) en polea%' THEN 'jalon con brazos rectos en polea (variante 2)' || substr( "searchName", 46 ) ELSE "searchName" END
WHERE "externalId" = '0199' AND "name" = 'Jalón con brazos rectos (variante 2) en polea';

UPDATE "ExerciseCoach" SET "name" = 'Patada de tríceps alternada de pie con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'patada de triceps de pie alternado con mancuernas%' THEN 'patada de triceps alternada de pie con mancuernas' || substr( "searchName", 50 ) ELSE "searchName" END
WHERE "name" = 'Patada de tríceps de pie alternado con mancuernas' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1739' );
UPDATE "ExerciseGlobal" SET "name" = 'Patada de tríceps alternada de pie con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'patada de triceps de pie alternado con mancuernas%' THEN 'patada de triceps alternada de pie con mancuernas' || substr( "searchName", 50 ) ELSE "searchName" END
WHERE "externalId" = '1739' AND "name" = 'Patada de tríceps de pie alternado con mancuernas';

UPDATE "ExerciseCoach" SET "name" = 'Patada de tríceps alternada sentado inclinado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'patada de triceps sentado inclinado alternado con mancuernas%' THEN 'patada de triceps alternada sentado inclinado con mancuernas' || substr( "searchName", 61 ) ELSE "searchName" END
WHERE "name" = 'Patada de tríceps sentado inclinado alternado con mancuernas' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1730' );
UPDATE "ExerciseGlobal" SET "name" = 'Patada de tríceps alternada sentado inclinado con mancuernas', "searchName" = CASE WHEN "searchName" LIKE 'patada de triceps sentado inclinado alternado con mancuernas%' THEN 'patada de triceps alternada sentado inclinado con mancuernas' || substr( "searchName", 61 ) ELSE "searchName" END
WHERE "externalId" = '1730' AND "name" = 'Patada de tríceps sentado inclinado alternado con mancuernas';

UPDATE "ExerciseCoach" SET "name" = 'Prensa de piernas alternada en máquina', "searchName" = CASE WHEN "searchName" LIKE 'prensa de piernas alternado en maquina%' THEN 'prensa de piernas alternada en maquina' || substr( "searchName", 39 ) ELSE "searchName" END
WHERE "name" = 'Prensa de piernas alternado en máquina' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '2287' );
UPDATE "ExerciseGlobal" SET "name" = 'Prensa de piernas alternada en máquina', "searchName" = CASE WHEN "searchName" LIKE 'prensa de piernas alternado en maquina%' THEN 'prensa de piernas alternada en maquina' || substr( "searchName", 39 ) ELSE "searchName" END
WHERE "externalId" = '2287' AND "name" = 'Prensa de piernas alternado en máquina';

UPDATE "ExerciseCoach" SET "name" = 'Press de hombros a una mano con mancuerna (variante 2)', "searchName" = CASE WHEN "searchName" LIKE 'press de hombros (variante 2) a una mano con mancuerna%' THEN 'press de hombros a una mano con mancuerna (variante 2)' || substr( "searchName", 55 ) ELSE "searchName" END
WHERE "name" = 'Press de hombros (variante 2) a una mano con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0360' );
UPDATE "ExerciseGlobal" SET "name" = 'Press de hombros a una mano con mancuerna (variante 2)', "searchName" = CASE WHEN "searchName" LIKE 'press de hombros (variante 2) a una mano con mancuerna%' THEN 'press de hombros a una mano con mancuerna (variante 2)' || substr( "searchName", 55 ) ELSE "searchName" END
WHERE "externalId" = '0360' AND "name" = 'Press de hombros (variante 2) a una mano con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Press de hombros en máquina (variante 2)', "searchName" = CASE WHEN "searchName" LIKE 'press de hombros (variante 2) en maquina%' THEN 'press de hombros en maquina (variante 2)' || substr( "searchName", 41 ) ELSE "searchName" END
WHERE "name" = 'Press de hombros (variante 2) en máquina' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0869' );
UPDATE "ExerciseGlobal" SET "name" = 'Press de hombros en máquina (variante 2)', "searchName" = CASE WHEN "searchName" LIKE 'press de hombros (variante 2) en maquina%' THEN 'press de hombros en maquina (variante 2)' || substr( "searchName", 41 ) ELSE "searchName" END
WHERE "externalId" = '0869' AND "name" = 'Press de hombros (variante 2) en máquina';

UPDATE "ExerciseCoach" SET "name" = 'Press de hombros en máquina (variante 3)', "searchName" = CASE WHEN "searchName" LIKE 'press de hombros (variante 3) en maquina%' THEN 'press de hombros en maquina (variante 3)' || substr( "searchName", 41 ) ELSE "searchName" END
WHERE "name" = 'Press de hombros (variante 3) en máquina' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '2318' );
UPDATE "ExerciseGlobal" SET "name" = 'Press de hombros en máquina (variante 3)', "searchName" = CASE WHEN "searchName" LIKE 'press de hombros (variante 3) en maquina%' THEN 'press de hombros en maquina (variante 3)' || substr( "searchName", 41 ) ELSE "searchName" END
WHERE "externalId" = '2318' AND "name" = 'Press de hombros (variante 3) en máquina';

UPDATE "ExerciseCoach" SET "name" = 'Press de pecho inclinado en máquina (variante 2)', "searchName" = CASE WHEN "searchName" LIKE 'press de pecho (variante 2) inclinado en maquina%' THEN 'press de pecho inclinado en maquina (variante 2)' || substr( "searchName", 49 ) ELSE "searchName" END
WHERE "name" = 'Press de pecho (variante 2) inclinado en máquina' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1479' );
UPDATE "ExerciseGlobal" SET "name" = 'Press de pecho inclinado en máquina (variante 2)', "searchName" = CASE WHEN "searchName" LIKE 'press de pecho (variante 2) inclinado en maquina%' THEN 'press de pecho inclinado en maquina (variante 2)' || substr( "searchName", 49 ) ELSE "searchName" END
WHERE "externalId" = '1479' AND "name" = 'Press de pecho (variante 2) inclinado en máquina';

UPDATE "ExerciseCoach" SET "name" = 'Press acostado a una mano con mancuerna (variante 2)', "searchName" = CASE WHEN "searchName" LIKE 'press (variante 2) acostado a una mano con mancuerna%' THEN 'press acostado a una mano con mancuerna (variante 2)' || substr( "searchName", 53 ) ELSE "searchName" END
WHERE "name" = 'Press (variante 2) acostado a una mano con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0342' );
UPDATE "ExerciseGlobal" SET "name" = 'Press acostado a una mano con mancuerna (variante 2)', "searchName" = CASE WHEN "searchName" LIKE 'press (variante 2) acostado a una mano con mancuerna%' THEN 'press acostado a una mano con mancuerna (variante 2)' || substr( "searchName", 53 ) ELSE "searchName" END
WHERE "externalId" = '0342' AND "name" = 'Press (variante 2) acostado a una mano con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Remo al mentón con barra (variante 2)', "searchName" = CASE WHEN "searchName" LIKE 'remo al menton (variante 2) con barra%' THEN 'remo al menton con barra (variante 2)' || substr( "searchName", 38 ) ELSE "searchName" END
WHERE "name" = 'Remo al mentón (variante 2) con barra' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0119' );
UPDATE "ExerciseGlobal" SET "name" = 'Remo al mentón con barra (variante 2)', "searchName" = CASE WHEN "searchName" LIKE 'remo al menton (variante 2) con barra%' THEN 'remo al menton con barra (variante 2)' || substr( "searchName", 38 ) ELSE "searchName" END
WHERE "externalId" = '0119' AND "name" = 'Remo al mentón (variante 2) con barra';

UPDATE "ExerciseCoach" SET "name" = 'Remo al mentón con barra (variante 3)', "searchName" = CASE WHEN "searchName" LIKE 'remo al menton (variante 3) con barra%' THEN 'remo al menton con barra (variante 3)' || substr( "searchName", 38 ) ELSE "searchName" END
WHERE "name" = 'Remo al mentón (variante 3) con barra' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0121' );
UPDATE "ExerciseGlobal" SET "name" = 'Remo al mentón con barra (variante 3)', "searchName" = CASE WHEN "searchName" LIKE 'remo al menton (variante 3) con barra%' THEN 'remo al menton con barra (variante 3)' || substr( "searchName", 38 ) ELSE "searchName" END
WHERE "externalId" = '0121' AND "name" = 'Remo al mentón (variante 3) con barra';

UPDATE "ExerciseCoach" SET "name" = 'Sentadilla dividida lateral con barra (variante 2)', "searchName" = CASE WHEN "searchName" LIKE 'sentadilla dividida lateral (variante 2) con barra%' THEN 'sentadilla dividida lateral con barra (variante 2)' || substr( "searchName", 51 ) ELSE "searchName" END
WHERE "name" = 'Sentadilla dividida lateral (variante 2) con barra' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0097' );
UPDATE "ExerciseGlobal" SET "name" = 'Sentadilla dividida lateral con barra (variante 2)', "searchName" = CASE WHEN "searchName" LIKE 'sentadilla dividida lateral (variante 2) con barra%' THEN 'sentadilla dividida lateral con barra (variante 2)' || substr( "searchName", 51 ) ELSE "searchName" END
WHERE "externalId" = '0097' AND "name" = 'Sentadilla dividida lateral (variante 2) con barra';

UPDATE "ExerciseCoach" SET "name" = 'Sentadilla dividida con barra (variante 2)', "searchName" = CASE WHEN "searchName" LIKE 'sentadilla dividida (variante 2) con barra%' THEN 'sentadilla dividida con barra (variante 2)' || substr( "searchName", 43 ) ELSE "searchName" END
WHERE "name" = 'Sentadilla dividida (variante 2) con barra' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '2810' );
UPDATE "ExerciseGlobal" SET "name" = 'Sentadilla dividida con barra (variante 2)', "searchName" = CASE WHEN "searchName" LIKE 'sentadilla dividida (variante 2) con barra%' THEN 'sentadilla dividida con barra (variante 2)' || substr( "searchName", 43 ) ELSE "searchName" END
WHERE "externalId" = '2810' AND "name" = 'Sentadilla dividida (variante 2) con barra';
