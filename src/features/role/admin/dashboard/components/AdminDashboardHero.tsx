import { ArrowsRotateLeft } from "@gravity-ui/icons";
import { Button } from "@heroui/react";

import { PageHeader } from "@/components/common";

type AdminDashboardHeroProps = {
	currentPeriodLabel: string;
	isRefreshing: boolean;
	onRefresh: () => void;
};

export function AdminDashboardHero( {
	currentPeriodLabel,
	isRefreshing,
	onRefresh,
}: AdminDashboardHeroProps ) {
	return (
		<div className={ "flex flex-col gap-3 rounded-xl border border-border bg-surface px-5 py-4 sm:px-6 lg:flex-row lg:items-start lg:justify-between" }>
			<PageHeader
				description={ `Vista operativa para revisar pendientes, entrar rapido a cada estudiante y corregir el trabajo de ${ currentPeriodLabel }.` }
				title={ "Dashboard admin" }
			/>
			<div className={ "flex w-full flex-col gap-2 sm:w-auto sm:flex-row" }>
				<Button
					className={ "w-full sm:w-auto" }
					isDisabled={ isRefreshing }
					variant={ "secondary" }
					onPress={ onRefresh }
				>
					<ArrowsRotateLeft className={ isRefreshing ? "size-4 animate-spin" : "size-4" }/>
					{ isRefreshing ? "Actualizando..." : "Actualizar" }
				</Button>
			</div>
		</div>
	);
}
