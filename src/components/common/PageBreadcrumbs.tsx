"use client";

import { ArrowLeft } from "@gravity-ui/icons";
import { Breadcrumbs, Button } from "@heroui/react";
import { useRouter } from "next/navigation";

type PageBreadcrumbItem = {
	href?: string;
	label: string;
};

type PageBreadcrumbsProps = {
	backHref: string;
	backLabel: string;
	crumbs: PageBreadcrumbItem[];
};

export function PageBreadcrumbs( {
	backHref,
	backLabel,
	crumbs,
}: PageBreadcrumbsProps ) {
	const router = useRouter();

	return (
		<div className={ "flex flex-col gap-3 md:flex-row md:items-center md:justify-between" }>
			<div className={ "min-w-0 flex-1" }>
				<Breadcrumbs className={ "min-w-0 flex-wrap gap-1 text-sm" }>
					{ crumbs.map( ( crumb, index ) => (
						crumb.href ? (
							<Breadcrumbs.Item key={ `${ index }-${ crumb.label }` } href={ crumb.href }>
								{ crumb.label }
							</Breadcrumbs.Item>
						) : (
							<Breadcrumbs.Item key={ `${ index }-${ crumb.label }` }>
								{ () => <span className={ "text-foreground" }>{ crumb.label }</span> }
							</Breadcrumbs.Item>
						)
					) ) }
				</Breadcrumbs>
			</div>

			<Button
				className={ "w-full shrink-0 sm:w-fit" }
				size={ "sm" }
				variant={ "secondary" }
				onPress={ () => router.push( backHref ) }
			>
				<ArrowLeft className={ "size-4" }/>
				{ backLabel }
			</Button>
		</div>
	);
}
