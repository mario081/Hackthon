import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { ReportProvider, useReport } from '../context/ReportContext'
import Confirmar from './Confirmar'
import Enviado from './Enviado'

function Seed() {
  const { addSelection } = useReport()
  return (
    <button
      data-testid="seed"
      onClick={() => {
        addSelection('WHO', { id: 'adult_male', arasaacId: 26557, label: 'Homem adulto' })
        addSelection('WHAT', { id: 'hit', arasaacId: 6047, label: 'Bateu' })
      }}
    >
      seed
    </button>
  )
}

function setup() {
  render(
    <ReportProvider>
      <MemoryRouter initialEntries={['/confirmar']}>
        <Routes>
          <Route path="/confirmar" element={<><Seed /><Confirmar /></>} />
          <Route path="/enviado" element={<Enviado />} />
          <Route path="/comunicar" element={<div data-testid="page-comunicar" />} />
        </Routes>
      </MemoryRouter>
    </ReportProvider>
  )
}

test('exibe botões CONFIRMAR e VOLTAR E ALTERAR', () => {
  setup()
  expect(screen.getByRole('button', { name: /confirmar/i })).toBeInTheDocument()
  expect(screen.getByRole('button', { name: /voltar e alterar/i })).toBeInTheDocument()
})

test('navega para /enviado após confirmar', async () => {
  const user = userEvent.setup()
  setup()
  await user.click(screen.getByTestId('seed'))
  await user.click(screen.getByRole('button', { name: /confirmar/i }))
  expect(screen.getByTestId('page-enviado')).toBeInTheDocument()
})

test('navega para /comunicar ao clicar VOLTAR E ALTERAR', async () => {
  const user = userEvent.setup()
  setup()
  await user.click(screen.getByRole('button', { name: /voltar e alterar/i }))
  expect(screen.getByTestId('page-comunicar')).toBeInTheDocument()
})
