import React, { useState } from 'react';
import { Terminal, Copy, Check, Sparkles, ExternalLink } from 'lucide-react';
import { ParticleBackground } from 'jl-particle-interactive';
import { useLanguage } from '../../language/LanguageContext';

export default function GetStarted() {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);
  
  const command = 'npm install jl-react-virtual-signature-canvas';

  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative w-full min-h-full lg:min-h-screen flex flex-col items-center justify-center p-6 md:p-12 bg-white overflow-hidden">
      {/* Interactive Particle Background with FOLLOW_POINTER mode and perfect lightweight density */}
      <div className="absolute inset-0 z-0 pointer-events-none w-full h-full">
        <ParticleBackground
          name="FOLLOW_POINTER"
          backgroundColor="transparent"
          width="100%"
          height="100%"
          className="w-full h-full"
          config={{
            colors: ['#6366f1', '#8b5cf6', '#3b82f6', '#ec4899'],
            colorMode: 'wave',
            density: 1.5, // Increased density as requested by user
            lineDistance: 130,
            interactionRadius: 240,
            particleSpeed: 1.0,
            shape: 'bean',
          }}
        />
      </div>

      {/* Decorative ultra-subtle gradient orbs for gentle background lighting */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[32rem] h-[32rem] bg-indigo-50/30 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/3 translate-x-1/2 translate-y-1/2 w-[32rem] h-[32rem] bg-purple-50/20 rounded-full blur-3xl pointer-events-none z-0" />

      {/* Main Content Area */}
      <div className="relative z-10 max-w-xl w-full text-center mb-8 pointer-events-auto flex flex-col items-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight leading-tight">
          {t.getStarted.title}
        </h1>
        <p className="text-base text-slate-600 max-w-md mx-auto leading-relaxed mb-6">
          {t.getStarted.subtitle}
        </p>

        <button
          onClick={() => {
            window.history.pushState({}, '', '?mode=playground');
            window.dispatchEvent(new Event('popstate'));
          }}
          className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-bold text-sm shadow-xl shadow-indigo-200 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
        >
          <Sparkles className="w-5 h-5 text-indigo-200 animate-pulse" />
          <span>{t.nav?.playgroundBtn || 'Probar Playground 🚀'}</span>
        </button>
      </div>

      {/* Installation card (Pure Glassmorphism style over light background) */}
      <div className="relative z-10 bg-white/70 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-slate-100 w-full max-w-xl pointer-events-auto transition-all duration-300 hover:border-indigo-150 hover:shadow-2xl">
        <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
          <Terminal className="w-5 h-5 text-indigo-600" />
          {t.getStarted.quickInstall}
        </h2>
        
        <p className="text-slate-600 mb-4 text-sm">
          {t.getStarted.installInstructions}
        </p>

        <div className="flex items-center justify-between bg-slate-900 rounded-xl p-4 border border-slate-800 relative group overflow-hidden">
          <code className="text-indigo-200 font-mono text-sm pr-4 overflow-x-auto whitespace-nowrap scrollbar-thin scrollbar-thumb-slate-800">
            {command}
          </code>
          
          <button 
            onClick={handleCopy}
            className="p-2.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-200 transition-colors border border-slate-700 flex items-center justify-center shrink-0 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            title={t.getStarted.copy}
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>

        <div className="mt-6 flex items-center justify-between text-xs text-slate-500 border-t border-slate-100 pt-4">
          <span>{t.getStarted.license}</span>
          <span>{t.getStarted.noDeps}</span>
        </div>
      </div>

      {/* Soft library reference for jl-particle-interactive */}
      <p className="relative z-10 mt-8 text-center text-[11px] text-slate-400 max-w-md pointer-events-auto leading-relaxed">
        {t.getStarted.bgHint}{' '}
        <a 
          href="https://www.npmjs.com/package/jl-particle-interactive" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-slate-400 hover:text-indigo-500 font-semibold inline-flex items-center gap-0.5 hover:underline transition-colors"
        >
          jl-particle-interactive
          <ExternalLink className="w-2.5 h-2.5 inline" />
        </a>.
      </p>
    </div>
  );
}

