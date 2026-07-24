import React, { useRef } from 'react';
import { SignatureCanvas, SignatureCanvasRef } from 'jl-react-virtual-signature-canvas';
import CodeBlock from './CodeBlock';
import { useLanguage } from '../../language/LanguageContext';

const codeString = `import React, { useRef } from 'react';
import { SignatureCanvas, SignatureCanvasRef } from 'jl-react-virtual-signature-canvas';

export default function CanvasBasico() {
  const canvasRef = useRef<SignatureCanvasRef>(null);

  const handleClear = () => {
    canvasRef.current?.clear();
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="border-2 border-slate-200 rounded-xl overflow-hidden bg-white">
        <SignatureCanvas 
          ref={canvasRef}
          width="100%"
          height={300}
        />
      </div>
      <button 
        onClick={handleClear}
        className="px-4 py-2 bg-slate-100 border border-slate-200 rounded-lg text-slate-700 font-medium hover:bg-slate-200"
      >
        Clear Signature
      </button>
    </div>
  );
}`;

export default function CanvasBasico() {
  const { language, t } = useLanguage();
  const canvasRef = useRef<SignatureCanvasRef>(null);

  const handleClear = () => {
    canvasRef.current?.clear();
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 md:p-10 animate-in fade-in duration-500">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-800 mb-3">{t.basic.title}</h2>
        <p className="text-slate-600">
          {language === 'es' ? (
            <>
              La forma más simple de utilizar el componente. Solo requiere montar el 
              <code className="bg-slate-100 text-pink-600 px-1.5 py-0.5 rounded mx-1 text-sm">SignatureCanvas</code> 
              y pasarle una referencia para poder limpiar el lienzo.
            </>
          ) : (
            <>
              The simplest way to use the component. It only requires mounting the 
              <code className="bg-slate-100 text-pink-600 px-1.5 py-0.5 rounded mx-1 text-sm">SignatureCanvas</code> 
              and passing it a reference to be able to clear the canvas.
            </>
          )}
        </p>
      </div>

      <div className="p-8 bg-white rounded-2xl shadow-sm border border-slate-200 mb-8">
        <div className="flex flex-col gap-4">
          <div className="border-2 border-slate-200 rounded-xl overflow-hidden bg-slate-50">
            <SignatureCanvas 
              ref={canvasRef}
              width="100%"
              height={300}
            />
          </div>
          <button 
            onClick={handleClear}
            className="self-start px-6 py-2.5 bg-slate-100 border border-slate-200 rounded-lg text-slate-700 font-semibold hover:bg-slate-200 transition-colors"
          >
            {t.basic.clearBtn}
          </button>
        </div>
      </div>

      <CodeBlock code={codeString} />
    </div>
  );
}

