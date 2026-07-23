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
		description: "Respuestas rapidas para consultar, completar y guardar la rutina.",
		id: "student-routine",
		items: [
			{
				answer: "Puedes entrar desde dos lugares. Opcion 1: abre Rutina de Entrenamiento en el menu lateral. Opcion 2: entra desde el dashboard si tienes un acceso directo al proximo dia. Una vez dentro, revisa el filtro superior para confirmar mes y anio, elige la semana disponible y abre el dia que quieras trabajar.",
				id: "student-routine-where",
				question: "Donde veo mi rutina actual?",
			},
			{
				answer: "Dentro de Rutina de Entrenamiento usa el filtro superior para cambiar mes y anio. Despues selecciona la semana que quieres consultar. Si no ves resultados, prueba otro mes o revisa si tu coach ya cargo una rutina para ese periodo.",
				id: "student-routine-period",
				question: "Como cambio de semana o de mes en mi rutina?",
			},
			{
				answer: "Abre el dia de rutina, completa las series correspondientes en cada ejercicio y revisa el resumen antes de confirmar. Luego pulsa Guardar progreso. Si el guardado se realiza bien, el sistema registra tus cambios y actualiza el estado de ese dia. Recomendacion: guarda al terminar el bloque de trabajo para no dejar el avance a mitad de camino.",
				id: "student-routine-save",
				question: "Como guardo el progreso de una rutina?",
			},
			{
				answer: "Significa que ese dia ya tiene un progreso guardado y el sistema lo reconoce como cerrado para seguimiento. En la practica, indica que tu sesion de ese dia ya fue registrada. Si el contenido del entrenamiento necesita cambios, esos ajustes deben hacerlos tu coach desde su panel.",
				id: "student-routine-finalized",
				question: "Que significa que una rutina quede finalizada?",
			},
		],
		title: "Rutinas",
	},
	{
		description: "Conceptos utiles para entender mejor cada ejercicio y su historial.",
		id: "student-exercises",
		items: [
			{
				answer: "Significa que para ese ejercicio se selecciono una variante diferente al ejercicio base original. Esto puede pasar cuando tu coach adapta el movimiento por comodidad, disponibilidad de equipamiento o nivel de dificultad. La rutina siempre te mostrara cual es el ejercicio que debes ejecutar en esa sesion.",
				id: "student-exercise-changed",
				question: "Que significa Ejercicio cambiado?",
			},
			{
				answer: "Dentro de cada ejercicio veras el bloque Ultima sesion cuando exista un registro anterior. Ahi se muestra la fecha y, segun el caso, datos como repeticiones, peso o series completadas. Si no aparece informacion previa, quiere decir que todavia no hay un historial guardado para ese ejercicio o variante.",
				id: "student-last-session",
				question: "Donde veo mi ultima sesion?",
			},
		],
		title: "Ejercicios",
	},
	{
		description: "Accesos rapidos para revisar informacion complementaria de tu seguimiento.",
		id: "student-follow-up",
		items: [
			{
				answer: "Entra en Planes Alimenticios por Estudiantes desde el menu lateral. Alli veras el plan disponible para tu cuenta y, si corresponde, su distribucion por comidas o bloques. Si no aparece contenido, puede significar que todavia no se cargo un plan para ti.",
				id: "student-meal-plans",
				question: "Donde veo mis planes alimenticios?",
			},
			{
				answer: "Entra en Historial de Rutina desde el menu lateral. Desde ahi puedes revisar avances registrados en otros periodos y consultar reportes relacionados con tu progreso. Si estas buscando una sesion puntual, primero verifica el mes o el periodo mostrado en pantalla.",
				id: "student-history",
				question: "Donde consulto mi historial de rutinas?",
			},
		],
		title: "Seguimiento",
	},
];

const COACH_FAQ_SECTIONS: FaqSection[] = [
	{
		description: "Preguntas frecuentes para organizar la rutina de cada estudiante.",
		id: "coach-routine",
		items: [
			{
				answer: "Entra en Rutinas por Estudiantes desde el menu lateral. Busca al alumno en el listado y abre su plan mensual. Luego selecciona la semana que quieres revisar y, dentro de esa semana, entra al dia correspondiente para crear o editar ejercicios.",
				id: "coach-routine-student",
				question: "Como entro a la rutina de un estudiante?",
			},
			{
				answer: "Abre el dia de rutina que quieres trabajar. Dentro del editor puedes agregar ejercicios, reordenarlos, cambiar series, repeticiones y notas. Cuando termines, guarda los cambios para que queden persistidos. Si sales sin guardar, el borrador puede no reflejarse en la rutina final del estudiante.",
				id: "coach-routine-edit",
				question: "Como creo o edito una rutina?",
			},
			{
				answer: "Dentro del dia usa el boton para agregar ejercicios. Se abrira un drawer con el catalogo activo. Busca por nombre o filtra segun lo que necesites, elige el ejercicio y agregalo al borrador. Despues revisa orden, series, repeticiones y observaciones antes de guardar la rutina.",
				id: "coach-routine-add-exercise",
				question: "Como agrego ejercicios a un dia?",
			},
			{
				answer: "Cada ejercicio del dia tiene campos editables para orden, series, repeticiones y notas. En desktop los veras directamente en la grilla o listado. En mobile aparecen dentro del bloque Editar detalles. Cambia los valores necesarios y guarda al finalizar para confirmar la version definitiva del dia.",
				id: "coach-routine-fields",
				question: "Como cambio el orden, series y repeticiones?",
			},
		],
		title: "Rutinas",
	},
	{
		description: "Aclaraciones utiles para variantes y reutilizacion de contenido.",
		id: "coach-variants",
		items: [
			{
				answer: "En las acciones del ejercicio abre Variantes. Alli puedes asociar alternativas disponibles para esa rutina, agregar nuevas opciones o quitar las que no correspondan. Si el ejercicio todavia no esta persistido dentro de la rutina, primero guarda el dia. Una vez terminada la seleccion de variantes, vuelve a guardar para dejar los cambios aplicados.",
				id: "coach-routine-variants",
				question: "Como agrego variantes a un ejercicio?",
			},
			{
				answer: "Dentro de la rutina mensual del estudiante, busca la opcion de copiar rutina en la semana o el bloque que quieres completar. Normalmente primero eliges el periodo de origen, por ejemplo otro mes o anio, y despues seleccionas la semana especifica que quieres reutilizar. Una vez copiada la estructura, revisa cada dia para ajustar ejercicios, series, repeticiones o notas segun el nuevo contexto. Esta herramienta es especialmente util cuando trabajas programaciones parecidas entre semanas o cuando quieres traer una base de un mes anterior sin volver a cargar todo manualmente.",
				id: "coach-routine-copy",
				question: "Como copio una rutina de otra semana o mes?",
			},
		],
		title: "Variantes y reutilizacion",
	},
	{
		description: "Casos comunes que suelen generar dudas operativas.",
		id: "coach-troubleshooting",
		items: [
			{
				answer: "Significa que el estudiante ya guardo progreso sobre ese dia. Eso indica que la rutina ya tuvo ejecucion real y forma parte del seguimiento. Puedes revisarla, pero si haces cambios sobre contenido, ejercicios o estructura, conviene hacerlo con criterio para no desalinear el historial del alumno con lo que efectivamente entreno.",
				id: "coach-finalized-day",
				question: "Que significa que un dia este finalizado?",
			},
			{
				answer: "Primero revisa que el estudiante exista en tu listado operativo. Despues confirma que tenga informacion cargada para ese modulo concreto, por ejemplo rutina, plan o historial. Si aparece en una seccion pero no en otra, el problema suele ser falta de datos asociados en ese flujo especifico.",
				id: "coach-student-missing",
				question: "Que hago si un estudiante no aparece o no tiene rutina?",
			},
		],
		title: "Problemas comunes",
	},
];

const ADMIN_FAQ_SECTIONS: FaqSection[] = [
	{
		description: "Dudas frecuentes sobre gestion general del sistema.",
		id: "admin-users",
		items: [
			{
				answer: "Entra en Usuarios y crea el registro segun el rol que necesites. Completa los datos requeridos y revisa que la cuenta quede configurada correctamente antes de cerrar. Si el usuario es estudiante o coach, conviene validar tambien que su informacion operativa basica quede lista para usar el sistema.",
				id: "admin-create-user",
				question: "Como creo un usuario nuevo?",
			},
			{
				answer: "Admin administra configuracion general, usuarios y catalogos globales. Coach trabaja sobre estudiantes, rutinas, planes y seguimiento operativo. Student consulta su propia informacion y registra su progreso. Esta separacion ayuda a limitar cada vista y accion al rol que realmente la necesita.",
				id: "admin-roles",
				question: "Que diferencia hay entre admin, coach y student?",
			},
			{
				answer: "Desde Usuarios puedes editar datos de la cuenta y cambiar su estado cuando necesites limitar o restablecer acceso. Antes de desactivar, conviene revisar si ese usuario participa en procesos activos para evitar confusiones operativas posteriores.",
				id: "admin-edit-user",
				question: "Como edito o desactivo usuarios?",
			},
		],
		title: "Usuarios",
	},
	{
		description: "Respuestas rapidas para mantener el catalogo comun de ejercicios.",
		id: "admin-exercises",
		items: [
			{
				answer: "En Ejercicios globales puedes crear, actualizar y mantener el catalogo base. Lo ideal es completar nombre, categoria, imagen y demas datos relevantes para que luego otras pantallas reutilicen esa informacion de forma consistente.",
				id: "admin-global-exercises",
				question: "Como gestiono ejercicios globales?",
			},
			{
				answer: "Usa ejercicios globales cuando necesitas una referencia comun y reutilizable para varios usuarios o flujos del sistema. Usa ejercicios del coach cuando la necesidad es mas puntual, operativa o especifica de su trabajo diario. En general, lo global sirve para estandarizar y lo del coach para adaptar.",
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
