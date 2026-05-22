import type { ComponentType } from "react";

import {
	ArrowRightFromSquare,
	ChartColumn,
	CircleQuestion,
	Gear,
	House,
	ListCheck,
	Receipt,
} from "@gravity-ui/icons";

export type NavItem = {
	readonly href: string;
	readonly label: string;
	readonly icon: ComponentType<{ className?: string }>;
	readonly badge?: string;
};

export const NAV_ITEMS: readonly NavItem[] = [
	{ href: "/", icon: House, label: "Inicio" },
	{ href: "/trainingRoutine", icon: Gear, label: "Rutina de Entrenamiento" },
	{ href: "/admin/trainingRoutine", icon: Gear, label: "Admin - Rutina de Entrenamiento" },
	{ href: "/settings2", icon: Gear, label: "Historial de Ejercicios" },
	{ href: "/settings", icon: Gear, label: "Configuración" },
] as const;

export const FOOTER_ITEMS: readonly NavItem[] = [
	{ href: "/logout", icon: ArrowRightFromSquare, label: "Cerrar Sesión" },
] as const;
