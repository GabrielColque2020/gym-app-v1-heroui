"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, Label, ListBox, Select, Spinner } from "@heroui/react";
import { ArrowLeft } from "lucide-react";

import { PageBreadcrumbs, PageHeader } from "@/components/common";
import { ExerciseProgressView } from "@/features/exercise-progress/components/exercise-progress-view";
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
					{ exercisesQuery.isLoading ? (
						<div className={ "flex justify-center py-10" }>
							<Spinner aria-label={ "Cargando tu progreso" }/>
						</div>
					) : exercisesQuery.isError ? (
						<p className={ "py-10 text-center text-sm text-muted" }>No se pudo cargar tu progreso. Probá de nuevo en un momento.</p>
					) : exercises.length === 0 ? (
						<div className={ "mx-auto max-w-md py-10 text-center" }>
							<p className={ "text-base font-semibold text-foreground" }>Todavía no hay nada para mostrar</p>
							<p className={ "mt-1 text-sm leading-6 text-muted" }>
								Cuando cargues las series de tu rutina, acá vas a ver cómo vas mejorando en cada ejercicio.
							</p>
						</div>
					) : (
						<>
							<Select
								fullWidth
								value={ selectedExerciseId }
								onChange={ ( key ) => {
									if (key === null) return;

									const params = new URLSearchParams( { exerciseId: String( key ) } );

									if (routineDayId) params.set( "routineDayId", routineDayId );

									router.replace( `/student/progress?${ params.toString() }` );
								} }
							>
								<Label>Ejercicio</Label>
								<Select.Trigger className={ "border border-border" }>
									<Select.Value/>
									<Select.Indicator/>
								</Select.Trigger>
								<Select.Popover>
									<ListBox>
										{ exercises.map( ( exercise ) => (
											<ListBox.Item key={ exercise.exerciseId } id={ exercise.exerciseId } textValue={ exercise.name }>
												<span className={ "min-w-0 flex-1" }>{ exercise.name }</span>
												{ /* El punto separa el nombre de la cantidad cuando se ven en un
												     solo renglon, en el campo cerrado. */ }
												<span className={ "shrink-0 text-xs text-muted" }>
													{ " · " }{ exercise.sessionCount === 1 ? "1 sesión" : `${ exercise.sessionCount } sesiones` }
												</span>
												<ListBox.ItemIndicator/>
											</ListBox.Item>
										) ) }
									</ListBox>
								</Select.Popover>
							</Select>

							{ progressQuery.isLoading ? (
								<div className={ "flex justify-center py-10" }>
									<Spinner aria-label={ "Cargando el ejercicio" }/>
								</div>
							) : progressQuery.isError ? (
								<p className={ "py-10 text-center text-sm text-muted" }>No se pudo cargar este ejercicio. Probá de nuevo en un momento.</p>
							) : progressQuery.data ? (
								<ExerciseProgressView detail={ progressQuery.data }/>
							) : (
								<p className={ "py-10 text-center text-sm text-muted" }>Ese ejercicio ya no existe. Elegí otro de la lista.</p>
							) }
						</>
					) }
				</Card.Content>
			</Card>
		</div>
	);
}
