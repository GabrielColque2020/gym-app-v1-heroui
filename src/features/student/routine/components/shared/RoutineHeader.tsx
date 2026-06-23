import { FloppyDisk } from "@gravity-ui/icons";
import { Button, Spinner } from "@heroui/react";

interface RoutineHeaderProps {
	title: string;
	description: string;
	isPending: boolean;
	onSave: () => void;
	statusDescription?: string;
	statusLabel?: string;
	showButton?: boolean;
}

export default function RoutineHeader( {
	title,
	description,
	isPending,
	onSave,
	statusDescription,
	statusLabel = "Ejercicios cargados",
	showButton = true,
}: RoutineHeaderProps ) {
	return (
		<div className={ "flex w-full items-center justify-between px-2" }>
			<div>
				<h1 className={ "text-xl font-black sm:truncate sm:text-4xl sm:tracking-tight" }>
					{ title }
				</h1>

				<p className={ "mt-1 text-base font-semibold text-muted sm:text-base" }>
					{ description }
				</p>
			</div>

			{ showButton && (
				<div className={ "hidden items-center gap-3 sm:flex" }>
					{ statusDescription ? (
						<div className={ "text-right" }>
							<p className={ "text-xs font-semibold uppercase tracking-wide text-muted" }>{ statusLabel }</p>
							<p className={ "text-sm font-semibold text-foreground" }>{ statusDescription }</p>
						</div>
					) : null }

					{ isPending ? (
						<Button
							isPending
							className={ "font-semibold" }
							size={ "lg" }
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
						className={ "font-semibold" }
						size={ "lg" }
						onPress={ onSave }
					>
						<FloppyDisk/>
						Guardar progreso
					</Button>
				) }
			</div>
			) }
		</div>
	);
}
