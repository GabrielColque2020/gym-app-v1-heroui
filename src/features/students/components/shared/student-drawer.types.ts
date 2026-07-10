import type { StudentListItem } from "@/features/students/actions/get-students";

export type StudentFormDrawerProps =
	| {
		hideTrigger?: boolean;
		isOpen?: boolean;
		mode: "create";
		onOpenChangeAction?: ( isOpen: boolean ) => void;
		placement?: "bottom" | "right";
		student?: never;
		triggerClassName?: string;
		triggerVariant?: "button" | "icon";
	}
	| {
		hideTrigger?: boolean;
		isOpen?: boolean;
		mode: "edit";
		onOpenChangeAction?: ( isOpen: boolean ) => void;
		placement?: "bottom" | "right";
		student: StudentListItem;
		triggerClassName?: string;
		triggerVariant?: "button" | "icon";
	};
