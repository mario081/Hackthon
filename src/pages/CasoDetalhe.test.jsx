import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { ReportProvider } from '../context/ReportContext'
import CasoDetalhe from './CasoDetalhe'

function setup(id = 'VX-2026-0041') {
  render(
    <ReportProvider>
      <MemoryRouter initialEntries={[`/painel/${id}`]}>
        <Routes>
          <Route path="/painel/:id" element={<CasoDetalhe />} />
          <Route path="/painel" element={<div data-testid="page-painel" />} />
        </Routes>
      </MemoryRouter>
    </ReportProvider>
  )
}

test('exibe ID do caso no cabeçalho', () => {
  setup()
  expect(screen.getByText(/VX-2026-0041/)).toBeInTheDocument()
})

test('aba Resumo ativa por padrão', () => {
  setup()
  expect(screen.getByText(/resumo assistido por ia/i)).toBeInTheDocument()
})

test('troca para aba Relato Original', async () => {
  const user = userEvent.setup()
  setup()
  await user.click(screen.getByRole('tab', { name: /relato original/i }))
  expect(screen.getByText(/escolhas realizadas pela pessoa/i)).toBeInTheDocument()
})

test('troca para aba Linha do Tempo', async () => {
  const user = userEvent.setup()
  setup()
  await user.click(screen.getByRole('tab', { name: /linha do tempo/i }))
  expect(screen.getByText(/relato enviado/i)).toBeInTheDocument()
})

test('troca para aba Encaminhamentos', async () => {
  const user = userEvent.setup()
  setup()
  await user.click(screen.getByRole('tab', { name: /encaminhamentos/i }))
  expect(screen.getByRole('button', { name: /adicionar encaminhamento/i })).toBeInTheDocument()
})
