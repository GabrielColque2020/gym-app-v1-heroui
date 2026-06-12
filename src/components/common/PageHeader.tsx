import React from "react";
import { Typography } from "@heroui/react";

interface PageHeaderProps {
	title: string;
	description?: string;
	className?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ( { title, description, className = "" } ) => {
	return (
		<div className={ `${ className }` }>
			<Typography
				type={ "h3" }
				className={ "font-black" }
			>
				{ title }
			</Typography>
			{ description && (
				<Typography className={ "mt-2" } type={ "body-sm" } color={ "muted" } weight={ "medium" }>
					{ description }
				</Typography>
			) }
		</div>
	);
};
