import { render, screen, act } from '@testing-library/react'
import { ReportProvider, useReport } from './ReportContext'

function TestConsumer() {
  const { selections, addSelection, removeSelection, clearSelections } = useReport()
  return (
    <div>
      <span data-testid="who-count">{selections.WHO.length}</span>
      <button onClick={() => addSelection('WHO', { id: 'adult_male', arasaacId: 26557, label: 'Homem adulto' })}>
        add
      </button>
      <button onClick={() => removeSelection('WHO', 'adult_male')}>remove</button>
      <button onClick={() => clearSelections()}>clear</button>
    </div>
  )
}

function setup() {
  render(<ReportProvider><TestConsumer /></ReportProvider>)
}

test('começa com seleções vazias', () => {
  setup()
  expect(screen.getByTestId('who-count').textContent).toBe('0')
})

test('addSelection adiciona pictograma', () => {
  setup()
  act(() => screen.getByText('add').click())
  expect(screen.getByTestId('who-count').textContent).toBe('1')
})

test('addSelection ignora duplicatas', () => {
  setup()
  act(() => screen.getByText('add').click())
  act(() => screen.getByText('add').click())
  expect(screen.getByTestId('who-count').textContent).toBe('1')
})

test('removeSelection remove pictograma', () => {
  setup()
  act(() => screen.getByText('add').click())
  act(() => screen.getByText('remove').click())
  expect(screen.getByTestId('who-count').textContent).toBe('0')
})

test('clearSelections esvazia tudo', () => {
  setup()
  act(() => screen.getByText('add').click())
  act(() => screen.getByText('clear').click())
  expect(screen.getByTestId('who-count').textContent).toBe('0')
})
