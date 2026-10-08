"use client";

import type { ExerciseProgressDetail } from "@/features/exercise-progress/services/exercise-progress";

import { LineChart } from "@heroui-pro/react/line-chart";

import { monthYearLabel } from "@/constants/months";
import {
	formatProgressNumber,
	summarizeExerciseProgress,
} from "@/features/exercise-progress/services/exercise-progress";

type ExerciseProgressViewProps = {
	detail: ExerciseProgressDetail;
};

const shortDateFormatter = new Intl.DateTimeFormat( "es-AR", { day: "numeric", month: "short" } );
const longDateFormatter = new Intl.DateTimeFormat( "es-AR", { day: "numeric", month: "long", year: "numeric" } );

// La unidad va aparte y mas chica: con "152,5 kg" en un solo tamaño, en el
// telefono el numero no entraba y se cortaba.
function StatCard( { hint, label, unit, value }: { hint: string; label: string; unit?: string; value: string } ) {
	return (
		<div className={ "min-w-0 rounded-xl border border-border bg-surface px-2 py-2.5 sm:px-3" }>
			{ /* Sin cortar con puntos suspensivos: en un telefono angosto el texto
			     baja de renglon, que se lee mejor que "Ultima v...". */ }
			<p className={ "text-xs font-medium leading-tight text-muted" }>{ label }</p>
			<p className={ "flex flex-wrap items-baseline gap-x-1 text-base font-black tabular-nums text-foreground sm:text-lg" }>
				{ value }
				{ unit ? <span className={ "text-xs font-semibold text-muted" }>{ unit }</span> : null }
			</p>
			<p className={ "text-xs leading-tight text-muted" }>{ hint }</p>
		</div>
	);
}

// El recorrido de un estudiante en un ejercicio: tres numeros, el grafico y la
// lista de sesiones. Lo usan la pantalla del estudiante y la del entrenador.
export function ExerciseProgressView( { detail }: ExerciseProgressViewProps ) {
	const { sessions } = detail;
	const summary = summarizeExerciseProgress( sessions );
	const unit = summary.metric === "weight" ? "kg" : "reps";
	const formatValue = ( value: number ) => `${ formatProgressNumber( value ) } ${ unit }`;
	const chartData = summary.points.map( ( point ) => ( {
		label: shortDateFormatter.format( new Date( point.date ) ),
		value: point.value,
	} ) );
	const changeLabel = summary.change === null
		? "—"
		: `${ summary.change > 0 ? "+" : "" }${ formatProgressNumber( summary.change ) }`;

	if (sessions.length === 0) {
		return (
			<p className={ "rounded-xl border border-dashed border-border px-4 py-8 text-center text-sm text-muted" }>
				Todavía no hay series cargadas de este ejercicio.
			</p>
		);
	}

	return (
		<div className={ "flex flex-col gap-4" }>
			{ /* Los tres van siempre en un renglon: apilados, en el telefono empujaban
			     el grafico fuera de la primera pantalla. */ }
			<div className={ "grid grid-cols-3 gap-2" }>
				<StatCard
					// Textos cortos: en el telefono cada columna mide menos de 90 px.
					hint={ summary.best ? shortDateFormatter.format( new Date( summary.best.date ) ) : "Sin datos" }
					label={ "Récord" }
					unit={ summary.best ? unit : undefined }
					value={ summary.best ? formatProgressNumber( summary.best.value ) : "—" }
				/>
				<StatCard
					hint={ summary.last ? shortDateFormatter.format( new Date( summary.last.date ) ) : "Sin datos" }
					label={ "Última vez" }
					unit={ summary.last ? unit : undefined }
					value={ summary.last ? formatProgressNumber( summary.last.value ) : "—" }
				/>
				<StatCard
					hint={ summary.first && summary.change !== null ? `de ${ formatValue( summary.first.value ) }` : "Falta otra sesión" }
					label={ "Cambio" }
					unit={ summary.change !== null ? unit : undefined }
					value={ changeLabel }
				/>
			</div>

			{ chartData.length >= 2 ? (
				<div className={ "rounded-xl border border-border bg-surface p-3" }>
					<p className={ "mb-2 text-xs font-medium text-muted" }>
						{ summary.metric === "weight" ? "Peso más alto de cada sesión (kg)" : "Repeticiones más altas de cada sesión" }
					</p>
					<LineChart data={ chartData } height={ 220 }>
						<LineChart.Grid vertical={ false }/>
						<LineChart.XAxis dataKey={ "label" } minTickGap={ 24 } tickMargin={ 8 }/>
						{ /* El eje no arranca en cero: si no, pasar de 60 a 65 kg casi no se ve. */ }
						<LineChart.YAxis domain={ [ "auto", "auto" ] } tickFormatter={ ( value: number ) => formatProgressNumber( value ) } width={ 40 }/>
						<LineChart.Line
							dataKey={ "value" }
							dot={ { r: 3 } }
							name={ summary.metric === "weight" ? "Peso (kg)" : "Repeticiones" }
							stroke={ "var(--accent)" }
							strokeWidth={ 2 }
							type={ "monotone" }
						/>
						<LineChart.Tooltip content={ <LineChart.TooltipContent/> }/>
					</LineChart>
				</div>
			) : (
				<p className={ "rounded-xl border border-dashed border-border px-4 py-6 text-center text-sm text-muted" }>
					Con una sola sesión todavía no hay progreso para mostrar. El gráfico aparece desde la segunda.
				</p>
			) }

			<div>
				<p className={ "mb-2 text-sm font-semibold text-foreground" }>
					{ sessions.length === 1 ? "1 sesión" : `${ sessions.length } sesiones` }
				</p>
				<ol className={ "flex flex-col gap-2" }>
					{ /* La mas reciente arriba, que es la que se busca primero. */ }
					{ [ ...sessions ].reverse().map( ( session ) => (
						<li key={ session.key } className={ "rounded-xl border border-border bg-surface px-3 py-2.5" }>
							<div className={ "flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5" }>
								<p className={ "text-sm font-semibold text-foreground" }>{ longDateFormatter.format( new Date( session.date ) ) }</p>
								<p className={ "text-xs text-muted" }>
									Semana { session.week } · Día { session.dayNumber } · { monthYearLabel( String( session.month ), String( session.year ) ) }
								</p>
							</div>
							<ul className={ "mt-1.5 flex flex-wrap gap-1.5" }>
								{ session.sets.map( ( set, index ) => (
									<li
										key={ `${ session.key }-${ set.setNumber ?? index }` }
										className={ "rounded-lg bg-default px-2 py-1 text-xs tabular-nums text-foreground" }
									>
										{ set.reps === null ? "—" : formatProgressNumber( set.reps ) } reps
										{ set.weight !== null
											? ` × ${ formatProgressNumber( set.weight ) } kg`
											// Un peso que no es un numero se muestra tal como se escribio.
											: set.weightText && set.weightText !== "0" ? ` · ${ set.weightText }` : "" }
									</li>
								) ) }
							</ul>
						</li>
					) ) }
				</ol>
			</div>
		</div>
	);
}
