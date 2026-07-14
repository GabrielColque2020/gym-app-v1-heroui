"use client";

import type { RefObject } from "react";

import { Chip } from "@heroui/react";

import { formatMealPlanDescriptionLines, formatMealTime } from "@/features/meal-plans/services/meal-plan-formatters";
import type { MealPlan } from "@/features/meal-plans/types/meal-plans-types";

type MealPlansPrintableProps = {
	contentRef: RefObject<HTMLDivElement | null>;
	mealPlans: MealPlan[];
	studentName: string;
	studentObjective?: string | null;
	studentObservations?: string | null;
};

function getPrintableDescription( mealPlan: MealPlan ) {
	const lines = formatMealPlanDescriptionLines( mealPlan.description );

	return lines.length > 0 ? lines : [ "Sin detalles cargados." ];
}

export function MealPlansPrintable( {
	contentRef,
	mealPlans,
	studentName,
	studentObjective,
	studentObservations,
}: MealPlansPrintableProps ) {
	const objective = studentObjective?.trim() || "Sin objetivo definido";
	const observations = studentObservations?.trim() || null;

	return (
		<div ref={ contentRef } className={ "hidden print:block" }>
			<div className={ "min-h-screen bg-white px-4 py-4 text-[11px] text-slate-900 print:px-0 print:py-0" }>
				<div className={ "mb-4 flex items-start justify-between gap-3 border-b-2 border-sky-700 pb-3" }>
					<div className={ "min-w-0" }>
						<h1 className={ "text-base font-extrabold uppercase tracking-[0.2em] text-sky-800" }>
							Plan alimenticio
						</h1>
						<p className={ "mt-1 text-[11px] font-semibold text-slate-800" }>
							Estudiante: <span className={ "text-sky-800" }>{ studentName }</span>
						</p>
						<p className={ "text-[10px] text-slate-600" }>
							Objetivo: <span className={ "font-medium text-slate-800" }>{ objective }</span>
						</p>
						{ observations ? (
							<p className={ "mt-1 max-w-[680px] text-[10px] leading-relaxed text-slate-500" }>
								Observaciones: { observations }
							</p>
						) : null }
					</div>
					<div className={ "flex shrink-0 items-center gap-1.5" }>
						<Chip className={ "border border-sky-200 bg-sky-50 text-sky-800" } size={ "sm" } variant={ "soft" }>
							{ mealPlans.length } comidas
						</Chip>
					</div>
				</div>

				<div className={ "grid gap-3 print:grid-cols-2" }>
					{ mealPlans.map( ( mealPlan, index ) => (
						<section
							key={ mealPlan.id }
							className={ "break-inside-avoid overflow-hidden rounded-lg border border-sky-200 bg-white" }
						>
							<div className={ "flex items-center justify-between gap-3 border-b border-sky-200 bg-sky-50 px-3 py-2" }>
								<div className={ "flex min-w-0 items-center gap-2" }>
									<div className={ "flex size-6 shrink-0 items-center justify-center rounded-full bg-sky-700 text-[10px] font-bold text-white" }>
										{ index + 1 }
									</div>
									<div className={ "min-w-0" }>
										<p className={ "text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-800" }>
											{ formatMealTime( mealPlan.title ) }
										</p>
										<p className={ "text-[9px] text-slate-500" }>
											Orden { mealPlan.order }
										</p>
									</div>
								</div>
							</div>

							<div className={ "space-y-2 px-3 py-3" }>
								{ getPrintableDescription( mealPlan ).map( ( line, lineIndex ) => (
									<div key={ `${ mealPlan.id }-${ lineIndex }` } className={ "flex gap-2 text-[10px] leading-relaxed text-slate-700" }>
										<span className={ "mt-1.5 flex size-2 shrink-0 rounded-full bg-sky-700" }/>
										<p className={ "min-w-0 flex-1 whitespace-pre-wrap" }>{ line }</p>
									</div>
								) ) }
							</div>
						</section>
					) ) }
				</div>
			</div>
		</div>
	);
}
