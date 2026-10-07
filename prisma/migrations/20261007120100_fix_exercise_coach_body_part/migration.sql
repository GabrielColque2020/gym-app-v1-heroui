-- Corrige el grupo muscular de las copias de ejercicios globales que quedaron
-- con el valor por defecto de la asignacion vieja: "Pecho" para brazos, core,
-- antebrazos y cuello, y "Piernas" para cardio. Solo toca las filas que siguen
-- con la categoria del global y con ese valor por defecto, para no pisar un
-- grupo que el entrenador haya elegido a mano.

UPDATE "ExerciseCoach" AS c
SET "bodyPart" = CASE
		WHEN lower(g."category") = 'brazos' AND lower(g."target") LIKE 'tr_ceps%' THEN 'TRICEPS'
		WHEN lower(g."category") = 'brazos' THEN 'BICEPS'
		WHEN lower(g."category") = 'core' THEN 'ABS'
		WHEN lower(g."category") = 'antebrazos' THEN 'FOREARMS'
		ELSE 'BACK'
	END::"BodyPart"
FROM "ExerciseGlobal" AS g
WHERE g."id" = c."globalExerciseId"
	AND c."bodyPart" = 'CHEST'
	AND lower(c."category") = lower(g."category")
	AND lower(g."category") IN ('brazos', 'core', 'antebrazos', 'cuello');

UPDATE "ExerciseCoach" AS c
SET "bodyPart" = 'CARDIO'
FROM "ExerciseGlobal" AS g
WHERE g."id" = c."globalExerciseId"
	AND c."bodyPart" = 'LEGS'
	AND lower(c."category") = lower(g."category")
	AND lower(g."category") = 'cardio';
