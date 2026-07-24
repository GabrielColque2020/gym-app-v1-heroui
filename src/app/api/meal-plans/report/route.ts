import { renderToBuffer } from "@react-pdf/renderer";
import { NextResponse } from "next/server";

import { MealPlansPdfDocument } from "@/features/meal-plans/components/shared/meal-plans-pdf-document";
import { getMealPlansByStudentAction } from "@/features/meal-plans/actions/get-meal-plans-by-student";

export async function GET( request: Request ) {
	try {
		const { searchParams } = new URL( request.url );
		const disposition = searchParams.get( "disposition" ) === "inline" ? "inline" : "attachment";
		const studentId = searchParams.get( "studentId" )?.trim();

		if (!studentId) {
			return NextResponse.json( { error: "Debes indicar un estudiante para generar el reporte." }, { status: 400 } );
		}

		const data = await getMealPlansByStudentAction( { studentId } );
		const fileName = `planes-alimenticios-${ data.student.name.toLowerCase().replaceAll( /\s+/g, "-" ) }.pdf`;
		const pdfDocument = MealPlansPdfDocument( {
			mealPlans: data.mealPlans,
			studentName: data.student.name,
			studentObjective: data.student.DescriptionStudent?.objective,
			studentObservations: data.student.DescriptionStudent?.observations,
		} ) as Parameters<typeof renderToBuffer>[ 0 ];
		const pdfBuffer = await renderToBuffer( pdfDocument );
		const pdfArrayBuffer = new ArrayBuffer( pdfBuffer.byteLength );
		new Uint8Array( pdfArrayBuffer ).set( pdfBuffer );
		const pdfBlob = new Blob( [ pdfArrayBuffer ], { type: "application/pdf" } );

		return new NextResponse( pdfBlob, {
			headers: {
				"Cache-Control": "no-store",
				"Content-Disposition": `${ disposition }; filename="${ fileName }"`,
				"Content-Type": "application/pdf",
			},
		} );
	} catch (error) {
		return NextResponse.json(
			{ error: error instanceof Error ? error.message : "No se pudo generar el reporte PDF." },
			{ status: 400 },
		);
	}
}
