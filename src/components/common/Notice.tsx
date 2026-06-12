import React from "react";
import { Surface, Typography } from "@heroui/react";

type NoticeProps = {
	tone: "accent" | "success" | "warning";
	children: React.ReactNode;
};

export function Notice( { tone, children }: NoticeProps ) {
	const toneClass = {
		accent: "border-accent-soft bg-accent-soft/40",
		success: "border-success-soft bg-success-soft/50",
		warning: "border-warning-soft bg-warning-soft/60",
	}[ tone ];

	return (
		<Surface className={ `${ toneClass } rounded-xl border px-3 py-2.5` }>
			<Typography className={ "text-sm leading-5" }>{ children }</Typography>
		</Surface>
	);
}
