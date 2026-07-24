export function downloadFileFromUrl( url: string ) {
	const downloadLink = document.createElement( "a" );
	downloadLink.download = "";
	downloadLink.href = url;
	downloadLink.rel = "noopener";
	downloadLink.style.display = "none";
	document.body.append( downloadLink );
	downloadLink.click();
	downloadLink.remove();
}
