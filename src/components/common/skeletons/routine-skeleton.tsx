import { Card } from "@heroui/react";

import { SkeletonBlock } from "@/components/common/skeletons/skeleton-block";

export function RoutineSkeleton() {
	return (
		<div aria-busy={ true } className={ "flex flex-col gap-4" }>
			<Card className={ "border border-border bg-surface" } variant={ "default" }>
				<Card.Content className={ "space-y-4 p-4" }>
					<div className={ "flex flex-col gap-3 md:flex-row md:items-center md:justify-between" }>
						<div className={ "space-y-2" }>
							<SkeletonBlock className={ "h-7 w-56 rounded-md" } />
							<SkeletonBlock className={ "h-4 w-72 max-w-full rounded-md" } />
						</div>
						<SkeletonBlock className={ "h-10 w-full rounded-md md:w-32" } />
					</div>
					<div className={ "grid gap-2 sm:grid-cols-3" }>
						<SkeletonBlock className={ "h-10 rounded-md" } />
						<SkeletonBlock className={ "h-10 rounded-md" } />
						<SkeletonBlock className={ "h-10 rounded-md" } />
					</div>
				</Card.Content>
			</Card>
			<Card className={ "border border-border bg-surface" } variant={ "default" }>
				<Card.Content className={ "space-y-3 p-4" }>
					{ Array.from( { length: 5 } ).map( ( _, index ) => (
						<div className={ "flex items-center gap-3 rounded-xl border border-border p-3" } key={ index }>
							<SkeletonBlock className={ "size-12 shrink-0 rounded-lg" } />
							<div className={ "min-w-0 flex-1 space-y-2" }>
								<SkeletonBlock className={ "h-5 w-2/3 rounded-md" } />
								<SkeletonBlock className={ "h-4 w-full rounded-md" } />
							</div>
							<SkeletonBlock className={ "h-9 w-20 rounded-md" } />
						</div>
					) ) }
				</Card.Content>
			</Card>
		</div>
	);
}
