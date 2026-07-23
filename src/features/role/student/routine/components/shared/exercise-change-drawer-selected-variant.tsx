import { Button, Card } from "@heroui/react";

import { AsyncMedia } from "@/components/common";

type ExerciseChangeDrawerSelectedVariantProps = {
	exerciseBaseName: string;
	imageUrl?: string | null;
	onResetVariant: () => void;
};

export function ExerciseChangeDrawerSelectedVariant( {
	exerciseBaseName,
	imageUrl,
	onResetVariant,
}: ExerciseChangeDrawerSelectedVariantProps ) {
	return (
		<Card className={ "border border-warning/20 bg-warning/5 px-3 py-3" }>
			<Card.Content className={ "px-1" }>
				<div className={ "flex items-start justify-between gap-3" }>
					<div className={ "flex min-w-0 items-start gap-3" }>
						<AsyncMedia
							alt={ `Miniatura de ${ exerciseBaseName }` }
							className={ "h-16 w-16 shrink-0 rounded-2xl border border-border object-cover sm:h-20 sm:w-20" }
							emptyLabel={ "Sin imagen" }
							spinnerLabel={ `Cargando imagen de ${ exerciseBaseName }` }
							src={ imageUrl }
						/>
						<div className={ "min-w-0" }>
							<p className={ "text-sm font-semibold text-foreground" }>Ejercicio original</p>
							<p className={ "text-sm leading-snug text-muted" }>{ exerciseBaseName }</p>
						</div>
					</div>
					<Button className={ "shrink-0" } size={ "sm" } variant={ "secondary" } onPress={ onResetVariant }>
						Restablecer al original
					</Button>
				</div>
			</Card.Content>
		</Card>
	);
}
