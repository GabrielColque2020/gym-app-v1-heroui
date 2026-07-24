import { renderToBuffer } from "@react-pdf/renderer";
import { NextResponse } from "next/server";

import { getAuthenticatedSession } from "@/features/auth/session";
import {
	HistoryRoutinesPdfDocument
} from "@/features/history-routines/components/shared/history-routines-pdf-document";
import { getHistoryRoutinesByStudentBase } from "@/features/history-routines/services/history-routines-by-student";
import {
	buildHistoryRoutineMonthSummary,
	groupHistoryRoutinesByWeek,
} from "@/features/history-routines/services/history-routines-view";

function parsePositiveInteger(value: string | null, label: string) {
    const parsedValue = Number(value);

    if (!Number.isInteger(parsedValue) || parsedValue <= 0) {
        throw new Error(`${label} invalido.`);
    }

    return parsedValue;
}

export async function GET(request: Request) {
    try {
        const session = await getAuthenticatedSession();

        if (!session) {
            return NextResponse.json({ error: "Debes iniciar sesión para generar el reporte." }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const disposition = searchParams.get("disposition") === "attachment" ? "attachment" : "inline";
        const month = parsePositiveInteger(searchParams.get("month"), "Mes");
        const year = parsePositiveInteger(searchParams.get("year"), "Ano");
        const requestedStudentId = searchParams.get("studentId")?.trim() || null;

        if (session.role !== "STUDENT" && session.role !== "COACH") {
            return NextResponse.json({ error: "No tienes permisos para generar este reporte." }, { status: 403 });
        }

        const studentId = session.role === "STUDENT" ? session.sub : requestedStudentId;

        if (!studentId) {
            return NextResponse.json({ error: "Debes indicar un estudiante para generar el reporte." }, { status: 400 });
        }

        const reportData = await getHistoryRoutinesByStudentBase({
            month,
            studentId,
            studentNotFoundMessage: session.role === "COACH"
                ? "No se encontró un estudiante activo para consultar su historial."
                : "No se encontró un historial activo para el estudiante autenticado.",
            studentWhere: session.role === "COACH" ? { coachId: session.sub } : undefined,
            year,
        });
        const weekGroups = groupHistoryRoutinesByWeek(reportData.historyRoutines);
        const summary = buildHistoryRoutineMonthSummary(weekGroups);
        const monthLabel = `${String(month).padStart(2, "0")}/${year}`;
        const fileName = `historial-rutinas-${reportData.student.name.toLowerCase().replaceAll(/\s+/g, "-")}-${year}-${String(month).padStart(2, "0")}.pdf`;
        const pdfDocument = HistoryRoutinesPdfDocument({
            monthLabel,
            objective: reportData.student.DescriptionStudent?.objective,
            summary,
            studentName: reportData.student.name,
            weekGroups,
        }) as Parameters<typeof renderToBuffer>[ 0 ];
        const pdfBuffer = await renderToBuffer(pdfDocument);
        const pdfArrayBuffer = new ArrayBuffer(pdfBuffer.byteLength);
        new Uint8Array(pdfArrayBuffer).set(pdfBuffer);
        const pdfBlob = new Blob([ pdfArrayBuffer ], { type: "application/pdf" });

        return new NextResponse(pdfBlob, {
            headers: {
                "Cache-Control": "no-store",
                "Content-Disposition": `${disposition}; filename="${fileName}"`,
                "Content-Type": "application/pdf",
            },
        });
    } catch (error) {
        return NextResponse.json(
            {
                error: error instanceof Error ? error.message : "No se pudo generar el reporte PDF.",
            },
            { status: 400 },
        );
    }
}
