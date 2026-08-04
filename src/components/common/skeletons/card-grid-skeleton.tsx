import { Card } from "@heroui/react";

import { SkeletonBlock } from "@/components/common/skeletons/skeleton-block";

type CardGridSkeletonProps = {
	cards?: number;
};

export function CardGridSkeleton( { cards = 3 }: CardGridSkeletonProps ) {
	return (
		<div aria-busy={ true } className={ "grid gap-4 md:grid-cols-2 xl:grid-cols-3" }>
			{ Array.from( { length: cards } ).map( ( _, index ) => (
				<Card className={ "border border-border bg-surface" } key={ index } variant={ "default" }>
					<Card.Content className={ "space-y-4 p-4" }>
						<div className={ "flex items-center justify-between gap-3" }>
							<SkeletonBlock className={ "h-6 w-2/3 rounded-md" } />
							<SkeletonBlock className={ "h-6 w-16 rounded-full" } />
						</div>
						<SkeletonBlock className={ "h-4 w-full rounded-md" } />
						<SkeletonBlock className={ "h-4 w-5/6 rounded-md" } />
						<div className={ "grid grid-cols-2 gap-2" }>
							<SkeletonBlock className={ "h-12 rounded-md" } />
							<SkeletonBlock className={ "h-12 rounded-md" } />
						</div>
					</Card.Content>
				</Card>
			) ) }
		</div>
	);
}
