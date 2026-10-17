import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import RequireAuth from './RequireAuth'

function renderizarConRuta(rutaInicial) {
  render(
    <MemoryRouter initialEntries={[rutaInicial]}>
      <Routes>
        <Route
          path="/privado"
          element={
            <RequireAuth>
              <p>Contenido privado</p>
            </RequireAuth>
          }
        />
        <Route path="/login" element={<p>Página de Login</p>} />
      </Routes>
    </MemoryRouter>
  )
}

describe('<RequireAuth />', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('redirige a /login cuando no hay una sesión activa', () => {
    renderizarConRuta('/privado')

    expect(screen.getByText('Página de Login')).toBeInTheDocument()
    expect(screen.queryByText('Contenido privado')).not.toBeInTheDocument()
  })

  it('muestra el contenido protegido cuando sí hay una sesión activa', () => {
    localStorage.setItem('sesionActual', JSON.stringify({ correo: 'ana@gmail.com', rol: 'cliente' }))

    renderizarConRuta('/privado')

    expect(screen.getByText('Contenido privado')).toBeInTheDocument()
  })
})
