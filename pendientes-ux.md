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
- [ ] **4. Reloj de descanso.** Pedir Wake Lock para que no se apague la pantalla,
  y avisar (vibrar o sonar) aunque se vuelva tarde al descanso terminado.
- [ ] **5. Eliminar un ejercicio propio borra el progreso de los estudiantes** y lo
  saca de sus rutinas. El aviso tiene que decir cuántos estudiantes y registros
  se pierden y sugerir "Desactivar".

## Prioridad media

- [ ] Agregar `error.tsx` y "Reintentar" en todas las pantallas de error. Para
  estudiante y admin las consultas no se refrescan solas (`constants/query.ts`).
- [ ] Formularios: llevar al primer campo con error al tocar "Crear" (en el
  teléfono el error queda fuera de la vista), explicar por qué el botón está
  desactivado, y preguntar antes de cerrar un panel con cambios sin guardar.
- [ ] Ficha del estudiante: mostrar objetivo, peso y observaciones, y poder
  editarlos sin volver a la lista.
- [ ] Poder abrir un estudiante inactivo para ver su historial sin reactivarlo.
- [ ] Guardar filtros y página de las listas en la URL. Subir de 5 la cantidad de
  estudiantes por página.
- [ ] Calcular el mes actual con la hora de Argentina y no con la del servidor
  (UTC): el último día del mes después de las 21 hs abre el mes siguiente.
- [ ] Descarga de PDF: detectar cuando el servidor responde con error.
- [ ] `lang="es"` en `layout.tsx` y el manifest en español.

## Pulido

- [ ] Botones en los vacíos: inicio del entrenador sin estudiantes, lista de
  estudiantes vacía, tarjeta "hoy" del estudiante.
- [ ] Textos: voseo en todos lados ("Carga", "Configura", "Estas por", "Debes",
  "No tienes"), tildes ("historica", "aplicara", "contrasenia", "valida"),
  "entrenador" en vez de "coach", "1 día por semana" en singular.
- [ ] Usuarios del admin en el teléfono: los filtros ocupan toda la pantalla y el
  nombre queda cortado por el botón Editar.
- [ ] Botones de al menos 44 px en el teléfono: mes anterior y siguiente, ±15 s del
  reloj, botón de nota.
- [ ] Login sin conexión muestra "Failed to fetch". El "pedile a tu entrenador"
  también lo ven el entrenador y el admin.
- [ ] PWA: el service worker puede no registrarse si el `load` ya pasó; la página
  sin conexión manda al inicio y no a donde estabas.
- [ ] Checkbox de días en "Crear rutina": se anuncian como "1", "2"… Probar en un
  teléfono real que se puedan marcar (en la emulación del navegador no andaban).
- [ ] Admin sin "Mi perfil": hoy cambia su contraseña editándose desde Usuarios.
  Confirmar si alcanza.
