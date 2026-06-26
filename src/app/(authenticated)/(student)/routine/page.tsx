import type { Metadata } from "next";

import { getAuthenticatedSession } from "@/features/auth/session";
import RoutinePageContent from "@/features/role/student/routine/views/RoutinePageContent";

export const metadata: Metadata = {
	title: "Rutina de Ejercicio",
	description: "Detalles de la rutina de ejercicio",
};

interface Props {
	searchParams: Promise<{
		routineDayId?: string;
	}>;
}

export default async function StudentRoutinePage( { searchParams }: Props ) {
	const resolvedSearchParams = await searchParams;
	const session = await getAuthenticatedSession();
	const routineDayId = resolvedSearchParams.routineDayId?.trim() || null;

	return (
		<RoutinePageContent
			routineDayId={ routineDayId }
			studentId={ session?.sub ?? null }
		/>
	);
}
