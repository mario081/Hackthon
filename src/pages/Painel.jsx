import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useReport } from '../context/ReportContext'
import ReportCard from '../components/ReportCard'

const STATUS_OPTIONS = [
  { value: 'ALL',           label: 'Todos' },
  { value: 'NEW',           label: 'Novos' },
  { value: 'UNDER_REVIEW',  label: 'Em triagem' },
  { value: 'IN_ATTENDANCE', label: 'Em atendimento' },
  { value: 'REFERRED',      label: 'Encaminhados' },
]

export default function Painel() {
  const { reports } = useReport()
  const navigate = useNavigate()
  const [filter, setFilter] = useState('ALL')

  const filtered = filter === 'ALL' ? reports : reports.filter((r) => r.status === filter)

  return (
    <div data-testid="page-painel" className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm p-4">
        <h1 className="text-xl font-bold text-gray-800">VozSegura — Painel Institucional</h1>
      </header>

      <main className="p-4 flex flex-col gap-4 max-w-2xl mx-auto">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {STATUS_OPTIONS.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setFilter(value)}
              className={`whitespace-nowrap px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                filter === value
                  ? 'bg-blue-600 text-white'
                  : 'bg-white border border-gray-300 text-gray-600 hover:bg-gray-50'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          {filtered.length === 0 ? (
            <p className="text-gray-500 text-center py-8">Nenhum relato encontrado.</p>
          ) : (
            filtered.map((report) => (
              <ReportCard
                key={report.id}
                report={report}
                onClick={() => navigate(`/painel/${report.id}`)}
              />
            ))
          )}
        </div>
      </main>
    </div>
  )
}
