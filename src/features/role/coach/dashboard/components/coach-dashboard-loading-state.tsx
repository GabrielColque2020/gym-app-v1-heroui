import { DashboardSkeleton } from "@/components/common/skeletons";

export function CoachDashboardLoadingState() {
	return <DashboardSkeleton title={ "Cargando dashboard coach" } variant={ "coach" }/>;
}
