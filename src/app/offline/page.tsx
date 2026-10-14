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
      description={ "Revisá la señal y probá de nuevo. Lo que cargaste y no se llegó a guardar sigue en este dispositivo." }
      detail={ "Las pantallas que traen datos del servidor necesitan conexión. Cuando vuelva, se guarda solo lo que quedó pendiente." }
      detailTitle={ "Qué pasa con lo que cargaste" }
      title={ "No pudimos conectarnos" }
    />
  );
}
