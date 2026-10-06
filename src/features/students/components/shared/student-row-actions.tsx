import type { StudentListItem } from "@/features/students/actions/get-students";

import { StudentActionMenu } from "@/features/students/components/shared/student-action-menu";
import { StudentOpenButton } from "@/features/students/components/shared/student-open-button";

type StudentRowActionsProps = {
	student: StudentListItem;
};

export function StudentRowActions( { student }: StudentRowActionsProps ) {
	return (
		<div className={ "flex items-center gap-1" }>
			<StudentOpenButton student={ student }/>
			<StudentActionMenu student={ student }/>
		</div>
	);
}
