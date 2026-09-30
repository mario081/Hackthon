import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Pictogram from './Pictogram'

const pic = { id: 'adult_male', arasaacId: 26557, label: 'Homem adulto' }

test('renderiza o label do pictograma', () => {
  render(<Pictogram pictogram={pic} selected={false} onToggle={() => {}} />)
  expect(screen.getByText('Homem adulto')).toBeInTheDocument()
})

test('renderiza imagem ARASAAC com src e alt corretos', () => {
  render(<Pictogram pictogram={pic} selected={false} onToggle={() => {}} />)
  const img = screen.getByRole('img')
  expect(img).toHaveAttribute('src', 'https://static.arasaac.org/pictograms/26557/26557_300.png')
  expect(img).toHaveAttribute('alt', 'Homem adulto')
})

test('chama onToggle com o pictograma ao clicar', async () => {
  const user = userEvent.setup()
  const onToggle = vi.fn()
  render(<Pictogram pictogram={pic} selected={false} onToggle={onToggle} />)
  await user.click(screen.getByRole('button'))
  expect(onToggle).toHaveBeenCalledWith(pic)
})

test('aplica classe de selecionado quando selected=true', () => {
  render(<Pictogram pictogram={pic} selected={true} onToggle={() => {}} />)
  expect(screen.getByRole('button').className).toMatch(/ring-2|border-blue/)
})
