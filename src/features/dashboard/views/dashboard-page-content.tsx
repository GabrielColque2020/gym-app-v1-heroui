"use client";

import { DashboardToolbar, EmployeesTable, KpiRow, SalesPerformanceCard, TrafficSourceCard } from "../components";

export function DashboardPageContent() {
	return (
		<div className={ "mx-auto flex max-w-7xl flex-col gap-4 px-5 pb-10 pt-4" }>
			<DashboardToolbar/>
			<KpiRow/>
			<div className={ "grid grid-cols-1 gap-3 lg:grid-cols-2" }>
				<SalesPerformanceCard/>
				<TrafficSourceCard/>
			</div>
			<EmployeesTable/>
		</div>
	);
}
