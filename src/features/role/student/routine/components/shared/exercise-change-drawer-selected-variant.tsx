import { Button, Card } from "@heroui/react";

type ExerciseChangeDrawerSelectedVariantProps = {
	exerciseBaseName: string;
	onResetVariant: () => void;
};

export function ExerciseChangeDrawerSelectedVariant( {
														 exerciseBaseName,
														 onResetVariant,
													 }: ExerciseChangeDrawerSelectedVariantProps ) {
	return (
		<Card className={ "border border-warning/20 bg-warning/5 px-4 py-3" }>
			<Card.Content className={ "px-1" }>
				<div className={ "flex items-center justify-between gap-3" }>
					<div className={ "min-w-0" }>
						<p className={ "text-sm font-semibold text-foreground" }>Ejercicio original</p>
						<p className={ "truncate text-sm text-muted" }>{ exerciseBaseName }</p>
					</div>
					<Button size={ "sm" } variant={ "secondary" } onPress={ onResetVariant }>
						Restablecer al original
					</Button>
				</div>

			</Card.Content>
		</Card>
	);
}

