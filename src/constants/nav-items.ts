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
	{ href: "/admin/dashboard", icon: House, label: "Inicio", roles: [ "ADMIN" ] },
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
		label: "Administracion operativa",
		roles: [ "COACH" ],
	},
	{
		children: [
			{ href: "/admin/users", icon: Users, label: "Usuarios", roles: [ "ADMIN" ] },
		],
		icon: Settings2,
		label: "Sistema",
		roles: [ "ADMIN" ],
	},
] as const;

export const FOOTER_ITEMS: readonly NavItem[] = [
	{ href: "/logout", icon: LogOut, label: "Cerrar Sesion" },
] as const;
