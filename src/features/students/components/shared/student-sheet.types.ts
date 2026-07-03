import type { StudentListItem } from "@/features/students/actions/get-students";

export type StudentFormSheetProps =
	| {
		hideTrigger?: boolean;
		isOpen?: boolean;
		mode: "create";
		onOpenChange?: ( isOpen: boolean ) => void;
		placement?: "bottom" | "right";
		student?: never;
		triggerClassName?: string;
		triggerVariant?: "button" | "icon";
	}
	| {
		hideTrigger?: boolean;
		isOpen?: boolean;
		mode: "edit";
		onOpenChange?: ( isOpen: boolean ) => void;
		placement?: "bottom" | "right";
		student: StudentListItem;
		triggerClassName?: string;
		triggerVariant?: "button" | "icon";
	};
