import { useState } from 'react'
import { Link, NavLink, useNavigate, useSearchParams } from 'react-router-dom'
import { ArrowLeftRight, Bell, FolderOpen, LayoutDashboard, LogOut, Search } from 'lucide-react'
import Logo from '../Logo'
import { useAuth, useReports } from '../../context/reports'

const NAV = [
  { to: '/painel', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/painel/casos', label: 'Casos', icon: FolderOpen },
  { to: '/painel/encaminhamentos', label: 'Encaminhamentos', icon: ArrowLeftRight },
]

function initials(name) {
  return name.split(' ').map((p) => p[0]).slice(0, 2).join('')
}

function TopSearch() {
  const [params] = useSearchParams()
  const [q, setQ] = useState(params.get('q') ?? '')
  const navigate = useNavigate()
  return (
    <form
      role="search"
      onSubmit={(e) => {
        e.preventDefault()
        navigate(q.trim() ? `/painel/casos?q=${encodeURIComponent(q.trim())}` : '/painel/casos')
      }}
      className="relative w-full max-w-xl"
    >
      <Search size={18} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true" />
      <input
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        aria-label="Buscar casos"
        placeholder="Buscar por número do caso, tipo, local…"
        className="field pl-10"
      />
    </form>
  )
}

export default function PanelLayout({ children }) {
  const { reports } = useReports()
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const newCount = reports.filter((r) => r.status === 'NEW').length

  return (
    <div className="flex min-h-screen">
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-navy-700/70 bg-navy-950/70 px-4 py-6 backdrop-blur lg:flex">
        <Link to="/painel" className="px-2"><Logo /></Link>
        <nav aria-label="Painel" className="mt-10 flex flex-col gap-1">
          {NAV.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex min-h-[48px] items-center gap-3 rounded-xl px-3 font-medium transition ${
                  isActive ? 'bg-accent/15 text-accent ring-1 ring-accent/40' : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              <Icon size={20} aria-hidden="true" />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="mt-auto rounded-xl border border-navy-700 bg-navy-900/80 p-3 text-sm text-slate-400">
          <p className="font-medium text-slate-200">Acesso restrito</p>
          <p className="mt-1">Dados sigilosos. Todas as ações ficam registradas na linha do tempo do caso.</p>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex items-center gap-4 border-b border-navy-700/70 bg-navy-950/80 px-4 py-3 backdrop-blur lg:px-8">
          <Link to="/painel" className="lg:hidden"><Logo size="sm" /></Link>
          <div className="hidden flex-1 sm:block"><TopSearch /></div>
          <div className="ml-auto flex items-center gap-2">
            <Link
              to="/painel/casos?status=NEW"
              aria-label={`${newCount} casos novos`}
              className="relative flex h-11 w-11 items-center justify-center rounded-xl text-slate-300 hover:bg-white/5"
            >
              <Bell size={20} aria-hidden="true" />
              {newCount > 0 && (
                <span className="absolute right-1.5 top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[11px] font-bold text-white">
                  {newCount}
                </span>
              )}
            </Link>
            <div className="flex items-center gap-3 rounded-xl px-2 py-1">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/20 font-bold text-accent ring-1 ring-accent/50">
                {initials(user.name)}
              </span>
              <span className="hidden leading-tight md:block">
                <span className="block text-sm font-semibold text-white">{user.name}</span>
                <span className="block text-xs text-slate-400">{user.role}</span>
              </span>
            </div>
            <button
              type="button"
              onClick={() => {
                logout()
                navigate('/painel/login', { replace: true })
              }}
              className="inline-flex h-11 items-center gap-2 rounded-xl px-3 text-sm font-medium text-slate-300 hover:bg-white/5 hover:text-white"
            >
              <LogOut size={18} aria-hidden="true" />
              Sair
            </button>
          </div>
        </header>

        <nav aria-label="Painel (móvel)" className="flex gap-1 overflow-x-auto border-b border-navy-700/70 px-4 py-2 lg:hidden">
          {NAV.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) => `whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium ${isActive ? 'bg-accent/15 text-accent' : 'text-slate-300'}`}
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <main className="flex-1 px-4 py-6 lg:px-8">{children}</main>
      </div>
    </div>
  )
}
