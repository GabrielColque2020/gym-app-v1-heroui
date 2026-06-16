"use client";

import { Alert, Button, Card, Spinner } from "@heroui/react";
import { ArrowLeft } from "@gravity-ui/icons";
import { useRouter } from "next/navigation";

import { AdminTrainingRoutineFilter } from "@/features/admin/trainingRoutine/components/shared";
import { AdminTrainingRoutineCardDesktop } from "@/features/admin/trainingRoutine/components/desktop";
import { AdminTrainingRoutineCardMobile } from "@/features/admin/trainingRoutine/components/mobile";
import { useTrainingRoutines } from "@/features/admin/trainingRoutine/hooks/useTrainingRoutines";

type AdminTrainingRoutinesPageContentProps = {
	month: number;
	studentId: string | null;
	year: number;
};

export default function AdminTrainingRoutinesPageContent( {
															  month,
															  studentId,
															  year,
														  }: AdminTrainingRoutinesPageContentProps ) {
	const router = useRouter();
	const { data, error, isError, isLoading } = useTrainingRoutines( { month, studentId, year } );

	if (!studentId) {
		return (
			<Alert className={ "border border-warning/20" } status={ "warning" }>
				<Alert.Content>
					<Alert.Title>Selecciona un estudiante</Alert.Title>
					<Alert.Description>
						Para consultar rutinas primero tenes que elegir un estudiante activo.
					</Alert.Description>
					<div className={ "pt-3" }>
						<Button
							className={ "w-fit" }
							size={ "sm" }
							variant={ "secondary" }
							onPress={ () => router.push( "/admin/trainingRoutinesStudents" ) }
						>
							<ArrowLeft className={ "size-4" }/>
							Volver a estudiantes
						</Button>
					</div>
				</Alert.Content>
			</Alert>
		);
	}

	if (isLoading) {
		return (
			<Card className={ "border border-border bg-surface" } variant={ "default" }>
				<Card.Content className={ "flex min-h-56 flex-col items-center justify-center gap-3 py-10 text-center" }>
					<Spinner size={ "lg" }/>
					<div className={ "space-y-1" }>
						<p className={ "text-base font-semibold text-foreground" }>Cargando rutina</p>
						<p className={ "text-sm text-muted" }>Consultando semanas, dias y ejercicios del estudiante.</p>
					</div>
				</Card.Content>
			</Card>
		);
	}

	if (isError) {
		return (
			<Alert className={ "border border-danger/20" } status={ "danger" }>
				<Alert.Content>
					<Alert.Title>Error al cargar rutina</Alert.Title>
					<Alert.Description>{ error.message }</Alert.Description>
				</Alert.Content>
			</Alert>
		);
	}

	if (!data) return null;

	return (
		<>
			<AdminTrainingRoutineFilter
				month={ month }
				routineCount={ data.routines.length }
				routines={ data.routines }
				studentId={ studentId }
				studentName={ data.student.name }
				year={ year }
			/>

			{ data.routines.length === 0 ? (
				<Card className={ "border border-dashed border-border" } variant={ "default" }>
					<Card.Content className={ "py-10 text-center" }>
						<p className={ "text-base font-semibold text-foreground" }>No hay rutinas cargadas</p>
						<p className={ "mt-1 text-sm text-muted" }>
							{ data.student.name } no tiene rutinas para { month }/{ year }.
						</p>
					</Card.Content>
				</Card>
			) : (
				<>
					<div className={ "hidden md:flex" }>
						<AdminTrainingRoutineCardDesktop routines={ data.routines }/>
					</div>

					<div className={ "flex md:hidden" }>
						<AdminTrainingRoutineCardMobile routines={ data.routines }/>
					</div>
				</>
			) }
		</>
	);
}
