import { RouteGuide, TaskCategory, UserAnswers } from '../types';
import { INITIAL_TASKS } from '../data/tasks';

export function generateGuide(taskId: TaskCategory, answers: UserAnswers): RouteGuide {
  const task = INITIAL_TASKS.find((t) => t.id === taskId) || INITIAL_TASKS[0];

  switch (taskId) {
    case 'presentation':
      return buildPresentationGuide(task.title, answers);
    case 'writing':
      return buildWritingGuide(task.title, answers);
    case 'research':
      return buildResearchGuide(task.title, answers);
    case 'images':
      return buildImagesGuide(task.title, answers);
    case 'study':
      return buildStudyGuide(task.title, answers);
    default:
      return buildPresentationGuide(task.title, answers);
  }
}

// --------------------------------------------------------------------------
// 1. RUTA: CREAR UNA PRESENTACIÓN (Prioridad número 1 del proyecto)
// --------------------------------------------------------------------------
function buildPresentationGuide(taskTitle: string, answers: UserAnswers): RouteGuide {
  const purpose = answers['purpose'] || 'trabajo';
  const materials = answers['materials'] || 'nada';
  const experience = answers['experience'] || 'principiante';
  const priority = answers['priority'] || 'facil';

  // Determinación de herramienta recomendada según respuestas
  let toolName = 'ChatGPT o Claude (versiones gratuitas) + Canva';
  let toolWhy = 'Es la combinación más flexible y sin sorpresas: generas la estructura de 6 a 8 diapositivas con IA y luego la trasladas a una plantilla limpia de Canva o PowerPoint.';
  let toolTier = '100% Gratuito';
  let toolWebHint = 'chatgpt.com / claude.ai / canva.com';

  if (priority === 'rapido') {
    toolName = 'Gamma App (gamma.app)';
    toolWhy = 'Si necesitas terminar en menos de 10 minutos, Gamma genera diapositivas completas con diseño automático a partir de un simple esquema de texto.';
    toolTier = 'Créditos gratuitos al registrarse';
    toolWebHint = 'gamma.app';
  } else if (purpose === 'trabajo' && priority === 'profesional') {
    toolName = 'Claude o ChatGPT (Gratis) + PowerPoint / Google Slides';
    toolWhy = 'Para un entorno corporativo o de clientes, es mejor usar la IA exclusivamente para pulir el contenido y la narrativa, manteniendo tu plantilla corporativa habitual.';
    toolTier = '100% Gratuito';
    toolWebHint = 'claude.ai o chatgpt.com';
  }

  // Explicación de la ruta adaptada
  const purposeTextMap: Record<string, string> = {
    trabajo: 'un entorno profesional y de equipo',
    estudios: 'una exposición académica o estudiantil',
    negocio: 'una propuesta comercial o de venta',
    personal: 'una presentación personal o divulgativa'
  };

  const materialsTextMap: Record<string, string> = {
    nada: 'partiendo de una idea inicial sin texto previo redactado',
    texto: 'a partir de tus notas y apuntes existentes',
    documento: 'sintetizando un documento extenso en mensajes clave',
    imagenes: 'estructurando el guion para acompañar tus materiales visuales'
  };

  const whyThisRoute = `Por tus respuestas para ${purposeTextMap[purpose] || 'tu objetivo'} y ${materialsTextMap[materials] || 'tu material'}, te conviene empezar organizando la narrativa en un máximo de 6 a 8 diapositivas y definiendo el mensaje principal de cada una. Esto evitará que crees diapositivas sobrecargadas que aburran a la audiencia.`;

  // Paso 1: Preparación
  const step1Items: string[] = [
    'Define en una sola frase qué debe recordar la audiencia al terminar.',
    'Anota 3 puntos principales (no más de 3) que justifican o explican esa idea central.',
    materials === 'nada'
      ? 'Indica a quién te diriges (ej: colegas de oficina, profesor, posibles clientes).'
      : 'Copia o ten a mano el texto base que quieres resumir en las diapositivas.',
    'Establece el tiempo de exposición disponible (regla general: 2 minutos por diapositiva).'
  ];

  // Paso 2: Instrucción lista para copiar
  let copyablePrompt = '';
  if (materials === 'nada') {
    copyablePrompt = `Actúa como un experto en comunicación y diseño de presentaciones para [TIPO_AUDIENCIA: ej. clientes / compañeros de trabajo / profesores].

Necesito preparar una presentación sobre: [TEMA_DE_LA_PRESENTACIÓN].
El objetivo principal es que la audiencia entienda: [OBJETIVO_PRINCIPAL_EN_UNA_FRASE].
Disponemos de un tiempo aproximado de: [MINUTOS_O_NÚMERO_DE_DIAPOSITIVAS: ej. 10 minutos / 7 diapositivas].

Por favor, crea la estructura detallada de la presentación con estas reglas:
1. Para cada diapositiva escribe:
   - Título claro y conciso (máximo 6 palabras).
   - Idea clave (un solo mensaje principal).
   - 3 viñetas breves con los datos o argumentos de apoyo (máximo 12 palabras por viñeta).
   - Sugerencia visual (qué icono, foto o gráfico sencillo colocar).
2. Tono: claro, directo y profesional.
3. Evita párrafos largos; cada diapositiva debe poder leerse en 10 segundos.`;
  } else if (materials === 'documento' || materials === 'texto') {
    copyablePrompt = `Actúa como un sintetizador profesional de presentaciones. 
A continuación te proporciono mi material base:
---
[PEGA_AQUÍ_TU_TEXTO_O_RESUMEN_DEL_DOCUMENTO]
---

Por favor, convierte este contenido en una presentación de [NÚMERO_DE_DIAPOSITIVAS: ej. 6 diapositivas]:
1. Diapositiva 1: Portada con título llamativo y subtítulo explicativo.
2. Diapositivas intermedias: Divide el contenido en bloques temáticos, colocando en cada una:
   - Título directo (no uses títulos aburridos como "Introducción").
   - 3 viñetas concisas con las conclusiones o datos más importantes.
   - Una nota de orador breve (lo que debo decir en voz alta).
3. Diapositiva final: Conclusión y siguiente paso concreto (Call to Action).
4. No uses lenguaje robótico ni adornos innecesarios.`;
  } else {
    copyablePrompt = `Actúa como asesor de diseño de presentaciones. Tengo un conjunto de imágenes y gráficos sobre [TEMA_DE_TU_PRESENTACIÓN].

Necesito que redactes el guion para una presentación de [NÚMERO_DE_DIAPOSITIVAS: ej. 6 diapositivas].
Para cada diapositiva indícame:
- Título conciso.
- La idea clave que explica el gráfico o imagen.
- Lo que debo decir en voz alta (guion de 30 segundos).
- Una frase de transición hacia la siguiente diapositiva.`;
  }

  // Paso 3: Revisión
  const step3Checks = [
    'Regla de oro: ¿Cada diapositiva transmite una sola idea principal o está mezclando varios temas?',
    'Comprueba que ninguna viñeta ocupe más de dos líneas de texto (evita bloques pesados).',
    'Revisa si los datos numéricos, porcentajes o fechas coinciden con la realidad (la IA a veces aproxima).',
    'Ensaya leer la diapositiva en voz alta: si tardas más de 15 segundos en leer el texto visible, contiene demasiadas palabras.'
  ];

  // Checklist
  const checklist = [
    {
      id: 'pres_1',
      text: 'Reunir la idea principal y el tiempo disponible',
      detail: 'Saber exactamente cuántos minutos tienes y cuál es el mensaje que debe quedar en la mente del oyente.'
    },
    {
      id: 'pres_2',
      text: 'Pegar el prompt en la herramienta recomendada',
      detail: `Acceder a ${toolName} y sustituir las variables entre corchetes con tus datos reales.`
    },
    {
      id: 'pres_3',
      text: 'Revisar la estructura generada y descartar lo redundante',
      detail: 'Elimina diapositivas de relleno; 6 diapositivas potentes valen más que 15 diapositivas apresuradas.'
    },
    {
      id: 'pres_4',
      text: 'Pasar el texto a la plantilla visual (PowerPoint, Canva o Gamma)',
      detail: 'Aplica una tipografía legible (mínimo tamaño 24pt para títulos) y buen contraste con el fondo.'
    },
    {
      id: 'pres_5',
      text: 'Ensayo de 3 minutos con cronómetro',
      detail: 'Comprobar que la presentación fluye de manera natural sin tener que leer literalmente la pantalla.'
    }
  ];

  const nextAction = materials === 'nada'
    ? 'Escribe en un bloc de notas el tema de tu presentación y a quién se la vas a contar antes de copiar el prompt.'
    : 'Copia el texto que ya tienes para tenerlo listo al momento de pegar la instrucción en la IA.';

  return {
    taskId: 'presentation',
    taskTitle,
    objective: `Crear una presentación estructurada y convincente para ${purposeTextMap[purpose] || 'tu objetivo'}.`,
    whyThisRoute,
    recommendedTool: {
      name: toolName,
      isFree: true,
      tierInfo: toolTier,
      why: toolWhy,
      webHint: toolWebHint
    },
    step1: {
      title: '01. Prepara la información indispensable',
      summary: 'No abras la herramienta de IA sin estos 3 datos mínimos para evitar respuestas genéricas.',
      items: step1Items,
      proTip: 'Un error común es pedirle a la IA «hazme una presentación de 20 diapositivas». Cuantas más diapositivas pidas al inicio, más vacías de contenido resultarán. Empieza siempre con 5 a 8.'
    },
    step2: {
      title: '02. Sigue las instrucciones preparadas',
      summary: 'Copia el siguiente bloque de texto, sustituye los corchetes [ ... ] con tus datos y envíalo a la herramienta recomendada.',
      copyablePrompt,
      promptExplanation: 'Este mensaje obliga al modelo a respetar un formato conciso con títulos directos, viñetas cortas y recomendaciones visuales, en vez de generarte párrafos densos imposibles de proyectar.',
      variablesToFill: [
        { key: '[TIPO_AUDIENCIA]', label: 'Audiencia', example: 'Mi equipo de marketing / El tribunal de tesis / Clientes potenciales' },
        { key: '[TEMA_DE_LA_PRESENTACIÓN]', label: 'Tema', example: 'Resultados del trimestre / Plan de lanzamiento del producto X' },
        { key: '[OBJETIVO_PRINCIPAL_EN_UNA_FRASE]', label: 'Objetivo', example: 'Aprobar el presupuesto del nuevo proyecto' }
      ]
    },
    step3: {
      title: '03. Revisa y filtra el resultado',
      summary: 'La IA te dará una base sólida, pero tú debes hacer el control de calidad final antes de llevarlo a tus diapositivas.',
      checks: step3Checks,
      whatToAvoid: 'Nunca copies y pegues directamente bloques enteros de texto en la diapositiva. La presentación es un apoyo visual para lo que tú dices, no un documento de lectura.'
    },
    checklist,
    nextAction
  };
}

// --------------------------------------------------------------------------
// 2. RUTA: ESCRIBIR UN TEXTO (Correo, informe, artículo o propuesta)
// --------------------------------------------------------------------------
function buildWritingGuide(taskTitle: string, answers: UserAnswers): RouteGuide {
  const textType = answers['text_type'] || 'correo';
  const inputStatus = answers['input_status'] || 'idea';
  const tone = answers['tone'] || 'profesional';
  const goal = answers['goal'] || 'humano';

  const typeMap: Record<string, string> = {
    correo: 'un correo electrónico con impacto',
    informe: 'un informe o síntesis ejecutiva',
    articulo: 'un artículo o publicación editorial',
    propuesta: 'una propuesta persuasiva de valor'
  };

  const toneMap: Record<string, string> = {
    profesional: 'tono formal, sobrio y profesional',
    cercano: 'tono cercano, natural y conversacional',
    directo: 'tono conciso, directo al grano y sin rodeos'
  };

  const toolName = 'ChatGPT (GPT-4o mini gratuito) o Claude 3.5 Sonnet (Gratis)';
  const toolWhy = 'Ambas herramientas son excelentes redactando, pero Claude suele generar un lenguaje más fluido y menos mecánico por defecto.';

  let copyablePrompt = '';
  if (textType === 'correo') {
    copyablePrompt = `Actúa como un redactor profesional de correspondencia laboral.
Necesito redactar un correo electrónico dirigido a: [DESTINATARIO: ej. Mi responsable / Un cliente insatisfecho / Un proveedor].
El objetivo del correo es: [QUÉ_QUIERES_LOGRAR: ej. Pedir una reunión de 15 minutos / Explicar un retraso con soluciones].

Detalles clave que deben incluirse:
- [PUNTO_CLAVE_1: ej. La fecha límite es el viernes]
- [PUNTO_CLAVE_2: ej. Ya tenemos lista la propuesta técnica]

Reglas estrictas de redacción:
1. Tono: ${toneMap[tone] || 'profesional'}.
2. Asunto del correo: propón 2 opciones claras de máximo 7 palabras.
3. Longitud: no más de 3 párrafos cortos (máximo 150 palabras en total).
4. No utilices frases cliché como "Espero que este correo te encuentre bien" o "Sin más dilación".
5. Termina con una llamada a la acción clara (ej: "¿Te viene bien el martes a las 10:00?").`;
  } else {
    copyablePrompt = `Actúa como un editor y redactor especializado.
Necesito redactar ${typeMap[textType] || 'un texto'} sobre: [TEMA_PRINCIPAL].

Información base o puntos clave:
---
[PEGA_AQUÍ_TUS_NOTAS_O_BORRADOR]
---

Instrucciones:
1. Estructura el texto con un gancho inicial claro, desarrollo lógico en viñetas o subtítulos breves y una conclusión accionable.
2. Tono: ${toneMap[tone] || 'profesional y humano'}.
3. Prioridad: ${goal === 'humano' ? 'Haz que suene escrito por una persona experimentada, sin palabras rebuscadas ni adverbios redundantes.' : 'Directo y fácil de asimilar en menos de 2 minutos de lectura.'}
4. Proporciona primero el borrador completo y luego una lista de 3 palabras clave cambiadas para mejorar la claridad.`;
  }

  return {
    taskId: 'writing',
    taskTitle,
    objective: `Redactar ${typeMap[textType] || 'tu texto'} con ${toneMap[tone] || 'el tono adecuado'}.`,
    whyThisRoute: `Has seleccionado redactar ${typeMap[textType] || 'un texto'} partiendo de ${inputStatus === 'borrador' ? 'un borrador previo' : 'puntos clave'}. Esta ruta evita el mayor problema de los textos generados con IA: que suenen acartonados o utilicen frases vacías que el lector detecta al instante.`,
    recommendedTool: {
      name: toolName,
      isFree: true,
      tierInfo: '100% Gratuito en la web',
      why: toolWhy,
      webHint: 'claude.ai o chatgpt.com'
    },
    step1: {
      title: '01. Prepara los datos antes de redactar',
      summary: 'El secreto de un texto con IA no es la habilidad de la máquina, sino la precisión de tus datos de partida.',
      items: [
        'Escribe en 1 frase la acción que quieres que haga la persona que lea el texto.',
        'Anota los 2 o 3 datos innegociables (fechas, nombres, condiciones o cifras exactas).',
        'Ten claro qué tono NO quieres transmitir (ej: «no quiero sonar agresivo» o «no quiero parecer novato»).'
      ],
      proTip: 'Nunca le pidas a la IA que «escriba un correo bonito». Dale el contexto: «Es para un cliente con el que ya tenemos confianza» o «Es una primera toma de contacto formal».'
    },
    step2: {
      title: '02. Ejecuta la instrucción personalizada',
      summary: 'Pega la instrucción en la ventana de chat de la herramienta recomendada rellenando los corchetes.',
      copyablePrompt,
      promptExplanation: 'Este prompt limita la extensión para evitar textos kilométricos e incluye una prohibición expresa de tópicos y frases robóticas.',
      variablesToFill: [
        { key: '[DESTINATARIO]', label: 'A quién va dirigido', example: 'Director del departamento / Cliente' },
        { key: '[QUÉ_QUIERES_LOGRAR]', label: 'Objetivo concreto', example: 'Confirmar la fecha de entrega y solicitar validación' }
      ]
    },
    step3: {
      title: '03. Pasa el filtro de naturalidad',
      summary: 'Lee el borrador con ojos críticos antes de enviarlo o publicarlo.',
      checks: [
        '¿El asunto del correo o título es específico y no ambiguo?',
        '¿Has eliminado adjetivos grandilocuentes como "crucial", "fundamental", "innovador" que la IA suele añadir?',
        '¿Las fechas, nombres y compromisos son 100% exactos?',
        '¿Se siente como algo que tú dirías en una conversación real?'
      ],
      whatToAvoid: 'No envíes el texto sin una lectura personal completa. El 90% de los errores de IA ocurren en nombres propios, cifras y promesas que el usuario no verificó.'
    },
    checklist: [
      { id: 'w_1', text: 'Definir el objetivo del mensaje y el destinatario', detail: 'Tener claro qué respuesta o acción necesitas del lector.' },
      { id: 'w_2', text: 'Copiar y rellenar la plantilla de prompt', detail: 'Sustituir los campos entre corchetes con tu contexto específico.' },
      { id: 'w_3', text: 'Pedirle un reajuste si es necesario', detail: 'Ejemplo: «Hazlo un 30% más corto y elimina el último párrafo».' },
      { id: 'w_4', text: 'Verificación de cifras, nombres y fechas', detail: 'Revisar manualmente cada dato factual en el texto.' },
      { id: 'w_5', text: 'Lectura final en voz alta antes del envío', detail: 'Comprueba que las transiciones entre párrafos suenen fluidas.' }
    ],
    nextAction: 'Abre chatgpt.com o claude.ai en una pestaña contigua y pega la instrucción de redacción.'
  };
}

// --------------------------------------------------------------------------
// 3. RUTA: INVESTIGAR UN TEMA (Aprender, comparar o resumir)
// --------------------------------------------------------------------------
function buildResearchGuide(taskTitle: string, answers: UserAnswers): RouteGuide {
  const goal = answers['research_goal'] || 'aprender';
  const time = answers['time_available'] || 'rapido';
  const format = answers['output_format'] || 'puntos';

  const goalMap: Record<string, string> = {
    aprender: 'aprender un concepto desde cero con explicaciones claras',
    comparar: 'comparar alternativas con pros y contras fundamentados',
    resumen: 'obtener un resumen ejecutivo rápido para tomar decisiones',
    debate: 'encontrar argumentos a favor y en contra de una postura'
  };

  const toolName = 'Perplexity AI (perplexity.ai) o Google Gemini';
  const toolWhy = 'A diferencia de los chats tradicionales, estas herramientas buscan en la web en tiempo real y enlazan las fuentes de donde extraen cada afirmación.';

  let copyablePrompt = '';
  if (goal === 'comparar') {
    copyablePrompt = `Actúa como analista comparativo imparcial.
Necesito comparar objetivamente las siguientes alternativas: [OPCIÓN_A] vs [OPCIÓN_B] (y [OPCIÓN_C] si aplica), para el caso de uso de: [MI_SITUACIÓN_O_PERFIL].

Presenta la respuesta en este formato exacto:
1. Tabla comparativa:
   - Criterios: Costo/Precio, Facilidad de uso, Ventajas principales, Limitaciones o desventajas.
2. Conclusión para mi caso:
   - Cuál es la opción más conveniente si mi prioridad es [PRIORIDAD: ej. ahorrar dinero / máxima sencillez / profesionalidad].
3. Lista de fuentes o referencias utilizadas para que pueda contrastar los datos.`;
  } else {
    copyablePrompt = `Actúa como un profesor especialista en divulgación clara y rigurosa.
Necesito entender a fondo: [TEMA_O_CONCEPTO_A_INVESTIGAR].
Mi nivel actual sobre el tema es: [PRINCIPIANTE_O_MEDIO].

Estructura tu explicación en ${format === 'tabla' ? 'una tabla resumida' : '5 puntos clave numerados'}:
1. ¿Qué es exactamente en palabras sencillas sin jerga técnica innecesaria?
2. ¿Por qué es relevante o para qué sirve en la práctica?
3. Un ejemplo cotidiano o analogía que me ayude a recordarlo fácilmente.
4. Los 2 errores o malentendidos más comunes que la gente tiene sobre esto.
5. Qué preguntas debería hacerme si quiero profundizar más.`;
  }

  return {
    taskId: 'research',
    taskTitle,
    objective: `Investigar y dominar ${goalMap[goal] || 'el tema'} en ${time === 'rapido' ? 'menos de 15 minutos' : 'tiempo suficiente'}.`,
    whyThisRoute: `Para ${goalMap[goal] || 'tu objetivo'}, no te conviene pedirle a la IA que «te hable del tema», porque te dará páginas de texto disperso. Esta ruta fuerza una síntesis orientada a criterios de decisión con enlaces a fuentes.`,
    recommendedTool: {
      name: toolName,
      isFree: true,
      tierInfo: 'Plan gratuito sin tarjeta requerida',
      why: toolWhy,
      webHint: 'perplexity.ai o gemini.google.com'
    },
    step1: {
      title: '01. Acota la pregunta de investigación',
      summary: 'Las preguntas abiertas generan respuestas vagas. Cuanto más específica sea tu pregunta, más útil será la investigación.',
      items: [
        'En vez de preguntar «¿Qué es la energía solar?», pregunta «¿Cuáles son los costos reales de instalación y amortización en viviendas unifamiliares?».',
        'Define el propósito final: ¿Vas a escribir algo, tomar una decisión de compra o preparar un examen?',
        'Apunta de antemano qué dudas específicas quieres resolver sí o sí.'
      ],
      proTip: 'Si usas Perplexity AI, el modo "Focus" te permite acotar la búsqueda a fuentes académicas o a la web abierta.'
    },
    step2: {
      title: '02. Lanza la consulta estructurada',
      summary: 'Usa el prompt preparado para obtener una síntesis con estructura de decisión y fuentes citadas.',
      copyablePrompt,
      promptExplanation: 'Al exigir una tabla o 5 puntos clave con fuentes, obligas al motor a descartar relleno y a organizar la información jerárquicamente.',
      variablesToFill: [
        { key: '[TEMA_O_CONCEPTO_A_INVESTIGAR]', label: 'Concepto', example: 'Diferencia entre tipos de hipotecas / Metodología Scrum' },
        { key: '[MI_SITUACIÓN_O_PERFIL]', label: 'Tu contexto', example: 'Trabajador autónomo que no tiene experiencia previa' }
      ]
    },
    step3: {
      title: '03. Aplica la regla de verificación',
      summary: 'Comprueba los puntos más delicados antes de asumir los datos como verdades absolutas.',
      checks: [
        'Haz clic en al menos 2 de los enlaces citados para confirmar que la fuente existe y es confiable.',
        'Desconfía de cifras hiperespecíficas sin año de referencia (los precios y normativas cambian anualmente).',
        'Comprueba si hay sesgos evidentes (ej: si toda la información proviene de la web de un vendedor del producto).'
      ],
      whatToAvoid: 'Nunca uses un chatbot clásico sin acceso a la web para consultar leyes vigentes, estadísticas del año actual o cotizaciones de mercado.'
    },
    checklist: [
      { id: 'res_1', text: 'Acotar la duda principal en una pregunta específica', detail: 'Evitar preguntas genéricas que dispersan el foco de la búsqueda.' },
      { id: 'res_2', text: 'Ejecutar la consulta en Perplexity o Gemini', detail: 'Reemplazar las variables con tus alternativas concretas.' },
      { id: 'res_3', text: 'Examinar la tabla o los 5 puntos clave generados', detail: 'Comprobar si responde a la duda con la que iniciaste.' },
      { id: 'res_4', text: 'Contrastar 1 o 2 fuentes oficiales enlazadas', detail: 'Verificar la fecha de publicación y la entidad que respalda el dato.' },
      { id: 'res_5', text: 'Guardar tus conclusiones en una nota propia', detail: 'Redactar con tus propias palabras qué decisión vas a tomar.' }
    ],
    nextAction: 'Define las 2 o 3 dudas exactas que quieres resolver sobre el tema y abre perplexity.ai.'
  };
}

// --------------------------------------------------------------------------
// 4. RUTA: CREAR IMÁGENES (Para presentaciones, redes o proyectos)
// --------------------------------------------------------------------------
function buildImagesGuide(taskTitle: string, answers: UserAnswers): RouteGuide {
  const dest = answers['image_dest'] || 'slides';
  const style = answers['style'] || 'ilustracion';
  const priority = answers['priority'] || 'gratis';

  const stylePrompts: Record<string, string> = {
    foto: 'fotografía editorial limpia, iluminación natural de estudio suave, profundidad de campo sutil, colores equilibrados y texturas nítidas',
    ilustracion: 'ilustración vectorial moderna y minimalista, paleta de colores armoniosa sobre fondo neutro, sin trazos recargados',
    vector: 'gráfico 2D estilizado con líneas limpias, diseño plano tipo icono moderno sobre fondo blanco',
    render: 'render 3D limpio con iluminación volumétrica suave, estética moderna y materiales mate'
  };

  const toolName = 'Microsoft Copilot Designer (DALL-E 3) o Recraft.ai';
  const toolWhy = 'Ambas ofrecen generación gratuita de alta calidad. Recraft.ai es especialmente sobresaliente para vectores e ilustraciones de diseño sin aberraciones.';

  const copyablePrompt = `[SUJETO_PRINCIPAL: ej. Una persona trabajando concentrada en su escritorio con un portátil moderno y una taza de café].
Estilo: ${stylePrompts[style] || 'ilustración moderna y limpia'}.
Entorno: [FONDO_O_LUGAR: ej. Oficina luminosa con plantas de interior y fondo desenfocado neutro].
Iluminación: Luz suave difusa de día, sin sombras duras.
Composición: Vista frontal o isométrica limpia, encuadre centrado con espacio libre alrededor.
Evitar: Sin texto escrito, sin letras ilegibles, sin manos deformadas, sin saturación excesiva de neón, sin elementos flotantes extraños.`;

  return {
    taskId: 'images',
    taskTitle,
    objective: `Generar una imagen de calidad para ${dest === 'slides' ? 'tus diapositivas' : dest === 'redes' ? 'redes sociales' : 'tu proyecto'} con estilo ${style}.`,
    whyThisRoute: 'La mayoría de principiantes escriben descripciones de una sola palabra como «perro espacial» y obtienen resultados caóticos. Esta fórmula divide la descripción en 5 ingredientes obligatorios (sujeto, estilo, entorno, luz y restricciones).',
    recommendedTool: {
      name: toolName,
      isFree: true,
      tierInfo: 'Generaciones gratuitas diarias',
      why: toolWhy,
      webHint: 'copilot.microsoft.com o recraft.ai'
    },
    step1: {
      title: '01. Los 5 ingredientes de una buena imagen con IA',
      summary: 'Antes de generar, piensa en estos 5 elementos para no gastar intentos a ciegas.',
      items: [
        '1. Sujeto: ¿Qué es exactamente el elemento principal en primer plano?',
        '2. Entorno: ¿Qué hay detrás? (Un fondo liso suele ser la mejor opción para presentaciones).',
        '3. Iluminación: Luz suave de estudio, luz natural o luz dorada.',
        '4. Estilo: Fotografía, ilustración plana o render 3D.',
        '5. Restricciones negativas: Pedir expresamente "sin texto dentro de la imagen" (la IA suele estropear las letras).'
      ],
      proTip: 'Si necesitas texto sobre la imagen, no se lo pidas a la IA. Genera la imagen limpia y añade el texto después en Canva o PowerPoint.'
    },
    step2: {
      title: '02. Aplica la fórmula infalible de descripción',
      summary: 'Rellena la plantilla con el sujeto de tu escena y cópiala en la herramienta.',
      copyablePrompt,
      promptExplanation: 'Al incluir la sección "Evitar: sin texto, sin letras deformadas", se reducen en un 80% los defectos visuales clásicos de los generadores de imágenes.',
      variablesToFill: [
        { key: '[SUJETO_PRINCIPAL]', label: 'Elemento principal', example: 'Un grupo de tres profesionales revisando un mapa en una mesa redonda' },
        { key: '[FONDO_O_LUGAR]', label: 'Fondo', example: 'Espacio de trabajo moderno con luz blanca natural' }
      ]
    },
    step3: {
      title: '03. Revisa la anatomía y la coherencia',
      summary: 'Revisa estos 4 puntos críticos antes de descargar la imagen.',
      checks: [
        'Comprueba las manos y ojos de las personas: ¿Tienen la cantidad correcta de dedos y mirada natural?',
        'Verifica que no hayan aparecido letras raras o logotipos inventados en carteles o pantallas.',
        'Asegúrate de que la iluminación coincida con el estilo general de tu documento o presentación.',
        'Descarga la imagen en la resolución más alta disponible.'
      ],
      whatToAvoid: 'No intentes meter 10 personajes distintos y 5 acciones simultáneas en una sola imagen. Cuantos más elementos pidas a la vez, más fallos de composición cometerá el generador.'
    },
    checklist: [
      { id: 'img_1', text: 'Definir el sujeto y el espacio disponible para la imagen', detail: 'Saber si la imagen irá a la izquierda, derecha o de fondo.' },
      { id: 'img_2', text: 'Acceder a Microsoft Copilot Designer o Recraft', detail: 'Abrir la herramienta gratuita en el navegador.' },
      { id: 'img_3', text: 'Pegar la fórmula con las restricciones negativas', detail: 'Incluir "sin texto ni letras deformadas".' },
      { id: 'img_4', text: 'Evaluar 4 variantes generadas', detail: 'Seleccionar la que tenga bordes limpios y proporciones correctas.' },
      { id: 'img_5', text: 'Ajuste final en Canva o editor', detail: 'Recortar al tamaño deseado y ajustar brillo si hiciera falta.' }
    ],
    nextAction: 'Decide el sujeto principal que necesitas ilustrar y copia la fórmula de descripción.'
  };
}

// --------------------------------------------------------------------------
// 5. RUTA: ESTUDIAR UN TEMA (Exámenes, conceptos o autoevaluación)
// --------------------------------------------------------------------------
function buildStudyGuide(taskTitle: string, answers: UserAnswers): RouteGuide {
  const subject = answers['subject_type'] || 'concepto';
  const method = answers['learning_style'] || 'test';
  const timeframe = answers['timeframe'] || 'semana';

  const toolName = 'ChatGPT o Google Gemini (Gratuito)';
  const toolWhy = 'Son excelentes adoptando roles pedagógicos interactivos cuando se les instruye para no dar la respuesta de golpe, sino hacer preguntas guiadas.';

  let copyablePrompt = '';
  if (method === 'test') {
    copyablePrompt = `Actúa como un profesor universitario y tutor de autoevaluación.
Estoy estudiando sobre: [TEMA_O_MATERIA_A_ESTUDIAR].
Mi objetivo es: [PREPARAR_EXAMEN_O_ENTENDER_A_FONDO].

Reglas de la sesión de estudio:
1. Hazme exactamente UNA pregunta de opción múltiple (con opciones A, B, C y D) sobre este tema.
2. No me des la respuesta todavía ni expliques nada.
3. Espera a que yo te responda.
4. Cuando yo responda:
   - Dime si es correcta o incorrecta.
   - Explica brevemente por qué con una analogía sencilla.
   - Pasa a la siguiente pregunta.
5. Empecemos ahora con la primera pregunta para evaluar mi nivel básico.`;
  } else {
    copyablePrompt = `Actúa como un tutor experto en la técnica Feynman de aprendizaje.
Necesito entender a fondo este tema difícil: [TEMA_O_CONCEPTO_COMPLEJO].

Por favor:
1. Explícamelo como si yo tuviera 14 años, usando una metáfora de la vida cotidiana.
2. Identifica los 3 conceptos clave que componen esta idea y defínelos en una sola frase cada uno.
3. Ponme un ejemplo práctico de cómo se aplica en el mundo real.
4. Al final, hazme una sola pregunta abierta para comprobar si lo he entendido bien y retroalimentarme.`;
  }

  return {
    taskId: 'study',
    taskTitle,
    objective: `Aprender y retener ${subject === 'examen' ? 'el temario para tu examen' : 'el concepto'} con método activo.`,
    whyThisRoute: 'Leer pasivamente apuntes genera una falsa sensación de dominio. La mejor forma de usar la IA para estudiar es convertirla en un examinador interactivo que te haga preguntas y detecte qué áreas tienes flojas.',
    recommendedTool: {
      name: toolName,
      isFree: true,
      tierInfo: '100% Gratuito',
      why: toolWhy,
      webHint: 'chatgpt.com o gemini.google.com'
    },
    step1: {
      title: '01. Reúne el temario o tus dudas clave',
      summary: 'No estudies todo a la vez. Divide tu material en bloques de 15 a 20 minutos.',
      items: [
        'Elige un solo subtema para esta sesión (ej: «Capítulo 3: La respiración celular» o «Fórmulas de interés compuesto»).',
        'Ten a mano tus apuntes o índice para que la IA no se desvíe del temario oficial.',
        'Fija una meta concreta: «Al terminar estos 20 minutos sabré responder a las 5 preguntas típicas de este tema».'
      ],
      proTip: 'Dile a la IA qué libro o temario estás siguiendo para que ajuste el nivel a tu nivel de estudios.'
    },
    step2: {
      title: '02. Inicia el modo tutor interactivo',
      summary: 'Copia el prompt en la IA. Importante: no le pidas que te resuma todo, pídele que te examine.',
      copyablePrompt,
      promptExplanation: 'Este método te obliga a evocar activamente la respuesta de tu memoria, multiplicando por 3 la retención según los estudios de psicología del aprendizaje.',
      variablesToFill: [
        { key: '[TEMA_O_MATERIA_A_ESTUDIAR]', label: 'Materia o tema', example: 'Derecho administrativo / Biología celular / Finanzas básicas' },
        { key: '[PREPARAR_EXAMEN_O_ENTENDER_A_FONDO]', label: 'Objetivo', example: 'Aprobar el examen parcial del próximo lunes' }
      ]
    },
    step3: {
      title: '03. Registra tus errores en una libreta de fallos',
      summary: 'El verdadero aprendizaje ocurre cuando la IA te corrige una respuesta equivocada.',
      checks: [
        'Anota en una hoja aparte cada pregunta que hayas fallado junto con la explicación de por qué era incorrecta.',
        'Pídele a la IA una explicación alternativa si la primera respuesta no te quedó 100% clara: «Ponme otro ejemplo con comida o deportes».',
        'Haz un simulacro de 5 preguntas seguidas antes de dar por cerrado el tema.'
      ],
      whatToAvoid: 'No mires la respuesta en internet antes de responderle a la IA. Acepta equivocarte en la sesión para no equivocarte en el examen real.'
    },
    checklist: [
      { id: 'st_1', text: 'Elegir el tema concreto de la sesión de hoy', detail: 'Centrarse en un único bloque temático de 15 a 30 minutos.' },
      { id: 'st_2', text: 'Pegar la instrucción del tutor interactivo en ChatGPT', detail: 'Comenzar respondiendo a la primera pregunta sin consultar apuntes.' },
      { id: 'st_3', text: 'Completar una ronda de al menos 5 preguntas', detail: 'Recibir retroalimentación inmediata sobre tus respuestas.' },
      { id: 'st_4', text: 'Anotar los conceptos fallados en la libreta de dudas', detail: 'Identificar qué partes del temario necesitan repaso adicional.' },
      { id: 'st_5', text: 'Pedirle una síntesis final en 3 conclusiones clave', detail: 'Fijar el aprendizaje antes de terminar la sesión.' }
    ],
    nextAction: 'Escribe el nombre del tema que necesitas estudiar y abre ChatGPT para iniciar tu simulacro.'
  };
}
