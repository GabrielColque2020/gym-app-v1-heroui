import { Description } from "@heroui/react";
import { Sheet } from "@heroui-pro/react";
import { PencilLine, Plus } from "lucide-react";

type StudentSheetHeaderProps = {
	description: string;
	isEditMode: boolean;
	title: string;
};

export function StudentSheetHeader( {
	description,
	isEditMode,
	title,
}: StudentSheetHeaderProps ) {
	return (
		<Sheet.Header className={ "border-default-100 relative border-b pb-4" }>
			<div className={ "flex gap-3 " }>
				<div className={ "flex size-10 shrink-0 items-center justify-center rounded-xl border border-accent-soft bg-accent-soft/60 text-accent" }>
					{ isEditMode ? <PencilLine className={ "size-5" }/> : <Plus className={ "size-5" }/> }
				</div>
				<div>
					<Sheet.Heading>{ title }</Sheet.Heading>
					<Description className={ "mt-1 text-sm" }>{ description }</Description>
				</div>
			</div>
		</Sheet.Header>
	);
}
