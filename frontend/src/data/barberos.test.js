import { describe, it, expect, beforeEach } from 'vitest'
import { obtenerBarberos, crearBarbero, buscarBarberoPorCorreo } from './barberos'

describe('barberos.js', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('obtenerBarberos() siembra los 3 barberos por defecto la primera vez', () => {
    const barberos = obtenerBarberos()
    expect(barberos).toHaveLength(3)
    expect(barberos.map((b) => b.nombre)).toContain('Dylan Elgueta')
  })

  it('crearBarbero() rechaza un correo que ya está en uso', () => {
    expect(() =>
      crearBarbero({ nombre: 'Otro Dylan', correo: 'dy.elgueta@barbayestilo.com' })
    ).toThrow('Ya existe un barbero registrado con ese correo.')
  })

  it('crearBarbero() agrega un barbero nuevo que luego se puede encontrar por correo', () => {
    crearBarbero({ nombre: 'Pedro Soto', correo: 'pedro@barbayestilo.com', especialidad: 'Afeitado' })

    const encontrado = buscarBarberoPorCorreo('pedro@barbayestilo.com')
    expect(encontrado.nombre).toBe('Pedro Soto')
    expect(encontrado.especialidad).toBe('Afeitado')
  })
})
