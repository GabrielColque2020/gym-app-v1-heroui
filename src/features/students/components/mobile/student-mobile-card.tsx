"use client";

import type { StudentListItem } from "@/features/students/actions/get-students";

import Link from "next/link";
import { Chip } from "@heroui/react";
import { ChevronRight, UserRound } from "lucide-react";

import { buildStudentTrainingRoutineHref } from "@/features/role/coach/dashboard/services/coach-dashboard-links";
import { StudentActionMenu } from "@/features/students/components/shared/student-action-menu";

type StudentMobileCardProps = {
	student: StudentListItem;
};

// Una fila por estudiante: asi entran varios en la pantalla del telefono. Tocar
// los datos abre su ficha (rutina, plan e historial); el menu queda aparte.
export function StudentMobileCard( { student }: StudentMobileCardProps ) {
	const details = (
		<>
			<div className={ "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent" }>
				<UserRound className={ "size-5" }/>
			</div>
			<div className={ "min-w-0 flex-1" }>
				<p className={ "flex items-center gap-2" }>
					<span className={ "line-clamp-2 break-words text-base font-semibold leading-5 text-foreground" }>
						{ student.name }
					</span>
					{ /* Activo es lo normal: solo se marca al que no lo esta. */ }
					{ student.active ? null : (
						<Chip className={ "shrink-0" } color={ "danger" } size={ "sm" } variant={ "soft" }>
							Inactivo
						</Chip>
					) }
				</p>
				<p className={ "mt-0.5 truncate text-xs text-muted" }>{ student.email }</p>
				<p className={ "truncate text-xs text-muted" }>DNI { student.dni }</p>
			</div>
		</>
	);

	return (
		<div className={ "flex items-center gap-1 rounded-2xl border border-border/70 bg-surface-secondary py-2 pl-3 pr-1" }>
			{ /* La ficha solo carga a un estudiante activo: el inactivo no es un enlace. */ }
			{ student.active ? (
				<Link
					aria-label={ `Abrir la ficha de ${ student.name }` }
					className={ "flex min-w-0 flex-1 items-center gap-3" }
					href={ buildStudentTrainingRoutineHref( student.id ) }
				>
					{ details }
					<ChevronRight className={ "size-4 shrink-0 text-muted" }/>
				</Link>
			) : (
				<div className={ "flex min-w-0 flex-1 items-center gap-3 opacity-70" }>{ details }</div>
			) }
			<StudentActionMenu student={ student }/>
		</div>
	);
}
