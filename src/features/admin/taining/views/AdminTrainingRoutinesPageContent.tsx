"use client";

import { AdminTrainingRoutineFilter, AdminTrainingRoutineHeader } from "../components/shared";
import { AdminTrainingRoutineCardDesktop } from "../components/desktop";

export default function AdminTrainingRoutinesPageContent() {


	return (
		<>
			<AdminTrainingRoutineHeader/>

			{ /*Filtro*/ }
			<AdminTrainingRoutineFilter/>

			<div className={ "hidden md:flex" }>
				<AdminTrainingRoutineCardDesktop/>
			</div>
			{ /*Tabla de rutinas*/ }
			{ /* Sección de Tabs de Semanas */ }

		</>
	)
}