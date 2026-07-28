import "dotenv/config";

import { withAccelerate } from "@prisma/extension-accelerate";
import { PrismaClient } from "../../src/generated/prisma/client";

type SyncStats = {
	missingGlobal: number;
	processed: number;
	skippedSameName: number;
	skippedOverrides: number;
	totalCandidates: number;
	updated: number;
};

function normalizeSearchName( value: string ) {
	return value
		.normalize( "NFD" )
		.replace( /[\u0300-\u036f]/g, "" )
		.toLowerCase()
		.trim()
		.replace( /\s+/g, " " );
}

function buildCoachExerciseSearchName( values: {
	category: string;
	equipment: string;
	instructions: string;
	muscleGroup: string;
	name: string;
	target: string;
} ) {
	return normalizeSearchName( [
		values.name,
		values.category,
		values.equipment,
		values.target,
		values.muscleGroup,
		values.instructions,
	].filter( Boolean ).join( " " ) );
}

function parseArgs( argv: string[] ) {
	const args = new Map<string, string | boolean>();

	for (let index = 0; index < argv.length; index += 1) {
		const current = argv[ index ];

		if (!current.startsWith( "--" )) continue;

		const next = argv[ index + 1 ];
		const equalsIndex = current.indexOf( "=" );

		if (equalsIndex > 0) {
			args.set( current.slice( 2, equalsIndex ), current.slice( equalsIndex + 1 ) );
			continue;
		}

		if (next && !next.startsWith( "--" )) {
			args.set( current.slice( 2 ), next );
			index += 1;
			continue;
		}

		args.set( current.slice( 2 ), true );
	}

	return args;
}

function renderProgress( processed: number, total: number, dryRun: boolean ) {
	const totalSafe = Math.max( total, 1 );
	const percentage = Math.round( (processed / totalSafe) * 100 );
	const modeLabel = dryRun ? "dry-run" : "sync";

	return `[${ modeLabel }] ${ processed }/${ total } ejercicios procesados (${ percentage }%)`;
}

function reportProgress( processed: number, total: number, dryRun: boolean ) {
	const message = renderProgress( processed, total, dryRun );

	if (process.stdout.isTTY) {
		process.stdout.write( `\r${ message }` );

		if (processed === total) {
			process.stdout.write( "\n" );
		}

		return;
	}

	const shouldLog =
		processed === 1
		|| processed === total
		|| processed % 25 === 0;

	if (shouldLog) {
		console.log( message );
	}
}

async function main(): Promise<SyncStats> {
	const accelerateUrl = process.env.DATABASE_URL;

	if (!accelerateUrl) {
		throw new Error( "DATABASE_URL es requerido para sincronizar los nombres de ExerciseCoach." );
	}

	const args = parseArgs( process.argv.slice( 2 ) );
	const dryRun = args.get( "dry-run" ) === true;
	const includeOverrides = args.get( "include-overrides" ) === true;
	const prisma = new PrismaClient( { accelerateUrl } ).$extends( withAccelerate() );

	try {
		const skippedOverrides = includeOverrides
			? 0
			: await prisma.exerciseCoach.count( {
				where: {
					globalExerciseId: {
						not: null,
					},
					isOverride: true,
				},
			} );

		const exercises = await prisma.exerciseCoach.findMany( {
			orderBy: {
				updatedAt: "asc",
			},
			select: {
				category: true,
				equipment: true,
				globalExercise: {
					select: {
						id: true,
						name: true,
					},
				},
				id: true,
				instructions: true,
				isOverride: true,
				muscleGroup: true,
				name: true,
				target: true,
			},
			where: {
				globalExerciseId: {
					not: null,
				},
				...(includeOverrides ? {} : { isOverride: false }),
			},
		} );

		const stats: SyncStats = {
			missingGlobal: 0,
			processed: 0,
			skippedOverrides,
			skippedSameName: 0,
			totalCandidates: exercises.length,
			updated: 0,
		};

		console.log(
			`Iniciando sincronizacion de ${ stats.totalCandidates } ejercicios coach vinculados con ExerciseGlobal${ dryRun ? " (dry-run)" : "" }${ includeOverrides ? " incluyendo overrides" : "" }.`,
		);

		for (const exercise of exercises) {
			stats.processed += 1;
			reportProgress( stats.processed, stats.totalCandidates, dryRun );

			if (!exercise.globalExercise) {
				stats.missingGlobal += 1;
				continue;
			}

			const nextName = exercise.globalExercise.name.trim();
			const currentName = exercise.name.trim();

			if (!nextName || nextName === currentName) {
				stats.skippedSameName += 1;
				continue;
			}

			const nextSearchName = buildCoachExerciseSearchName( {
				category: exercise.category?.trim() ?? "",
				equipment: exercise.equipment?.trim() ?? "",
				instructions: exercise.instructions?.trim() ?? "",
				muscleGroup: exercise.muscleGroup?.trim() ?? "",
				name: nextName,
				target: exercise.target?.trim() ?? "",
			} );

			if (!dryRun) {
				await prisma.exerciseCoach.update( {
					data: {
						name: nextName,
						searchName: nextSearchName,
					},
					where: {
						id: exercise.id,
					},
				} );
			}

			stats.updated += 1;
		}

		return stats;
	} finally {
		await prisma.$disconnect();
	}
}

main()
	.then( ( stats ) => {
		console.log(
			`Sincronizacion completada. Candidatos: ${ stats.totalCandidates }, actualizados: ${ stats.updated }, sin cambios: ${ stats.skippedSameName }, sin global vinculado: ${ stats.missingGlobal }, overrides omitidos: ${ stats.skippedOverrides }`,
		);
	} )
	.catch( ( error: unknown ) => {
		console.error( "Error sincronizando nombres de ExerciseCoach:", error );
		process.exitCode = 1;
	} );
