"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card } from "@heroui/react";
import { ArrowLeft } from "lucide-react";

import { PageBreadcrumbs, PageHeader } from "@/components/common";
import { ExerciseProgressPanel } from "@/features/exercise-progress/components/exercise-progress-panel";
import {
	useStudentExerciseProgress,
	useStudentProgressExercises,
} from "@/features/role/student/exercise-progress/hooks/use-exercise-progress";

type StudentExerciseProgressPageContentProps = {
	// El ejercicio pedido en la direccion. Sin el, se muestra el ultimo que hizo.
	exerciseId: string | null;
	// El dia de rutina desde el que se llego, para poder volver a el.
	routineDayId: string | null;
};

// Como le fue al estudiante en un ejercicio a lo largo del tiempo. El ejercicio
// elegido va en la direccion, para poder llegar directo desde otras pantallas.
export default function StudentExerciseProgressPageContent( { exerciseId, routineDayId }: StudentExerciseProgressPageContentProps ) {
	const router = useRouter();
	const exercisesQuery = useStudentProgressExercises();
	const exercises = exercisesQuery.data ?? [];
	const selectedExerciseId = exerciseId ?? exercises[ 0 ]?.exerciseId ?? null;
	const progressQuery = useStudentExerciseProgress( selectedExerciseId );
	const routineHref = routineDayId ? `/student/routine?routineDayId=${ encodeURIComponent( routineDayId ) }` : null;
	const breadcrumbs = routineHref
		? [ { href: "/student/dashboard", label: "Inicio" }, { href: routineHref, label: "Rutina" }, { label: "Progreso" } ]
		: [ { href: "/student/dashboard", label: "Inicio" }, { label: "Progreso" } ];

	return (
		<div className={ "flex flex-col gap-4" }>
			<div className={ "hidden sm:block" }>
				<PageBreadcrumbs
					backHref={ routineHref ?? "/student/dashboard" }
					backLabel={ routineHref ? "Volver a la rutina" : "Volver al inicio" }
					crumbs={ breadcrumbs }
				/>
			</div>
			{ /* En el telefono no hay migas: quien vino desde un ejercicio necesita
			     igual un camino de vuelta a lo que estaba cargando. */ }
			{ routineHref ? (
				<Link className={ "inline-flex items-center gap-1.5 self-start text-sm font-semibold text-accent sm:hidden" } href={ routineHref }>
					<ArrowLeft className={ "size-4" }/>
					Volver a la rutina
				</Link>
			) : null }
			<Card className={ "border border-border py-2" } variant={ "default" }>
				<Card.Header className={ "border-b border-border p-3" }>
					<PageHeader
						title={ "Progreso" }
						description={ "Cómo te fue en cada ejercicio a lo largo del tiempo." }
					/>
				</Card.Header>
				<Card.Content className={ "flex flex-col gap-4 p-3" }>
					<ExerciseProgressPanel
						emptyDescription={ "Cuando cargues las series de tu rutina, acá vas a ver cómo vas mejorando en cada ejercicio." }
						exercises={ exercises }
						isError={ exercisesQuery.isError }
						isLoading={ exercisesQuery.isLoading }
						isRetrying={ exercisesQuery.isFetching }
						onRetryAction={ () => void exercisesQuery.refetch() }
						progress={ progressQuery }
						selectedExerciseId={ selectedExerciseId }
						onSelectAction={ ( nextExerciseId ) => {
							const params = new URLSearchParams( { exerciseId: nextExerciseId } );

							if (routineDayId) params.set( "routineDayId", routineDayId );

							router.replace( `/student/progress?${ params.toString() }` );
						} }
					/>
				</Card.Content>
			</Card>
		</div>
	);
}
