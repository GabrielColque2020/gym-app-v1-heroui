import type { Metadata } from "next";

import AdminUsersPageContent from "@/features/role/admin/users/views/admin-users-page-content";

export const metadata: Metadata = {
	description: "Gestión de usuarios.",
	title: "Usuarios",
};

type AdminUsersPageProps = {
	searchParams: Promise<{ nuevo?: string }>;
};

export default async function AdminUsersPage( { searchParams }: AdminUsersPageProps ) {
	const { nuevo } = await searchParams;

	// Desde Inicio se llega con "?nuevo=entrenador" o "?nuevo=estudiante" para
	// abrir directamente el formulario.
	return <AdminUsersPageContent initialCreate={ nuevo === "entrenador" ? "coach" : nuevo === "estudiante" ? "student" : null }/>;
}
