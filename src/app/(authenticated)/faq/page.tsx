import { redirect } from "next/navigation";

import FaqPageContent from "@/features/faq/views/faq-page-content";
import { getAuthenticatedSession } from "@/features/auth/session";

export default async function FaqPage() {
	const session = await getAuthenticatedSession();

	if (!session) {
		redirect( "/login" );
	}

	return <FaqPageContent role={ session.role }/>;
}
