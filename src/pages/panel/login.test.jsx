import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, vi } from 'vitest'
import { renderApp } from '../../test/renderApp'
import { sha256Hex } from '../../lib/auth'

const PASSWORD = 'senha-de-teste-123'

beforeEach(async () => {
  vi.stubEnv('VITE_ADMIN_USER', 'admin')
  vi.stubEnv('VITE_ADMIN_PASSWORD_SHA256', await sha256Hex(PASSWORD))
})
afterEach(() => vi.unstubAllEnvs())

async function fill(user, username, password) {
  await user.type(screen.getByLabelText('Usuário'), username)
  await user.type(screen.getByLabelText('Senha'), password)
  await user.click(screen.getByRole('button', { name: /entrar/i }))
}

test('painel sem login redireciona para a tela de login', () => {
  renderApp('/painel/casos')
  expect(screen.getByTestId('page-login')).toBeInTheDocument()
  expect(screen.queryByTestId('page-casos')).not.toBeInTheDocument()
})

test('senha errada mostra erro e não entra', async () => {
  const user = userEvent.setup()
  renderApp('/painel')
  await fill(user, 'admin', 'errada')
  expect(await screen.findByRole('alert')).toHaveTextContent('Usuário ou senha incorretos. Restam 4 tentativas.')
  expect(screen.getByTestId('page-login')).toBeInTheDocument()
})

test('bloqueia depois de 5 tentativas erradas', async () => {
  const user = userEvent.setup()
  renderApp('/painel')
  for (let i = 0; i < 5; i++) await fill(user, 'admin', 'errada')
  expect(await screen.findByRole('alert')).toHaveTextContent(/muitas tentativas/i)
  await fill(user, 'admin', PASSWORD)
  expect(screen.getByTestId('page-login')).toBeInTheDocument()
})

test('login certo leva à página pedida e sair volta ao login', async () => {
  const user = userEvent.setup()
  renderApp('/painel/casos')
  await fill(user, 'admin', PASSWORD)
  expect(await screen.findByTestId('page-casos')).toBeInTheDocument()
  expect(screen.getByText('Administrador')).toBeInTheDocument()

  await user.click(screen.getByRole('button', { name: /^sair$/i }))
  expect(screen.getByTestId('page-login')).toBeInTheDocument()
})

test('sem configuração avisa e desativa o botão', () => {
  vi.stubEnv('VITE_ADMIN_PASSWORD_SHA256', '')
  renderApp('/painel/login')
  expect(screen.getByRole('alert')).toHaveTextContent(/login não configurado/i)
  expect(screen.getByRole('button', { name: /entrar/i })).toBeDisabled()
})
