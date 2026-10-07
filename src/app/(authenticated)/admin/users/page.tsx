import type { Metadata } from "next";

import AdminUsersPageContent from "@/features/role/admin/users/views/admin-users-page-content";

export const metadata: Metadata = {
	description: "Gestión de usuarios.",
	title: "Usuarios",
};

export default function AdminUsersPage() {
	return <AdminUsersPageContent/>;
}
