import { Link } from 'react-router-dom'
import { useReports } from '../../context/reports'
import { REFERRAL_STATUSES } from '../../data/catalog'
import { formatDate } from '../../lib/reports'
import PanelLayout from '../../components/panel/PanelLayout'
import { ReferralBadge } from '../../components/Badge'

export default function Encaminhamentos() {
  const { reports } = useReports()
  const rows = reports
    .flatMap((r) => r.referrals.map((ref) => ({ ...ref, caseId: r.id })))
    .sort((a, b) => b.at.localeCompare(a.at))
  const count = (s) => rows.filter((r) => r.status === s).length

  return (
    <PanelLayout>
      <div data-testid="page-encaminhamentos" className="flex flex-col gap-5">
        <div>
          <h1 className="text-3xl font-bold text-white">Encaminhamentos</h1>
          <p className="text-slate-400">Acionamentos da rede de proteção em todos os casos.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {Object.entries(REFERRAL_STATUSES).map(([k, v]) => (
            <div key={k} className="card p-5">
              <p className="text-3xl font-bold text-white">{count(k)}</p>
              <p className="text-sm text-slate-300">{v.label}</p>
            </div>
          ))}
        </div>
        <div className="card overflow-x-auto">
          <table className="w-full min-w-[640px] text-left">
            <thead className="border-b border-navy-700 text-sm text-slate-400">
              <tr>
                <th scope="col" className="px-4 py-3 font-medium">Destino</th>
                <th scope="col" className="px-4 py-3 font-medium">Caso</th>
                <th scope="col" className="px-4 py-3 font-medium">Data</th>
                <th scope="col" className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-700/70">
              {rows.map((ref) => (
                <tr key={`${ref.caseId}-${ref.id}`}>
                  <td className="px-4 py-3 text-slate-100">{ref.destination}</td>
                  <td className="px-4 py-3">
                    <Link to={`/painel/casos/${ref.caseId}`} className="font-semibold text-accent hover:underline">#{ref.caseId}</Link>
                  </td>
                  <td className="px-4 py-3 text-slate-300">{formatDate(ref.at)}</td>
                  <td className="px-4 py-3"><ReferralBadge status={ref.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
          {rows.length === 0 && <p className="p-8 text-center text-slate-400">Nenhum encaminhamento.</p>}
        </div>
      </div>
    </PanelLayout>
  )
}
