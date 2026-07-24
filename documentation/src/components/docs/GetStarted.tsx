import React, { useState } from 'react';
import { Terminal, Copy, Check, ExternalLink, Smartphone, Sparkles, Crop, ShieldCheck, HelpCircle } from 'lucide-react';
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
    <div className="relative w-full min-h-full flex flex-col items-center justify-start p-6 md:p-12 bg-white overflow-x-hidden">
      {/* Interactive Particle Background */}
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
            density: 1.5,
            lineDistance: 130,
            interactionRadius: 240,
            particleSpeed: 1.0,
            shape: 'bean',
          }}
        />
      </div>

      {/* Decorative ultra-subtle gradient orbs */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[32rem] h-[32rem] bg-indigo-50/30 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/3 translate-x-1/2 translate-y-1/2 w-[32rem] h-[32rem] bg-purple-50/20 rounded-full blur-3xl pointer-events-none z-0" />

      {/* Main Hero Header */}
      <div className="relative z-10 max-w-2xl w-full text-center mb-8 pointer-events-auto flex flex-col items-center pt-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight leading-tight">
          {t.getStarted.title}
        </h1>
        <p className="text-base text-slate-600 max-w-lg mx-auto leading-relaxed">
          {t.getStarted.subtitle}
        </p>
      </div>

      {/* Installation card */}
      <div className="relative z-10 bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-slate-100 w-full max-w-xl pointer-events-auto transition-all duration-300 hover:border-indigo-150 hover:shadow-2xl mb-12">
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

      {/* Key Features Grid (SEO & UX) */}
      <div className="relative z-10 w-full max-w-4xl pointer-events-auto mb-14">
        <h2 className="text-2xl font-bold text-slate-900 text-center mb-8 tracking-tight">
          {t.features.title}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="p-6 rounded-2xl bg-white/70 backdrop-blur-sm border border-slate-100 shadow-md hover:shadow-lg transition-all">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
              <Smartphone className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 mb-2">{t.features.mobileTitle}</h3>
            <p className="text-sm text-slate-600 leading-relaxed">{t.features.mobileDesc}</p>
          </div>

          <div className="p-6 rounded-2xl bg-white/70 backdrop-blur-sm border border-slate-100 shadow-md hover:shadow-lg transition-all">
            <div className="w-10 h-10 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center mb-4">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 mb-2">{t.features.smoothTitle}</h3>
            <p className="text-sm text-slate-600 leading-relaxed">{t.features.smoothDesc}</p>
          </div>

          <div className="p-6 rounded-2xl bg-white/70 backdrop-blur-sm border border-slate-100 shadow-md hover:shadow-lg transition-all">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
              <Crop className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 mb-2">{t.features.cropTitle}</h3>
            <p className="text-sm text-slate-600 leading-relaxed">{t.features.cropDesc}</p>
          </div>

          <div className="p-6 rounded-2xl bg-white/70 backdrop-blur-sm border border-slate-100 shadow-md hover:shadow-lg transition-all">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 mb-2">{t.features.tsTitle}</h3>
            <p className="text-sm text-slate-600 leading-relaxed">{t.features.tsDesc}</p>
          </div>
        </div>
      </div>

      {/* Structured FAQ Section (AIO / SEO Search Engine Crawling) */}
      <div className="relative z-10 w-full max-w-3xl pointer-events-auto mb-10">
        <h2 className="text-2xl font-bold text-slate-900 text-center mb-6 flex items-center justify-center gap-2">
          <HelpCircle className="w-6 h-6 text-indigo-600" />
          {t.faq.title}
        </h2>

        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200/80">
            <h3 className="font-semibold text-slate-900 text-sm mb-2">{t.faq.q1}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">{t.faq.a1}</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200/80">
            <h3 className="font-semibold text-slate-900 text-sm mb-2">{t.faq.q2}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">{t.faq.a2}</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200/80">
            <h3 className="font-semibold text-slate-900 text-sm mb-2">{t.faq.q3}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">{t.faq.a3}</p>
          </div>
        </div>
      </div>

      {/* Footer background credit */}
      <p className="relative z-10 mt-4 text-center text-[11px] text-slate-400 max-w-md pointer-events-auto leading-relaxed pb-8">
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

