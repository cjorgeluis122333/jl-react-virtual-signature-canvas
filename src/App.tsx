import React, { useState, useEffect } from 'react';
import DocsApp from '../documentation/src/App';
import PlaygroundApp from '../playground/src/App';

export default function App() {
  const [isPlayground, setIsPlayground] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('mode') === 'playground' || window.location.pathname.startsWith('/playground');
  });

  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      setIsPlayground(params.get('mode') === 'playground' || window.location.pathname.startsWith('/playground'));
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  if (isPlayground) {
    return <PlaygroundApp />;
  }

  return <DocsApp />;
}
