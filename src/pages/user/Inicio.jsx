import { Link, useNavigate } from 'react-router-dom'
import { Accessibility, ChevronRight, MessageSquareText, Siren, TriangleAlert, Users } from 'lucide-react'
import { useReports } from '../../context/reports'
import UserLayout from '../../components/user/UserLayout'
import QuickExit from '../../components/QuickExit'

export default function Inicio() {
  const { startDraft } = useReports()
  const navigate = useNavigate()

  function report(origin, about) {
    startDraft(origin, about)
    navigate('/relato')
  }

  const tiles = [
    { title: 'Quero denunciar', desc: 'Relatar uma situação de violência ou violação', icon: TriangleAlert, color: 'bg-red-600 hover:bg-red-500', onClick: () => report('RELATO') },
    { title: 'Estou em perigo', desc: 'Preciso de ajuda imediata', icon: Siren, color: 'bg-orange-700 hover:bg-orange-600', onClick: () => navigate('/ajuda') },
    { title: 'Falar sobre alguém', desc: 'Quero relatar sobre outra pessoa', icon: Users, color: 'bg-violet-600 hover:bg-violet-500', onClick: () => report('TERCEIRO', 'other') },
    { title: 'Dar um depoimento', desc: 'Compartilhar minha história', icon: MessageSquareText, color: 'bg-blue-600 hover:bg-blue-500', onClick: () => report('DEPOIMENTO', 'self') },
  ]

  return (
    <UserLayout>
      <div data-testid="page-inicio" className="flex flex-col gap-5">
        <h1 className="text-3xl font-bold leading-tight text-white">Como você quer se comunicar hoje?</h1>

        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {tiles.map(({ title, desc, icon: Icon, color, onClick }) => (
            <button
              key={title}
              type="button"
              onClick={onClick}
              className={`flex min-h-[150px] flex-col items-center justify-center gap-2 rounded-2xl p-4 text-center text-white shadow-lg transition ${color}`}
            >
              <Icon size={40} strokeWidth={2.2} aria-hidden="true" />
              <span className="text-xl font-bold leading-tight">{title}</span>
              <span className="text-sm leading-snug text-white/90">{desc}</span>
            </button>
          ))}
        </div>

        <Link
          to="/acessibilidade"
          className="flex min-h-[72px] items-center gap-4 rounded-2xl bg-emerald-700 px-5 text-white shadow-lg transition hover:bg-emerald-600"
        >
          <Accessibility size={36} aria-hidden="true" />
          <span className="flex-1">
            <span className="block text-xl font-bold">Acessibilidade</span>
            <span className="block text-sm text-white/90">Texto maior e leitura em voz alta</span>
          </span>
          <ChevronRight aria-hidden="true" />
        </Link>

        <QuickExit variant="full" />

        <Link to="/acompanhar" className="card flex min-h-[64px] items-center justify-between px-5 text-lg font-semibold text-white hover:border-accent/60">
          Já fiz um relato — acompanhar meu caso
          <ChevronRight className="text-accent" aria-hidden="true" />
        </Link>

        <footer className="mt-4 flex flex-col items-center gap-3 text-center text-sm text-slate-400">
          <Link to="/painel" className="inline-flex min-h-[44px] items-center rounded-lg px-3 font-medium text-slate-300 underline-offset-4 hover:text-accent hover:underline">
            Sou profissional da rede de proteção
          </Link>
          <p className="text-xs">
            Pictogramas: Sergio Palao / ARASAAC (CC BY-NC-SA), Governo de Aragão.
          </p>
        </footer>
      </div>
    </UserLayout>
  )
}
