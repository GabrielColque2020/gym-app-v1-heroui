-- Nombres del catalogo que habian quedado en ingles, con frases rotas o sin decir que ejercicio eran.
-- Cada ejercicio se identifica por su codigo (externalId), que no se repite.
--
-- El texto de busqueda (searchName) empieza con el nombre sin acentos: se
-- reemplaza solo ese comienzo, no las apariciones dentro de las instrucciones.
--
-- La copia de cada entrenador se renombra solo si conserva el nombre original;
-- si el entrenador le puso un nombre propio, no se toca.

UPDATE "ExerciseCoach" SET "name" = 'Apertura inclinada con rotación con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'aperturas inclinado con rotacion con mancuerna%' THEN 'apertura inclinada con rotacion con mancuerna' || substr( "searchName", 47 ) ELSE "searchName" END
WHERE "name" = 'Aperturas inclinado con rotación con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0331' );
UPDATE "ExerciseGlobal" SET "name" = 'Apertura inclinada con rotación con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'aperturas inclinado con rotacion con mancuerna%' THEN 'apertura inclinada con rotacion con mancuerna' || substr( "searchName", 47 ) ELSE "searchName" END
WHERE "externalId" = '0331' AND "name" = 'Aperturas inclinado con rotación con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Tirón de arranque', "searchName" = CASE WHEN "searchName" LIKE 'arranque pull%' THEN 'tiron de arranque' || substr( "searchName", 14 ) ELSE "searchName" END
WHERE "name" = 'Arranque pull' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0776' );
UPDATE "ExerciseGlobal" SET "name" = 'Tirón de arranque', "searchName" = CASE WHEN "searchName" LIKE 'arranque pull%' THEN 'tiron de arranque' || substr( "searchName", 14 ) ELSE "searchName" END
WHERE "externalId" = '0776' AND "name" = 'Arranque pull';

UPDATE "ExerciseCoach" SET "name" = 'Deslizamiento en plataforma a una pierna', "searchName" = CASE WHEN "searchName" LIKE 'a una pierna platform slide%' THEN 'deslizamiento en plataforma a una pierna' || substr( "searchName", 28 ) ELSE "searchName" END
WHERE "name" = 'A una pierna platform slide' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0730' );
UPDATE "ExerciseGlobal" SET "name" = 'Deslizamiento en plataforma a una pierna', "searchName" = CASE WHEN "searchName" LIKE 'a una pierna platform slide%' THEN 'deslizamiento en plataforma a una pierna' || substr( "searchName", 28 ) ELSE "searchName" END
WHERE "externalId" = '0730' AND "name" = 'A una pierna platform slide';

UPDATE "ExerciseCoach" SET "name" = 'Caminata con mancuerna por encima de la cabeza a una mano', "searchName" = CASE WHEN "searchName" LIKE 'a un brazo por encima de la cabeza carry con mancuerna%' THEN 'caminata con mancuerna por encima de la cabeza a una mano' || substr( "searchName", 55 ) ELSE "searchName" END
WHERE "name" = 'A un brazo por encima de la cabeza carry con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '3548' );
UPDATE "ExerciseGlobal" SET "name" = 'Caminata con mancuerna por encima de la cabeza a una mano', "searchName" = CASE WHEN "searchName" LIKE 'a un brazo por encima de la cabeza carry con mancuerna%' THEN 'caminata con mancuerna por encima de la cabeza a una mano' || substr( "searchName", 55 ) ELSE "searchName" END
WHERE "externalId" = '3548' AND "name" = 'A un brazo por encima de la cabeza carry con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Apertura en banco a una mano con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'banco apertura a una mano con mancuerna%' THEN 'apertura en banco a una mano con mancuerna' || substr( "searchName", 40 ) ELSE "searchName" END
WHERE "name" = 'Banco apertura a una mano con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1285' );
UPDATE "ExerciseGlobal" SET "name" = 'Apertura en banco a una mano con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'banco apertura a una mano con mancuerna%' THEN 'apertura en banco a una mano con mancuerna' || substr( "searchName", 40 ) ELSE "searchName" END
WHERE "externalId" = '1285' AND "name" = 'Banco apertura a una mano con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Extensión de cadera en banco', "searchName" = CASE WHEN "searchName" LIKE 'banco extension de cadera%' THEN 'extension de cadera en banco' || substr( "searchName", 26 ) ELSE "searchName" END
WHERE "name" = 'Banco extensión de cadera' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0130' );
UPDATE "ExerciseGlobal" SET "name" = 'Extensión de cadera en banco', "searchName" = CASE WHEN "searchName" LIKE 'banco extension de cadera%' THEN 'extension de cadera en banco' || substr( "searchName", 26 ) ELSE "searchName" END
WHERE "externalId" = '0130' AND "name" = 'Banco extensión de cadera';

UPDATE "ExerciseCoach" SET "name" = 'Remo en banco inclinado en polea', "searchName" = CASE WHEN "searchName" LIKE 'banco remo inclinado en polea%' THEN 'remo en banco inclinado en polea' || substr( "searchName", 30 ) ELSE "searchName" END
WHERE "name" = 'Banco remo inclinado en polea' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1318' );
UPDATE "ExerciseGlobal" SET "name" = 'Remo en banco inclinado en polea', "searchName" = CASE WHEN "searchName" LIKE 'banco remo inclinado en polea%' THEN 'remo en banco inclinado en polea' || substr( "searchName", 30 ) ELSE "searchName" END
WHERE "externalId" = '1318' AND "name" = 'Banco remo inclinado en polea';

UPDATE "ExerciseCoach" SET "name" = 'Press sentado en banco con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'banco sentado press con mancuerna%' THEN 'press sentado en banco con mancuerna' || substr( "searchName", 34 ) ELSE "searchName" END
WHERE "name" = 'Banco sentado press con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0290' );
UPDATE "ExerciseGlobal" SET "name" = 'Press sentado en banco con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'banco sentado press con mancuerna%' THEN 'press sentado en banco con mancuerna' || substr( "searchName", 34 ) ELSE "searchName" END
WHERE "externalId" = '0290' AND "name" = 'Banco sentado press con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Bicicleta fija (ritmo rápido)', "searchName" = CASE WHEN "searchName" LIKE 'bicicleta fija v. 3%' THEN 'bicicleta fija (ritmo rapido)' || substr( "searchName", 20 ) ELSE "searchName" END
WHERE "name" = 'Bicicleta fija v. 3' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '2138' );
UPDATE "ExerciseGlobal" SET "name" = 'Bicicleta fija (ritmo rápido)', "searchName" = CASE WHEN "searchName" LIKE 'bicicleta fija v. 3%' THEN 'bicicleta fija (ritmo rapido)' || substr( "searchName", 20 ) ELSE "searchName" END
WHERE "externalId" = '2138' AND "name" = 'Bicicleta fija v. 3';

UPDATE "ExerciseCoach" SET "name" = 'Apertura inclinada (variante 2) con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'breeding inclinado con mancuerna%' THEN 'apertura inclinada (variante 2) con mancuerna' || substr( "searchName", 33 ) ELSE "searchName" END
WHERE "name" = 'Breeding inclinado con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0316' );
UPDATE "ExerciseGlobal" SET "name" = 'Apertura inclinada (variante 2) con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'breeding inclinado con mancuerna%' THEN 'apertura inclinada (variante 2) con mancuerna' || substr( "searchName", 33 ) ELSE "searchName" END
WHERE "externalId" = '0316' AND "name" = 'Breeding inclinado con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Elevación lateral de cadera (sobre paralelas)', "searchName" = CASE WHEN "searchName" LIKE 'cadera lateral (sobre paralelas)%' THEN 'elevacion lateral de cadera (sobre paralelas)' || substr( "searchName", 33 ) ELSE "searchName" END
WHERE "name" = 'Cadera lateral (sobre paralelas)' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0709' );
UPDATE "ExerciseGlobal" SET "name" = 'Elevación lateral de cadera (sobre paralelas)', "searchName" = CASE WHEN "searchName" LIKE 'cadera lateral (sobre paralelas)%' THEN 'elevacion lateral de cadera (sobre paralelas)' || substr( "searchName", 33 ) ELSE "searchName" END
WHERE "externalId" = '0709' AND "name" = 'Cadera lateral (sobre paralelas)';

UPDATE "ExerciseCoach" SET "name" = 'Remo acostado con barra curva', "searchName" = CASE WHEN "searchName" LIKE 'cambered bar acostado remo%' THEN 'remo acostado con barra curva' || substr( "searchName", 27 ) ELSE "searchName" END
WHERE "name" = 'Cambered bar acostado remo' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0248' );
UPDATE "ExerciseGlobal" SET "name" = 'Remo acostado con barra curva', "searchName" = CASE WHEN "searchName" LIKE 'cambered bar acostado remo%' THEN 'remo acostado con barra curva' || substr( "searchName", 27 ) ELSE "searchName" END
WHERE "externalId" = '0248' AND "name" = 'Cambered bar acostado remo';

UPDATE "ExerciseCoach" SET "name" = 'Bicicleta fija (ritmo suave)', "searchName" = CASE WHEN "searchName" LIKE 'caminata en bicicleta fija%' THEN 'bicicleta fija (ritmo suave)' || substr( "searchName", 27 ) ELSE "searchName" END
WHERE "name" = 'Caminata en bicicleta fija' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0798' );
UPDATE "ExerciseGlobal" SET "name" = 'Bicicleta fija (ritmo suave)', "searchName" = CASE WHEN "searchName" LIKE 'caminata en bicicleta fija%' THEN 'bicicleta fija (ritmo suave)' || substr( "searchName", 27 ) ELSE "searchName" END
WHERE "externalId" = '0798' AND "name" = 'Caminata en bicicleta fija';

UPDATE "ExerciseCoach" SET "name" = 'Caminata en escalador', "searchName" = CASE WHEN "searchName" LIKE 'caminata en escaladora%' THEN 'caminata en escalador' || substr( "searchName", 23 ) ELSE "searchName" END
WHERE "name" = 'Caminata en escaladora' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '2311' );
UPDATE "ExerciseGlobal" SET "name" = 'Caminata en escalador', "searchName" = CASE WHEN "searchName" LIKE 'caminata en escaladora%' THEN 'caminata en escalador' || substr( "searchName", 23 ) ELSE "searchName" END
WHERE "externalId" = '2311' AND "name" = 'Caminata en escaladora';

UPDATE "ExerciseCoach" SET "name" = 'Cargada colgante alternada doble con pesa rusa', "searchName" = CASE WHEN "searchName" LIKE 'cargada alternada doble desde hang con pesa rusa%' THEN 'cargada colgante alternada doble con pesa rusa' || substr( "searchName", 49 ) ELSE "searchName" END
WHERE "name" = 'Cargada alternada doble desde hang con pesa rusa' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0526' );
UPDATE "ExerciseGlobal" SET "name" = 'Cargada colgante alternada doble con pesa rusa', "searchName" = CASE WHEN "searchName" LIKE 'cargada alternada doble desde hang con pesa rusa%' THEN 'cargada colgante alternada doble con pesa rusa' || substr( "searchName", 49 ) ELSE "searchName" END
WHERE "externalId" = '0526' AND "name" = 'Cargada alternada doble desde hang con pesa rusa';

UPDATE "ExerciseCoach" SET "name" = 'Cargada colgante bottoms-up con pesa rusa', "searchName" = CASE WHEN "searchName" LIKE 'cargada bottoms-up desde hang con pesa rusa%' THEN 'cargada colgante bottoms-up con pesa rusa' || substr( "searchName", 44 ) ELSE "searchName" END
WHERE "name" = 'Cargada bottoms-up desde hang con pesa rusa' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0525' );
UPDATE "ExerciseGlobal" SET "name" = 'Cargada colgante bottoms-up con pesa rusa', "searchName" = CASE WHEN "searchName" LIKE 'cargada bottoms-up desde hang con pesa rusa%' THEN 'cargada colgante bottoms-up con pesa rusa' || substr( "searchName", 44 ) ELSE "searchName" END
WHERE "externalId" = '0525' AND "name" = 'Cargada bottoms-up desde hang con pesa rusa';

UPDATE "ExerciseCoach" SET "name" = 'Cargada colgante alternada con pesa rusa', "searchName" = CASE WHEN "searchName" LIKE 'cargada desde hang alternado con pesa rusa%' THEN 'cargada colgante alternada con pesa rusa' || substr( "searchName", 43 ) ELSE "searchName" END
WHERE "name" = 'Cargada desde hang alternado con pesa rusa' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0518' );
UPDATE "ExerciseGlobal" SET "name" = 'Cargada colgante alternada con pesa rusa', "searchName" = CASE WHEN "searchName" LIKE 'cargada desde hang alternado con pesa rusa%' THEN 'cargada colgante alternada con pesa rusa' || substr( "searchName", 43 ) ELSE "searchName" END
WHERE "externalId" = '0518' AND "name" = 'Cargada desde hang alternado con pesa rusa';

UPDATE "ExerciseCoach" SET "name" = 'Cargada colgante con pesa rusa', "searchName" = CASE WHEN "searchName" LIKE 'cargada desde hang con pesa rusa%' THEN 'cargada colgante con pesa rusa' || substr( "searchName", 33 ) ELSE "searchName" END
WHERE "name" = 'Cargada desde hang con pesa rusa' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0535' );
UPDATE "ExerciseGlobal" SET "name" = 'Cargada colgante con pesa rusa', "searchName" = CASE WHEN "searchName" LIKE 'cargada desde hang con pesa rusa%' THEN 'cargada colgante con pesa rusa' || substr( "searchName", 33 ) ELSE "searchName" END
WHERE "externalId" = '0535' AND "name" = 'Cargada desde hang con pesa rusa';

UPDATE "ExerciseCoach" SET "name" = 'Carrera en el lugar', "searchName" = CASE WHEN "searchName" LIKE 'carrera con rueda abdominal%' THEN 'carrera en el lugar' || substr( "searchName", 28 ) ELSE "searchName" END
WHERE "name" = 'Carrera con rueda abdominal' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '3637' );
UPDATE "ExerciseGlobal" SET "name" = 'Carrera en el lugar', "searchName" = CASE WHEN "searchName" LIKE 'carrera con rueda abdominal%' THEN 'carrera en el lugar' || substr( "searchName", 28 ) ELSE "searchName" END
WHERE "externalId" = '3637' AND "name" = 'Carrera con rueda abdominal';

UPDATE "ExerciseCoach" SET "name" = 'Estiramiento de dorsales contra la pared a una mano', "searchName" = CASE WHEN "searchName" LIKE 'contra la pared a una mano%' THEN 'estiramiento de dorsales contra la pared a una mano' || substr( "searchName", 27 ) ELSE "searchName" END
WHERE "name" = 'Contra la pared a una mano' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1355' );
UPDATE "ExerciseGlobal" SET "name" = 'Estiramiento de dorsales contra la pared a una mano', "searchName" = CASE WHEN "searchName" LIKE 'contra la pared a una mano%' THEN 'estiramiento de dorsales contra la pared a una mano' || substr( "searchName", 27 ) ELSE "searchName" END
WHERE "externalId" = '1355' AND "name" = 'Contra la pared a una mano';

UPDATE "ExerciseCoach" SET "name" = 'Correr en cinta', "searchName" = CASE WHEN "searchName" LIKE 'correr (equipo)%' THEN 'correr en cinta' || substr( "searchName", 16 ) ELSE "searchName" END
WHERE "name" = 'Correr (equipo)' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0684' );
UPDATE "ExerciseGlobal" SET "name" = 'Correr en cinta', "searchName" = CASE WHEN "searchName" LIKE 'correr (equipo)%' THEN 'correr en cinta' || substr( "searchName", 16 ) ELSE "searchName" END
WHERE "externalId" = '0684' AND "name" = 'Correr (equipo)';

UPDATE "ExerciseCoach" SET "name" = 'Apertura inversa de pie con cruce alto en polea', "searchName" = CASE WHEN "searchName" LIKE 'cruzado alto apertura inversa de pie en polea%' THEN 'apertura inversa de pie con cruce alto en polea' || substr( "searchName", 46 ) ELSE "searchName" END
WHERE "name" = 'Cruzado alto apertura inversa de pie en polea' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0225' );
UPDATE "ExerciseGlobal" SET "name" = 'Apertura inversa de pie con cruce alto en polea', "searchName" = CASE WHEN "searchName" LIKE 'cruzado alto apertura inversa de pie en polea%' THEN 'apertura inversa de pie con cruce alto en polea' || substr( "searchName", 46 ) ELSE "searchName" END
WHERE "externalId" = '0225' AND "name" = 'Cruzado alto apertura inversa de pie en polea';

UPDATE "ExerciseCoach" SET "name" = 'Apertura inversa con cruce en polea', "searchName" = CASE WHEN "searchName" LIKE 'cruzado inverso apertura en polea%' THEN 'apertura inversa con cruce en polea' || substr( "searchName", 34 ) ELSE "searchName" END
WHERE "name" = 'Cruzado inverso apertura en polea' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0154' );
UPDATE "ExerciseGlobal" SET "name" = 'Apertura inversa con cruce en polea', "searchName" = CASE WHEN "searchName" LIKE 'cruzado inverso apertura en polea%' THEN 'apertura inversa con cruce en polea' || substr( "searchName", 34 ) ELSE "searchName" END
WHERE "externalId" = '0154' AND "name" = 'Cruzado inverso apertura en polea';

UPDATE "ExerciseCoach" SET "name" = 'Jalón lateral con cruce en polea', "searchName" = CASE WHEN "searchName" LIKE 'cruzado lateral jalon en polea%' THEN 'jalon lateral con cruce en polea' || substr( "searchName", 31 ) ELSE "searchName" END
WHERE "name" = 'Cruzado lateral jalón en polea' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0153' );
UPDATE "ExerciseGlobal" SET "name" = 'Jalón lateral con cruce en polea', "searchName" = CASE WHEN "searchName" LIKE 'cruzado lateral jalon en polea%' THEN 'jalon lateral con cruce en polea' || substr( "searchName", 31 ) ELSE "searchName" END
WHERE "externalId" = '0153' AND "name" = 'Cruzado lateral jalón en polea';

UPDATE "ExerciseCoach" SET "name" = 'Remo sentado cruzado con cuerda en polea', "searchName" = CASE WHEN "searchName" LIKE 'cruzado remo sentado con cuerda en polea%' THEN 'remo sentado cruzado con cuerda en polea' || substr( "searchName", 41 ) ELSE "searchName" END
WHERE "name" = 'Cruzado remo sentado con cuerda en polea' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1320' );
UPDATE "ExerciseGlobal" SET "name" = 'Remo sentado cruzado con cuerda en polea', "searchName" = CASE WHEN "searchName" LIKE 'cruzado remo sentado con cuerda en polea%' THEN 'remo sentado cruzado con cuerda en polea' || substr( "searchName", 41 ) ELSE "searchName" END
WHERE "externalId" = '1320' AND "name" = 'Cruzado remo sentado con cuerda en polea';

UPDATE "ExerciseCoach" SET "name" = 'Cruce de poleas (variante 2)', "searchName" = CASE WHEN "searchName" LIKE 'cruzado variation en polea%' THEN 'cruce de poleas (variante 2)' || substr( "searchName", 27 ) ELSE "searchName" END
WHERE "name" = 'Cruzado variation en polea' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0155' );
UPDATE "ExerciseGlobal" SET "name" = 'Cruce de poleas (variante 2)', "searchName" = CASE WHEN "searchName" LIKE 'cruzado variation en polea%' THEN 'cruce de poleas (variante 2)' || substr( "searchName", 27 ) ELSE "searchName" END
WHERE "externalId" = '0155' AND "name" = 'Cruzado variation en polea';

UPDATE "ExerciseCoach" SET "name" = 'Estiramiento de cuádriceps con pie en banco', "searchName" = CASE WHEN "searchName" LIKE 'cuadriceps%' THEN 'estiramiento de cuadriceps con pie en banco' || substr( "searchName", 11 ) ELSE "searchName" END
WHERE "name" = 'Cuádriceps' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '3533' );
UPDATE "ExerciseGlobal" SET "name" = 'Estiramiento de cuádriceps con pie en banco', "searchName" = CASE WHEN "searchName" LIKE 'cuadriceps%' THEN 'estiramiento de cuadriceps con pie en banco' || substr( "searchName", 11 ) ELSE "searchName" END
WHERE "externalId" = '3533' AND "name" = 'Cuádriceps';

UPDATE "ExerciseCoach" SET "name" = 'Curl con agarre amplio acostado con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'curl agarre amplio acostado con mancuerna%' THEN 'curl con agarre amplio acostado con mancuerna' || substr( "searchName", 42 ) ELSE "searchName" END
WHERE "name" = 'Curl agarre amplio acostado con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1662' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl con agarre amplio acostado con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'curl agarre amplio acostado con mancuerna%' THEN 'curl con agarre amplio acostado con mancuerna' || substr( "searchName", 42 ) ELSE "searchName" END
WHERE "externalId" = '1662' AND "name" = 'Curl agarre amplio acostado con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Curl con agarre cerrado con barra EZ', "searchName" = CASE WHEN "searchName" LIKE 'curl agarre cerrado con barra ez%' THEN 'curl con agarre cerrado con barra ez' || substr( "searchName", 33 ) ELSE "searchName" END
WHERE "name" = 'Curl agarre cerrado con barra EZ' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0446' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl con agarre cerrado con barra EZ', "searchName" = CASE WHEN "searchName" LIKE 'curl agarre cerrado con barra ez%' THEN 'curl con agarre cerrado con barra ez' || substr( "searchName", 33 ) ELSE "searchName" END
WHERE "externalId" = '0446' AND "name" = 'Curl agarre cerrado con barra EZ';

UPDATE "ExerciseCoach" SET "name" = 'Curl con agarre inverso con barra EZ', "searchName" = CASE WHEN "searchName" LIKE 'curl agarre inverso con barra ez%' THEN 'curl con agarre inverso con barra ez' || substr( "searchName", 33 ) ELSE "searchName" END
WHERE "name" = 'Curl agarre inverso con barra EZ' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0451' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl con agarre inverso con barra EZ', "searchName" = CASE WHEN "searchName" LIKE 'curl agarre inverso con barra ez%' THEN 'curl con agarre inverso con barra ez' || substr( "searchName", 33 ) ELSE "searchName" END
WHERE "externalId" = '0451' AND "name" = 'Curl agarre inverso con barra EZ';

UPDATE "ExerciseCoach" SET "name" = 'Curl de bíceps con agarre amplio de pie con barra EZ', "searchName" = CASE WHEN "searchName" LIKE 'curl de biceps agarre amplio de pie con barra ez%' THEN 'curl de biceps con agarre amplio de pie con barra ez' || substr( "searchName", 49 ) ELSE "searchName" END
WHERE "name" = 'Curl de bíceps agarre amplio de pie con barra EZ' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '2741' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl de bíceps con agarre amplio de pie con barra EZ', "searchName" = CASE WHEN "searchName" LIKE 'curl de biceps agarre amplio de pie con barra ez%' THEN 'curl de biceps con agarre amplio de pie con barra ez' || substr( "searchName", 49 ) ELSE "searchName" END
WHERE "externalId" = '2741' AND "name" = 'Curl de bíceps agarre amplio de pie con barra EZ';

UPDATE "ExerciseCoach" SET "name" = 'Curl de bíceps en posición de cigüeña con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'curl de biceps con en posicion de ciguena con mancuerna%' THEN 'curl de biceps en posicion de ciguena con mancuerna' || substr( "searchName", 56 ) ELSE "searchName" END
WHERE "name" = 'Curl de bíceps con en posición de cigüeña con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1653' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl de bíceps en posición de cigüeña con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'curl de biceps con en posicion de ciguena con mancuerna%' THEN 'curl de biceps en posicion de ciguena con mancuerna' || substr( "searchName", 56 ) ELSE "searchName" END
WHERE "externalId" = '1653' AND "name" = 'Curl de bíceps con en posición de cigüeña con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Curl de bíceps de rodillas sobre pelota suiza con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'curl de biceps pelota suiza de rodillas con mancuerna%' THEN 'curl de biceps de rodillas sobre pelota suiza con mancuerna' || substr( "searchName", 54 ) ELSE "searchName" END
WHERE "name" = 'Curl de bíceps pelota suiza de rodillas con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1660' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl de bíceps de rodillas sobre pelota suiza con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'curl de biceps pelota suiza de rodillas con mancuerna%' THEN 'curl de biceps de rodillas sobre pelota suiza con mancuerna' || substr( "searchName", 54 ) ELSE "searchName" END
WHERE "externalId" = '1660' AND "name" = 'Curl de bíceps pelota suiza de rodillas con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Curl de bíceps en sentadilla con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'curl de biceps sentadilla con mancuerna%' THEN 'curl de biceps en sentadilla con mancuerna' || substr( "searchName", 40 ) ELSE "searchName" END
WHERE "name" = 'Curl de bíceps sentadilla con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1655' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl de bíceps en sentadilla con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'curl de biceps sentadilla con mancuerna%' THEN 'curl de biceps en sentadilla con mancuerna' || substr( "searchName", 40 ) ELSE "searchName" END
WHERE "externalId" = '1655' AND "name" = 'Curl de bíceps sentadilla con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Curl en banco Scott con agarre cerrado con barra EZ', "searchName" = CASE WHEN "searchName" LIKE 'curl en banco scott agarre cerrado con barra ez%' THEN 'curl en banco scott con agarre cerrado con barra ez' || substr( "searchName", 48 ) ELSE "searchName" END
WHERE "name" = 'Curl en banco Scott agarre cerrado con barra EZ' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1627' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl en banco Scott con agarre cerrado con barra EZ', "searchName" = CASE WHEN "searchName" LIKE 'curl en banco scott agarre cerrado con barra ez%' THEN 'curl en banco scott con agarre cerrado con barra ez' || substr( "searchName", 48 ) ELSE "searchName" END
WHERE "externalId" = '1627' AND "name" = 'Curl en banco Scott agarre cerrado con barra EZ';

UPDATE "ExerciseCoach" SET "name" = 'Curl en banco Scott con agarre inverso con barra EZ', "searchName" = CASE WHEN "searchName" LIKE 'curl en banco scott agarre inverso con barra ez%' THEN 'curl en banco scott con agarre inverso con barra ez' || substr( "searchName", 48 ) ELSE "searchName" END
WHERE "name" = 'Curl en banco Scott agarre inverso con barra EZ' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0452' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl en banco Scott con agarre inverso con barra EZ', "searchName" = CASE WHEN "searchName" LIKE 'curl en banco scott agarre inverso con barra ez%' THEN 'curl en banco scott con agarre inverso con barra ez' || substr( "searchName", 48 ) ELSE "searchName" END
WHERE "externalId" = '0452' AND "name" = 'Curl en banco Scott agarre inverso con barra EZ';

UPDATE "ExerciseCoach" SET "name" = 'Curl martillo (con arm blaster) con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'curls martillo (con arm blaster) con mancuerna%' THEN 'curl martillo (con arm blaster) con mancuerna' || substr( "searchName", 47 ) ELSE "searchName" END
WHERE "name" = 'Curls martillo (con arm blaster) con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '2402' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl martillo (con arm blaster) con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'curls martillo (con arm blaster) con mancuerna%' THEN 'curl martillo (con arm blaster) con mancuerna' || substr( "searchName", 47 ) ELSE "searchName" END
WHERE "externalId" = '2402' AND "name" = 'Curls martillo (con arm blaster) con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Curl sentado con barra EZ', "searchName" = CASE WHEN "searchName" LIKE 'curls sentado con barra ez%' THEN 'curl sentado con barra ez' || substr( "searchName", 27 ) ELSE "searchName" END
WHERE "name" = 'Curls sentado con barra EZ' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1458' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl sentado con barra EZ', "searchName" = CASE WHEN "searchName" LIKE 'curls sentado con barra ez%' THEN 'curl sentado con barra ez' || substr( "searchName", 27 ) ELSE "searchName" END
WHERE "externalId" = '1458' AND "name" = 'Curls sentado con barra EZ';

UPDATE "ExerciseCoach" SET "name" = 'Dominada con agarre al ancho de hombros', "searchName" = CASE WHEN "searchName" LIKE 'dominada agarre de hombros%' THEN 'dominada con agarre al ancho de hombros' || substr( "searchName", 27 ) ELSE "searchName" END
WHERE "name" = 'Dominada agarre de hombros' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1763' );
UPDATE "ExerciseGlobal" SET "name" = 'Dominada con agarre al ancho de hombros', "searchName" = CASE WHEN "searchName" LIKE 'dominada agarre de hombros%' THEN 'dominada con agarre al ancho de hombros' || substr( "searchName", 27 ) ELSE "searchName" END
WHERE "externalId" = '1763' AND "name" = 'Dominada agarre de hombros';

UPDATE "ExerciseCoach" SET "name" = 'Dominada con agarre estrecho', "searchName" = CASE WHEN "searchName" LIKE 'dominadas agarre estrecho%' THEN 'dominada con agarre estrecho' || substr( "searchName", 26 ) ELSE "searchName" END
WHERE "name" = 'Dominadas agarre estrecho' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0139' );
UPDATE "ExerciseGlobal" SET "name" = 'Dominada con agarre estrecho', "searchName" = CASE WHEN "searchName" LIKE 'dominadas agarre estrecho%' THEN 'dominada con agarre estrecho' || substr( "searchName", 26 ) ELSE "searchName" END
WHERE "externalId" = '0139' AND "name" = 'Dominadas agarre estrecho';

UPDATE "ExerciseCoach" SET "name" = 'Dominada supina con agarre estrecho en paralelas', "searchName" = CASE WHEN "searchName" LIKE 'dominadas supinas agarre estrecho en paralelas%' THEN 'dominada supina con agarre estrecho en paralelas' || substr( "searchName", 47 ) ELSE "searchName" END
WHERE "name" = 'Dominadas supinas agarre estrecho en paralelas' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0253' );
UPDATE "ExerciseGlobal" SET "name" = 'Dominada supina con agarre estrecho en paralelas', "searchName" = CASE WHEN "searchName" LIKE 'dominadas supinas agarre estrecho en paralelas%' THEN 'dominada supina con agarre estrecho en paralelas' || substr( "searchName", 47 ) ELSE "searchName" END
WHERE "externalId" = '0253' AND "name" = 'Dominadas supinas agarre estrecho en paralelas';

UPDATE "ExerciseCoach" SET "name" = 'Elevación de gemelos a una pierna con agarre martillo sentado con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'elevacion de gemelos a una pierna agarre martillo sentado con mancuerna%' THEN 'elevacion de gemelos a una pierna con agarre martillo sentado con mancuerna' || substr( "searchName", 72 ) ELSE "searchName" END
WHERE "name" = 'Elevación de gemelos a una pierna agarre martillo sentado con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1380' );
UPDATE "ExerciseGlobal" SET "name" = 'Elevación de gemelos a una pierna con agarre martillo sentado con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'elevacion de gemelos a una pierna agarre martillo sentado con mancuerna%' THEN 'elevacion de gemelos a una pierna con agarre martillo sentado con mancuerna' || substr( "searchName", 72 ) ELSE "searchName" END
WHERE "externalId" = '1380' AND "name" = 'Elevación de gemelos a una pierna agarre martillo sentado con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Elevación alternada de pie con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'elevacion de pie alternada con mancuerna%' THEN 'elevacion alternada de pie con mancuerna' || substr( "searchName", 41 ) ELSE "searchName" END
WHERE "name" = 'Elevación de pie alternada con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0415' );
UPDATE "ExerciseGlobal" SET "name" = 'Elevación alternada de pie con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'elevacion de pie alternada con mancuerna%' THEN 'elevacion alternada de pie con mancuerna' || substr( "searchName", 41 ) ELSE "searchName" END
WHERE "externalId" = '0415' AND "name" = 'Elevación de pie alternada con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Elevación en Y con banda', "searchName" = CASE WHEN "searchName" LIKE 'elevacion en y con banda%' THEN 'elevacion en y con banda' || substr( "searchName", 25 ) ELSE "searchName" END
WHERE "name" = 'Elevación en y con banda' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1017' );
UPDATE "ExerciseGlobal" SET "name" = 'Elevación en Y con banda', "searchName" = CASE WHEN "searchName" LIKE 'elevacion en y con banda%' THEN 'elevacion en y con banda' || substr( "searchName", 25 ) ELSE "searchName" END
WHERE "externalId" = '1017' AND "name" = 'Elevación en y con banda';

UPDATE "ExerciseCoach" SET "name" = 'Elevación lateral con pulgares arriba con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'elevacion lateral vacia completa con mancuerna%' THEN 'elevacion lateral con pulgares arriba con mancuerna' || substr( "searchName", 47 ) ELSE "searchName" END
WHERE "name" = 'Elevación lateral vacía completa con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0311' );
UPDATE "ExerciseGlobal" SET "name" = 'Elevación lateral con pulgares arriba con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'elevacion lateral vacia completa con mancuerna%' THEN 'elevacion lateral con pulgares arriba con mancuerna' || substr( "searchName", 47 ) ELSE "searchName" END
WHERE "externalId" = '0311' AND "name" = 'Elevación lateral vacía completa con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Elevación frontal alternada sentado con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'elevacion sentado alternado frontal con mancuerna%' THEN 'elevacion frontal alternada sentado con mancuerna' || substr( "searchName", 50 ) ELSE "searchName" END
WHERE "name" = 'Elevación sentado alternado frontal con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0387' );
UPDATE "ExerciseGlobal" SET "name" = 'Elevación frontal alternada sentado con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'elevacion sentado alternado frontal con mancuerna%' THEN 'elevacion frontal alternada sentado con mancuerna' || substr( "searchName", 50 ) ELSE "searchName" END
WHERE "externalId" = '0387' AND "name" = 'Elevación sentado alternado frontal con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Elevación frontal sentado con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'elevacion sentado frontal con mancuerna%' THEN 'elevacion frontal sentado con mancuerna' || substr( "searchName", 40 ) ELSE "searchName" END
WHERE "name" = 'Elevación sentado frontal con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0392' );
UPDATE "ExerciseGlobal" SET "name" = 'Elevación frontal sentado con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'elevacion sentado frontal con mancuerna%' THEN 'elevacion frontal sentado con mancuerna' || substr( "searchName", 40 ) ELSE "searchName" END
WHERE "externalId" = '0392' AND "name" = 'Elevación sentado frontal con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Elevación lateral sentado con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'elevacion sentado lateral con mancuerna%' THEN 'elevacion lateral sentado con mancuerna' || substr( "searchName", 40 ) ELSE "searchName" END
WHERE "name" = 'Elevación sentado lateral con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0396' );
UPDATE "ExerciseGlobal" SET "name" = 'Elevación lateral sentado con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'elevacion sentado lateral con mancuerna%' THEN 'elevacion lateral sentado con mancuerna' || substr( "searchName", 40 ) ELSE "searchName" END
WHERE "externalId" = '0396' AND "name" = 'Elevación sentado lateral con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Empuje de pecho con lanzamiento al correr con pelota medicinal', "searchName" = CASE WHEN "searchName" LIKE 'empuje de pecho con release al correr con pelota medicinal%' THEN 'empuje de pecho con lanzamiento al correr con pelota medicinal' || substr( "searchName", 59 ) ELSE "searchName" END
WHERE "name" = 'Empuje de pecho con release al correr con pelota medicinal' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1312' );
UPDATE "ExerciseGlobal" SET "name" = 'Empuje de pecho con lanzamiento al correr con pelota medicinal', "searchName" = CASE WHEN "searchName" LIKE 'empuje de pecho con release al correr con pelota medicinal%' THEN 'empuje de pecho con lanzamiento al correr con pelota medicinal' || substr( "searchName", 59 ) ELSE "searchName" END
WHERE "externalId" = '1312' AND "name" = 'Empuje de pecho con release al correr con pelota medicinal';

UPDATE "ExerciseCoach" SET "name" = 'Encogimiento de hombros por detrás en máquina Smith', "searchName" = CASE WHEN "searchName" LIKE 'encogimientos por detras de hombros en maquina smith%' THEN 'encogimiento de hombros por detras en maquina smith' || substr( "searchName", 53 ) ELSE "searchName" END
WHERE "name" = 'Encogimientos por detrás de hombros en máquina Smith' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0746' );
UPDATE "ExerciseGlobal" SET "name" = 'Encogimiento de hombros por detrás en máquina Smith', "searchName" = CASE WHEN "searchName" LIKE 'encogimientos por detras de hombros en maquina smith%' THEN 'encogimiento de hombros por detras en maquina smith' || substr( "searchName", 53 ) ELSE "searchName" END
WHERE "externalId" = '0746' AND "name" = 'Encogimientos por detrás de hombros en máquina Smith';

UPDATE "ExerciseCoach" SET "name" = 'Estocada con pase de pesa rusa entre piernas', "searchName" = CASE WHEN "searchName" LIKE 'estocada pass-through con pesa rusa%' THEN 'estocada con pase de pesa rusa entre piernas' || substr( "searchName", 36 ) ELSE "searchName" END
WHERE "name" = 'Estocada pass-through con pesa rusa' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0536' );
UPDATE "ExerciseGlobal" SET "name" = 'Estocada con pase de pesa rusa entre piernas', "searchName" = CASE WHEN "searchName" LIKE 'estocada pass-through con pesa rusa%' THEN 'estocada con pase de pesa rusa entre piernas' || substr( "searchName", 36 ) ELSE "searchName" END
WHERE "externalId" = '0536' AND "name" = 'Estocada pass-through con pesa rusa';

UPDATE "ExerciseCoach" SET "name" = 'Extensión de tríceps cruzada sobre la cara acostado con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'extension (a traves de la cara) acostado con mancuerna%' THEN 'extension de triceps cruzada sobre la cara acostado con mancuerna' || substr( "searchName", 55 ) ELSE "searchName" END
WHERE "name" = 'Extensión (a través de la cara) acostado con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0337' );
UPDATE "ExerciseGlobal" SET "name" = 'Extensión de tríceps cruzada sobre la cara acostado con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'extension (a traves de la cara) acostado con mancuerna%' THEN 'extension de triceps cruzada sobre la cara acostado con mancuerna' || substr( "searchName", 55 ) ELSE "searchName" END
WHERE "externalId" = '0337' AND "name" = 'Extensión (a través de la cara) acostado con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Extensión de tríceps por encima de la cabeza de pie a una mano con agarre inverso en polea', "searchName" = CASE WHEN "searchName" LIKE 'extension de triceps por encima de la cabeza de pie a una mano agarre inverso en polea%' THEN 'extension de triceps por encima de la cabeza de pie a una mano con agarre inverso en polea' || substr( "searchName", 87 ) ELSE "searchName" END
WHERE "name" = 'Extensión de tríceps por encima de la cabeza de pie a una mano agarre inverso en polea' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1727' );
UPDATE "ExerciseGlobal" SET "name" = 'Extensión de tríceps por encima de la cabeza de pie a una mano con agarre inverso en polea', "searchName" = CASE WHEN "searchName" LIKE 'extension de triceps por encima de la cabeza de pie a una mano agarre inverso en polea%' THEN 'extension de triceps por encima de la cabeza de pie a una mano con agarre inverso en polea' || substr( "searchName", 87 ) ELSE "searchName" END
WHERE "externalId" = '1727' AND "name" = 'Extensión de tríceps por encima de la cabeza de pie a una mano agarre inverso en polea';

UPDATE "ExerciseCoach" SET "name" = 'Extensión de tríceps por encima de la cabeza sentado a una mano con agarre inverso con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'extension de triceps por encima de la cabeza sentado a una mano agarre inverso con mancuerna%' THEN 'extension de triceps por encima de la cabeza sentado a una mano con agarre inverso con mancuerna' || substr( "searchName", 93 ) ELSE "searchName" END
WHERE "name" = 'Extensión de tríceps por encima de la cabeza sentado a una mano agarre inverso con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1738' );
UPDATE "ExerciseGlobal" SET "name" = 'Extensión de tríceps por encima de la cabeza sentado a una mano con agarre inverso con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'extension de triceps por encima de la cabeza sentado a una mano agarre inverso con mancuerna%' THEN 'extension de triceps por encima de la cabeza sentado a una mano con agarre inverso con mancuerna' || substr( "searchName", 93 ) ELSE "searchName" END
WHERE "externalId" = '1738' AND "name" = 'Extensión de tríceps por encima de la cabeza sentado a una mano agarre inverso con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Remo en banco inclinado con cuerda en polea', "searchName" = CASE WHEN "searchName" LIKE 'extension inclinada banco remo con cuerda en polea%' THEN 'remo en banco inclinado con cuerda en polea' || substr( "searchName", 51 ) ELSE "searchName" END
WHERE "name" = 'Extensión inclinada banco remo con cuerda en polea' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1322' );
UPDATE "ExerciseGlobal" SET "name" = 'Remo en banco inclinado con cuerda en polea', "searchName" = CASE WHEN "searchName" LIKE 'extension inclinada banco remo con cuerda en polea%' THEN 'remo en banco inclinado con cuerda en polea' || substr( "searchName", 51 ) ELSE "searchName" END
WHERE "externalId" = '1322' AND "name" = 'Extensión inclinada banco remo con cuerda en polea';

UPDATE "ExerciseCoach" SET "name" = 'Extensión lumbar con brazos extendidos sobre pelota suiza', "searchName" = CASE WHEN "searchName" LIKE 'extension lumbar con brazos extended sobre pelota suiza%' THEN 'extension lumbar con brazos extendidos sobre pelota suiza' || substr( "searchName", 56 ) ELSE "searchName" END
WHERE "name" = 'Extensión lumbar con brazos extended sobre pelota suiza' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1333' );
UPDATE "ExerciseGlobal" SET "name" = 'Extensión lumbar con brazos extendidos sobre pelota suiza', "searchName" = CASE WHEN "searchName" LIKE 'extension lumbar con brazos extended sobre pelota suiza%' THEN 'extension lumbar con brazos extendidos sobre pelota suiza' || substr( "searchName", 56 ) ELSE "searchName" END
WHERE "externalId" = '1333' AND "name" = 'Extensión lumbar con brazos extended sobre pelota suiza';

UPDATE "ExerciseCoach" SET "name" = 'Extensión lumbar con rotación sobre pelota suiza', "searchName" = CASE WHEN "searchName" LIKE 'extension lumbar con rotation sobre pelota suiza%' THEN 'extension lumbar con rotacion sobre pelota suiza' || substr( "searchName", 49 ) ELSE "searchName" END
WHERE "name" = 'Extensión lumbar con rotation sobre pelota suiza' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1336' );
UPDATE "ExerciseGlobal" SET "name" = 'Extensión lumbar con rotación sobre pelota suiza', "searchName" = CASE WHEN "searchName" LIKE 'extension lumbar con rotation sobre pelota suiza%' THEN 'extension lumbar con rotacion sobre pelota suiza' || substr( "searchName", 49 ) ELSE "searchName" END
WHERE "externalId" = '1336' AND "name" = 'Extensión lumbar con rotation sobre pelota suiza';

UPDATE "ExerciseCoach" SET "name" = 'Ocho con pesa rusa', "searchName" = CASE WHEN "searchName" LIKE 'figure 8 con pesa rusa%' THEN 'ocho con pesa rusa' || substr( "searchName", 23 ) ELSE "searchName" END
WHERE "name" = 'Figure 8 con pesa rusa' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0532' );
UPDATE "ExerciseGlobal" SET "name" = 'Ocho con pesa rusa', "searchName" = CASE WHEN "searchName" LIKE 'figure 8 con pesa rusa%' THEN 'ocho con pesa rusa' || substr( "searchName", 23 ) ELSE "searchName" END
WHERE "externalId" = '0532' AND "name" = 'Figure 8 con pesa rusa';

UPDATE "ExerciseCoach" SET "name" = 'Curl de dedos', "searchName" = CASE WHEN "searchName" LIKE 'finger curls%' THEN 'curl de dedos' || substr( "searchName", 13 ) ELSE "searchName" END
WHERE "name" = 'Finger curls' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0455' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl de dedos', "searchName" = CASE WHEN "searchName" LIKE 'finger curls%' THEN 'curl de dedos' || substr( "searchName", 13 ) ELSE "searchName" END
WHERE "externalId" = '0455' AND "name" = 'Finger curls';

UPDATE "ExerciseCoach" SET "name" = 'Curl de dedos con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'finger curls con mancuerna%' THEN 'curl de dedos con mancuerna' || substr( "searchName", 27 ) ELSE "searchName" END
WHERE "name" = 'Finger curls con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1437' );
UPDATE "ExerciseGlobal" SET "name" = 'Curl de dedos con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'finger curls con mancuerna%' THEN 'curl de dedos con mancuerna' || substr( "searchName", 27 ) ELSE "searchName" END
WHERE "externalId" = '1437' AND "name" = 'Finger curls con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Bandera', "searchName" = CASE WHEN "searchName" LIKE 'flag%' THEN 'bandera' || substr( "searchName", 5 ) ELSE "searchName" END
WHERE "name" = 'Flag' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '3303' );
UPDATE "ExerciseGlobal" SET "name" = 'Bandera', "searchName" = CASE WHEN "searchName" LIKE 'flag%' THEN 'bandera' || substr( "searchName", 5 ) ELSE "searchName" END
WHERE "externalId" = '3303' AND "name" = 'Flag';

UPDATE "ExerciseCoach" SET "name" = 'Flexión de brazos con agarre cerrado con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'flexion de brazos agarre cerrado con mancuerna%' THEN 'flexion de brazos con agarre cerrado con mancuerna' || substr( "searchName", 47 ) ELSE "searchName" END
WHERE "name" = 'Flexión de brazos agarre cerrado con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0660' );
UPDATE "ExerciseGlobal" SET "name" = 'Flexión de brazos con agarre cerrado con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'flexion de brazos agarre cerrado con mancuerna%' THEN 'flexion de brazos con agarre cerrado con mancuerna' || substr( "searchName", 47 ) ELSE "searchName" END
WHERE "externalId" = '0660' AND "name" = 'Flexión de brazos agarre cerrado con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Flexión de brazos con agarre estrecho sobre pelota suiza', "searchName" = CASE WHEN "searchName" LIKE 'flexion de brazos agarre estrecho sobre pelota suiza%' THEN 'flexion de brazos con agarre estrecho sobre pelota suiza' || substr( "searchName", 53 ) ELSE "searchName" END
WHERE "name" = 'Flexión de brazos agarre estrecho sobre pelota suiza' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '2328' );
UPDATE "ExerciseGlobal" SET "name" = 'Flexión de brazos con agarre estrecho sobre pelota suiza', "searchName" = CASE WHEN "searchName" LIKE 'flexion de brazos agarre estrecho sobre pelota suiza%' THEN 'flexion de brazos con agarre estrecho sobre pelota suiza' || substr( "searchName", 53 ) ELSE "searchName" END
WHERE "externalId" = '2328' AND "name" = 'Flexión de brazos agarre estrecho sobre pelota suiza';

UPDATE "ExerciseCoach" SET "name" = 'Flexión de brazos inclinado con caída y salto', "searchName" = CASE WHEN "searchName" LIKE 'flexion de brazos depth salto inclinado%' THEN 'flexion de brazos inclinado con caida y salto' || substr( "searchName", 40 ) ELSE "searchName" END
WHERE "name" = 'Flexión de brazos depth salto inclinado' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0492' );
UPDATE "ExerciseGlobal" SET "name" = 'Flexión de brazos inclinado con caída y salto', "searchName" = CASE WHEN "searchName" LIKE 'flexion de brazos depth salto inclinado%' THEN 'flexion de brazos inclinado con caida y salto' || substr( "searchName", 40 ) ELSE "searchName" END
WHERE "externalId" = '0492' AND "name" = 'Flexión de brazos depth salto inclinado';

UPDATE "ExerciseCoach" SET "name" = 'Flexión de brazos con manos amplias', "searchName" = CASE WHEN "searchName" LIKE 'flexion de brazos manos amplias%' THEN 'flexion de brazos con manos amplias' || substr( "searchName", 32 ) ELSE "searchName" END
WHERE "name" = 'Flexión de brazos manos amplias' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1311' );
UPDATE "ExerciseGlobal" SET "name" = 'Flexión de brazos con manos amplias', "searchName" = CASE WHEN "searchName" LIKE 'flexion de brazos manos amplias%' THEN 'flexion de brazos con manos amplias' || substr( "searchName", 32 ) ELSE "searchName" END
WHERE "externalId" = '1311' AND "name" = 'Flexión de brazos manos amplias';

UPDATE "ExerciseCoach" SET "name" = 'Flexión de brazos sobre pelota medicinal', "searchName" = CASE WHEN "searchName" LIKE 'flexion de brazos pelota medicinal%' THEN 'flexion de brazos sobre pelota medicinal' || substr( "searchName", 35 ) ELSE "searchName" END
WHERE "name" = 'Flexión de brazos pelota medicinal' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0663' );
UPDATE "ExerciseGlobal" SET "name" = 'Flexión de brazos sobre pelota medicinal', "searchName" = CASE WHEN "searchName" LIKE 'flexion de brazos pelota medicinal%' THEN 'flexion de brazos sobre pelota medicinal' || substr( "searchName", 35 ) ELSE "searchName" END
WHERE "externalId" = '0663' AND "name" = 'Flexión de brazos pelota medicinal';

UPDATE "ExerciseCoach" SET "name" = 'Flexión de brazos inclinado (sobre cajón)', "searchName" = CASE WHEN "searchName" LIKE 'flexion de brazos (sobre box) inclinado%' THEN 'flexion de brazos inclinado (sobre cajon)' || substr( "searchName", 40 ) ELSE "searchName" END
WHERE "name" = 'Flexión de brazos (sobre box) inclinado' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '3785' );
UPDATE "ExerciseGlobal" SET "name" = 'Flexión de brazos inclinado (sobre cajón)', "searchName" = CASE WHEN "searchName" LIKE 'flexion de brazos (sobre box) inclinado%' THEN 'flexion de brazos inclinado (sobre cajon)' || substr( "searchName", 40 ) ELSE "searchName" END
WHERE "externalId" = '3785' AND "name" = 'Flexión de brazos (sobre box) inclinado';

UPDATE "ExerciseCoach" SET "name" = 'Flexión de brazos lateral acostado', "searchName" = CASE WHEN "searchName" LIKE 'flexion lateral%' THEN 'flexion de brazos lateral acostado' || substr( "searchName", 16 ) ELSE "searchName" END
WHERE "name" = 'Flexión lateral' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0717' );
UPDATE "ExerciseGlobal" SET "name" = 'Flexión de brazos lateral acostado', "searchName" = CASE WHEN "searchName" LIKE 'flexion lateral%' THEN 'flexion de brazos lateral acostado' || substr( "searchName", 16 ) ELSE "searchName" END
WHERE "externalId" = '0717' AND "name" = 'Flexión lateral';

UPDATE "ExerciseCoach" SET "name" = 'Patadas de aleteo', "searchName" = CASE WHEN "searchName" LIKE 'flutter kicks%' THEN 'patadas de aleteo' || substr( "searchName", 14 ) ELSE "searchName" END
WHERE "name" = 'Flutter kicks' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0459' );
UPDATE "ExerciseGlobal" SET "name" = 'Patadas de aleteo', "searchName" = CASE WHEN "searchName" LIKE 'flutter kicks%' THEN 'patadas de aleteo' || substr( "searchName", 14 ) ELSE "searchName" END
WHERE "externalId" = '0459' AND "name" = 'Flutter kicks';

UPDATE "ExerciseCoach" SET "name" = 'Fondos de pecho (sobre jaula de fondos)', "searchName" = CASE WHEN "searchName" LIKE 'fondos de pecho (sobre fondos-dominada cage)%' THEN 'fondos de pecho (sobre jaula de fondos)' || substr( "searchName", 45 ) ELSE "searchName" END
WHERE "name" = 'Fondos de pecho (sobre fondos-dominada cage)' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1430' );
UPDATE "ExerciseGlobal" SET "name" = 'Fondos de pecho (sobre jaula de fondos)', "searchName" = CASE WHEN "searchName" LIKE 'fondos de pecho (sobre fondos-dominada cage)%' THEN 'fondos de pecho (sobre jaula de fondos)' || substr( "searchName", 45 ) ELSE "searchName" END
WHERE "externalId" = '1430' AND "name" = 'Fondos de pecho (sobre fondos-dominada cage)';

UPDATE "ExerciseCoach" SET "name" = 'Dominada Gironda al esternón', "searchName" = CASE WHEN "searchName" LIKE 'gironda sternum chin%' THEN 'dominada gironda al esternon' || substr( "searchName", 21 ) ELSE "searchName" END
WHERE "name" = 'Gironda sternum chin' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0466' );
UPDATE "ExerciseGlobal" SET "name" = 'Dominada Gironda al esternón', "searchName" = CASE WHEN "searchName" LIKE 'gironda sternum chin%' THEN 'dominada gironda al esternon' || substr( "searchName", 21 ) ELSE "searchName" END
WHERE "externalId" = '0466' AND "name" = 'Gironda sternum chin';

UPDATE "ExerciseCoach" SET "name" = 'Giro (de arriba hacia abajo) en polea', "searchName" = CASE WHEN "searchName" LIKE 'giro (up-down) en polea%' THEN 'giro (de arriba hacia abajo) en polea' || substr( "searchName", 24 ) ELSE "searchName" END
WHERE "name" = 'Giro (up-down) en polea' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0862' );
UPDATE "ExerciseGlobal" SET "name" = 'Giro (de arriba hacia abajo) en polea', "searchName" = CASE WHEN "searchName" LIKE 'giro (up-down) en polea%' THEN 'giro (de arriba hacia abajo) en polea' || substr( "searchName", 24 ) ELSE "searchName" END
WHERE "externalId" = '0862' AND "name" = 'Giro (up-down) en polea';

UPDATE "ExerciseCoach" SET "name" = 'Dominada gorila', "searchName" = CASE WHEN "searchName" LIKE 'gorilla chin%' THEN 'dominada gorila' || substr( "searchName", 13 ) ELSE "searchName" END
WHERE "name" = 'Gorilla chin' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0467' );
UPDATE "ExerciseGlobal" SET "name" = 'Dominada gorila', "searchName" = CASE WHEN "searchName" LIKE 'gorilla chin%' THEN 'dominada gorila' || substr( "searchName", 13 ) ELSE "searchName" END
WHERE "externalId" = '0467' AND "name" = 'Gorilla chin';

UPDATE "ExerciseCoach" SET "name" = 'Press de banca guillotina con barra', "searchName" = CASE WHEN "searchName" LIKE 'guillotine press de banca con barra%' THEN 'press de banca guillotina con barra' || substr( "searchName", 36 ) ELSE "searchName" END
WHERE "name" = 'Guillotine press de banca con barra' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0045' );
UPDATE "ExerciseGlobal" SET "name" = 'Press de banca guillotina con barra', "searchName" = CASE WHEN "searchName" LIKE 'guillotine press de banca con barra%' THEN 'press de banca guillotina con barra' || substr( "searchName", 36 ) ELSE "searchName" END
WHERE "externalId" = '0045' AND "name" = 'Guillotine press de banca con barra';

UPDATE "ExerciseCoach" SET "name" = 'Hiperextensión inversa sobre pelota suiza', "searchName" = CASE WHEN "searchName" LIKE 'hiperextension inversa extension sobre pelota suiza%' THEN 'hiperextension inversa sobre pelota suiza' || substr( "searchName", 52 ) ELSE "searchName" END
WHERE "name" = 'Hiperextensión inversa Extensión sobre pelota suiza' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0675' );
UPDATE "ExerciseGlobal" SET "name" = 'Hiperextensión inversa sobre pelota suiza', "searchName" = CASE WHEN "searchName" LIKE 'hiperextension inversa extension sobre pelota suiza%' THEN 'hiperextension inversa sobre pelota suiza' || substr( "searchName", 52 ) ELSE "searchName" END
WHERE "externalId" = '0675' AND "name" = 'Hiperextensión inversa Extensión sobre pelota suiza';

UPDATE "ExerciseCoach" SET "name" = 'Cruz de hierro con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'iron cross con mancuerna%' THEN 'cruz de hierro con mancuerna' || substr( "searchName", 25 ) ELSE "searchName" END
WHERE "name" = 'Iron cross con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0332' );
UPDATE "ExerciseGlobal" SET "name" = 'Cruz de hierro con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'iron cross con mancuerna%' THEN 'cruz de hierro con mancuerna' || substr( "searchName", 25 ) ELSE "searchName" END
WHERE "externalId" = '0332' AND "name" = 'Iron cross con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Jalón con agarre amplio lateral a una mano en máquina', "searchName" = CASE WHEN "searchName" LIKE 'jalon agarre amplio lateral a una mano en maquina%' THEN 'jalon con agarre amplio lateral a una mano en maquina' || substr( "searchName", 50 ) ELSE "searchName" END
WHERE "name" = 'Jalón agarre amplio lateral a una mano en máquina' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1347' );
UPDATE "ExerciseGlobal" SET "name" = 'Jalón con agarre amplio lateral a una mano en máquina', "searchName" = CASE WHEN "searchName" LIKE 'jalon agarre amplio lateral a una mano en maquina%' THEN 'jalon con agarre amplio lateral a una mano en maquina' || substr( "searchName", 50 ) ELSE "searchName" END
WHERE "externalId" = '1347' AND "name" = 'Jalón agarre amplio lateral a una mano en máquina';

UPDATE "ExerciseCoach" SET "name" = 'Jalón al pecho con agarre doble en paralelas', "searchName" = CASE WHEN "searchName" LIKE 'jalon al pecho agarre doble en paralelas%' THEN 'jalon al pecho con agarre doble en paralelas' || substr( "searchName", 41 ) ELSE "searchName" END
WHERE "name" = 'Jalón al pecho agarre doble en paralelas' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0818' );
UPDATE "ExerciseGlobal" SET "name" = 'Jalón al pecho con agarre doble en paralelas', "searchName" = CASE WHEN "searchName" LIKE 'jalon al pecho agarre doble en paralelas%' THEN 'jalon al pecho con agarre doble en paralelas' || substr( "searchName", 41 ) ELSE "searchName" END
WHERE "externalId" = '0818' AND "name" = 'Jalón al pecho agarre doble en paralelas';

UPDATE "ExerciseCoach" SET "name" = 'Jalón al pecho con agarre inverso en máquina', "searchName" = CASE WHEN "searchName" LIKE 'jalon al pecho agarre inverso en maquina%' THEN 'jalon al pecho con agarre inverso en maquina' || substr( "searchName", 41 ) ELSE "searchName" END
WHERE "name" = 'Jalón al pecho agarre inverso en máquina' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0673' );
UPDATE "ExerciseGlobal" SET "name" = 'Jalón al pecho con agarre inverso en máquina', "searchName" = CASE WHEN "searchName" LIKE 'jalon al pecho agarre inverso en maquina%' THEN 'jalon al pecho con agarre inverso en maquina' || substr( "searchName", 41 ) ELSE "searchName" END
WHERE "externalId" = '0673' AND "name" = 'Jalón al pecho agarre inverso en máquina';

UPDATE "ExerciseCoach" SET "name" = 'Abdominal Janda', "searchName" = CASE WHEN "searchName" LIKE 'janda abdominal%' THEN 'abdominal janda' || substr( "searchName", 16 ) ELSE "searchName" END
WHERE "name" = 'Janda abdominal' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0508' );
UPDATE "ExerciseGlobal" SET "name" = 'Abdominal Janda', "searchName" = CASE WHEN "searchName" LIKE 'janda abdominal%' THEN 'abdominal janda' || substr( "searchName", 16 ) ELSE "searchName" END
WHERE "externalId" = '0508' AND "name" = 'Janda abdominal';

UPDATE "ExerciseCoach" SET "name" = 'Dominada en L', "searchName" = CASE WHEN "searchName" LIKE 'l-dominada%' THEN 'dominada en l' || substr( "searchName", 11 ) ELSE "searchName" END
WHERE "name" = 'L-dominada' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '3418' );
UPDATE "ExerciseGlobal" SET "name" = 'Dominada en L', "searchName" = CASE WHEN "searchName" LIKE 'l-dominada%' THEN 'dominada en l' || substr( "searchName", 11 ) ELSE "searchName" END
WHERE "externalId" = '3418' AND "name" = 'L-dominada';

UPDATE "ExerciseCoach" SET "name" = 'Hip thrust en banco con barra', "searchName" = CASE WHEN "searchName" LIKE 'levantamiento sobre cadera acostado con barra%' THEN 'hip thrust en banco con barra' || substr( "searchName", 46 ) ELSE "searchName" END
WHERE "name" = 'Levantamiento sobre cadera acostado con barra' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0058' );
UPDATE "ExerciseGlobal" SET "name" = 'Hip thrust en banco con barra', "searchName" = CASE WHEN "searchName" LIKE 'levantamiento sobre cadera acostado con barra%' THEN 'hip thrust en banco con barra' || substr( "searchName", 46 ) ELSE "searchName" END
WHERE "externalId" = '0058' AND "name" = 'Levantamiento sobre cadera acostado con barra';

UPDATE "ExerciseCoach" SET "name" = 'Bicicleta de manos', "searchName" = CASE WHEN "searchName" LIKE 'manos bike%' THEN 'bicicleta de manos' || substr( "searchName", 11 ) ELSE "searchName" END
WHERE "name" = 'Manos bike' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '2139' );
UPDATE "ExerciseGlobal" SET "name" = 'Bicicleta de manos', "searchName" = CASE WHEN "searchName" LIKE 'manos bike%' THEN 'bicicleta de manos' || substr( "searchName", 11 ) ELSE "searchName" END
WHERE "externalId" = '2139' AND "name" = 'Manos bike';

UPDATE "ExerciseCoach" SET "name" = 'Muscle-up con kipping', "searchName" = CASE WHEN "searchName" LIKE 'muscle-up kipping%' THEN 'muscle-up con kipping' || substr( "searchName", 18 ) ELSE "searchName" END
WHERE "name" = 'Muscle-up kipping' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0558' );
UPDATE "ExerciseGlobal" SET "name" = 'Muscle-up con kipping', "searchName" = CASE WHEN "searchName" LIKE 'muscle-up kipping%' THEN 'muscle-up con kipping' || substr( "searchName", 18 ) ELSE "searchName" END
WHERE "externalId" = '0558' AND "name" = 'Muscle-up kipping';

UPDATE "ExerciseCoach" SET "name" = 'Caminata del granjero', "searchName" = CASE WHEN "searchName" LIKE 'paseo del granjero%' THEN 'caminata del granjero' || substr( "searchName", 19 ) ELSE "searchName" END
WHERE "name" = 'Paseo del granjero' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '2133' );
UPDATE "ExerciseGlobal" SET "name" = 'Caminata del granjero', "searchName" = CASE WHEN "searchName" LIKE 'paseo del granjero%' THEN 'caminata del granjero' || substr( "searchName", 19 ) ELSE "searchName" END
WHERE "externalId" = '2133' AND "name" = 'Paseo del granjero';

UPDATE "ExerciseCoach" SET "name" = 'Paso atrás con alcance por encima de la cabeza', "searchName" = CASE WHEN "searchName" LIKE 'paso to por encima de la cabeza reach posterior%' THEN 'paso atras con alcance por encima de la cabeza' || substr( "searchName", 48 ) ELSE "searchName" END
WHERE "name" = 'Paso to por encima de la cabeza reach posterior' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1687' );
UPDATE "ExerciseGlobal" SET "name" = 'Paso atrás con alcance por encima de la cabeza', "searchName" = CASE WHEN "searchName" LIKE 'paso to por encima de la cabeza reach posterior%' THEN 'paso atras con alcance por encima de la cabeza' || substr( "searchName", 48 ) ELSE "searchName" END
WHERE "externalId" = '1687' AND "name" = 'Paso to por encima de la cabeza reach posterior';

UPDATE "ExerciseCoach" SET "name" = 'Patada de tríceps en posición de cigüeña con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'patada de triceps con en posicion de ciguena con mancuerna%' THEN 'patada de triceps en posicion de ciguena con mancuerna' || substr( "searchName", 59 ) ELSE "searchName" END
WHERE "name" = 'Patada de tríceps con en posición de cigüeña con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1742' );
UPDATE "ExerciseGlobal" SET "name" = 'Patada de tríceps en posición de cigüeña con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'patada de triceps con en posicion de ciguena con mancuerna%' THEN 'patada de triceps en posicion de ciguena con mancuerna' || substr( "searchName", 59 ) ELSE "searchName" END
WHERE "externalId" = '1742' AND "name" = 'Patada de tríceps con en posición de cigüeña con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Peso muerto con piernas rígidas y espalda recta con banda', "searchName" = CASE WHEN "searchName" LIKE 'peso muerto con espalda recta con piernas rigidas con banda%' THEN 'peso muerto con piernas rigidas y espalda recta con banda' || substr( "searchName", 60 ) ELSE "searchName" END
WHERE "name" = 'Peso muerto con espalda recta con piernas rígidas con banda' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1023' );
UPDATE "ExerciseGlobal" SET "name" = 'Peso muerto con piernas rígidas y espalda recta con banda', "searchName" = CASE WHEN "searchName" LIKE 'peso muerto con espalda recta con piernas rigidas con banda%' THEN 'peso muerto con piernas rigidas y espalda recta con banda' || substr( "searchName", 60 ) ELSE "searchName" END
WHERE "externalId" = '1023' AND "name" = 'Peso muerto con espalda recta con piernas rígidas con banda';

UPDATE "ExerciseCoach" SET "name" = 'Cargada de potencia', "searchName" = CASE WHEN "searchName" LIKE 'power cargada%' THEN 'cargada de potencia' || substr( "searchName", 14 ) ELSE "searchName" END
WHERE "name" = 'Power cargada' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0648' );
UPDATE "ExerciseGlobal" SET "name" = 'Cargada de potencia', "searchName" = CASE WHEN "searchName" LIKE 'power cargada%' THEN 'cargada de potencia' || substr( "searchName", 14 ) ELSE "searchName" END
WHERE "externalId" = '0648' AND "name" = 'Power cargada';

UPDATE "ExerciseCoach" SET "name" = 'Press con agarre inverso a una mano con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'press agarre inverso a una mano con mancuerna%' THEN 'press con agarre inverso a una mano con mancuerna' || substr( "searchName", 46 ) ELSE "searchName" END
WHERE "name" = 'Press agarre inverso a una mano con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1622' );
UPDATE "ExerciseGlobal" SET "name" = 'Press con agarre inverso a una mano con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'press agarre inverso a una mano con mancuerna%' THEN 'press con agarre inverso a una mano con mancuerna' || substr( "searchName", 46 ) ELSE "searchName" END
WHERE "externalId" = '1622' AND "name" = 'Press agarre inverso a una mano con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Press con agarre inverso declinado en máquina Smith', "searchName" = CASE WHEN "searchName" LIKE 'press agarre inverso declinado en maquina smith%' THEN 'press con agarre inverso declinado en maquina smith' || substr( "searchName", 48 ) ELSE "searchName" END
WHERE "name" = 'Press agarre inverso declinado en máquina Smith' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0754' );
UPDATE "ExerciseGlobal" SET "name" = 'Press con agarre inverso declinado en máquina Smith', "searchName" = CASE WHEN "searchName" LIKE 'press agarre inverso declinado en maquina smith%' THEN 'press con agarre inverso declinado en maquina smith' || substr( "searchName", 48 ) ELSE "searchName" END
WHERE "externalId" = '0754' AND "name" = 'Press agarre inverso declinado en máquina Smith';

UPDATE "ExerciseCoach" SET "name" = 'Press con agarre inverso en máquina Smith', "searchName" = CASE WHEN "searchName" LIKE 'press agarre inverso en maquina smith%' THEN 'press con agarre inverso en maquina smith' || substr( "searchName", 38 ) ELSE "searchName" END
WHERE "name" = 'Press agarre inverso en máquina Smith' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0764' );
UPDATE "ExerciseGlobal" SET "name" = 'Press con agarre inverso en máquina Smith', "searchName" = CASE WHEN "searchName" LIKE 'press agarre inverso en maquina smith%' THEN 'press con agarre inverso en maquina smith' || substr( "searchName", 38 ) ELSE "searchName" END
WHERE "externalId" = '0764' AND "name" = 'Press agarre inverso en máquina Smith';

UPDATE "ExerciseCoach" SET "name" = 'Press francés con agarre inverso con barra', "searchName" = CASE WHEN "searchName" LIKE 'press agarre inverso frances con barra%' THEN 'press frances con agarre inverso con barra' || substr( "searchName", 39 ) ELSE "searchName" END
WHERE "name" = 'Press agarre inverso francés con barra' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1721' );
UPDATE "ExerciseGlobal" SET "name" = 'Press francés con agarre inverso con barra', "searchName" = CASE WHEN "searchName" LIKE 'press agarre inverso frances con barra%' THEN 'press frances con agarre inverso con barra' || substr( "searchName", 39 ) ELSE "searchName" END
WHERE "externalId" = '1721' AND "name" = 'Press agarre inverso francés con barra';

UPDATE "ExerciseCoach" SET "name" = 'Press con agarre inverso inclinado con barra', "searchName" = CASE WHEN "searchName" LIKE 'press agarre inverso inclinado con barra%' THEN 'press con agarre inverso inclinado con barra' || substr( "searchName", 41 ) ELSE "searchName" END
WHERE "name" = 'Press agarre inverso inclinado con barra' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0048' );
UPDATE "ExerciseGlobal" SET "name" = 'Press con agarre inverso inclinado con barra', "searchName" = CASE WHEN "searchName" LIKE 'press agarre inverso inclinado con barra%' THEN 'press con agarre inverso inclinado con barra' || substr( "searchName", 41 ) ELSE "searchName" END
WHERE "externalId" = '0048' AND "name" = 'Press agarre inverso inclinado con barra';

UPDATE "ExerciseCoach" SET "name" = 'Press con agarre inverso inclinado en máquina Smith', "searchName" = CASE WHEN "searchName" LIKE 'press agarre inverso inclinado en maquina smith%' THEN 'press con agarre inverso inclinado en maquina smith' || substr( "searchName", 48 ) ELSE "searchName" END
WHERE "name" = 'Press agarre inverso inclinado en máquina Smith' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0758' );
UPDATE "ExerciseGlobal" SET "name" = 'Press con agarre inverso inclinado en máquina Smith', "searchName" = CASE WHEN "searchName" LIKE 'press agarre inverso inclinado en maquina smith%' THEN 'press con agarre inverso inclinado en maquina smith' || substr( "searchName", 48 ) ELSE "searchName" END
WHERE "externalId" = '0758' AND "name" = 'Press agarre inverso inclinado en máquina Smith';

UPDATE "ExerciseCoach" SET "name" = 'Press con agarre neutro de pie a una mano con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'press agarre neutro de pie a una mano con mancuerna%' THEN 'press con agarre neutro de pie a una mano con mancuerna' || substr( "searchName", 52 ) ELSE "searchName" END
WHERE "name" = 'Press agarre neutro de pie a una mano con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0424' );
UPDATE "ExerciseGlobal" SET "name" = 'Press con agarre neutro de pie a una mano con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'press agarre neutro de pie a una mano con mancuerna%' THEN 'press con agarre neutro de pie a una mano con mancuerna' || substr( "searchName", 52 ) ELSE "searchName" END
WHERE "externalId" = '0424' AND "name" = 'Press agarre neutro de pie a una mano con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Press con agarre neutro inclinado con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'press agarre neutro inclinado con mancuerna%' THEN 'press con agarre neutro inclinado con mancuerna' || substr( "searchName", 44 ) ELSE "searchName" END
WHERE "name" = 'Press agarre neutro inclinado con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0324' );
UPDATE "ExerciseGlobal" SET "name" = 'Press con agarre neutro inclinado con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'press agarre neutro inclinado con mancuerna%' THEN 'press con agarre neutro inclinado con mancuerna' || substr( "searchName", 44 ) ELSE "searchName" END
WHERE "externalId" = '0324' AND "name" = 'Press agarre neutro inclinado con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Press al mentón declinado con agarre cerrado con barra EZ', "searchName" = CASE WHEN "searchName" LIKE 'press al menton declinado agarre cerrado con barra ez%' THEN 'press al menton declinado con agarre cerrado con barra ez' || substr( "searchName", 54 ) ELSE "searchName" END
WHERE "name" = 'Press al mentón declinado agarre cerrado con barra EZ' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0448' );
UPDATE "ExerciseGlobal" SET "name" = 'Press al mentón declinado con agarre cerrado con barra EZ', "searchName" = CASE WHEN "searchName" LIKE 'press al menton declinado agarre cerrado con barra ez%' THEN 'press al menton declinado con agarre cerrado con barra ez' || substr( "searchName", 54 ) ELSE "searchName" END
WHERE "externalId" = '0448' AND "name" = 'Press al mentón declinado agarre cerrado con barra EZ';

UPDATE "ExerciseCoach" SET "name" = 'Press de banca con agarre amplio con barra', "searchName" = CASE WHEN "searchName" LIKE 'press de banca agarre amplio con barra%' THEN 'press de banca con agarre amplio con barra' || substr( "searchName", 39 ) ELSE "searchName" END
WHERE "name" = 'Press de banca agarre amplio con barra' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0122' );
UPDATE "ExerciseGlobal" SET "name" = 'Press de banca con agarre amplio con barra', "searchName" = CASE WHEN "searchName" LIKE 'press de banca agarre amplio con barra%' THEN 'press de banca con agarre amplio con barra' || substr( "searchName", 39 ) ELSE "searchName" END
WHERE "externalId" = '0122' AND "name" = 'Press de banca agarre amplio con barra';

UPDATE "ExerciseCoach" SET "name" = 'Press de banca con agarre amplio inverso con barra', "searchName" = CASE WHEN "searchName" LIKE 'press de banca agarre amplio inverso con barra%' THEN 'press de banca con agarre amplio inverso con barra' || substr( "searchName", 47 ) ELSE "searchName" END
WHERE "name" = 'Press de banca agarre amplio inverso con barra' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1258' );
UPDATE "ExerciseGlobal" SET "name" = 'Press de banca con agarre amplio inverso con barra', "searchName" = CASE WHEN "searchName" LIKE 'press de banca agarre amplio inverso con barra%' THEN 'press de banca con agarre amplio inverso con barra' || substr( "searchName", 47 ) ELSE "searchName" END
WHERE "externalId" = '1258' AND "name" = 'Press de banca agarre amplio inverso con barra';

UPDATE "ExerciseCoach" SET "name" = 'Press de banca con agarre cerrado con barra EZ', "searchName" = CASE WHEN "searchName" LIKE 'press de banca agarre cerrado con barra ez%' THEN 'press de banca con agarre cerrado con barra ez' || substr( "searchName", 43 ) ELSE "searchName" END
WHERE "name" = 'Press de banca agarre cerrado con barra EZ' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '2432' );
UPDATE "ExerciseGlobal" SET "name" = 'Press de banca con agarre cerrado con barra EZ', "searchName" = CASE WHEN "searchName" LIKE 'press de banca agarre cerrado con barra ez%' THEN 'press de banca con agarre cerrado con barra ez' || substr( "searchName", 43 ) ELSE "searchName" END
WHERE "externalId" = '2432' AND "name" = 'Press de banca agarre cerrado con barra EZ';

UPDATE "ExerciseCoach" SET "name" = 'Press de banca inclinado con agarre neutro con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'press de banca inclinado agarre neutro con mancuerna%' THEN 'press de banca inclinado con agarre neutro con mancuerna' || substr( "searchName", 53 ) ELSE "searchName" END
WHERE "name" = 'Press de banca inclinado agarre neutro con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1623' );
UPDATE "ExerciseGlobal" SET "name" = 'Press de banca inclinado con agarre neutro con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'press de banca inclinado agarre neutro con mancuerna%' THEN 'press de banca inclinado con agarre neutro con mancuerna' || substr( "searchName", 53 ) ELSE "searchName" END
WHERE "externalId" = '1623' AND "name" = 'Press de banca inclinado agarre neutro con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Press de banca declinado inverso con agarre cerrado en máquina Smith', "searchName" = CASE WHEN "searchName" LIKE 'press declinado inverso de banca con agarre cerrado en maquina smith%' THEN 'press de banca declinado inverso con agarre cerrado en maquina smith' || substr( "searchName", 69 ) ELSE "searchName" END
WHERE "name" = 'Press declinado inverso de banca con agarre cerrado en máquina Smith' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1626' );
UPDATE "ExerciseGlobal" SET "name" = 'Press de banca declinado inverso con agarre cerrado en máquina Smith', "searchName" = CASE WHEN "searchName" LIKE 'press declinado inverso de banca con agarre cerrado en maquina smith%' THEN 'press de banca declinado inverso con agarre cerrado en maquina smith' || substr( "searchName", 69 ) ELSE "searchName" END
WHERE "externalId" = '1626' AND "name" = 'Press declinado inverso de banca con agarre cerrado en máquina Smith';

UPDATE "ExerciseCoach" SET "name" = 'Press de hombros (variante 3) en máquina', "searchName" = CASE WHEN "searchName" LIKE 'press de hombros v. 3 en maquina%' THEN 'press de hombros (variante 3) en maquina' || substr( "searchName", 33 ) ELSE "searchName" END
WHERE "name" = 'Press de hombros v. 3 en máquina' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '2318' );
UPDATE "ExerciseGlobal" SET "name" = 'Press de hombros (variante 3) en máquina', "searchName" = CASE WHEN "searchName" LIKE 'press de hombros v. 3 en maquina%' THEN 'press de hombros (variante 3) en maquina' || substr( "searchName", 33 ) ELSE "searchName" END
WHERE "externalId" = '2318' AND "name" = 'Press de hombros v. 3 en máquina';

UPDATE "ExerciseCoach" SET "name" = 'Press de pie con agarre neutro con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'press de pie agarre neutro con mancuerna%' THEN 'press de pie con agarre neutro con mancuerna' || substr( "searchName", 41 ) ELSE "searchName" END
WHERE "name" = 'Press de pie agarre neutro con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0427' );
UPDATE "ExerciseGlobal" SET "name" = 'Press de pie con agarre neutro con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'press de pie agarre neutro con mancuerna%' THEN 'press de pie con agarre neutro con mancuerna' || substr( "searchName", 41 ) ELSE "searchName" END
WHERE "externalId" = '0427' AND "name" = 'Press de pie agarre neutro con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Press de banca JM con barra', "searchName" = CASE WHEN "searchName" LIKE 'press jm de banca con barra%' THEN 'press de banca jm con barra' || substr( "searchName", 28 ) ELSE "searchName" END
WHERE "name" = 'Press JM de banca con barra' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0052' );
UPDATE "ExerciseGlobal" SET "name" = 'Press de banca JM con barra', "searchName" = CASE WHEN "searchName" LIKE 'press jm de banca con barra%' THEN 'press de banca jm con barra' || substr( "searchName", 28 ) ELSE "searchName" END
WHERE "externalId" = '0052' AND "name" = 'Press JM de banca con barra';

UPDATE "ExerciseCoach" SET "name" = 'Press de banca JM con barra EZ', "searchName" = CASE WHEN "searchName" LIKE 'press jm de banca con barra ez%' THEN 'press de banca jm con barra ez' || substr( "searchName", 31 ) ELSE "searchName" END
WHERE "name" = 'Press JM de banca con barra EZ' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0450' );
UPDATE "ExerciseGlobal" SET "name" = 'Press de banca JM con barra EZ', "searchName" = CASE WHEN "searchName" LIKE 'press jm de banca con barra ez%' THEN 'press de banca jm con barra ez' || substr( "searchName", 31 ) ELSE "searchName" END
WHERE "externalId" = '0450' AND "name" = 'Press JM de banca con barra EZ';

UPDATE "ExerciseCoach" SET "name" = 'Press militar con agarre amplio de pie con barra', "searchName" = CASE WHEN "searchName" LIKE 'press militar agarre amplio de pie con barra%' THEN 'press militar con agarre amplio de pie con barra' || substr( "searchName", 45 ) ELSE "searchName" END
WHERE "name" = 'Press militar agarre amplio de pie con barra' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1457' );
UPDATE "ExerciseGlobal" SET "name" = 'Press militar con agarre amplio de pie con barra', "searchName" = CASE WHEN "searchName" LIKE 'press militar agarre amplio de pie con barra%' THEN 'press militar con agarre amplio de pie con barra' || substr( "searchName", 45 ) ELSE "searchName" END
WHERE "externalId" = '1457' AND "name" = 'Press militar agarre amplio de pie con barra';

UPDATE "ExerciseCoach" SET "name" = 'Pronación acostado con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'pronation acostado con mancuerna%' THEN 'pronacion acostado con mancuerna' || substr( "searchName", 33 ) ELSE "searchName" END
WHERE "name" = 'Pronation acostado con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0347' );
UPDATE "ExerciseGlobal" SET "name" = 'Pronación acostado con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'pronation acostado con mancuerna%' THEN 'pronacion acostado con mancuerna' || substr( "searchName", 33 ) ELSE "searchName" END
WHERE "externalId" = '0347' AND "name" = 'Pronation acostado con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Pronación acostado sobre piso con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'pronation sobre piso acostado con mancuerna%' THEN 'pronacion acostado sobre piso con mancuerna' || substr( "searchName", 44 ) ELSE "searchName" END
WHERE "name" = 'Pronation sobre piso acostado con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '2705' );
UPDATE "ExerciseGlobal" SET "name" = 'Pronación acostado sobre piso con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'pronation sobre piso acostado con mancuerna%' THEN 'pronacion acostado sobre piso con mancuerna' || substr( "searchName", 44 ) ELSE "searchName" END
WHERE "externalId" = '2705' AND "name" = 'Pronation sobre piso acostado con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Remo con agarre estrecho en máquina Smith', "searchName" = CASE WHEN "searchName" LIKE 'remo agarre estrecho en maquina smith%' THEN 'remo con agarre estrecho en maquina smith' || substr( "searchName", 38 ) ELSE "searchName" END
WHERE "name" = 'Remo agarre estrecho en máquina Smith' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0761' );
UPDATE "ExerciseGlobal" SET "name" = 'Remo con agarre estrecho en máquina Smith', "searchName" = CASE WHEN "searchName" LIKE 'remo agarre estrecho en maquina smith%' THEN 'remo con agarre estrecho en maquina smith' || substr( "searchName", 38 ) ELSE "searchName" END
WHERE "externalId" = '0761' AND "name" = 'Remo agarre estrecho en máquina Smith';

UPDATE "ExerciseCoach" SET "name" = 'Remo al mentón (variante 3) con barra', "searchName" = CASE WHEN "searchName" LIKE 'remo al menton v. 3 con barra%' THEN 'remo al menton (variante 3) con barra' || substr( "searchName", 30 ) ELSE "searchName" END
WHERE "name" = 'Remo al mentón v. 3 con barra' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0121' );
UPDATE "ExerciseGlobal" SET "name" = 'Remo al mentón (variante 3) con barra', "searchName" = CASE WHEN "searchName" LIKE 'remo al menton v. 3 con barra%' THEN 'remo al menton (variante 3) con barra' || substr( "searchName", 30 ) ELSE "searchName" END
WHERE "externalId" = '0121' AND "name" = 'Remo al mentón v. 3 con barra';

UPDATE "ExerciseCoach" SET "name" = 'Remo de pie con agarre cerrado a una mano', "searchName" = CASE WHEN "searchName" LIKE 'remo de pie agarre cerrado a una mano%' THEN 'remo de pie con agarre cerrado a una mano' || substr( "searchName", 38 ) ELSE "searchName" END
WHERE "name" = 'Remo de pie agarre cerrado a una mano' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '3156' );
UPDATE "ExerciseGlobal" SET "name" = 'Remo de pie con agarre cerrado a una mano', "searchName" = CASE WHEN "searchName" LIKE 'remo de pie agarre cerrado a una mano%' THEN 'remo de pie con agarre cerrado a una mano' || substr( "searchName", 38 ) ELSE "searchName" END
WHERE "externalId" = '3156' AND "name" = 'Remo de pie agarre cerrado a una mano';

UPDATE "ExerciseCoach" SET "name" = 'Remo en banco inclinado con agarre inverso a dos manos con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'remo en banco inclinado agarre inverso a dos manos con mancuerna%' THEN 'remo en banco inclinado con agarre inverso a dos manos con mancuerna' || substr( "searchName", 65 ) ELSE "searchName" END
WHERE "name" = 'Remo en banco inclinado agarre inverso a dos manos con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1331' );
UPDATE "ExerciseGlobal" SET "name" = 'Remo en banco inclinado con agarre inverso a dos manos con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'remo en banco inclinado agarre inverso a dos manos con mancuerna%' THEN 'remo en banco inclinado con agarre inverso a dos manos con mancuerna' || substr( "searchName", 65 ) ELSE "searchName" END
WHERE "externalId" = '1331' AND "name" = 'Remo en banco inclinado agarre inverso a dos manos con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Remo en banco inclinado con agarre inverso a una mano con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'remo en banco inclinado agarre inverso a una mano con mancuerna%' THEN 'remo en banco inclinado con agarre inverso a una mano con mancuerna' || substr( "searchName", 64 ) ELSE "searchName" END
WHERE "name" = 'Remo en banco inclinado agarre inverso a una mano con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1330' );
UPDATE "ExerciseGlobal" SET "name" = 'Remo en banco inclinado con agarre inverso a una mano con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'remo en banco inclinado agarre inverso a una mano con mancuerna%' THEN 'remo en banco inclinado con agarre inverso a una mano con mancuerna' || substr( "searchName", 64 ) ELSE "searchName" END
WHERE "externalId" = '1330' AND "name" = 'Remo en banco inclinado agarre inverso a una mano con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Remo en banco inclinado con agarre inverso con barra', "searchName" = CASE WHEN "searchName" LIKE 'remo en banco inclinado agarre inverso con barra%' THEN 'remo en banco inclinado con agarre inverso con barra' || substr( "searchName", 49 ) ELSE "searchName" END
WHERE "name" = 'Remo en banco inclinado agarre inverso con barra' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1317' );
UPDATE "ExerciseGlobal" SET "name" = 'Remo en banco inclinado con agarre inverso con barra', "searchName" = CASE WHEN "searchName" LIKE 'remo en banco inclinado agarre inverso con barra%' THEN 'remo en banco inclinado con agarre inverso con barra' || substr( "searchName", 49 ) ELSE "searchName" END
WHERE "externalId" = '1317' AND "name" = 'Remo en banco inclinado agarre inverso con barra';

UPDATE "ExerciseCoach" SET "name" = 'Remo para deltoides posterior acostado con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'remo para deltoides acostado posterior con mancuerna%' THEN 'remo para deltoides posterior acostado con mancuerna' || substr( "searchName", 53 ) ELSE "searchName" END
WHERE "name" = 'Remo para deltoides acostado posterior con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1328' );
UPDATE "ExerciseGlobal" SET "name" = 'Remo para deltoides posterior acostado con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'remo para deltoides acostado posterior con mancuerna%' THEN 'remo para deltoides posterior acostado con mancuerna' || substr( "searchName", 53 ) ELSE "searchName" END
WHERE "externalId" = '1328' AND "name" = 'Remo para deltoides acostado posterior con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Remo para deltoides posterior de pie con banda', "searchName" = CASE WHEN "searchName" LIKE 'remo para deltoides de pie posterior con banda%' THEN 'remo para deltoides posterior de pie con banda' || substr( "searchName", 47 ) ELSE "searchName" END
WHERE "name" = 'Remo para deltoides de pie posterior con banda' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1022' );
UPDATE "ExerciseGlobal" SET "name" = 'Remo para deltoides posterior de pie con banda', "searchName" = CASE WHEN "searchName" LIKE 'remo para deltoides de pie posterior con banda%' THEN 'remo para deltoides posterior de pie con banda' || substr( "searchName", 47 ) ELSE "searchName" END
WHERE "externalId" = '1022' AND "name" = 'Remo para deltoides de pie posterior con banda';

UPDATE "ExerciseCoach" SET "name" = 'Remo para deltoides posterior de pie con cuerda en polea', "searchName" = CASE WHEN "searchName" LIKE 'remo para deltoides de pie posterior con cuerda en polea%' THEN 'remo para deltoides posterior de pie con cuerda en polea' || substr( "searchName", 57 ) ELSE "searchName" END
WHERE "name" = 'Remo para deltoides de pie posterior con cuerda en polea' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0233' );
UPDATE "ExerciseGlobal" SET "name" = 'Remo para deltoides posterior de pie con cuerda en polea', "searchName" = CASE WHEN "searchName" LIKE 'remo para deltoides de pie posterior con cuerda en polea%' THEN 'remo para deltoides posterior de pie con cuerda en polea' || substr( "searchName", 57 ) ELSE "searchName" END
WHERE "externalId" = '0233' AND "name" = 'Remo para deltoides de pie posterior con cuerda en polea';

UPDATE "ExerciseCoach" SET "name" = 'Remo para deltoides posterior de rodillas con cuerda en polea', "searchName" = CASE WHEN "searchName" LIKE 'remo para deltoides de rodillas posterior con cuerda en polea%' THEN 'remo para deltoides posterior de rodillas con cuerda en polea' || substr( "searchName", 62 ) ELSE "searchName" END
WHERE "name" = 'Remo para deltoides de rodillas posterior con cuerda en polea' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '3697' );
UPDATE "ExerciseGlobal" SET "name" = 'Remo para deltoides posterior de rodillas con cuerda en polea', "searchName" = CASE WHEN "searchName" LIKE 'remo para deltoides de rodillas posterior con cuerda en polea%' THEN 'remo para deltoides posterior de rodillas con cuerda en polea' || substr( "searchName", 62 ) ELSE "searchName" END
WHERE "externalId" = '3697' AND "name" = 'Remo para deltoides de rodillas posterior con cuerda en polea';

UPDATE "ExerciseCoach" SET "name" = 'Remo en barra T con agarre inverso en máquina', "searchName" = CASE WHEN "searchName" LIKE 'remo t-bar agarre inverso en maquina%' THEN 'remo en barra t con agarre inverso en maquina' || substr( "searchName", 37 ) ELSE "searchName" END
WHERE "name" = 'Remo T-bar agarre inverso en máquina' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1351' );
UPDATE "ExerciseGlobal" SET "name" = 'Remo en barra T con agarre inverso en máquina', "searchName" = CASE WHEN "searchName" LIKE 'remo t-bar agarre inverso en maquina%' THEN 'remo en barra t con agarre inverso en maquina' || substr( "searchName", 37 ) ELSE "searchName" END
WHERE "externalId" = '1351' AND "name" = 'Remo T-bar agarre inverso en máquina';

UPDATE "ExerciseCoach" SET "name" = 'Remo en T inverso en máquina', "searchName" = CASE WHEN "searchName" LIKE 'remo t inverso en maquina%' THEN 'remo en t inverso en maquina' || substr( "searchName", 26 ) ELSE "searchName" END
WHERE "name" = 'Remo T inverso en máquina' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1349' );
UPDATE "ExerciseGlobal" SET "name" = 'Remo en T inverso en máquina', "searchName" = CASE WHEN "searchName" LIKE 'remo t inverso en maquina%' THEN 'remo en t inverso en maquina' || substr( "searchName", 26 ) ELSE "searchName" END
WHERE "externalId" = '1349' AND "name" = 'Remo T inverso en máquina';

UPDATE "ExerciseCoach" SET "name" = 'Dominada Rocky con jalón', "searchName" = CASE WHEN "searchName" LIKE 'rocky dominada jalon%' THEN 'dominada rocky con jalon' || substr( "searchName", 21 ) ELSE "searchName" END
WHERE "name" = 'Rocky dominada jalón' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0678' );
UPDATE "ExerciseGlobal" SET "name" = 'Dominada Rocky con jalón', "searchName" = CASE WHEN "searchName" LIKE 'rocky dominada jalon%' THEN 'dominada rocky con jalon' || substr( "searchName", 21 ) ELSE "searchName" END
WHERE "externalId" = '0678' AND "name" = 'Rocky dominada jalón';

UPDATE "ExerciseCoach" SET "name" = 'Giro acostado con rodillas flexionadas', "searchName" = CASE WHEN "searchName" LIKE 'rodillas flexionadas acostado giro%' THEN 'giro acostado con rodillas flexionadas' || substr( "searchName", 35 ) ELSE "searchName" END
WHERE "name" = 'Rodillas flexionadas acostado giro' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '3639' );
UPDATE "ExerciseGlobal" SET "name" = 'Giro acostado con rodillas flexionadas', "searchName" = CASE WHEN "searchName" LIKE 'rodillas flexionadas acostado giro%' THEN 'giro acostado con rodillas flexionadas' || substr( "searchName", 35 ) ELSE "searchName" END
WHERE "externalId" = '3639' AND "name" = 'Rodillas flexionadas acostado giro';

UPDATE "ExerciseCoach" SET "name" = 'Gemelos rotatorio en máquina', "searchName" = CASE WHEN "searchName" LIKE 'rotary calf en maquina%' THEN 'gemelos rotatorio en maquina' || substr( "searchName", 23 ) ELSE "searchName" END
WHERE "name" = 'Rotary calf en máquina' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '2315' );
UPDATE "ExerciseGlobal" SET "name" = 'Gemelos rotatorio en máquina', "searchName" = CASE WHEN "searchName" LIKE 'rotary calf en maquina%' THEN 'gemelos rotatorio en maquina' || substr( "searchName", 23 ) ELSE "searchName" END
WHERE "externalId" = '2315' AND "name" = 'Rotary calf en máquina';

UPDATE "ExerciseCoach" SET "name" = 'Giro ruso sobre pelota suiza en polea', "searchName" = CASE WHEN "searchName" LIKE 'russian twists sobre pelota suiza en polea%' THEN 'giro ruso sobre pelota suiza en polea' || substr( "searchName", 43 ) ELSE "searchName" END
WHERE "name" = 'Russian twists sobre pelota suiza en polea' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0211' );
UPDATE "ExerciseGlobal" SET "name" = 'Giro ruso sobre pelota suiza en polea', "searchName" = CASE WHEN "searchName" LIKE 'russian twists sobre pelota suiza en polea%' THEN 'giro ruso sobre pelota suiza en polea' || substr( "searchName", 43 ) ELSE "searchName" END
WHERE "externalId" = '0211' AND "name" = 'Russian twists sobre pelota suiza en polea';

UPDATE "ExerciseCoach" SET "name" = 'Bajada del cajón con estabilización a una pierna', "searchName" = CASE WHEN "searchName" LIKE 'salto al cajon down con a una pierna stabilization%' THEN 'bajada del cajon con estabilizacion a una pierna' || substr( "searchName", 51 ) ELSE "searchName" END
WHERE "name" = 'Salto al cajón down con a una pierna stabilization' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1374' );
UPDATE "ExerciseGlobal" SET "name" = 'Bajada del cajón con estabilización a una pierna', "searchName" = CASE WHEN "searchName" LIKE 'salto al cajon down con a una pierna stabilization%' THEN 'bajada del cajon con estabilizacion a una pierna' || substr( "searchName", 51 ) ELSE "searchName" END
WHERE "externalId" = '1374' AND "name" = 'Salto al cajón down con a una pierna stabilization';

UPDATE "ExerciseCoach" SET "name" = 'Dominada escapular', "searchName" = CASE WHEN "searchName" LIKE 'scapular dominada%' THEN 'dominada escapular' || substr( "searchName", 18 ) ELSE "searchName" END
WHERE "name" = 'Scapular dominada' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0688' );
UPDATE "ExerciseGlobal" SET "name" = 'Dominada escapular', "searchName" = CASE WHEN "searchName" LIKE 'scapular dominada%' THEN 'dominada escapular' || substr( "searchName", 18 ) ELSE "searchName" END
WHERE "externalId" = '0688' AND "name" = 'Scapular dominada';

UPDATE "ExerciseCoach" SET "name" = 'Saltos en tijera', "searchName" = CASE WHEN "searchName" LIKE 'scissor jumps%' THEN 'saltos en tijera' || substr( "searchName", 14 ) ELSE "searchName" END
WHERE "name" = 'Scissor jumps' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '3219' );
UPDATE "ExerciseGlobal" SET "name" = 'Saltos en tijera', "searchName" = CASE WHEN "searchName" LIKE 'scissor jumps%' THEN 'saltos en tijera' || substr( "searchName", 14 ) ELSE "searchName" END
WHERE "externalId" = '3219' AND "name" = 'Scissor jumps';

UPDATE "ExerciseCoach" SET "name" = 'Media sentadilla con salto', "searchName" = CASE WHEN "searchName" LIKE 'semi sentadilla salto%' THEN 'media sentadilla con salto' || substr( "searchName", 22 ) ELSE "searchName" END
WHERE "name" = 'Semi sentadilla salto' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '3222' );
UPDATE "ExerciseGlobal" SET "name" = 'Media sentadilla con salto', "searchName" = CASE WHEN "searchName" LIKE 'semi sentadilla salto%' THEN 'media sentadilla con salto' || substr( "searchName", 22 ) ELSE "searchName" END
WHERE "externalId" = '3222' AND "name" = 'Semi sentadilla salto';

UPDATE "ExerciseCoach" SET "name" = 'Sentadilla de reverencia', "searchName" = CASE WHEN "searchName" LIKE 'sentadilla curtsey%' THEN 'sentadilla de reverencia' || substr( "searchName", 19 ) ELSE "searchName" END
WHERE "name" = 'Sentadilla curtsey' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '3769' );
UPDATE "ExerciseGlobal" SET "name" = 'Sentadilla de reverencia', "searchName" = CASE WHEN "searchName" LIKE 'sentadilla curtsey%' THEN 'sentadilla de reverencia' || substr( "searchName", 19 ) ELSE "searchName" END
WHERE "externalId" = '3769' AND "name" = 'Sentadilla curtsey';

UPDATE "ExerciseCoach" SET "name" = 'Sentadilla profunda (potty)', "searchName" = CASE WHEN "searchName" LIKE 'sentadilla potty%' THEN 'sentadilla profunda (potty)' || substr( "searchName", 17 ) ELSE "searchName" END
WHERE "name" = 'Sentadilla potty' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '3119' );
UPDATE "ExerciseGlobal" SET "name" = 'Sentadilla profunda (potty)', "searchName" = CASE WHEN "searchName" LIKE 'sentadilla potty%' THEN 'sentadilla profunda (potty)' || substr( "searchName", 17 ) ELSE "searchName" END
WHERE "externalId" = '3119' AND "name" = 'Sentadilla potty';

UPDATE "ExerciseCoach" SET "name" = 'Sentadilla profunda (potty) con apoyo', "searchName" = CASE WHEN "searchName" LIKE 'sentadilla potty con apoyo%' THEN 'sentadilla profunda (potty) con apoyo' || substr( "searchName", 27 ) ELSE "searchName" END
WHERE "name" = 'Sentadilla potty con apoyo' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '3132' );
UPDATE "ExerciseGlobal" SET "name" = 'Sentadilla profunda (potty) con apoyo', "searchName" = CASE WHEN "searchName" LIKE 'sentadilla potty con apoyo%' THEN 'sentadilla profunda (potty) con apoyo' || substr( "searchName", 27 ) ELSE "searchName" END
WHERE "externalId" = '3132' AND "name" = 'Sentadilla potty con apoyo';

UPDATE "ExerciseCoach" SET "name" = 'Sentadilla con salto y estocada hacia atrás con barra', "searchName" = CASE WHEN "searchName" LIKE 'sentadilla salto paso estocada hacia atras con barra%' THEN 'sentadilla con salto y estocada hacia atras con barra' || substr( "searchName", 53 ) ELSE "searchName" END
WHERE "name" = 'Sentadilla salto paso estocada hacia atrás con barra' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '2798' );
UPDATE "ExerciseGlobal" SET "name" = 'Sentadilla con salto y estocada hacia atrás con barra', "searchName" = CASE WHEN "searchName" LIKE 'sentadilla salto paso estocada hacia atras con barra%' THEN 'sentadilla con salto y estocada hacia atras con barra' || substr( "searchName", 53 ) ELSE "searchName" END
WHERE "externalId" = '2798' AND "name" = 'Sentadilla salto paso estocada hacia atrás con barra';

UPDATE "ExerciseCoach" SET "name" = 'Sentadilla con alcance por encima de la cabeza', "searchName" = CASE WHEN "searchName" LIKE 'sentadilla to por encima de la cabeza reach%' THEN 'sentadilla con alcance por encima de la cabeza' || substr( "searchName", 44 ) ELSE "searchName" END
WHERE "name" = 'Sentadilla to por encima de la cabeza reach' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1685' );
UPDATE "ExerciseGlobal" SET "name" = 'Sentadilla con alcance por encima de la cabeza', "searchName" = CASE WHEN "searchName" LIKE 'sentadilla to por encima de la cabeza reach%' THEN 'sentadilla con alcance por encima de la cabeza' || substr( "searchName", 44 ) ELSE "searchName" END
WHERE "externalId" = '1685' AND "name" = 'Sentadilla to por encima de la cabeza reach';

UPDATE "ExerciseCoach" SET "name" = 'Sentadilla con alcance por encima de la cabeza y giro', "searchName" = CASE WHEN "searchName" LIKE 'sentadilla to por encima de la cabeza reach con giro%' THEN 'sentadilla con alcance por encima de la cabeza y giro' || substr( "searchName", 53 ) ELSE "searchName" END
WHERE "name" = 'Sentadilla to por encima de la cabeza reach con giro' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1686' );
UPDATE "ExerciseGlobal" SET "name" = 'Sentadilla con alcance por encima de la cabeza y giro', "searchName" = CASE WHEN "searchName" LIKE 'sentadilla to por encima de la cabeza reach con giro%' THEN 'sentadilla con alcance por encima de la cabeza y giro' || substr( "searchName", 53 ) ELSE "searchName" END
WHERE "externalId" = '1686' AND "name" = 'Sentadilla to por encima de la cabeza reach con giro';

UPDATE "ExerciseCoach" SET "name" = 'Sentadilla isométrica en pared con extensión de pierna', "searchName" = CASE WHEN "searchName" LIKE 'sentado con patada exterior%' THEN 'sentadilla isometrica en pared con extension de pierna' || substr( "searchName", 28 ) ELSE "searchName" END
WHERE "name" = 'Sentado con patada exterior' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0555' );
UPDATE "ExerciseGlobal" SET "name" = 'Sentadilla isométrica en pared con extensión de pierna', "searchName" = CASE WHEN "searchName" LIKE 'sentado con patada exterior%' THEN 'sentadilla isometrica en pared con extension de pierna' || substr( "searchName", 28 ) ELSE "searchName" END
WHERE "externalId" = '0555' AND "name" = 'Sentado con patada exterior';

UPDATE "ExerciseCoach" SET "name" = 'Marcha sentado (pared)', "searchName" = CASE WHEN "searchName" LIKE 'sentado de marcha (pared)%' THEN 'marcha sentado (pared)' || substr( "searchName", 26 ) ELSE "searchName" END
WHERE "name" = 'Sentado de marcha (pared)' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0624' );
UPDATE "ExerciseGlobal" SET "name" = 'Marcha sentado (pared)', "searchName" = CASE WHEN "searchName" LIKE 'sentado de marcha (pared)%' THEN 'marcha sentado (pared)' || substr( "searchName", 26 ) ELSE "searchName" END
WHERE "externalId" = '0624' AND "name" = 'Sentado de marcha (pared)';

UPDATE "ExerciseCoach" SET "name" = 'Esquiador con barra', "searchName" = CASE WHEN "searchName" LIKE 'skier con barra%' THEN 'esquiador con barra' || substr( "searchName", 16 ) ELSE "searchName" END
WHERE "name" = 'Skier con barra' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0100' );
UPDATE "ExerciseGlobal" SET "name" = 'Esquiador con barra', "searchName" = CASE WHEN "searchName" LIKE 'skier con barra%' THEN 'esquiador con barra' || substr( "searchName", 16 ) ELSE "searchName" END
WHERE "externalId" = '0100' AND "name" = 'Skier con barra';

UPDATE "ExerciseCoach" SET "name" = 'Ergómetro de esquí', "searchName" = CASE WHEN "searchName" LIKE 'ski ergometer%' THEN 'ergometro de esqui' || substr( "searchName", 14 ) ELSE "searchName" END
WHERE "name" = 'Ski ergometer' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '2142' );
UPDATE "ExerciseGlobal" SET "name" = 'Ergómetro de esquí', "searchName" = CASE WHEN "searchName" LIKE 'ski ergometer%' THEN 'ergometro de esqui' || substr( "searchName", 14 ) ELSE "searchName" END
WHERE "externalId" = '2142' AND "name" = 'Ski ergometer';

UPDATE "ExerciseCoach" SET "name" = 'Paso de esquí', "searchName" = CASE WHEN "searchName" LIKE 'ski paso%' THEN 'paso de esqui' || substr( "searchName", 9 ) ELSE "searchName" END
WHERE "name" = 'Ski paso' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '3671' );
UPDATE "ExerciseGlobal" SET "name" = 'Paso de esquí', "searchName" = CASE WHEN "searchName" LIKE 'ski paso%' THEN 'paso de esqui' || substr( "searchName", 9 ) ELSE "searchName" END
WHERE "externalId" = '3671' AND "name" = 'Ski paso';

UPDATE "ExerciseCoach" SET "name" = 'Golpe con maza', "searchName" = CASE WHEN "searchName" LIKE 'sledge hammer%' THEN 'golpe con maza' || substr( "searchName", 14 ) ELSE "searchName" END
WHERE "name" = 'Sledge hammer' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1496' );
UPDATE "ExerciseGlobal" SET "name" = 'Golpe con maza', "searchName" = CASE WHEN "searchName" LIKE 'sledge hammer%' THEN 'golpe con maza' || substr( "searchName", 14 ) ELSE "searchName" END
WHERE "externalId" = '1496' AND "name" = 'Sledge hammer';

UPDATE "ExerciseCoach" SET "name" = 'Sentadilla rápida con barra', "searchName" = CASE WHEN "searchName" LIKE 'speed sentadilla con barra%' THEN 'sentadilla rapida con barra' || substr( "searchName", 27 ) ELSE "searchName" END
WHERE "name" = 'Speed sentadilla con barra' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0101' );
UPDATE "ExerciseGlobal" SET "name" = 'Sentadilla rápida con barra', "searchName" = CASE WHEN "searchName" LIKE 'speed sentadilla con barra%' THEN 'sentadilla rapida con barra' || substr( "searchName", 27 ) ELSE "searchName" END
WHERE "externalId" = '0101' AND "name" = 'Speed sentadilla con barra';

UPDATE "ExerciseCoach" SET "name" = 'Esfinge', "searchName" = CASE WHEN "searchName" LIKE 'sphinx%' THEN 'esfinge' || substr( "searchName", 7 ) ELSE "searchName" END
WHERE "name" = 'Sphinx' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1362' );
UPDATE "ExerciseGlobal" SET "name" = 'Esfinge', "searchName" = CASE WHEN "searchName" LIKE 'sphinx%' THEN 'esfinge' || substr( "searchName", 7 ) ELSE "searchName" END
WHERE "externalId" = '1362' AND "name" = 'Sphinx';

UPDATE "ExerciseCoach" SET "name" = 'Salto estrella', "searchName" = CASE WHEN "searchName" LIKE 'star salto%' THEN 'salto estrella' || substr( "searchName", 11 ) ELSE "searchName" END
WHERE "name" = 'Star salto' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '3223' );
UPDATE "ExerciseGlobal" SET "name" = 'Salto estrella', "searchName" = CASE WHEN "searchName" LIKE 'star salto%' THEN 'salto estrella' || substr( "searchName", 11 ) ELSE "searchName" END
WHERE "externalId" = '3223' AND "name" = 'Star salto';

UPDATE "ExerciseCoach" SET "name" = 'Subida al banco con sentadilla dividida con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'subida al sentadilla a banco dividida con mancuerna%' THEN 'subida al banco con sentadilla dividida con mancuerna' || substr( "searchName", 52 ) ELSE "searchName" END
WHERE "name" = 'Subida al sentadilla a banco dividida con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '2812' );
UPDATE "ExerciseGlobal" SET "name" = 'Subida al banco con sentadilla dividida con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'subida al sentadilla a banco dividida con mancuerna%' THEN 'subida al banco con sentadilla dividida con mancuerna' || substr( "searchName", 52 ) ELSE "searchName" END
WHERE "externalId" = '2812' AND "name" = 'Subida al sentadilla a banco dividida con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Supinación acostado con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'supination acostado con mancuerna%' THEN 'supinacion acostado con mancuerna' || substr( "searchName", 34 ) ELSE "searchName" END
WHERE "name" = 'Supination acostado con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0349' );
UPDATE "ExerciseGlobal" SET "name" = 'Supinación acostado con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'supination acostado con mancuerna%' THEN 'supinacion acostado con mancuerna' || substr( "searchName", 34 ) ELSE "searchName" END
WHERE "externalId" = '0349' AND "name" = 'Supination acostado con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Supinación acostado sobre piso con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'supination sobre piso acostado con mancuerna%' THEN 'supinacion acostado sobre piso con mancuerna' || substr( "searchName", 45 ) ELSE "searchName" END
WHERE "name" = 'Supination sobre piso acostado con mancuerna' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '2706' );
UPDATE "ExerciseGlobal" SET "name" = 'Supinación acostado sobre piso con mancuerna', "searchName" = CASE WHEN "searchName" LIKE 'supination sobre piso acostado con mancuerna%' THEN 'supinacion acostado sobre piso con mancuerna' || substr( "searchName", 45 ) ELSE "searchName" END
WHERE "externalId" = '2706' AND "name" = 'Supination sobre piso acostado con mancuerna';

UPDATE "ExerciseCoach" SET "name" = 'Fallout abdominal en suspensión', "searchName" = CASE WHEN "searchName" LIKE 'suspended abdominal fallout%' THEN 'fallout abdominal en suspension' || substr( "searchName", 28 ) ELSE "searchName" END
WHERE "name" = 'Suspended abdominal fallout' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0805' );
UPDATE "ExerciseGlobal" SET "name" = 'Fallout abdominal en suspensión', "searchName" = CASE WHEN "searchName" LIKE 'suspended abdominal fallout%' THEN 'fallout abdominal en suspension' || substr( "searchName", 28 ) ELSE "searchName" END
WHERE "externalId" = '0805' AND "name" = 'Suspended abdominal fallout';

UPDATE "ExerciseCoach" SET "name" = 'Crunch inverso en suspensión', "searchName" = CASE WHEN "searchName" LIKE 'suspended crunch inverso%' THEN 'crunch inverso en suspension' || substr( "searchName", 25 ) ELSE "searchName" END
WHERE "name" = 'Suspended crunch inverso' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0807' );
UPDATE "ExerciseGlobal" SET "name" = 'Crunch inverso en suspensión', "searchName" = CASE WHEN "searchName" LIKE 'suspended crunch inverso%' THEN 'crunch inverso en suspension' || substr( "searchName", 25 ) ELSE "searchName" END
WHERE "externalId" = '0807' AND "name" = 'Suspended crunch inverso';

UPDATE "ExerciseCoach" SET "name" = 'Remo en suspensión', "searchName" = CASE WHEN "searchName" LIKE 'suspended remo%' THEN 'remo en suspension' || substr( "searchName", 15 ) ELSE "searchName" END
WHERE "name" = 'Suspended remo' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0808' );
UPDATE "ExerciseGlobal" SET "name" = 'Remo en suspensión', "searchName" = CASE WHEN "searchName" LIKE 'suspended remo%' THEN 'remo en suspension' || substr( "searchName", 15 ) ELSE "searchName" END
WHERE "externalId" = '0808' AND "name" = 'Suspended remo';

UPDATE "ExerciseCoach" SET "name" = 'Sentadilla dividida en suspensión', "searchName" = CASE WHEN "searchName" LIKE 'suspended sentadilla dividida%' THEN 'sentadilla dividida en suspension' || substr( "searchName", 30 ) ELSE "searchName" END
WHERE "name" = 'Suspended sentadilla dividida' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0809' );
UPDATE "ExerciseGlobal" SET "name" = 'Sentadilla dividida en suspensión', "searchName" = CASE WHEN "searchName" LIKE 'suspended sentadilla dividida%' THEN 'sentadilla dividida en suspension' || substr( "searchName", 30 ) ELSE "searchName" END
WHERE "externalId" = '0809' AND "name" = 'Suspended sentadilla dividida';

UPDATE "ExerciseCoach" SET "name" = 'Remo kayak Thibaudeau en polea', "searchName" = CASE WHEN "searchName" LIKE 'thibaudeau kayak remo en polea%' THEN 'remo kayak thibaudeau en polea' || substr( "searchName", 31 ) ELSE "searchName" END
WHERE "name" = 'Thibaudeau kayak remo en polea' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '2464' );
UPDATE "ExerciseGlobal" SET "name" = 'Remo kayak Thibaudeau en polea', "searchName" = CASE WHEN "searchName" LIKE 'thibaudeau kayak remo en polea%' THEN 'remo kayak thibaudeau en polea' || substr( "searchName", 31 ) ELSE "searchName" END
WHERE "externalId" = '2464' AND "name" = 'Thibaudeau kayak remo en polea';

UPDATE "ExerciseCoach" SET "name" = 'Abdominal navaja', "searchName" = CASE WHEN "searchName" LIKE 'tipo navaja abdominal%' THEN 'abdominal navaja' || substr( "searchName", 22 ) ELSE "searchName" END
WHERE "name" = 'Tipo navaja abdominal' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0507' );
UPDATE "ExerciseGlobal" SET "name" = 'Abdominal navaja', "searchName" = CASE WHEN "searchName" LIKE 'tipo navaja abdominal%' THEN 'abdominal navaja' || substr( "searchName", 22 ) ELSE "searchName" END
WHERE "externalId" = '0507' AND "name" = 'Tipo navaja abdominal';

UPDATE "ExerciseCoach" SET "name" = 'Abdominal navaja con banda', "searchName" = CASE WHEN "searchName" LIKE 'tipo navaja abdominal con banda%' THEN 'abdominal navaja con banda' || substr( "searchName", 32 ) ELSE "searchName" END
WHERE "name" = 'Tipo navaja abdominal con banda' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0981' );
UPDATE "ExerciseGlobal" SET "name" = 'Abdominal navaja con banda', "searchName" = CASE WHEN "searchName" LIKE 'tipo navaja abdominal con banda%' THEN 'abdominal navaja con banda' || substr( "searchName", 32 ) ELSE "searchName" END
WHERE "externalId" = '0981' AND "name" = 'Tipo navaja abdominal con banda';

UPDATE "ExerciseCoach" SET "name" = 'Volteo de cubierta', "searchName" = CASE WHEN "searchName" LIKE 'tire flip%' THEN 'volteo de cubierta' || substr( "searchName", 10 ) ELSE "searchName" END
WHERE "name" = 'Tire flip' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '2459' );
UPDATE "ExerciseGlobal" SET "name" = 'Volteo de cubierta', "searchName" = CASE WHEN "searchName" LIKE 'tire flip%' THEN 'volteo de cubierta' || substr( "searchName", 10 ) ELSE "searchName" END
WHERE "externalId" = '2459' AND "name" = 'Tire flip';

UPDATE "ExerciseCoach" SET "name" = 'Levantada turca (estilo sentadilla) con pesa rusa', "searchName" = CASE WHEN "searchName" LIKE 'turkish get up (sentadilla style) con pesa rusa%' THEN 'levantada turca (estilo sentadilla) con pesa rusa' || substr( "searchName", 48 ) ELSE "searchName" END
WHERE "name" = 'Turkish get up (sentadilla style) con pesa rusa' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '0551' );
UPDATE "ExerciseGlobal" SET "name" = 'Levantada turca (estilo sentadilla) con pesa rusa', "searchName" = CASE WHEN "searchName" LIKE 'turkish get up (sentadilla style) con pesa rusa%' THEN 'levantada turca (estilo sentadilla) con pesa rusa' || substr( "searchName", 48 ) ELSE "searchName" END
WHERE "externalId" = '0551' AND "name" = 'Turkish get up (sentadilla style) con pesa rusa';

UPDATE "ExerciseCoach" SET "name" = 'Perro boca arriba', "searchName" = CASE WHEN "searchName" LIKE 'upward facing dog%' THEN 'perro boca arriba' || substr( "searchName", 18 ) ELSE "searchName" END
WHERE "name" = 'Upward facing dog' AND "globalExerciseId" IN ( SELECT "id" FROM "ExerciseGlobal" WHERE "externalId" = '1366' );
UPDATE "ExerciseGlobal" SET "name" = 'Perro boca arriba', "searchName" = CASE WHEN "searchName" LIKE 'upward facing dog%' THEN 'perro boca arriba' || substr( "searchName", 18 ) ELSE "searchName" END
WHERE "externalId" = '1366' AND "name" = 'Upward facing dog';
