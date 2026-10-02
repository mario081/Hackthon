import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import { renderApp } from '../../test/renderApp'
import { leave } from '../../lib/leave'

vi.mock('../../lib/leave', () => ({ leave: vi.fn() }))

async function pick(user, label) {
  await user.click(screen.getByRole('button', { name: new RegExp(label, 'i'), pressed: false }))
}
const next = (user) => user.click(screen.getByRole('button', { name: /avançar|voltar à revisão/i }))

async function fillAll(user) {
  await pick(user, 'Eu mesmo')
  await next(user)
  await pick(user, '^Homem')
  await next(user)
  await pick(user, 'Violência física')
  await next(user)
  await pick(user, '^Casa')
  await next(user)
  await pick(user, '^Hoje')
  await next(user)
  await pick(user, 'Com medo')
  await next(user)
}

test('início mostra as quatro formas de comunicar e a saída rápida', () => {
  renderApp('/')
  for (const name of [/quero denunciar/i, /estou em perigo/i, /falar sobre alguém/i, /dar um depoimento/i]) {
    expect(screen.getByRole('button', { name })).toBeInTheDocument()
  }
  expect(screen.getByRole('link', { name: /sou profissional/i })).toHaveAttribute('href', '/painel')
})

test('sair rapidamente troca a página para um site neutro', async () => {
  const user = userEvent.setup()
  renderApp('/')
  await user.click(screen.getByRole('button', { name: /sair rapidamente/i }))
  expect(leave).toHaveBeenCalledWith(expect.stringContaining('google'))
})

test('"Falar sobre alguém" já marca Outra pessoa', async () => {
  const user = userEvent.setup()
  renderApp('/')
  await user.click(screen.getByRole('button', { name: /falar sobre alguém/i }))
  expect(screen.getByRole('heading', { name: /sobre quem é o relato/i })).toBeInTheDocument()
  expect(screen.getByRole('button', { name: /outra pessoa/i })).toHaveAttribute('aria-pressed', 'true')
  expect(screen.getByRole('button', { name: /avançar/i })).toBeEnabled()
})

test('avançar fica desativado sem escolha e "sobre quem" aceita só uma opção', async () => {
  const user = userEvent.setup()
  renderApp('/relato')
  expect(screen.getByText('Passo 1 de 7')).toBeInTheDocument()
  expect(screen.getByRole('button', { name: /avançar/i })).toBeDisabled()
  await pick(user, 'Criança')
  await pick(user, 'Adolescente')
  expect(screen.getByRole('button', { name: /criança/i })).toHaveAttribute('aria-pressed', 'false')
  expect(screen.getByRole('button', { name: /adolescente/i })).toHaveAttribute('aria-pressed', 'true')
  expect(screen.getByRole('button', { name: /avançar/i })).toBeEnabled()
})

test('revisão permite editar um passo e voltar direto à revisão', async () => {
  const user = userEvent.setup()
  renderApp('/relato')
  await fillAll(user)
  expect(screen.getByRole('heading', { name: /revisar seu relato/i })).toBeInTheDocument()

  await user.click(screen.getByRole('button', { name: /editar: onde/i }))
  expect(screen.getByRole('heading', { name: /onde aconteceu/i })).toBeInTheDocument()
  await pick(user, '^Escola')
  await user.click(screen.getByRole('button', { name: /voltar à revisão/i }))

  expect(screen.getByRole('heading', { name: /revisar seu relato/i })).toBeInTheDocument()
  expect(screen.getByText('Casa, Escola')).toBeInTheDocument()
})

test('enviar gera protocolo, aparece no acompanhamento e no painel', async () => {
  const user = userEvent.setup()
  renderApp('/relato', { reports: [] })
  await fillAll(user)
  await user.type(screen.getByRole('textbox'), 'Foi no quarto')
  await user.click(screen.getByRole('button', { name: /enviar relato/i }))

  expect(screen.getByTestId('page-enviado')).toBeInTheDocument()
  expect(screen.getByText('#2026-000001')).toBeInTheDocument()

  await user.click(screen.getByRole('link', { name: /acompanhar meu caso/i }))
  const steps = screen.getAllByRole('listitem')
  expect(within(steps[0]).getByText('(concluído)')).toBeInTheDocument()
  expect(within(steps[1]).getByText('(pendente)')).toBeInTheDocument()
})

test('acompanhamento avisa quando o número não existe', async () => {
  const user = userEvent.setup()
  renderApp('/acompanhar')
  await user.type(screen.getByLabelText(/número do caso/i), '#9999-000000')
  await user.click(screen.getByRole('button', { name: /ver andamento/i }))
  expect(screen.getByRole('alert')).toHaveTextContent('Não encontramos o caso #9999-000000')
})

test('página de perigo lista telefones de emergência com link de ligação', () => {
  renderApp('/ajuda')
  expect(screen.getByRole('link', { name: /190.*polícia militar/i })).toHaveAttribute('href', 'tel:190')
  expect(screen.getByRole('link', { name: /180/i })).toHaveAttribute('href', 'tel:180')
})

test('relato urgente vindo da página de perigo entra como urgente', async () => {
  const user = userEvent.setup()
  const { router } = renderApp('/ajuda', { reports: [], loggedIn: true })
  await user.click(screen.getByRole('button', { name: /fazer um relato urgente/i }))
  await pick(user, 'Eu mesmo')
  await next(user)
  await pick(user, 'Outra pessoa')
  await next(user)
  await pick(user, 'Outra situação')
  await next(user)
  await pick(user, 'Outro lugar')
  await next(user)
  await pick(user, 'Não sei')
  await next(user)
  await pick(user, 'Confuso')
  await next(user)
  await user.click(screen.getByRole('button', { name: /enviar relato/i }))

  await router.navigate('/painel/casos')
  const row = await screen.findByRole('row', { name: /2026-000001/ })
  expect(within(row).getByText('Urgente')).toBeInTheDocument()
})
