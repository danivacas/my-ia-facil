import { TaskDefinition } from '../types';

export const INITIAL_TASKS: TaskDefinition[] = [
  {
    id: 'presentation',
    title: 'Crear una presentación',
    shortDescription: 'Diseña diapositivas claras y profesionales a partir de tus notas o ideas sin bloquearte ante la pantalla en blanco.',
    categoryTag: 'Prioridad alta',
    estimatedMinutes: 8,
    highlighted: true,
    questions: [
      {
        id: 'purpose',
        label: '1. ¿Para qué necesitas la presentación?',
        description: 'Nos ayuda a calibrar el tono, la formalidad y la cantidad de detalle en cada diapositiva.',
        options: [
          { id: 'trabajo', label: 'Trabajo', detail: 'Reunión de equipo, reporte a clientes o presentación ejecutiva.' },
          { id: 'estudios', label: 'Estudios', detail: 'Exposición universitaria, instituto o defensa de proyecto.' },
          { id: 'negocio', label: 'Negocio', detail: 'Presentar una propuesta a clientes, vender un servicio o buscar apoyo.' },
          { id: 'personal', label: 'Uso personal', detail: 'Evento familiar, charla informal o proyecto aficionado.' }
        ]
      },
      {
        id: 'materials',
        label: '2. ¿Qué tienes preparado?',
        description: 'Determina si la IA debe redactar la estructura desde cero o trabajar sobre tu material.',
        options: [
          { id: 'nada', label: 'Nada todavía', detail: 'Solo tengo la idea general en la cabeza y necesito estructurarla.' },
          { id: 'texto', label: 'Un texto', detail: 'Apuntes en un bloc de notas, párrafos sueltos o un esquema previo.' },
          { id: 'documento', label: 'Un documento', detail: 'Un informe completo en PDF/Word o página web que debo resumir.' },
          { id: 'imagenes', label: 'Imágenes y otros materiales', detail: 'Tengo gráficos o fotos y necesito el guion para acompañarlas.' }
        ]
      },
      {
        id: 'experience',
        label: '3. ¿Qué experiencia tienes utilizando IA?',
        description: 'Adaptamos el nivel técnico de las instrucciones para que no te encuentres con jerga extraña.',
        options: [
          { id: 'principiante', label: 'Estoy empezando', detail: 'He oído hablar de ChatGPT o IA pero casi nunca lo he usado con éxito.' },
          { id: 'intermedio', label: 'Ya he utilizado algunas herramientas', detail: 'Conozco lo básico y busco instrucciones más directas y eficientes.' }
        ]
      },
      {
        id: 'priority',
        label: '4. ¿Qué es lo más importante para ti?',
        description: 'Equilibramos el esfuerzo y el acabado final del resultado.',
        options: [
          { id: 'facil', label: 'Que sea fácil', detail: 'El camino con menor fricción posible y sin herramientas enrevesadas.' },
          { id: 'profesional', label: 'Que tenga un resultado profesional', detail: 'Diseño cuidado, estructura sólida y contenido impecable.' },
          { id: 'rapido', label: 'Terminar rápidamente', detail: 'Tengo prisa y necesito las diapositivas listas en cuestión de minutos.' }
        ]
      }
    ]
  },
  {
    id: 'writing',
    title: 'Escribir un texto',
    shortDescription: 'Redacta correos formales, resúmenes, informes o propuestas persuasivas con un tono natural y sin sonar robótico.',
    categoryTag: 'Productividad',
    estimatedMinutes: 5,
    questions: [
      {
        id: 'text_type',
        label: '1. ¿Qué tipo de texto necesitas escribir?',
        description: 'Define la estructura y longitud óptima del texto.',
        options: [
          { id: 'correo', label: 'Un correo importante o profesional', detail: 'Para tu jefe, un cliente, una solicitud o una reclamación.' },
          { id: 'informe', label: 'Un informe o resumen', detail: 'Condensar conclusiones, datos o avances de un proyecto.' },
          { id: 'articulo', label: 'Un artículo o publicación', detail: 'Para un blog, LinkedIn o un boletín informativo.' },
          { id: 'propuesta', label: 'Una propuesta o mensaje persuasivo', detail: 'Convencer a alguien de una idea o presentar un servicio.' }
        ]
      },
      {
        id: 'input_status',
        label: '2. ¿Cuánto material tienes listo?',
        description: 'Para saber qué insumos suministrar al modelo.',
        options: [
          { id: 'idea', label: 'Solo la idea básica', detail: 'Una frase de intención: «quiero pedir un aumento» o «explicar un cambio».' },
          { id: 'notas', label: 'Puntos sueltos o notas', detail: 'Varias ideas en viñetas sin orden definitivo.' },
          { id: 'borrador', label: 'Un borrador completo', detail: 'Ya redacté algo pero suena denso, desordenado o poco convincente.' }
        ]
      },
      {
        id: 'tone',
        label: '3. ¿Qué tono buscas transmitir?',
        description: 'El estilo condiciona el vocabulario y la cortesía.',
        options: [
          { id: 'profesional', label: 'Formal y profesional', detail: 'Serio, respetuoso y con autoridad técnica.' },
          { id: 'cercano', label: 'Cercano y conversacional', detail: 'Empático, fresco y fácil de leer sin tecnicismos.' },
          { id: 'directo', label: 'Directo y conciso', detail: 'Al grano, sin rodeos ni saludos innecesarios.' }
        ]
      },
      {
        id: 'goal',
        label: '4. ¿Qué es lo más importante para ti?',
        description: 'Lo que marcará el éxito de la redacción.',
        options: [
          { id: 'humano', label: 'Que suene natural y humano', detail: 'Que nadie sospeche que se escribió con una plantilla de IA.' },
          { id: 'rapido', label: 'Terminar rápidamente', detail: 'Enviar o publicar en 5 minutos.' },
          { id: 'persuasivo', label: 'Claridad en los argumentos', detail: 'Que el lector entienda qué tiene que hacer o decidir.' }
        ]
      }
    ]
  },
  {
    id: 'research',
    title: 'Investigar un tema',
    shortDescription: 'Comprende conceptos difíciles, compara alternativas y extrae conclusiones claras sin perder horas leyendo artículos sueltos.',
    categoryTag: 'Aprendizaje',
    estimatedMinutes: 10,
    questions: [
      {
        id: 'research_goal',
        label: '1. ¿Cuál es el objetivo principal de la investigación?',
        description: 'Define la perspectiva de la búsqueda de información.',
        options: [
          { id: 'aprender', label: 'Aprender un concepto desde cero', detail: 'Comprender qué es algo nuevo sin términos incomprensibles.' },
          { id: 'comparar', label: 'Comparar dos o más alternativas', detail: 'Elegir entre herramientas, productos o métodos según pros y contras.' },
          { id: 'resumen', label: 'Obtener un resumen ejecutivo rápido', detail: 'Estar al día sobre una tendencia, ley o sector en 5 minutos.' },
          { id: 'debate', label: 'Encontrar argumentos a favor y en contra', detail: 'Preparar un debate, un trabajo o tomar una postura fundamentada.' }
        ]
      },
      {
        id: 'time_available',
        label: '2. ¿Cuánto tiempo tienes para dedicarle?',
        description: 'Ajustamos la profundidad y el volumen de datos.',
        options: [
          { id: 'rapido', label: 'Menos de 15 minutos', detail: 'Necesito lo esencial para salir del paso ya.' },
          { id: 'medio', label: 'De 30 a 60 minutos', detail: 'Puedo leer con calma y profundizar en 2 o 3 dudas.' },
          { id: 'amplio', label: 'Una tarde o más', detail: 'Quiero entender el tema a fondo con fuentes confiables.' }
        ]
      },
      {
        id: 'output_format',
        label: '3. ¿Qué formato de entrega necesitas?',
        description: 'La forma en que se sintetizan las respuestas.',
        options: [
          { id: 'puntos', label: 'Resumen en 5 puntos clave', detail: 'Ideas claras en viñetas directas.' },
          { id: 'tabla', label: 'Tabla comparativa con pros y contras', detail: 'Cuadrícula organizada por criterios.' },
          { id: 'paso_a_paso', label: 'Explicación paso a paso sencilla', detail: 'Como si te lo explicara un profesor paciente.' }
        ]
      },
      {
        id: 'experience',
        label: '4. ¿Qué es lo más importante para ti?',
        description: 'Garantizar la veracidad y el enfoque.',
        options: [
          { id: 'fiabilidad', label: 'Evitar datos inventados o alucinaciones', detail: 'Reglas estrictas para comprobar fuentes primarias.' },
          { id: 'sencillez', label: 'Que sea fácil de entender', detail: 'Sin lenguaje denso ni explicaciones circulares.' },
          { id: 'rapidez', label: 'Terminar rápidamente', detail: 'Los datos más relevantes sin rodeos.' }
        ]
      }
    ]
  },
  {
    id: 'images',
    title: 'Crear imágenes',
    shortDescription: 'Genera ilustraciones, gráficos o fotos libres de derechos con la fórmula exacta de descripción para evitar fallos típicos.',
    categoryTag: 'Creatividad',
    estimatedMinutes: 6,
    questions: [
      {
        id: 'image_dest',
        label: '1. ¿Dónde vas a utilizar la imagen?',
        description: 'Define la relación de aspecto y nivel de detalle.',
        options: [
          { id: 'redes', label: 'Redes sociales o blog', detail: 'Instagram, LinkedIn, X o encabezado de post.' },
          { id: 'slides', label: 'Diapositivas de presentación', detail: 'Fondo limpio o elemento ilustrativo que no distraiga.' },
          { id: 'personal', label: 'Proyecto personal o creativo', detail: 'Portada de libro, avatar o experimento visual.' },
          { id: 'portada', label: 'Miniatura o cartel', detail: 'Impactante con espacio para texto posterior.' }
        ]
      },
      {
        id: 'style',
        label: '2. ¿Qué estilo visual prefieres?',
        description: 'Las palabras clave que orientarán la estética.',
        options: [
          { id: 'foto', label: 'Fotografía realista y limpia', detail: 'Aspecto fotográfico natural con iluminación de estudio.' },
          { id: 'ilustracion', label: 'Ilustración moderna minimalista', detail: 'Colores planos o sutiles, estilo editorial moderno.' },
          { id: 'vector', label: 'Gráfico 2D o icono', detail: 'Símbolos claros y limpios con bordes definidos.' },
          { id: 'render', label: 'Arte conceptual o 3D suave', detail: 'Texturas volumétricas y estética digital atractiva.' }
        ]
      },
      {
        id: 'experience',
        label: '3. ¿Qué experiencia tienes redactando prompts?',
        description: 'Para ofrecerte una fórmula guiada por variables.',
        options: [
          { id: 'primera', label: 'Estoy empezando', detail: 'Solo he escrito una o dos frases y el resultado fue extraño.' },
          { id: 'prueba', label: 'Ya he probado pero salen fallos', detail: 'Dedos raros, textos ilegibles o estilos mezclados.' }
        ]
      },
      {
        id: 'priority',
        label: '4. ¿Qué es lo más importante para ti?',
        description: 'La prioridad en el proceso.',
        options: [
          { id: 'gratis', label: 'Que sea 100% gratis', detail: 'Utilizar herramientas con versión sin pago ni tarjeta.' },
          { id: 'calidad', label: 'Que tenga un resultado profesional', detail: 'Sin defectos evidentes y con estética refinada.' },
          { id: 'rapido', label: 'Terminar rápidamente', detail: 'Conseguir una imagen digna en menos de 3 intentos.' }
        ]
      }
    ]
  },
  {
    id: 'study',
    title: 'Estudiar un tema',
    shortDescription: 'Convierte apuntes o materias densas en resúmenes interactivos, simulacros de examen y explicaciones con analogías sencillas.',
    categoryTag: 'Educación',
    estimatedMinutes: 10,
    questions: [
      {
        id: 'subject_type',
        label: '1. ¿Qué necesitas estudiar?',
        description: 'Nos ayuda a formular el método pedagógico.',
        options: [
          { id: 'examen', label: 'Un examen o certificación', detail: 'Aprender y retener conceptos que evaluarán con preguntas.' },
          { id: 'concepto', label: 'Un concepto técnico o difícil', detail: 'Comprender cómo funciona algo complejo paso a paso.' },
          { id: 'idioma', label: 'Un idioma o vocabulario', detail: 'Practicar expresiones, traducción o situaciones reales.' },
          { id: 'laboral', label: 'Una habilidad práctica de trabajo', detail: 'Aprender una herramienta, normativa o procedimiento laboral.' }
        ]
      },
      {
        id: 'learning_style',
        label: '2. ¿Cómo aprendes mejor?',
        description: 'La forma en que la IA adaptará sus explicaciones.',
        options: [
          { id: 'analogias', label: 'Con ejemplos y analogías cotidianas', detail: 'Explicar algo técnico con situaciones familiares de la vida diaria.' },
          { id: 'test', label: 'Con preguntas y autoevaluación', detail: 'Método socrático: la IA me hace preguntas tipo test para comprobar.' },
          { id: 'esquemas', label: 'Con resúmenes esquemáticos', detail: 'Puntos clave, jerarquías y definiciones claras.' }
        ]
      },
      {
        id: 'timeframe',
        label: '3. ¿De cuánto tiempo dispones?',
        description: 'Establece la urgencia del plan de estudio.',
        options: [
          { id: 'urgente', label: 'Menos de 24 horas', detail: 'Modo repaso intensivo con lo indispensable.' },
          { id: 'semana', label: 'Una semana', detail: 'Tiempo para asimilar y practicar 20 minutos diarios.' },
          { id: 'tiempo', label: 'Un mes o más', detail: 'Estudio progresivo con repasos espaciados.' }
        ]
      },
      {
        id: 'materials',
        label: '4. ¿Qué material tienes?',
        description: 'Insumo de base para estudiar.',
        options: [
          { id: 'temario', label: 'Un temario o índice oficial', detail: 'La lista de temas que entran en la materia.' },
          { id: 'apuntes', label: 'Mis propios apuntes o resumen', detail: 'Notas tomadas en clase o lectura previa.' },
          { id: 'solo_nombre', label: 'Solo sé el tema general', detail: 'Necesito que la IA me arme la guía temática desde cero.' }
        ]
      }
    ]
  }
];
