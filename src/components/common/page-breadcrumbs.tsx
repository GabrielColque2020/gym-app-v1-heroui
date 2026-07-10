"use client";

import { Breadcrumbs, Button } from "@heroui/react";
import { usePathname, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

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
	const pathname = usePathname();
	const dashboardHref = pathname.startsWith( "/coach" )
		? "/coach/dashboard"
		: pathname.startsWith( "/admin" )
			? "/admin/dashboard"
		: pathname.startsWith( "/student" )
			? "/student/dashboard"
			: "/dashboard";

	const isBackToHome = backLabel.toLowerCase().includes( "inicio" );

	return (
		<div className={ "flex flex-col gap-3 md:flex-row md:items-center md:justify-between" }>
			<div className={ "min-w-0 flex-1" }>
				<Breadcrumbs className={ "min-w-0 flex-wrap gap-1 text-sm" }>
					{ crumbs.map( ( crumb, index ) => (
						crumb.href || crumb.label === "Inicio" ? (
							<Breadcrumbs.Item
								key={ `${ index }-${ crumb.label }` }
								href={ crumb.label === "Inicio" ? dashboardHref : crumb.href }
							>
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
				onPress={ () => router.push( isBackToHome ? dashboardHref : backHref ) }
			>
				<ArrowLeft className={ "size-4" }/>
				{ backLabel }
			</Button>
		</div>
	);
}
