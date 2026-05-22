// D:\Cursos\Mis Proyectos\template-dashboard\src\components\common\GenericSheet.tsx

import React from 'react';
import { Button, EmptyState, Label, ListBox, ListLayout, SearchField, Virtualizer } from '@heroui/react';
import { Sheet } from "@heroui-pro/react";
import Magnifier from "@gravity-ui/icons/Magnifier";
import { ArrowRightArrowLeft } from "@gravity-ui/icons";

export interface SheetItem {
	id: number | string;
	name: string;
}

interface GenericSheetProps<T extends SheetItem> {
	items: T[];
	title: string;
	triggerLabel?: string;
	searchPlaceholder?: string;
	emptyStateMessage?: string;
	searchAriaLabel?: string;
	listBoxAriaLabel?: string;
	onSelect: ( item: T ) => void;
	snapPoints?: ( number | string )[];
	searchField?: boolean;
	triggerIcon?: React.ReactNode;
	placement: "top" | "right" | "bottom" | "left";
}

const defaultSnapPoints = [ "355px", 1 ];

export function GenericSheet<T extends SheetItem>( {
													   items,
													   title,
													   triggerLabel = "Cambiar",
													   searchPlaceholder = "Buscar...",
													   emptyStateMessage = "No se encontraron resultados.",
													   searchAriaLabel = "Search",
													   listBoxAriaLabel = "Items",
													   onSelect,
													   snapPoints = defaultSnapPoints,
													   searchField = true,
													   triggerIcon = <ArrowRightArrowLeft className={ "size-3.5" }/>,
													   placement = "bottom"
												   }: GenericSheetProps<T> ) {
	const [ snap, setSnap ] = React.useState<string | number | null>( snapPoints[ 0 ] );
	const [ isOpen, setIsOpen ] = React.useState( false );
	const [ search, setSearch ] = React.useState( "" );

	const filtered = React.useMemo( () => {
		if (!search || !searchField) return items;
		const q = search.toLowerCase();
		return items.filter( ( item ) => item.name.toLowerCase().includes( q ) );
	}, [ search, items, searchField ] );

	const handleSelect = ( key: React.Key ) => {
		const item = items.find( ( i ) => i.id === Number( key ) || i.id === key );
		if (item) {
			onSelect( item );
			setIsOpen( false );
			setSearch( "" );
		}
	};

	return (
		<Sheet
			activeSnapPoint={ snap }
			fadeFromIndex={ 0 }
			isOpen={ isOpen }
			snapPoints={ snapPoints as unknown as ( number | string )[] }
			onActiveSnapPointChange={ setSnap }
			onOpenChange={ ( open ) => {
				setIsOpen( open );
				if (!open) setSearch( "" );
			} }
			placement={ placement }
			isDetached
		>
			<Sheet.Trigger>
				<Button variant={ "outline" } size={ "sm" } className={ "text-accent border-accent" }>
					{ triggerIcon }
					{ triggerLabel }
				</Button>
			</Sheet.Trigger>
			<Sheet.Backdrop variant={ "blur" }>
				<Sheet.Content className={ placement == "left" || placement == "right" ? "" : "mx-auto max-w-105" }>
					<Sheet.Dialog className={ placement === "left" || placement === "right" ? "h-full" : undefined }>
						{ placement === "bottom" && <Sheet.Handle/> }
						<Sheet.Header>
							<Sheet.Heading>{ title }</Sheet.Heading>
						</Sheet.Header>
						<Sheet.Body className={ "flex min-h-0 flex-col gap-0 overflow-hidden p-0" }>
							{ searchField && (
								<div className={ "px-4 pb-2 pt-1" }>
									<SearchField
										aria-label={ searchAriaLabel }
										value={ search }
										variant={ "secondary" }
										onChange={ setSearch }
									>
										<SearchField.Group>
											<SearchField.SearchIcon/>
											<SearchField.Input placeholder={ searchPlaceholder }/>
											<SearchField.ClearButton/>
										</SearchField.Group>
									</SearchField>
								</div>
							) }
							{ filtered.length === 0 ? (
								<EmptyState className={ "flex min-h-32 flex-1 flex-col items-center justify-center gap-2" }>
									<Magnifier className={ "text-muted size-5" }/>
									<p className={ "text-muted text-sm" }>{ emptyStateMessage }</p>
								</EmptyState>
							) : (
								<Virtualizer layout={ ListLayout } layoutOptions={ { padding: 12, rowHeight: 36 } }>
									<ListBox
										aria-label={ listBoxAriaLabel }
										className={ "min-h-0 flex-1 overflow-y-auto p-0" }
										items={ filtered }
										selectionMode={ "single" }
										onAction={ handleSelect }
									>
										{ ( item ) => (
											<ListBox.Item id={ item.id } textValue={ item.name }>
												<Label>{ item.name }</Label>
											</ListBox.Item>
										) }
									</ListBox>
								</Virtualizer>
							) }
						</Sheet.Body>
						{ placement === "top" && <Sheet.Handle/> }
					</Sheet.Dialog>
				</Sheet.Content>
			</Sheet.Backdrop>
		</Sheet>
	);
}