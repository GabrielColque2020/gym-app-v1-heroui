import LoginPageContent from "@/features/login/views/login-page-content";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Iniciar Sesión",
	description: "Iniciar sesión",
};

export default function LoginPage() {
	return <LoginPageContent/>;
}
