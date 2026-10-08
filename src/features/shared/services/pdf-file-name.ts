// Arma el nombre de archivo de un PDF a partir de sus partes ("rutina", el
// nombre del estudiante, el periodo). Solo deja letras sin tilde, numeros y
// guiones: el nombre viaja en un encabezado HTTP, que no acepta cualquier
// caracter, y un nombre como "Łukasz" hacia fallar la descarga entera.
export function buildPdfFileName( ...parts: Array<number | string> ) {
	const slug = parts
		.map( ( part ) => String( part )
			.normalize( "NFD" )
			.replace( /[̀-ͯ]/g, "" )
			.toLowerCase()
			.replace( /[^a-z0-9]+/g, "-" )
			.replace( /^-+|-+$/g, "" ) )
		.filter( Boolean )
		.join( "-" );

	return `${ slug || "reporte" }.pdf`;
}
