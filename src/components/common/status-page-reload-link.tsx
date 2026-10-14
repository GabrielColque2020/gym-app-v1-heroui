"use client";

import type { MouseEvent, ReactNode } from "react";

type StatusPageReloadLinkProps = {
  children: ReactNode;
  className: string;
};

// "Reintentar" de la pantalla sin conexion. El service worker la muestra en la
// misma direccion que se pidio (la barra sigue diciendo, por ejemplo,
// "/student/routine?..."), asi que volver a pedir esa direccion es reintentar
// donde se estaba; antes mandaba al inicio.
//
// Es un enlace a la pagina actual (`href=""`) y no un boton: esta pantalla viene
// de la cache y su JavaScript puede no estar, y un enlace anda igual.
export function StatusPageReloadLink( { children, className }: StatusPageReloadLinkProps ) {
  function handleClick( event: MouseEvent<HTMLAnchorElement> ) {
    // Si se entro directo a /offline, reintentar es ir al inicio.
    if (window.location.pathname === "/offline") {
      event.preventDefault();
      window.location.assign( "/" );
    }
  }

  return (
    <a className={ className } href={ "" } onClick={ handleClick }>
      { children }
    </a>
  );
}
