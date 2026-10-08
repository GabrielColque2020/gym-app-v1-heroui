import type { Role } from "@/generated/prisma/client";

export type FaqItem = {
	answer: string;
	id: string;
	question: string;
};

export type FaqSection = {
	description: string;
	id: string;
	items: FaqItem[];
	title: string;
};

const STUDENT_FAQ_SECTIONS: FaqSection[] = [
	{
		description: "Cómo encontrar tu rutina, cargar lo que hiciste y terminar el día.",
		id: "student-routine",
		items: [
			{
				answer: "En Rutina de entrenamiento, desde el menú. Elegí la semana y abrí el día que vas a entrenar. Desde Inicio también tenés un acceso directo al próximo día. Si no aparece nada, tu entrenador todavía no cargó la rutina de ese mes.",
				id: "student-routine-where",
				question: "¿Dónde veo mi rutina?",
			},
			{
				answer: "Arriba de la pantalla de Rutina de entrenamiento está el mes: cambialo ahí si querés ver otro. Debajo están las semanas, y dentro de cada una los días. Si un mes aparece vacío, es que no tiene rutina cargada.",
				id: "student-routine-period",
				question: "¿Cómo cambio de semana o de mes?",
			},
			{
				answer: "Abrí el día y completá en cada serie las repeticiones y el peso. No hay botón de guardar: cada serie se guarda sola un momento después de cargarla, y arriba vas a ver el aviso Guardado. Una serie se guarda recién cuando tiene los dos datos, repeticiones y peso. Podés salir y volver más tarde: lo cargado queda.",
				id: "student-routine-save",
				question: "¿Cómo cargo lo que hice? ¿Tengo que guardar?",
			},
			{
				answer: "Le avisa a tu entrenador que ese entrenamiento está hecho. Antes de confirmar te muestra un resumen, y podés terminar aunque te hayan quedado series sin cargar. Después el día queda como Día terminado y las series se bloquean para que no las cambies sin querer.",
				id: "student-routine-finalized",
				question: "¿Para qué sirve Terminar día?",
			},
			{
				answer: "Sí. Entrá al día y tocá Corregir (o Corregir series). Se desbloquean las series, cambiás lo que haga falta y se guarda solo. El día sigue figurando como terminado.",
				id: "student-routine-fix",
				question: "Terminé el día y me equivoqué en una serie, ¿puedo corregirla?",
			},
		],
		title: "Rutina",
	},
	{
		description: "Cómo cambiar un ejercicio por una variante y ver lo que hiciste la vez anterior.",
		id: "student-exercises",
		items: [
			{
				answer: "Solo si tu entrenador le cargó variantes. En las opciones del ejercicio tocá Cambiar ejercicio y elegí una. Si la opción aparece deshabilitada, ese ejercicio no tiene variantes: pedile a tu entrenador que las agregue.",
				id: "student-exercise-change",
				question: "¿Puedo cambiar un ejercicio por otro?",
			},
			{
				answer: "Que en ese día estás haciendo una variante en lugar del ejercicio original. Lo que cargues queda registrado para la variante. Podés volver al original desde la misma opción Cambiar ejercicio.",
				id: "student-exercise-changed",
				question: "¿Qué significa Ejercicio cambiado?",
			},
			{
				answer: "En cada serie aparece la referencia Anterior, con las repeticiones y el peso de la última vez que hiciste ese ejercicio. Con Repetir última vez se cargan esos mismos valores en todas las series del ejercicio, y después ajustás lo que cambió. Si no aparece nada, es la primera vez que lo hacés.",
				id: "student-last-session",
				question: "¿Dónde veo lo que hice la última vez?",
			},
		],
		title: "Ejercicios",
	},
	{
		description: "Tu plan alimenticio y el registro de los meses anteriores.",
		id: "student-follow-up",
		items: [
			{
				answer: "En Plan alimenticio, desde el menú. Las comidas están ordenadas por momento del día, y algunas pueden traer una nota de tu entrenador. Arriba dice cuándo se actualizó por última vez y podés descargarlo en PDF. Si está vacío, tu entrenador todavía no lo cargó.",
				id: "student-meal-plans",
				question: "¿Dónde veo mi plan alimenticio?",
			},
			{
				answer: "En Historial de rutina, desde el menú. Vas a ver una fila por cada mes con lo que registraste y cuántos días terminaste. Desde cada mes podés descargar el reporte en PDF con el detalle de series, repeticiones y peso.",
				id: "student-history",
				question: "¿Dónde consulto mi historial?",
			},
			{
				answer: "Sí. En Rutina de entrenamiento, junto al mes, está el botón para descargar la rutina en PDF.",
				id: "student-routine-pdf",
				question: "¿Puedo descargar mi rutina?",
			},
		],
		title: "Plan e historial",
	},
];

const COACH_FAQ_SECTIONS: FaqSection[] = [
	{
		description: "Cómo llegar a la rutina de un estudiante y armar cada día.",
		id: "coach-routine",
		items: [
			{
				answer: "En Estudiantes, tocá al estudiante: se abre su rutina del mes. Con las pestañas de arriba pasás a su Plan alimenticio o a su Historial. Dentro de la rutina elegís la semana y abrís el día que querés editar.",
				id: "coach-routine-student",
				question: "¿Cómo entro a la rutina de un estudiante?",
			},
			{
				answer: "No. El día se guarda solo un momento después de cada cambio, y arriba vas a ver el aviso Guardado. Lo único que frena el guardado es un ejercicio sin series o sin repeticiones: la pantalla te avisa cuántos faltan completar.",
				id: "coach-routine-edit",
				question: "¿Tengo que guardar los cambios del día?",
			},
			{
				answer: "Dentro del día tocá Agregar ejercicio. Arriba podés fijar las series y repeticiones con las que se van a agregar (hay atajos como 3×12). Buscá por nombre o filtrá por grupo muscular y tocá Agregar en cada ejercicio: podés sumar varios sin cerrar. Al terminar tocá Listo.",
				id: "coach-routine-add-exercise",
				question: "¿Cómo agrego ejercicios a un día?",
			},
			{
				answer: "Cada ejercicio tiene sus campos Series y Repeticiones a la vista. El orden se cambia con las flechas que están junto al número del ejercicio. Con el botón de nota le dejás una indicación al estudiante.",
				id: "coach-routine-fields",
				question: "¿Cómo cambio el orden, las series y las repeticiones?",
			},
			{
				answer: "Sí, mientras el día esté vacío: ahí aparece la opción Copiar ejercicios de otro día. Elegís el día de origen y después ajustás lo que haga falta.",
				id: "coach-routine-copy-day",
				question: "¿Puedo copiar los ejercicios de otro día?",
			},
		],
		title: "Rutinas",
	},
	{
		description: "Variantes de un ejercicio y formas de no armar todo de cero.",
		id: "coach-variants",
		items: [
			{
				answer: "En las opciones del ejercicio, dentro del día, tocá Variantes. Se proponen primero los ejercicios del mismo grupo muscular. Cada variante que agregás o quitás se guarda en el momento; al terminar tocá Listo. El estudiante las ve en Cambiar ejercicio.",
				id: "coach-routine-variants",
				question: "¿Cómo agrego variantes a un ejercicio?",
			},
			{
				answer: "En la rutina del mes tocá Copiar rutina. Elegí de dónde copiar y si querés el Mes completo o Por semanas. Si la copia pisa semanas que ya tenían rutina, la pantalla lo avisa y te pide confirmar. Las series que el estudiante ya cargó no se borran.",
				id: "coach-routine-copy",
				question: "¿Cómo copio una rutina de otro mes o de otro estudiante?",
			},
			{
				answer: "En la rutina del mes, con Repetir en las demás copiás una semana ya armada en las demás del mismo mes. Si alguna ya tenía ejercicios, se reemplazan: la pantalla lo avisa antes de confirmar.",
				id: "coach-routine-repeat-week",
				question: "¿Cómo repito una semana en las siguientes?",
			},
		],
		title: "Variantes y copias",
	},
	{
		description: "Rutinas guardadas con nombre para armar más rápido la de cualquier estudiante.",
		id: "coach-templates",
		items: [
			{
				answer: "Es una rutina guardada con un nombre, que no es de ningún estudiante. Sirve como punto de partida: la usás para armar la rutina de un mes y después la ajustás a esa persona. Las tenés todas en Plantillas, en el menú.",
				id: "coach-templates-what",
				question: "¿Qué es una plantilla?",
			},
			{
				answer: "Hay dos formas. Si ya armaste una rutina que te gusta, abrila, tocá los tres puntos y elegí Guardar como plantilla: solo te pide un nombre. O en Plantillas tocá Nueva plantilla, elegí semanas y días, y cargá los ejercicios de cada día.",
				id: "coach-templates-create",
				question: "¿Cómo creo una plantilla?",
			},
			{
				answer: "En la rutina de un estudiante elegí Usar una plantilla: aparece en el aviso de un mes sin rutina y en los tres puntos de un mes que ya tiene. Elegís cuál y se copia entera. Si el mes ya tenía rutina, la reemplaza: la pantalla lo avisa y te pide confirmar.",
				id: "coach-templates-use",
				question: "¿Cómo uso una plantilla con un estudiante?",
			},
			{
				answer: "No. Usar una plantilla hace una copia. Podés cambiar, renombrar o eliminar la plantilla sin tocar las rutinas que ya armaste con ella, y cambiar la rutina de un estudiante tampoco cambia la plantilla.",
				id: "coach-templates-independent",
				question: "Si cambio una plantilla, ¿cambian las rutinas de mis estudiantes?",
			},
			{
				answer: "En Plantillas, abrí la que quieras. Se edita igual que la rutina de un estudiante: cada día abre el editor de ejercicios, Semanas y días agrega o quita días, y Repetir en las demás copia una semana en el resto. Desde los tres puntos de cada tarjeta podés cambiarle el nombre, duplicarla o eliminarla.",
				id: "coach-templates-edit",
				question: "¿Cómo edito, duplico o elimino una plantilla?",
			},
		],
		title: "Plantillas",
	},
	{
		description: "Carga del plan alimenticio y manejo de tu catálogo de ejercicios.",
		id: "coach-meal-plan-exercises",
		items: [
			{
				answer: "Abrí al estudiante y pasá a la pestaña Plan alimenticio. Agregá una comida por cada momento del día: se ordenan solas, de desayuno a cena. Cada comida puede llevar una nota opcional. Se editan y eliminan con los botones de cada tarjeta.",
				id: "coach-meal-plan",
				question: "¿Cómo cargo el plan alimenticio?",
			},
			{
				answer: "Sí, con Copiar de otro estudiante. Tené en cuenta que la copia reemplaza el plan entero: si el estudiante ya tenía comidas, se borran. La pantalla lo avisa y te pide confirmar.",
				id: "coach-meal-plan-copy",
				question: "¿Puedo copiar el plan de otro estudiante?",
			},
			{
				answer: "Los de Catálogo vienen cargados en la app; los Propios los creaste vos. Si editás uno del catálogo pasa a figurar como Catálogo, editado, y el cambio vale solo para vos. Tocando un ejercicio ves su ficha con la imagen o el video.",
				id: "coach-exercises",
				question: "¿Qué diferencia hay entre un ejercicio de Catálogo y uno Propio?",
			},
		],
		title: "Plan alimenticio y ejercicios",
	},
	{
		description: "Situaciones del día a día y cómo resolverlas.",
		id: "coach-troubleshooting",
		items: [
			{
				answer: "Que el estudiante entrenó y tocó Terminar día. Lo que cargó lo ves en su Historial. Podés seguir editando ese día, pero si quitás un ejercicio que ya tenía series cargadas, la rutina deja de coincidir con lo que el estudiante hizo.",
				id: "coach-finalized-day",
				question: "¿Qué significa que un día esté terminado?",
			},
			{
				answer: "Si no está en Estudiantes, crealo con Nuevo estudiante. Si está pero su rutina aparece vacía, revisá que estés mirando el mes correcto: cada mes se arma por separado, desde cero o copiando otro.",
				id: "coach-student-missing",
				question: "¿Qué hago si un estudiante no aparece o no tiene rutina?",
			},
		],
		title: "Problemas comunes",
	},
];

const ADMIN_FAQ_SECTIONS: FaqSection[] = [
	{
		description: "Consultas habituales para administrar las cuentas.",
		id: "admin-users",
		items: [
			{
				answer: "Entrá en Usuarios y creá la cuenta con el rol que corresponda. Completá los datos obligatorios y, al terminar, confirmá en el listado que la cuenta quedó cargada.",
				id: "admin-create-user",
				question: "¿Cómo creo un usuario nuevo?",
			},
			{
				answer: "El administrador maneja los usuarios y el catálogo global de ejercicios. El entrenador trabaja con sus estudiantes: rutinas, plan alimenticio y seguimiento. El estudiante solo ve lo suyo y registra sus entrenamientos.",
				id: "admin-roles",
				question: "¿Qué diferencia hay entre administrador, entrenador y estudiante?",
			},
			{
				answer: "Desde Usuarios abrí la cuenta para actualizar sus datos o cambiar su estado. Antes de desactivar a un entrenador, revisá si todavía tiene estudiantes a cargo.",
				id: "admin-edit-user",
				question: "¿Cómo edito o desactivo un usuario?",
			},
		],
		title: "Usuarios",
	},
	{
		description: "El catálogo de ejercicios que comparten todos los entrenadores.",
		id: "admin-exercises",
		items: [
			{
				answer: "En Ejercicios globales corregís los datos del catálogo base: nombre, categoría, músculos, equipamiento e instrucciones. También podés desactivar un ejercicio para que deje de ofrecerse en rutinas nuevas. Desde esta pantalla no se crean ejercicios nuevos: cada entrenador crea los suyos.",
				id: "admin-global-exercises",
				question: "¿Cómo gestiono los ejercicios globales?",
			},
			{
				answer: "Los globales son la base común que ven todos los entrenadores. Los del entrenador son los que crea cada uno, o su copia editada de uno global: esos cambios valen solo para él y no afectan al resto.",
				id: "admin-global-vs-coach",
				question: "¿Qué diferencia hay entre un ejercicio global y uno del entrenador?",
			},
		],
		title: "Ejercicios globales",
	},
];

export function getFaqSectionsByRole( role: Role ): FaqSection[] {
	if (role === "COACH") {
		return COACH_FAQ_SECTIONS;
	}

	if (role === "ADMIN") {
		return ADMIN_FAQ_SECTIONS;
	}

	return STUDENT_FAQ_SECTIONS;
}

export function getDashboardHrefByRole( role: Role ) {
	if (role === "COACH") {
		return "/coach/dashboard";
	}

	if (role === "ADMIN") {
		return "/admin/dashboard";
	}

	return "/student/dashboard";
}

export function getRoleAudienceLabel( role: Role ) {
	if (role === "COACH") {
		return "Entrenadores";
	}

	if (role === "ADMIN") {
		return "Administradores";
	}

	return "Estudiantes";
}
