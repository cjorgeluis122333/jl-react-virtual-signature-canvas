import React, { useRef, useState } from 'react';
import { SignatureCanvas, SignatureCanvasRef } from 'jl-react-virtual-signature-canvas';
import CodeBlock from './CodeBlock';
import { Undo2, Trash2, Download, MousePointer2, AlertCircle } from 'lucide-react';
import { useLanguage } from '../../language/LanguageContext';

const codeString = `import React, { useRef, useState, useEffect } from 'react';
import { SignatureCanvas, SignatureCanvasRef } from 'jl-react-virtual-signature-canvas';
import { Undo2, Trash2, Download, MousePointer2, AlertCircle } from 'lucide-react';

export default function CanvasAdvanced() {
  const canvasRef = useRef<SignatureCanvasRef>(null);
  const [canUndo, setCanUndo] = useState(false);
  const [stabilization, setStabilization] = useState(true);
  const [width, setWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Example of making it responsive to the container width
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      setWidth(entries[0].contentRect.width);
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const handleExport = () => {
    try {
      // Pass \`true\` as third parameter to validate if empty
      // and throw a catchable error if needed.
      const dataUrl = canvasRef.current?.toDataURL('image/png', undefined, true);
      
      if (dataUrl) {
        setErrorMsg(null);
        // Download the image
        const a = document.createElement('a');
        a.href = dataUrl;
        a.download = 'digital-signature.png';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
    } catch (error: any) {
      if (error.name === 'EmptySignatureError') {
        setErrorMsg("Please provide a signature first. (Captured error)");
        alert("Please provide a signature first. (Captured error)");
      } else {
        console.error(error);
      }
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center bg-slate-900 p-4 rounded-t-xl text-white">
        <span className="font-bold">Digital Contract</span>
        <label className="flex items-center gap-2 cursor-pointer bg-slate-800 px-3 py-1.5 rounded-lg text-sm hover:bg-slate-700 transition-colors">
          <input 
            type="checkbox" 
            checked={stabilization}
            onChange={(e) => setStabilization(e.target.checked)}
          />
          Stroke Stabilization
        </label>
      </div>

      <div 
        ref={containerRef}
        className="border-x-2 border-b-2 border-slate-900 rounded-b-xl overflow-hidden relative p-4 bg-slate-50"
      >
        {errorMsg && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
            <div className="flex-1 text-sm font-medium">{errorMsg}</div>
            <button onClick={() => setErrorMsg(null)} className="text-red-500 hover:text-red-700 font-bold text-xs">Close</button>
          </div>
        )}

        <SignatureCanvas 
          ref={canvasRef}
          width={width || 500}
          height={350}
          strokeColor="#0f172a"
          strokeWidth={2.5}
          stabilization={stabilization}
          autoCrop={true}
          onUndoStateChange={setCanUndo}
          onDrawStart={() => setErrorMsg(null)}
          style={{ backgroundColor: '#f8fafc' }}
        >
          {/* Custom children behind canvas */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{ backgroundImage: 'linear-gradient(#94a3b8 1px, transparent 1px)', backgroundSize: '100% 40px' }}
          />
        </SignatureCanvas>
      </div>

      <div className="flex justify-between">
        <div className="flex gap-2">
          <button onClick={() => canvasRef.current?.undo()} disabled={!canUndo}>Undo</button>
          <button onClick={() => canvasRef.current?.clear()}>Clear</button>
        </div>
        <button onClick={handleExport} className="bg-indigo-600 text-white px-4 py-2 rounded">
          Export Signature
        </button>
      </div>
    </div>
  );
}`;

export default function CanvasAvanzado() {
  const { language, t } = useLanguage();
  const canvasRef = useRef<SignatureCanvasRef>(null);
  const [canUndo, setCanUndo] = useState(false);
  const [stabilization, setStabilization] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleExport = () => {
    try {
      // Pass `true` as third parameter to validate that signature is not empty.
      const dataUrl = canvasRef.current?.toDataURL('image/png', undefined, true);
      
      if (dataUrl) {
        setErrorMsg(null);
        // Download image
        const a = document.createElement('a');
        a.href = dataUrl;
        a.download = 'digital-signature.png';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
    } catch (error: any) {
      if (error.name === 'EmptySignatureError') {
        const message = language === 'es'
          ? "Por favor, proporciona una firma primero. (Error capturado)"
          : "Please provide a signature first. (Captured error)";
        setErrorMsg(message);
        try {
          alert(message);
        } catch (e) {
          console.warn("Navegador bloqueó el alert() nativo:", e);
        }
      } else {
        console.error(error);
      }
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 md:p-10 animate-in fade-in duration-500">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-800 mb-3">{t.advanced.title}</h2>
        <p className="text-slate-600">
          {language === 'es' ? (
            <>
              Uso completo de la API. Inyectando hijos personalizados detrás del canvas (como guías de escritura), observando el tamaño del contenedor para responsividad perfecta, controlando la estabilización del algoritmo en tiempo real y permitiendo exportar la firma con validación de estado vacío opcional usando manejo de errores.
            </>
          ) : (
            <>
              Full API usage. Injecting custom children behind the canvas (as writing guides), observing container size for perfect responsiveness, controlling algorithm stabilization in real-time, and allowing signature export with optional empty-state validation using error handling.
            </>
          )}
        </p>
      </div>

      <div className="p-8 bg-white rounded-2xl shadow-sm border border-slate-200 mb-8">
        <div className="flex flex-col gap-0 max-w-2xl mx-auto shadow-lg rounded-xl overflow-hidden">
          
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-900 p-4 sm:px-6 text-white">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center">
                <MousePointer2 className="w-4 h-4 text-indigo-400" />
              </div>
              <span className="font-bold text-lg">{t.advanced.contractTitle}</span>
            </div>
            <label className="flex items-center gap-2 cursor-pointer bg-slate-800 px-3 py-1.5 rounded-lg text-sm hover:bg-slate-700 transition-colors">
              <input 
                type="checkbox" 
                checked={stabilization}
                onChange={(e) => setStabilization(e.target.checked)}
                className="w-4 h-4 rounded text-indigo-500 focus:ring-indigo-500 border-slate-600 bg-slate-900"
              />
              <span className="text-slate-200">{t.advanced.stabilization}</span>
            </label>
          </div>

          <div 
            className="border-x border-b border-slate-300 bg-slate-50 relative animate-all duration-300"
          >
            {errorMsg && (
              <div className="mx-6 mt-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-center gap-3 animate-in slide-in-from-top-2 duration-200">
                <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
                <div className="flex-1 text-sm font-semibold">
                  {errorMsg}
                </div>
                <button 
                  onClick={() => setErrorMsg(null)} 
                  className="text-red-500 hover:text-red-700 font-bold text-xs px-2 py-1 rounded hover:bg-red-100 transition-colors"
                >
                  {t.advanced.closeBtn}
                </button>
              </div>
            )}

            <div className="p-6 pb-2 text-sm text-slate-500 text-center uppercase tracking-widest font-semibold">
              {t.advanced.signHere}
            </div>
            
            <div className="relative mx-6 mb-6 rounded-lg overflow-hidden border-2 border-dashed border-slate-300">
              <SignatureCanvas 
                ref={canvasRef}
                width="100%"
                height={250}
                strokeColor="#0f172a"
                strokeWidth={3}
                stabilization={stabilization}
                autoCrop={true}
                onUndoStateChange={setCanUndo}
                onDrawStart={() => setErrorMsg(null)}
                style={{ backgroundColor: '#ffffff' }}
              >
                <div 
                  className="absolute inset-0 pointer-events-none opacity-[0.15]"
                  style={{ 
                    backgroundImage: 'linear-gradient(#0f172a 1.5px, transparent 1.5px)', 
                    backgroundSize: '100% 50px',
                    backgroundPosition: '0 25px'
                  }}
                />
              </SignatureCanvas>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 pt-0">
              <div className="flex gap-2">
                <button 
                  onClick={() => {
                    canvasRef.current?.undo();
                    setErrorMsg(null);
                  }} 
                  disabled={!canUndo}
                  className="flex items-center gap-1.5 px-4 py-2 bg-white border border-slate-200 rounded-md text-sm text-slate-700 font-medium hover:bg-slate-50 disabled:opacity-40 transition-colors"
                >
                  <Undo2 className="w-4 h-4" /> {t.advanced.undoBtn}
                </button>
                <button 
                  onClick={() => {
                    canvasRef.current?.clear();
                    setErrorMsg(null);
                  }}
                  className="flex items-center gap-1.5 px-4 py-2 bg-white border border-slate-200 rounded-md text-sm text-red-600 font-medium hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="w-4 h-4" /> {t.advanced.clearBtn}
                </button>
              </div>
              <button 
                onClick={handleExport}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm w-full sm:w-auto justify-center"
              >
                <Download className="w-4 h-4" /> {t.advanced.exportBtn}
              </button>
            </div>
          </div>
          
        </div>
      </div>

      <CodeBlock code={codeString} />
    </div>
  );
}

