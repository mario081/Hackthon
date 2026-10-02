import { useMemo, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { ArrowDown, ArrowUp, ChevronLeft, ChevronRight, ChevronsUpDown, X } from 'lucide-react'
import { useReports } from '../../context/reports'
import { ORIGINS, PICTOGRAMS, PRIORITIES, PROFESSIONALS, resolve, STATUSES } from '../../data/catalog'
import { formatDateTime, situationType } from '../../lib/reports'
import PanelLayout from '../../components/panel/PanelLayout'
import { PriorityBadge, StatusBadge } from '../../components/Badge'

const PAGE_SIZE = 10
const DAY = 24 * 60 * 60 * 1000
const PRIORITY_RANK = { URGENT: 0, MEDIUM: 1, LOW: 2 }
const TABS = [['ALL', 'Todos'], ...Object.entries(STATUSES).map(([k, v]) => [k, v.label])]

function Select({ label, value, onChange, children }) {
  return (
    <label className="flex min-w-[10rem] flex-1 flex-col gap-1">
      <span className="label">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="field">
        {children}
      </select>
    </label>
  )
}

function searchText(r) {
  const prof = PROFESSIONALS.find((p) => p.id === r.assigneeId)?.name ?? ''
  return [
    r.id,
    situationType(r.selections),
    ...resolve('WHERE', r.selections.WHERE).map((p) => p.label),
    STATUSES[r.status].label,
    prof,
    r.aiSummary,
  ].join(' ').toLowerCase()
}

function SortHeader({ k, sort, onSort, children }) {
  const active = sort.key === k
  const Icon = !active ? ChevronsUpDown : sort.dir === 'asc' ? ArrowUp : ArrowDown
  return (
    <th scope="col" aria-sort={active ? (sort.dir === 'asc' ? 'ascending' : 'descending') : 'none'} className="px-4 py-3 font-medium">
      <button type="button" onClick={() => onSort(k)} className="inline-flex items-center gap-1 hover:text-white">
        {children} <Icon size={14} aria-hidden="true" />
      </button>
    </th>
  )
}

export default function Casos() {
  const { reports } = useReports()
  const navigate = useNavigate()
  const [params, setParams] = useSearchParams()
  const status = params.get('status') ?? 'ALL'
  const q = params.get('q') ?? ''
  const [type, setType] = useState('ALL')
  const [priority, setPriority] = useState('ALL')
  const [period, setPeriod] = useState('ALL')
  const [origin, setOrigin] = useState('ALL')
  const [sort, setSort] = useState({ key: 'date', dir: 'desc' })
  const [page, setPage] = useState(1)
  const [now] = useState(() => Date.now())

  function setParam(key, value) {
    const next = new URLSearchParams(params)
    if (!value || value === 'ALL') next.delete(key)
    else next.set(key, value)
    setParams(next)
    setPage(1)
  }

  const base = useMemo(() => {
    const needle = q.trim().toLowerCase()
    return reports.filter((r) =>
      (type === 'ALL' || r.selections.WHAT[0] === type) &&
      (priority === 'ALL' || r.priority === priority) &&
      (origin === 'ALL' || r.origin === origin) &&
      (period === 'ALL' || now - new Date(r.createdAt).getTime() <= Number(period) * DAY) &&
      (!needle || searchText(r).includes(needle)),
    )
  }, [reports, type, priority, origin, period, q, now])

  const counts = useMemo(() => {
    const c = { ALL: base.length }
    base.forEach((r) => { c[r.status] = (c[r.status] ?? 0) + 1 })
    return c
  }, [base])

  const rows = useMemo(() => {
    const list = status === 'ALL' ? [...base] : base.filter((r) => r.status === status)
    const dir = sort.dir === 'asc' ? 1 : -1
    list.sort((a, b) => {
      if (sort.key === 'priority') return dir * (PRIORITY_RANK[a.priority] - PRIORITY_RANK[b.priority]) || b.createdAt.localeCompare(a.createdAt)
      if (sort.key === 'id') return dir * a.id.localeCompare(b.id)
      return dir * a.createdAt.localeCompare(b.createdAt)
    })
    return list
  }, [base, status, sort])

  const pages = Math.max(1, Math.ceil(rows.length / PAGE_SIZE))
  const current = Math.min(page, pages)
  const visible = rows.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE)

  function toggleSort(key) {
    setSort((s) => ({ key, dir: s.key === key && s.dir === 'desc' ? 'asc' : 'desc' }))
  }

  return (
    <PanelLayout>
      <div data-testid="page-casos" className="flex flex-col gap-5">
        <div>
          <h1 className="text-3xl font-bold text-white">Casos</h1>
          <p className="text-slate-400">Triagem e acompanhamento dos relatos recebidos.</p>
        </div>

        <div role="tablist" aria-label="Filtrar por status" className="flex gap-2 overflow-x-auto pb-1">
          {TABS.map(([key, label]) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={status === key}
              onClick={() => setParam('status', key)}
              className={`flex min-h-[44px] shrink-0 items-center gap-2 rounded-xl border px-4 font-medium transition ${
                status === key ? 'border-accent bg-accent/10 text-accent' : 'border-navy-600 bg-navy-850/70 text-slate-200 hover:border-navy-500'
              }`}
            >
              {label}
              <span className="rounded-md bg-navy-700 px-1.5 text-sm text-slate-200">{counts[key] ?? 0}</span>
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-end gap-3">
          <Select label="Tipo de situação" value={type} onChange={(v) => { setType(v); setPage(1) }}>
            <option value="ALL">Todos</option>
            {PICTOGRAMS.WHAT.map((p) => <option key={p.id} value={p.id}>{p.label}</option>)}
          </Select>
          <Select label="Prioridade" value={priority} onChange={(v) => { setPriority(v); setPage(1) }}>
            <option value="ALL">Todas</option>
            {Object.entries(PRIORITIES).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
          </Select>
          <Select label="Período" value={period} onChange={(v) => { setPeriod(v); setPage(1) }}>
            <option value="ALL">Todo o período</option>
            <option value="7">Últimos 7 dias</option>
            <option value="30">Últimos 30 dias</option>
            <option value="90">Últimos 90 dias</option>
          </Select>
          <Select label="Origem" value={origin} onChange={(v) => { setOrigin(v); setPage(1) }}>
            <option value="ALL">Todas</option>
            {Object.entries(ORIGINS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
          </Select>
        </div>

        {q && (
          <p className="flex items-center gap-2 text-slate-300">
            Resultados para “{q}”
            <button type="button" onClick={() => setParam('q', '')} className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-accent hover:bg-accent/10">
              <X size={14} aria-hidden="true" /> limpar busca
            </button>
          </p>
        )}

        <div className="card overflow-x-auto">
          <table className="w-full min-w-[820px] text-left">
            <thead className="border-b border-navy-700 text-sm text-slate-400">
              <tr>
                <SortHeader k="id" sort={sort} onSort={toggleSort}>Nº do caso</SortHeader>
                <th scope="col" className="px-4 py-3 font-medium">Tipo de situação</th>
                <th scope="col" className="px-4 py-3 font-medium">Local</th>
                <SortHeader k="date" sort={sort} onSort={toggleSort}>Data do relato</SortHeader>
                <SortHeader k="priority" sort={sort} onSort={toggleSort}>Prioridade</SortHeader>
                <th scope="col" className="px-4 py-3 font-medium">Status</th>
                <th scope="col" className="px-4 py-3 font-medium">Responsável</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-700/70">
              {visible.map((r) => (
                <tr key={r.id} onClick={() => navigate(`/painel/casos/${r.id}`)} className="cursor-pointer transition hover:bg-white/[0.03]">
                  <td className="whitespace-nowrap px-4 py-3">
                    <Link to={`/painel/casos/${r.id}`} onClick={(e) => e.stopPropagation()} className="font-semibold text-accent hover:underline">
                      #{r.id}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-slate-100">{situationType(r.selections)}</td>
                  <td className="px-4 py-3 text-slate-300">{resolve('WHERE', r.selections.WHERE).map((p) => p.label).join(', ')}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-slate-300">{formatDateTime(r.createdAt)}</td>
                  <td className="px-4 py-3"><PriorityBadge priority={r.priority} /></td>
                  <td className="px-4 py-3"><StatusBadge status={r.status} /></td>
                  <td className="px-4 py-3 text-slate-300">{PROFESSIONALS.find((p) => p.id === r.assigneeId)?.name ?? <span className="text-slate-500">—</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {visible.length === 0 && <p className="p-8 text-center text-slate-400">Nenhum caso encontrado.</p>}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-slate-400">
            {rows.length === 0
              ? 'Nenhum caso'
              : `Mostrando ${(current - 1) * PAGE_SIZE + 1}–${Math.min(current * PAGE_SIZE, rows.length)} de ${rows.length} casos`}
          </p>
          <nav aria-label="Paginação" className="flex items-center gap-1">
            <button type="button" onClick={() => setPage(current - 1)} disabled={current === 1} aria-label="Página anterior" className="flex h-10 w-10 items-center justify-center rounded-lg border border-navy-600 disabled:opacity-40">
              <ChevronLeft size={18} aria-hidden="true" />
            </button>
            {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setPage(n)}
                aria-current={n === current ? 'page' : undefined}
                className={`h-10 w-10 rounded-lg text-sm font-medium ${n === current ? 'border border-accent text-accent' : 'text-slate-300 hover:bg-white/5'}`}
              >
                {n}
              </button>
            ))}
            <button type="button" onClick={() => setPage(current + 1)} disabled={current === pages} aria-label="Próxima página" className="flex h-10 w-10 items-center justify-center rounded-lg border border-navy-600 disabled:opacity-40">
              <ChevronRight size={18} aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </PanelLayout>
  )
}
