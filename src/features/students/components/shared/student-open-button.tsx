"use client";

import type { StudentListItem } from "@/features/students/actions/get-students";

import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

import { buildStudentTrainingRoutineHref } from "@/features/role/coach/dashboard/services/coach-dashboard-links";

type StudentOpenButtonProps = {
	className?: string;
	student: StudentListItem;
};

// Entrada a la ficha del estudiante (rutina, plan e historial). Solo para
// activos: esas pantallas no cargan a un estudiante inactivo.
export function StudentOpenButton( { className, student }: StudentOpenButtonProps ) {
	const router = useRouter();

	if (!student.active) return null;

	return (
		<Button
			aria-label={ `Abrir la ficha de ${ student.name }` }
			className={ className }
			size={ "sm" }
			variant={ "secondary" }
			onPress={ () => router.push( buildStudentTrainingRoutineHref( student.id ) ) }
		>
			Abrir
			<ArrowRight className={ "size-4" }/>
		</Button>
	);
}
