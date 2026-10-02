import { NavLink, useNavigate } from 'react-router-dom'
import { ArrowLeft, House, LifeBuoy, ListChecks } from 'lucide-react'
import Logo from '../Logo'
import QuickExit from '../QuickExit'

const NAV = [
  { to: '/app', label: 'Início', icon: House, end: true },
  { to: '/acompanhar', label: 'Acompanhamento', icon: ListChecks },
  { to: '/ajuda', label: 'Ajuda', icon: LifeBuoy },
]

export default function UserLayout({ title, back, footer, hideNav = false, children }) {
  const navigate = useNavigate()
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-3xl flex-col">
      <header className="sticky top-0 z-20 flex items-center gap-2 border-b border-navy-700/60 bg-navy-950/85 px-4 py-2 backdrop-blur">
        {back ? (
          <button
            type="button"
            onClick={typeof back === 'function' ? back : () => navigate(back)}
            aria-label="Voltar"
            className="flex h-12 w-12 items-center justify-center rounded-xl text-slate-200 hover:bg-white/5"
          >
            <ArrowLeft aria-hidden="true" />
          </button>
        ) : null}
        <div className="flex-1">
          {title ? <p className="text-lg font-semibold text-white">{title}</p> : <Logo size="sm" />}
        </div>
        <QuickExit />
      </header>

      <main className={`flex-1 px-4 pb-6 pt-5 sm:px-6 ${hideNav ? '' : 'pb-28'}`}>{children}</main>

      {footer && (
        <div className="sticky bottom-0 z-20 border-t border-navy-700/60 bg-navy-950/90 px-4 py-3 backdrop-blur sm:px-6">
          {footer}
        </div>
      )}

      {!hideNav && (
        <nav aria-label="Navegação principal" className="fixed inset-x-0 bottom-0 z-20 border-t border-navy-700/60 bg-navy-950/95 backdrop-blur">
          <ul className="mx-auto flex max-w-3xl">
            {NAV.map(({ to, label, icon: Icon, end }) => (
              <li key={to} className="flex-1">
                <NavLink
                  to={to}
                  end={end}
                  className={({ isActive }) =>
                    `flex min-h-[64px] flex-col items-center justify-center gap-1 text-sm font-medium ${
                      isActive ? 'text-accent' : 'text-slate-400 hover:text-slate-200'
                    }`
                  }
                >
                  <Icon size={22} aria-hidden="true" />
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  )
}
