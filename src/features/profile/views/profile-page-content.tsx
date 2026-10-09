import { PageHeader } from "@/components/common/page-header";
import { ProfileDataForm } from "@/features/profile/components/profile-data-form";
import { ProfilePasswordForm } from "@/features/profile/components/profile-password-form";
import type { ProfileFormValues } from "@/features/profile/services/profile-form";
import type { Role } from "@/generated/prisma/client";

type ProfilePageContentProps = {
	initialValues: ProfileFormValues;
	role: Role;
};

export default function ProfilePageContent( { initialValues, role }: ProfilePageContentProps ) {
	const isStudent = role === "STUDENT";

	return (
		<div className={ "flex max-w-3xl flex-col gap-6" }>
			<PageHeader
				description={ isStudent
					? "Tus datos, tus medidas y tu contraseña. Si tu entrenador cargó algo mal, lo podés corregir acá."
					: "Tus datos y tu contraseña." }
				title={ "Mi perfil" }
			/>
			<ProfileDataForm initialValues={ initialValues } isStudent={ isStudent }/>
			<ProfilePasswordForm isStudent={ isStudent }/>
		</div>
	);
}
