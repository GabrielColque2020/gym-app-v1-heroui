import type { StudentListItem } from "@/features/students/actions/get-students";

import { CircleCheck, TrashBin } from "@gravity-ui/icons";
import { Button, Spinner } from "@heroui/react";

import { StudentSheet } from "@/features/students/components/shared/student-sheet";
import { useStudentStatusAction } from "@/features/students/hooks/use-student-status-action";

type StudentRowActionsProps = {
	student: StudentListItem;
};

export function StudentRowActions( { student }: StudentRowActionsProps ) {
	const { changeStatus, isPending, statusClassName, statusLabel } = useStudentStatusAction( { student } );

	return (
		<div className={ "flex items-center justify-start gap-2" }>
			<StudentSheet mode={ "edit" } student={ student }/>
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
					<TrashBin className={ "size-4" }/>
				) : (
					<CircleCheck className={ "size-4" }/>
				) }
			</Button>
		</div>
	);
}
