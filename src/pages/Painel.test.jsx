import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { ReportProvider } from '../context/ReportContext'
import Painel from './Painel'

function setup() {
  render(
    <ReportProvider>
      <MemoryRouter initialEntries={['/painel']}>
        <Routes>
          <Route path="/painel" element={<Painel />} />
          <Route path="/painel/:id" element={<div data-testid="page-caso" />} />
        </Routes>
      </MemoryRouter>
    </ReportProvider>
  )
}

test('renderiza título do painel', () => {
  setup()
  expect(screen.getByText(/painel/i)).toBeInTheDocument()
})

test('lista relatos mockados', () => {
  setup()
  expect(screen.getByText(/VX-2026-0041/)).toBeInTheDocument()
  expect(screen.getByText(/VX-2026-0040/)).toBeInTheDocument()
})

test('navega para detalhe ao clicar no card', async () => {
  const user = userEvent.setup()
  setup()
  await user.click(screen.getAllByRole('article')[0])
  expect(screen.getByTestId('page-caso')).toBeInTheDocument()
})
