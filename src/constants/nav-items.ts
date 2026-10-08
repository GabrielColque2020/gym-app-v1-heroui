import type { ComponentType } from "react";

import { Bookmark, CalendarClock, CircleHelp, Dumbbell, House, TrendingUp, Users, UtensilsCrossed } from "lucide-react";

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
	{ href: "/student/training-routine", icon: Dumbbell, label: "Rutina de entrenamiento", roles: [ "STUDENT" ] },
	{ href: "/student/meal-plans", icon: UtensilsCrossed, label: "Plan alimenticio", roles: [ "STUDENT" ] },
	{ href: "/student/history-routines", icon: CalendarClock, label: "Historial de rutina", roles: [ "STUDENT" ] },
	{ href: "/student/progress", icon: TrendingUp, label: "Progreso", roles: [ "STUDENT" ] },
	// La rutina, el plan y el historial de cada estudiante se abren desde su ficha,
	// a la que se entra por "Estudiantes".
	{ href: "/coach/student", icon: Users, label: "Estudiantes", roles: [ "COACH" ] },
	{ href: "/coach/exercises", icon: Dumbbell, label: "Ejercicios", roles: [ "COACH" ] },
	{ href: "/coach/templates", icon: Bookmark, label: "Plantillas", roles: [ "COACH" ] },
	{ href: "/admin/users", icon: Users, label: "Usuarios", roles: [ "ADMIN" ] },
	{ href: "/admin/exercises", icon: Dumbbell, label: "Ejercicios globales", roles: [ "ADMIN" ] },
	{ href: "/faq", icon: CircleHelp, label: "Preguntas frecuentes", roles: [ "ADMIN", "COACH", "STUDENT" ] },
] as const;
