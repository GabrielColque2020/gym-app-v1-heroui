import type { Metadata } from "next";

import AdminUsersPageContent from "@/features/role/admin/users/views/admin-users-page-content";

export const metadata: Metadata = {
	description: "Gestión de usuarios.",
	title: "Usuarios",
};

type AdminUsersPageProps = {
	searchParams: Promise<{ estado?: string; nuevo?: string; rol?: string; sinEntrenador?: string }>;
};

export default async function AdminUsersPage( { searchParams }: AdminUsersPageProps ) {
	const { estado, nuevo, rol, sinEntrenador } = await searchParams;

	// Desde Inicio se llega con "?nuevo=entrenador" o "?nuevo=estudiante" para
	// abrir directamente el formulario.
	// Los contadores de Inicio llegan con el filtro ya elegido ("?rol=", "?estado=", "?sinEntrenador=1").
	return (
		<AdminUsersPageContent
			initialCreate={ nuevo === "entrenador" ? "coach" : nuevo === "estudiante" ? "student" : null }
			initialFilters={ {
				onlyWithoutCoach: sinEntrenador === "1",
				role: rol === "entrenador" ? "COACH" : rol === "estudiante" ? "STUDENT" : rol === "administrador" ? "ADMIN" : "ALL",
				status: estado === "activos" ? "ACTIVE" : estado === "inactivos" ? "INACTIVE" : "ALL",
			} }
		/>
	);
}
