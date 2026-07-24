export const es = {
  // Navigation / Sidebar
  nav: {
    brandTitle: 'Virtual Signature',
    brandSubtitle: 'Documentación',
    playgroundBtn: 'Probar Playground 🚀',
    playgroundDesc: 'Entorno de pruebas interactivo en tiempo real',
    startGuide: 'Guía de Inicio',
    getStarted: 'Primeros Pasos',
    getStartedDesc: 'Guía de instalación y configuración básica',
    usageExamples: 'Ejemplos de Uso',
    basicExample: 'Ejemplo Básico',
    basicExampleDesc: 'Caso de uso minimalista de firma',
    intermediateExample: 'Ejemplo Intermedio',
    intermediateExampleDesc: 'Historial de firma, deshacer y recorte',
    advancedExample: 'Ejemplo Avanzado',
    advancedExampleDesc: 'Personalización de pincel y callbacks',
  },

  // Get Started Section
  getStarted: {
    title: 'Virtual Signature Canvas',
    subtitle: 'La forma más fácil, rápida y altamente interactiva de integrar firmas electrónicas responsivas en tus aplicaciones de React.',
    quickInstall: 'Instalación Rápida',
    installInstructions: 'Ejecuta el siguiente comando en tu terminal para añadir la firma virtual a tu proyecto:',
    license: 'Licencia: MIT',
    noDeps: 'Cero dependencias externas',
    bgHint: 'Si quieres utilizar un fondo interactivo en tu proyecto como el de esta pantalla, puedes usar la librería',
    copied: 'Copiado',
    copy: 'Copiar',
  },

  // Basic Example Section
  basic: {
    title: 'Ejemplo Básico',
    description: 'La forma más simple de utilizar el componente. Solo requiere montar el {tag} y pasarle una referencia para poder limpiar el lienzo.',
    clearBtn: 'Limpiar Firma',
  },

  // Intermediate Example Section
  intermediate: {
    title: 'Ejemplo Intermedio',
    description: 'Personalizando el color, grosor, rastreando el historial para {undo} y usando {crop} para extraer la firma sin los bordes blancos. Además, validamos mediante captura de error si está vacío.',
    label: 'Aprobación Médica',
    required: 'Requerido',
    errorHeader: 'Error capturado:',
    closeBtn: 'Cerrar',
    undoBtn: 'Deshacer',
    clearBtn: 'Limpiar',
    downloadBtn: 'Descargar y Ver',
    previewLabel: 'Vista previa recortada (autoCrop):',
    previewAlt: 'Firma extraída',
  },

  // Advanced Example Section
  advanced: {
    title: 'Ejemplo Avanzado',
    description: 'Uso completo de la API. Inyectando hijos personalizados detrás del canvas (como guías de escritura), observando el tamaño del contenedor para responsividad perfecta, controlando la estabilización del algoritmo en tiempo real y permitiendo exportar la firma con validación de estado vacío opcional usando manejo de errores.',
    contractTitle: 'Contrato Digital',
    stabilization: 'Estabilización (Smooth)',
    signHere: 'Firme aquí abajo',
    undoBtn: 'Deshacer',
    clearBtn: 'Limpiar',
    exportBtn: 'Exportar Firma',
    errorEmpty: 'Por favor, proporciona una firma primero. (Error capturado)',
    closeBtn: 'Cerrar',
  },
};
