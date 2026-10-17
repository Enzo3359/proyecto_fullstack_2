import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Resenas from './Resenas'

describe('<Resenas />', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('agrega la reseña nueva a la lista al enviar el formulario', async () => {
    const usuario = userEvent.setup()

    render(<Resenas />)

    await usuario.type(screen.getByLabelText(/Tu Nombre/i), 'Carlos Silva')
    await usuario.type(screen.getByLabelText(/Tu opinión/i), 'Comentario de prueba único')
    await usuario.click(screen.getByRole('button', { name: /PUBLICAR RESEÑA/i }))

    expect(await screen.findByText('"Comentario de prueba único"')).toBeInTheDocument()
  })
})
