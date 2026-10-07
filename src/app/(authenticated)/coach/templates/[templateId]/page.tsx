import type { Metadata } from "next";
import CoachRoutineTemplateDetailPageContent from "@/features/role/coach/routine-templates/views/coach-routine-template-detail-page-content";

export const metadata: Metadata = {
	title: "Plantilla de rutina",
	description: "Semanas, días y ejercicios de la plantilla",
};

type Props = {
	params: Promise<{ templateId: string }>;
};

export default async function CoachRoutineTemplateDetail( { params }: Props ) {
	const { templateId } = await params;

	return (
		<CoachRoutineTemplateDetailPageContent templateId={ templateId }/>
	)
}
