import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import ServicioCard from './ServicioCard'

describe('<ServicioCard />', () => {
  it('muestra el nombre, la descripción y el precio del servicio recibido por props', () => {
    const servicio = {
      id: 'corte-prueba',
      nombre: 'Corte de Prueba',
      descripcion: 'Un corte hecho para testing.',
      precio: 12345,
      imagen: 'foto.jpg'
    }

    render(
      <MemoryRouter>
        <ServicioCard servicio={servicio} />
      </MemoryRouter>
    )

    expect(screen.getByText('Corte de Prueba')).toBeInTheDocument()
    expect(screen.getByText('Un corte hecho para testing.')).toBeInTheDocument()
    expect(screen.getByText('Precio: $12.345')).toBeInTheDocument()
  })
})
