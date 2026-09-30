import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useReport } from '../context/ReportContext'
import { imgUrl, STEPS } from '../data/pictograms'
import CaseTabs from '../components/CaseTabs'

const TABS = [
  { key: 'resumo',    label: 'Resumo' },
  { key: 'original',  label: 'Relato Original' },
  { key: 'timeline',  label: 'Linha do Tempo' },
  { key: 'referrals', label: 'Encaminhamentos' },
]

const PRIORITY_LABELS = { URGENT: 'Urgente', MEDIUM: 'Médio', LOW: 'Baixo' }
const PRIORITY_COLORS = {
  URGENT: 'bg-red-100 text-red-700',
  MEDIUM: 'bg-yellow-100 text-yellow-700',
  LOW:    'bg-green-100 text-green-700',
}

export default function CasoDetalhe() {
  const { id } = useParams()
  const { reports } = useReport()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('resumo')
  const [showReferralForm, setShowReferralForm] = useState(false)
  const [newReferral, setNewReferral] = useState('')

  const report = reports.find((r) => r.id === id)
  const [localReferrals, setLocalReferrals] = useState(report ? report.referrals : [])

  if (!report) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Relato não encontrado.</p>
      </div>
    )
  }

  return (
    <div data-testid="page-caso-detalhe" className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm p-4 flex items-center gap-3">
        <button onClick={() => navigate('/painel')} className="text-gray-600">
          ← Voltar
        </button>
        <span className="font-bold text-gray-800">{report.id}</span>
        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${PRIORITY_COLORS[report.priority]}`}>
          {PRIORITY_LABELS[report.priority]}
        </span>
      </header>

      <main className="p-4 max-w-2xl mx-auto">
        <CaseTabs tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />

        {activeTab === 'resumo' && (
          <div className="flex flex-col gap-4">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <p className="text-xs font-semibold text-blue-500 uppercase mb-2">
                Resumo assistido por IA
              </p>
              <p className="text-gray-700 leading-relaxed">{report.aiSummary}</p>
            </div>
            <div className="flex gap-3">
              <button className="flex-1 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700">
                Iniciar atendimento
              </button>
              <button className="flex-1 py-2 border border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50">
                Encaminhar
              </button>
            </div>
          </div>
        )}

        {activeTab === 'original' && (
          <div className="flex flex-col gap-4">
            <p className="text-xs text-gray-500 uppercase font-semibold">
              Relato original — escolhas realizadas pela pessoa
            </p>
            {STEPS.map(({ key, question }) => {
              const items = report.selections[key]
              if (!items || items.length === 0) return null
              return (
                <section key={key}>
                  <h2 className="text-sm font-semibold text-gray-500 mb-2">{question}</h2>
                  <div className="flex flex-wrap gap-3">
                    {items.map((pic) => (
                      <div key={pic.id} className="flex flex-col items-center gap-1">
                        <img
                          src={imgUrl(pic.arasaacId)}
                          alt={pic.label}
                          className="w-14 h-14 object-contain"
                        />
                        <span className="text-xs text-gray-600">{pic.label}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )
            })}
          </div>
        )}

        {activeTab === 'timeline' && (
          <div className="flex flex-col gap-3">
            {report.timeline.map((event, i) => (
              <div key={i} className="flex gap-3 items-start">
                <span className="text-sm text-gray-400 w-12 shrink-0 pt-0.5">{event.time}</span>
                <span className="text-sm text-gray-700">{event.description}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'referrals' && (
          <div className="flex flex-col gap-4">
            {localReferrals.length === 0 && (
              <p className="text-gray-500 text-sm">Nenhum encaminhamento registrado.</p>
            )}
            {localReferrals.map((ref, i) => (
              <div key={i} className="bg-white rounded-lg border p-3 flex flex-col gap-1">
                <span className="font-medium text-gray-800">{ref.destination}</span>
                <span className="text-sm text-gray-500">
                  {ref.status === 'EM_ANDAMENTO' ? 'Em andamento' : 'Concluído'} · {ref.date}
                </span>
              </div>
            ))}
            {showReferralForm ? (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newReferral}
                  onChange={(e) => setNewReferral(e.target.value)}
                  placeholder="Destino do encaminhamento"
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm"
                />
                <button
                  onClick={() => {
                    if (newReferral.trim()) {
                      setLocalReferrals(prev => [...prev, {
                        destination: newReferral.trim(),
                        status: 'EM_ANDAMENTO',
                        date: new Date().toISOString().slice(0, 10)
                      }])
                    }
                    setShowReferralForm(false)
                    setNewReferral('')
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm"
                >
                  Salvar
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowReferralForm(true)}
                className="w-full py-2 border-2 border-dashed border-gray-300 text-gray-500 rounded-lg text-sm hover:bg-gray-50"
              >
                Adicionar encaminhamento
              </button>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
