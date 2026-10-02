import { PRIORITIES, REFERRAL_STATUSES, STATUSES } from '../data/catalog'

const TONES = {
  red:   'bg-red-500/15 text-red-300 ring-red-400/30',
  amber: 'bg-amber-400/15 text-amber-200 ring-amber-300/30',
  blue:  'bg-sky-400/15 text-sky-200 ring-sky-300/30',
  green: 'bg-emerald-400/15 text-emerald-200 ring-emerald-300/30',
  slate: 'bg-slate-400/15 text-slate-200 ring-slate-300/30',
}
const DOTS = { red: 'bg-red-400', amber: 'bg-amber-300', blue: 'bg-sky-300', green: 'bg-emerald-300', slate: 'bg-slate-300' }

export function Badge({ tone = 'slate', children }) {
  return (
    <span className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${TONES[tone]}`}>
      <span className={`h-2 w-2 rounded-full ${DOTS[tone]}`} aria-hidden="true" />
      {children}
    </span>
  )
}

export function StatusBadge({ status }) {
  const s = STATUSES[status]
  return <Badge tone={s.tone}>{s.label}</Badge>
}

export function PriorityBadge({ priority }) {
  const p = PRIORITIES[priority]
  return <Badge tone={p.tone}>{p.label}</Badge>
}

export function ReferralBadge({ status }) {
  const r = REFERRAL_STATUSES[status]
  return <Badge tone={r.tone}>{r.label}</Badge>
}
