import React from "react";

import { Bulb } from "@gravity-ui/icons";
import { Card } from "@heroui/react";

interface TipsCardProps {
	tips?: string;
}

export default function TipsCard( {
									  tips = "Mantén una buena técnica durante todo el ejercicio. Controla el movimiento y respira correctamente.",
								  }: TipsCardProps ) {
	return (
		<Card className={ "border border-border bg-surface shadow-sm" } variant={ "default" }>
			<Card.Content className={ "flex h-full items-center justify-center p-1" }>
				<div className={ "flex w-full items-center gap-3" }>
					<div className={ "flex size-10 items-center justify-center rounded-full bg-warning/10 text-warning" }>
						<Bulb className={ "size-5" }/>
					</div>

					<div className={ "min-w-0" }>
						<p className={ "text-sm font-semibold text-foreground" }>Consejo del entrenador</p>
						<p className={ "text-sm leading-6 text-muted" }>{ tips }</p>
					</div>
				</div>
			</Card.Content>
		</Card>
	);
}
