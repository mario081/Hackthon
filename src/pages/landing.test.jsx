import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderApp } from '../test/renderApp'

test('landing explica o projeto e leva à aplicação', async () => {
  const user = userEvent.setup()
  renderApp('/')
  expect(screen.getByRole('heading', { level: 1, name: /e se o canal se adaptasse à pessoa/i })).toBeInTheDocument()
  for (const name of [/não foram feitos para ouvir/i, /relato é construído/i, /decisão continua humana/i, /pensado para quem/i, /um único ambiente/i]) {
    expect(screen.getByRole('heading', { level: 2, name })).toBeInTheDocument()
  }
  expect(screen.getAllByRole('link', { name: /painel institucional/i })[0]).toHaveAttribute('href', '/painel')
  expect(screen.getByRole('heading', { level: 2, name: /leve o voz segura/i })).toBeInTheDocument()
  expect(screen.getByRole('img', { name: /qr code para acessar/i })).toBeInTheDocument()

  await user.click(screen.getAllByRole('link', { name: /acessar aplicação/i })[0])
  expect(screen.getByTestId('page-inicio')).toBeInTheDocument()
})
