import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { ReportProvider } from '../context/ReportContext'
import Home from './Home'

function setup() {
  render(
    <ReportProvider>
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/comunicar" element={<div data-testid="page-comunicar" />} />
          <Route path="/painel" element={<div data-testid="page-painel" />} />
        </Routes>
      </MemoryRouter>
    </ReportProvider>
  )
}

test('renderiza título VozSegura', () => {
  setup()
  expect(screen.getByText(/vozsegura/i)).toBeInTheDocument()
})

test('navega para /comunicar ao clicar "Quero contar algo"', async () => {
  const user = userEvent.setup()
  setup()
  await user.click(screen.getByRole('button', { name: /quero contar algo/i }))
  expect(screen.getByTestId('page-comunicar')).toBeInTheDocument()
})

test('navega para /painel ao clicar "Sou profissional"', async () => {
  const user = userEvent.setup()
  setup()
  await user.click(screen.getByRole('button', { name: /sou profissional/i }))
  expect(screen.getByTestId('page-painel')).toBeInTheDocument()
})
