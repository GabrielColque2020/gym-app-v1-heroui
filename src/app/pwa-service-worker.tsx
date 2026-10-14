"use client";

import { useEffect } from "react";

export function PwaServiceWorker() {
  useEffect( () => {
    if (process.env.NODE_ENV !== "production") {
      return;
    }

    if (typeof window === "undefined" || !("serviceWorker" in navigator)) {
      return;
    }

    const registerServiceWorker = async () => {
      try {
        await navigator.serviceWorker.register( "/service-worker.js", {
          scope: "/",
        } );
      } catch (error) {
        console.error( "Service worker registration failed", error );
      }
    };

    // Despues de `load` para no competir con lo que la pagina carga primero. Pero
    // este efecto corre al hidratar, y muchas veces `load` ya paso: esperarlo
    // dejaba la app sin service worker (ni pantalla sin conexion) para siempre.
    if (document.readyState === "complete") {
      void registerServiceWorker();

      return;
    }

    window.addEventListener( "load", registerServiceWorker );

    return () => {
      window.removeEventListener( "load", registerServiceWorker );
    };
  }, [] );

  return null;
}
