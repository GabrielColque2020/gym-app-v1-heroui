import React from 'react';
import { Button, Spinner } from '@heroui/react';
import { FloppyDisk } from '@gravity-ui/icons';

interface RoutineHeaderProps {
	title: string;
	subtitle: string;
	description: string;
	isPending: boolean;
	onSave: () => void;
	showButton?: boolean;
}

export default function RoutineHeader( {
										   title,
										   subtitle,
										   description,
										   isPending,
										   onSave,
										   showButton = true
									   }: RoutineHeaderProps ) {
	return (
		<div className={ "flex justify-between items-center w-full px-2" }>
			<div>
				<p className={ "text-base font-bold sm:text-sm text-muted/80" }>
					{ subtitle }
				</p>

				<h1 className={ "text-xl font-black sm:truncate sm:text-4xl sm:tracking-tight" }>
					{ title }
				</h1>

				<p className={ "text-base sm:text-base font-semibold mt-1 text-muted" }>
					{ description }
				</p>
			</div>

			{ showButton && (
				isPending ? (
					<Button
						isPending
						size={ "lg" }
						className={ "font-semibold hidden sm:flex" }
					>
						{ ( { isPending } ) => (
							<>
								{ isPending ? <Spinner color={ "current" } size={ "sm" }/> : null }
								Guardando...
							</>
						) }
					</Button>
				) : (
					<Button
						size={ "lg" }
						className={ "font-semibold hidden sm:flex" }
						onClick={ onSave }
					>
						<FloppyDisk/>
						Finalizar rutina
					</Button>
				)
			) }
		</div>
	);
}