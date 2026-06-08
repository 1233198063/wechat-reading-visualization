const PERIODS = [
  { mode: 'monthly',  label: '本月' },
  { mode: 'weekly',   label: '本周' },
  { mode: 'annually', label: '今年' },
  { mode: 'overall',  label: '全部' },
];

export default function PeriodSelector({ value, onChange }) {
  return (
    <div className="flex mb-8 overflow-hidden rounded-full w-full sm:w-fit border border-[var(--border-hair)] p-[3px] gap-0.5"
      style={{ background: 'rgba(250,248,242,0.70)', backdropFilter: 'blur(8px)' }}>
      {PERIODS.map(({ mode, label }) => (
        <button
          key={mode}
          onClick={() => onChange(mode)}
          className={`flex-1 sm:flex-none px-4 sm:px-5 py-1.5 rounded-full font-display transition-all duration-300 ease-ink text-[0.72em] tracking-[0.16em] sm:tracking-[0.22em] text-center
            ${value === mode
              ? 'bg-[var(--accent2)] text-white shadow-[0_2px_14px_rgba(74,122,84,0.24)]'
              : 'bg-transparent text-[var(--text-dim)] hover:bg-[rgba(202,212,198,0.30)] hover:text-[var(--ink)]'
            }`}
          style={{ fontSize: 'clamp(0.72rem,0.82vw,0.9rem)' }}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
