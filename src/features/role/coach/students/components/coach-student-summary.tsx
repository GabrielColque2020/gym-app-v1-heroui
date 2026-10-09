"use client";

import { useState } from "react";

import { Button, Card, Chip } from "@heroui/react";
import { PencilLine, Target } from "lucide-react";

import { useResponsiveDrawerPlacement } from "@/features/shared/hooks/use-responsive-drawer-placement";
import { StudentDrawer } from "@/features/students/components/shared/student-drawer";
import { useStudents } from "@/features/students/hooks/use-students";

// Mas que esto, las observaciones se muestran cortadas con "Ver todo".
const LONG_OBSERVATIONS_LENGTH = 140;

function getAge( birthDate: Date | string | null ) {
	if (!birthDate) return null;

	const date = new Date( birthDate );

	if (Number.isNaN( date.getTime() )) return null;

	const today = new Date();
	let age = today.getFullYear() - date.getUTCFullYear();
	const hasHadBirthday = today.getMonth() > date.getUTCMonth()
		|| ( today.getMonth() === date.getUTCMonth() && today.getDate() >= date.getUTCDate() );

	if (!hasHadBirthday) age -= 1;

	return age >= 0 ? age : null;
}

function formatNumber( value: number ) {
	return new Intl.NumberFormat( "es-AR", { maximumFractionDigits: 1 } ).format( value );
}

// Lo que el entrenador necesita tener a la vista mientras arma la rutina o el
// plan: objetivo, medidas, edad y sus observaciones. Antes estaba solo en el
// formulario de edicion, al que se llegaba volviendo a la lista de estudiantes.
export function CoachStudentSummary( { studentId }: { studentId: string } ) {
	const { data: students } = useStudents();
	const [ isEditOpen, setIsEditOpen ] = useState( false );
	const [ showAllObservations, setShowAllObservations ] = useState( false );
	const placement = useResponsiveDrawerPlacement();
	const student = students?.find( ( item ) => item.id === studentId );

	if (!student) return null;

	const description = student.DescriptionStudent;
	// 0 es "no se cargo": nadie pesa ni mide 0.
	const weight = description?.weight ? `${ formatNumber( description.weight ) } kg` : null;
	const height = description?.height ? `${ formatNumber( description.height ) } cm` : null;
	const age = getAge( student.birthDate );
	const objective = description?.objective?.trim() || null;
	const observations = description?.observations?.trim() || null;
	const isLongObservations = ( observations?.length ?? 0 ) > LONG_OBSERVATIONS_LENGTH;
	const facts = [ weight, height, age !== null ? `${ age } años` : null ].filter( Boolean );
	const isEmpty = !objective && !observations && facts.length === 0;

	return (
		<Card className={ "border border-border" } variant={ "default" }>
			<Card.Content className={ "flex flex-col gap-3 p-3 sm:flex-row sm:items-start sm:justify-between sm:p-4" }>
				<div className={ "min-w-0 flex-1 space-y-2" }>
					{ isEmpty ? (
						<p className={ "text-sm text-muted" }>
							Todavía no tiene objetivo, medidas ni observaciones cargadas.
						</p>
					) : (
						<>
							<div className={ "flex flex-wrap items-center gap-2" }>
								{ objective ? (
									<Chip color={ "accent" } size={ "sm" } variant={ "soft" }>
										<Target className={ "size-3" }/>
										{ objective }
									</Chip>
								) : (
									<Chip size={ "sm" } variant={ "soft" }>Sin objetivo</Chip>
								) }
								{ facts.length > 0 ? (
									<span className={ "text-sm text-muted" }>{ facts.join( " · " ) }</span>
								) : null }
							</div>
							{ observations ? (
								<div className={ "text-sm" }>
									<span className={ "font-medium text-foreground" }>Observaciones: </span>
									<span className={ `text-muted ${ isLongObservations && !showAllObservations ? "line-clamp-2" : "" }` }>
										{ observations }
									</span>
									{ isLongObservations ? (
										<button
											className={ "ms-1 text-sm font-medium text-accent hover:underline" }
											type={ "button" }
											onClick={ () => setShowAllObservations( ( current ) => !current ) }
										>
											{ showAllObservations ? "Ver menos" : "Ver todo" }
										</button>
									) : null }
								</div>
							) : null }
						</>
					) }
				</div>
				<Button className={ "shrink-0 self-start" } size={ "sm" } variant={ "secondary" } onPress={ () => setIsEditOpen( true ) }>
					<PencilLine className={ "size-4" }/>
					Editar datos
				</Button>
			</Card.Content>

			<StudentDrawer
				hideTrigger
				isOpen={ isEditOpen }
				mode={ "edit" }
				placement={ placement }
				student={ student }
				onOpenChangeAction={ setIsEditOpen }
			/>
		</Card>
	);
}
