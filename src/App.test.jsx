import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Comunicar from './pages/Comunicar'
import Painel from './pages/Painel'

function TestRouter({ initialEntry }) {
  return (
    <MemoryRouter initialEntries={[initialEntry]}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/comunicar" element={<Comunicar />} />
        <Route path="/painel" element={<Painel />} />
      </Routes>
    </MemoryRouter>
  )
}

test('renderiza Home em /', () => {
  render(<TestRouter initialEntry="/" />)
  expect(screen.getByTestId('page-home')).toBeInTheDocument()
})

test('renderiza Comunicar em /comunicar', () => {
  render(<TestRouter initialEntry="/comunicar" />)
  expect(screen.getByTestId('page-comunicar')).toBeInTheDocument()
})

test('renderiza Painel em /painel', () => {
  render(<TestRouter initialEntry="/painel" />)
  expect(screen.getByTestId('page-painel')).toBeInTheDocument()
})
