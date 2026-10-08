import type { ReactElement } from "react";

import { Document, Font, Page, StyleSheet, Text, View, } from "@react-pdf/renderer";

import { formatMealPlanDescriptionLines, formatMealTime } from "@/features/meal-plans/services/meal-plan-formatters";
import type { MealPlan } from "@/features/meal-plans/types/meal-plans-types";

type MealPlansPdfDocumentProps = {
	mealPlans: MealPlan[];
	studentName: string;
	studentObjective?: string | null;
	studentObservations?: string | null;
};

// Sin esto, el PDF corta las palabras largas con un guion donde le parece.
Font.registerHyphenationCallback( ( word ) => [ word ] );

const styles = StyleSheet.create( {
	page: {
		backgroundColor: "#ffffff",
		color: "#0f172a",
		fontFamily: "Helvetica",
		fontSize: 9,
		paddingBottom: 24,
		paddingHorizontal: 24,
		paddingTop: 24,
	},
	header: {
		borderBottom: "2 solid #0c66e4",
		marginBottom: 12,
		paddingBottom: 8,
	},
	title: {
		color: "#0a3499",
		fontFamily: "Helvetica-Bold",
		fontSize: 16,
		textTransform: "uppercase",
	},
	line: {
		fontSize: 9,
		marginTop: 3,
	},
	muted: {
		color: "#475569",
	},
	chipRow: {
		flexDirection: "row",
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
	grid: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 10,
	},
	card: {
		border: "1 solid #bfdbfe",
		borderRadius: 8,
		marginBottom: 10,
		paddingBottom: 10,
		width: "48%",
	},
	cardHeader: {
		backgroundColor: "#eff6ff",
		borderBottom: "1 solid #bfdbfe",
		flexDirection: "row",
		paddingHorizontal: 10,
		paddingVertical: 8,
	},
	indexBubble: {
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
	cardTitle: {
		color: "#0a3499",
		fontFamily: "Helvetica-Bold",
		fontSize: 10,
		textTransform: "uppercase",
	},
	cardSubtitle: {
		color: "#64748b",
		fontSize: 8,
		marginTop: 2,
	},
	cardBody: {
		paddingHorizontal: 10,
		paddingTop: 8,
	},
	bulletRow: {
		flexDirection: "row",
		marginBottom: 6,
	},
	bullet: {
		backgroundColor: "#0c66e4",
		borderRadius: 999,
		height: 5,
		marginRight: 6,
		marginTop: 4,
		width: 5,
	},
	bulletText: {
		flex: 1,
		fontSize: 8.5,
		lineHeight: 1.45,
	},
	// La nota no usa el estilo de las viñetas: su `flex: 1` le hacia calcular
	// mal el alto y el ultimo renglon quedaba pegado al borde de la tarjeta.
	note: {
		color: "#475569",
		fontSize: 8.5,
		lineHeight: 1.45,
		marginTop: 2,
	},
	emptyMessage: {
		border: "1 solid #bfdbfe",
		borderRadius: 8,
		color: "#475569",
		fontSize: 9,
		paddingHorizontal: 10,
		paddingVertical: 14,
		textAlign: "center",
	},
} );

function getPrintableDescription( mealPlan: MealPlan ) {
	const lines = formatMealPlanDescriptionLines( mealPlan.description );

	return lines.length > 0 ? lines : [ "Sin detalles cargados." ];
}

export function MealPlansPdfDocument( {
	mealPlans,
	studentName,
	studentObjective,
	studentObservations,
}: MealPlansPdfDocumentProps ): ReactElement {
	const objective = studentObjective?.trim() || null;
	const observations = studentObservations?.trim() || null;

	return (
		<Document
			author={ "Gym App" }
			creator={ "Gym App" }
			producer={ "Gym App" }
			subject={ `Plan alimenticio de ${ studentName }` }
			title={ `Plan alimenticio - ${ studentName }` }
		>
			<Page size={ "A4" } style={ styles.page }>
				<View style={ styles.header }>
					<Text style={ styles.title }>Plan alimenticio</Text>
					<Text style={ styles.line }>{ `Estudiante: ${ studentName }` }</Text>
					{ objective ? <Text style={ [ styles.line, styles.muted ] }>{ `Objetivo: ${ objective }` }</Text> : null }
					{ observations ? <Text style={ [ styles.line, styles.muted ] }>{ `Observaciones: ${ observations }` }</Text> : null }
					{ /* Sin comidas no hay cantidad que contar: lo dice el aviso de abajo. */ }
					{ mealPlans.length > 0 ? (
						<View style={ styles.chipRow }>
							<Text style={ styles.chip }>{ mealPlans.length === 1 ? "1 comida" : `${ mealPlans.length } comidas` }</Text>
						</View>
					) : null }
				</View>

				{ mealPlans.length === 0 ? (
					<Text style={ styles.emptyMessage }>Todavía no hay comidas cargadas en este plan.</Text>
				) : null }

				<View style={ styles.grid }>
					{ mealPlans.map((mealPlan) => (
						<View key={ mealPlan.id } style={ styles.card } wrap={ false }>
							<View style={ styles.cardHeader }>
								<View>
									<Text style={ styles.cardTitle }>{ formatMealTime( mealPlan.title ) }</Text>
								</View>
							</View>

							<View style={ styles.cardBody }>
								{ getPrintableDescription( mealPlan ).map( ( line, lineIndex ) => (
									<View key={ `${ mealPlan.id }-${ lineIndex }` } style={ styles.bulletRow }>
										<Text style={ styles.bullet } />
										<Text style={ styles.bulletText }>{ line }</Text>
									</View>
								) ) }
								{ mealPlan.observations?.trim() ? (
									<Text style={ styles.note }>{ `Nota: ${ mealPlan.observations.trim() }` }</Text>
								) : null }
							</View>
						</View>
					) ) }
				</View>
			</Page>
		</Document>
	);
}
