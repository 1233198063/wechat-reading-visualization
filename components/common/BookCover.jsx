/* 书籍封面 — 使用原生 <img> 而非 next/image，
   避免微信读书 CDN 域名白名单问题（域名数量不可控）。 */
export default function BookCover({ src, alt = '', className = '', style }) {
  if (!src) return null;
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={e => { e.currentTarget.style.display = 'none'; }}
      className={`object-cover ${className}`}
      style={style}
    />
  );
}
