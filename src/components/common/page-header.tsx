import React from "react";
import { Separator, Typography } from "@heroui/react";

interface PageHeaderProps {
	title: string;
	description?: string;
	className?: string;
	showSeparator?: boolean;
}

export const PageHeader: React.FC<PageHeaderProps> = ( { title, description, className = "", showSeparator = false } ) => {
	return (
		<div className={ `w-full flex-col ${ className }` }>
			<Typography
				type={ "h3" }
				className={ "font-black" }
			>
				{ title }
			</Typography>
			{ description && (
				<Typography type={ "body-sm" } color={ "muted" } weight={ "medium" }>
					{ description }
				</Typography>
			) }

			{ showSeparator && <Separator className={ "w-full mt-4 mb-2" }/> }
		</div>
	);
};
