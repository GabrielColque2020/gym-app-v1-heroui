"use client";

import { AdminTrainingRoutineFilter, AdminTrainingRoutineHeader } from "../components/shared";
import { AdminTrainingRoutineCardDesktop } from "../components/desktop";
import { AdminTrainingRoutineCardMobile } from "../components/mobile";

export default function AdminTrainingRoutinesPageContent() {


	return (
		<>
			<AdminTrainingRoutineHeader/>

			{ /*Filtro*/ }
			<AdminTrainingRoutineFilter/>

			<div className={ "hidden md:flex" }>
				<AdminTrainingRoutineCardDesktop/>
			</div>

			<div className={ "flex md:hidden" }>
				<AdminTrainingRoutineCardMobile/>
			</div>

		</>
	)
}