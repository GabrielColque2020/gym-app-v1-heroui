import type { StudentListItem } from "@/features/students/actions/get-students";

import { StudentActionMenu } from "@/features/students/components/shared/student-action-menu";

type StudentRowActionsProps = {
	student: StudentListItem;
};

export function StudentRowActions( { student }: StudentRowActionsProps ) {
	return <StudentActionMenu student={ student }/>;
}
