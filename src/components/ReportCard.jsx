const PRIORITY_LABELS = { URGENT: 'Urgente', MEDIUM: 'Médio', LOW: 'Baixo' }
const PRIORITY_COLORS = {
  URGENT: 'bg-red-100 text-red-700',
  MEDIUM: 'bg-yellow-100 text-yellow-700',
  LOW:    'bg-green-100 text-green-700',
}
const STATUS_LABELS = {
  NEW:           'Novo',
  UNDER_REVIEW:  'Em triagem',
  IN_ATTENDANCE: 'Em atendimento',
  REFERRED:      'Encaminhado',
}

export default function ReportCard({ report, onClick }) {
  const date = new Date(report.receivedAt).toLocaleString('pt-BR', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })

  return (
    <article
      role="article"
      onClick={onClick}
      className="bg-white rounded-xl border border-gray-200 p-4 flex flex-col gap-2 cursor-pointer hover:shadow-md transition-shadow"
    >
      <div className="flex items-center justify-between">
        <span className="font-bold text-gray-800">{report.id}</span>
        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${PRIORITY_COLORS[report.priority]}`}>
          {PRIORITY_LABELS[report.priority]}
        </span>
      </div>
      <p className="text-sm text-gray-500">Recebido: {date}</p>
      <p className="text-sm text-gray-600">Status: {STATUS_LABELS[report.status]}</p>
    </article>
  )
}
