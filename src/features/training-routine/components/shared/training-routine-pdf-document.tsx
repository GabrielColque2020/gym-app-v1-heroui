import type { ReactElement } from "react";

import {
	Document,
	Page,
	StyleSheet,
	Text,
	View,
} from "@react-pdf/renderer";

import { getTrainingRoutineDayTitle } from "@/features/training-routine/services/training-routine-day-formatters";
import type { TrainingRoutineWeek } from "@/features/training-routine/services/training-routines-by-student";

type TrainingRoutinePdfDocumentProps = {
	month: number;
	routineObjective: string | null;
	routineWeeks: TrainingRoutineWeek[];
	studentName: string;
	year: number;
};

type PrintableWeekCell = {
	notes: string;
	reps: string;
	sets: string;
};

type PrintableWeekRow = {
	cells: Array<PrintableWeekCell | null>;
	exerciseName: string;
};

const styles = StyleSheet.create( {
	page: {
		backgroundColor: "#ffffff",
		color: "#0f172a",
		fontFamily: "Helvetica",
		fontSize: 8,
		paddingBottom: 24,
		paddingHorizontal: 24,
		paddingTop: 24,
	},
	header: {
		borderBottom: "2 solid #0c66e4",
		marginBottom: 10,
		paddingBottom: 8,
	},
	title: {
		color: "#0a3499",
		fontFamily: "Helvetica-Bold",
		fontSize: 15,
		textTransform: "uppercase",
	},
	line: {
		fontSize: 9,
		marginTop: 3,
	},
	muted: {
		color: "#475569",
	},
	chips: {
		flexDirection: "row",
		gap: 8,
		marginTop: 8,
	},
	chip: {
		backgroundColor: "#eff6ff",
		border: "1 solid #bfdbfe",
		borderRadius: 12,
		color: "#0a3499",
		fontFamily: "Helvetica-Bold",
		fontSize: 8,
		paddingHorizontal: 8,
		paddingVertical: 4,
	},
	daySection: {
		border: "1 solid #bfdbfe",
		borderRadius: 8,
		marginBottom: 10,
		overflow: "hidden",
	},
	dayHeader: {
		alignItems: "center",
		backgroundColor: "#eff6ff",
		borderBottom: "1 solid #bfdbfe",
		flexDirection: "row",
		justifyContent: "space-between",
		paddingHorizontal: 10,
		paddingVertical: 8,
	},
	dayInfo: {
		flexDirection: "row",
	},
	dayBubble: {
		alignItems: "center",
		backgroundColor: "#0c66e4",
		borderRadius: 999,
		color: "#ffffff",
		display: "flex",
		fontFamily: "Helvetica-Bold",
		fontSize: 9,
		height: 20,
		justifyContent: "center",
		marginRight: 8,
		textAlign: "center",
		width: 20,
	},
	dayTitle: {
		color: "#0a3499",
		fontFamily: "Helvetica-Bold",
		fontSize: 10,
		textTransform: "uppercase",
	},
	daySubtitle: {
		color: "#64748b",
		fontSize: 8,
		marginTop: 2,
	},
	tableHeader: {
		backgroundColor: "#0c66e4",
		color: "#ffffff",
		flexDirection: "row",
		fontFamily: "Helvetica-Bold",
		fontSize: 6.5,
		paddingVertical: 4,
	},
	tableRow: {
		borderBottom: "1 solid #dbeafe",
		flexDirection: "row",
		fontSize: 6.5,
		paddingVertical: 4,
	},
	tableRowAlt: {
		backgroundColor: "#f8fbff",
	},
	colExercise: {
		paddingHorizontal: 4,
		width: "36%",
	},
	colWeek: {
		paddingHorizontal: 4,
		width: "16%",
	},
	exerciseName: {
		fontFamily: "Helvetica-Bold",
	},
	weekValue: {
		color: "#0a3499",
		fontFamily: "Helvetica-Bold",
	},
	notes: {
		color: "#475569",
		fontSize: 6,
		marginTop: 2,
	},
} );

function formatNotes( observation: string | null | undefined, tips: string | null | undefined ) {
	const parts = [
		observation?.trim() ? `Obs: ${ observation.trim() }` : null,
		tips?.trim() ? `Tips: ${ tips.trim() }` : null,
	].filter( Boolean );

	return parts.length > 0 ? parts.join( " | " ) : "Sin notas";
}

function getDayRows( dayNumber: number, routineWeeks: TrainingRoutineWeek[] ): PrintableWeekRow[] {
	const referenceDay = routineWeeks[ 0 ]?.routineDays.find( ( day ) => day.dayNumber === dayNumber );

	if (!referenceDay) return [];

	return referenceDay.routines.map( ( baseExercise, index ) => ( {
		cells: routineWeeks.map( ( routineWeek ) => {
			const weekDay = routineWeek.routineDays.find( ( day ) => day.dayNumber === dayNumber );
			const exercise = weekDay?.routines.find( ( item ) => item.exerciseId === baseExercise.exerciseId )
				?? weekDay?.routines[ index ]
				?? null;

			if (!exercise) return null;

			return {
				notes: formatNotes( exercise.observation, null ),
				reps: exercise.reps,
				sets: exercise.sets,
			};
		} ),
		exerciseName: baseExercise.exercise?.name ?? "Ejercicio sin nombre",
	} ) );
}

export function TrainingRoutinePdfDocument( {
	month,
	routineObjective,
	routineWeeks,
	studentName,
	year,
}: TrainingRoutinePdfDocumentProps ): ReactElement {
	const referenceDays = routineWeeks[ 0 ]?.routineDays ?? [];
	const objective = routineObjective?.trim() || "Sin objetivo definido";

	return (
		<Document
			author={ "Gym App" }
			creator={ "Gym App" }
			producer={ "Gym App" }
			subject={ `Rutina ${ month }/${ year } de ${ studentName }` }
			title={ `Rutina - ${ studentName } - ${ month }/${ year }` }
		>
			<Page size={ "A4" } style={ styles.page }>
				<View style={ styles.header }>
					<Text style={ styles.title }>Planificacion de rutina</Text>
					<Text style={ styles.line }>{ `Estudiante: ${ studentName }` }</Text>
					<Text style={ [ styles.line, styles.muted ] }>{ `Objetivo del mes: ${ objective }` }</Text>
					<Text style={ [ styles.line, styles.muted ] }>Resumen por dia con semanas, ejercicios, series, repeticiones y observaciones.</Text>
					<View style={ styles.chips }>
						<Text style={ styles.chip }>{ `Mes ${ month } / ${ year }` }</Text>
						<Text style={ styles.chip }>{ `${ routineWeeks.length } semanas` }</Text>
					</View>
				</View>

				{ referenceDays.map( ( day ) => {
					const rows = getDayRows( day.dayNumber, routineWeeks );

					return (
						<View key={ day.id } style={ styles.daySection } wrap={ false }>
							<View style={ styles.dayHeader }>
								<View style={ styles.dayInfo }>
									<Text style={ styles.dayBubble }>{ String( day.dayNumber ) }</Text>
									<View>
										<Text style={ styles.dayTitle }>{ `Dia ${ day.dayNumber }` }</Text>
										<Text style={ styles.daySubtitle }>{ getTrainingRoutineDayTitle( day ) }</Text>
									</View>
								</View>
								<Text style={ styles.daySubtitle }>{ `${ day.routines.length } ejercicios` }</Text>
							</View>

							<View style={ styles.tableHeader }>
								<Text style={ styles.colExercise }>Ejercicio</Text>
								{ routineWeeks.map( ( week ) => (
									<Text key={ week.id } style={ styles.colWeek }>{ `Sem ${ week.week }` }</Text>
								) ) }
							</View>

							{ rows.length === 0 ? (
								<View style={ styles.tableRow }>
									<Text style={ styles.colExercise }>No hay ejercicios cargados para este dia.</Text>
								</View>
							) : (
								rows.map( ( row, rowIndex ) => (
									<View key={ `${ day.id }-${ row.exerciseName }` } style={ [ styles.tableRow, ...(rowIndex % 2 === 1 ? [ styles.tableRowAlt ] : []) ] }>
										<Text style={ styles.colExercise }>
											<Text style={ styles.exerciseName }>{ row.exerciseName }</Text>
										</Text>
										{ row.cells.map( ( cell, index ) => (
											<View key={ `${ row.exerciseName }-${ routineWeeks[ index ]?.id ?? index }` } style={ styles.colWeek }>
												{ cell ? (
													<>
														<Text style={ styles.weekValue }>{ `${ cell.sets } x ${ cell.reps }` }</Text>
														<Text style={ styles.notes }>{ cell.notes }</Text>
													</>
												) : (
													<Text style={ styles.notes }>--</Text>
												) }
											</View>
										) ) }
									</View>
								) )
							) }
						</View>
					);
				} ) }
			</Page>
		</Document>
	);
}
