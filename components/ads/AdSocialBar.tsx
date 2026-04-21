'use client';
import { useEffect } from 'react';

export function AdSocialBar() {
  useEffect(() => {
    const srcs = ["https://pl29147477.profitablecpmratenetwork.com/a5/c7/65/a5c765f2a734899ffba15c5f06a7821e.js", "https://pl29147480.profitablecpmratenetwork.com/e3/a5/05/e3a5057b1d8b5fed8e8ea5526861d163.js"];
    const scripts = srcs.map((src) => {
      const s = document.createElement('script');
      s.src = src; s.async = true;
      document.head.appendChild(s);
      return s;
    });
    return () => scripts.forEach((s) => s.parentNode?.removeChild(s));
  }, []);
  return null;
}
