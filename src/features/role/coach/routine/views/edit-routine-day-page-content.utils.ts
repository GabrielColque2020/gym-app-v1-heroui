export function buildTrainingRoutineHref( studentId: string | null, month: number | null, year: number | null ) {
	if (!studentId) return "/coach/student";

	const params = new URLSearchParams( { studentId } );

	if (month) params.set( "month", String( month ) );
	if (year) params.set( "year", String( year ) );

	return `/coach/training-routine?${ params.toString() }`;
}

export function buildEditRoutineBreadcrumbs( studentId: string | null, month: number | null, year: number | null, currentLabel: string ) {
	const routineHref = buildTrainingRoutineHref( studentId, month, year );

	return [
		{ href: "/coach/dashboard", label: "Inicio" },
		{ href: "/coach/student", label: "Estudiantes" },
		{ href: routineHref, label: "Rutina del estudiante" },
		{ label: currentLabel },
	];
}

export function buildEditRoutineDayHref( routineDayId: string, studentId: string, month: number, year: number ) {
	const params = new URLSearchParams( {
		month: String( month ),
		routineDayId,
		studentId,
		year: String( year ),
	} );

	return `/coach/routine?${ params.toString() }`;
}

export function buildRoutineTemplateHref( templateId: string ) {
	return `/coach/templates/${ templateId }`;
}

export function buildEditTemplateBreadcrumbs( templateId: string, currentLabel: string ) {
	return [
		{ href: "/coach/dashboard", label: "Inicio" },
		{ href: "/coach/templates", label: "Plantillas" },
		{ href: buildRoutineTemplateHref( templateId ), label: "Plantilla" },
		{ label: currentLabel },
	];
}

export function buildEditTemplateDayHref( routineDayId: string, templateId: string ) {
	const params = new URLSearchParams( { routineDayId, templateId } );

	return `/coach/routine?${ params.toString() }`;
}
