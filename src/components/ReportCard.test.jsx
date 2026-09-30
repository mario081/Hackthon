import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ReportCard from './ReportCard'

const report = {
  id: 'VX-2026-0041',
  receivedAt: '2026-09-30T14:32:00Z',
  status: 'NEW',
  priority: 'URGENT',
  selections: {},
  aiSummary: '',
  timeline: [],
  referrals: [],
}

test('renderiza o ID do relato', () => {
  render(<ReportCard report={report} onClick={() => {}} />)
  expect(screen.getByText('VX-2026-0041')).toBeInTheDocument()
})

test('renderiza badge de prioridade', () => {
  render(<ReportCard report={report} onClick={() => {}} />)
  expect(screen.getByText(/urgente/i)).toBeInTheDocument()
})

test('chama onClick ao clicar', async () => {
  const user = userEvent.setup()
  const onClick = vi.fn()
  render(<ReportCard report={report} onClick={onClick} />)
  await user.click(screen.getByRole('article'))
  expect(onClick).toHaveBeenCalled()
})
