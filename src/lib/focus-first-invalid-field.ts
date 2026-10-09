// Lleva la vista al primer campo marcado con error y lo enfoca. Sin esto, en el
// telefono se tocaba "Crear" al pie de un formulario largo y no pasaba nada a la
// vista: el error estaba arriba, fuera de la pantalla.
//
// Espera a que la pantalla se actualice: los campos se marcan en el mismo toque
// que llama a esto.
export function focusFirstInvalidField( container: HTMLElement | null ) {
	if (!container) return;

	window.requestAnimationFrame( () => {
		window.requestAnimationFrame( () => {
			const invalid = container.querySelector<HTMLElement>( "[aria-invalid=\"true\"], [data-invalid=\"true\"]" );

			if (!invalid) return;

			const focusable = invalid.matches( "input, textarea, select, button" )
				? invalid
				: invalid.querySelector<HTMLElement>( "input, textarea, select, button" ) ?? invalid;

			focusable.scrollIntoView( { behavior: "smooth", block: "center" } );
			focusable.focus( { preventScroll: true } );
		} );
	} );
}
