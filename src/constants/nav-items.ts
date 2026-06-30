import type { ComponentType } from "react";

import { ArrowRightFromSquare, Gear, House, } from "@gravity-ui/icons";

import type { Role } from "@/generated/prisma/client";

export type NavItem = {
	readonly href?: string;
	readonly label: string;
	readonly icon: ComponentType<{ className?: string }>;
	readonly children?: readonly NavItem[];
	readonly roles?: readonly Role[];
};

export const NAV_ITEMS: readonly NavItem[] = [
	{ href: "/dashboard", icon: House, label: "Inicio" },
	{ href: "/trainingRoutine", icon: Gear, label: "Rutina de Entrenamiento" },
	{ href: "/mealPlans", icon: Gear, label: "Planes Alimenticios por Estudiantes" },
	{ href: "/historyRoutines", icon: Gear, label: "Historial de Rutina" },
	{
		children: [
			{ href: "/admin/exercises", icon: Gear, label: "Ejercicios", roles: [ "COACH" ] },
			{ href: "/admin/student", icon: Gear, label: "Estudiantes", roles: [ "COACH" ] },
			{
				href: "/admin/trainingRoutinesStudents",
				icon: Gear,
				label: "Rutinas por Estudiantes",
				roles: [ "COACH" ],
			},
			{
				href: "/admin/mealPlansStudents",
				icon: Gear,
				label: "Planes Alimenticios por Estudiantes",
				roles: [ "COACH" ],
			},
			{
				href: "/admin/historyRoutinesStudents",
				icon: Gear,
				label: "Historial de Rutina por Estudiantes",
				roles: [ "COACH" ],
			},
		],
		icon: Gear,
		label: "Administración",
		roles: [ "COACH" ],
	},
] as const;

export const FOOTER_ITEMS: readonly NavItem[] = [
	{ href: "/logout", icon: ArrowRightFromSquare, label: "Cerrar Sesión" },
] as const;
