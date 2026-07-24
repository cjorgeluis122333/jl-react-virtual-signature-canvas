import React, { useState } from 'react';
import { Menu, X, Terminal, BookOpen, Layers, Award, Sparkles, Code2, Globe } from 'lucide-react';
import GetStarted from './components/docs/GetStarted';
import CanvasBasico from './components/docs/CanvasBasico';
import CanvasIntermedio from './components/docs/CanvasIntermedio';
import CanvasAvanzado from './components/docs/CanvasAvanzado';
import { useLanguage, LanguageProvider } from './language/LanguageContext';

type DocSection = 'get-started' | 'basic' | 'intermediate' | 'advanced';

interface NavigationItem {
  id: DocSection;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface NavigationGroup {
  sectionTitle: string;
  items: NavigationItem[];
}

function DocumentationAppContent() {
  const { language, setLanguage, t } = useLanguage();
  const [currentSection, setCurrentSection] = useState<DocSection>('get-started');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleGoToPlayground = () => {
    window.history.pushState({}, '', '?mode=playground');
    window.dispatchEvent(new Event('popstate'));
  };

  const navGroups: NavigationGroup[] = [
    {
      sectionTitle: t.nav.startGuide,
      items: [
        {
          id: 'get-started',
          title: t.nav.getStarted,
          description: t.nav.getStartedDesc,
          icon: Terminal,
        }
      ]
    },
    {
      sectionTitle: t.nav.usageExamples,
      items: [
        {
          id: 'basic',
          title: t.nav.basicExample,
          description: t.nav.basicExampleDesc,
          icon: BookOpen,
        },
        {
          id: 'intermediate',
          title: t.nav.intermediateExample,
          description: t.nav.intermediateExampleDesc,
          icon: Layers,
        },
        {
          id: 'advanced',
          title: t.nav.advancedExample,
          description: t.nav.advancedExampleDesc,
          icon: Award,
        }
      ]
    }
  ];

  const renderContent = () => {
    switch (currentSection) {
      case 'get-started':
        return <GetStarted />;
      case 'basic':
        return <CanvasBasico />;
      case 'intermediate':
        return <CanvasIntermedio />;
      case 'advanced':
        return <CanvasAvanzado />;
    }
  };

  return (
    <div className="flex h-screen w-full bg-slate-50 text-slate-800 overflow-hidden font-sans">
      
      {/* SIDEBAR - DESKTOP */}
      <aside className="hidden lg:flex flex-col w-80 bg-white border-r border-slate-200 shrink-0 select-none">
        {/* Brand Header */}
        <div className="h-16 flex items-center px-6 border-b border-slate-100 gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center shadow-md shadow-indigo-100">
            <Code2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-slate-900 leading-tight tracking-tight">{t.nav.brandTitle}</h1>
            <span className="text-[10px] text-indigo-600 font-semibold uppercase tracking-wider">{t.nav.brandSubtitle}</span>
          </div>
        </div>

        {/* Playground Featured Button */}
        <div className="p-4 border-b border-slate-100">
          <button
            onClick={handleGoToPlayground}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-semibold text-xs shadow-md shadow-indigo-100 hover:shadow-indigo-200 transition-all active:scale-[0.98]"
          >
            <Sparkles className="w-4 h-4 text-indigo-200 animate-pulse" />
            <span>{t.nav.playgroundBtn}</span>
          </button>
        </div>

        {/* Navigation Groups */}
        <nav className="flex-1 p-5 space-y-6 overflow-y-auto">
          {navGroups.map((group, groupIdx) => (
            <div key={groupIdx} className="space-y-2.5">
              <h3 className="px-3 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                {group.sectionTitle}
              </h3>
              <div className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentSection === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setCurrentSection(item.id)}
                      className={`w-full text-left p-3.5 rounded-xl transition-all duration-150 flex items-start gap-3 focus:outline-none ${
                        isActive
                          ? 'bg-indigo-50/80 text-indigo-700 font-medium border-l-4 border-indigo-600 shadow-sm'
                          : 'hover:bg-slate-50 text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                      <div className="flex-1">
                        <span className="block text-sm font-semibold">{item.title}</span>
                        <span className={`block text-[11px] mt-0.5 leading-normal ${isActive ? 'text-indigo-600/70' : 'text-slate-400'}`}>
                          {item.description}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Language switcher footer for Desktop */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 pl-2">
            <Globe className="w-4 h-4 text-slate-400" />
            <span>Language</span>
          </div>
          <div className="flex bg-slate-200/50 p-0.5 rounded-lg border border-slate-200/30">
            <button
              onClick={() => setLanguage('es')}
              className={`px-3 py-1 rounded-md text-[10px] font-bold transition-all duration-150 ${
                language === 'es'
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              ES
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`px-3 py-1 rounded-md text-[10px] font-bold transition-all duration-150 ${
                language === 'en'
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              EN
            </button>
          </div>
        </div>
      </aside>

      {/* MOBILE HEADER */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 z-40 select-none">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shadow-md shadow-indigo-100">
            <Code2 className="w-4.5 h-4.5 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-slate-900 text-sm leading-tight">{t.nav.brandTitle}</h1>
            <span className="text-[9px] text-indigo-600 font-semibold uppercase tracking-wider block">Doc</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleGoToPlayground}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-sm transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Playground</span>
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors focus:outline-none"
            aria-label="Abrir menú"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* MOBILE DRAWER / MENU OVERLAY */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-slate-950/40 backdrop-blur-sm z-30 transition-opacity" onClick={() => setIsMobileMenuOpen(false)}>
          <aside 
            className="fixed top-0 left-0 bottom-0 w-72 bg-white flex flex-col shadow-2xl transition-transform animate-slide-in-left duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="h-16 flex items-center px-6 border-b border-slate-100 gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center">
                <Code2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-slate-900 leading-tight">{t.nav.brandTitle}</h1>
                <span className="text-[10px] text-indigo-600 font-semibold uppercase tracking-wider">{t.nav.brandSubtitle}</span>
              </div>
            </div>

            {/* Mobile Playground Button */}
            <div className="p-4 border-b border-slate-100">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleGoToPlayground();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold text-xs shadow-md shadow-indigo-100"
              >
                <Sparkles className="w-4 h-4 text-indigo-200" />
                <span>{t.nav.playgroundBtn}</span>
              </button>
            </div>

            {/* Mobile Navigation Groups */}
            <nav className="flex-1 p-5 space-y-6 overflow-y-auto">
              {navGroups.map((group, groupIdx) => (
                <div key={groupIdx} className="space-y-2.5">
                  <h3 className="px-3 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                    {group.sectionTitle}
                  </h3>
                  <div className="space-y-1">
                    {group.items.map((item) => {
                      const Icon = item.icon;
                      const isActive = currentSection === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => {
                            setCurrentSection(item.id);
                            setIsMobileMenuOpen(false);
                          }}
                          className={`w-full text-left p-3.5 rounded-xl transition-all duration-150 flex items-start gap-3 focus:outline-none ${
                            isActive
                              ? 'bg-indigo-50 text-indigo-700 font-semibold border-l-4 border-indigo-600 shadow-sm'
                              : 'hover:bg-slate-50 text-slate-600 hover:text-slate-950'
                          }`}
                        >
                          <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                          <div className="flex-1">
                            <span className="block text-sm font-semibold">{item.title}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </nav>

            {/* Language switcher footer for Mobile */}
            <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 pl-2">
                <Globe className="w-4 h-4 text-slate-400" />
                <span>Language</span>
              </div>
              <div className="flex bg-slate-200/50 p-0.5 rounded-lg border border-slate-200/30">
                <button
                  onClick={() => setLanguage('es')}
                  className={`px-3 py-1 rounded-md text-[10px] font-bold transition-all duration-150 ${
                    language === 'es'
                      ? 'bg-white text-indigo-600 shadow-sm'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  ES
                </button>
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-3 py-1 rounded-md text-[10px] font-bold transition-all duration-150 ${
                    language === 'en'
                      ? 'bg-white text-indigo-600 shadow-sm'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  EN
                </button>
              </div>
            </div>
          </aside>
        </div>
      )}

      {/* MAIN CONTENT CONTAINER (Occupies exactly 100% of the free remaining space) */}
      <main className="flex-1 h-full overflow-y-auto pt-16 lg:pt-0 bg-white relative z-10">
        {renderContent()}
      </main>

    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <DocumentationAppContent />
    </LanguageProvider>
  );
}

