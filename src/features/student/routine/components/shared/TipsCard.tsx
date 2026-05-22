import React from 'react';
import { Card } from '@heroui/react';
import { Bulb } from '@gravity-ui/icons';

interface TipsCardProps {
	tips?: string;
}

export default function TipsCard( { tips = "Mantén una buena técnica durante todo el ejercicio. Controla el movimiento y respira correctamente." }: TipsCardProps ) {
	return (
		<Card className={ "border-l-6 border-success" }>
			<Card.Header>
				<Card.Title>
					<div className={ "flex items-end mb-2" }>
						<Bulb className={ "size-8 bg-warning-soft-hover text-warning rounded-full p-1 mr-2" }/>
						<span className={ "font-bold text-foreground text-base" }>Consejos</span>
					</div>
				</Card.Title>
				<Card.Description>
					{ tips }
				</Card.Description>
			</Card.Header>
		</Card>
	);
}