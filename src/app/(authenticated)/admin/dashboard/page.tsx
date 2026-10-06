import type { Metadata } from "next";

import AdminDashboardPageContent from "@/features/role/admin/dashboard/views/admin-dashboard-page-content";

export const metadata: Metadata = {
	description: "Resumen general de administración.",
	title: "Dashboard Admin",
};

export default function AdminDashboardPage() {
	return <AdminDashboardPageContent/>;
}
