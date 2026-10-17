import { describe, it, expect, beforeEach } from 'vitest'
import { registrarUsuario, iniciarSesion } from './usuarios'

describe('usuarios.js (registro e inicio de sesión)', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('registrarUsuario() lanza un error si el correo ya está registrado', () => {
    registrarUsuario({ nombre: 'Ana', correo: 'ana@gmail.com', contrasena: '1234' })

    expect(() =>
      registrarUsuario({ nombre: 'Otra Ana', correo: 'ana@gmail.com', contrasena: '0000' })
    ).toThrow('Ya existe una cuenta registrada con ese correo.')
  })

  it('iniciarSesion() lanza un error si la contraseña no coincide', () => {
    registrarUsuario({ nombre: 'Ana', correo: 'ana@gmail.com', contrasena: '1234' })

    expect(() =>
      iniciarSesion({ correo: 'ana@gmail.com', contrasena: 'incorrecta' })
    ).toThrow('Contraseña incorrecta.')
  })

  it('registrarUsuario() rechaza un correo institucional con dominio .cl en vez de .com', () => {
    expect(() =>
      registrarUsuario({ nombre: 'Dylan', correo: 'dylan@barbayestilo.cl', contrasena: '1234' })
    ).toThrow('Los correos institucionales deben terminar en .com, no en .cl.')

    expect(() =>
      registrarUsuario({ nombre: 'Valentina', correo: 'valentina@adminbarbayestilo.cl', contrasena: '1234' })
    ).toThrow('Los correos institucionales deben terminar en .com, no en .cl.')
  })
})
