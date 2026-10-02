import { render } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { routes } from '../routes'
import { ReportsProvider } from '../context/ReportsProvider'
import { SettingsProvider } from '../context/SettingsProvider'
import { AuthProvider } from '../context/AuthProvider'
import { SESSION_KEY } from '../lib/auth'

export function renderApp(path = '/', { reports, loggedIn = false } = {}) {
  if (loggedIn) sessionStorage.setItem(SESSION_KEY, JSON.stringify({ username: 'admin', at: Date.now() }))
  const router = createMemoryRouter(routes, { initialEntries: [path] })
  const result = render(
    <AuthProvider>
      <SettingsProvider>
        <ReportsProvider {...(reports ? { initialReports: reports } : {})}>
          <RouterProvider router={router} />
        </ReportsProvider>
      </SettingsProvider>
    </AuthProvider>,
  )
  return { ...result, router }
}
