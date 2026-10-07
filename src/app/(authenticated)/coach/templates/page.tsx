import type { Metadata } from "next";
import CoachRoutineTemplatesPageContent from "@/features/role/coach/routine-templates/views/coach-routine-templates-page-content";

export const metadata: Metadata = {
	title: "Plantillas de rutina",
	description: "Rutinas guardadas para usar como punto de partida",
};

export default function CoachRoutineTemplates() {
	return (
		<CoachRoutineTemplatesPageContent/>
	)
}
