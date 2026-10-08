"use client";

import { useRouter } from "next/navigation";
import { Alert, Card } from "@heroui/react";

import { PageBreadcrumbs, PageHeader } from "@/components/common";
import { ExerciseProgressPanel } from "@/features/exercise-progress/components/exercise-progress-panel";
import { buildStudentProgressHref } from "@/features/role/coach/dashboard/services/coach-dashboard-links";
import {
	useCoachStudentExerciseProgress,
	useCoachStudentProgressExercises,
} from "@/features/role/coach/exercise-progress/hooks/use-exercise-progress";
import { CoachStudentTabs } from "@/features/role/coach/students/components/coach-student-tabs";

type CoachExerciseProgressPageContentProps = {
	// El ejercicio pedido en la direccion. Sin el, se muestra el ultimo que hizo.
	exerciseId: string | null;
	studentId: string | null;
};

function CoachExerciseProgressPageContentLoaded( { exerciseId, studentId }: { exerciseId: string | null; studentId: string } ) {
	const router = useRouter();
	const exercisesQuery = useCoachStudentProgressExercises( studentId );
	const exercises = exercisesQuery.data?.exercises ?? [];
	const studentName = exercisesQuery.data?.student.name ?? null;
	const selectedExerciseId = exerciseId ?? exercises[ 0 ]?.exerciseId ?? null;
	const progressQuery = useCoachStudentExerciseProgress( studentId, selectedExerciseId );
	// La consulta termino y no devolvio estudiante: no existe o es de otro entrenador.
	const isMissingStudent = exercisesQuery.isSuccess && exercisesQuery.data === null;
	const breadcrumbs = [
		{ href: "/", label: "Inicio" },
		{ href: "/coach/student", label: "Estudiantes" },
		{ label: studentName ?? "Progreso" },
	];

	return (
		<div className={ "mx-auto flex w-full max-w-350 flex-col gap-4" }>
			<PageBreadcrumbs backHref={ "/coach/student" } backLabel={ "Volver a estudiantes" } crumbs={ breadcrumbs }/>

			{ isMissingStudent ? (
				<Alert className={ "border border-warning/20" } status={ "warning" }>
					<Alert.Content>
						<Alert.Title>No se encontró al estudiante</Alert.Title>
						<Alert.Description>Elegilo de nuevo desde la lista de estudiantes.</Alert.Description>
					</Alert.Content>
				</Alert>
			) : (
				<>
					<CoachStudentTabs active={ "progress" } studentId={ studentId }/>
					<Card className={ "border border-border py-2" } variant={ "default" }>
						<Card.Header className={ "border-b border-border p-3" }>
							<PageHeader
								description={
									studentName
										? `Cómo le fue a ${ studentName } en cada ejercicio a lo largo del tiempo.`
										: "Cómo le fue en cada ejercicio a lo largo del tiempo."
								}
								title={ "Progreso" }
							/>
						</Card.Header>
						<Card.Content className={ "flex flex-col gap-4 p-3" }>
							<ExerciseProgressPanel
								emptyDescription={ "Cuando el estudiante cargue las series de su rutina, acá vas a ver cómo va mejorando en cada ejercicio." }
								exercises={ exercises }
								isError={ exercisesQuery.isError }
								isLoading={ exercisesQuery.isLoading }
								progress={ progressQuery }
								selectedExerciseId={ selectedExerciseId }
								onSelectAction={ ( nextExerciseId ) => {
									router.replace( `${ buildStudentProgressHref( studentId ) }&exerciseId=${ nextExerciseId }` );
								} }
							/>
						</Card.Content>
					</Card>
				</>
			) }
		</div>
	);
}

// El progreso de un estudiante, visto por su entrenador: la cuarta pestaña de
// la ficha del estudiante.
export default function CoachExerciseProgressPageContent( { exerciseId, studentId }: CoachExerciseProgressPageContentProps ) {
	if (!studentId) {
		return (
			<div className={ "flex flex-col gap-4" }>
				<PageBreadcrumbs
					backHref={ "/coach/student" }
					backLabel={ "Volver a estudiantes" }
					crumbs={ [ { href: "/", label: "Inicio" }, { href: "/coach/student", label: "Estudiantes" } ] }
				/>
				<Alert className={ "border border-warning/20" } status={ "warning" }>
					<Alert.Content>
						<Alert.Title>Seleccioná un estudiante</Alert.Title>
						<Alert.Description>Para ver el progreso primero tenés que elegir un estudiante.</Alert.Description>
					</Alert.Content>
				</Alert>
			</div>
		);
	}

	return <CoachExerciseProgressPageContentLoaded exerciseId={ exerciseId } studentId={ studentId }/>;
}
