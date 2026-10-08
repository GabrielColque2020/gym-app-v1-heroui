import { DashboardSkeleton } from "@/components/common/skeletons";

export function CoachDashboardLoadingState() {
	return <DashboardSkeleton title={ "Cargando el inicio" } variant={ "coach" }/>;
}
