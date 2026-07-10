import type { StudentListItem } from "@/features/students/actions/get-students";

import { Button, Spinner } from "@heroui/react";
import { CheckCircle2, Trash2 } from "lucide-react";

import { StudentDrawer } from "@/features/students/components/shared/student-drawer";
import { useStudentStatusAction } from "@/features/students/hooks/use-student-status-action";

type StudentRowActionsProps = {
	student: StudentListItem;
};

export function StudentRowActions( { student }: StudentRowActionsProps ) {
	const { changeStatus, isPending, statusClassName, statusLabel } = useStudentStatusAction( { student } );

	return (
		<div className={ "flex items-center justify-start gap-2" }>
			<StudentDrawer mode={ "edit" } student={ student }/>
			<Button
				isIconOnly
				aria-label={ `${ statusLabel } ${ student.name }` }
				className={ statusClassName }
				isDisabled={ isPending }
				size={ "sm" }
				variant={ "ghost" }
				onPress={ changeStatus }
			>
				{ isPending ? (
					<Spinner color={ "current" } size={ "sm" }/>
				) : student.active ? (
					<Trash2 className={ "size-4" }/>
				) : (
					<CheckCircle2 className={ "size-4" }/>
				) }
			</Button>
		</div>
	);
}
