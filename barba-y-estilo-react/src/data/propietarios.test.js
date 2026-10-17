import { describe, it, expect, beforeEach } from 'vitest'
import { crearPropietario, buscarPropietarioPorCorreo } from './propietarios'

describe('propietarios.js', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('crearPropietario() guarda un propietario que luego se puede encontrar por su correo', () => {
    crearPropietario({ nombre: 'Martín Roa', correo: 'martin@adminbarbayestilo.com' })

    const encontrado = buscarPropietarioPorCorreo('martin@adminbarbayestilo.com')
    expect(encontrado.nombre).toBe('Martín Roa')
  })

  it('crearPropietario() rechaza un correo ya registrado', () => {
    crearPropietario({ nombre: 'Martín Roa', correo: 'martin@adminbarbayestilo.com' })

    expect(() =>
      crearPropietario({ nombre: 'Otro', correo: 'martin@adminbarbayestilo.com' })
    ).toThrow('Ya existe un propietario registrado con ese correo.')
  })
})
