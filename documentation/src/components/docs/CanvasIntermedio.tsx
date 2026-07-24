import React, { useRef, useState } from 'react';
import { SignatureCanvas, SignatureCanvasRef } from 'jl-react-virtual-signature-canvas';
import CodeBlock from './CodeBlock';
import { Undo2, Trash2, Download, AlertCircle } from 'lucide-react';
import { useLanguage } from '../../language/LanguageContext';

const codeString = `import React, { useRef, useState } from 'react';
import { SignatureCanvas, SignatureCanvasRef } from 'jl-react-virtual-signature-canvas';
import { Undo2, Trash2, Download, AlertCircle } from 'lucide-react';

export default function CanvasIntermediate() {
  const canvasRef = useRef<SignatureCanvasRef>(null);
  const [canUndo, setCanUndo] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleClear = () => {
    canvasRef.current?.clear();
    setPreview(null);
    setErrorMsg(null);
  };

  const handleUndo = () => {
    canvasRef.current?.undo();
    setPreview(null);
    setErrorMsg(null);
  };

  const handleSave = () => {
    try {
      // Pass \`true\` as third parameter to validate that it is not empty.
      // If empty, it throws a catchable error.
      const dataUrl = canvasRef.current?.toDataURL('image/png', undefined, true);
      
      if (dataUrl) {
        setPreview(dataUrl);
        setErrorMsg(null);
        // Automatically download the image
        const a = document.createElement('a');
        a.href = dataUrl;
        a.download = 'cropped-signature.png';
        document.body.appendChild(a); a.click(); document.body.removeChild(a);
      }
    } catch (error: any) {
      if (error.name === 'EmptySignatureError') {
        setErrorMsg(error.message); // Visual banner
        alert(error.message);       // Fallback alert
      } else {
        console.error(error);
      }
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {errorMsg && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
          <div className="flex-1 text-sm font-medium">Error: {errorMsg}</div>
          <button onClick={() => setErrorMsg(null)} className="text-red-500 hover:text-red-700 font-bold text-xs">Close</button>
        </div>
      )}

      <div className="border-2 border-indigo-200 rounded-xl overflow-hidden bg-indigo-50">
        <SignatureCanvas 
          ref={canvasRef}
          width="100%"
          height={300}
          strokeColor="#4338ca"
          strokeWidth={4}
          autoCrop={true}
          onUndoStateChange={setCanUndo}
          onDrawStart={() => setErrorMsg(null)}
        />
      </div>

      <div className="flex gap-3">
        <button onClick={handleUndo} disabled={!canUndo}>Undo</button>
        <button onClick={handleClear}>Clear</button>
        <button onClick={handleSave}>Save Cropped</button>
      </div>
      
      {preview && <img src={preview} alt="Signature" className="border" />}
    </div>
  );
}`;

export default function CanvasIntermedio() {
  const { language, t } = useLanguage();
  const canvasRef = useRef<SignatureCanvasRef>(null);
  const [canUndo, setCanUndo] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleClear = () => {
    canvasRef.current?.clear();
    setPreview(null);
    setErrorMsg(null);
  };

  const handleUndo = () => {
    canvasRef.current?.undo();
    setPreview(null);
    setErrorMsg(null);
  };

  const handleSave = () => {
    try {
      // Pasamos `true` como tercer parámetro para validar que no esté vacío.
      // Si está vacío, lanzará un error que podemos atrapar.
      const dataUrl = canvasRef.current?.toDataURL('image/png', undefined, true);
      
      if (dataUrl) {
        setPreview(dataUrl);
        setErrorMsg(null);
        // Descargamos la imagen automáticamente
        const a = document.createElement('a');
        a.href = dataUrl;
        a.download = 'firma-intermedia.png';
        document.body.appendChild(a); a.click(); document.body.removeChild(a);
      }
    } catch (error: any) {
      if (error.name === 'EmptySignatureError') {
        const localizedMsg = language === 'es'
          ? 'La firma está vacía. Por favor, firme antes de guardar.'
          : 'Signature is empty. Please sign before saving.';
        setErrorMsg(localizedMsg); // Muestra en el banner visual
        try {
          alert(localizedMsg); // Muestra el alert nativo si está disponible
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
        <h2 className="text-3xl font-bold text-slate-800 mb-3">{t.intermediate.title}</h2>
        <p className="text-slate-600">
          {language === 'es' ? (
            <>
              Personalizando el color, grosor, rastreando el historial para <span className="font-semibold text-slate-700">Deshacer</span>, y usando <code className="bg-slate-100 text-pink-600 px-1.5 py-0.5 rounded ml-1 text-sm">autoCrop=&#123;true&#125;</code> para extraer la firma sin los bordes blancos. Además, validamos mediante captura de error si está vacío.
            </>
          ) : (
            <>
              Customizing color, thickness, tracking history for <span className="font-semibold text-slate-700">Undo</span>, and using <code className="bg-slate-100 text-pink-600 px-1.5 py-0.5 rounded ml-1 text-sm">autoCrop=&#123;true&#125;</code> to extract the signature without white borders. Additionally, we validate via error catching if it is empty.
            </>
          )}
        </p>
      </div>

      <div className="p-8 bg-white rounded-2xl shadow-sm border border-slate-200 mb-8">
        <div className="flex flex-col gap-6 max-w-lg mx-auto">
          <div className="flex justify-between items-end mb-2">
            <label className="text-sm font-semibold text-indigo-900 uppercase tracking-wider">{t.intermediate.label}</label>
            <span className="text-xs text-slate-400">{t.intermediate.required}</span>
          </div>

          {errorMsg && (
            <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-center gap-3 animate-in slide-in-from-top-2 duration-200">
              <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
              <div className="flex-1 text-sm">
                <span className="font-semibold">{t.intermediate.errorHeader}</span> {errorMsg}
              </div>
              <button 
                onClick={() => setErrorMsg(null)} 
                className="text-red-500 hover:text-red-700 font-bold text-xs px-2 py-1 rounded hover:bg-red-100 transition-colors"
              >
                {t.intermediate.closeBtn}
              </button>
            </div>
          )}
          
          <div className="border-2 border-indigo-200 rounded-xl overflow-hidden bg-indigo-50/50 focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-500/20 transition-all">
            <SignatureCanvas 
              ref={canvasRef}
              width="100%"
              height={220}
              strokeColor="#4338ca"
              strokeWidth={4}
              autoCrop={true}
              onUndoStateChange={setCanUndo}
              onDrawStart={() => setErrorMsg(null)}
              style={{ backgroundColor: 'transparent' }}
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button 
              onClick={handleUndo} 
              disabled={!canUndo}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Undo2 className="w-4 h-4" />
              {t.intermediate.undoBtn}
            </button>
            <button 
              onClick={handleClear}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors mr-auto"
            >
              <Trash2 className="w-4 h-4" />
              {t.intermediate.clearBtn}
            </button>
            <button 
              onClick={handleSave}
              className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 shadow-sm transition-all hover:shadow focus:ring-4 focus:ring-indigo-600/20"
            >
              <Download className="w-4 h-4" />
              {t.intermediate.downloadBtn}
            </button>
          </div>
          
          {preview && (
            <div className="mt-6 p-4 bg-slate-50 border border-slate-200 rounded-xl animate-in slide-in-from-top-4 fade-in duration-300">
              <p className="text-sm text-slate-500 font-medium mb-3">{t.intermediate.previewLabel}</p>
              <div className="bg-white border border-slate-200 rounded-lg p-4 flex justify-center">
                <img src={preview} alt={t.intermediate.previewAlt} className="max-w-full h-auto drop-shadow-sm" />
              </div>
            </div>
          )}
        </div>
      </div>

      <CodeBlock code={codeString} />
    </div>
  );
}
