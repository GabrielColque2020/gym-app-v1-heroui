type BuildMealPlansReportPdfUrlInput = {
	disposition?: "attachment" | "inline";
	studentId: string;
};

export function buildMealPlansReportPdfUrl( {
	disposition = "attachment",
	studentId,
}: BuildMealPlansReportPdfUrlInput ) {
	const searchParams = new URLSearchParams( {
		disposition,
		studentId,
	} );

	return `/api/meal-plans/report?${ searchParams.toString() }`;
}
