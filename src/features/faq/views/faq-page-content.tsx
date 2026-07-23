"use client";

import { Accordion, Card, Chip } from "@heroui/react";
import { CircleHelp, LifeBuoy } from "lucide-react";

import { PageBreadcrumbs } from "@/components/common";
import type { Role } from "@/generated/prisma/client";
import {
	getDashboardHrefByRole,
	getFaqSectionsByRole,
	getRoleAudienceLabel,
} from "@/features/faq/services/faq-content";

type FaqPageContentProps = {
	role: Role;
};

export default function FaqPageContent( { role }: FaqPageContentProps ) {
	const sections = getFaqSectionsByRole( role );
	const dashboardHref = getDashboardHrefByRole( role );
	const audienceLabel = getRoleAudienceLabel( role );

	return (
		<div className={ "flex flex-col gap-4" }>
			<PageBreadcrumbs
				backHref={ dashboardHref }
				backLabel={ "Volver al inicio" }
				crumbs={ [
					{ href: dashboardHref, label: "Inicio" },
					{ label: "Preguntas frecuentes" },
				] }
			/>

			<Card className={ "border border-border bg-surface shadow-sm" } variant={ "default" }>
				<Card.Content className={ "flex flex-col gap-4 p-4 sm:p-5" }>
					<div className={ "flex items-start gap-3" }>
						<div className={ "flex size-11 shrink-0 items-center justify-center rounded-2xl border border-accent-soft bg-accent-soft/60 text-accent" }>
							<LifeBuoy className={ "size-5" }/>
						</div>
						<div className={ "min-w-0 space-y-2" }>
							<div className={ "flex flex-wrap items-center gap-2" }>
								<h1 className={ "text-2xl font-black leading-tight text-foreground sm:text-3xl" }>
									Preguntas frecuentes
								</h1>
								<Chip color={ "accent" } size={ "sm" } variant={ "soft" }>
									<Chip.Label>{ audienceLabel }</Chip.Label>
								</Chip>
							</div>
							<p className={ "max-w-3xl text-sm text-muted sm:text-base" }>
								Aqui encontraras respuestas rapidas sobre los flujos mas comunes del sistema para tu rol.
							</p>
						</div>
					</div>
				</Card.Content>
			</Card>

			<div className={ "grid gap-4" }>
				{ sections.map( ( section ) => (
					<Card key={ section.id } className={ "border border-border shadow-sm" } variant={ "default" }>
						<Card.Content className={ "p-4 sm:p-5" }>
							<div className={ "mb-4 flex items-start gap-3" }>
								<div className={ "flex size-10 shrink-0 items-center justify-center rounded-xl border border-border bg-surface-secondary text-accent" }>
									<CircleHelp className={ "size-4.5" }/>
								</div>
								<div className={ "min-w-0" }>
									<h2 className={ "text-lg font-black text-foreground" }>{ section.title }</h2>
									<p className={ "text-sm text-muted" }>{ section.description }</p>
								</div>
							</div>

							<Accordion allowsMultipleExpanded hideSeparator className={ "w-full space-y-2" }>
								{ section.items.map( ( item ) => (
									<Accordion.Item key={ item.id }>
										<div className={ "overflow-hidden rounded-2xl border border-border bg-surface-secondary" }>
											<Accordion.Trigger
												className={ "group flex w-full items-center justify-between gap-3 px-4 py-3 text-left" }
											>
												<span className={ "min-w-0 text-sm font-semibold leading-snug text-foreground sm:text-base" }>
													{ item.question }
												</span>
												<Accordion.Indicator/>
											</Accordion.Trigger>
											<Accordion.Panel>
												<Accordion.Body className={ "px-4 pb-4 pt-0 text-sm leading-6 text-muted sm:text-[15px]" }>
													{ item.answer }
												</Accordion.Body>
											</Accordion.Panel>
										</div>
									</Accordion.Item>
								) ) }
							</Accordion>
						</Card.Content>
					</Card>
				) ) }
			</div>
		</div>
	);
}
