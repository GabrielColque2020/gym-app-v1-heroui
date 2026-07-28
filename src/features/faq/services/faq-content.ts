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
		description: "Guia rapida para encontrar tu rutina, avanzar en cada sesion y guardar todo correctamente.",
		id: "student-routine",
		items: [
			{
				answer: "Tienes dos formas simples de llegar. La mas directa es abrir Rutina de Entrenamiento desde el menu lateral. Si en tu dashboard aparece un acceso rapido al proximo entrenamiento, tambien puedes entrar por ahi. Cuando abras la pantalla, primero revisa el periodo de arriba para confirmar que estas viendo el mes y el anio correctos. Despues elige la semana disponible y entra en el dia que quieras trabajar. Si no encuentras nada, normalmente significa que todavia no tienes una rutina cargada para ese periodo.",
				id: "student-routine-where",
				question: "Donde veo mi rutina actual?",
			},
			{
				answer: "Hazlo desde la parte superior de la pantalla de Rutina de Entrenamiento. Primero cambia el mes o el anio si hace falta. Despues selecciona la semana que quieres revisar. La idea es ir en este orden: 1. elegir el periodo, 2. elegir la semana y 3. abrir el dia. Si cambias de mes y la pantalla queda vacia, no significa necesariamente que haya un error; muchas veces solo indica que tu coach todavia no cargo una rutina en ese periodo.",
				id: "student-routine-period",
				question: "Como cambio de semana o de mes en mi rutina?",
			},
			{
				answer: "Entra al dia que vas a entrenar y completa cada ejercicio con los datos que te pida la pantalla. A medida que avances, revisa que las series, repeticiones o pesos queden como realmente los hiciste. Antes de cerrar, mira el resumen del dia y despues toca Guardar progreso. Ese es el paso que confirma tu sesion. Si sales antes de guardar, el avance puede quedar incompleto o directamente no registrarse. Mi recomendacion es guardar cuando termines el bloque completo de entrenamiento y no dejarlo para mas tarde.",
				id: "student-routine-save",
				question: "Como guardo el progreso de una rutina?",
			},
			{
				answer: "Quiere decir que ese dia ya fue guardado como realizado y que el sistema lo toma como parte de tu historial. En otras palabras, esa sesion ya quedo registrada. Por eso, cuando un dia esta finalizado, ya no se interpreta como un borrador sino como un entrenamiento cerrado. Si notas que algo del contenido deberia cambiarse, por ejemplo un ejercicio mal cargado o una estructura distinta, lo correcto es avisarle a tu coach para que lo revise desde su panel.",
				id: "student-routine-finalized",
				question: "Que significa que una rutina quede finalizada?",
			},
		],
		title: "Rutinas",
	},
	{
		description: "Conceptos utiles para interpretar mejor tus ejercicios, variantes y registros anteriores.",
		id: "student-exercises",
		items: [
			{
				answer: "Significa que tu coach eligio una version alternativa del ejercicio original para esa sesion. Esto suele pasar cuando quiere adaptarte el movimiento, cambiar el equipamiento disponible o ajustar la dificultad. Por ejemplo, puede mantener la misma idea del ejercicio pero con otra maquina, otro agarre o una version mas simple o mas exigente. No te preocupes: lo importante es seguir lo que ves en tu pantalla en ese dia, porque esa es la version que realmente debes hacer.",
				id: "student-exercise-changed",
				question: "Que significa Ejercicio cambiado?",
			},
			{
				answer: "Entra al ejercicio y busca el bloque Ultima sesion. Si ya habias hecho ese ejercicio antes, ahi vas a ver una referencia de la fecha y, segun el caso, repeticiones, peso o series registradas. Te sirve mucho para comparar como te fue la vez pasada antes de empezar. Si ese bloque no aparece, normalmente significa una de estas dos cosas: o es la primera vez que haces ese ejercicio, o todavia no hay un registro previo guardado para esa variante puntual.",
				id: "student-last-session",
				question: "Donde veo mi ultima sesion?",
			},
		],
		title: "Ejercicios",
	},
	{
		description: "Accesos utiles para revisar la parte nutricional y el historial de tu seguimiento.",
		id: "student-follow-up",
		items: [
			{
				answer: "Abre Planes Alimenticios desde el menu lateral. Ahi deberias ver el plan que esta cargado para tu cuenta, normalmente organizado por comidas, momentos del dia o bloques. Lo mejor es revisar primero si tienes un plan activo y despues entrar en cada bloque para leerlo con calma. Si la pantalla aparece vacia, lo mas probable es que todavia no tengas un plan asignado o que tu coach aun no lo haya cargado.",
				id: "student-meal-plans",
				question: "Donde veo mis planes alimenticios?",
			},
			{
				answer: "Entra en Historial de Rutina desde el menu lateral. Una vez dentro, revisa el periodo que aparece en pantalla y busca el mes que quieras consultar. Desde ahi puedes ver sesiones anteriores y, en algunos casos, descargar o revisar reportes relacionados con tu progreso. Si estas buscando un entrenamiento puntual y no lo encuentras enseguida, lo primero que conviene comprobar es que estes mirando el mes correcto.",
				id: "student-history",
				question: "Donde consulto mi historial de rutinas?",
			},
		],
		title: "Seguimiento",
	},
];

const COACH_FAQ_SECTIONS: FaqSection[] = [
	{
		description: "Pasos basicos para entrar a la rutina del alumno y trabajarla sin perderte en el flujo.",
		id: "coach-routine",
		items: [
			{
				answer: "Empieza en Rutinas por Estudiantes desde el menu lateral. Busca al alumno en el listado, abre su rutina mensual y despues entra en la semana que quieras revisar. Desde ahi ya puedes abrir el dia puntual para editarlo. Si quieres orientarte rapido, piensa el recorrido asi: 1. elegir estudiante, 2. abrir mes, 3. elegir semana y 4. entrar al dia. Ese es el flujo base para casi cualquier ajuste de rutina.",
				id: "coach-routine-student",
				question: "Como entro a la rutina de un estudiante?",
			},
			{
				answer: "Abre el dia de rutina que quieres trabajar y usa el editor como tu espacio de armado. Desde ahi puedes agregar ejercicios, cambiar el orden, ajustar series, repeticiones y observaciones. Cuando termines, guarda los cambios antes de salir. Ese ultimo paso es importante: si cierras la pantalla sin guardar, el alumno puede seguir viendo la version anterior o quedar con un borrador incompleto.",
				id: "coach-routine-edit",
				question: "Como creo o edito una rutina?",
			},
			{
				answer: "Dentro del dia toca el boton para agregar ejercicios. Se va a abrir un drawer con el catalogo disponible. Desde ahi puedes buscar por nombre o usar filtros para encontrar algo mas rapido. Cuando elijas el ejercicio, agregalo al borrador y despues revisa cuatro cosas antes de guardar: el orden, las series, las repeticiones y las observaciones. Con eso te aseguras de que el dia quede realmente listo para el alumno.",
				id: "coach-routine-add-exercise",
				question: "Como agrego ejercicios a un dia?",
			},
			{
				answer: "Cada ejercicio tiene campos editables para orden, series, repeticiones y notas. En desktop normalmente los ves directo en la grilla o en el listado. En mobile suelen aparecer dentro del bloque de edicion de detalles. Lo ideal es ajustar cada campo con calma y despues guardar al final del dia, no ejercicio por ejercicio, para revisar antes si toda la estructura tiene sentido.",
				id: "coach-routine-fields",
				question: "Como cambio el orden, series y repeticiones?",
			},
		],
		title: "Rutinas",
	},
	{
		description: "Aclaraciones practicas para trabajar con variantes y reaprovechar programaciones anteriores.",
		id: "coach-variants",
		items: [
			{
				answer: "En las acciones del ejercicio entra en Variantes. Ahi puedes vincular alternativas, agregar nuevas opciones o sacar las que ya no correspondan. Si el ejercicio todavia no quedo guardado dentro del dia, primero guarda la rutina y despues vuelve a abrir las variantes. El orden recomendado es este: 1. crear o dejar persistido el ejercicio, 2. abrir Variantes, 3. ajustar las opciones y 4. guardar nuevamente para confirmar los cambios.",
				id: "coach-routine-variants",
				question: "Como agrego variantes a un ejercicio?",
			},
			{
				answer: "Dentro de la rutina mensual del estudiante busca la opcion para copiar rutina. Normalmente el flujo es: primero eliges el periodo de origen, despues seleccionas la semana que quieres traer y por ultimo confirmas la copia. Una vez copiada la estructura, no la des por terminada automaticamente: revisa cada dia y adapta ejercicios, series, repeticiones y notas segun el contexto actual del alumno. Esta funcion te ahorra mucho tiempo, pero siempre conviene hacer una pasada final antes de dejarla publicada.",
				id: "coach-routine-copy",
				question: "Como copio una rutina de otra semana o mes?",
			},
		],
		title: "Variantes y reutilizacion",
	},
	{
		description: "Situaciones comunes del dia a dia y como resolverlas sin perder tiempo.",
		id: "coach-troubleshooting",
		items: [
			{
				answer: "Quiere decir que el alumno ya entreno ese dia y guardo progreso. Desde ese momento, la rutina deja de ser solo una planificacion y pasa a formar parte del historial real. Puedes revisarla, pero si vas a modificar ejercicios o estructura, hazlo con cuidado porque podrias desalinear lo que el sistema muestra con lo que el alumno realmente hizo. Si el cambio es importante, lo mejor es revisar primero el contexto del registro antes de tocar el contenido.",
				id: "coach-finalized-day",
				question: "Que significa que un dia este finalizado?",
			},
			{
				answer: "Lo primero es comprobar si el estudiante aparece en tu listado principal. Si aparece ahi pero no dentro de un modulo concreto, por ejemplo rutinas, planes o historial, normalmente no es un problema del usuario sino de datos faltantes en ese flujo. La forma mas practica de revisarlo es: 1. confirmar que el alumno exista, 2. abrir el modulo donde falta informacion y 3. verificar si realmente hay contenido cargado para ese periodo o seccion. Muchas veces el alumno si existe, pero todavia no tiene una rutina o un plan asociado.",
				id: "coach-student-missing",
				question: "Que hago si un estudiante no aparece o no tiene rutina?",
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
				answer: "Entra en Usuarios y crea la cuenta segun el rol que necesites. Completa los datos obligatorios, revisa que el rol sea el correcto y antes de cerrar confirma que la cuenta haya quedado lista para iniciar sesion. Si estas creando un coach o un estudiante, conviene hacer una comprobacion extra despues: entrar de nuevo en el listado y validar que la cuenta se vea bien y que no falte informacion basica para operar.",
				id: "admin-create-user",
				question: "Como creo un usuario nuevo?",
			},
			{
				answer: "La diferencia principal esta en hasta donde puede llegar cada usuario dentro de la app. Admin se ocupa de la configuracion general, los usuarios y los catalogos globales. Coach trabaja sobre estudiantes, rutinas, planes y seguimiento diario. Student solo ve su propia informacion y registra su progreso. Pensarlo asi ayuda mucho: admin configura, coach gestiona y student ejecuta y consulta.",
				id: "admin-roles",
				question: "Que diferencia hay entre admin, coach y student?",
			},
			{
				answer: "Desde Usuarios puedes abrir la cuenta, actualizar sus datos y cambiar su estado cuando necesites limitar o devolver acceso. Antes de desactivar a alguien, vale la pena revisar si esa persona todavia participa en procesos activos, por ejemplo si sigue teniendo alumnos asignados o si forma parte de un flujo operativo importante. Eso evita bastante confusion despues, sobre todo cuando alguien deja de aparecer en ciertos listados.",
				id: "admin-edit-user",
				question: "Como edito o desactivo usuarios?",
			},
		],
		title: "Usuarios",
	},
	{
		description: "Puntos clave para mantener prolijo el catalogo compartido de ejercicios.",
		id: "admin-exercises",
		items: [
			{
				answer: "En Ejercicios globales puedes crear, editar y mantener el catalogo base que despues reutiliza el resto del sistema. Lo ideal es cargar cada ejercicio de la forma mas completa posible: nombre, categoria, imagen, video y cualquier dato que ayude a identificarlo bien. Cuanto mejor quede cargado aca, mas consistente va a verse despues en rutinas, variantes y otras pantallas.",
				id: "admin-global-exercises",
				question: "Como gestiono ejercicios globales?",
			},
			{
				answer: "Usa ejercicios globales cuando quieras mantener una base comun, prolija y reutilizable para todo el sistema. En cambio, los ejercicios del coach sirven mejor para necesidades mas puntuales o adaptaciones especificas de su trabajo diario. Una forma simple de decidirlo es esta: si quieres estandarizar, crea algo global; si quieres personalizar para un caso concreto, deja que viva en el catalogo del coach.",
				id: "admin-global-vs-coach",
				question: "Cuando conviene usar ejercicios globales y cuando ejercicios del coach?",
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
