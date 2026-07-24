import React from 'react';

export default function CodeBlock({ code }: { code: string }) {
  return (
    <div className="mt-8 bg-slate-900 rounded-xl overflow-hidden shadow-lg border border-slate-700">
      <div className="flex items-center px-4 py-2 bg-slate-800 border-b border-slate-700">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="ml-4 text-xs text-slate-400 font-mono">Code Example</div>
      </div>
      <div className="p-4 overflow-x-auto">
        <pre className="text-sm font-mono text-slate-50 leading-relaxed">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}
