export function buildTrainingRoutineHref( studentId: string | null, month: number | null, year: number | null ) {
	if (!studentId) return "/coach/training-routines-students";

	const params = new URLSearchParams( { studentId } );

	if (month) params.set( "month", String( month ) );
	if (year) params.set( "year", String( year ) );

	return `/coach/training-routine?${ params.toString() }`;
}

export function buildEditRoutineBreadcrumbs( studentId: string | null, month: number | null, year: number | null, currentLabel: string ) {
	const routineHref = buildTrainingRoutineHref( studentId, month, year );

	return [
		{ href: "/coach/dashboard", label: "Inicio" },
		{ href: "/coach/training-routines-students", label: "Rutinas por estudiante" },
		{ href: routineHref, label: "Rutina del estudiante" },
		{ label: currentLabel },
	];
}
