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

// Entrada a la ficha del estudiante (rutina, plan e historial). Tambien para un
// inactivo: se ve su historial sin reactivarlo.
export function StudentOpenButton( { className, student }: StudentOpenButtonProps ) {
	const router = useRouter();

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
