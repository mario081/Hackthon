import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderApp } from '../../test/renderApp'
import { MOCK_REPORTS } from '../../data/mockReports'

const NEW_CASE = MOCK_REPORTS.find((r) => r.status === 'NEW')

test('dashboard mostra contagens por status', () => {
  renderApp('/painel', { loggedIn: true })
  const novos = MOCK_REPORTS.filter((r) => r.status === 'NEW').length
  expect(screen.getByRole('link', { name: new RegExp(`^${novos} *Novos`) })).toBeInTheDocument()
})

test('casos: abas filtram por status e mostram a contagem', async () => {
  const user = userEvent.setup()
  renderApp('/painel/casos', { loggedIn: true })
  expect(screen.getByText(`Mostrando 1–10 de ${MOCK_REPORTS.length} casos`)).toBeInTheDocument()

  const total = MOCK_REPORTS.filter((r) => r.status === 'CLOSED').length
  await user.click(screen.getByRole('tab', { name: new RegExp(`Concluído *${total}`) }))
  const rows = screen.getAllByRole('row').slice(1)
  expect(rows).toHaveLength(total)
  rows.forEach((row) => expect(within(row).getByText('Concluído')).toBeInTheDocument())
})

test('casos: busca vinda da barra superior e paginação', async () => {
  const user = userEvent.setup()
  renderApp('/painel/casos', { loggedIn: true })
  await user.type(screen.getByRole('searchbox', { name: /buscar casos/i }), 'transporte{enter}')
  const expected = MOCK_REPORTS.filter((r) => r.selections.WHERE.includes('transport')).length
  expect(screen.getAllByRole('row').slice(1)).toHaveLength(expected)
  expect(screen.getByText(/resultados para “transporte”/i)).toBeInTheDocument()
})

test('casos: muda de página', async () => {
  const user = userEvent.setup()
  renderApp('/painel/casos', { loggedIn: true })
  await user.click(screen.getByRole('button', { name: /próxima página/i }))
  expect(screen.getByText(`Mostrando 11–20 de ${MOCK_REPORTS.length} casos`)).toBeInTheDocument()
})

test('detalhe: iniciar atendimento muda status, atribui e registra na linha do tempo', async () => {
  const user = userEvent.setup()
  renderApp(`/painel/casos/${NEW_CASE.id}`, { loggedIn: true })
  await user.click(screen.getByRole('button', { name: /iniciar atendimento/i }))

  expect(screen.getByLabelText('Status do caso')).toHaveValue('IN_REVIEW')
  expect(screen.getByLabelText('Profissional responsável')).toHaveValue('admin')
  expect(screen.queryByRole('button', { name: /iniciar atendimento/i })).not.toBeInTheDocument()
  expect(screen.getByText('Atendimento iniciado por Administrador.')).toBeInTheDocument()
})

test('detalhe: encaminhar salva e persiste ao trocar de página', async () => {
  const user = userEvent.setup()
  const { router } = renderApp(`/painel/casos/${NEW_CASE.id}`, { loggedIn: true })
  await user.click(screen.getByRole('button', { name: /^encaminhar$/i }))
  await user.selectOptions(screen.getByLabelText(/destino do encaminhamento/i), 'Conselho Tutelar')
  await user.click(screen.getByRole('button', { name: /salvar encaminhamento/i }))

  expect(screen.getByLabelText('Status do caso')).toHaveValue('REFERRED')

  await router.navigate('/painel/encaminhamentos')
  const row = await screen.findByRole('row', { name: new RegExp(NEW_CASE.id) })
  expect(within(row).getByText('Conselho Tutelar')).toBeInTheDocument()

  await router.navigate(`/painel/casos/${NEW_CASE.id}`)
  await user.click(await screen.findByRole('tab', { name: /encaminhamentos/i }))
  expect(screen.getByText('Conselho Tutelar')).toBeInTheDocument()
})

test('detalhe: camadas separadas — relato original, resumo de IA e anotações', async () => {
  const user = userEvent.setup()
  renderApp(`/painel/casos/${NEW_CASE.id}`, { loggedIn: true })
  expect(screen.getByRole('heading', { name: /resumo assistido por ia/i })).toBeInTheDocument()

  await user.click(screen.getByRole('tab', { name: /relato original/i }))
  expect(screen.getByRole('heading', { name: /escolhas realizadas pela pessoa/i })).toBeInTheDocument()
  expect(screen.queryByRole('heading', { name: /resumo assistido por ia/i })).not.toBeInTheDocument()

  await user.click(screen.getByRole('tab', { name: /anotações/i }))
  await user.type(screen.getByLabelText(/nova anotação/i), 'Contato com a família agendado')
  await user.click(screen.getByRole('button', { name: /adicionar anotação/i }))
  expect(screen.getByText('Contato com a família agendado')).toBeInTheDocument()
  expect(screen.getByRole('tab', { name: /anotações \(1\)/i })).toBeInTheDocument()
})

test('detalhe: caso inexistente', () => {
  renderApp('/painel/casos/0000-000000', { loggedIn: true })
  expect(screen.getByText('Caso #0000-000000 não encontrado.')).toBeInTheDocument()
})
