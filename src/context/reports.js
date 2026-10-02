import { createContext, useContext } from 'react'

export const ReportsContext = createContext(null)
export const SettingsContext = createContext(null)

export function useReports() {
  const ctx = useContext(ReportsContext)
  if (!ctx) throw new Error('useReports deve ser usado dentro de ReportsProvider')
  return ctx
}

export function useSettings() {
  const ctx = useContext(SettingsContext)
  if (!ctx) throw new Error('useSettings deve ser usado dentro de SettingsProvider')
  return ctx
}

export const AuthContext = createContext(null)

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth deve ser usado dentro de AuthProvider')
  return ctx
}
