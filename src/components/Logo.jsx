const BARS = [10, 18, 28, 20, 12]

export default function Logo({ size = 'md', tagline = false }) {
  const text = size === 'lg' ? 'text-3xl' : size === 'sm' ? 'text-lg' : 'text-2xl'
  const h = size === 'lg' ? 36 : size === 'sm' ? 22 : 28
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2" aria-label="Voz Segura" role="img">
        <svg width={h} height={h} viewBox="0 0 32 32" aria-hidden="true">
          {BARS.map((bh, i) => (
            <rect key={i} x={2 + i * 6} y={16 - bh / 2} width="4" height={bh} rx="2" fill={i === 2 ? '#22d3ee' : '#67e8f9'} opacity={i === 2 ? 1 : 0.85} />
          ))}
        </svg>
        <span className={`${text} font-bold tracking-tight text-white whitespace-nowrap`} aria-hidden="true">
          Voz <span className="text-accent">Segura</span>
        </span>
      </div>
      {tagline && (
        <span className="hidden border-l border-navy-600 pl-3 text-[11px] font-medium uppercase leading-tight tracking-[0.18em] text-slate-400 whitespace-nowrap xl:block">
          Tecnologia que amplia vozes
          <br />e protege direitos
        </span>
      )}
    </div>
  )
}
