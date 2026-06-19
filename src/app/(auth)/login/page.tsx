import LoginPageContent from "@/features/login/view/LoginPageContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Iniciar Sesión",
	description: "Iniciar sesión",
};

export default function LoginPage() {
	return <LoginPageContent/>;
}
