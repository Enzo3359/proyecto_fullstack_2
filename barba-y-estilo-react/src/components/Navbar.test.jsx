import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Navbar from './Navbar'

describe('<Navbar />', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('muestra los links del panel de Barbero cuando hay una sesión de barbero activa, sin importar la página', () => {
    localStorage.setItem('sesionActual', JSON.stringify({ correo: 'dylan@barbayestilo.com', nombre: 'Dylan', rol: 'barbero' }))

    render(
      <MemoryRouter initialEntries={['/']}>
        <Navbar />
      </MemoryRouter>
    )

    expect(screen.getByText('Cortes')).toBeInTheDocument()
    expect(screen.getByText('Cerrar Sesión')).toBeInTheDocument()
    expect(screen.queryByText('Reservar Cita')).not.toBeInTheDocument()
  })

  it('muestra los links públicos de Cliente cuando no hay sesión activa', () => {
    render(
      <MemoryRouter initialEntries={['/servicios']}>
        <Navbar />
      </MemoryRouter>
    )

    expect(screen.getByText('Reservar Cita')).toBeInTheDocument()
    expect(screen.getByText('Iniciar sesión')).toBeInTheDocument()
  })
})
