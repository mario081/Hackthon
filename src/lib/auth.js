// Login do painel feito só no navegador (MVP sem backend). A senha nunca fica no
// código: o .env.local guarda apenas o hash SHA-256 dela.
export async function sha256Hex(text) {
  const bytes = new TextEncoder().encode(text)
  const digest = await crypto.subtle.digest('SHA-256', bytes)
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, '0')).join('')
}

function config() {
  return {
    user: import.meta.env.VITE_ADMIN_USER,
    hash: import.meta.env.VITE_ADMIN_PASSWORD_SHA256?.toLowerCase(),
  }
}

export function isAuthConfigured() {
  const { user, hash } = config()
  return Boolean(user && hash)
}

export async function checkCredentials(username, password) {
  const { user, hash } = config()
  if (!user || !hash) return false
  const sameUser = username.trim().toLowerCase() === user.toLowerCase()
  return sameUser && (await sha256Hex(password)) === hash
}

export const SESSION_KEY = 'vozsegura.painel.sessao'
export const SESSION_TTL_MS = 8 * 60 * 60 * 1000
export const MAX_ATTEMPTS = 5
export const LOCK_MS = 30 * 1000
