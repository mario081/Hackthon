import { useCallback, useState } from 'react'
import { AuthContext } from './reports'
import { CURRENT_USER } from '../data/catalog'
import { checkCredentials, LOCK_MS, MAX_ATTEMPTS, SESSION_KEY, SESSION_TTL_MS } from '../lib/auth'

// A sessão fica no sessionStorage: some ao fechar a aba e expira em 8h.
function readSession() {
  try {
    const s = JSON.parse(sessionStorage.getItem(SESSION_KEY))
    if (s && Date.now() - s.at < SESSION_TTL_MS) return s
  } catch {
    // sessionStorage indisponível ou corrompido: trata como deslogado
  }
  return null
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(readSession)
  const [failures, setFailures] = useState(0)
  const [lockedUntil, setLockedUntil] = useState(0)

  const login = useCallback(async (username, password) => {
    if (Date.now() < lockedUntil) return { ok: false, reason: 'locked' }
    if (await checkCredentials(username, password)) {
      const s = { username: username.trim().toLowerCase(), at: Date.now() }
      try { sessionStorage.setItem(SESSION_KEY, JSON.stringify(s)) } catch { /* segue só em memória */ }
      setSession(s)
      setFailures(0)
      return { ok: true }
    }
    const n = failures + 1
    if (n >= MAX_ATTEMPTS) {
      setLockedUntil(Date.now() + LOCK_MS)
      setFailures(0)
      return { ok: false, reason: 'locked' }
    }
    setFailures(n)
    return { ok: false, reason: 'invalid', remaining: MAX_ATTEMPTS - n }
  }, [failures, lockedUntil])

  const logout = useCallback(() => {
    try { sessionStorage.removeItem(SESSION_KEY) } catch { /* nada a limpar */ }
    setSession(null)
  }, [])

  const user = session ? { ...CURRENT_USER, username: session.username } : null

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
}
