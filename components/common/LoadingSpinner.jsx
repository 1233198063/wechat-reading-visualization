export default function LoadingSpinner({ text = '加载中…' }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-5">
      <div className="w-2.5 h-2.5 bg-[var(--accent2)] rounded-full animate-ink-drop" />
      <p className="font-display text-[var(--text-dim)] tracking-[0.25em] animate-pulse"
        style={{ fontSize: 'clamp(0.88rem,1vw,1.1rem)' }}>
        {text}
      </p>
    </div>
  );
}
