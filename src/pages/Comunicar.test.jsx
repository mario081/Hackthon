import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { ReportProvider } from '../context/ReportContext'
import Comunicar from './Comunicar'
import Confirmar from './Confirmar'

function setup() {
  render(
    <ReportProvider>
      <MemoryRouter initialEntries={['/comunicar']}>
        <Routes>
          <Route path="/comunicar" element={<Comunicar />} />
          <Route path="/confirmar" element={<Confirmar />} />
        </Routes>
      </MemoryRouter>
    </ReportProvider>
  )
}

test('exibe pergunta do passo 1: QUEM?', () => {
  setup()
  expect(screen.getByText('QUEM?')).toBeInTheDocument()
})

test('exibe progresso: Passo 1 de 5', () => {
  setup()
  expect(screen.getByText(/passo 1 de 5/i)).toBeInTheDocument()
})

test('botão PRÓXIMO desabilitado sem seleção', () => {
  setup()
  expect(screen.getByRole('button', { name: /próximo/i })).toBeDisabled()
})

test('PRÓXIMO habilita após selecionar pictograma', async () => {
  const user = userEvent.setup()
  setup()
  const btns = screen.getAllByRole('button')
  const pictogramBtn = btns.find((b) => b.getAttribute('aria-pressed') !== null)
  await user.click(pictogramBtn)
  expect(screen.getByRole('button', { name: /próximo/i })).not.toBeDisabled()
})

test('avança para o passo 2 após clicar PRÓXIMO', async () => {
  const user = userEvent.setup()
  setup()
  const btns = screen.getAllByRole('button')
  const pictogramBtn = btns.find((b) => b.getAttribute('aria-pressed') !== null)
  await user.click(pictogramBtn)
  await user.click(screen.getByRole('button', { name: /próximo/i }))
  expect(screen.getByText('O QUE ACONTECEU?')).toBeInTheDocument()
})
