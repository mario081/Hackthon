import { useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Lock, LogIn } from 'lucide-react'
import { useAuth } from '../../context/reports'
import { isAuthConfigured } from '../../lib/auth'
import Logo from '../../components/Logo'

export default function Login() {
  const { user, login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from ?? '/painel'
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  if (user) return <Navigate to={from} replace />

  async function handleSubmit(e) {
    e.preventDefault()
    setBusy(true)
    const result = await login(username, password)
    setBusy(false)
    if (result.ok) {
      navigate(from, { replace: true })
      return
    }
    setPassword('')
    setError(
      result.reason === 'locked'
        ? 'Muitas tentativas. Aguarde 30 segundos e tente de novo.'
        : `Usuário ou senha incorretos. Restam ${result.remaining} tentativas.`,
    )
  }

  const configured = isAuthConfigured()

  return (
    <div data-testid="page-login" className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center gap-3 text-center">
          <Logo size="lg" />
          <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Painel institucional</p>
        </div>

        <form onSubmit={handleSubmit} className="card flex flex-col gap-5 p-6 sm:p-8">
          <div>
            <h1 className="flex items-center gap-2 text-2xl font-bold text-white">
              <Lock size={22} className="text-accent" aria-hidden="true" /> Acesso restrito
            </h1>
            <p className="mt-1 text-slate-400">Entre com seu usuário para ver os relatos.</p>
          </div>

          {!configured && (
            <p role="alert" className="rounded-xl border border-amber-300/40 bg-amber-400/10 p-3 text-sm text-amber-100">
              Login não configurado. Local: rode <code className="font-mono">npm run senha -- SuaSenha</code> e reinicie o servidor.
              Na Vercel: crie <code className="font-mono">VITE_ADMIN_USER</code> e <code className="font-mono">VITE_ADMIN_PASSWORD_SHA256</code> em
              Environment Variables e faça Redeploy.
            </p>
          )}

          <label className="flex flex-col gap-1.5">
            <span className="label">Usuário</span>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              autoCapitalize="none"
              spellCheck={false}
              required
              className="field"
            />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="label">Senha</span>
            <span className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
                className="field pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                className="absolute right-1 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 hover:text-white"
              >
                {showPassword ? <EyeOff size={18} aria-hidden="true" /> : <Eye size={18} aria-hidden="true" />}
              </button>
            </span>
          </label>

          {error && <p role="alert" className="text-sm font-medium text-red-300">{error}</p>}

          <button type="submit" disabled={busy || !configured} className="btn-primary">
            <LogIn size={18} aria-hidden="true" /> {busy ? 'Entrando…' : 'Entrar'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-400">
          <Link to="/" className="hover:text-accent">← Voltar ao site</Link>
        </p>
      </div>
    </div>
  )
}
