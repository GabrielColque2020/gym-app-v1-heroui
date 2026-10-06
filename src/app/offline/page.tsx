import { RefreshCw, WifiOff } from "lucide-react";
import { StatusPageCard } from "@/components/common/status-page-card";

export default function OfflinePage() {
  return (
    <StatusPageCard
      actionHref={ "/" }
      actionIcon={ RefreshCw }
      actionLabel={ "Reintentar" }
      badgeIcon={ WifiOff }
      badgeLabel={ "Sin conexión" }
      description={ "Revisa tu conexión y vuelve a intentar. La app sigue siendo instalable y algunos recursos visuales quedan disponibles aunque no tengas internet." }
      detail={ "Las pantallas dinámicas que dependen del servidor pueden no cargar sin red, pero la instalación de la app y sus recursos estaticos ya quedaron preparados." }
      detailTitle={ "Que puedes esperar" }
      title={ "No pudimos conectarnos" }
    />
  );
}
