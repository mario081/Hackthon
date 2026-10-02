import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeftRight, ChevronRight, CircleCheck, Inbox, Search, Siren } from 'lucide-react'
import { useReports } from '../../context/reports'
import { formatDateTime, situationType } from '../../lib/reports'
import PanelLayout from '../../components/panel/PanelLayout'
import { PriorityBadge, StatusBadge } from '../../components/Badge'

const DAY = 24 * 60 * 60 * 1000

function StatTile({ label, value, icon: Icon, to }) {
  return (
    <Link to={to} className="card flex items-center gap-4 p-5 transition hover:border-accent/50">
      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15 text-accent">
        <Icon aria-hidden="true" />
      </span>
      <span>
        <span className="block text-3xl font-bold text-white">{value}</span>
        <span className="block text-sm text-slate-300">{label}</span>
      </span>
    </Link>
  )
}

function CasesPerDay({ reports }) {
  const [today] = useState(() => {
    const d = new Date()
    d.setHours(0, 0, 0, 0)
    return d
  })
  const days = Array.from({ length: 14 }, (_, i) => {
    const start = new Date(today.getTime() - (13 - i) * DAY)
    const count = reports.filter((r) => {
      const t = new Date(r.createdAt).getTime()
      return t >= start.getTime() && t < start.getTime() + DAY
    }).length
    return { start, count }
  })
  const max = Math.max(1, ...days.map((d) => d.count))
  const fmt = (d) => d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })

  return (
    <section className="card p-5" aria-labelledby="chart-dia">
      <h2 id="chart-dia" className="font-semibold text-white">Relatos recebidos por dia</h2>
      <p className="text-sm text-slate-400">Últimos 14 dias</p>
      <div className="mt-6 flex h-44 items-end gap-1.5 border-b border-navy-600" role="list">
        {days.map((d) => (
          <div key={d.start.toISOString()} role="listitem" className="group relative flex h-full flex-1 items-end justify-center" aria-label={`${fmt(d.start)}: ${d.count} relatos`}>
            <div className="w-full max-w-[28px] rounded-t bg-accent/90 transition group-hover:bg-accent-soft" style={{ height: `${(d.count / max) * 100}%`, minHeight: d.count ? 4 : 0 }} />
            <span className="pointer-events-none absolute -top-8 z-10 hidden whitespace-nowrap rounded-md border border-navy-600 bg-navy-900 px-2 py-1 text-xs text-white group-hover:block">
              {fmt(d.start)} · {d.count}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-2 flex justify-between text-xs text-slate-400">
        <span>{fmt(days[0].start)}</span>
        <span>Hoje</span>
      </div>
    </section>
  )
}

function ByType({ reports }) {
  const counts = {}
  reports.forEach((r) => {
    const t = situationType(r.selections)
    counts[t] = (counts[t] ?? 0) + 1
  })
  const rows = Object.entries(counts).sort((a, b) => b[1] - a[1])
  const max = rows[0]?.[1] ?? 1
  return (
    <section className="card p-5" aria-labelledby="chart-tipo">
      <h2 id="chart-tipo" className="font-semibold text-white">Tipos de situação</h2>
      <p className="text-sm text-slate-400">Todos os casos</p>
      <ul className="mt-4 flex flex-col gap-2.5">
        {rows.map(([type, n]) => (
          <li key={type} className="group grid grid-cols-[9.5rem_1fr_2rem] items-center gap-3 text-sm" title={`${type}: ${n}`}>
            <span className="truncate text-slate-300">{type}</span>
            <span className="h-2.5 rounded-full bg-navy-700">
              <span className="block h-full rounded-full bg-accent/90 group-hover:bg-accent-soft" style={{ width: `${(n / max) * 100}%` }} />
            </span>
            <span className="text-right font-semibold text-white">{n}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default function Dashboard() {
  const { reports } = useReports()
  const count = (...statuses) => reports.filter((r) => statuses.includes(r.status)).length
  const urgent = reports
    .filter((r) => r.priority === 'URGENT' && r.status !== 'CLOSED')
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, 5)

  return (
    <PanelLayout>
      <div data-testid="page-dashboard" className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-slate-400">Visão geral dos relatos e da operação.</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatTile label="Novos" value={count('NEW')} icon={Inbox} to="/painel/casos?status=NEW" />
          <StatTile label="Em análise" value={count('IN_REVIEW', 'AWAITING')} icon={Search} to="/painel/casos?status=IN_REVIEW" />
          <StatTile label="Encaminhados" value={count('REFERRED')} icon={ArrowLeftRight} to="/painel/casos?status=REFERRED" />
          <StatTile label="Concluídos" value={count('CLOSED')} icon={CircleCheck} to="/painel/casos?status=CLOSED" />
        </div>

        <div className="grid gap-4 xl:grid-cols-[1.4fr_1fr]">
          <CasesPerDay reports={reports} />
          <ByType reports={reports} />
        </div>

        <section className="card p-5" aria-labelledby="fila-urgente">
          <h2 id="fila-urgente" className="flex items-center gap-2 font-semibold text-white">
            <Siren size={18} className="text-red-300" aria-hidden="true" /> Urgentes em aberto
          </h2>
          {urgent.length === 0 ? (
            <p className="mt-3 text-slate-400">Nenhum caso urgente em aberto.</p>
          ) : (
            <ul className="mt-3 divide-y divide-navy-700">
              {urgent.map((r) => (
                <li key={r.id}>
                  <Link to={`/painel/casos/${r.id}`} className="flex flex-wrap items-center gap-3 py-3 hover:text-accent">
                    <span className="font-semibold text-accent">#{r.id}</span>
                    <span className="flex-1 text-slate-200">{situationType(r.selections)}</span>
                    <span className="text-sm text-slate-400">{formatDateTime(r.createdAt)}</span>
                    <PriorityBadge priority={r.priority} />
                    <StatusBadge status={r.status} />
                    <ChevronRight size={18} className="text-slate-500" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </PanelLayout>
  )
}
