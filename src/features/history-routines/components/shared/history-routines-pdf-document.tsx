import type { ReactElement } from "react";

import {
	Document,
	Page,
	StyleSheet,
	Text,
	View,
} from "@react-pdf/renderer";

import { formatHistoryDate } from "@/features/history-routines/services/history-routines-form";
import type {
	HistoryRoutineMonthSummary,
	HistoryRoutineWeekGroup,
} from "@/features/history-routines/services/history-routines-view";

type HistoryRoutinesPdfDocumentProps = {
	monthLabel: string;
	objective?: string | null;
	studentName: string;
	summary: HistoryRoutineMonthSummary;
	weekGroups: HistoryRoutineWeekGroup[];
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
	subtitle: {
		fontFamily: "Helvetica-Bold",
		fontSize: 9,
		marginTop: 4,
	},
	meta: {
		color: "#475569",
		fontSize: 8,
		marginTop: 2,
	},
	summaryBar: {
		backgroundColor: "#eff6ff",
		border: "1 solid #bfdbfe",
		borderRadius: 4,
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 8,
		marginBottom: 10,
		paddingHorizontal: 8,
		paddingVertical: 6,
	},
	summaryItem: {
		color: "#0f172a",
		fontFamily: "Helvetica-Bold",
		fontSize: 7.5,
	},
	weekSection: {
		marginBottom: 10,
	},
	weekHeader: {
		backgroundColor: "#eff6ff",
		borderBottom: "1 solid #bfdbfe",
		color: "#0a3499",
		fontFamily: "Helvetica-Bold",
		fontSize: 9,
		marginBottom: 6,
		paddingHorizontal: 6,
		paddingVertical: 5,
		textTransform: "uppercase",
	},
	dayCard: {
		marginBottom: 6,
	},
	dayHeader: {
		backgroundColor: "#f8fafc",
		borderLeft: "3 solid #0c66e4",
		fontFamily: "Helvetica-Bold",
		fontSize: 8,
		marginBottom: 3,
		paddingHorizontal: 6,
		paddingVertical: 4,
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
		width: "40%",
	},
	colSet: {
		paddingHorizontal: 4,
		width: "8%",
	},
	colPlan: {
		paddingHorizontal: 4,
		width: "16%",
	},
	colReal: {
		paddingHorizontal: 4,
		width: "16%",
	},
	colWeight: {
		paddingHorizontal: 4,
		width: "10%",
	},
	colStatus: {
		paddingHorizontal: 4,
		width: "10%",
	},
	exerciseName: {
		fontFamily: "Helvetica-Bold",
	},
	statusDone: {
		color: "#047857",
		fontFamily: "Helvetica-Bold",
	},
	statusPending: {
		color: "#b45309",
		fontFamily: "Helvetica-Bold",
	},
	statusExtra: {
		color: "#0a3499",
		fontFamily: "Helvetica-Bold",
	},
} );

function getSummaryStatusLabel( status: HistoryRoutineMonthSummary["status"] ) {
	switch (status) {
		case "complete":
			return "Completo";
		case "partial":
			return "Parcial";
		default:
			return "Sin datos";
	}
}

function getSetStatusLabel( completed: boolean, planned: boolean ) {
	if (completed) return "Completado";
	if (planned) return "Pendiente";

	return "Extra";
}

function getSetStatusStyle( completed: boolean, planned: boolean ) {
	if (completed) return styles.statusDone;
	if (planned) return styles.statusPending;

	return styles.statusExtra;
}

export function HistoryRoutinesPdfDocument( {
	monthLabel,
	objective,
	studentName,
	summary,
	weekGroups,
}: HistoryRoutinesPdfDocumentProps ): ReactElement {
	const resolvedObjective = objective?.trim() || "Sin objetivo definido";

	return (
		<Document
			author={ "Gym App" }
			creator={ "Gym App" }
			producer={ "Gym App" }
			subject={ `Historial de rutinas ${ monthLabel }` }
			title={ `Historial de rutinas - ${ studentName } - ${ monthLabel }` }
		>
			<Page size={ "A4" } style={ styles.page }>
				<View style={ styles.header }>
					<Text style={ styles.title }>Reporte de historial de rutina</Text>
					<Text style={ styles.subtitle }>{ `Estudiante: ${ studentName }` }</Text>
					<Text style={ styles.meta }>{ `Periodo: ${ monthLabel } | Objetivo: ${ resolvedObjective }` }</Text>
				</View>

				<View style={ styles.summaryBar }>
					<Text style={ styles.summaryItem }>{ getSummaryStatusLabel( summary.status ) }</Text>
					<Text style={ styles.summaryItem }>{ `${ summary.weeks } semanas` }</Text>
					<Text style={ styles.summaryItem }>{ `${ summary.days } dias` }</Text>
					<Text style={ styles.summaryItem }>{ `${ summary.exercises } ejercicios` }</Text>
					<Text style={ styles.summaryItem }>{ `${ summary.sets } series` }</Text>
				</View>

				{ weekGroups.map( ( weekGroup ) => (
					<View key={ weekGroup.week } style={ styles.weekSection }>
						<Text style={ styles.weekHeader }>{ `Semana ${ weekGroup.week } (${ weekGroup.days.length } dias)` }</Text>

						{ weekGroup.days.map( ( day ) => (
							<View key={ day.id } style={ styles.dayCard } wrap={ false }>
								<Text style={ styles.dayHeader }>{ `Dia ${ day.dayNumber } - ${ formatHistoryDate( day.date ) }` }</Text>

								<View style={ styles.tableHeader }>
									<Text style={ styles.colExercise }>Ejercicio</Text>
									<Text style={ styles.colSet }>Serie</Text>
									<Text style={ styles.colPlan }>Plan</Text>
									<Text style={ styles.colReal }>Real</Text>
									<Text style={ styles.colWeight }>Peso</Text>
									<Text style={ styles.colStatus }>Estado</Text>
								</View>

								{ day.exercises.flatMap( ( exercise ) =>
									exercise.sets.map( ( set, setIndex ) => (
										<View
											key={ set.id }
											style={ [
												styles.tableRow,
												...(setIndex % 2 === 1 ? [ styles.tableRowAlt ] : []),
											] }
										>
											<Text style={ styles.colExercise }>
												{ setIndex === 0 ? <Text style={ styles.exerciseName }>{ exercise.name }</Text> : " " }
											</Text>
											<Text style={ styles.colSet }>{ String( set.setNumber ) }</Text>
											<Text style={ styles.colPlan }>{ `${ set.plannedReps } reps` }</Text>
											<Text style={ styles.colReal }>{ `${ set.repsCompleted ?? "-" } reps` }</Text>
											<Text style={ styles.colWeight }>{ `${ set.weightUsed ?? "-" } kg` }</Text>
											<Text style={ [ styles.colStatus, getSetStatusStyle( set.completed, set.planned ) ] }>
												{ getSetStatusLabel( set.completed, set.planned ) }
											</Text>
										</View>
									) ),
								) }
							</View>
						) ) }
					</View>
				) ) }
			</Page>
		</Document>
	);
}
