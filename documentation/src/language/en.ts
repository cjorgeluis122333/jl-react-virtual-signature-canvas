export const en = {
  // Navigation / Sidebar
  nav: {
    brandTitle: 'Virtual Signature',
    brandSubtitle: 'Documentation',
    startGuide: 'Start Guide',
    getStarted: 'Get Started',
    getStartedDesc: 'Installation guide and basic configuration',
    usageExamples: 'Usage Examples',
    basicExample: 'Basic Example',
    basicExampleDesc: 'Minimalist signature use case',
    intermediateExample: 'Intermediate Example',
    intermediateExampleDesc: 'Signature history, undo, and cropping',
    advancedExample: 'Advanced Example',
    advancedExampleDesc: 'Brush customization and callbacks',
  },

  // Get Started Section
  getStarted: {
    title: 'Virtual Signature Canvas',
    subtitle: 'The easiest, fastest, and highly interactive way to integrate responsive electronic signatures into your React applications.',
    quickInstall: 'Quick Installation',
    installInstructions: 'Run the following command in your terminal to add the virtual signature to your project:',
    license: 'License: MIT',
    noDeps: 'Zero external dependencies',
    bgHint: 'If you want to use an interactive background in your project like the one on this screen, you can use the library',
    copied: 'Copied',
    copy: 'Copy',
  },

  // Basic Example Section
  basic: {
    title: 'Basic Example',
    description: 'The simplest way to use the component. It only requires mounting the {tag} and passing it a reference to be able to clear the canvas.',
    clearBtn: 'Clear Signature',
  },

  // Intermediate Example Section
  intermediate: {
    title: 'Intermediate Example',
    description: 'Customizing the color, thickness, tracking history to {undo} and using {crop} to extract the signature without white borders. Additionally, we validate via error catching if it is empty.',
    label: 'Medical Approval',
    required: 'Required',
    errorHeader: 'Captured error:',
    closeBtn: 'Close',
    undoBtn: 'Undo',
    clearBtn: 'Clear',
    downloadBtn: 'Download and View',
    previewLabel: 'Cropped preview (autoCrop):',
    previewAlt: 'Extracted signature',
  },

  // Advanced Example Section
  advanced: {
    title: 'Advanced Example',
    description: 'Full API usage. Injecting custom children behind the canvas (as writing guides), observing container size for perfect responsiveness, controlling algorithm stabilization in real-time, and allowing signature export with optional empty-state validation using error handling.',
    contractTitle: 'Digital Contract',
    stabilization: 'Stabilization (Smooth)',
    signHere: 'Sign here below',
    undoBtn: 'Undo',
    clearBtn: 'Clear',
    exportBtn: 'Export Signature',
    errorEmpty: 'Please provide a signature first. (Captured error)',
    closeBtn: 'Close',
  },
};
