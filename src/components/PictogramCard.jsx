import { Check } from 'lucide-react'
import { imgUrl } from '../data/catalog'

export default function PictogramCard({ pictogram, selected, onToggle }) {
  return (
    <button
      type="button"
      onClick={() => onToggle(pictogram)}
      aria-pressed={selected}
      className={`relative flex min-h-[150px] flex-col items-center justify-center gap-2 rounded-2xl border-2 p-3 text-center transition ${
        selected
          ? 'border-accent bg-accent/15 shadow-glow'
          : 'border-navy-600 bg-navy-800/70 hover:border-navy-500'
      }`}
    >
      {selected && (
        <span className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-accent text-navy-950">
          <Check size={18} strokeWidth={3} aria-hidden="true" />
        </span>
      )}
      <span className="flex h-20 w-20 items-center justify-center rounded-xl bg-white p-1.5">
        <img src={imgUrl(pictogram.arasaacId)} alt="" className="h-full w-full object-contain" />
      </span>
      <span className="text-lg font-semibold leading-tight text-white">{pictogram.label}</span>
      {pictogram.hint && <span className="text-sm leading-tight text-slate-300">{pictogram.hint}</span>}
    </button>
  )
}

export function PictogramChip({ pictogram, size = 'md' }) {
  const box = size === 'sm' ? 'h-12 w-12' : 'h-16 w-16'
  return (
    <figure className="flex w-24 flex-col items-center gap-1.5 text-center">
      <span className={`flex ${box} items-center justify-center rounded-xl bg-white p-1`}>
        <img src={imgUrl(pictogram.arasaacId)} alt={pictogram.label} className="h-full w-full object-contain" />
      </span>
      <figcaption className="text-sm leading-tight text-slate-200">{pictogram.label}</figcaption>
    </figure>
  )
}
