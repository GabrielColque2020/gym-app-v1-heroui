"use client";

import type { ReactNode } from "react";
import { useMemo } from "react";

import { Pagination } from "@heroui/react";
import { useResponsiveDrawerPlacement } from "@/features/shared/hooks/use-responsive-drawer-placement";

const MOBILE_ITEMS_PER_PAGE = 4;

export type PageItem = number | "ellipsis";

type UsePaginationParams<TItem> = {
	items: TItem[];
	itemsPerPage: number;
	page: number;
};

type ListPaginationProps = {
	currentPage: number;
	itemLabel?: string;
	onPageChangeAction: ( page: number ) => void;
	showingFrom: number;
	showingTo: number;
	size?: "sm" | "md" | "lg";
	summary?: ReactNode;
	totalItems: number;
	totalPages: number;
};

type PaginationControlsProps = {
	currentPage: number;
	onPageChangeAction: ( page: number ) => void;
	pageItems: PageItem[];
	totalPages: number;
};

function getPageItems( currentPage: number, totalPages: number ): PageItem[] {
	if (totalPages <= 7) {
		return Array.from( { length: totalPages }, ( _, index ) => index + 1 );
	}

	const pages: PageItem[] = [ 1 ];

	if (currentPage > 3) {
		pages.push( "ellipsis" );
	}

	const startPage = Math.max( 2, currentPage - 1 );
	const endPage = Math.min( totalPages - 1, currentPage + 1 );

	for (let pageNumber = startPage; pageNumber <= endPage; pageNumber += 1) {
		pages.push( pageNumber );
	}

	if (currentPage < totalPages - 2) {
		pages.push( "ellipsis" );
	}

	pages.push( totalPages );

	return pages;
}

function PaginationControls( {
								 currentPage,
								 onPageChangeAction,
								 pageItems,
								 totalPages,
							 }: PaginationControlsProps ) {
	return (
		<Pagination.Content>
			<Pagination.Item>
				<Pagination.Previous
					isDisabled={ currentPage === 1 }
					onPress={ () => onPageChangeAction( Math.max( 1, currentPage - 1 ) ) }
				>
					<Pagination.PreviousIcon/>
					<span>Anterior</span>
				</Pagination.Previous>
			</Pagination.Item>
			{ pageItems.map( ( pageItem, index ) =>
				pageItem === "ellipsis" ? (
					<Pagination.Item key={ `ellipsis-${ index }` }>
						<Pagination.Ellipsis/>
					</Pagination.Item>
				) : (
					<Pagination.Item key={ pageItem }>
						<Pagination.Link
							isActive={ pageItem === currentPage }
							onPress={ () => onPageChangeAction( pageItem ) }
						>
							{ pageItem }
						</Pagination.Link>
					</Pagination.Item>
				)
			) }
			<Pagination.Item>
				<Pagination.Next
					isDisabled={ currentPage === totalPages }
					onPress={ () => onPageChangeAction( Math.min( totalPages, currentPage + 1 ) ) }
				>
					<span>Siguiente</span>
					<Pagination.NextIcon/>
				</Pagination.Next>
			</Pagination.Item>
		</Pagination.Content>
	);
}

export function usePagination<TItem>( { items, itemsPerPage, page }: UsePaginationParams<TItem> ) {
	const placement = useResponsiveDrawerPlacement();
	const effectiveItemsPerPage = placement === "bottom"
		? Math.min( itemsPerPage, MOBILE_ITEMS_PER_PAGE )
		: itemsPerPage;

	return useMemo(
		() => {
			const totalItems = items.length;
			const totalPages = Math.max( 1, Math.ceil( totalItems / effectiveItemsPerPage ) );
			const currentPage = Math.min( page, totalPages );
			const pageStartIndex = ( currentPage - 1 ) * effectiveItemsPerPage;
			const pageEndIndex = pageStartIndex + effectiveItemsPerPage;

			return {
				currentPage,
				itemsPerPage: effectiveItemsPerPage,
				pageItems: getPageItems( currentPage, totalPages ),
				paginatedItems: items.slice( pageStartIndex, pageEndIndex ),
				showingFrom: totalItems === 0 ? 0 : pageStartIndex + 1,
				showingTo: Math.min( pageEndIndex, totalItems ),
				totalItems,
				totalPages,
			};
		},
		[ effectiveItemsPerPage, items, page ],
	);
}

export function ListPagination( {
									currentPage,
									itemLabel,
									onPageChangeAction,
									showingFrom,
									showingTo,
									size = "sm",
									summary,
									totalItems,
									totalPages,
								}: ListPaginationProps ) {
	const pageItems = useMemo( () => getPageItems( currentPage, totalPages ), [ currentPage, totalPages ] );
	const placement = useResponsiveDrawerPlacement();
	const isCompact = placement === "bottom";
	const summaryContent = summary ?? ( `Mostrando ${ showingFrom }-${ showingTo } de ${ totalItems }${ itemLabel ? ` ${ itemLabel }` : "" }` );

	if (isCompact) {
		return (
			<div className={ "flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-between" }>
				<span className={ "block w-full text-center text-sm text-muted sm:w-auto sm:text-left" }>{ summaryContent }</span>
				<Pagination className={ "mx-auto w-fit sm:mx-0" } size={ size }>
					<PaginationControls
						currentPage={ currentPage }
						onPageChangeAction={ onPageChangeAction }
						pageItems={ pageItems }
						totalPages={ totalPages }
					/>
				</Pagination>
			</div>
		);
	}

	return (
		<Pagination className={ "w-full" } size={ size }>
			<Pagination.Summary>{ summaryContent }</Pagination.Summary>
			<PaginationControls
				currentPage={ currentPage }
				onPageChangeAction={ onPageChangeAction }
				pageItems={ pageItems }
				totalPages={ totalPages }
			/>
		</Pagination>
	);
}
