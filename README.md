# Gym App V1 - HeroUI

Aplicacion web para gestion de gimnasio construida con **Next.js 16**, **React 19**, **TypeScript**, **HeroUI / HeroUI Pro**, **Prisma** y **PostgreSQL**.

El sistema esta organizado por roles:

- `ADMIN`: administra usuarios, coaches y estudiantes.
- `COACH`: gestiona ejercicios, rutinas mensuales, historial y planes alimenticios.
- `STUDENT`: consulta su rutina, historial y plan alimenticio.

## Estado actual del proyecto

- autenticacion con sesion firmada y proteccion por `middleware`
- dashboard y vistas separadas por rol
- gestion de estudiantes y coaches
- rutinas mensuales con estructura `TrainingRoutineMonth -> TrainingRoutineWeek -> RoutineDay -> Routine`
- variantes por ejercicio en rutina
- impresion de rutinas y planes alimenticios
- planes alimenticios por estudiante
- Prisma con migraciones reales del dominio

## Stack principal

- `Next.js 16`
- `React 19`
- `TypeScript`
- `HeroUI` y `HeroUI Pro`
- `Tailwind CSS`
- `TanStack Query`
- `Zustand`
- `Prisma`
- `PostgreSQL`
- `react-to-print`

## Requisitos

- `Node.js 20` o superior
- `pnpm 11` o superior
- acceso al paquete privado `@heroui-pro/react`
- una base de datos PostgreSQL accesible desde `DATABASE_URL`

## Variables de entorno

El proyecto necesita como minimo:

```env
DATABASE_URL="postgresql://usuario:password@localhost:5432/gym_app"
AUTH_SESSION_SECRET="una-clave-larga-y-segura"
```

Notas:

- `DATABASE_URL` es obligatoria para Prisma y para el seed.
- `AUTH_SESSION_SECRET` es la opcion recomendada para firmar la sesion.
- Si `AUTH_SESSION_SECRET` no existe, el proyecto todavia puede caer en `AUTH_SECRET` o incluso `DATABASE_URL`, pero no conviene depender de eso.
- `CLOUDINARY_URL` es obligatoria si vas a subir la media del catalogo global de ejercicios a Cloudinary.
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` es opcional en la implementacion actual del frontend. Hoy el proyecto puede inferir el `cloudName` desde la URL guardada en base de datos, pero sigue siendo una buena variable para dejar configurada.

## Instalacion inicial

1. Clona el repositorio.
2. Crea el archivo `.env` con tus variables.
3. Instala dependencias:

```bash
pnpm install
```

4. Genera Prisma Client:

```bash
pnpm prisma generate
```

5. Aplica migraciones:

```bash
pnpm prisma migrate dev
```

6. Si quieres cargar el seed:

```bash
pnpm prisma db seed
```

7. Levanta el proyecto:

```bash
pnpm dev
```

La aplicacion queda disponible en:

```text
http://localhost:3003
```

## Seed actual

El seed actual **no carga datos completos del sistema**. Hoy hace esto:

- limpia las tablas principales
- crea un usuario administrador
- deja comentada la creacion automatica de coach, estudiantes, ejercicios, rutinas y planes alimenticios

Credenciales creadas por el seed actual:

- email: `admin@gmail.com`
- contrasena: `Password01`

Comando:

```bash
pnpm prisma db seed
```

Archivo del seed:

- `prisma/seed/seed-database.ts`
- `prisma/seed/seed.ts`

## Estructura principal

```text
prisma/
  schema.prisma
  migrations/
  seed/

src/
  app/
    (auth)/
    (authenticated)/
    api/

  features/
    auth/
    exercises/
    login/
    meal-plans/
    routine/
    students/
    training-routine/
    role/
      admin/
      coach/
      student/

  generated/
    prisma/

  lib/
  components/
  constants/
  types/
```

## Rutas principales

### Administracion

- `/admin/dashboard`
- `/admin/users`

### Coach

- `/coach/dashboard`
- `/coach/student`
- `/coach/exercises`
- `/coach/training-routines-students`
- `/coach/training-routine`
- `/coach/routine`
- `/coach/meal-plans-students`
- `/coach/meal-plans`
- `/coach/history-routines-students`
- `/coach/history-routines`

### Estudiante

- `/student/dashboard`
- `/student/training-routine`
- `/student/routine`
- `/student/meal-plans`
- `/student/history-routines`

## Arquitectura funcional

### Autenticacion

- la sesion se firma con `AUTH_SESSION_SECRET`
- la cookie de autenticacion es `gym_app_session`
- el `middleware` protege rutas privadas y redirige segun el rol
- la raiz `/` redirige automaticamente a `login` o al dashboard correspondiente

### Rutinas

La estructura actual de rutinas quedo organizada asi:

- `TrainingRoutineMonth`: contenedor mensual
- `TrainingRoutineWeek`: semana dentro del mes
- `RoutineDay`: dia de entrenamiento
- `Routine`: ejercicio cargado dentro del dia

Esto impacta directamente en impresion, historial y edicion de rutina.

### UI y estado

- `HeroUI` y `HeroUI Pro` para componentes visuales
- `TanStack Query` para fetch, cache e invalidacion
- persistencia selectiva de cache en cliente
- `Zustand` para algunos estados locales/drafts

## Consideraciones de HeroUI

Este proyecto usa:

- `@heroui/react`
- `@heroui-pro/react`

Si manaña reinstalas todo y `pnpm install` falla por HeroUI Pro, el problema normalmente no esta en el codigo sino en el acceso al paquete privado. Antes de reinstalar asegurate
de:

- tener acceso vigente al paquete `@heroui-pro/react`
- tener configurada tu autenticacion al registry correspondiente

Ademas, `next.config.ts` ya permite imagenes remotas usadas por HeroUI:

- `heroui-assets.nyc3.cdn.digitaloceanspaces.com`
- `img.heroui.chat`
- `res.cloudinary.com`

## Catalogo global de ejercicios

El catalogo global de ejercicios ahora se toma desde:

- `public/exercises-dataset/data/exercises.es.json`

Ese archivo ya contiene:

- nombres en espanol
- categoria, body part, equipment, muscle group, secondary muscles y target traducidos
- referencias a imagen y video del dataset

### Flujo correcto de carga

Si actualizas el dataset o recreas el catalogo global, el orden correcto es este:

1. Subir la media a Cloudinary.
2. Importar o recrear los ejercicios globales en la base.

Comandos:

```bash
pnpm upload:exercise-media
pnpm seed:exercise-dataset
```

Tambien se pueden forzar los archivos explicitamente:

```bash
pnpm upload:exercise-media -- --json public/exercises-dataset/data/exercises.es.json
pnpm seed:exercise-dataset -- --json public/exercises-dataset/data/exercises.es.json --cloudinary-map public/exercises-dataset/data/cloudinary-upload-map.json
```

### Que hace cada comando

`pnpm upload:exercise-media`

- lee `public/exercises-dataset/data/exercises.es.json`
- toma solo los assets realmente referenciados por ese dataset
- sube imagenes y videos a Cloudinary
- genera `public/exercises-dataset/data/cloudinary-upload-map.json`

`pnpm seed:exercise-dataset`

- lee `public/exercises-dataset/data/exercises.es.json`
- si existe `cloudinary-upload-map.json`, usa las `secureUrl` reales de Cloudinary
- crea o actualiza la tabla `ExerciseGlobal`
- guarda `imageUrl` y `videoUrl` con la URL final de Cloudinary cuando el mapa existe

### Render de media en la app

La app ahora usa `next-cloudinary` para optimizar la entrega de media de Cloudinary al momento de renderizar.

Detalles importantes:

- no hace falta guardar `publicId` en la base de datos para esta etapa
- `imageUrl` y `videoUrl` siguen siendo suficientes
- el frontend detecta si la URL pertenece a `res.cloudinary.com`
- si corresponde, genera una URL optimizada para mostrarla en pantalla

Archivos involucrados:

- `src/lib/cloudinary-media.ts`
- `src/components/common/async-media.tsx`

### GIFs de ejercicios

Cuando un ejercicio tiene una URL `.gif` alojada en Cloudinary:

- no se muestra el GIF crudo
- la app intenta entregarlo como `mp4`
- el componente lo renderiza como video

Esto mejora bastante el peso, la carga y la fluidez de reproduccion sin necesidad de volver a subir archivos ni cambiar la base de datos.

### Estructura de Cloudinary

La media se sube con este criterio:

- carpeta logica por defecto: `exercises/images` y `exercises/videos`
- `public_id` basado en el nombre real del archivo, sin duplicar extension

Ejemplos:

- imagen: `https://res.cloudinary.com/.../exercises/images/5201-KOpzGBL.jpg`
- video/gif: `https://res.cloudinary.com/.../exercises/videos/5201-KOpzGBL.gif`

### Nota importante

Despues de habilitar o cambiar dominios remotos de imagen en `next.config.ts`, reinicia `pnpm dev`.

## Reinstalacion completa para manaña

Si manaña quieres reinstalar todo desde cero en este mismo proyecto, sigue este orden.

### Opcion recomendada: reinstalacion limpia sin tocar la base

1. Actualiza el repositorio:

```bash
git pull
```

2. Elimina dependencias y build local anterior.

En PowerShell:

```powershell
Remove-Item -Recurse -Force node_modules, .next
Remove-Item -Force tsconfig.tsbuildinfo -ErrorAction SilentlyContinue
```

3. Verifica que el archivo `.env` siga presente y correcto.

Variables minimas:

```env
DATABASE_URL="postgresql://usuario:password@localhost:5432/gym_app"
AUTH_SESSION_SECRET="una-clave-larga-y-segura"
```

4. Reinstala dependencias:

```bash
pnpm install
```

5. Regenera Prisma Client:

```bash
pnpm prisma generate
```

6. Aplica migraciones:

```bash
pnpm prisma migrate dev
```

7. Si la base esta vacia o quieres recrear el admin:

```bash
pnpm prisma db seed
```

8. Levanta la app:

```bash
pnpm dev
```

9. Abre:

```text
http://localhost:3003
```

### Opcion completa: resetear la base tambien

Usa esto solo si realmente quieres volver a empezar la base desde cero.

```bash
pnpm prisma migrate reset
```

Despues:

```bash
pnpm prisma db seed
pnpm dev
```

## Validaciones recomendadas despues de reinstalar

Despues de reinstalar, conviene correr:

```bash
pnpm typecheck
pnpm lint
```

Y probar como minimo:

- login de admin
- creacion de coach
- creacion de estudiante
- creacion de rutina mensual
- impresion de rutina
- creacion de plan alimenticio
- impresion de plan alimenticio

## Observaciones importantes

- el script `clean` del `package.json` usa `rm -rf`, por lo que en Windows conviene limpiar manualmente con PowerShell o adaptarlo si lo vas a usar seguido
- el seed actual esta pensado mas como arranque minimo que como demo funcional completa
- el proyecto tiene capas compartidas por feature y capas por rol; cuando agregues logica nueva conviene mantener esa separacion

## Comandos de diagnostico rapidos

```bash
pnpm typecheck
pnpm lint
pnpm build
```

Si algo falla despues de reinstalar, revisa primero:

- `DATABASE_URL`
- acceso a `@heroui-pro/react`
- migraciones aplicadas
- existencia del archivo `.env`
- version de `Node.js`
- version de `pnpm`
