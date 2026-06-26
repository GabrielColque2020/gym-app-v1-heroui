"use server";

import prisma from "@/lib/prisma";

export async function getExercisesAction() {
	try {
		return await prisma.exercise.findMany( {
			select: {
				active: true,
				bodyPart: true,
				createdAt: true,
				id: true,
				imageUrl: true,
				name: true,
				tips: true,
				videoUrl: true,
			},
			orderBy: {
				createdAt: "desc",
			},
		} );
	} catch (error) {
		const message = error instanceof Error ? error.message : "Error desconocido al consultar la base de datos.";

		throw new Error( `No se pudo obtener la lista de ejercicios. ${ message }` );
	}
}
