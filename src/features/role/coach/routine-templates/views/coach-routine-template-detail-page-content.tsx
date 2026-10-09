"use client";

import { useState } from "react";
import { Button, Card, Spinner } from "@heroui/react";
import { CalendarRange, RotateCw } from "lucide-react";

import { PageBreadcrumbs } from "@/components/common";
import { RoutineTemplateStructureDrawer } from "@/features/role/coach/routine-templates/components/routine-template-structure-drawer";
import { buildEditTemplateDayHref } from "@/features/role/coach/routine/views/edit-routine-day-page-content.utils";
import { RepeatWeekButton } from "@/features/role/coach/training-routine/components/shared/coach-repeat-week-action";
import { CoachTrainingRoutineMonthGrid } from "@/features/role/coach/training-routine/components/shared/coach-training-routine-month-grid";
import { useRepeatRoutineTemplateWeek, useRoutineTemplateDetail } from "@/features/role/coach/training-routine/hooks/use-routine-templates";

type CoachRoutineTemplateDetailPageContentProps = {
	templateId: string;
};

function pluralize( count: number, singular: string, plural: string ) {
	return `${ count } ${ count === 1 ? singular : plural }`;
}

// Una plantilla por dentro: sus semanas y dias, con la misma grilla que la rutina
// de un estudiante. Cada dia abre el editor de ejercicios.
export default function CoachRoutineTemplateDetailPageContent( { templateId }: CoachRoutineTemplateDetailPageContentProps ) {
	const { data, isError, isFetching, isLoading, refetch } = useRoutineTemplateDetail( { alwaysFresh: true, templateId } );
	const isRefreshing = isFetching && !isLoading;
	const [ isStructureOpen, setIsStructureOpen ] = useState( false );
	const repeatWeek = useRepeatRoutineTemplateWeek();
	const weeks = data?.weeks ?? [];
	const dayCount = weeks.reduce( ( count, week ) => count + week.routineDays.length, 0 );
	const exerciseCount = weeks.reduce(
		( count, week ) => count + week.routineDays.reduce( ( dayTotal, day ) => dayTotal + day.routines.length, 0 ),
		0,
	);

	return (
		<div className={ "flex flex-col gap-4" }>
			<PageBreadcrumbs
				backHref={ "/coach/templates" }
				backLabel={ "Volver a plantillas" }
				crumbs={ [
					{ href: "/coach/dashboard", label: "Inicio" },
					{ href: "/coach/templates", label: "Plantillas" },
					{ label: data?.template.name ?? "Plantilla" },
				] }
			/>

			{ isLoading ? (
				<Card className={ "border border-border" } variant={ "default" }>
					<Card.Content className={ "flex justify-center py-10" }>
						<Spinner aria-label={ "Cargando la plantilla" }/>
					</Card.Content>
				</Card>
			) : isError || !data ? (
				<Card className={ "border border-dashed border-border" } variant={ "default" }>
					<Card.Content className={ "py-10 text-center" }>
						<p className={ "text-base font-semibold text-foreground" }>
							{ isError ? "No se pudo cargar la plantilla" : "Esta plantilla ya no existe" }
						</p>
						<p className={ "mt-1 text-sm text-muted" }>
							{ isError ? "Probá de nuevo en un momento." : "Puede que la hayas eliminado. Volvé a la lista para ver las que tenés." }
						</p>
					</Card.Content>
				</Card>
			) : (
				<>
					<Card className={ "border border-border py-2" } variant={ "default" }>
						<Card.Content className={ "flex flex-row flex-wrap items-center justify-between gap-3 p-3" }>
							{ /* En el telefono el nombre ocupa todo el renglon y las acciones bajan:
							     al lado no entran sin partir el nombre letra por letra. */ }
							<div className={ "w-full min-w-0 sm:w-auto sm:flex-1" }>
								<p className={ "text-xs font-medium text-accent" }>Plantilla</p>
								<h1 className={ "line-clamp-2 text-xl font-black leading-tight text-foreground" }>{ data.template.name }</h1>
								<p className={ "mt-0.5 text-xs text-muted" }>
									{ pluralize( weeks.length, "semana", "semanas" ) } · { pluralize( dayCount, "día", "días" ) } · { pluralize( exerciseCount, "ejercicio", "ejercicios" ) }
								</p>
							</div>
							<div className={ "flex w-full shrink-0 items-center gap-2 sm:w-auto" }>
								<Button
									isIconOnly
									aria-label={ isRefreshing ? "Actualizando" : "Actualizar" }
									isDisabled={ isRefreshing }
									variant={ "secondary" }
									onPress={ () => void refetch() }
								>
									<RotateCw className={ isRefreshing ? "size-4 animate-spin" : "size-4" }/>
								</Button>
								<Button className={ "flex-1 sm:flex-none" } variant={ "secondary" } onPress={ () => setIsStructureOpen( true ) }>
									<CalendarRange className={ "size-4" }/>
									Semanas y días
								</Button>
							</div>
							{ data.template.objective?.trim() ? (
								<p className={ "w-full text-sm text-muted" }>
									<span className={ "font-medium text-foreground" }>Objetivo:</span> { data.template.objective }
								</p>
							) : null }
						</Card.Content>
					</Card>

					{ weeks.length === 0 ? (
						<Card className={ "border border-dashed border-border" } variant={ "default" }>
							<Card.Content className={ "py-10 text-center text-sm text-muted" }>
								Esta plantilla todavía no tiene semanas. Agregalas desde &quot;Semanas y días&quot;.
							</Card.Content>
						</Card>
					) : (
						<CoachTrainingRoutineMonthGrid
							buildDayHrefAction={ ( routineDayId ) => buildEditTemplateDayHref( routineDayId, templateId ) }
							renderWeekAction={ ( routineWeek ) => (
								<RepeatWeekButton
									isPending={ repeatWeek.isPending }
									routineWeeks={ weeks }
									selectedRoutine={ routineWeek }
									onRepeatAction={ async ( sourceWeek, destinationWeeks ) => {
										const result = await repeatWeek.mutateAsync( { destinationWeeks, sourceWeek, templateId } );

										if (!result.ok) throw new Error( "No se pudo repetir la semana." );
									} }
								/>
							) }
							routineWeeks={ weeks }
						/>
					) }
					<p className={ "px-1 text-xs leading-5 text-muted" }>
						Los cambios quedan en la plantilla. Las rutinas que ya armaste con ella no cambian.
					</p>
					<RoutineTemplateStructureDrawer detail={ data } isOpen={ isStructureOpen } onOpenChangeAction={ setIsStructureOpen }/>
				</>
			) }
		</div>
	);
}
