import { renderToBuffer } from "@react-pdf/renderer";
import { NextResponse } from "next/server";

import { getAuthenticatedSession } from "@/features/auth/session";
import { TrainingRoutinePdfDocument } from "@/features/training-routine/components/shared/training-routine-pdf-document";
import { getTrainingRoutinesByStudentBase } from "@/features/training-routine/services/training-routines-by-student";

function parsePositiveInteger( value: string | null, label: string ) {
	const parsedValue = Number( value );

	if (!Number.isInteger( parsedValue ) || parsedValue <= 0) {
		throw new Error( `${ label } invalido.` );
	}

	return parsedValue;
}

export async function GET( request: Request ) {
	try {
		const session = await getAuthenticatedSession();

		if (!session) {
			return NextResponse.json( { error: "Debes iniciar sesion para generar el reporte." }, { status: 401 } );
		}

		const { searchParams } = new URL( request.url );
		const disposition = searchParams.get( "disposition" ) === "inline" ? "inline" : "attachment";
		const month = parsePositiveInteger( searchParams.get( "month" ), "Mes" );
		const year = parsePositiveInteger( searchParams.get( "year" ), "Ano" );
		const requestedStudentId = searchParams.get( "studentId" )?.trim() || null;

		if (session.role !== "STUDENT" && session.role !== "COACH") {
			return NextResponse.json( { error: "No tienes permisos para generar este reporte." }, { status: 403 } );
		}

		const studentId = session.role === "STUDENT" ? session.sub : requestedStudentId;

		if (!studentId) {
			return NextResponse.json( { error: "Debes indicar un estudiante para generar el reporte." }, { status: 400 } );
		}

		const data = await getTrainingRoutinesByStudentBase( {
			coachId: session.role === "COACH" ? session.sub : undefined,
			month,
			studentId,
			year,
		} );
		const fileName = `rutina-${ data.student.name.toLowerCase().replaceAll( /\s+/g, "-" ) }-${ year }-${ String( month ).padStart( 2, "0" ) }.pdf`;
		const pdfDocument = TrainingRoutinePdfDocument( {
			month,
			routineObjective: data.routineMonth.objective,
			routineWeeks: data.routineMonth.weeks,
			studentName: data.student.name,
			year,
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
