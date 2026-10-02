import { Link, useParams } from 'react-router-dom'
import { CircleCheck } from 'lucide-react'
import UserLayout from '../../components/user/UserLayout'

export default function Enviado() {
  const { id } = useParams()
  return (
    <UserLayout>
      <div data-testid="page-enviado" className="flex flex-col items-center gap-6 py-8 text-center">
        <CircleCheck size={88} className="text-emerald-300" aria-hidden="true" />
        <div>
          <h1 className="text-3xl font-bold text-white">Relato enviado</h1>
          <p className="mt-2 text-lg text-slate-300">
            Seu relato foi registrado com segurança.
            <br />
            Um profissional vai receber e acompanhar o caso.
          </p>
        </div>
        <div className="card w-full max-w-sm p-5">
          <p className="label">Número do seu caso</p>
          <p className="mt-1 text-3xl font-bold tracking-wide text-accent">#{id}</p>
          <p className="mt-2 text-slate-300">Guarde este número para acompanhar o andamento.</p>
        </div>
        <div className="flex w-full max-w-sm flex-col gap-3">
          <Link to={`/acompanhar/${id}`} className="btn-primary text-lg">Acompanhar meu caso</Link>
          <Link to="/" className="btn-outline text-lg">Voltar ao início</Link>
        </div>
      </div>
    </UserLayout>
  )
}
