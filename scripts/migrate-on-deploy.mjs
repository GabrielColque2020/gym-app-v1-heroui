// Aplica las migraciones pendientes antes de compilar, pero solo en el despliegue
// de produccion de Vercel. Lo llama el script `vercel-build`.
//
// Los despliegues de prueba (ramas, pull requests) no migran: comparten la base
// con produccion o no tienen una, y una rama a medio hacer no debe tocarla.
//
// Si la migracion falla, el script corta con error y Vercel no publica el codigo
// nuevo: queda en linea la version anterior.
import { execSync } from "node:child_process";

const environment = process.env.VERCEL_ENV;

if (environment !== "production") {
	console.log( `[migraciones] Entorno "${ environment ?? "local" }": no se aplican migraciones.` );
	process.exit( 0 );
}

// `prisma migrate` necesita la conexion directa a Postgres. La de Accelerate
// (prisma:// o prisma+postgres://), que es la que usa la app, no sirve.
const candidate = process.env.DIRECT_DATABASE_URL || process.env.DATABASE_URL || "";

if (!/^postgres(ql)?:\/\//.test( candidate )) {
	console.error( "[migraciones] Falta la conexion directa a la base de produccion." );
	console.error( "[migraciones] Defini DIRECT_DATABASE_URL (postgres://...) en las variables de entorno de Produccion en Vercel." );
	process.exit( 1 );
}

// El pooler no sirve para migrar; en Prisma Postgres la directa solo cambia el host.
const directUrl = candidate.replace( "pooled.db.prisma.io", "db.prisma.io" );

console.log( "[migraciones] Aplicando migraciones pendientes en produccion..." );

try {
	execSync( "npx prisma migrate deploy", {
		env: { ...process.env, DATABASE_URL: directUrl },
		stdio: "inherit",
	} );
} catch {
	console.error( "[migraciones] La migracion fallo. No se publica el codigo nuevo." );
	process.exit( 1 );
}
