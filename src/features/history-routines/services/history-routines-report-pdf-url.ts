type BuildHistoryRoutinesReportPdfUrlInput = {
	disposition?: "attachment" | "inline";
	month: number;
	studentId?: string | null;
	year: number;
};

export function buildHistoryRoutinesReportPdfUrl( {
	disposition = "inline",
	month,
	studentId,
	year,
}: BuildHistoryRoutinesReportPdfUrlInput ) {
	const searchParams = new URLSearchParams( {
		disposition,
		month: String( month ),
		year: String( year ),
	} );

	if (studentId?.trim()) {
		searchParams.set( "studentId", studentId );
	}

	return `/api/history-routines/report?${ searchParams.toString() }`;
}
