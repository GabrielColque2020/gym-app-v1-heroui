import { Label, ListBox, Select } from "@heroui/react";

interface SelectOption {
	value: string;
	label: string;
}

interface FilterSelectProps {
	label: string;
	placeholder: string;
	options: SelectOption[];
	defaultValue?: string;
	className?: string;
	name?: string;
	value?: string;
	onSelectionChange?: ( value: string ) => void;
}

export function FilterSelect( {
								  label,
								  placeholder,
								  options,
								  defaultValue = "",
								  className = "w-full",
								  name,
								  value,
								  onSelectionChange,
							  }: FilterSelectProps ) {
	const selectValueProps = value !== undefined
		? { value }
		: { defaultValue };

	return (
		<Select
			className={ className }
			placeholder={ placeholder }
			name={ name }
			{ ...selectValueProps }
			onChange={ ( key ) => onSelectionChange?.( key as string ) }
			variant={ "secondary" }
		>
			<Label>{ label }</Label>
			<Select.Trigger>
				<Select.Value/>
				<Select.Indicator/>
			</Select.Trigger>
			<Select.Popover>
				<ListBox>
					<ListBox.Item id={ "" } textValue={ placeholder }>
						{ placeholder }
						<ListBox.ItemIndicator/>
					</ListBox.Item>
					{ options.map( ( option ) => (
						<ListBox.Item
							key={ option.value }
							id={ option.value }
							textValue={ option.label }
						>
							{ option.label }
							<ListBox.ItemIndicator/>
						</ListBox.Item>
					) ) }
				</ListBox>
			</Select.Popover>
		</Select>
	);
}
