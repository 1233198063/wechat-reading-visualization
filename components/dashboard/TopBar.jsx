'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const TABS = [
  { path: '/overview', label: '概览', shortLabel: '概览' },
  { path: '/shelf',    label: '书架', shortLabel: '书架' },
  { path: '/notes',    label: '笔记', shortLabel: '笔记' },
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

  const barStyle = {
    padding: '0 clamp(16px,3vw,56px)',
    height: 'clamp(56px,5vw,80px)',
    background: 'rgba(243,240,232,0.90)',
    backdropFilter: 'blur(28px) saturate(1.5)',
    borderTop: '2px solid transparent',
    backgroundImage: 'linear-gradient(rgba(243,240,232,0.90),rgba(243,240,232,0.90)), linear-gradient(90deg,transparent 0%,#4a7a54 30%,#a8803a 55%,#6b9c72 80%,transparent 100%)',
    backgroundOrigin: 'border-box',
    backgroundClip: 'padding-box, border-box',
  };

  return (
    <>
      {/* ── 顶部导航栏 ── */}
      <header
        className={`sticky top-0 z-50 flex items-center justify-between transition-shadow duration-[380ms] border-b border-[var(--border-hair)] ${scrolled ? 'shadow-[0_1px_0_var(--border),0_6px_32px_rgba(26,40,24,0.10)]' : ''}`}
        style={barStyle}
      >
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 flex items-center justify-center border border-[rgba(80,70,50,0.34)] p-1.5"
            style={{ width: 'clamp(38px,3.6vw,62px)', height: 'clamp(27px,2.5vw,44px)', background: 'rgba(240,235,220,0.50)' }}>
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
          <span className="font-display text-[var(--ink)] flex items-baseline gap-1.5"
            style={{ fontSize: 'clamp(1rem,1.5vw,1.75rem)', letterSpacing: '0.36em', textIndent: '0.36em' }}>
            翻页里程
            <span className="hidden sm:inline font-body font-light text-[var(--text-dim)] self-end pb-0.5"
              style={{ fontSize: 'clamp(0.55rem,0.65vw,0.72rem)', letterSpacing: '0.22em' }}>
              ReadMap
            </span>
          </span>
        </div>

        {/* 桌面导航（md+显示） */}
        <nav className="hidden md:flex">
          {TABS.map(tab => {
            const active = pathname === tab.path;
            return (
              <Link
                key={tab.path}
                href={tab.path}
                className={`relative font-display transition-colors duration-300 ${active ? 'text-[var(--ink)]' : 'text-[var(--text-dim)] hover:text-[var(--ink)]'}`}
                style={{
                  padding: '0 clamp(18px,1.8vw,32px)',
                  height: 'clamp(56px,5vw,80px)',
                  lineHeight: 'clamp(56px,5vw,80px)',
                  fontSize: 'clamp(0.90rem,1.1vw,1.2rem)',
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

        {/* 退出按钮 */}
        <button
          onClick={logout}
          className="border border-[var(--border-hair)] text-[var(--text-dim)] rounded-full px-3 py-1.5 text-[0.72rem] tracking-[0.14em] font-light transition-all hover:border-[rgba(107,156,114,0.5)] hover:text-[var(--accent2)]"
        >
          退出
        </button>
      </header>

      {/* ── 手机底部导航栏（md以下显示） ── */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-50 flex md:hidden border-t border-[var(--border-hair)]"
        style={{ background: 'rgba(243,240,232,0.96)', backdropFilter: 'blur(24px) saturate(1.5)', height: 64 }}
      >
        {TABS.map(tab => {
          const active = pathname === tab.path;
          return (
            <Link
              key={tab.path}
              href={tab.path}
              className={`flex-1 flex flex-col items-center justify-center gap-0.5 transition-colors duration-200 ${active ? 'text-[var(--ink)]' : 'text-[var(--text-dim)]'}`}
            >
              <TabIcon path={tab.path} active={active} />
              <span className="text-[0.60rem] tracking-[0.16em]">{tab.shortLabel}</span>
              {active && (
                <span className="absolute bottom-0 w-10 h-[2px] bg-gradient-to-r from-transparent via-[var(--accent2)] to-transparent" />
              )}
            </Link>
          );
        })}
      </nav>
    </>
  );
}

function TabIcon({ path, active }) {
  const cls = `w-5 h-5 transition-colors ${active ? 'text-[var(--accent2)]' : 'text-[var(--text-dim)]'}`;
  if (path === '/overview') return (
    <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <rect x="3" y="13" width="4" height="8" rx="0.8"/>
      <rect x="10" y="8" width="4" height="13" rx="0.8"/>
      <rect x="17" y="3" width="4" height="18" rx="0.8"/>
    </svg>
  );
  if (path === '/shelf') return (
    <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <rect x="4" y="3" width="9" height="17" rx="1"/>
      <path d="M13 5.5l5 1.2v13.5l-5-1.2"/>
      <line x1="7" y1="7.5" x2="10" y2="7.5"/>
      <line x1="7" y1="10.5" x2="10" y2="10.5"/>
    </svg>
  );
  return (
    <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <path d="M12 20h9"/>
      <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/>
    </svg>
  );
}
