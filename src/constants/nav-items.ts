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
	{ href: "/coach/dashboard", icon: House, label: "Inicio", roles: [ "COACH" ] },
	{ href: "/student/dashboard", icon: House, label: "Inicio", roles: [ "STUDENT" ] },
	{ href: "/student/training-routine", icon: Gear, label: "Rutina de Entrenamiento", roles: [ "STUDENT" ] },
	{ href: "/student/meal-plans", icon: Gear, label: "Planes Alimenticios por Estudiantes", roles: [ "STUDENT" ] },
	{ href: "/student/history-routines", icon: Gear, label: "Historial de Rutina", roles: [ "STUDENT" ] },
	{
		children: [
			{ href: "/coach/exercises", icon: Gear, label: "Ejercicios", roles: [ "COACH" ] },
			{ href: "/coach/student", icon: Gear, label: "Estudiantes", roles: [ "COACH" ] },
			{
				href: "/coach/training-routines-students",
				icon: Gear,
				label: "Rutinas por Estudiantes",
				roles: [ "COACH" ],
			},
			{
				href: "/coach/meal-plans-students",
				icon: Gear,
				label: "Planes Alimenticios por Estudiantes",
				roles: [ "COACH" ],
			},
			{
				href: "/coach/history-routines-students",
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
