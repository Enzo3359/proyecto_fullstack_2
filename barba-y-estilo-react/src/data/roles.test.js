import { describe, it, expect } from 'vitest'
import { obtenerRolPorCorreo } from './roles'

describe('obtenerRolPorCorreo()', () => {
  it('reconoce un correo @adminbarbayestilo.com como propietario', () => {
    expect(obtenerRolPorCorreo('valentina@adminbarbayestilo.com')).toBe('propietario')
  })

  it('reconoce un correo @barbayestilo.com como barbero', () => {
    expect(obtenerRolPorCorreo('dylan@barbayestilo.com')).toBe('barbero')
  })

  it('cualquier otro correo se considera cliente', () => {
    expect(obtenerRolPorCorreo('persona@gmail.com')).toBe('cliente')
  })
})
