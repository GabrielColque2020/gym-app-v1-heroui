import type { Metadata } from "next";
import RoutinePageContent from "@/features/student/routine/views/RoutinePageContent";

interface Props {
	params: Promise<{
		id: string;
	}>;
}

export const metadata: Metadata = {
	title: "Rutina de Ejercicio",
	description: "Detalles de la rutina de ejercicio",
};

export default function RoutinePage() {
	return (
		<div className={ "flex sm:max-w-550 flex-col gap-4 px-5 pb-10 pt-4" }>
			<RoutinePageContent/>

		</div>
	)
}