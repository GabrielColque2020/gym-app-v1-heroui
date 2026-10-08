-- Unifica nombres que decian lo mismo de dos formas en el catalogo de ejercicios:
--   musculo secundario: "trapecio" -> "trapecios", "pecho" -> "pectorales",
--                       "hombros" -> "deltoides", "dorsal ancho" -> "dorsales"
--   equipamiento:       "banda" -> "banda elástica"
-- Se elige en cada caso la forma que ya usa el musculo objetivo ("pectorales",
-- "deltoides", "trapecios", "dorsales"), para que un mismo musculo se llame igual
-- en los dos campos. El grupo muscular ("hombros", "pecho") no se toca.
--
-- El texto de busqueda de cada ejercicio empieza con su nombre, categoria,
-- musculos y equipamiento: se le cambia ese comienzo por el nuevo. Si en algun
-- ejercicio el comienzo no es el esperado, el texto de busqueda queda como estaba.

-- Catalogo general: nombre, categoria, musculo objetivo, musculo secundario, equipamiento.
WITH changed AS (
	SELECT
		id,
		CASE "muscleGroup"
			WHEN 'trapecio' THEN 'trapecios'
			WHEN 'pecho' THEN 'pectorales'
			WHEN 'hombros' THEN 'deltoides'
			WHEN 'dorsal ancho' THEN 'dorsales'
			ELSE "muscleGroup"
		END AS new_muscle_group,
		CASE equipment WHEN 'banda' THEN 'banda elástica' ELSE equipment END AS new_equipment
	FROM "ExerciseGlobal"
	WHERE "muscleGroup" IN ('trapecio', 'pecho', 'hombros', 'dorsal ancho') OR equipment = 'banda'
), prefixes AS (
	SELECT
		g.id,
		c.new_muscle_group,
		c.new_equipment,
		translate(lower(concat_ws(' ', g.name, g.category, g.target, g."muscleGroup", g.equipment)), 'áéíóúüñ', 'aeiouun') AS old_prefix,
		translate(lower(concat_ws(' ', g.name, g.category, g.target, c.new_muscle_group, c.new_equipment)), 'áéíóúüñ', 'aeiouun') AS new_prefix
	FROM "ExerciseGlobal" g
	JOIN changed c ON c.id = g.id
)
UPDATE "ExerciseGlobal" g
SET
	"searchName" = CASE
		WHEN left(g."searchName", char_length(p.old_prefix)) = p.old_prefix
			THEN p.new_prefix || substr(g."searchName", char_length(p.old_prefix) + 1)
		ELSE g."searchName"
	END,
	"muscleGroup" = p.new_muscle_group,
	equipment = p.new_equipment,
	"updatedAt" = now()
FROM prefixes p
WHERE g.id = p.id;

-- Ejercicios de los entrenadores (propios o copiados del catalogo): nombre,
-- categoria, equipamiento, musculo objetivo, musculo secundario. Los campos
-- vacios no forman parte del texto de busqueda.
WITH changed AS (
	SELECT
		id,
		CASE "muscleGroup"
			WHEN 'trapecio' THEN 'trapecios'
			WHEN 'pecho' THEN 'pectorales'
			WHEN 'hombros' THEN 'deltoides'
			WHEN 'dorsal ancho' THEN 'dorsales'
			ELSE "muscleGroup"
		END AS new_muscle_group,
		CASE equipment WHEN 'banda' THEN 'banda elástica' ELSE equipment END AS new_equipment
	FROM "ExerciseCoach"
	WHERE "muscleGroup" IN ('trapecio', 'pecho', 'hombros', 'dorsal ancho') OR equipment = 'banda'
), prefixes AS (
	SELECT
		e.id,
		c.new_muscle_group,
		c.new_equipment,
		translate(lower(concat_ws(' ', e.name, nullif(e.category, ''), nullif(e.equipment, ''), nullif(e.target, ''), nullif(e."muscleGroup", ''))), 'áéíóúüñ', 'aeiouun') AS old_prefix,
		translate(lower(concat_ws(' ', e.name, nullif(e.category, ''), nullif(c.new_equipment, ''), nullif(e.target, ''), nullif(c.new_muscle_group, ''))), 'áéíóúüñ', 'aeiouun') AS new_prefix
	FROM "ExerciseCoach" e
	JOIN changed c ON c.id = e.id
)
UPDATE "ExerciseCoach" e
SET
	"searchName" = CASE
		WHEN e."searchName" IS NOT NULL AND left(e."searchName", char_length(p.old_prefix)) = p.old_prefix
			THEN p.new_prefix || substr(e."searchName", char_length(p.old_prefix) + 1)
		ELSE e."searchName"
	END,
	"muscleGroup" = p.new_muscle_group,
	equipment = p.new_equipment,
	"updatedAt" = now()
FROM prefixes p
WHERE e.id = p.id;
