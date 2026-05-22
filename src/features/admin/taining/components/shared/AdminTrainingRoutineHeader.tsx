import { PageHeader } from "src/components/common/PageHeader";
import React from "react";

export function AdminTrainingRoutineHeader() {
	return (
		<PageHeader
			title={ "Rutina de Entrenamiento" }
			description={ "Organiza las rutinas semanales y los días de entrenamiento para tu alumno." }
			className={ "flex-1" } // Expande PageHeader
		/>
	)
}