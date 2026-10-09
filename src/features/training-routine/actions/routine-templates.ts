"use server";

import { requireCoachSession } from "@/features/auth/coach-session";
import {
	type ApplyRoutineTemplateInput,
	type ApplyRoutineTemplateResult,
	buildRoutineTemplateCopyName,
	type CopyRoutineTemplateWeeksInput,
	type CreateRoutineTemplateInput,
	type CreateRoutineTemplateResult,
	type DuplicateRoutineTemplateResult,
	isRoutineTemplateNameValid,
	normalizeRoutineTemplateName,
	type RenameRoutineTemplateResult,
	type RoutineTemplateDetail,
	type RoutineTemplateListItem,
	type SaveRoutineAsTemplateInput,
	type SaveRoutineAsTemplateResult,
	type UpdateRoutineTemplateStructureInput,
} from "@/features/training-routine/services/routine-template";
import { MAX_ROUTINE_WEEKS, validateRoutineStructureContent } from "@/features/training-routine/services/routine-structure";
import { syncRoutineWeeksStructure } from "@/features/training-routine/services/routine-structure-sync";
import {
	countRoutineWeeksContent,
	createRoutineWeeksCopy,
	type RoutineWeekCopySource,
	routineWeeksCopyInclude,
} from "@/features/training-routine/services/routine-weeks-copy";
import {
	type FetchedTrainingRoutineWeek,
	resolveTrainingRoutineWeeks,
	trainingRoutineWeekInclude,
} from "@/features/training-routine/services/training-routines-by-student";
import prisma from "@/lib/prisma";

// "Fuerza" y "fuerza" son la misma plantilla para quien las busca en una lista.
async function isRoutineTemplateNameTaken( coachId: string, name: string, exceptTemplateId?: string ) {
	const sameNameTemplate = await prisma.routineTemplate.findFirst( {
		select: {
			id: true,
		},
		where: {
			coachId,
			id: exceptTemplateId ? { not: exceptTemplateId } : undefined,
			name: {
				equals: name,
				mode: "insensitive",
			},
		},
	} );

	return sameNameTemplate !== null;
}

// Guarda la rutina de un mes de un estudiante como plantilla del entrenador. Es
// una copia: despues, cambiar la rutina del estudiante no cambia la plantilla.
export async function saveRoutineAsTemplateAction( input: SaveRoutineAsTemplateInput ): Promise<SaveRoutineAsTemplateResult> {
	const session = await requireCoachSession( "guardar la rutina como plantilla" );

	if (!isRoutineTemplateNameValid( input.name )) return { ok: false, reason: "invalid-name" };

	const name = normalizeRoutineTemplateName( input.name );
	const sourceMonth = ( await prisma.trainingRoutineMonth.findFirst( {
		include: {
			weeks: {
				include: routineWeeksCopyInclude,
				orderBy: {
					week: "asc",
				},
			},
		},
		where: {
			month: input.month,
			// La rutina tiene que ser de un estudiante de este entrenador.
			student: {
				coachId: session.sub,
				role: "STUDENT",
			},
			studentId: input.studentId,
			year: input.year,
		},
	} ) ) as unknown as { objective: string | null; weeks: RoutineWeekCopySource[] } | null;
	const sourceWeeks = sourceMonth?.weeks ?? [];
	const summary = countRoutineWeeksContent( sourceWeeks );

	// Una plantilla sin ejercicios no le ahorra nada a nadie.
	if (!sourceMonth || summary.exerciseCount === 0) return { ok: false, reason: "empty-routine" };

	if (await isRoutineTemplateNameTaken( session.sub, name )) return { ok: false, reason: "duplicate-name" };

	const template = await prisma.$transaction( async ( tx ) => {
		const createdTemplate = await tx.routineTemplate.create( {
			data: {
				coachId: session.sub,
				name,
				objective: sourceMonth.objective,
			},
			select: {
				id: true,
				name: true,
			},
		} );

		await createRoutineWeeksCopy( tx, sourceWeeks, { routineTemplateId: createdTemplate.id } );

		return createdTemplate;
	} );

	return { ok: true, template: { ...template, ...summary } };
}

// Las plantillas del entrenador, con lo justo para elegir una: nombre y cuanto
// tiene adentro. No trae los ejercicios, solo los cuenta.
export async function getRoutineTemplatesAction(): Promise<RoutineTemplateListItem[]> {
	const session = await requireCoachSession( "consultar las plantillas" );
	const templates = ( await prisma.routineTemplate.findMany( {
		orderBy: {
			name: "asc",
		},
		select: {
			id: true,
			name: true,
			objective: true,
			weeks: {
				select: {
					routineDays: {
						select: {
							_count: {
								select: {
									routines: true,
								},
							},
						},
					},
				},
			},
		},
		where: {
			coachId: session.sub,
		},
	} ) ) as unknown as Array<{
		id: string;
		name: string;
		objective: string | null;
		weeks: Array<{ routineDays: Array<{ _count: { routines: number } }> }>;
	}>;

	// Orden natural: "copia 2" va antes que "copia 10", y sin distinguir mayusculas.
	const sortedTemplates = [ ...templates ].sort( ( left, right ) =>
		left.name.localeCompare( right.name, "es", { numeric: true, sensitivity: "base" } ) );

	return sortedTemplates.map( ( template ) => ( {
		dayCount: template.weeks.reduce( ( count, week ) => count + week.routineDays.length, 0 ),
		exerciseCount: template.weeks.reduce(
			( count, week ) => count + week.routineDays.reduce( ( dayTotal, day ) => dayTotal + day._count.routines, 0 ),
			0,
		),
		id: template.id,
		name: template.name,
		objective: template.objective,
		weekCount: template.weeks.length,
	} ) );
}

// Arma la rutina de un mes de un estudiante a partir de una plantilla. Es una
// copia: despues, cambiar la plantilla no cambia la rutina del estudiante. Si el
// mes ya tenia rutina, se reemplaza entera, igual que al copiar un mes completo.
export async function applyRoutineTemplateAction( input: ApplyRoutineTemplateInput ): Promise<ApplyRoutineTemplateResult> {
	const session = await requireCoachSession( "usar una plantilla" );

	if (!Number.isInteger( input.month ) || input.month < 1 || input.month > 12) throw new Error( "El mes no es válido." );
	if (!Number.isInteger( input.year ) || input.year < 2000 || input.year > 2100) throw new Error( "El año no es válido." );

	const student = await prisma.user.findFirst( {
		select: {
			id: true,
		},
		where: {
			active: true,
			coachId: session.sub,
			id: input.studentId,
			role: "STUDENT",
		},
	} );

	if (!student) return { ok: false, reason: "student-not-found" };

	const template = ( await prisma.routineTemplate.findFirst( {
		include: {
			weeks: {
				include: routineWeeksCopyInclude,
				orderBy: {
					week: "asc",
				},
			},
		},
		where: {
			coachId: session.sub,
			id: input.templateId,
		},
	} ) ) as unknown as { name: string; objective: string | null; weeks: RoutineWeekCopySource[] } | null;

	// Puede pasar si la borraron desde otra pestaña mientras esta ventana estaba abierta.
	if (!template) return { ok: false, reason: "template-not-found" };

	await prisma.$transaction( async ( tx ) => {
		await tx.trainingRoutineMonth.deleteMany( {
			where: {
				month: input.month,
				studentId: input.studentId,
				year: input.year,
			},
		} );

		const routineMonth = await tx.trainingRoutineMonth.create( {
			data: {
				month: input.month,
				objective: template.objective,
				studentId: input.studentId,
				year: input.year,
			},
			select: {
				id: true,
			},
		} );

		await createRoutineWeeksCopy( tx, template.weeks, { trainingRoutineMonthId: routineMonth.id } );
	} );

	return { ok: true, templateName: template.name };
}

export async function renameRoutineTemplateAction( input: { name: string; templateId: string } ): Promise<RenameRoutineTemplateResult> {
	const session = await requireCoachSession( "renombrar la plantilla" );

	if (!isRoutineTemplateNameValid( input.name )) return { ok: false, reason: "invalid-name" };

	const name = normalizeRoutineTemplateName( input.name );

	if (await isRoutineTemplateNameTaken( session.sub, name, input.templateId )) return { ok: false, reason: "duplicate-name" };

	// `updateMany` para poder filtrar por entrenador: nadie renombra lo de otro.
	const updated = await prisma.routineTemplate.updateMany( {
		data: {
			name,
		},
		where: {
			coachId: session.sub,
			id: input.templateId,
		},
	} );

	return updated.count === 0 ? { ok: false, reason: "template-not-found" } : { name, ok: true };
}

// Copia una plantilla entera con otro nombre, para armar una variante sin tocar la original.
export async function duplicateRoutineTemplateAction( templateId: string ): Promise<DuplicateRoutineTemplateResult> {
	const session = await requireCoachSession( "duplicar la plantilla" );
	const template = ( await prisma.routineTemplate.findFirst( {
		include: {
			weeks: {
				include: routineWeeksCopyInclude,
				orderBy: {
					week: "asc",
				},
			},
		},
		where: {
			coachId: session.sub,
			id: templateId,
		},
	} ) ) as unknown as { name: string; objective: string | null; weeks: RoutineWeekCopySource[] } | null;

	if (!template) return { ok: false, reason: "template-not-found" };

	const takenNames = await prisma.routineTemplate.findMany( {
		select: {
			name: true,
		},
		where: {
			coachId: session.sub,
		},
	} );
	const name = buildRoutineTemplateCopyName( template.name, takenNames.map( ( item ) => item.name ) );

	await prisma.$transaction( async ( tx ) => {
		const copy = await tx.routineTemplate.create( {
			data: {
				coachId: session.sub,
				name,
				objective: template.objective,
			},
			select: {
				id: true,
			},
		} );

		await createRoutineWeeksCopy( tx, template.weeks, { routineTemplateId: copy.id } );
	} );

	return { name, ok: true };
}

// Borra la plantilla con todo su contenido. Las rutinas que se armaron con ella
// no cambian: eran copias.
export async function deleteRoutineTemplateAction( templateId: string ) {
	const session = await requireCoachSession( "eliminar la plantilla" );

	await prisma.routineTemplate.deleteMany( {
		where: {
			coachId: session.sub,
			id: templateId,
		},
	} );

	return { ok: true };
}

// Una plantilla con todo su contenido, en la misma forma que la rutina de un mes,
// para mostrarla y editarla con las mismas pantallas. Devuelve `null` si no
// existe o es de otro entrenador.
export async function getRoutineTemplateDetailAction( templateId: string ): Promise<RoutineTemplateDetail | null> {
	const session = await requireCoachSession( "consultar la plantilla" );
	const template = ( await prisma.routineTemplate.findFirst( {
		include: {
			weeks: {
				include: trainingRoutineWeekInclude,
				orderBy: {
					week: "asc",
				},
			},
		},
		where: {
			coachId: session.sub,
			id: templateId,
		},
	} ) ) as unknown as { id: string; name: string; objective: string | null; weeks: FetchedTrainingRoutineWeek[] } | null;

	if (!template) return null;

	return {
		template: { id: template.id, name: template.name, objective: template.objective },
		weeks: resolveTrainingRoutineWeeks( template.weeks ),
	};
}

// Crea una plantilla vacia, con sus semanas y dias, para cargarle los ejercicios
// a mano en vez de partir de la rutina de un estudiante.
export async function createRoutineTemplateAction( input: CreateRoutineTemplateInput ): Promise<CreateRoutineTemplateResult> {
	const session = await requireCoachSession( "crear la plantilla" );

	if (!isRoutineTemplateNameValid( input.name )) return { ok: false, reason: "invalid-name" };

	validateRoutineStructureContent( input );

	const name = normalizeRoutineTemplateName( input.name );

	if (await isRoutineTemplateNameTaken( session.sub, name )) return { ok: false, reason: "duplicate-name" };

	const template = await prisma.$transaction( async ( tx ) => {
		const createdTemplate = await tx.routineTemplate.create( {
			data: {
				coachId: session.sub,
				name,
				objective: input.objective.trim() || null,
			},
			select: {
				id: true,
			},
		} );

		await syncRoutineWeeksStructure( tx, { routineTemplateId: createdTemplate.id }, input.weeks );

		return createdTemplate;
	} );

	return { id: template.id, ok: true };
}

// Agrega o quita semanas y dias de una plantilla y cambia su objetivo. Los dias
// que ya estaban conservan sus ejercicios.
export async function updateRoutineTemplateStructureAction( input: UpdateRoutineTemplateStructureInput ) {
	const session = await requireCoachSession( "modificar la plantilla" );

	validateRoutineStructureContent( input );

	const updated = await prisma.$transaction( async ( tx ) => {
		const result = await tx.routineTemplate.updateMany( {
			data: {
				objective: input.objective.trim() || null,
			},
			where: {
				coachId: session.sub,
				id: input.templateId,
			},
		} );

		if (result.count === 0) return false;

		await syncRoutineWeeksStructure( tx, { routineTemplateId: input.templateId }, input.weeks );

		return true;
	} );

	return { ok: updated };
}

// Deja otras semanas de la plantilla iguales a la elegida: las de
// `destinationWeeks` o, si no viene, todas las demas.
export async function repeatRoutineTemplateWeekAction( input: { destinationWeeks?: number[]; sourceWeek: number; templateId: string } ) {
	const session = await requireCoachSession( "repetir la semana de la plantilla" );
	const template = ( await prisma.routineTemplate.findFirst( {
		include: {
			weeks: {
				include: routineWeeksCopyInclude,
				orderBy: {
					week: "asc",
				},
			},
		},
		where: {
			coachId: session.sub,
			id: input.templateId,
		},
	} ) ) as unknown as { weeks: RoutineWeekCopySource[] } | null;
	const sourceWeek = template?.weeks.find( ( week ) => week.week === input.sourceWeek );

	if (!template || !sourceWeek) return { ok: false };

	// Solo semanas que la plantilla tiene, y nunca la de origen.
	const destinationWeeks = template.weeks
		.map( ( week ) => week.week )
		.filter( ( week ) => week !== input.sourceWeek && ( !input.destinationWeeks || input.destinationWeeks.includes( week ) ) );

	if (destinationWeeks.length === 0) return { ok: false };

	await prisma.$transaction( async ( tx ) => {
		await tx.trainingRoutineWeek.deleteMany( {
			where: {
				routineTemplateId: input.templateId,
				week: {
					in: destinationWeeks,
				},
			},
		} );
		await createRoutineWeeksCopy(
			tx,
			destinationWeeks.map( ( week ) => ( { ...sourceWeek, name: `Semana ${ week }`, week } ) ),
			{ routineTemplateId: input.templateId },
		);
	} );

	return { ok: true };
}

// Copia algunas semanas de una plantilla en el mes de un estudiante. Solo
// reemplaza las semanas elegidas como destino; el resto del mes queda como esta.
export async function copyRoutineTemplateWeeksAction( input: CopyRoutineTemplateWeeksInput ): Promise<ApplyRoutineTemplateResult> {
	const session = await requireCoachSession( "copiar semanas de una plantilla" );

	if (!Number.isInteger( input.month ) || input.month < 1 || input.month > 12) throw new Error( "El mes no es válido." );
	if (!Number.isInteger( input.year ) || input.year < 2000 || input.year > 2100) throw new Error( "El año no es válido." );

	const isValidWeek = ( week: number ) => Number.isInteger( week ) && week >= 1 && week <= MAX_ROUTINE_WEEKS;
	const destinationWeeks = input.weekMappings.map( ( mapping ) => mapping.destinationWeek );

	if (
		input.weekMappings.length === 0
		|| input.weekMappings.some( ( mapping ) => !isValidWeek( mapping.sourceWeek ) || !isValidWeek( mapping.destinationWeek ) )
		|| new Set( destinationWeeks ).size !== destinationWeeks.length
	) {
		throw new Error( "Las semanas elegidas no son válidas." );
	}

	const student = await prisma.user.findFirst( {
		select: {
			id: true,
		},
		where: {
			active: true,
			coachId: session.sub,
			id: input.studentId,
			role: "STUDENT",
		},
	} );

	if (!student) return { ok: false, reason: "student-not-found" };

	const template = ( await prisma.routineTemplate.findFirst( {
		include: {
			weeks: {
				include: routineWeeksCopyInclude,
				orderBy: {
					week: "asc",
				},
			},
		},
		where: {
			coachId: session.sub,
			id: input.templateId,
		},
	} ) ) as unknown as { name: string; objective: string | null; weeks: RoutineWeekCopySource[] } | null;

	if (!template) return { ok: false, reason: "template-not-found" };

	const sourceWeekByNumber = new Map( template.weeks.map( ( week ) => [ week.week, week ] ) );
	const weeksToCreate = input.weekMappings.map( ( mapping ) => {
		const sourceWeek = sourceWeekByNumber.get( mapping.sourceWeek );

		if (!sourceWeek) throw new Error( `La semana ${ mapping.sourceWeek } no existe en la plantilla.` );

		return { ...sourceWeek, name: `Semana ${ mapping.destinationWeek }`, week: mapping.destinationWeek };
	} );

	await prisma.$transaction( async ( tx ) => {
		// Si el mes todavia no existe se crea con el objetivo de la plantilla; si
		// existe, conserva el suyo.
		const routineMonth = await tx.trainingRoutineMonth.upsert( {
			create: {
				month: input.month,
				objective: template.objective,
				studentId: input.studentId,
				year: input.year,
			},
			select: {
				id: true,
			},
			update: {},
			where: {
				studentId_month_year: {
					month: input.month,
					studentId: input.studentId,
					year: input.year,
				},
			},
		} );

		await tx.trainingRoutineWeek.deleteMany( {
			where: {
				trainingRoutineMonthId: routineMonth.id,
				week: {
					in: destinationWeeks,
				},
			},
		} );
		await createRoutineWeeksCopy( tx, weeksToCreate, { trainingRoutineMonthId: routineMonth.id } );
	} );

	return { ok: true, templateName: template.name };
}
