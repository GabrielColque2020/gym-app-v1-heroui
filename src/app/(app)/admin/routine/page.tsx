import type { Metadata } from "next";
import EditRoutineDayPageContent from "@/features/admin/routine/views/EditRoutineDayPageContent";

export const metadata: Metadata = {
	title: "Editar Día",
	description: "Editor del día de entrenamiento",
};

export default function AdminEditRoutinePage() {
	return (
		<div className={ "flex max-w-550 flex-col gap-4 px-5 pb-10 pt-4" }>
			<EditRoutineDayPageContent/>
		</div>
	)
}