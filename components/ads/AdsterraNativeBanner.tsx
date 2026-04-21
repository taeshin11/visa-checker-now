'use client';
import { useEffect, useRef } from 'react';

export function AdsterraNativeBanner() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current || ref.current.dataset.loaded) return;
    ref.current.dataset.loaded = '1';
    const s = document.createElement('script');
    s.async = true; s.setAttribute('data-cfasync', 'false');
    s.src = 'https://pl29147478.profitablecpmratenetwork.com/913d8bcca14ae7d228dd92cddd631f1b/invoke.js';
    ref.current.appendChild(s);
  }, []);
  return <div ref={ref} id="container-913d8bcca14ae7d228dd92cddd631f1b" style={{ margin: '1.5rem 0', minHeight: '90px' }} />;
}
