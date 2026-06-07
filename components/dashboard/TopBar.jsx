'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const TABS = [
  { path: '/overview', label: '概 览' },
  { path: '/shelf',    label: '书 架' },
  { path: '/notes',    label: '笔 记' },
];

export default function TopBar() {
  const pathname = usePathname();
  const router   = useRouter();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function logout() {
    localStorage.removeItem('wrk');
    router.push('/login');
  }

  return (
    <header
      className={`sticky top-0 z-50 flex items-center justify-between transition-shadow duration-[380ms] border-b border-[var(--border-hair)] ${scrolled ? 'shadow-[0_1px_0_var(--border),0_6px_32px_rgba(26,40,24,0.10)]' : ''}`}
      style={{
        padding: '0 clamp(24px,3vw,56px)',
        height: 'clamp(64px,5vw,80px)',
        background: 'rgba(243,240,232,0.90)',
        backdropFilter: 'blur(28px) saturate(1.5)',
        /* 顶部金线 */
        borderTop: '2px solid transparent',
        backgroundImage: 'linear-gradient(rgba(243,240,232,0.90),rgba(243,240,232,0.90)), linear-gradient(90deg,transparent 0%,#4a7a54 30%,#a8803a 55%,#6b9c72 80%,transparent 100%)',
        backgroundOrigin: 'border-box',
        backgroundClip: 'padding-box, border-box',
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-4">
        <div className="flex-shrink-0 flex items-center justify-center border border-[rgba(80,70,50,0.34)] p-1.5"
          style={{ width: 'clamp(46px,3.6vw,62px)', height: 'clamp(32px,2.5vw,44px)', background: 'rgba(240,235,220,0.50)' }}>
          <svg viewBox="0 0 100 64" fill="none" className="w-full h-full">
            <ellipse cx="50" cy="62" rx="25" ry="2" fill="#18080a" opacity="0.10"/>
            <ellipse cx="50" cy="51" rx="29.5" ry="8.5" fill="#a49070"/>
            <rect x="20.5" y="21" width="59" height="30" fill="#c4ae88"/>
            <path d="M25,27.5 C40,27 60,27 75,27.5" stroke="#a09070" strokeWidth="0.65" fill="none" opacity="0.50"/>
            <path d="M25,32.5 C40,32 60,32 75,32.5" stroke="#a09070" strokeWidth="0.60" fill="none" opacity="0.44"/>
            <ellipse cx="50" cy="21" rx="29.5" ry="8.5" fill="#d4bc98"/>
            <ellipse cx="50" cy="21" rx="21"   ry="6.0"  fill="#dcc8a4" opacity="0.86"/>
            <ellipse cx="20.5" cy="36" rx="7.5" ry="22" fill="#1e1008"/>
            <ellipse cx="79.5" cy="36" rx="7.5" ry="22" fill="#1e1008"/>
          </svg>
        </div>
        <span className="font-display text-[var(--ink)] flex items-baseline gap-2"
          style={{ fontSize: 'clamp(1.1rem,1.5vw,1.75rem)', letterSpacing: '0.36em', textIndent: '0.36em' }}>
          翻页里程
          <span className="font-body font-light text-[var(--text-dim)] self-end pb-0.5"
            style={{ fontSize: 'clamp(0.58rem,0.65vw,0.72rem)', letterSpacing: '0.22em' }}>
            ReadMap
          </span>
        </span>
      </div>

      {/* Nav tabs */}
      <nav className="flex">
        {TABS.map(tab => {
          const active = pathname === tab.path;
          return (
            <Link
              key={tab.path}
              href={tab.path}
              className={`relative font-display transition-colors duration-300 ${active ? 'text-[var(--ink)]' : 'text-[var(--text-dim)] hover:text-[var(--ink)]'}`}
              style={{
                padding: '0 clamp(18px,1.8vw,32px)',
                height: 'clamp(64px,5vw,80px)',
                lineHeight: 'clamp(64px,5vw,80px)',
                fontSize: 'clamp(0.95rem,1.1vw,1.2rem)',
                letterSpacing: '0.3em',
                textIndent: '0.3em',
              }}
            >
              {tab.label}
              {active && (
                <span className="absolute bottom-0 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-transparent via-[var(--accent2)] to-transparent" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <button
        onClick={logout}
        className="border border-[var(--border-hair)] text-[var(--text-dim)] rounded-full px-4 py-1.5 text-[0.75rem] tracking-[0.18em] font-light transition-all hover:border-[rgba(107,156,114,0.5)] hover:text-[var(--accent2)]"
      >
        退出
      </button>
    </header>
  );
}
