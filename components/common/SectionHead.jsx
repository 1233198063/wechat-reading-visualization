export default function SectionHead({ zh, en }) {
  return (
    <div className="relative flex items-baseline gap-[clamp(14px,1.6vw,24px)] mb-[clamp(24px,2.4vw,40px)] pb-3.5 border-b border-[var(--border-hair)]">
      <span className="absolute -bottom-1.5 left-0 w-1.5 h-1.5 bg-[var(--accent2)] rotate-45 opacity-70" />
      <span className="font-display text-[var(--ink)] font-normal leading-none"
        style={{ fontSize: 'clamp(1.5rem,1.9vw,2.4rem)', letterSpacing: '0.34em', textIndent: '0.34em' }}>
        {zh}
      </span>
      <span className="font-light text-[var(--text-dim)] self-end pb-0.5"
        style={{ fontSize: 'clamp(0.58rem,0.64vw,0.72rem)', letterSpacing: '0.38em', textIndent: '0.38em' }}>
        {en}
      </span>
      <span className="flex-1 h-px bg-[var(--border-hair)] self-center" />
    </div>
  );
}
