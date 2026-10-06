import { PrismaPg } from "@prisma/adapter-pg";
import { withAccelerate } from "@prisma/extension-accelerate";

import { PrismaClient } from "../generated/prisma/client";

const ACCELERATE_PROTOCOLS = [ "prisma://", "prisma+postgres://" ];

// Con una URL de Accelerate se conecta por Accelerate; con una de Postgres comun
// (la base local de Docker) usa el driver `pg`. La extension se aplica en los dos
// casos para que el tipo sea el mismo: contra Postgres directo `cacheStrategy`
// se ignora.
export function createPrismaClient( databaseUrl = process.env.DATABASE_URL ) {
	if (!databaseUrl) {
		throw new Error( "DATABASE_URL is required to initialize Prisma." );
	}

	const isAccelerate = ACCELERATE_PROTOCOLS.some( protocol => databaseUrl.startsWith( protocol ) );

	const client = isAccelerate
		? new PrismaClient( { accelerateUrl: databaseUrl } )
		: new PrismaClient( { adapter: new PrismaPg( { connectionString: databaseUrl } ) } );

	return client.$extends( withAccelerate() );
}
