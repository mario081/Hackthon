import { useNavigate } from 'react-router-dom'
import { Phone, TriangleAlert } from 'lucide-react'
import { useReports } from '../../context/reports'
import { EMERGENCY_CONTACTS } from '../../data/catalog'
import UserLayout from '../../components/user/UserLayout'

export default function Ajuda() {
  const { startDraft } = useReports()
  const navigate = useNavigate()

  return (
    <UserLayout title="Ajuda imediata" back="/">
      <div data-testid="page-ajuda" className="flex flex-col gap-5">
        <div className="flex gap-3 rounded-2xl bg-red-600 p-5 text-white">
          <TriangleAlert size={36} className="shrink-0" aria-hidden="true" />
          <div>
            <h1 className="text-2xl font-bold">Estou em perigo</h1>
            <p className="mt-1 text-lg">Se você está em perigo agora, ligue <strong>190</strong>.</p>
          </div>
        </div>

        <ul className="flex flex-col gap-3">
          {EMERGENCY_CONTACTS.map((c) => (
            <li key={c.number}>
              <a
                href={`tel:${c.number}`}
                className="card flex min-h-[72px] items-center gap-4 p-4 transition hover:border-accent/60"
              >
                <span className="flex h-14 w-16 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-2xl font-bold text-accent">
                  {c.number}
                </span>
                <span className="flex-1">
                  <span className="block text-lg font-semibold text-white">{c.name}</span>
                  <span className="block text-sm text-slate-300">{c.desc}</span>
                </span>
                <Phone className="text-accent" aria-label={`Ligar para ${c.number}`} />
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => {
            startDraft('PERIGO')
            navigate('/relato')
          }}
          className="btn-primary text-lg"
        >
          Fazer um relato urgente
        </button>
        <p className="text-center text-sm text-slate-400">Relatos urgentes aparecem no topo da fila da equipe.</p>
      </div>
    </UserLayout>
  )
}
