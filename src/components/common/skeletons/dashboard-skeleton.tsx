import { Card } from "@heroui/react";

import { SkeletonBlock } from "@/components/common/skeletons/skeleton-block";
import { TableSkeleton } from "@/components/common/skeletons/table-skeleton";

type DashboardSkeletonProps = {
	variant?: "admin" | "coach" | "student";
	title?: string;
};

function DashboardStatSkeleton() {
	return (
		<Card className={ "border border-border" } variant={ "default" }>
			<Card.Content className={ "space-y-3 p-4" }>
				<SkeletonBlock className={ "h-4 w-28 rounded-md" } />
				<SkeletonBlock className={ "h-9 w-20 rounded-md" } />
				<SkeletonBlock className={ "h-3 w-full max-w-48 rounded-md" } />
			</Card.Content>
		</Card>
	);
}

function DashboardPanelSkeleton() {
	return (
		<Card className={ "border border-border py-2" } variant={ "default" }>
			<Card.Content className={ "space-y-3 p-4" }>
				<SkeletonBlock className={ "h-5 w-40 rounded-md" } />
				<SkeletonBlock className={ "h-4 w-full max-w-96 rounded-md" } />
				<div className={ "grid gap-2 sm:grid-cols-3" }>
					<SkeletonBlock className={ "h-12 rounded-md" } />
					<SkeletonBlock className={ "h-12 rounded-md" } />
					<SkeletonBlock className={ "h-12 rounded-md" } />
				</div>
			</Card.Content>
		</Card>
	);
}

export function DashboardSkeleton( { title = "Cargando dashboard", variant = "admin" }: DashboardSkeletonProps ) {
	return (
		<div aria-busy={ true } aria-label={ title } className={ "flex flex-col gap-4" }>
			<Card className={ "border border-border py-2" } variant={ "default" }>
				<Card.Content className={ "flex flex-col gap-3 p-3 md:flex-row md:items-end md:justify-between" }>
					<div className={ "flex w-full flex-col gap-2" }>
						<SkeletonBlock className={ "h-7 w-48 rounded-md" } />
						<SkeletonBlock className={ "h-4 w-full max-w-96 rounded-md" } />
					</div>
					<SkeletonBlock className={ "h-10 w-full rounded-md md:w-28" } />
				</Card.Content>
			</Card>

			<div className={ "grid gap-3 md:grid-cols-2 xl:grid-cols-4" }>
				<DashboardStatSkeleton />
				<DashboardStatSkeleton />
				<DashboardStatSkeleton />
				<DashboardStatSkeleton />
			</div>

			{ variant === "coach" ? <>
				<DashboardPanelSkeleton />
				<TableSkeleton columns={ 5 } rows={ 5 } />
			</> : variant === "student" ? <>
				<DashboardPanelSkeleton />
				<DashboardPanelSkeleton />
			</> : <Card className={ "border border-border py-2" } variant={ "default" }>
				<Card.Content className={ "flex flex-col gap-4 p-3 md:flex-row md:items-center md:justify-between" }>
					<div className={ "flex w-full flex-col gap-2" }>
						<SkeletonBlock className={ "h-5 w-32 rounded-md" } />
						<SkeletonBlock className={ "h-4 w-full max-w-80 rounded-md" } />
					</div>
					<div className={ "flex w-full flex-col gap-2 sm:flex-row md:w-auto" }>
						<SkeletonBlock className={ "h-10 w-full rounded-md sm:w-36" } />
						<SkeletonBlock className={ "h-10 w-full rounded-md sm:w-48" } />
						<SkeletonBlock className={ "h-10 w-full rounded-md sm:w-32" } />
					</div>
				</Card.Content>
			</Card> }
		</div>
	);
}
