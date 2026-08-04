import { Card } from "@heroui/react";

import { SkeletonBlock } from "@/components/common/skeletons/skeleton-block";

type TableSkeletonProps = {
	columns?: number;
	rows?: number;
};

export function TableSkeleton( { columns = 4, rows = 6 }: TableSkeletonProps ) {
	return (
		<Card aria-busy={ true } className={ "border border-border bg-surface" } variant={ "default" }>
			<Card.Content className={ "space-y-4 p-4" }>
				<div className={ "flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between" }>
					<SkeletonBlock className={ "h-5 w-40 rounded-md" } />
					<SkeletonBlock className={ "h-9 w-full rounded-md sm:w-28" } />
				</div>
				<div className={ "hidden space-y-2 md:block" }>
					<div className={ "grid gap-3" } style={ { gridTemplateColumns: `repeat(${ columns }, minmax(0, 1fr))` } }>
						{ Array.from( { length: columns } ).map( ( _, index ) => <SkeletonBlock key={ `heading-${ index }` } className={ "h-4 rounded-md" } /> ) }
					</div>
					{ Array.from( { length: rows } ).map( ( _, rowIndex ) => (
						<div className={ "grid items-center gap-3" } key={ `row-${ rowIndex }` } style={ { gridTemplateColumns: `repeat(${ columns }, minmax(0, 1fr))` } }>
							{ Array.from( { length: columns } ).map( ( _, columnIndex ) => <SkeletonBlock key={ `${ rowIndex }-${ columnIndex }` } className={ "h-10 rounded-md" } /> ) }
						</div>
					) ) }
				</div>
				<div className={ "space-y-3 md:hidden" }>
					{ Array.from( { length: Math.min( rows, 4 ) } ).map( ( _, index ) => (
						<div className={ "space-y-3 rounded-xl border border-border p-3" } key={ `mobile-${ index }` }>
							<SkeletonBlock className={ "h-5 w-2/3 rounded-md" } />
							<SkeletonBlock className={ "h-4 w-full rounded-md" } />
							<SkeletonBlock className={ "h-9 w-full rounded-md" } />
						</div>
					) ) }
				</div>
			</Card.Content>
		</Card>
	);
}
