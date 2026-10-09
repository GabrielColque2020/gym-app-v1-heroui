import type { ReactNode } from "react";

type ProfileCardHeaderProps = {
	description: string;
	icon: ReactNode;
	title: string;
};

export function ProfileCardHeader( { description, icon, title }: ProfileCardHeaderProps ) {
	return (
		<div className={ "flex items-start gap-3" }>
			<div className={ "flex size-9 shrink-0 items-center justify-center rounded-xl border border-border bg-background text-accent" }>
				{ icon }
			</div>
			<div className={ "space-y-1" }>
				<h2 className={ "text-base font-semibold text-foreground" }>{ title }</h2>
				<p className={ "text-sm text-muted" }>{ description }</p>
			</div>
		</div>
	);
}
