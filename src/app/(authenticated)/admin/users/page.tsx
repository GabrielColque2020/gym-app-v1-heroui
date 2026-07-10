import type { Metadata } from "next";

import AdminUsersPageContent from "@/features/role/admin/users/views/admin-users-page-content";

export const metadata: Metadata = {
	description: "Gestion de usuarios y coaches.",
	title: "Usuarios Admin",
};

export default function AdminUsersPage() {
	return <AdminUsersPageContent/>;
}
