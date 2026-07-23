"use client";

import type { StudentListItem } from "@/features/students/actions/get-students";
import { Card, Chip } from "@heroui/react";
import { UserRound } from "lucide-react";

import { StudentActionMenu } from "@/features/students/components/shared/student-action-menu";

type StudentMobileCardProps = {
	student: StudentListItem;
};

export function StudentMobileCard( { student }: StudentMobileCardProps ) {
	return (
		<Card className={ "overflow-hidden rounded-2xl border border-border/70 shadow-sm" } variant={ "default" }>
			<Card.Content className={ "py-1" }>
				<div className={ "grid grid-cols-[4rem_1fr_auto] items-start gap-3" }>
					<div className={ "flex size-16 items-center justify-center rounded-full bg-accent-soft text-accent" }>
						<UserRound className={ "size-8" }/>
					</div>

					<div className={ "min-w-0" }>
						<h3 className={ "truncate text-lg font-semibold leading-6 text-foreground" }>{ student.name }</h3>
						<p className={ "mt-1 truncate text-sm font-medium text-muted" }>{ student.email }</p>
						<p className={ "mt-0.5 truncate text-xs text-muted" }>DNI { student.dni }</p>
						<Chip
							className={ "mt-2 w-fit px-2" }
							color={ student.active ? "success" : "danger" }
							size={ "sm" }
							variant={ "soft" }
						>
							{ student.active ? "Activo" : "Inactivo" }
						</Chip>
					</div>

					<StudentActionMenu student={ student }/>
				</div>
			</Card.Content>
		</Card>
	);
}
