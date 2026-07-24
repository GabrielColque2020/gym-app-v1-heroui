type BuildTrainingRoutineReportPdfUrlInput = {
	disposition?: "attachment" | "inline";
	month: number;
	studentId?: string | null;
	year: number;
};

export function buildTrainingRoutineReportPdfUrl( {
	disposition = "attachment",
	month,
	studentId,
	year,
}: BuildTrainingRoutineReportPdfUrlInput ) {
	const searchParams = new URLSearchParams( {
		disposition,
		month: String( month ),
		year: String( year ),
	} );

	if (studentId?.trim()) {
		searchParams.set( "studentId", studentId );
	}

	return `/api/training-routines/report?${ searchParams.toString() }`;
}
