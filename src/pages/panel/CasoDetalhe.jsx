import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  ArrowRight, Calendar, ChevronLeft, Clock, FileText, Info, MapPin, Play, Send, ShieldCheck, Sparkles, TriangleAlert, UserRound,
} from 'lucide-react'
import { useReports } from '../../context/reports'
import {
  ORIGINS, PRIORITIES, PROFESSIONALS, REFERRAL_DESTINATIONS, REFERRAL_STATUSES, resolve, SHORT_QUESTION, STATUSES, STEPS,
} from '../../data/catalog'
import { formatDate, formatDateTime, situationType } from '../../lib/reports'
import PanelLayout from '../../components/panel/PanelLayout'
import { PictogramChip } from '../../components/PictogramCard'
import { ReferralBadge } from '../../components/Badge'

const TABS = [
  { key: 'geral', label: 'Visão geral' },
  { key: 'original', label: 'Relato original' },
  { key: 'timeline', label: 'Linha do tempo' },
  { key: 'referrals', label: 'Encaminhamentos' },
  { key: 'notes', label: 'Anotações' },
]

const labels = (report, cat) => resolve(cat, report.selections[cat]).map((p) => p.label).join(', ')

function Card({ title, action, children, className = '' }) {
  return (
    <section className={`card p-5 ${className}`}>
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-white">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  )
}

function InfoRow({ icon: Icon, label, children }) {
  return (
    <div className="grid grid-cols-[1.5rem_8.5rem_1fr] items-start gap-2 py-1.5">
      <Icon size={18} className="mt-0.5 text-accent" aria-hidden="true" />
      <dt className="text-sm text-slate-400">{label}</dt>
      <dd className="font-medium text-white">{children}</dd>
    </div>
  )
}

function Timeline({ events }) {
  return (
    <ol className="flex flex-col">
      {events.map((e, i) => (
        <li key={`${e.at}-${i}`} className="relative flex gap-4 pb-5 last:pb-0">
          {i < events.length - 1 && <span className="absolute left-[7px] top-5 h-full w-0.5 bg-navy-600" aria-hidden="true" />}
          <span className={`mt-1 h-4 w-4 shrink-0 rounded-full ring-4 ring-navy-850 ${i === events.length - 1 ? 'bg-accent' : 'bg-sky-400/70'}`} aria-hidden="true" />
          <div>
            <p className="text-sm text-slate-400">{formatDateTime(e.at)}</p>
            <p className="font-semibold text-white">{e.title}</p>
            <p className="text-slate-300">{e.description}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}

function ReferralForm({ onSave, onCancel }) {
  const [choice, setChoice] = useState(REFERRAL_DESTINATIONS[0])
  const [other, setOther] = useState('')
  const destination = choice === 'OUTRO' ? other.trim() : choice
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        if (destination) onSave(destination)
      }}
      className="flex flex-col gap-3 rounded-xl border border-navy-600 bg-navy-900/70 p-4"
    >
      <label className="flex flex-col gap-1">
        <span className="label">Destino do encaminhamento</span>
        <select value={choice} onChange={(e) => setChoice(e.target.value)} className="field">
          {REFERRAL_DESTINATIONS.map((d) => <option key={d}>{d}</option>)}
          <option value="OUTRO">Outro serviço…</option>
        </select>
      </label>
      {choice === 'OUTRO' && (
        <label className="flex flex-col gap-1">
          <span className="label">Nome do serviço</span>
          <input value={other} onChange={(e) => setOther(e.target.value)} className="field" autoFocus />
        </label>
      )}
      <div className="flex justify-end gap-2">
        <button type="button" onClick={onCancel} className="btn-ghost">Cancelar</button>
        <button type="submit" disabled={!destination} className="btn-primary">Salvar encaminhamento</button>
      </div>
    </form>
  )
}

// Remonta ao trocar de caso para não herdar aba/formulários abertos.
export default function CasoDetalhe() {
  const { id } = useParams()
  return <CasoDetalheView key={id} id={id} />
}

function CasoDetalheView({ id }) {
  const r = useReports()
  const report = r.getReport(id)
  const [tab, setTab] = useState('geral')
  const [showReferralForm, setShowReferralForm] = useState(false)
  const [note, setNote] = useState('')

  if (!report) {
    return (
      <PanelLayout>
        <div className="flex flex-col items-start gap-4">
          <p className="text-lg text-slate-300">Caso #{id} não encontrado.</p>
          <Link to="/painel/casos" className="btn-outline">Voltar para a lista de casos</Link>
        </div>
      </PanelLayout>
    )
  }

  const assignee = PROFESSIONALS.find((p) => p.id === report.assigneeId)
  const about = resolve('ABOUT', report.selections.ABOUT)

  function openReferral() {
    setTab('referrals')
    setShowReferralForm(true)
  }

  return (
    <PanelLayout>
      <div data-testid="page-caso" className="flex flex-col gap-5">
        <Link to="/painel/casos" className="inline-flex w-fit items-center gap-1 text-sm text-slate-400 hover:text-white">
          <ChevronLeft size={16} aria-hidden="true" /> Voltar para a lista de casos
        </Link>

        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-3xl font-bold text-white">Caso #{report.id}</h1>
              <label className="sr-only" htmlFor="status">Status do caso</label>
              <select
                id="status"
                value={report.status}
                onChange={(e) => r.updateStatus(report.id, e.target.value)}
                className="min-h-[40px] rounded-full border border-accent/50 bg-accent/10 px-3 text-sm font-semibold text-accent"
              >
                {Object.entries(STATUSES).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
              </select>
            </div>
            <p className="mt-1 text-slate-400">
              Relatado em {formatDateTime(report.createdAt)} · {ORIGINS[report.origin]}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {report.status === 'NEW' && (
              <button type="button" onClick={() => r.startAttendance(report.id)} className="btn-primary">
                <Play size={18} aria-hidden="true" /> Iniciar atendimento
              </button>
            )}
            <button type="button" onClick={openReferral} className="btn-outline">
              <Send size={18} aria-hidden="true" /> Encaminhar
            </button>
          </div>
        </div>

        <div role="tablist" aria-label="Seções do caso" className="flex gap-1 overflow-x-auto border-b border-navy-700">
          {TABS.map((t) => (
            <button
              key={t.key}
              type="button"
              role="tab"
              aria-selected={tab === t.key}
              onClick={() => setTab(t.key)}
              className={`min-h-[48px] whitespace-nowrap border-b-2 px-4 font-medium transition ${
                tab === t.key ? 'border-accent text-accent' : 'border-transparent text-slate-300 hover:text-white'
              }`}
            >
              {t.label}
              {t.key === 'referrals' && report.referrals.length > 0 && ` (${report.referrals.length})`}
              {t.key === 'notes' && report.notes.length > 0 && ` (${report.notes.length})`}
            </button>
          ))}
        </div>

        {tab === 'geral' && (
          <div className="grid gap-5 xl:grid-cols-[1.6fr_1fr]">
            <div className="flex flex-col gap-5">
              <Card title="Informações principais">
                <div className="grid gap-6 md:grid-cols-[1.3fr_1fr]">
                  <dl>
                    <InfoRow icon={TriangleAlert} label="Tipo de situação">{situationType(report.selections)}</InfoRow>
                    <InfoRow icon={MapPin} label="Local">{labels(report, 'WHERE')}</InfoRow>
                    <InfoRow icon={Clock} label="Quando">{labels(report, 'WHEN')}</InfoRow>
                    <InfoRow icon={Calendar} label="Data do relato">{formatDateTime(report.createdAt)}</InfoRow>
                    <InfoRow icon={Info} label="Prioridade">
                      <label className="sr-only" htmlFor="prioridade">Prioridade</label>
                      <select
                        id="prioridade"
                        value={report.priority}
                        onChange={(e) => r.setPriority(report.id, e.target.value)}
                        className="rounded-lg border border-navy-600 bg-navy-900 px-2 py-1 text-white"
                      >
                        {Object.entries(PRIORITIES).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
                      </select>
                    </InfoRow>
                  </dl>
                  <div className="flex flex-col gap-5 md:border-l md:border-navy-700 md:pl-6">
                    <div>
                      <p className="label">Pessoa atendida</p>
                      <p className="mt-2 flex items-center gap-2 font-semibold text-white">
                        <UserRound size={18} className="text-accent" aria-hidden="true" /> Identidade protegida
                      </p>
                      <p className="text-sm text-slate-300">Relato sobre: {about.map((p) => p.label).join(', ') || '—'}</p>
                    </div>
                    <div>
                      <label htmlFor="responsavel" className="label">Profissional responsável</label>
                      <select
                        id="responsavel"
                        value={report.assigneeId ?? ''}
                        onChange={(e) => r.assign(report.id, e.target.value || null)}
                        className="field mt-2"
                      >
                        <option value="">Sem responsável</option>
                        {PROFESSIONALS.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
                      </select>
                      {assignee && <p className="mt-1 text-sm text-slate-400">{assignee.role}</p>}
                    </div>
                  </div>
                </div>
              </Card>

              <section aria-labelledby="ia" className="rounded-2xl border border-violet-400/40 bg-violet-500/10 p-5">
                <h2 id="ia" className="flex items-center gap-2 text-lg font-semibold text-violet-100">
                  <Sparkles size={18} aria-hidden="true" /> Resumo assistido por IA
                </h2>
                <p className="mt-3 leading-relaxed text-slate-100">{report.aiSummary}</p>
                <p className="mt-3 text-xs text-violet-200/80">
                  Gerado automaticamente a partir das escolhas da pessoa. Não substitui o relato original nem constitui classificação jurídica.
                </p>
              </section>

              <Card
                title="O que a pessoa comunicou"
                action={
                  <button type="button" onClick={() => setTab('original')} className="btn-outline min-h-[40px] px-3 text-sm">
                    <FileText size={16} aria-hidden="true" /> Ver relato completo
                  </button>
                }
              >
                <div className="flex flex-wrap gap-2">
                  {STEPS.slice(1).flatMap(({ key }) => resolve(key, report.selections[key])).map((p, i) => (
                    <PictogramChip key={`${p.id}-${i}`} pictogram={p} size="sm" />
                  ))}
                </div>
              </Card>
            </div>

            <div className="flex flex-col gap-5">
              <Card
                title="Linha do tempo"
                action={<button type="button" onClick={() => setTab('timeline')} className="btn-outline min-h-[40px] px-3 text-sm">Ver tudo</button>}
              >
                <Timeline events={report.timeline.slice(-4)} />
              </Card>
              <Card
                title="Encaminhamentos"
                action={<button type="button" onClick={() => setTab('referrals')} className="btn-outline min-h-[40px] px-3 text-sm">Ver detalhes</button>}
              >
                {report.referrals.length === 0 ? (
                  <p className="text-slate-400">Nenhum encaminhamento ainda.</p>
                ) : (
                  <ul className="flex flex-col gap-3">
                    {report.referrals.map((ref) => (
                      <li key={ref.id} className="flex flex-wrap items-center justify-between gap-2">
                        <span className="text-slate-100">{ref.destination}</span>
                        <ReferralBadge status={ref.status} />
                      </li>
                    ))}
                  </ul>
                )}
              </Card>
            </div>
          </div>
        )}

        {tab === 'original' && (
          <section aria-labelledby="original" className="card p-5">
            <h2 id="original" className="flex items-center gap-2 text-lg font-semibold text-white">
              <ShieldCheck size={18} className="text-accent" aria-hidden="true" /> Relato original — escolhas realizadas pela pessoa
            </h2>
            <p className="mt-1 text-sm text-slate-400">Exatamente o que a pessoa selecionou, sem interpretação.</p>
            <div className="mt-5 flex flex-col gap-6">
              {STEPS.map(({ key }) => (
                <div key={key}>
                  <h3 className="label mb-3">{SHORT_QUESTION[key]}</h3>
                  <div className="flex flex-wrap gap-3">
                    {resolve(key, report.selections[key]).map((p) => <PictogramChip key={p.id} pictogram={p} />)}
                  </div>
                </div>
              ))}
              {report.extraText && (
                <div>
                  <h3 className="label mb-2">Escrito pela pessoa</h3>
                  <blockquote className="rounded-xl border-l-4 border-accent bg-navy-900/70 p-4 text-lg text-white">“{report.extraText}”</blockquote>
                </div>
              )}
            </div>
          </section>
        )}

        {tab === 'timeline' && (
          <Card title="Linha do tempo completa">
            <Timeline events={report.timeline} />
          </Card>
        )}

        {tab === 'referrals' && (
          <Card title="Encaminhamentos">
            <div className="flex flex-col gap-3">
              {report.referrals.length === 0 && <p className="text-slate-400">Nenhum encaminhamento registrado.</p>}
              {report.referrals.map((ref) => (
                <div key={ref.id} className="flex flex-wrap items-center gap-3 rounded-xl border border-navy-700 bg-navy-900/60 p-4">
                  <div className="flex-1">
                    <p className="font-semibold text-white">{ref.destination}</p>
                    <p className="text-sm text-slate-400">Registrado em {formatDate(ref.at)}</p>
                  </div>
                  <label className="sr-only" htmlFor={`ref-${ref.id}`}>Status de {ref.destination}</label>
                  <select
                    id={`ref-${ref.id}`}
                    value={ref.status}
                    onChange={(e) => r.updateReferral(report.id, ref.id, e.target.value)}
                    className="rounded-lg border border-navy-600 bg-navy-900 px-2 py-2 text-white"
                  >
                    {Object.entries(REFERRAL_STATUSES).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
                  </select>
                </div>
              ))}
              {showReferralForm ? (
                <ReferralForm
                  onCancel={() => setShowReferralForm(false)}
                  onSave={(destination) => {
                    r.addReferral(report.id, destination)
                    setShowReferralForm(false)
                  }}
                />
              ) : (
                <button type="button" onClick={() => setShowReferralForm(true)} className="btn border-2 border-dashed border-navy-600 text-slate-300 hover:border-accent/60 hover:text-accent">
                  Adicionar encaminhamento
                </button>
              )}
            </div>
          </Card>
        )}

        {tab === 'notes' && (
          <Card title="Anotações profissionais">
            <p className="-mt-2 mb-4 text-sm text-slate-400">Interpretações e registros da equipe — visíveis apenas no painel.</p>
            <ul className="flex flex-col gap-3">
              {report.notes.map((n) => (
                <li key={n.id} className="rounded-xl border border-navy-700 bg-navy-900/60 p-4">
                  <p className="text-sm text-slate-400">{n.author} · {formatDateTime(n.at)}</p>
                  <p className="mt-1 text-slate-100">{n.text}</p>
                </li>
              ))}
              {report.notes.length === 0 && <p className="text-slate-400">Nenhuma anotação ainda.</p>}
            </ul>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                if (!note.trim()) return
                r.addNote(report.id, note.trim())
                setNote('')
              }}
              className="mt-4 flex flex-col gap-2"
            >
              <label htmlFor="nova-nota" className="label">Nova anotação</label>
              <textarea id="nova-nota" value={note} onChange={(e) => setNote(e.target.value)} rows={3} className="field py-2" />
              <button type="submit" disabled={!note.trim()} className="btn-primary self-end">
                Adicionar anotação <ArrowRight size={16} aria-hidden="true" />
              </button>
            </form>
          </Card>
        )}
      </div>
    </PanelLayout>
  )
}
