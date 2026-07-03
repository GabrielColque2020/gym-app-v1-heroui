"use client";

import { Calendar, Layers } from "@gravity-ui/icons";
import { Label, ListBox, Select } from "@heroui/react";
import { Segment } from "@heroui-pro/react";

type Option = {
	label: string;
	value: string;
};

type CoachCopyRoutineSheetSourceControlsProps = {
	handleSourceMonthChangeAction: ( value: string ) => void;
	handleSourceYearChangeAction: ( value: string ) => void;
	mode: "month" | "weeks";
	onModeChangeAction: ( mode: "month" | "weeks" ) => void;
	padMonthAction: ( month: string ) => string;
	sourceMonth: string;
	sourceYear: string;
	yearOptions: Option[];
	monthOptions: Option[];
};

export function CoachCopyRoutineSheetSourceControls( {
	handleSourceMonthChangeAction,
	handleSourceYearChangeAction,
	mode,
	onModeChangeAction,
	padMonthAction,
	sourceMonth,
	sourceYear,
	yearOptions,
	monthOptions,
}: CoachCopyRoutineSheetSourceControlsProps ) {
	return (
		<div className={ "grid gap-3 md:grid-cols-[240px_1fr] md:gap-4" }>
			<div className={ "grid w-full gap-1.5 sm:max-w-80" }>
				<Label className={ "text-xs font-semibold uppercase text-muted" }>Modo de copia</Label>
				<Segment
					aria-label={ "Modo de copia" }
					className={ "w-full" }
					selectedKey={ mode }
					size={ "sm" }
					onSelectionChange={ ( key ) => onModeChangeAction( String( key ) === "weeks" ? "weeks" : "month" ) }
				>
					<Segment.Item className={ "flex-1" } id={ "month" }>
						{ ( { isSelected } ) => (
							<span className={ `flex items-center justify-center gap-1.5 ${ isSelected ? "font-semibold text-accent" : "text-muted" }` }>
								<Calendar className={ "size-3.5" }/>
								Mes
							</span>
						) }
					</Segment.Item>
					<Segment.Item className={ "flex-1" } id={ "weeks" }>
						{ ( { isSelected } ) => (
							<span className={ `flex items-center justify-center gap-1.5 ${ isSelected ? "font-semibold text-accent" : "text-muted" }` }>
								<Layers className={ "size-3.5" }/>
								Semanas
							</span>
						) }
					</Segment.Item>
				</Segment>
			</div>

			<div className={ "grid grid-cols-2 gap-3" }>
				<Select value={ sourceYear } variant={ "secondary" } onChange={ ( key ) => handleSourceYearChangeAction( key as string ) }>
					<Label>Anio origen</Label>
					<Select.Trigger className={ "h-10 rounded-xl shadow-sm" }>
						<Select.Value/>
						<Select.Indicator/>
					</Select.Trigger>
					<Select.Popover>
						<ListBox>
							{ yearOptions.map( ( year ) => (
								<ListBox.Item key={ year.value } id={ year.value } textValue={ year.label }>
									{ year.label }
									<ListBox.ItemIndicator/>
								</ListBox.Item>
							) ) }
						</ListBox>
					</Select.Popover>
				</Select>

				<Select value={ padMonthAction( sourceMonth ) } variant={ "secondary" } onChange={ ( key ) => handleSourceMonthChangeAction( key as string ) }>
					<Label>Mes origen</Label>
					<Select.Trigger className={ "h-10 rounded-xl shadow-sm" }>
						<Select.Value/>
						<Select.Indicator/>
					</Select.Trigger>
					<Select.Popover>
						<ListBox>
							{ monthOptions.map( ( month ) => (
								<ListBox.Item key={ month.value } id={ month.value } textValue={ month.label }>
									{ month.label }
									<ListBox.ItemIndicator/>
								</ListBox.Item>
							) ) }
						</ListBox>
					</Select.Popover>
				</Select>
			</div>
		</div>
	);
}
