'use client';

import { useEffect, useRef } from 'react';

export default function StatCard({ value, label, sub, accent = '#6b9c72', color = '#4a7a54', char, countTo, animDelay = 0 }) {
  const valueRef = useRef(null);

  useEffect(() => {
    if (!countTo || !valueRef.current) return;
    const el  = valueRef.current;
    const dur = 1100;
    const start = performance.now();

    const tick = now => {
      const t      = Math.min((now - start) / dur, 1);
      const eased  = 1 - Math.pow(1 - t, 3);
      el.textContent = Math.floor(eased * countTo);
      if (t < 1) requestAnimationFrame(tick);
      else el.textContent = countTo;
    };

    const timeout = setTimeout(() => {
      el.textContent = '0';
      requestAnimationFrame(tick);
    }, animDelay + 400);

    return () => clearTimeout(timeout);
  }, [countTo, animDelay]);

  return (
    <div
      className="relative overflow-hidden border border-[var(--border-hair)] transition-all duration-300 hover:-translate-y-1 animate-ink-fade-up"
      style={{
        background: 'rgba(250,248,242,0.82)',
        backdropFilter: 'blur(10px)',
        padding: 'clamp(14px,2.2vw,34px) clamp(14px,2.4vw,36px) clamp(12px,2vw,30px)',
        '--card-accent': accent,
        '--card-color': color,
        animationDelay: `${animDelay}ms`,
      }}
    >
      {/* 顶部彩色墨线 */}
      <span className="absolute top-0 left-0 right-0 h-[3px] opacity-85" style={{ background: accent }} />
      {/* 大字水印 */}
      <span
        className="absolute right-2 -bottom-3.5 font-display pointer-events-none select-none opacity-[0.085]"
        style={{ fontSize: 'clamp(5rem,6vw,7.5rem)', color: accent, lineHeight: 1 }}
        aria-hidden
      >
        {char}
      </span>

      <div
        ref={valueRef}
        className="font-display leading-none mb-3"
        style={{ fontSize: 'clamp(2rem,2.6vw,3.2rem)', color, letterSpacing: '0.02em' }}
      >
        {value}
      </div>
      <div className="text-[var(--text-dim)] font-light tracking-[0.30em]" style={{ fontSize: 'clamp(0.60rem,0.66vw,0.74rem)' }}>
        {label}
      </div>
      {sub && (
        <div className="text-[var(--text-dim)] font-light mt-1.5" style={{ fontSize: 'clamp(0.60rem,0.64vw,0.72rem)' }}>
          {typeof sub === 'string' ? sub : sub}
        </div>
      )}
    </div>
  );
}
