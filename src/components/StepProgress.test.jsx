import { render, screen } from '@testing-library/react'
import StepProgress from './StepProgress'

test('exibe texto com passo atual e total', () => {
  render(<StepProgress currentStep={2} totalSteps={5} />)
  expect(screen.getByText(/passo 2 de 5/i)).toBeInTheDocument()
})

test('renderiza 5 dots para 5 passos', () => {
  render(<StepProgress currentStep={3} totalSteps={5} />)
  expect(screen.getAllByRole('presentation')).toHaveLength(5)
})
