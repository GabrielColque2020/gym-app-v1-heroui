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
		description: "Guía rápida para encontrar tu rutina, avanzar en cada sesión y guardar todo correctamente.",
		id: "student-routine",
		items: [
			{
				answer: "Tienes dos formas simples de llegar. La más directa es abrir Rutina de Entrenamiento desde el menú lateral. Si en tu dashboard aparece un acceso rápido al próximo entrenamiento, también puedes entrar por ahí. Cuando abras la pantalla, primero revisa el periodo de arriba para confirmar que estás viendo el mes y el año correctos. Después elige la semana disponible y entra en el día que quieras trabajar. Si no encuentras nada, normalmente significa que todavía no tienes una rutina cargada para ese periodo.",
				id: "student-routine-where",
				question: "¿Dónde veo mi rutina actual?",
			},
			{
				answer: "Hazlo desde la parte superior de la pantalla de Rutina de Entrenamiento. Primero cambia el mes o el año si hace falta. Después selecciona la semana que quieres revisar. La idea es ir en este orden: 1. elegir el periodo, 2. elegir la semana y 3. abrir el día. Si cambias de mes y la pantalla queda vacia, no significa necesariamente que haya un error; muchas veces solo indica que tu coach todavía no cargo una rutina en ese periodo.",
				id: "student-routine-period",
				question: "¿Cómo cambio de semana o de mes en mi rutina?",
			},
			{
				answer: "Entra al día que vas a entrenar y completa cada ejercicio con los datos que te pida la pantalla. A medida que avances, revisa que las series, repeticiones o pesos queden como realmente los hiciste. Antes de cerrar, mira el resumen del día y después toca Guardar progreso. Ese es el paso que confirma tu sesión. Si sales antes de guardar, el avance puede quedar incompleto o directamente no registrarse. Mi recomendación es guardar cuando termines el bloque completo de entrenamiento y no dejarlo para más tarde.",
				id: "student-routine-save",
				question: "¿Cómo guardo el progreso de una rutina?",
			},
			{
				answer: "Quiere decir que ese día ya fue guardado como realizado y que el sistema lo toma como parte de tu historial. En otras palabras, esa sesión ya quedó registrada. Por eso, cuando un día esta finalizado, ya no se interpreta como un borrador sino como un entrenamiento cerrado. Si notas que algo del contenido debería cambiarse, por ejemplo un ejercicio mal cargado o una estructura distinta, lo correcto es avisarle a tu coach para que lo revise desde su panel.",
				id: "student-routine-finalized",
				question: "¿Qué significa que una rutina quede finalizada?",
			},
		],
		title: "Rutinas",
	},
	{
		description: "Conceptos útiles para interpretar mejor tus ejercicios, variantes y registros anteriores.",
		id: "student-exercises",
		items: [
			{
				answer: "Significa que tu coach eligió una versión alternativa del ejercicio original para esa sesión. Esto suele pasar cuando quiere adaptarte el movimiento, cambiar el equipamiento disponible o ajustar la dificultad. Por ejemplo, puede mantener la misma idea del ejercicio pero con otra maquina, otro agarre o una versión más simple o más exigente. No te preocupes: lo importante es seguir lo que ves en tu pantalla en ese día, porque esa es la versión que realmente debes hacer.",
				id: "student-exercise-changed",
				question: "¿Qué significa Ejercicio cambiado?",
			},
			{
				answer: "Entra al ejercicio y busca el bloque Última sesión. Si ya habías hecho ese ejercicio antes, ahí vas a ver una referencia de la fecha y, según el caso, repeticiones, peso o series registradas. Te sirve mucho para comparar como te fue la vez pasada antes de empezar. Si ese bloque no aparece, normalmente significa una de estas dos cosas: o es la primera vez que haces ese ejercicio, o todavía no hay un registro previo guardado para esa variante puntual.",
				id: "student-last-session",
				question: "¿Dónde veo mi última sesión?",
			},
		],
		title: "Ejercicios",
	},
	{
		description: "Accesos útiles para revisar la parte nutricional y el historial de tu seguimiento.",
		id: "student-follow-up",
		items: [
			{
				answer: "Abre Plan alimenticio desde el menú lateral. Ahí deberías ver el plan que está cargado para tu cuenta, normalmente organizado por comidas, momentos del día o bloques. Lo mejor es revisar primero si tienes un plan activo y después entrar en cada bloque para leerlo con calma. Si la pantalla aparece vacía, lo más probable es que todavía no tengas un plan asignado o que tu coach aún no lo haya cargado.",
				id: "student-meal-plans",
				question: "¿Dónde veo mis planes alimenticios?",
			},
			{
				answer: "Entra en Historial de Rutina desde el menú lateral. Una vez dentro, revisa el periodo que aparece en pantalla y busca el mes que quieras consultar. Desde ahí puedes ver sesiones anteriores y, en algunos casos, descargar o revisar reportes relacionados con tu progreso. Si estás buscando un entrenamiento puntual y no lo encuentras enseguida, lo primero que conviene comprobar es que estés mirando el mes correcto.",
				id: "student-history",
				question: "¿Dónde consulto mi historial de rutinas?",
			},
		],
		title: "Seguimiento",
	},
];

const COACH_FAQ_SECTIONS: FaqSection[] = [
	{
		description: "Pasos básicos para entrar a la rutina del alumno y trabajarla sin perderte en el flujo.",
		id: "coach-routine",
		items: [
			{
				answer: "Empieza en Estudiantes desde el menú lateral. Busca al alumno en el listado y abre su ficha: entra directo a la rutina del mes, y desde las pestañas de arriba pasas al plan alimenticio o al historial. Después entra en la semana que quieras revisar. Desde ahí ya puedes abrir el día puntual para editarlo. Si quieres orientarte rápido, piensa el recorrido así: 1. elegir estudiante, 2. abrir mes, 3. elegir semana y 4. entrar al día. Ese es el flujo base para casi cualquier ajuste de rutina.",
				id: "coach-routine-student",
				question: "¿Cómo entro a la rutina de un estudiante?",
			},
			{
				answer: "Abre el día de rutina que quieres trabajar y usa el editor como tu espacio de armado. Desde ahí puedes agregar ejercicios, cambiar el orden, ajustar series, repeticiones y observaciones. Cuando termines, guarda los cambios antes de salir. Ese último paso es importante: si cierras la pantalla sin guardar, el alumno puede seguir viendo la versión anterior o quedar con un borrador incompleto.",
				id: "coach-routine-edit",
				question: "¿Cómo creo o edito una rutina?",
			},
			{
				answer: "Dentro del día toca el botón para agregar ejercicios. Se va a abrir un drawer con el catálogo disponible. Desde ahí puedes buscar por nombre o usar filtros para encontrar algo más rápido. Cuando elijas el ejercicio, agregalo al borrador y después revisa cuatro cosas antes de guardar: el orden, las series, las repeticiones y las observaciones. Con eso te aseguras de que el día quede realmente listo para el alumno.",
				id: "coach-routine-add-exercise",
				question: "¿Cómo agrego ejercicios a un día?",
			},
			{
				answer: "Cada ejercicio tiene campos editables para orden, series, repeticiones y notas. En desktop normalmente los ves directo en la grilla o en el listado. En mobile suelen aparecer dentro del bloque de edición de detalles. Lo ideal es ajustar cada campo con calma y después guardar al final del día, no ejercicio por ejercicio, para revisar antes si toda la estructura tiene sentido.",
				id: "coach-routine-fields",
				question: "¿Cómo cambio el orden, series y repeticiones?",
			},
		],
		title: "Rutinas",
	},
	{
		description: "Aclaraciones practicas para trabajar con variantes y reaprovechar programaciones anteriores.",
		id: "coach-variants",
		items: [
			{
				answer: "En las acciones del ejercicio entra en Variantes. Ahí puedes vincular alternativas, agregar nuevas opciones o sacar las que ya no correspondan. Si el ejercicio todavía no quedó guardado dentro del día, primero guarda la rutina y después vuelve a abrir las variantes. El orden recomendado es este: 1. crear o dejar persistido el ejercicio, 2. abrir Variantes, 3. ajustar las opciones y 4. guardar nuevamente para confirmar los cambios.",
				id: "coach-routine-variants",
				question: "¿Cómo agrego variantes a un ejercicio?",
			},
			{
				answer: "Dentro de la rutina mensual del estudiante busca la opción para copiar rutina. Normalmente el flujo es: primero eliges el periodo de origen, después seleccionas la semana que quieres traer y por último confirmas la copia. Una vez copiada la estructura, no la des por terminada automaticamente: revisa cada día y adapta ejercicios, series, repeticiones y notas según el contexto actual del alumno. Esta función te ahorra mucho tiempo, pero siempre conviene hacer una pasada final antes de dejarla publicada.",
				id: "coach-routine-copy",
				question: "¿Cómo copio una rutina de otra semana o mes?",
			},
		],
		title: "Variantes y reutilización",
	},
	{
		description: "Situaciones comunes del día a día y como resolverlas sin perder tiempo.",
		id: "coach-troubleshooting",
		items: [
			{
				answer: "Quiere decir que el alumno ya entreno ese día y guardo progreso. Desde ese momento, la rutina deja de ser solo una planificación y pasa a formar parte del historial real. Puedes revisarla, pero si vas a modificar ejercicios o estructura, hazlo con cuidado porque podrias desalinear lo que el sistema muestra con lo que el alumno realmente hizo. Si el cambio es importante, lo mejor es revisar primero el contexto del registro antes de tocar el contenido.",
				id: "coach-finalized-day",
				question: "¿Qué significa que un día esté finalizado?",
			},
			{
				answer: "Lo primero es comprobar si el estudiante aparece en tu listado principal. Si aparece ahí pero no dentro de un módulo concreto, por ejemplo rutinas, planes o historial, normalmente no es un problema del usuario sino de datos faltantes en ese flujo. La forma más practica de revisarlo es: 1. confirmar que el alumno exista, 2. abrir el módulo donde falta información y 3. verificar si realmente hay contenido cargado para ese periodo o sección. Muchas veces el alumno si existe, pero todavía no tiene una rutina o un plan asociado.",
				id: "coach-student-missing",
				question: "¿Qué hago si un estudiante no aparece o no tiene rutina?",
			},
		],
		title: "Problemas comunes",
	},
];

const ADMIN_FAQ_SECTIONS: FaqSection[] = [
	{
		description: "Consultas habituales para administrar usuarios y mantener el sistema ordenado.",
		id: "admin-users",
		items: [
			{
				answer: "Entra en Usuarios y crea la cuenta según el rol que necesites. Completa los datos obligatorios, revisa que el rol sea el correcto y antes de cerrar confirma que la cuenta haya quedado lista para iniciar sesión. Si estas creando un coach o un estudiante, conviene hacer una comprobación extra despues: entrar de nuevo en el listado y validar que la cuenta se vea bien y que no falte información básica para operar.",
				id: "admin-create-user",
				question: "¿Cómo creo un usuario nuevo?",
			},
			{
				answer: "La diferencia principal esta en hasta donde puede llegar cada usuario dentro de la app. Admin se ocupa de la configuración general, los usuarios y los catálogos globales. Coach trabaja sobre estudiantes, rutinas, planes y seguimiento diario. Student solo ve su propia información y registra su progreso. Pensarlo así ayuda mucho: admin configura, coach gestiona y student ejecuta y consulta.",
				id: "admin-roles",
				question: "¿Qué diferencia hay entre admin, coach y student?",
			},
			{
				answer: "Desde Usuarios puedes abrir la cuenta, actualizar sus datos y cambiar su estado cuando necesites limitar o devolver acceso. Antes de desactivar a alguien, vale la pena revisar si esa persona todavía participa en procesos activos, por ejemplo si sigue teniendo alumnos asignados o si forma parte de un flujo operativo importante. Eso evita bastante confusion después, sobre todo cuando alguien deja de aparecer en ciertos listados.",
				id: "admin-edit-user",
				question: "¿Cómo edito o desactivo usuarios?",
			},
		],
		title: "Usuarios",
	},
	{
		description: "Puntos clave para mantener prolijo el catálogo compartido de ejercicios.",
		id: "admin-exercises",
		items: [
			{
				answer: "En Ejercicios globales puedes crear, editar y mantener el catálogo base que después reutiliza el resto del sistema. Lo ideal es cargar cada ejercicio de la forma más completa posible: nombre, categoría, imagen, video y cualquier dato que ayude a identificarlo bien. Cuanto mejor quede cargado aca, más consistente va a verse después en rutinas, variantes y otras pantallas.",
				id: "admin-global-exercises",
				question: "¿Cómo gestiono ejercicios globales?",
			},
			{
				answer: "Usa ejercicios globales cuando quieras mantener una base común, prolija y reutilizable para todo el sistema. En cambio, los ejercicios del coach sirven mejor para necesidades más puntuales o adaptaciones especificas de su trabajo diario. Una forma simple de decidirlo es esta: si quieres estandarizar, crea algo global; si quieres personalizar para un caso concreto, deja que viva en el catálogo del coach.",
				id: "admin-global-vs-coach",
				question: "¿Cuándo conviene usar ejercicios globales y cuándo ejercicios del coach?",
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
