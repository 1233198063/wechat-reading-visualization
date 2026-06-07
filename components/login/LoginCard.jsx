'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchReadingData } from '@/lib/api/weread';

export default function LoginCard() {
  const [apiKey, setApiKey]   = useState(() => typeof window !== 'undefined' ? localStorage.getItem('wrk') || '' : '');
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');
  const router = useRouter();

  async function connect() {
    const key = apiKey.trim();
    if (!key) { setError('请输入 API Key'); return; }
    setLoading(true);
    setError('');
    try {
      await fetchReadingData(key, 'monthly');
      localStorage.setItem('wrk', key);
      router.push('/overview');
    } catch (e) {
      setError('连接失败：' + e.message + '。请检查 API Key 是否正确。');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* 印章 Logo */}
      <div className="login-seal animate-ink-fade-up animate-seal-breath mb-8"
        style={{ width: 'clamp(108px,8.5vw,148px)', height: 'clamp(76px,6vw,104px)', border: '1.5px solid rgba(80,70,50,0.38)', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(240,235,220,0.55)', padding: 'clamp(10px,1vw,16px)', position: 'relative' }}>
        <BookScrollSvg />
      </div>

      <h1 className="animate-ink-fade-up font-display text-[var(--ink)] mb-2"
        style={{ fontSize: 'clamp(2rem,2.8vw,3.4rem)', letterSpacing: '0.45em', textIndent: '0.45em', animationDelay: '0.3s' }}>
        翻页里程
      </h1>
      <p className="animate-ink-fade-up text-[var(--text-dim)] tracking-[0.25em] mb-8"
        style={{ fontSize: 'clamp(0.78rem,0.88vw,0.95rem)', animationDelay: '0.45s' }}>
        ReadMap · 微信读书数据可视化
      </p>

      {/* 菱形分割线 */}
      <div className="animate-ink-fade-up flex items-center gap-3.5 mb-8 w-full"
        style={{ maxWidth: 'clamp(380px,32vw,500px)', animationDelay: '0.58s' }}>
        <span className="flex-1 h-px bg-gradient-to-r from-transparent to-[var(--border)]" />
        <span className="w-2 h-2 bg-[var(--accent)] rotate-45 opacity-65" />
        <span className="flex-1 h-px bg-gradient-to-l from-transparent to-[var(--border)]" />
      </div>

      {/* 登录卡片 */}
      <div className="animate-card-float relative border border-[var(--border)] p-[clamp(28px,2.8vw,44px)] w-full"
        style={{ maxWidth: 'clamp(380px,32vw,500px)', background: 'var(--surface)', boxShadow: 'var(--shadow)', animationDelay: '0.55s' }}>
        {/* 四角装饰 */}
        <span className="absolute top-2.5 left-2.5 w-5 h-5 border-t-[1.5px] border-l-[1.5px] border-[var(--accent)] opacity-45" />
        <span className="absolute bottom-2.5 right-2.5 w-5 h-5 border-b-[1.5px] border-r-[1.5px] border-[var(--accent)] opacity-45" />

        <label className="block text-[var(--text-dim)] text-[0.78rem] tracking-[0.18em] mb-3">
          请输入微信读书 API Key
        </label>
        <div className="flex gap-3 mb-4">
          <input
            type="text"
            value={apiKey}
            onChange={e => setApiKey(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && connect()}
            placeholder="wrk-xxxxxxxxxxxxxxxx"
            autoComplete="off"
            spellCheck={false}
            className="flex-1 border border-[var(--border)] px-4 py-3 text-[0.85rem] text-[var(--ink)] outline-none transition-colors focus:border-[var(--accent2)]"
            style={{ background: 'var(--surface2)', fontFamily: "'SF Mono','Cascadia Code',monospace" }}
          />
          <button
            onClick={connect}
            disabled={loading}
            className="px-6 py-3 rounded-full text-white text-[0.88rem] tracking-[0.2em] font-body cursor-pointer transition-all disabled:opacity-40"
            style={{ background: 'var(--accent2)' }}
          >
            {loading ? '连接中…' : '入卷'}
          </button>
        </div>

        {error && (
          <p className="text-[var(--rust)] text-[0.82rem] mb-3 tracking-[0.05em]">{error}</p>
        )}

        <div className="text-[var(--text-dim)] text-[0.76rem] leading-[2.1] mt-5 pt-5 border-t border-[var(--border)]">
          <b className="text-[var(--ink)] tracking-wider">如何获取 API Key：</b><br />
          1. 打开{' '}
          <a
            href="https://weread.qq.com/r/weread-skills"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--accent2)] underline underline-offset-2 hover:text-[var(--accent)]"
          >
            weread.qq.com/r/weread-skills
          </a>
          {' '}并登录微信读书<br />
          2. 在「快速配置」第二步「获取 API Key」处复制 Key<br />
          3. 粘贴到上方输入框，点击入卷<br />
          <br />
          <span className="opacity-70">Key 仅用于本地转发，不传至第三方，并保存于浏览器供下次自动填入。</span>
        </div>
      </div>
    </>
  );
}

function BookScrollSvg() {
  return (
    <svg viewBox="0 0 100 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="50" cy="62" rx="25" ry="2" fill="#18080a" opacity="0.10"/>
      <ellipse cx="50" cy="51" rx="29.5" ry="8.5" fill="#a49070"/>
      <rect x="20.5" y="21" width="59" height="30" fill="#c4ae88"/>
      <path d="M25,27.5 C40,27 60,27 75,27.5" stroke="#a09070" strokeWidth="0.65" fill="none" opacity="0.50"/>
      <path d="M25,32.5 C40,32 60,32 75,32.5" stroke="#a09070" strokeWidth="0.60" fill="none" opacity="0.44"/>
      <path d="M25,37.5 C40,37 60,37 75,37.5" stroke="#a09070" strokeWidth="0.58" fill="none" opacity="0.38"/>
      <path d="M25,42.5 C40,42 60,42 75,42.5" stroke="#a09070" strokeWidth="0.55" fill="none" opacity="0.32"/>
      <path d="M25,47.5 C40,47 60,47 75,47.5" stroke="#a09070" strokeWidth="0.50" fill="none" opacity="0.25"/>
      <ellipse cx="50" cy="21" rx="29.5" ry="8.5" fill="#d4bc98"/>
      <ellipse cx="50" cy="21" rx="21"   ry="6.0"  fill="#dcc8a4" opacity="0.86"/>
      <ellipse cx="50" cy="21" rx="13.5" ry="3.8"  fill="#e4d4b0" opacity="0.80"/>
      <ellipse cx="50" cy="21" rx="6.5"  ry="1.85" fill="#ecdcba" opacity="0.72"/>
      <ellipse cx="20.5" cy="36" rx="7.5" ry="22" fill="#1e1008"/>
      <ellipse cx="18.8" cy="31" rx="2.2" ry="7"  fill="#483820" opacity="0.40"/>
      <ellipse cx="79.5" cy="36" rx="7.5" ry="22" fill="#1e1008"/>
      <ellipse cx="77.8" cy="31" rx="2.2" ry="7"  fill="#483820" opacity="0.40"/>
    </svg>
  );
}
