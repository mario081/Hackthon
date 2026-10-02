import { EyeOff } from 'lucide-react'
import { useQuickExit } from '../lib/useQuickExit'

export default function QuickExit({ variant = 'compact' }) {
  const exit = useQuickExit()
  if (variant === 'full') {
    return (
      <button
        type="button"
        onClick={exit}
        className="flex min-h-[64px] w-full items-center justify-center gap-3 rounded-2xl border-2 border-accent/70 bg-navy-900 px-4 text-left transition hover:bg-accent/10"
      >
        <EyeOff className="shrink-0 text-accent" aria-hidden="true" />
        <span>
          <span className="block text-lg font-bold uppercase tracking-wide text-accent">Sair rapidamente</span>
          <span className="block text-sm text-slate-300">Toque aqui para sair do sistema</span>
        </span>
      </button>
    )
  }
  return (
    <button
      type="button"
      onClick={exit}
      className="inline-flex min-h-[48px] items-center gap-2 rounded-xl border border-accent/50 px-3 text-sm font-bold uppercase tracking-wide text-accent hover:bg-accent/10"
    >
      <EyeOff size={18} aria-hidden="true" />
      Sair
    </button>
  )
}
