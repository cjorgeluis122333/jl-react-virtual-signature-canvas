import React, { useRef, useState, useEffect } from 'react';
import { SignatureCanvas, SignatureCanvasRef } from 'jl-react-virtual-signature-canvas';
import { 
  Settings, 
  Trash2, 
  Undo2, 
  Download, 
  RefreshCw, 
  Eye, 
  Info, 
  AlertCircle, 
  Terminal, 
  Sparkles,
  Sliders,
  CheckCircle2,
  ListRestart
} from 'lucide-react';

interface LogEntry {
  id: string;
  timestamp: string;
  event: string;
  details: string;
}

export default function App() {
  const canvasRef = useRef<SignatureCanvasRef>(null);
  
  // Signature States & Customisation Props
  const [strokeColor, setStrokeColor] = useState('#4338ca');
  const [strokeWidth, setStrokeWidth] = useState(4);
  const [stabilization, setStabilization] = useState(true);
  const [autoCrop, setAutoCrop] = useState(true);
  const [bgColor, setBgColor] = useState('#ffffff');
  const [canvasHeight, setCanvasHeight] = useState(250);
  const [customColor, setCustomColor] = useState('#3b82f6');
  
  // Functionality States
  const [canUndo, setCanUndo] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [throwIfEmpty, setThrowIfEmpty] = useState(true);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [logs, setLogs] = useState<LogEntry[]>([]);

  // Logs append helper
  const addLog = (event: string, details: string = '') => {
    const time = new Date().toLocaleTimeString();
    const entry: LogEntry = {
      id: Math.random().toString(36).substring(2, 9),
      timestamp: time,
      event,
      details
    };
    setLogs(prev => [entry, ...prev].slice(0, 50)); // Keep last 50 logs
  };

  // Log on initial mount
  useEffect(() => {
    addLog('Componente Inicializado', 'El canvas de firma virtual está listo para usarse.');
  }, []);

  const handleClear = () => {
    canvasRef.current?.clear();
    setPreviewUrl(null);
    setValidationError(null);
    addLog('canvas.clear()', 'Se ha limpiado el lienzo por completo.');
  };

  const handleUndo = () => {
    canvasRef.current?.undo();
    setPreviewUrl(null);
    setValidationError(null);
    addLog('canvas.undo()', 'Se ha deshecho el último trazo.');
  };

  const handleExport = () => {
    try {
      setValidationError(null);
      // Call toDataURL with validation throwIfEmpty
      const dataUrl = canvasRef.current?.toDataURL('image/png', undefined, throwIfEmpty);
      
      if (dataUrl) {
        setPreviewUrl(dataUrl);
        addLog('canvas.toDataURL()', `Firma exportada con éxito. Tamaño de la URL: ${Math.round(dataUrl.length / 1024)} KB.`);
      }
    } catch (error: any) {
      if (error.name === 'EmptySignatureError') {
        setValidationError(error.message);
        addLog('Error Capturado', `EmptySignatureError: ${error.message}`);
        try {
          alert(`Error capturado: ${error.message}`);
        } catch (e) {
          console.warn("El navegador bloqueó el alert()", e);
        }
      } else {
        console.error(error);
        addLog('Error Desconocido', error.message || 'Error desconocido al exportar.');
      }
    }
  };

  const clearLogs = () => {
    setLogs([]);
    addLog('Registro Limpiado', 'Historial de callbacks e interacciones reiniciado.');
  };

  // Color options for quick select
  const colorOptions = [
    { name: 'Indigo', value: '#4338ca' },
    { name: 'Emerald', value: '#10b981' },
    { name: 'Rose', value: '#f43f5e' },
    { name: 'Amber', value: '#f59e0b' },
    { name: 'Slate', value: '#0f172a' },
  ];

  // Background style helpers
  const bgColors = [
    { name: 'Blanco', value: '#ffffff' },
    { name: 'Gris Claro', value: '#f8fafc' },
    { name: 'Celeste Suave', value: '#f0fdfa' },
    { name: 'Negro Slate', value: '#0f172a' }
  ];

  return (
    <div className="w-full min-h-full bg-slate-900 text-slate-100 flex flex-col font-sans">
      
      {/* Top Header Banner */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4 sticky top-0 z-30 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 text-white flex items-center justify-center shadow-lg shadow-indigo-500/20 shrink-0">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold tracking-tight text-white flex items-center gap-2">
              Signature Canvas Playground <span className="text-xs bg-indigo-500/20 text-indigo-400 font-semibold px-2 py-0.5 rounded-full border border-indigo-500/30">Dev Tools</span>
            </h1>
            <p className="text-xs text-slate-400">Modifica, depura y prueba todas las propiedades de la firma virtual en tiempo real</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 text-xs bg-slate-900 border border-slate-800 px-4 py-2 rounded-lg">
          <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 shrink-0 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          </span>
          <span className="text-slate-300 font-medium font-mono">Status: Sandbox Activo</span>
        </div>
      </header>

      {/* Main Grid Workspace */}
      <main className="flex-1 p-6 grid grid-cols-1 xl:grid-cols-12 gap-6 max-w-7xl mx-auto w-full overflow-x-hidden">
        
        {/* Left Column - Controls Sidebar (xl:col-span-4) */}
        <section className="xl:col-span-4 order-2 xl:order-1 bg-slate-950 rounded-2xl border border-slate-800 p-6 flex flex-col gap-6 shadow-xl h-fit">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-4">
            <Sliders className="w-5 h-5 text-indigo-400" />
            <h2 className="text-lg font-bold text-white">Controles de Trazo</h2>
          </div>

          {/* Color Control */}
          <div className="flex flex-col gap-3">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Color de Trazo (`strokeColor`)</label>
            <div className="flex flex-wrap gap-2">
              {colorOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => {
                    setStrokeColor(opt.value);
                    addLog('Cambio strokeColor', `Color fijado a: ${opt.name} (${opt.value})`);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                    strokeColor === opt.value
                      ? 'bg-slate-800 border-indigo-500 text-white ring-2 ring-indigo-500/30'
                      : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:bg-slate-900 hover:text-slate-300'
                  }`}
                >
                  <span className="w-3.5 h-3.5 rounded-full shrink-0 border border-slate-700/50" style={{ backgroundColor: opt.value }} />
                  {opt.name}
                </button>
              ))}
              
              {/* Custom hex color */}
              <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-lg overflow-hidden px-2 py-0.5">
                <input
                  type="color"
                  value={customColor}
                  onChange={(e) => {
                    setCustomColor(e.target.value);
                    setStrokeColor(e.target.value);
                    addLog('Cambio strokeColor (Custom)', `Color personalizado: ${e.target.value}`);
                  }}
                  className="w-5 h-5 bg-transparent border-0 rounded cursor-pointer shrink-0"
                />
                <input
                  type="text"
                  value={strokeColor}
                  onChange={(e) => {
                    setStrokeColor(e.target.value);
                    addLog('Cambio strokeColor (Manual)', `Color manual: ${e.target.value}`);
                  }}
                  className="w-16 bg-transparent border-0 text-xs text-slate-300 focus:outline-none focus:ring-0 uppercase font-mono px-1 py-0.5"
                />
              </div>
            </div>
          </div>

          {/* Stroke Width Control */}
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Grosor de Trazo (`strokeWidth`)</label>
              <span className="text-xs bg-slate-800 text-indigo-400 font-mono px-2 py-0.5 rounded-md font-bold">{strokeWidth}px</span>
            </div>
            <input
              type="range"
              min="1"
              max="20"
              step="0.5"
              value={strokeWidth}
              onChange={(e) => {
                const val = parseFloat(e.target.value);
                setStrokeWidth(val);
                addLog('Cambio strokeWidth', `Grosor fijado a: ${val}px`);
              }}
              className="w-full accent-indigo-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg appearance-none"
            />
          </div>

          <div className="border-t border-slate-800/80 my-1" />

          <div className="flex items-center gap-2 border-b border-slate-800 pb-4">
            <Settings className="w-5 h-5 text-indigo-400" />
            <h2 className="text-lg font-bold text-white">Configuración del Canvas</h2>
          </div>

          {/* Background Color of Wrapper */}
          <div className="flex flex-col gap-3">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Fondo del Canvas (`style` / Wrapper)</label>
            <div className="grid grid-cols-2 gap-2">
              {bgColors.map((bg) => (
                <button
                  key={bg.value}
                  onClick={() => {
                    setBgColor(bg.value);
                    addLog('Cambio Fondo del Canvas', `Fondo fijado a: ${bg.name}`);
                  }}
                  className={`py-2 px-3 rounded-lg text-xs font-medium border text-left flex items-center gap-2 transition-all ${
                    bgColor === bg.value
                      ? 'bg-slate-800 border-indigo-500 text-white font-semibold'
                      : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:bg-slate-900 hover:text-slate-300'
                  }`}
                >
                  <span className="w-4 h-4 rounded border border-slate-700/50 shrink-0" style={{ backgroundColor: bg.value }} />
                  {bg.name}
                </button>
              ))}
            </div>
          </div>

          {/* Canvas Height Control */}
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Altura del Canvas (`height`)</label>
              <span className="text-xs bg-slate-800 text-indigo-400 font-mono px-2 py-0.5 rounded-md font-bold">{canvasHeight}px</span>
            </div>
            <input
              type="range"
              min="150"
              max="450"
              step="10"
              value={canvasHeight}
              onChange={(e) => {
                const val = parseInt(e.target.value, 10);
                setCanvasHeight(val);
                addLog('Cambio Altura Canvas', `Altura fijada a: ${val}px. El canvas se redimensionará.`);
              }}
              className="w-full accent-indigo-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg appearance-none"
            />
          </div>

          {/* Toggle Options Grid */}
          <div className="grid grid-cols-1 gap-4 pt-2">
            
            {/* Stabilization Checkbox */}
            <div className="flex items-center justify-between p-3 bg-slate-900/50 border border-slate-800 rounded-xl">
              <div>
                <span className="block text-sm font-semibold text-slate-200">Estabilización de Trazo</span>
                <span className="text-[11px] text-slate-400">`stabilization=&#123;{stabilization.toString()}&#125;`</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={stabilization}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    setStabilization(checked);
                    addLog('Cambio stabilization', `Algoritmo de suavizado: ${checked ? 'Habilitado' : 'Deshabilitado'}`);
                  }}
                  className="sr-only peer"
                />
                <div className="w-10 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate-400 after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600 peer-checked:after:bg-white peer-checked:after:border-indigo-600"></div>
              </label>
            </div>

            {/* AutoCrop Checkbox */}
            <div className="flex items-center justify-between p-3 bg-slate-900/50 border border-slate-800 rounded-xl">
              <div>
                <span className="block text-sm font-semibold text-slate-200">Recorte Automático</span>
                <span className="text-[11px] text-slate-400">`autoCrop=&#123;{autoCrop.toString()}&#125;`</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={autoCrop}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    setAutoCrop(checked);
                    addLog('Cambio autoCrop', `Recorte inteligente de bordes vacíos: ${checked ? 'Habilitado' : 'Deshabilitado'}`);
                  }}
                  className="sr-only peer"
                />
                <div className="w-10 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate-400 after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600 peer-checked:after:bg-white peer-checked:after:border-indigo-600"></div>
              </label>
            </div>

            {/* Throw If Empty Checkbox */}
            <div className="flex items-center justify-between p-3 bg-slate-900/50 border border-slate-800 rounded-xl">
              <div>
                <span className="block text-sm font-semibold text-slate-200">Validar Lienzo Vacío</span>
                <span className="text-[11px] text-slate-400">`throwIfEmpty=&#123;{throwIfEmpty.toString()}&#125;`</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={throwIfEmpty}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    setThrowIfEmpty(checked);
                    addLog('Cambio throwIfEmpty', `Lanzar error si está vacío: ${checked ? 'Habilitado' : 'Deshabilitado'}`);
                  }}
                  className="sr-only peer"
                />
                <div className="w-10 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate-400 after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600 peer-checked:after:bg-white peer-checked:after:border-indigo-600"></div>
              </label>
            </div>

          </div>
        </section>

        {/* Right Columns - Signature Canvas & Live Output / Logger (xl:col-span-8) */}
        <section className="xl:col-span-8 order-1 xl:order-2 flex flex-col gap-6">
          
          {/* Active Canvas Board */}
          <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 flex flex-col gap-6 shadow-xl relative overflow-hidden">
            
            {/* Board Header with action badges */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse" />
                <h2 className="text-lg font-bold text-white">Lienzo de Prueba Interactivo</h2>
              </div>
              
              <div className="flex items-center gap-2">
                {canUndo ? (
                  <span className="text-[10px] font-bold uppercase bg-indigo-500/15 text-indigo-400 px-2 py-1 rounded border border-indigo-500/25 animate-bounce">Con trazos pendientes</span>
                ) : (
                  <span className="text-[10px] font-bold uppercase bg-slate-800 text-slate-400 px-2 py-1 rounded">Lienzo Vacío</span>
                )}
              </div>
            </div>

            {/* Error notifications */}
            {validationError && (
              <div className="p-4 bg-red-950/40 border border-red-800 text-red-200 rounded-xl flex items-center gap-3 animate-in fade-in duration-300">
                <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
                <div className="flex-1 text-xs">
                  <span className="font-extrabold uppercase">Validación fallida:</span> El componente arrojó un error <code className="bg-red-900/30 px-1 py-0.5 rounded text-white font-mono font-semibold">EmptySignatureError</code> al llamar a <code className="bg-red-900/30 px-1 py-0.5 rounded text-white font-mono font-semibold">toDataURL()</code>.
                </div>
                <button
                  onClick={() => setValidationError(null)}
                  className="text-red-400 hover:text-white hover:bg-red-900/30 px-2.5 py-1 rounded-md text-xs font-semibold transition-all"
                >
                  Cerrar
                </button>
              </div>
            )}

            {/* Signature Wrapper with user customized bgColor */}
            <div 
              className="border border-slate-700/80 rounded-xl overflow-hidden relative shadow-inner flex items-center justify-center min-h-[150px] transition-all duration-300"
              style={{ backgroundColor: bgColor }}
            >
              <SignatureCanvas
                ref={canvasRef}
                width="100%"
                height={canvasHeight}
                strokeColor={strokeColor}
                strokeWidth={strokeWidth}
                stabilization={stabilization}
                autoCrop={autoCrop}
                onUndoStateChange={(state) => {
                  setCanUndo(state);
                  addLog('onUndoStateChange', `¿Se puede deshacer?: ${state ? 'SÍ' : 'NO'}`);
                }}
                onDrawStart={() => {
                  setValidationError(null);
                  addLog('onDrawStart', 'Se comenzó a dibujar un trazo en el lienzo.');
                }}
                onDrawEnd={() => {
                  addLog('onDrawEnd', 'Se completó un trazo.');
                }}
                style={{ backgroundColor: 'transparent' }}
              >
                {/* Custom ruler guides to help visual signature aligning */}
                <div 
                  className="absolute inset-0 pointer-events-none opacity-[0.06]"
                  style={{ 
                    backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                  }}
                />
                <div className="absolute bottom-10 left-12 right-12 border-b-2 border-dashed border-slate-400/30 pointer-events-none flex justify-between">
                  <span className="text-[9px] text-slate-400/40 uppercase font-bold tracking-wider -mt-4">Línea de Firma</span>
                  <span className="text-[9px] text-slate-400/40 uppercase font-bold tracking-wider -mt-4">x</span>
                </div>
              </SignatureCanvas>
            </div>

            {/* Footer Action controls */}
            <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900/40 border border-slate-800 p-4 rounded-xl">
              <div className="flex gap-2">
                <button
                  onClick={handleUndo}
                  disabled={!canUndo}
                  className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-lg text-sm font-semibold text-slate-300 hover:bg-slate-850 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-all hover:border-slate-700"
                  title="Deshacer el último trazo dibujado"
                >
                  <Undo2 className="w-4 h-4" />
                  Deshacer
                </button>
                
                <button
                  onClick={handleClear}
                  className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 border border-red-950/40 rounded-lg text-sm font-semibold text-red-400 hover:bg-red-950/20 hover:text-red-300 transition-all hover:border-red-900/50"
                  title="Borrar completamente el lienzo"
                >
                  <Trash2 className="w-4 h-4" />
                  Limpiar
                </button>
              </div>

              <button
                onClick={handleExport}
                className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-sm font-bold text-white shadow-lg shadow-indigo-500/10 hover:shadow-indigo-500/20 active:scale-95 transition-all"
                title="Convertir el canvas actual en una imagen Data URL recortada o completa"
              >
                <Download className="w-4 h-4" />
                Procesar & Exportar Firma
              </button>
            </div>

          </div>

          {/* Bottom Double-Panel: Live Export & Realtime Callbacks Log */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Live Export Preview */}
            <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 flex flex-col gap-4 shadow-xl">
              <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                <Eye className="w-4.5 h-4.5 text-indigo-400" />
                <h3 className="text-md font-bold text-white">Resultado Exportado</h3>
              </div>

              {previewUrl ? (
                <div className="flex-1 flex flex-col justify-between gap-4">
                  <div className="bg-slate-900 rounded-xl p-4 border border-slate-800 flex items-center justify-center min-h-[160px] relative overflow-hidden">
                    
                    {/* Transparent grid backing so transparency in cropped png is evident */}
                    <div 
                      className="absolute inset-0 opacity-[0.03] pointer-events-none"
                      style={{
                        backgroundImage: 'radial-gradient(#fff 20%, transparent 20%), radial-gradient(#fff 20%, transparent 20%)',
                        backgroundPosition: '0 0, 10px 10px',
                        backgroundSize: '20px 20px'
                      }}
                    />
                    
                    <img 
                      src={previewUrl} 
                      alt="Firma recortada" 
                      className="max-h-[140px] w-auto object-contain z-10 drop-shadow-md border border-slate-800/50 rounded p-1 bg-white"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="text-[11px] text-slate-400 leading-relaxed bg-slate-900/50 p-3 rounded-lg border border-slate-800">
                    <span className="font-extrabold text-indigo-400">Tipo de salida:</span> Base64 Data URL (PNG 24 bits con transparencia). El modo <code className="bg-indigo-950 text-indigo-400 px-1 py-0.5 rounded font-mono font-bold">autoCrop</code> extrae de forma automática las dimensiones perfectas de la firma, eliminando espacios blancos no utilizados de las esquinas.
                  </div>
                </div>
              ) : (
                <div className="flex-1 min-h-[210px] flex flex-col items-center justify-center text-center p-6 border border-dashed border-slate-800 rounded-xl bg-slate-900/10">
                  <Download className="w-8 h-8 text-slate-700 mb-3" />
                  <p className="text-sm font-semibold text-slate-500">No hay vista previa</p>
                  <p className="text-xs text-slate-600 max-w-xs mt-1">Dibuja una firma en el lienzo de arriba y haz clic en "Procesar & Exportar Firma".</p>
                </div>
              )}
            </div>

            {/* Realtime Callbacks Log panel */}
            <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 flex flex-col gap-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4.5 h-4.5 text-indigo-400" />
                  <h3 className="text-md font-bold text-white">Registro de Eventos</h3>
                </div>
                
                {logs.length > 0 && (
                  <button
                    onClick={clearLogs}
                    className="flex items-center gap-1 text-[11px] font-semibold text-slate-500 hover:text-slate-300 transition-all bg-slate-900 px-2 py-1 rounded border border-slate-800 hover:border-slate-700"
                  >
                    <ListRestart className="w-3.5 h-3.5" />
                    Limpiar
                  </button>
                )}
              </div>

              <div className="flex-1 max-h-[220px] overflow-y-auto flex flex-col gap-2 scrollbar-thin pr-1">
                {logs.length > 0 ? (
                  logs.map((log) => (
                    <div key={log.id} className="text-xs font-mono bg-slate-900 border border-slate-850 p-2.5 rounded-lg flex flex-col gap-1 hover:border-slate-800 transition-colors">
                      <div className="flex justify-between items-center border-b border-slate-850 pb-1 mb-1">
                        <span className="text-indigo-400 font-extrabold">{log.event}</span>
                        <span className="text-[10px] text-slate-500">{log.timestamp}</span>
                      </div>
                      <span className="text-slate-300 text-[11px] leading-normal">{log.details}</span>
                    </div>
                  ))
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center p-6">
                    <Terminal className="w-8 h-8 text-slate-800 mb-2" />
                    <p className="text-xs text-slate-600">No hay registros aún.</p>
                    <p className="text-[10px] text-slate-700 mt-0.5">Interactúa con el componente para ver los callbacks.</p>
                  </div>
                )}
              </div>
            </div>

          </div>

        </section>

      </main>

      {/* Footer Details */}
      <footer className="mt-12 border-t border-slate-800 bg-slate-950 px-6 py-5 text-center text-xs text-slate-500">
        <p>© 2026 jl-react-virtual-signature-canvas. Distribuido bajo Licencia MIT en módulos separados.</p>
      </footer>

    </div>
  );
}
