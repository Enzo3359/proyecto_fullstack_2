import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import Login from './Login'
import { registrarUsuario } from '../../data/usuarios'

describe('<Login />', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('muestra "Contraseña incorrecta." al enviar el formulario con la clave equivocada', async () => {
    registrarUsuario({ nombre: 'Ana', correo: 'ana@gmail.com', contrasena: '1234' })

    const usuario = userEvent.setup()

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    )

    await usuario.type(screen.getByLabelText(/Correo Electrónico/i), 'ana@gmail.com')
    await usuario.type(screen.getByLabelText(/Contraseña/i), 'clave-equivocada')
    await usuario.click(screen.getByRole('button', { name: /Iniciar sesión/i }))

    expect(await screen.findByText('Contraseña incorrecta.')).toBeInTheDocument()
  })
})
