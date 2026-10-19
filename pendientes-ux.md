# Pendientes de UX

Sale de la revisión de UX del 9 de octubre de 2026: recorrido en el navegador
como admin, entrenador y estudiante, más una lectura del código. Se tacha a
medida que se hace.

## Prioridad alta

- [x] **1. Los errores no llegan al usuario en producción.** Las server actions
  devuelven `{ ok, reason }` con `runAction` (`src/lib/run-action.ts`) y el
  cliente las desenvuelve con `unwrapped` (`src/lib/action-result.ts`). Email o
  DNI repetido se avisa como tal, y los toasts de los formularios muestran el
  motivo.
- [x] **Bug: un entrenador no podía guardar un día con un ejercicio global que
  otro entrenador ya usó.** `ExerciseCoach.externalId` era único en toda la tabla
  y cada entrenador guarda su copia con el mismo código. Pasó a índice común
  (migración `20261011120000_exercise_coach_external_id_not_unique`).
- [x] **2. Al vencer la sesión se perdían series sin guardar.** La sesión se
  renueva mientras se usa la app (`src/proxy.ts`, que antes era un
  `middleware.ts` en la raíz que Next no encontraba y nunca corría). Al vencer
  no se borran los borradores y se vuelve a la misma pantalla; si entra otra
  cuenta en el mismo dispositivo, se borran (`claimRoutineDrafts`).
- [x] **3. Sin aviso de "sin conexión".** Franja de "Sin conexión" y "Volvió la
  conexión" (`offline-banner.tsx`), chip "Sin conexión. Se guarda al volver" en
  vez de "Guardando…" para siempre, y reintento solo de un guardado que falló
  (`use-autosave-retry.ts`): al volver la red, al volver a la app y cada 10, 20,
  40 y 60 segundos. Los errores de red se avisan en español.
- [x] **4. Reloj de descanso.** Pide que la pantalla no se apague mientras corre
  (`use-screen-wake-lock.ts`), y si terminó con la app en segundo plano avisa
  igual al volver ("Terminó hace 40 segundos"), hasta 10 minutos después.
- [x] **5. Eliminar un ejercicio propio borraba el progreso sin decirlo.** La
  confirmación dice cuántas series de cuántos estudiantes se borran, en cuántos
  días de rutinas y plantillas queda un lugar vacío y de cuántos ejercicios deja
  de ser variante, y ofrece "Desactivar en su lugar".

## Prioridad media

- [x] `error.tsx` (en la app y en la raíz) y `global-error.tsx` con "Reintentar" e
  "Ir al inicio". "Reintentar" en todas las pantallas de error (`ErrorAlert`), con
  los errores de red en español. Las consultas que fallaron se vuelven a pedir
  solas al volver la conexión (`refetchOnReconnect`).
- [x] Formularios (estudiante, entrenador, usuario, ejercicio, comida): el botón
  solo se desactiva mientras guarda; al tocarlo con algo mal se marcan todos los
  campos con problema y la vista va al primero (`focus-first-invalid-field.ts`).
  Cerrar con cambios sin guardar pregunta antes (`FeatureDrawerLayout`). "Crear
  rutina" dice qué falta elegir.
- [x] Ficha del estudiante: arriba de las pestañas (rutina, plan, historial,
  progreso) se ven objetivo, peso, altura, edad y observaciones, con "Editar
  datos" ahí mismo (`coach-student-summary.tsx`).
- [x] Un estudiante inactivo se abre como cualquier otro: rutina, plan,
  historial y progreso, con un aviso de que no puede entrar a la app y
  "Restaurar" a mano. El entrenador le puede dejar rutina y plan listos.
- [x] Filtros y página de las listas en la URL (estudiantes, ejercicios, usuarios
  y ejercicios globales, con `use-url-state.ts`): sobreviven a abrir uno y
  volver, a recargar y a compartir el enlace. "Volver" recupera la búsqueda.
  Estudiantes, 10 por página.
- [x] El mes actual se calcula en hora argentina en el servidor y en el navegador
  (`app-date.ts`): el último día del mes después de las 21 hs ya no abre el mes
  siguiente.
- [x] Descarga de PDF (rutina, plan e historial): se pide con `fetch` y, si el
  servidor responde con error, se avisa el motivo; "Descargando…" dura lo que de
  verdad tarda (`download-file.ts`). Las rutas no dejan pasar errores técnicos.
- [x] `lang="es"` en `layout.tsx` y el manifest en español.

## Pulido

- [x] Botones en los vacíos: inicio del entrenador sin estudiantes ("Cargar estudiante"
  abre la lista con el alta abierta, `?nuevo=1`), lista vacía o sin coincidencias
  ("Limpiar filtros"), tarjeta "hoy" del estudiante sin rutina.
- [x] Textos: voseo ("Seleccioná", "Configurá", "Estás por", "Tenés que"), tildes
  ("válida", "cambió", "sesión", "Año"), "entrenador" en los avisos de permiso,
  singular en semanas y ejercicios, y "Cerrar" / "Navegación principal" en vez de
  inglés para lectores de pantalla. Las páginas sin conexión y 404, en voseo.
- [x] Usuarios del admin en el teléfono: buscador a lo ancho y Rol y Estado lado a
  lado sin etiquetas (sin filtro dicen "Rol" / "Estado"); Editar solo con el lápiz y
  el nombre en hasta dos renglones.
- [x] Botones de al menos 44 px en el teléfono: en pantallas táctiles todo botón se
  toca en 44 × 44 aunque se dibuje más chico (capa invisible en `globals.css`).
- [x] Login sin conexión: aviso de conexión en vez de "Failed to fetch", y ya no se
  queda en "Ingresando..." sin señal. Cuenta desactivada: al estudiante le dice
  "tu entrenador" y al entrenador "el administrador"; los textos sin rol, los dos.
- [x] PWA: el service worker se registra aunque `load` ya haya pasado; "Reintentar"
  de la pantalla sin conexión vuelve a pedir la página donde estabas (caché v2).
- [x] Casillas de días y semanas (crear rutina, plantillas y copiar): cada una se
  llama "Día N" / "Semana N" y el grupo, "Días por semana" / "Semanas activas".
  Las seis compartían un id y el grupo se anunciaba "Día 1". Falta probar el toque
  en un teléfono real (en la emulación ahora sí marcan).
- [x] El admin también tiene "Mi perfil": nombre, email, DNI, datos y contraseña.
- [x] El botón "atrás" del teléfono cierra el drawer, modal o menú abierto en vez de
  retroceder la página (`overlay-back-guard.tsx`). Con cambios sin guardar, pregunta.

## Días de la rutina

- [x] Próxima sesión: sigue desde el día más avanzado con series cargadas; lo de
  atrás que quedó sin hacer no traba (`next-routine-day.ts`, inicio y semanas).
- [x] Cartel en el inicio del estudiante: "Te quedó sin terminar" si cargó series
  otro día y no lo terminó ("Terminar ahora"), y "Tenés series sin subir" si
  quedaron en el teléfono.
- [x] Fecha del entrenamiento: "Terminar día" pregunta cuándo se entrenó (Hoy / Ayer /
  Otra fecha, hasta 60 días) y propone el día de la primera serie; las series del
  día pasan a esa fecha.
- [x] Para el coach: "6 de 12 días hechos · 2 salteados" en el inicio (y esos
  estudiantes suben en la lista), y en la rutina del estudiante el resumen y los días
  marcados "Salteado" / "Sin terminar" (`summarizeRoutineMonth`).
- [x] "Cambiar" en cada ejercicio del día: se elige otro y se marcan, semana por
  semana, los días de la rutina (o plantilla) donde cambiarlo, con las mismas series,
  repeticiones, descanso y nota. Los días terminados por el estudiante no se tocan y
  las variantes del anterior se quitan (`replaceRoutineExerciseAction`).
- [x] "Agregar ejercicio" en una rutina con varias semanas: en la pantalla del ejercicio,
  "También en las otras semanas" viene marcado en el mismo día de las otras semanas y
  se puede elegir otros días. Va al final de cada día, con las mismas series,
  repeticiones, descanso y variantes; si el último se agregó solo en este día, el
  siguiente arranca igual (`addRoutineExerciseToDaysAction`).

## Seguridad

- [x] La copia de los datos guardada en el navegador tiene dueño: si la sesión
  vencía con la app cerrada, la siguiente cuenta que entraba veía los estudiantes
  o la rutina de la anterior (`claimPersistedQueryCache`).

## Tests

- [x] Vitest (`pnpm test`): próxima sesión, fechas en hora argentina, sesión y su
  tope de 7 días, mensajes de error de las acciones, dueño de la copia de datos y
  validación de "Mi perfil". 36 tests, en Node, sin base.
