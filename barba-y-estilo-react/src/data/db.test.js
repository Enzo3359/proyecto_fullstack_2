import { describe, it, expect, beforeEach } from 'vitest'
import { crear, leerTodos, eliminar } from './db'

const CLAVE = 'pruebaColeccion'

describe('db.js (CRUD genérico sobre localStorage)', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('crear() agrega un item con id autogenerado y lo persiste', () => {
    const item = crear(CLAVE, { nombre: 'Corte de prueba' })

    expect(item.id).toBeDefined()
    expect(leerTodos(CLAVE)).toHaveLength(1)
    expect(leerTodos(CLAVE)[0].nombre).toBe('Corte de prueba')
  })

  it('eliminar() quita únicamente el item con el id indicado', () => {
    const uno = crear(CLAVE, { nombre: 'Uno' })
    crear(CLAVE, { nombre: 'Dos' })

    eliminar(CLAVE, uno.id)

    const restantes = leerTodos(CLAVE)
    expect(restantes).toHaveLength(1)
    expect(restantes[0].nombre).toBe('Dos')
  })
})
