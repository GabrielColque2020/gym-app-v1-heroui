"use client";

import type { ReactNode } from "react";

import { Button, Pagination } from "@heroui/react";
import { useMemo } from "react";

export type PageItem = number | "ellipsis";

type UsePaginationParams<TItem> = {
	items: TItem[];
	itemsPerPage: number;
	page: number;
};

type ListPaginationProps = {
	currentPage: number;
	itemLabel?: string;
	mode?: "full" | "compact";
	onPageChangeAction: ( page: number ) => void;
	showingFrom: number;
	showingTo: number;
	size?: "sm" | "md" | "lg";
	summary?: ReactNode;
	totalItems: number;
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

export function usePagination<TItem>( { items, itemsPerPage, page }: UsePaginationParams<TItem> ) {
	return useMemo(
		() => {
			const totalItems = items.length;
			const totalPages = Math.max( 1, Math.ceil( totalItems / itemsPerPage ) );
			const currentPage = Math.min( page, totalPages );
			const pageStartIndex = ( currentPage - 1 ) * itemsPerPage;
			const pageEndIndex = pageStartIndex + itemsPerPage;

			return {
				currentPage,
				pageItems: getPageItems( currentPage, totalPages ),
				paginatedItems: items.slice( pageStartIndex, pageEndIndex ),
				showingFrom: totalItems === 0 ? 0 : pageStartIndex + 1,
				showingTo: Math.min( pageEndIndex, totalItems ),
				totalItems,
				totalPages,
			};
		},
		[ items, itemsPerPage, page ],
	);
}

export function ListPagination( {
	currentPage,
	itemLabel,
	mode = "full",
	onPageChangeAction,
	showingFrom,
	showingTo,
	size = "sm",
	summary,
	totalItems,
	totalPages,
}: ListPaginationProps ) {
	const pageItems = getPageItems( currentPage, totalPages );
	const isCompact = mode === "compact";
	const summaryContent = summary ?? (
		isCompact
			? `${ showingFrom }-${ showingTo } de ${ totalItems }`
			: `Mostrando ${ showingFrom }-${ showingTo } de ${ totalItems }${ itemLabel ? ` ${ itemLabel }` : "" }`
	);

	if (isCompact) {
		return (
			<div className={ "flex w-full items-center justify-between gap-3" }>
				<span className={ "min-w-0 text-sm text-muted" }>{ summaryContent }</span>
				<div className={ "flex shrink-0 items-center gap-1" }>
					<Button
						isIconOnly
						aria-label={ "Pagina anterior" }
						isDisabled={ currentPage === 1 }
						size={ size }
						variant={ "ghost" }
						onPress={ () => onPageChangeAction( Math.max( 1, currentPage - 1 ) ) }
					>
						<Pagination.PreviousIcon/>
					</Button>
					<Button
						isIconOnly
						aria-label={ "Pagina siguiente" }
						isDisabled={ currentPage === totalPages }
						size={ size }
						variant={ "ghost" }
						onPress={ () => onPageChangeAction( Math.min( totalPages, currentPage + 1 ) ) }
					>
						<Pagination.NextIcon/>
					</Button>
				</div>
			</div>
		);
	}

	return (
		<Pagination className={ "w-full" } size={ size }>
			<Pagination.Summary>{ summaryContent }</Pagination.Summary>
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
		</Pagination>
	);
}
