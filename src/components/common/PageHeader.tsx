import React from "react";

interface PageHeaderProps {
	title: string;
	description?: string;
	className?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ( { title, description, className = "" } ) => {
	return (
		<div className={ `items-start w-full ${ className }` }>
			<h1 className={ "text-xl font-black sm:truncate sm:text-4xl sm:tracking-tight" }>
				{ title }
			</h1>
			{ description && (
				<p className={ "text-base sm:text-base mt-1 text-muted" }>
					{ description }
				</p>
			) }
		</div>
	);
};
