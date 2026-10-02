import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Check, Heart, Search, TriangleAlert } from 'lucide-react'
import { useReports } from '../../context/reports'
import { formatDateTime } from '../../lib/reports'
import UserLayout from '../../components/user/UserLayout'

// Para a pessoa atendida mostramos só o andamento — nunca anotações internas.
const STAGES = [
  { title: 'Recebido',    pending: 'Aguardando recebimento', done: 'Seu relato foi recebido com sucesso.', events: ['Relato recebido'] },
  { title: 'Em análise',  pending: 'Aguardando análise',     done: 'Sua situação está sendo analisada pela equipe técnica.', events: ['Em análise', 'Triagem concluída'] },
  { title: 'Encaminhado', pending: 'Aguardando encaminhamento', done: 'A rede de proteção foi acionada.', events: ['Encaminhado'] },
  { title: 'Concluído',   pending: 'Aguardando atualização', done: 'O atendimento foi concluído.', events: ['Concluído'] },
]
const LEVEL = { NEW: 0, IN_REVIEW: 1, AWAITING: 1, REFERRED: 2, CLOSED: 3 }

function normalizeProtocol(value) {
  return value.trim().replace(/^#/, '')
}

function ProtocolForm() {
  const [value, setValue] = useState('')
  const navigate = useNavigate()
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        if (value.trim()) navigate(`/acompanhar/${normalizeProtocol(value)}`)
      }}
      className="card flex flex-col gap-3 p-5"
    >
      <label htmlFor="protocolo" className="text-lg font-semibold text-white">Número do caso</label>
      <input id="protocolo" value={value} onChange={(e) => setValue(e.target.value)} placeholder="Ex.: 2026-001548" className="field text-lg" inputMode="numeric" autoComplete="off" />
      <button type="submit" className="btn-primary text-lg"><Search size={20} aria-hidden="true" /> Ver andamento</button>
    </form>
  )
}

export default function Acompanhar() {
  const { id } = useParams()
  const { getReport } = useReports()
  const report = id ? getReport(id) : null

  return (
    <UserLayout title="Acompanhamento" back={id ? '/acompanhar' : '/'}>
      <div data-testid="page-acompanhar" className="flex flex-col gap-5">
        {!id && (
          <>
            <div>
              <h1 className="text-3xl font-bold text-white">Acompanhar meu caso</h1>
              <p className="mt-1 text-lg text-slate-300">Digite o número que apareceu quando você enviou o relato.</p>
            </div>
            <ProtocolForm />
          </>
        )}

        {id && !report && (
          <>
            <p role="alert" className="text-lg text-amber-200">Não encontramos o caso #{id}. Confira o número e tente de novo.</p>
            <ProtocolForm />
          </>
        )}

        {report && <CaseProgress report={report} />}

        <div className="card flex flex-col gap-3 p-5">
          <p className="flex items-center gap-2 text-lg font-semibold text-white">
            <Heart className="text-accent" aria-hidden="true" /> Você não está só
          </p>
          <p className="text-slate-300">Em caso de risco, procure ajuda imediata.</p>
          <Link to="/ajuda" className="btn bg-red-600 text-lg text-white hover:bg-red-500">
            <TriangleAlert aria-hidden="true" /> Estou em perigo
          </Link>
        </div>
      </div>
    </UserLayout>
  )
}

function CaseProgress({ report }) {
  const level = LEVEL[report.status]
  const eventAt = (titles) => report.timeline.find((e) => titles.includes(e.title))?.at
  return (
    <>
      <div>
        <h1 className="text-3xl font-bold text-white">Meu caso <span className="text-accent">#{report.id}</span></h1>
        <p className="mt-1 text-lg text-slate-300">Acompanhe aqui o andamento do seu relato.</p>
      </div>
      <ol className="card flex flex-col p-5">
        {STAGES.map((stage, i) => {
          const done = i <= level
          const at = done ? eventAt(stage.events) : null
          const waiting = i === 1 && report.status === 'AWAITING'
          return (
            <li key={stage.title} className="relative flex gap-4 pb-6 last:pb-0" aria-current={i === level ? 'step' : undefined}>
              {i < STAGES.length - 1 && (
                <span className={`absolute left-[15px] top-9 h-[calc(100%-2.25rem)] w-0.5 ${i < level ? 'bg-accent' : 'bg-navy-600'}`} aria-hidden="true" />
              )}
              <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${done ? 'bg-accent text-navy-950' : 'border-2 border-navy-500 bg-navy-900'}`}>
                {done && <Check size={18} strokeWidth={3} aria-hidden="true" />}
              </span>
              <div>
                <p className={`text-lg font-semibold ${done ? 'text-white' : 'text-slate-400'}`}>
                  {stage.title} <span className="sr-only">{done ? '(concluído)' : '(pendente)'}</span>
                </p>
                {at && <p className="text-sm text-slate-400">{formatDateTime(at)}</p>}
                <p className="text-slate-300">
                  {waiting ? 'Aguardando retorno da rede de proteção.' : done ? stage.done : stage.pending}
                </p>
              </div>
            </li>
          )
        })}
      </ol>
    </>
  )
}
