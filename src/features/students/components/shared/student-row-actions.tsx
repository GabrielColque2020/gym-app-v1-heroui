import type { StudentListItem } from "@/features/students/actions/get-students";

import { StudentEditButton } from "@/features/students/components/shared/student-edit-button";
import { StudentOpenButton } from "@/features/students/components/shared/student-open-button";
import { StudentRestoreButton } from "@/features/students/components/shared/student-restore-button";

type StudentRowActionsProps = {
	student: StudentListItem;
};

// Dos acciones a la vista, cada una con su nombre: la principal ("Abrir", o
// "Restaurar" si esta inactivo) y "Editar". Sin menu que abrir para saber que
// se puede hacer.
export function StudentRowActions( { student }: StudentRowActionsProps ) {
	return (
		<div className={ "flex items-center gap-2" }>
			<StudentOpenButton student={ student }/>
			<StudentRestoreButton student={ student }/>
			<StudentEditButton showLabel student={ student }/>
		</div>
	);
}
