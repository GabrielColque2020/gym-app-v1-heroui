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

    window.addEventListener( "load", registerServiceWorker );

    return () => {
      window.removeEventListener( "load", registerServiceWorker );
    };
  }, [] );

  return null;
}
