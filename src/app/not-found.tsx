import { ArrowLeft, SearchX } from "lucide-react";
import { StatusPageCard } from "@/components/common/status-page-card";

export default function NotFound() {
  return (
    <StatusPageCard
      actionHref={ "/" }
      actionIcon={ ArrowLeft }
      actionLabel={ "Volver al inicio" }
      badgeIcon={ SearchX }
      badgeLabel={ "Error 404" }
      description={ "La página que intentaste abrir no existe o ya no está disponible dentro de Gym App." }
      detail={ "Puede tratarse de un enlace viejo, una ruta mal escrita o una sección que cambio de lugar. Vuelve al inicio para continuar navegando." }
      detailTitle={ "Que pudo pasar" }
      title={ "No encontramos esa página" }
    />
  );
}
