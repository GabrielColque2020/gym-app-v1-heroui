import type { ComponentType } from "react";

import { CalendarClock, Dumbbell, House, LogOut, Settings2, UtensilsCrossed, Users } from "lucide-react";

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
	{ href: "/student/training-routine", icon: Dumbbell, label: "Rutina de Entrenamiento", roles: [ "STUDENT" ] },
	{ href: "/student/meal-plans", icon: UtensilsCrossed, label: "Planes Alimenticios por Estudiantes", roles: [ "STUDENT" ] },
	{ href: "/student/history-routines", icon: CalendarClock, label: "Historial de Rutina", roles: [ "STUDENT" ] },
	{
		children: [
			{ href: "/coach/exercises", icon: Dumbbell, label: "Ejercicios", roles: [ "COACH" ] },
			{ href: "/coach/student", icon: Users, label: "Estudiantes", roles: [ "COACH" ] },
			{
				href: "/coach/training-routines-students",
				icon: CalendarClock,
				label: "Rutinas por Estudiantes",
				roles: [ "COACH" ],
			},
			{
				href: "/coach/meal-plans-students",
				icon: UtensilsCrossed,
				label: "Planes Alimenticios por Estudiantes",
				roles: [ "COACH" ],
			},
			{
				href: "/coach/history-routines-students",
				icon: CalendarClock,
				label: "Historial de Rutina por Estudiantes",
				roles: [ "COACH" ],
			},
		],
		icon: Settings2,
		label: "Administración",
		roles: [ "COACH" ],
	},
] as const;

export const FOOTER_ITEMS: readonly NavItem[] = [
	{ href: "/logout", icon: LogOut, label: "Cerrar Sesión" },
] as const;
